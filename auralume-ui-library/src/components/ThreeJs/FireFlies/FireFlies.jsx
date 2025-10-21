import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';

const FireFlies = ({
  count = 25,
  speed = 1,
  position = { x: 0, y: 0, z: 0 },
  rotation = { x: 0, y: 0, z: 0 },
  color = '#ffaa00',
  glowColor = null,
  spread = 4,
  size = 1,
  animation = true,
  onGroupCreated = null,
  ...props
}) => {
  const groupRef = useRef(null);
  const materialRef = useRef(null);
  const animationIdRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());

  // Vertex shader
  const firefliesVertexShader = `
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uSize;
    attribute float aScale;

    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.y += sin(uTime + modelPosition.x * 75.0) * aScale * 0.2;
        modelPosition.x += cos(uTime + modelPosition.x * 75.0) * aScale * 0.2;
        modelPosition.z += sin(uTime + modelPosition.x) * aScale * 0.2;
        
        vec4 viewPosition = viewMatrix * modelPosition; 
        vec4 projectionPosition = projectionMatrix * viewPosition;
        
        float flickerScale = sin(uTime * aScale * 3.0) * 0.5 + 1.0; // Better flicker effect
        gl_Position = projectionPosition;
        gl_PointSize = 40.0 * flickerScale * uPixelRatio * uSize;
        gl_PointSize *= (1.0 / - viewPosition.z);
    }
  `;

  // Fixed fragment shader
  const firefliesFragmentShader = `
    uniform vec3 uColor;
    uniform vec3 uGlowColor;

    void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        
        // Create a smooth circular gradient
        float strength = smoothstep(0.5, 0.0, distanceToCenter);
        
        // Create inner core and outer glow
        float innerCore = smoothstep(0.3, 0.0, distanceToCenter);
        float outerGlow = smoothstep(0.5, 0.2, distanceToCenter);
        
        // Mix colors: inner core uses main color, outer uses glow color
        vec3 finalColor = mix(uGlowColor, uColor, innerCore);
        
        // Apply brightness based on distance
        float alpha = strength * (innerCore * 1.0 + outerGlow * 0.3);
        
        gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  // Generate fireflies positions and scales
  const { firefliesPositions, firefliesScale } = useMemo(() => {
    const firefliesPositions = new Float32Array(count * 3);
    const firefliesScale = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Position
      firefliesPositions[i * 3 + 0] = (Math.random() - 0.5) * spread;
      firefliesPositions[i * 3 + 1] = Math.random() * spread * 0.5;
      firefliesPositions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      
      // Scale for individual animation
      firefliesScale[i] = Math.random() * size + 0.5;
    }
    
    return { firefliesPositions, firefliesScale };
  }, [count, spread, size]);

  useEffect(() => {
    // Cleanup previous setup
    if (groupRef.current) {
      if (groupRef.current.parent) {
        groupRef.current.parent.remove(groupRef.current);
      }
      
      // Clean up existing children
      while (groupRef.current.children.length > 0) {
        const child = groupRef.current.children[0];
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
        groupRef.current.remove(child);
      }
    }

    // Cancel existing animation
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    // Create main group for fireflies
    const group = new THREE.Group();
    group.position.set(position.x, position.y, position.z);
    group.rotation.set(rotation.x, rotation.y, rotation.z);
    groupRef.current = group;

    // Create geometry
    const geometry = new THREE.BufferGeometry();
    
    // Set position attribute
    const positionAttribute = new THREE.BufferAttribute(firefliesPositions, 3);
    geometry.setAttribute('position', positionAttribute);
    
    // Set scale attribute
    const scaleAttribute = new THREE.BufferAttribute(firefliesScale, 1);
    geometry.setAttribute('aScale', scaleAttribute);

    // Create shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
        uSize: { value: size },
        uColor: { value: new THREE.Color(color) },
        uGlowColor: { value: new THREE.Color(glowColor || color) }
      },
      vertexShader: firefliesVertexShader,
      fragmentShader: firefliesFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    materialRef.current = material;

    // Create points mesh
    const points = new THREE.Points(geometry, material);
    group.add(points);

    // Start animation if enabled
    if (animation) {
      startAnimation();
    }

    // Call the callback with the created group
    if (onGroupCreated) {
      onGroupCreated(group);
    }

    // Cleanup function
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      // Dispose of geometry and material
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      
      // Remove group from parent if it has one
      if (group.parent) {
        group.parent.remove(group);
      }
    };
  }, [count, color, glowColor, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, spread, size]);

  // Animation function
  const startAnimation = () => {
    const animate = () => {
      if (!animation) return;
      
      const elapsedTime = clockRef.current.getElapsedTime();
      
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = elapsedTime * speed;
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();
  };

  // Update animation when animation prop changes
  useEffect(() => {
    if (animation && !animationIdRef.current) {
      startAnimation();
    } else if (!animation && animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  }, [animation, speed]);

  // Update position and rotation when props change
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(position.x, position.y, position.z);
      groupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    }
  }, [position.x, position.y, position.z, rotation.x, rotation.y, rotation.z]);

  // Update material uniforms when props change
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColor.value = new THREE.Color(color);
      materialRef.current.uniforms.uGlowColor.value = new THREE.Color(glowColor || color);
      materialRef.current.uniforms.uSize.value = size;
    }
  }, [color, glowColor, size]);

  // This component doesn't render anything visible to React
  // All rendering is handled by Three.js through the onGroupCreated callback
  return null;
};

export default FireFlies;