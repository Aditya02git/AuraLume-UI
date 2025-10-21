import React, { useEffect, useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

const WispSmokeEffect = forwardRef(({
  speed = 0.5,
  animation = true,
  size = 50,
  spreadArea = 1.0,
  position = { x: 0, y: 0, z: 0 },
  rotation = { x: 0, y: Math.PI/5, z: 0 },
  color = ["#ffffff"],
  perlinTexturePath = "https://cdn.jsdelivr.net/gh/Aditya02git/perlin-noise-texture@main/noiseTexture.png",
  onGroupCreated = null
}, ref) => {
  const effectGroupRef = useRef(null);
  const smokeRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const animationIdRef = useRef(null);

  // Memoized colors
  const effectColors = useMemo(() => {
    if (color && color.length > 0) {
      return color.map(c => new THREE.Color(c));
    }
    return [new THREE.Color(0xCCCCCC)];
  }, [color]);

  // Calculate scale factor based on size
  const scaleFactor = useMemo(() => size / 50, [size]);

  // Vertex Shader for Smoke
  const smokeVertexShader = `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uSpreadArea;
    uniform sampler2D uPerlinTexture;
    
    void main() {
      vec3 newPosition = position;
      
      // Animated twist that moves upward with time
      float heightFactor = uv.y;
      
      // Animated wind that moves upward - no rotation
      vec2 windOffset = vec2(
        texture2D(uPerlinTexture, vec2(0.25, uv.y * 0.2 - uTime * 0.1)).r - 0.5,
        texture2D(uPerlinTexture, vec2(0.75, uv.y * 0.2 - uTime * 0.1)).r - 0.5
      );
      windOffset *= pow(heightFactor, 1.5) * 12.0 * uSpreadArea;
      newPosition.xz += windOffset;
      
      // Add slight upward expansion as smoke rises
      newPosition.xz *= 1.0 + heightFactor * 0.3 * uSpreadArea;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      
      vUv = uv;
    }
  `;

  // Fragment Shader for Smoke
  const smokeFragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;
    uniform sampler2D uPerlinTexture;
    
    void main() {
      vec2 smokeUv = vUv;
      smokeUv.x *= 0.5;
      smokeUv.y *= 0.3;
      smokeUv.y -= uTime * 0.08;
      
      float smoke = texture2D(uPerlinTexture, smokeUv).r;
      smoke = smoothstep(0.2, 1.0, smoke);
      
      // Add layers for more density with different speeds
      vec2 smokeUv2 = vUv * 0.8;
      smokeUv2.y -= uTime * 0.05;
      float smoke2 = texture2D(uPerlinTexture, smokeUv2).r;
      smoke2 = smoothstep(0.3, 1.0, smoke2);
      
      // Third layer for complexity
      vec2 smokeUv3 = vUv * 1.2;
      smokeUv3.y -= uTime * 0.1;
      float smoke3 = texture2D(uPerlinTexture, smokeUv3).r;
      smoke3 = smoothstep(0.25, 1.0, smoke3);
      
      smoke = smoke * 0.5 + smoke2 * 0.4 + smoke3 * 0.3;
      
      // Smoke dissipates as it rises
      float dissipation = 1.0 - pow(vUv.y, 1.5) * 0.6;
      smoke *= dissipation;
      
      // Smooth edges but keep more opacity
      smoke *= smoothstep(0.0, 0.15, vUv.x);
      smoke *= smoothstep(1.0, 0.85, vUv.x);
      smoke *= smoothstep(0.0, 0.1, vUv.y);
      smoke *= smoothstep(1.0, 0.3, vUv.y);
      
      // Boost overall opacity significantly
      smoke *= 2.8;
      
      gl_FragColor = vec4(uColor, smoke);
    }
  `;

  // Create Perlin noise texture procedurally if no path provided
  const createPerlinTexture = () => {
    const size = 128;
    const data = new Uint8Array(size * size);
    
    // Simple noise generation
    for (let i = 0; i < size * size; i++) {
      data[i] = Math.random() * 255;
    }
    
    const texture = new THREE.DataTexture(data, size, size, THREE.RedFormat);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    
    return texture;
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    getGroup: () => effectGroupRef.current,
    updateEffect: (deltaTime) => {
      if (animation && effectGroupRef.current) {
        updateEffectAnimation(deltaTime);
      }
    },
    setPosition: (x, y, z) => {
      if (effectGroupRef.current) {
        effectGroupRef.current.position.set(x, y, z);
      }
    },
    setRotation: (x, y, z) => {
      if (effectGroupRef.current) {
        effectGroupRef.current.rotation.set(x, y, z);
      }
    },
    dispose: () => {
      disposeEffect();
    }
  }), [animation]);

  // Animation update function
  const updateEffectAnimation = (deltaTime) => {
    if (smokeRef.current && smokeRef.current.material.uniforms) {
      const currentTime = clockRef.current.getElapsedTime();
      smokeRef.current.material.uniforms.uTime.value = currentTime * speed;
    }
  };

  // Dispose function
  const disposeEffect = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    
    if (effectGroupRef.current) {
      effectGroupRef.current.children.forEach(mesh => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (mesh.material.uniforms && mesh.material.uniforms.uPerlinTexture) {
            mesh.material.uniforms.uPerlinTexture.value.dispose();
          }
          mesh.material.dispose();
        }
      });
      effectGroupRef.current.clear();
    }
  };

  // Initialize effect group
  useEffect(() => {
    const effectGroup = new THREE.Group();
    effectGroup.position.set(position.x, position.y, position.z);
    effectGroup.rotation.set(rotation.x, rotation.y, rotation.z);
    effectGroupRef.current = effectGroup;

    // Create shader-based smoke
    const smokeGeometry = new THREE.PlaneGeometry(1, 1, 64, 128);
    smokeGeometry.translate(0, 0.5, 0);
    smokeGeometry.scale(0.2 * scaleFactor, 6 * scaleFactor, 0.2 * scaleFactor);

    // Load or create Perlin texture
    let perlinTexture;
    if (perlinTexturePath) {
      const textureLoader = new THREE.TextureLoader();
      perlinTexture = textureLoader.load(perlinTexturePath);
      perlinTexture.wrapS = THREE.RepeatWrapping;
      perlinTexture.wrapT = THREE.RepeatWrapping;
    } else {
      perlinTexture = createPerlinTexture();
    }

    const smokeMaterial = new THREE.ShaderMaterial({
      vertexShader: smokeVertexShader,
      fragmentShader: smokeFragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uPerlinTexture: { value: perlinTexture },
        uColor: { value: effectColors[0] },
        uSpreadArea: { value: spreadArea }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending
    });

    const smoke = new THREE.Mesh(smokeGeometry, smokeMaterial);
    smokeRef.current = smoke;
    effectGroup.add(smoke);

    // Notify parent component
    if (onGroupCreated) {
      onGroupCreated(effectGroup);
    }

    // Start animation loop if enabled
    if (animation) {
      const animate = () => {
        const delta = clockRef.current.getDelta();
        updateEffectAnimation(delta);
        animationIdRef.current = requestAnimationFrame(animate);
      };
      animate();
    }

    return () => {
      disposeEffect();
    };
  }, [size, scaleFactor, effectColors, perlinTexturePath, animation, spreadArea]);

  // Update position when position prop changes
  useEffect(() => {
    if (effectGroupRef.current) {
      effectGroupRef.current.position.set(position.x, position.y, position.z);
    }
  }, [position.x, position.y, position.z]);

  // Update rotation when rotation prop changes
  useEffect(() => {
    if (effectGroupRef.current) {
      effectGroupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    }
  }, [rotation.x, rotation.y, rotation.z]);

  return null;
});

WispSmokeEffect.displayName = 'WispSmokeEffect';

export default WispSmokeEffect;