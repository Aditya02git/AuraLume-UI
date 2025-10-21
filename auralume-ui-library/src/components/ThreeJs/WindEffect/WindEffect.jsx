import React, { useEffect, useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

const WindEffect = forwardRef(({
  speed = 1,
  animation = true,
  intensity = 6, // Number of wind ribbons (default 6)
  position = { x: 0, y: 0, z: 0 },
  rotation = { x: 0, y: 0, z: 0 },
  color = 0xffffff, // Wind color (default white)
  spiralRadius = 8, // Size of the wind spiral
  ribbonWidth = 0.1, // Width of each ribbon
  mode = 'flow', // 'whirl' or 'flow'
  area = [40, 40], // Area for flow mode [width, depth]
  windAmount = 2, // Controls the length/amount of wind (0.5 to 2 recommended)
  windCurls = 2, // Controls the curviness of wind paths (0.5 to 2 recommended)
  onGroupCreated = null // Callback to receive the Three.js group
}, ref) => {
  const effectGroupRef = useRef(null);
  const shadersRef = useRef([]);
  const geometryRef = useRef(null);
  const windFlowsRef = useRef([]); // For flow mode wind data
  const animationDataRef = useRef({
    lastTime: 0,
    isAnimating: false
  });

  // Vertex shader
  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader for whirl mode
  const fragmentShaderWhirl = `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;

    void main() {
      float len = 0.15;
      float falloff = 0.1;
      float p = mod(uTime * 0.25, 1.0);
      float alpha = smoothstep(len, len - falloff, abs(vUv.x - p));
      float width = smoothstep(len * 2.0, 0.0, abs(vUv.x - p)) * 0.5;
      alpha *= smoothstep(width, width - 0.3, abs(vUv.y - 0.5));
      alpha *= smoothstep(0.5, 0.3, abs(p - 0.5) * (1.0 + len));

      gl_FragColor.rgb = uColor;
      gl_FragColor.a = alpha;
    }
  `;

  // Fragment shader for flow mode with fade out
  const fragmentShaderFlow = `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uLifeProgress; // 0 to 1, where 1 means end of life

    void main() {
      float len = 0.15;
      float falloff = 0.1;
      float p = mod(uTime * 0.25, 1.0);
      float alpha = smoothstep(len, len - falloff, abs(vUv.x - p));
      float width = smoothstep(len * 2.0, 0.0, abs(vUv.x - p)) * 0.5;
      alpha *= smoothstep(width, width - 0.3, abs(vUv.y - 0.5));
      alpha *= smoothstep(0.5, 0.3, abs(p - 0.5) * (1.0 + len));

      // Fade out based on life progress
      alpha *= 1.0 - uLifeProgress;

      gl_FragColor.rgb = uColor;
      gl_FragColor.a = alpha;
    }
  `;

  // Create spiral path for whirl mode
  const createSpiral = useMemo(() => {
    const points = [];
    let r = spiralRadius;
    let a = 0;
    
    const segmentCount = Math.floor(120 * windAmount);
    
    for (let i = 0; i < segmentCount; i++) {
      const p = (1 - i / segmentCount);
      r -= Math.pow(p, 2) * 0.187 * spiralRadius / 8;
      a += (0.3 - (r / (spiralRadius * 0.75)) * 0.2) * windCurls;

      points.push(new THREE.Vector3(
        r * Math.sin(a),
        Math.pow(p, 2.5) * 2,
        r * Math.cos(a)
      ));
    }
    return points;
  }, [spiralRadius, windAmount, windCurls]);

  // Create flowing curved path for flow mode
  const createFlowPath = (startX, startZ, endX, endZ) => {
    const points = [];
    const baseSegments = 120;
    const segments = Math.floor(baseSegments * windAmount);
    
    // Create control points for a curved path with windCurls affecting the curvature
    const curlIntensity = windCurls * 0.3;
    const midX = (startX + endX) / 2 + (Math.random() - 0.5) * area[0] * curlIntensity;
    const midZ = (startZ + endZ) / 2 + (Math.random() - 0.5) * area[1] * curlIntensity;
    
    // Add some vertical variation affected by windCurls
    const startY = Math.random() * 2;
    const midY = startY + Math.random() * 3 * windCurls;
    const endY = startY + Math.random() * 2;
    
    // Add additional control points for more complex curves when windCurls is high
    const useComplexCurve = windCurls > 1.2;
    
    if (useComplexCurve) {
      // Cubic Bezier for more curly paths
      const ctrl1X = startX + (midX - startX) * 0.33 + (Math.random() - 0.5) * area[0] * curlIntensity * 0.5;
      const ctrl1Z = startZ + (midZ - startZ) * 0.33 + (Math.random() - 0.5) * area[1] * curlIntensity * 0.5;
      const ctrl1Y = startY + Math.random() * 2 * windCurls;
      
      const ctrl2X = startX + (midX - startX) * 0.66 + (Math.random() - 0.5) * area[0] * curlIntensity * 0.5;
      const ctrl2Z = startZ + (midZ - startZ) * 0.66 + (Math.random() - 0.5) * area[1] * curlIntensity * 0.5;
      const ctrl2Y = midY + Math.random() * 2 * windCurls;
      
      for (let i = 0; i < segments; i++) {
        const t = i / (segments - 1);
        
        // Cubic Bezier curve
        const x = Math.pow(1 - t, 3) * startX + 
                  3 * Math.pow(1 - t, 2) * t * ctrl1X + 
                  3 * (1 - t) * Math.pow(t, 2) * ctrl2X + 
                  Math.pow(t, 3) * endX;
        
        const y = Math.pow(1 - t, 3) * startY + 
                  3 * Math.pow(1 - t, 2) * t * ctrl1Y + 
                  3 * (1 - t) * Math.pow(t, 2) * ctrl2Y + 
                  Math.pow(t, 3) * endY;
        
        const z = Math.pow(1 - t, 3) * startZ + 
                  3 * Math.pow(1 - t, 2) * t * ctrl1Z + 
                  3 * (1 - t) * Math.pow(t, 2) * ctrl2Z + 
                  Math.pow(t, 3) * endZ;
        
        points.push(new THREE.Vector3(x, y, z));
      }
    } else {
      // Quadratic Bezier for simpler curves
      for (let i = 0; i < segments; i++) {
        const t = i / (segments - 1);
        
        const x = Math.pow(1 - t, 2) * startX + 2 * (1 - t) * t * midX + Math.pow(t, 2) * endX;
        const y = Math.pow(1 - t, 2) * startY + 2 * (1 - t) * t * midY + Math.pow(t, 2) * endY;
        const z = Math.pow(1 - t, 2) * startZ + 2 * (1 - t) * t * midZ + Math.pow(t, 2) * endZ;
        
        points.push(new THREE.Vector3(x, y, z));
      }
    }
    
    return points;
  };

  // Create ribbon geometry from points
  const createRibbonGeometry = (points) => {
    const geometry = new THREE.BufferGeometry();

    // Create vertices for ribbon
    const positions = new Float32Array(points.length * 3 * 2);
    const uvs = new Float32Array(points.length * 2 * 2);
    const indices = new Uint16Array(points.length * 6);

    points.forEach((point, i) => {
      const offset = ribbonWidth;

      // Set positions
      positions[i * 6 + 0] = point.x;
      positions[i * 6 + 1] = point.y + offset;
      positions[i * 6 + 2] = point.z;

      positions[i * 6 + 3] = point.x;
      positions[i * 6 + 4] = point.y - offset;
      positions[i * 6 + 5] = point.z;

      // Set UVs
      uvs[i * 4 + 0] = i / (points.length - 1);
      uvs[i * 4 + 1] = 0;
      uvs[i * 4 + 2] = i / (points.length - 1);
      uvs[i * 4 + 3] = 1;

      // Set indices
      if (i < points.length - 1) {
        indices[i * 6 + 0] = i * 2;
        indices[i * 6 + 1] = i * 2 + 1;
        indices[i * 6 + 2] = i * 2 + 2;

        indices[i * 6 + 3] = i * 2 + 1;
        indices[i * 6 + 4] = i * 2 + 3;
        indices[i * 6 + 5] = i * 2 + 2;
      }
    });

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    return geometry;
  };

  // Create spiral geometry for whirl mode
  const createSpiralGeometry = useMemo(() => {
    return createRibbonGeometry(createSpiral);
  }, [createSpiral, ribbonWidth]);

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

    const currentTime = Date.now();
    const delta = currentTime - animationDataRef.current.lastTime;

    if (mode === 'whirl') {
      // Rotate the entire group in whirl mode
      effectGroup.rotation.y += 0.02 * speed;

      // Update shader uniforms
      shadersRef.current.forEach(shader => {
        if (shader && shader.uniforms && shader.uniforms.uTime) {
          shader.uniforms.uTime.value += delta * 0.001 * shader.speed * speed;
        }
      });
    } else if (mode === 'flow') {
      // Update each wind flow
      windFlowsRef.current.forEach((flowData, index) => {
        if (!flowData.mesh) return;

        // Update life progress
        flowData.lifeProgress += deltaTime * speed * 0.15; // Adjust this for flow duration

        // Update shader uniforms
        if (flowData.shader && flowData.shader.uniforms) {
          flowData.shader.uniforms.uTime.value += delta * 0.001 * flowData.shader.speed * speed;
          flowData.shader.uniforms.uLifeProgress.value = flowData.lifeProgress;
        }

        // Respawn when life ends
        if (flowData.lifeProgress >= 1) {
          respawnFlowWind(flowData, index);
        }
      });
    }

    animationDataRef.current.lastTime = currentTime;
  };

  // Respawn a flow wind with new path
  const respawnFlowWind = (flowData, index) => {
    const effectGroup = effectGroupRef.current;
    if (!effectGroup || !flowData.mesh) return;

    // Remove old mesh
    effectGroup.remove(flowData.mesh);
    if (flowData.mesh.geometry) flowData.mesh.geometry.dispose();

    // Create new random path
    const startX = (Math.random() - 0.5) * area[0];
    const startZ = (Math.random() - 0.5) * area[1];
    const endX = (Math.random() - 0.5) * area[0];
    const endZ = (Math.random() - 0.5) * area[1];
    
    const newPath = createFlowPath(startX, startZ, endX, endZ);
    const newGeometry = createRibbonGeometry(newPath);

    // Create new mesh with existing shader
    const newMesh = new THREE.Mesh(newGeometry, flowData.shader);
    effectGroup.add(newMesh);

    // Update flow data
    flowData.mesh = newMesh;
    flowData.lifeProgress = 0;
    flowData.shader.uniforms.uLifeProgress.value = 0;
  };

  // Dispose function
  const disposeEffect = () => {
    if (geometryRef.current) {
      geometryRef.current.dispose();
    }
    
    shadersRef.current.forEach(shader => {
      if (shader) shader.dispose();
    });
    shadersRef.current = [];

    windFlowsRef.current.forEach(flowData => {
      if (flowData.mesh && flowData.mesh.geometry) {
        flowData.mesh.geometry.dispose();
      }
    });
    windFlowsRef.current = [];

    if (effectGroupRef.current) {
      effectGroupRef.current.children.forEach(mesh => {
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) mesh.material.dispose();
      });
      effectGroupRef.current.clear();
    }
  };

  // Initialize effect group
  useEffect(() => {
    // Create effect group
    const effectGroup = new THREE.Group();
    effectGroup.position.set(position.x, position.y, position.z);
    effectGroup.rotation.set(rotation.x, rotation.y, rotation.z);
    effectGroupRef.current = effectGroup;

    // Convert color to THREE.Color
    const windColor = new THREE.Color(color);

    if (mode === 'whirl') {
      // Whirl mode: Create spiral ribbons
      geometryRef.current = createSpiralGeometry;

      for (let i = 0; i < intensity; i++) {
        const uniforms = {
          uTime: { type: 'f', value: Math.random() * 3 },
          uColor: { type: 'v3', value: new THREE.Vector3(windColor.r, windColor.g, windColor.b) }
        };

        const shaderMaterial = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShaderWhirl,
          side: THREE.DoubleSide,
          transparent: true,
          depthTest: false
        });

        shaderMaterial.speed = Math.random() * 0.4 + 0.8;
        shadersRef.current.push(shaderMaterial);

        const mesh = new THREE.Mesh(geometryRef.current, shaderMaterial);
        
        mesh.rotation.y = Math.random() * 10;
        const scale = 0.5 + Math.random();
        mesh.scale.set(scale, Math.random() * 0.2 + 0.9, scale);
        mesh.position.y = Math.random();

        effectGroup.add(mesh);
      }
    } else if (mode === 'flow') {
      // Flow mode: Create flowing wind ribbons
      windFlowsRef.current = [];

      for (let i = 0; i < intensity; i++) {
        // Generate random start and end points within the area
        const startX = (Math.random() - 0.5) * area[0];
        const startZ = (Math.random() - 0.5) * area[1];
        const endX = (Math.random() - 0.5) * area[0];
        const endZ = (Math.random() - 0.5) * area[1];
        
        const flowPath = createFlowPath(startX, startZ, endX, endZ);
        const geometry = createRibbonGeometry(flowPath);

        const uniforms = {
          uTime: { type: 'f', value: Math.random() * 3 },
          uColor: { type: 'v3', value: new THREE.Vector3(windColor.r, windColor.g, windColor.b) },
          uLifeProgress: { type: 'f', value: 0 }
        };

        const shaderMaterial = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShaderFlow,
          side: THREE.DoubleSide,
          transparent: true,
          depthTest: false
        });

        shaderMaterial.speed = Math.random() * 0.4 + 0.8;
        shadersRef.current.push(shaderMaterial);

        const mesh = new THREE.Mesh(geometry, shaderMaterial);
        effectGroup.add(mesh);

        // Store flow data for animation
        windFlowsRef.current.push({
          mesh: mesh,
          shader: shaderMaterial,
          lifeProgress: Math.random(), // Stagger the start times
          startX: startX,
          startZ: startZ,
          endX: endX,
          endZ: endZ
        });
      }
    }

    // Initialize animation time
    animationDataRef.current.lastTime = Date.now();

    // Notify parent component that group is ready
    if (onGroupCreated) {
      onGroupCreated(effectGroup);
    }

    // Cleanup function
    return () => {
      disposeEffect();
    };
  }, [intensity, color, spiralRadius, ribbonWidth, mode, area, windAmount, windCurls, createSpiralGeometry, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, onGroupCreated]);

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

WindEffect.displayName = 'WindEffect';

export default WindEffect;