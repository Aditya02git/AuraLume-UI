import React, { useEffect, useRef, useMemo, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const FireEffect = ({
  speed = 1,
  animation = true,
  scale = 1,
  position = { x: 0, y: 0, z: 0 },
  rotation = { x: 0, y: 0, z: 0 },
  color = [1.0, 0.549, 0.18], // Default orange fire color
  onGroupCreated = null
}) => {
  const groupRef = useRef(null);
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const animationFrameRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const [flameGeometry, setFlameGeometry] = useState(null);

  const vertexShader = `
    // Particles attributes
    attribute vec3 instancePosition;
    attribute float aSize, aSpeed;

    uniform float uTime;

    varying vec2 vUv;
    varying float vElevation;

    void main()
    {
        vUv = uv;
        float globalSpeed = 2.;
        float globalElevation = 7.;
        float globalRadius = 0.5;
        
        vec3 pos = position;
        pos += instancePosition;

        // Update size
        float life = fract(-uTime * aSpeed * globalSpeed);
        float size = smoothstep(.0, .7, life) * smoothstep(1., .9, life) * aSize * 1.2;
        pos *= size;

        // Update pos
        float radus = globalRadius - (pos.y * aSpeed * 800. * aSize);
        pos.y += fract(uTime * aSpeed * globalSpeed) * globalElevation;
        vElevation = pos.y;

        vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;

        gl_Position = projectionPosition;
    }
  `;

  const fragmentShader = `
    #include <packing>

    uniform bool uShadowRender;
    uniform vec3 uBaseColor;

    varying vec2 vUv;
    varying float vElevation;

    void main()
    {
      if(uShadowRender) {
        gl_FragColor = packDepthToRGBA(gl_FragCoord.z);
      } else {
        // Apply color gradient based on elevation
        vec3 finalColor = vec3(
          uBaseColor.r - vElevation * 0.08,
          uBaseColor.g - vElevation * 0.09,
          uBaseColor.b
        );
        gl_FragColor = vec4(finalColor, 1.);
      }
    }
  `;

  const randFloat = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // Load the flame GLTF model
  useEffect(() => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('https://cdn.jsdelivr.net/gh/Aditya02git/3d-models-cdn/flame.glb', (gltf) => {
      // Find the flame geometry in the loaded model
      let flame = null;
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          flame = child;
        }
      });
      
      if (flame && flame.geometry) {
        setFlameGeometry(flame.geometry);
      }
    }, undefined, (error) => {
      console.error('Error loading flame model:', error);
    });
  }, []);

  const { geometry, material } = useMemo(() => {
    if (!flameGeometry) return { geometry: null, material: null };

    const flamesCount = 50;
    
    const instancedGeometry = new THREE.InstancedBufferGeometry();
    instancedGeometry.index = flameGeometry.index;
    instancedGeometry.attributes = flameGeometry.attributes;
    instancedGeometry.instanceCount = flamesCount;

    const flamesPositionArray = new Float32Array(flamesCount * 3);
    const flamesSizeArray = new Float32Array(flamesCount);
    const flamesSpeedArray = new Float32Array(flamesCount);

    for(let i = 0; i < flamesCount; i++) {
      flamesPositionArray[i * 3 + 0] = (Math.random() - 0.5) * 2.7;
      flamesPositionArray[i * 3 + 1] = -0.2;
      flamesPositionArray[i * 3 + 2] = (Math.random() - 0.5) * 2.7;
      flamesSizeArray[i] = randFloat(0.5, 1.0);
      flamesSpeedArray[i] = randFloat(0.5, 1.0);
    }

    instancedGeometry.setAttribute('instancePosition', new THREE.InstancedBufferAttribute(flamesPositionArray, 3));
    instancedGeometry.setAttribute('aSize', new THREE.InstancedBufferAttribute(flamesSizeArray, 1));
    instancedGeometry.setAttribute('aSpeed', new THREE.InstancedBufferAttribute(flamesSpeedArray, 1));

    instancedGeometry.computeBoundingBox();
    const center = new THREE.Vector3();
    instancedGeometry.boundingBox.getCenter(center);
    instancedGeometry.center();

    // Normalize color array to 0-1 range if needed
    const normalizedColor = color.map(c => c > 1 ? c / 255 : c);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uShadowRender: { value: false },
        uBaseColor: { value: new THREE.Vector3(...normalizedColor) }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide
    });

    return { geometry: instancedGeometry, material, center };
  }, [flameGeometry, scale, color, vertexShader, fragmentShader]);

  // Update color when it changes
  useEffect(() => {
    if (materialRef.current && color) {
      const normalizedColor = color.map(c => c > 1 ? c / 255 : c);
      materialRef.current.uniforms.uBaseColor.value.set(...normalizedColor);
    }
  }, [color]);

  useEffect(() => {
    if (!geometry || !material) return;

    const group = new THREE.Group();
    
    group.position.set(position.x, position.y, position.z);
    group.rotation.set(
      THREE.MathUtils.degToRad(rotation.x),
      THREE.MathUtils.degToRad(rotation.y),
      THREE.MathUtils.degToRad(rotation.z)
    );
    
    groupRef.current = group;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-0.27, 0.18, 2.9);
    
    const baseScale = 0.06;
    const finalScale = baseScale * scale;
    mesh.scale.set(finalScale, finalScale, finalScale);
    
    meshRef.current = mesh;
    materialRef.current = material;
    group.add(mesh);

    if (onGroupCreated) onGroupCreated(group);

    const animate = () => {
      if (animation && materialRef.current) {
        const elapsedTime = clockRef.current.getElapsedTime();
        materialRef.current.uniforms.uTime.value = elapsedTime * speed;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (mesh?.parent) mesh.parent.remove(mesh);
      geometry?.dispose();
      material?.dispose();
    };
  }, [geometry, material, position, rotation, animation, speed, scale, onGroupCreated]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(position.x, position.y, position.z);
      groupRef.current.rotation.set(
        THREE.MathUtils.degToRad(rotation.x),
        THREE.MathUtils.degToRad(rotation.y),
        THREE.MathUtils.degToRad(rotation.z)
      );
    }
  }, [position, rotation]);

  return null;
};

export default FireEffect;