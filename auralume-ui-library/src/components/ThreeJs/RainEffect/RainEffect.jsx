import React, { useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

const RainEffect = forwardRef(({
  particleCount = 5000,
  color = 0x4477bb,
  opacity = 0.3, // Opacity of rain drops
  size = 0.05,
  spread = 30,
  height = { min: 5, max: 15 },
  dropLength = { min: 0.2, max: 0.6 },
  angle = 0, // degrees
  surfaceHeight = 0,
  enableSplash = true,
  splashCount = 300,
  splashLifetime = 0.7,
  location = { x: 0, y: 0, z: 0 }, // Position of the entire rain effect
  rotation = { x: 0, y: 0, z: 0 }, // Rotation of the entire rain effect
  lightning = false, // Enable/disable lightning effect
  onGroupCreated
}, ref) => {

  const group = new THREE.Group();

  // Apply position and rotation to the main group
  group.position.set(location.x, location.y, location.z);
  group.rotation.set(
    THREE.MathUtils.degToRad(rotation.x),
    THREE.MathUtils.degToRad(rotation.y),
    THREE.MathUtils.degToRad(rotation.z)
  );

  // --- Raindrops ---
  const positions = [];
  const velocities = [];

  const angleRad = THREE.MathUtils.degToRad(angle);
  const xFactor = Math.sin(angleRad);
  const yFactor = Math.cos(angleRad);

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * spread;
    const y = Math.random() * (height.max - height.min) + height.min;
    const z = (Math.random() - 0.5) * spread;
    const len = Math.random() * (dropLength.max - dropLength.min) + dropLength.min;

    positions.push(x, y, z);
    positions.push(x + len * xFactor, y - len * yFactor, z);

    velocities.push(Math.random() * 0.2 + 0.3);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  const lines = new THREE.LineSegments(geometry, material);
  group.add(lines);

  // --- Splashes (circular ripples) ---
  const splashMeshes = [];
  const splashTimes = [];
  const splashRadii = [];

  if (enableSplash) {
    for (let i = 0; i < splashCount; i++) {
      const ringGeom = new THREE.RingGeometry(0.02, 0.03, 32);
      ringGeom.rotateX(-Math.PI / 2);
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(ringGeom, mat);
      mesh.position.y = surfaceHeight + 0.01;
      mesh.scale.set(0.1, 0.1, 0.1);
      mesh.visible = false;
      group.add(mesh);
      splashMeshes.push(mesh);
      splashTimes.push(0);
      splashRadii.push(0.1);
    }
  }

  // --- Lightning Effect ---
  const lightningBolts = [];
  const lightningGeometries = [];
  const lightningMaterials = [];
  let lightningTimer = 0;
  let lightningDuration = 0;
  let isLightningActive = false;
  let lightningLight = null;

  if (lightning) {
    // Create lightning light
    lightningLight = new THREE.PointLight(0xffffff, 0, 50, 2);
    lightningLight.position.set(0, height.max, 0);
    group.add(lightningLight);

    // Create multiple lightning bolts for more dramatic effect
    for (let i = 0; i < 3; i++) {
      const lightningGeometry = new THREE.BufferGeometry();
      const lightningMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0,
        linewidth: 3
      });
      const lightningMesh = new THREE.Line(lightningGeometry, lightningMaterial);
      
      group.add(lightningMesh);
      lightningBolts.push(lightningMesh);
      lightningGeometries.push(lightningGeometry);
      lightningMaterials.push(lightningMaterial);
    }
  }

  // Generate branching lightning path
  const generateLightningPath = (startX, startY, startZ, endY) => {
    const points = [];
    points.push(new THREE.Vector3(startX, startY, startZ));
    
    const segments = 15 + Math.floor(Math.random() * 10);
    const yStep = (endY - startY) / segments;
    
    let currentX = startX;
    let currentZ = startZ;
    
    for (let i = 1; i < segments; i++) {
      const y = startY + yStep * i;
      
      // Add random branching and jagged movement
      currentX += (Math.random() - 0.5) * 0.8;
      currentZ += (Math.random() - 0.5) * 0.8;
      
      points.push(new THREE.Vector3(currentX, y, currentZ));
      
      // Occasionally add branches
      if (Math.random() < 0.3 && i > 3) {
        const branchLength = Math.random() * 3 + 1;
        const branchSegments = Math.floor(branchLength * 2);
        
        for (let j = 1; j <= branchSegments; j++) {
          const branchX = currentX + (Math.random() - 0.5) * branchLength;
          const branchY = y - j * 0.3;
          const branchZ = currentZ + (Math.random() - 0.5) * branchLength;
          points.push(new THREE.Vector3(branchX, branchY, branchZ));
        }
        
        // Return to main path
        points.push(new THREE.Vector3(currentX, y, currentZ));
      }
    }
    
    points.push(new THREE.Vector3(currentX, endY, currentZ));
    return points;
  };

  useEffect(() => {
    if (onGroupCreated) onGroupCreated(group);
  }, [group, onGroupCreated]);

  useImperativeHandle(ref, () => ({
    group,
    update: (deltaTime) => {
      const pos = geometry.attributes.position.array;

      // --- Update raindrops ---
      for (let i = 0; i < particleCount; i++) {
        const topIndex = i * 6;
        const bottomIndex = topIndex + 3;
        const speed = velocities[i] * deltaTime * 10;

        pos[topIndex + 0] += speed * xFactor;
        pos[topIndex + 1] -= speed * yFactor;
        pos[bottomIndex + 0] += speed * xFactor;
        pos[bottomIndex + 1] -= speed * yFactor;

        // --- Ground collision ---
        if (pos[bottomIndex + 1] <= surfaceHeight) {
          // Spawn splash
          if (enableSplash) {
            for (let s = 0; s < splashCount; s++) {
              if (splashTimes[s] <= 0) {
                splashMeshes[s].position.set(pos[bottomIndex + 0], surfaceHeight + 0.01, pos[bottomIndex + 2]);
                splashRadii[s] = 0.1;
                splashMeshes[s].scale.set(splashRadii[s], splashRadii[s], 1);
                splashMeshes[s].material.opacity = 0.7;
                splashMeshes[s].visible = true;
                splashTimes[s] = splashLifetime;
                break;
              }
            }
          }

          // Reset raindrop
          const x = (Math.random() - 0.5) * spread;
          const y = Math.random() * (height.max - height.min) + height.min;
          const z = (Math.random() - 0.5) * spread;
          const len = Math.random() * (dropLength.max - dropLength.min) + dropLength.min;

          pos[topIndex + 0] = x;
          pos[topIndex + 1] = y;
          pos[topIndex + 2] = z;

          pos[bottomIndex + 0] = x + len * xFactor;
          pos[bottomIndex + 1] = y - len * yFactor;
          pos[bottomIndex + 2] = z;
        }
      }

      // --- Update splashes ---
      if (enableSplash) {
        for (let s = 0; s < splashCount; s++) {
          if (splashTimes[s] > 0) {
            splashTimes[s] -= deltaTime;
            splashRadii[s] += deltaTime * 0.5; // expand ripple
            splashMeshes[s].scale.set(splashRadii[s], splashRadii[s], 1);
            splashMeshes[s].material.opacity = THREE.MathUtils.clamp(splashTimes[s] / splashLifetime, 0, 0.7);
            if (splashTimes[s] <= 0) splashMeshes[s].visible = false;
          }
        }
      }

      // --- Update lightning ---
      if (lightning) {
        lightningTimer += deltaTime;
        
        // Trigger lightning randomly (every 3-8 seconds)
        if (!isLightningActive && lightningTimer > (Math.random() * 5 + 3)) {
          isLightningActive = true;
          lightningDuration = 0.1 + Math.random() * 0.1; // Lightning flash duration
          lightningTimer = 0;
          
          // Position the light at a random lightning bolt location
          const lightX = (Math.random() - 0.5) * spread * 0.6;
          const lightY = height.max - Math.random() * 3;
          const lightZ = (Math.random() - 0.5) * spread * 0.6;
          lightningLight.position.set(lightX, lightY, lightZ);
          
          // Generate new lightning paths for each bolt
          lightningBolts.forEach((bolt, index) => {
            const startX = (Math.random() - 0.5) * spread * 0.8;
            const startY = height.max + Math.random() * 5;
            const startZ = (Math.random() - 0.5) * spread * 0.8;
            const endY = surfaceHeight + Math.random() * 2;
            
            const lightningPoints = generateLightningPath(startX, startY, startZ, endY);
            lightningGeometries[index].setFromPoints(lightningPoints);
            
            // Vary the brightness and color slightly
            const intensity = 0.8 + Math.random() * 0.2;
            lightningMaterials[index].opacity = intensity;
            
            // Slight color variation (pure white to light blue)
            const colorVariation = Math.random() * 0.1;
            lightningMaterials[index].color.setRGB(1, 1 - colorVariation, 1 - colorVariation * 2);
          });
        }
        
        // Handle lightning flash
        if (isLightningActive) {
          lightningDuration -= deltaTime;

          if (lightningDuration > 0) {
            // Lightning is flashing - create flickering effect
            const flickerIntensity = Math.random() * 0.3 + 0.7;
            const lightIntensity = flickerIntensity * 20 + Math.random() * 10; // Stronger flash (~20–30)

            // Update lightning bolt visuals
            lightningMaterials.forEach(material => {
              material.opacity = flickerIntensity;
            });

            // Update lightning light
            lightningLight.intensity = lightIntensity;
            lightningLight.distance = 500; // bigger reach
            lightningLight.decay = 1;      // less falloff

            // Add slight color variation to the light (white to pale blue)
            const colorFlicker = 0.9 + Math.random() * 0.1;
            lightningLight.color.setRGB(colorFlicker, colorFlicker, 1);
          } else {
            // Lightning flash is over
            isLightningActive = false;
            lightningMaterials.forEach(material => {
              material.opacity = 0;
            });
            lightningLight.intensity = 0;
          }
        }
      }

      geometry.attributes.position.needsUpdate = true;
    }
  }));

  return null;
});

export default RainEffect;