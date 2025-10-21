import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

const Leaf = forwardRef(({
  speed = 1.6,
  animation = true,
  numberOfLeafs = 50, // Number of leaf particles
  position = { x: 0, y: 0, z: 0 },
  rotation = { x: 0, y: 0, z: 0 },
  mode = 'flow', // 'whirl' or 'flow'
  area = [10, 10, 5], // Area for flow mode [width, depth, height]
  leafSize = 0.05, // Base size of each leaf
  leafSizeVariation = 0.3, // Size variation (0 to 1, where 1 means up to 100% variation)
  fallSpeed = 2, // How fast leaves fall (0.1 to 2 recommended)
  swayAmount = 20, // How much leaves sway while falling (0.5 to 2 recommended)
  rotationSpeed = 10, // Speed of leaf rotation (0.5 to 2 recommended)
  textureUrl = null, // Optional texture URL
  color = 0x7cb342, // Default leaf green color (used if colors array is not provided)
  colors = [0x7cb342, 0x8bc34a, 0x689f38, 0xffa726, 0xff7043], // Array of colors for variation, e.g., [0x7cb342, 0x8bc34a, 0x689f38, 0xffa726, 0xff7043]
  onGroupCreated = null
}, ref) => {
  const effectGroupRef = useRef(null);
  const leavesDataRef = useRef([]);
  const textureRef = useRef(null);
  const animationDataRef = useRef({
    lastTime: 0
  });

  // Create hexagonal geometry
  const createHexagonGeometry = (size) => {
    const shape = new THREE.Shape();
    const radius = size;
    
    // Create hexagon points
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }
    shape.closePath();
    
    const geometry = new THREE.ShapeGeometry(shape);
    return geometry;
  };

  // Create a leaf particle
  const createLeafParticle = (leafTexture, leafColor, size) => {
    const geometry = createHexagonGeometry(size);
    
    let material;
    
    if (leafTexture) {
      material = new THREE.MeshBasicMaterial({
        map: leafTexture,
        transparent: true,
        side: THREE.DoubleSide,
        alphaTest: 0.1,
        depthWrite: false
      });
    } else {
      const colorObj = new THREE.Color(leafColor);
      material = new THREE.MeshBasicMaterial({
        color: colorObj,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0.9,
        depthWrite: false
      });
    }

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  };

  // Initialize random position for flow mode
  const getRandomFlowPosition = () => {
    return {
      x: (Math.random() - 0.5) * area[0],
      y: Math.random() * area[2] + area[2] * 0.5, // Start from top
      z: (Math.random() - 0.5) * area[1]
    };
  };

  // Initialize random position for whirl mode
  const getRandomWhirlPosition = () => {
    const radius = Math.random() * 8;
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.random() * 10 + 5,
      z: Math.sin(angle) * radius
    };
  };

  // Create leaf data with random properties
  const createLeafData = (mesh, index) => {
    const isWhirl = mode === 'whirl';
    const startPos = isWhirl ? getRandomWhirlPosition() : getRandomFlowPosition();
    
    return {
      mesh: mesh,
      // Position
      startX: startPos.x,
      startY: startPos.y,
      startZ: startPos.z,
      // Movement
      fallProgress: Math.random(), // 0 to 1
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: 0.5 + Math.random() * 0.5,
      // Rotation
      rotationX: Math.random() * Math.PI * 2,
      rotationY: Math.random() * Math.PI * 2,
      rotationZ: Math.random() * Math.PI * 2,
      rotationSpeedX: (Math.random() - 0.5) * 2,
      rotationSpeedY: (Math.random() - 0.5) * 2,
      rotationSpeedZ: (Math.random() - 0.5) * 3,
      // Whirl mode specific
      orbitRadius: isWhirl ? Math.random() * 8 + 2 : 0,
      orbitAngle: isWhirl ? Math.random() * Math.PI * 2 : 0,
      orbitSpeed: isWhirl ? (Math.random() - 0.5) * 0.5 : 0,
      spiralSpeed: isWhirl ? Math.random() * 0.5 + 0.5 : 0
    };
  };

  // Update leaf animation
  const updateLeafAnimation = (deltaTime) => {
    const effectGroup = effectGroupRef.current;
    if (!effectGroup) return;

    const dt = deltaTime * speed;

    leavesDataRef.current.forEach((leafData) => {
      if (!leafData.mesh) return;

      if (mode === 'whirl') {
        // Whirl mode: Spiral and orbit animation
        leafData.orbitAngle += leafData.orbitSpeed * dt * 0.5;
        leafData.orbitRadius += leafData.spiralSpeed * dt * 0.1;
        
        // Update position in spiral
        leafData.mesh.position.x = Math.cos(leafData.orbitAngle) * leafData.orbitRadius;
        leafData.mesh.position.z = Math.sin(leafData.orbitAngle) * leafData.orbitRadius;
        leafData.mesh.position.y -= fallSpeed * dt * 0.3;

        // Reset if too far or too low
        if (leafData.orbitRadius > 15 || leafData.mesh.position.y < -5) {
          const newPos = getRandomWhirlPosition();
          leafData.mesh.position.set(newPos.x, newPos.y, newPos.z);
          leafData.orbitRadius = Math.random() * 8 + 2;
          leafData.orbitAngle = Math.random() * Math.PI * 2;
        }

      } else {
        // Flow mode: Falling with swaying
        leafData.fallProgress += fallSpeed * dt * 0.02;

        // Sway motion - scale with area dimensions
        const swayScaleX = area[0] * 0.05; // Scale sway with width
        const swayScaleZ = area[1] * 0.05; // Scale sway with depth
        const swayX = Math.sin(leafData.fallProgress * 10 + leafData.swayOffset) * swayAmount * swayScaleX;
        const swayZ = Math.cos(leafData.fallProgress * 7 + leafData.swayOffset) * swayAmount * swayScaleZ;

        // Update position
        const newY = leafData.startY - leafData.fallProgress * area[2] * 1.5;
        leafData.mesh.position.x = leafData.startX + swayX;
        leafData.mesh.position.y = newY;
        leafData.mesh.position.z = leafData.startZ + swayZ;

        // Respawn when leaf falls below the area
        if (leafData.fallProgress >= 1 || newY < position.y - area[2]) {
          const newPos = getRandomFlowPosition();
          leafData.startX = newPos.x;
          leafData.startY = newPos.y;
          leafData.startZ = newPos.z;
          leafData.fallProgress = 0;
          leafData.swayOffset = Math.random() * Math.PI * 2;
        }
      }

      // Rotation for both modes
      leafData.rotationX += leafData.rotationSpeedX * rotationSpeed * dt * 0.05;
      leafData.rotationY += leafData.rotationSpeedY * rotationSpeed * dt * 0.05;
      leafData.rotationZ += leafData.rotationSpeedZ * rotationSpeed * dt * 0.05;

      leafData.mesh.rotation.x = leafData.rotationX;
      leafData.mesh.rotation.y = leafData.rotationY;
      leafData.mesh.rotation.z = leafData.rotationZ;
    });
  };

  // Expose methods to parent component
  useImperativeHandle(ref, () => ({
    getGroup: () => effectGroupRef.current,
    updateEffect: (deltaTime) => {
      if (animation && effectGroupRef.current) {
        updateLeafAnimation(deltaTime);
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

  // Dispose function
  const disposeEffect = () => {
    leavesDataRef.current.forEach(leafData => {
      if (leafData.mesh) {
        if (leafData.mesh.geometry) leafData.mesh.geometry.dispose();
        if (leafData.mesh.material) {
          if (leafData.mesh.material.map) leafData.mesh.material.map.dispose();
          leafData.mesh.material.dispose();
        }
      }
    });
    leavesDataRef.current = [];

    if (textureRef.current) {
      textureRef.current.dispose();
      textureRef.current = null;
    }

    if (effectGroupRef.current) {
      effectGroupRef.current.clear();
    }
  };

  // Initialize effect
  useEffect(() => {
    const effectGroup = new THREE.Group();
    effectGroup.position.set(position.x, position.y, position.z);
    effectGroup.rotation.set(rotation.x, rotation.y, rotation.z);
    effectGroupRef.current = effectGroup;

    const createLeaves = (texture = null) => {
      // Prepare color palette
      const colorPalette = colors && colors.length > 0 ? colors : [color];
      
      // Create leaf particles
      leavesDataRef.current = [];
      for (let i = 0; i < numberOfLeafs; i++) {
        // Random size variation
        const sizeVariation = 1 + (Math.random() - 0.5) * 2 * leafSizeVariation;
        const particleSize = leafSize * sizeVariation;
        
        // Pick random color from palette
        const leafColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        
        // Only pass texture if it exists, otherwise pass null
        const leafMesh = createLeafParticle(texture, leafColor, particleSize);
        const leafData = createLeafData(leafMesh, i);

        // Set initial position
        leafMesh.position.set(
          leafData.startX,
          leafData.startY,
          leafData.startZ
        );

        effectGroup.add(leafMesh);
        leavesDataRef.current.push(leafData);
      }

      // Initialize animation time
      animationDataRef.current.lastTime = Date.now();

      // Notify parent
      if (onGroupCreated) {
        onGroupCreated(effectGroup);
      }
    };

    // Load texture if provided, otherwise create leaves immediately
    if (textureUrl) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        textureUrl,
        (texture) => {
          textureRef.current = texture;
          createLeaves(texture);
        },
        undefined,
        (error) => {
          console.error('Error loading leaf texture:', error);
          // Fallback to colored hexagons if texture fails
          createLeaves(null);
        }
      );
    } else {
      createLeaves(null);
    }

    // Cleanup
    return () => {
      disposeEffect();
    };
  }, [numberOfLeafs, leafSize, leafSizeVariation, color, colors, mode, area, textureUrl, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, onGroupCreated]);

  // Update position
  useEffect(() => {
    if (effectGroupRef.current) {
      effectGroupRef.current.position.set(position.x, position.y, position.z);
    }
  }, [position.x, position.y, position.z]);

  // Update rotation
  useEffect(() => {
    if (effectGroupRef.current) {
      effectGroupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    }
  }, [rotation.x, rotation.y, rotation.z]);

  return null;
});

Leaf.displayName = 'Leaf';

export default Leaf;