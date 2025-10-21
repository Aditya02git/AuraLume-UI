import React, { useEffect, useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

const MistEffect = forwardRef(({
  speed = 0.005,
  animation = true,
  particleCount = 500,
  position = { x: 0, y: 0, z: 0 },
  rotation = { x: 0, y: 0, z: 0 },
  emitArea = { min: { x: -25, y: 5, z: -25 }, max: { x: 25, y: 10, z: 25 } },
  color1 = { r: 0.8, g: 0.8, b: 0.8, a: 0.1 },
  color2 = { r: 0.95, g: 0.95, b: 0.95, a: 0.15 },
  minSize = 3.5,
  maxSize = 5.0,
  minAngularSpeed = -2,
  maxAngularSpeed = 2,
  minEmitPower = 0.5,
  maxEmitPower = 1,
  textureUrl = 'https://raw.githubusercontent.com/aWeirdo/Babylon.js/master/smoke_15.png',
  onGroupCreated = null
}, ref) => {
  const effectGroupRef = useRef(null);
  const particlesRef = useRef([]);
  const textureRef = useRef(null);
  const animationDataRef = useRef({
    lastTime: 0,
    isAnimating: false
  });

  // Memoized texture loader
  const loadTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    return loader;
  }, []);

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
    const effectGroup = effectGroupRef.current;
    if (!effectGroup) return;

    particlesRef.current.forEach((particleData) => {
      const { mesh, velocity, angularVelocity } = particleData;
      
      // Update position based on velocity
      mesh.position.x += velocity.x * deltaTime * 60;
      mesh.position.y += velocity.y * deltaTime * 60;
      mesh.position.z += velocity.z * deltaTime * 60;

      // Update rotation based on angular velocity
      mesh.rotation.x += angularVelocity.x * deltaTime * 60;
      mesh.rotation.y += angularVelocity.y * deltaTime * 60;
      mesh.rotation.z += angularVelocity.z * deltaTime * 60;

      // Keep particles floating in place (very slow drift)
      // Reset if they drift too far
      const maxDrift = 50;
      if (Math.abs(mesh.position.x) > maxDrift || 
          Math.abs(mesh.position.z) > maxDrift) {
        mesh.position.x = (Math.random() - 0.5) * (emitArea.max.x - emitArea.min.x) + emitArea.min.x;
        mesh.position.z = (Math.random() - 0.5) * (emitArea.max.z - emitArea.min.z) + emitArea.min.z;
      }
    });
  };

  // Dispose function
  const disposeEffect = () => {
    if (effectGroupRef.current) {
      effectGroupRef.current.children.forEach(mesh => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (mesh.material.map) mesh.material.map.dispose();
          mesh.material.dispose();
        }
      });
      effectGroupRef.current.clear();
    }
    if (textureRef.current) {
      textureRef.current.dispose();
    }
    particlesRef.current = [];
  };

  // Initialize effect group
  useEffect(() => {
    // Load texture
    loadTexture.load(
      textureUrl,
      (texture) => {
        textureRef.current = texture;
        
        // Create effect group
        const effectGroup = new THREE.Group();
        effectGroup.position.set(position.x, position.y, position.z);
        effectGroup.rotation.set(rotation.x, rotation.y, rotation.z);
        effectGroupRef.current = effectGroup;

        // Clear previous particles
        particlesRef.current = [];

        // Create mist particles
        for (let i = 0; i < particleCount; i++) {
          // Random size between minSize and maxSize
          const size = minSize + Math.random() * (maxSize - minSize);
          
          const geometry = new THREE.PlaneGeometry(size, size);
          
          // Create material with texture and transparency
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            opacity: color1.a + Math.random() * (color2.a - color1.a),
            color: new THREE.Color(
              color1.r + Math.random() * (color2.r - color1.r),
              color1.g + Math.random() * (color2.g - color1.g),
              color1.b + Math.random() * (color2.b - color1.b)
            ),
            blending: THREE.NormalBlending,
            depthWrite: false,
            side: THREE.DoubleSide
          });

          const mesh = new THREE.Mesh(geometry, material);

          // Random position within emit area
          mesh.position.x = (Math.random() - 0.5) * (emitArea.max.x - emitArea.min.x) + emitArea.min.x;
          mesh.position.y = emitArea.min.y + Math.random() * (emitArea.max.y - emitArea.min.y);
          mesh.position.z = (Math.random() - 0.5) * (emitArea.max.z - emitArea.min.z) + emitArea.min.z;

          // Random initial rotation
          mesh.rotation.x = Math.random() * Math.PI * 2;
          mesh.rotation.y = Math.random() * Math.PI * 2;
          mesh.rotation.z = Math.random() * Math.PI * 2;

          // Random velocity (very slow drift)
          const emitPower = minEmitPower + Math.random() * (maxEmitPower - minEmitPower);
          const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * emitPower * speed,
            0, // No vertical movement for mist
            (Math.random() - 0.5) * emitPower * speed
          );

          // Random angular velocity
          const angularVelocity = new THREE.Vector3(
            (Math.random() - 0.5) * (maxAngularSpeed - minAngularSpeed) * speed,
            (Math.random() - 0.5) * (maxAngularSpeed - minAngularSpeed) * speed,
            (Math.random() - 0.5) * (maxAngularSpeed - minAngularSpeed) * speed
          );

          particlesRef.current.push({
            mesh,
            velocity,
            angularVelocity
          });

          effectGroup.add(mesh);
        }

        // Notify parent component that group is ready
        if (onGroupCreated) {
          onGroupCreated(effectGroup);
        }
      },
      undefined,
      (error) => {
        console.error('Error loading mist texture:', error);
      }
    );

    // Cleanup function
    return () => {
      disposeEffect();
    };
  }, [
    particleCount,
    minSize,
    maxSize,
    minAngularSpeed,
    maxAngularSpeed,
    minEmitPower,
    maxEmitPower,
    speed,
    textureUrl,
    emitArea,
    color1,
    color2,
    position.x,
    position.y,
    position.z,
    rotation.x,
    rotation.y,
    rotation.z,
    loadTexture,
    onGroupCreated
  ]);

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

  // This component doesn't render anything visible in React
  // The Three.js objects are managed through refs and callbacks
  return null;
});

MistEffect.displayName = 'MistEffect';

export default MistEffect;