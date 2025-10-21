import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';

const ThreeBar = forwardRef(({ 
  data = [
    [3, 2, 1],
    [6, 5, 4],
    [5, 7, 6]
  ],
  textureUrl = null,
  color = '#3b82f6',
  backgroundColor = 'white',
  barWidth = 0.2,
  barDepth = 0.2,
  position = { x: 0, y: 0, z: 0 },
  onGroupCreated,
  onLoad,
  onError
}, ref) => {
  const groupRef = useRef(null);
  const textureRef = useRef(null);
  const materialsRef = useRef([]);

  useImperativeHandle(ref, () => ({
    updateEffect: (deltaTime) => {
      // No rotation logic
    },
    dispose: () => {
      // Dispose geometries and materials
      if (groupRef.current) {
        groupRef.current.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      
      // Dispose texture
      if (textureRef.current) {
        textureRef.current.dispose();
      }
      
      // Clear materials array
      materialsRef.current = [];
    },
    getGroup: () => groupRef.current
  }));

  useEffect(() => {
    let mounted = true;

    try {
      // Create bar group
      const cubeGroup = new THREE.Group();
      cubeGroup.position.set(position.x, position.y, position.z);
      groupRef.current = cubeGroup;

      // Calculate max value for scaling
      const max = Math.max(...data.flat());
      const min = Math.min(...data.flat());

      // Function to create bars with materials
      const createBars = (material = null) => {
        data.forEach((row, i) => {
          row.forEach((value, j) => {
            const geometry = new THREE.BoxGeometry(barWidth, value / max, barDepth);
            
            let barMaterial;
            if (material) {
              // Use provided material (texture)
              barMaterial = material;
            } else {
              // Create color-based material with gradient based on value
              const baseColor = new THREE.Color(color);
              
              // Calculate intensity based on value (normalized between min and max)
              const normalizedValue = (value - min) / (max - min || 1);
              
              // Darken color for higher values, lighten for lower values
              // Using HSL to adjust lightness
              const hsl = {};
              baseColor.getHSL(hsl);
              
              // Adjust lightness: higher values = darker (lower lightness)
              // Range from 0.3 (dark) to 0.7 (light)
              const lightness = 0.7 - (normalizedValue * 0.4);
              baseColor.setHSL(hsl.h, hsl.s, lightness);
              
              barMaterial = new THREE.MeshStandardMaterial({
                color: baseColor,
                metalness: 0.3,
                roughness: 0.4
              });
              
              materialsRef.current.push(barMaterial);
            }
            
            const mesh = new THREE.Mesh(geometry, barMaterial);
            
            mesh.position.set(
              i / data.length - 0.5,
              value / max * 0.5 - 0.6,
              j / row.length - 0.5
            );
            
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            
            cubeGroup.add(mesh);
          });
        });

        // Notify parent that group is ready after bars are created
        if (onGroupCreated && mounted) {
          onGroupCreated(cubeGroup);
        }
      };

      // Priority: texture > color
      if (textureUrl) {
        // Load texture first, then create bars
        const loader = new THREE.TextureLoader();
        
        loader.load(
          textureUrl,
          (texture) => {
            if (!mounted) return;
            
            textureRef.current = texture;
            
            // Create material with loaded texture
            const textureMaterial = new THREE.MeshStandardMaterial({
              map: texture,
              metalness: 0.3,
              roughness: 0.4
            });
            
            materialsRef.current.push(textureMaterial);
            createBars(textureMaterial);
            
            onLoad?.();
          },
          undefined,
          (err) => {
            console.error('Error loading texture:', err);
            onError?.(err);
            // Fallback to color if texture fails
            createBars();
          }
        );
      } else {
        // Use color-based gradient
        createBars();
        onLoad?.();
      }

      return () => {
        mounted = false;
      };
    } catch (error) {
      console.error('Error initializing ThreeBar:', error);
      onError?.(error);
    }
  }, [data, textureUrl, color, barWidth, barDepth, position.x, position.y, position.z, onGroupCreated, onLoad, onError]);

  return null;
});

ThreeBar.displayName = 'ThreeBar';

export default ThreeBar;