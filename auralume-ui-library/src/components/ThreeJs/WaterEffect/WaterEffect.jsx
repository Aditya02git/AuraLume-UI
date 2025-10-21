import React, { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

// Classic Perlin 3D Noise shader chunk
const cnoise = `
vec4 permute(vec4 x) {
    return mod(((x*34.0)+1.0)*x, 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t) {
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}
float cnoise(vec3 P) {
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;
    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);
    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);
    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;
    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);
    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}
`;

// Vertex Shader
const vertexShader = `
${cnoise}

uniform vec2 uWavesFrequency;
uniform float uWavesElevation;
uniform float uWavesWarpIntensity;
uniform float uWavesSpeed;
uniform float uTime;
uniform float uChopWavesFrequency;
uniform float uChopWavesElevation;
uniform float uChopWavesIterations;
uniform float uChopWavesSpeed;
uniform bool uIsCircle;

varying float vElevation;
varying vec2 vUv;
varying float vFoamFactor;
varying vec3 vNormal;
varying vec2 vWorldPosition;

vec2 warpDomain(vec2 coord, float time, float warpIntensity, float warpFrequency) {
  float offsetX = cnoise(vec3(coord * warpFrequency, time));
  float offsetY = cnoise(vec3(coord * warpFrequency + 100.0, time));
  return coord + vec2(offsetX, offsetY) * warpIntensity;
}

float getElevation(vec2 worldXZ) {
  // Primary wave pattern with time animation
  float elevation = sin(worldXZ.x * uWavesFrequency.x + uTime * uWavesSpeed) * 
                    sin(0.5 * worldXZ.x * uWavesFrequency.x + uTime * uWavesSpeed * 0.8) *
                    sin(worldXZ.y * uWavesFrequency.y + uTime * uWavesSpeed * 1.1) * 
                    sin(0.5 * worldXZ.y * uWavesFrequency.y + uTime * uWavesSpeed * 0.9) *
                    uWavesElevation;
  
  // Additional wave layers for more complexity
  elevation += sin(worldXZ.x * uWavesFrequency.x * 0.7 + uTime * uWavesSpeed * 1.3) * 
               cos(worldXZ.y * uWavesFrequency.y * 0.8 + uTime * uWavesSpeed * 0.7) * 
               uWavesElevation * 0.3;
  
  // Chop waves with noise for more realistic movement
  for(float i = 1.0; i <= uChopWavesIterations; i++) {
    vec2 warpedChopXZ = warpDomain(worldXZ, uTime * uChopWavesSpeed, uWavesWarpIntensity, uChopWavesFrequency * i);
    float chopNoise = cnoise(vec3(warpedChopXZ * uChopWavesFrequency * i, uTime * uChopWavesSpeed));
    elevation -= abs(chopNoise) * uChopWavesElevation / i;
  }
  
  return elevation;
}

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  float elevation = getElevation(modelPosition.xz);
  modelPosition.y += elevation;
  
  // Calculate foam factor based on wave height and movement
  float foamFactor = smoothstep(-0.1, 0.4, elevation / uWavesElevation); 
  foamFactor = clamp(foamFactor, 0.0, 1.0);
  
  // Add some randomness to break up uniform foam distribution
  float foamVariation = cnoise(vec3(modelPosition.xz * 1.0, uTime * 0.15));
  foamFactor *= (0.5 + 0.5 * foamVariation);
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  gl_Position = projectedPosition;
  
  vElevation = elevation;
  vUv = uv;
  vFoamFactor = foamFactor;
  vWorldPosition = modelPosition.xz;
}
`;

// Fragment Shader - FIXED foam animation
const fragmentShader = `
${cnoise}

uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform float uTime;
uniform vec3 uFoamColor;
uniform float uFoamOffset;
uniform float uFoamIntensity;
uniform float uFoamSpeed;
uniform float uFoamScale;
uniform sampler2D uFoamTexture;
uniform bool uIsCircle;
uniform float uCircleRadius;
uniform float uCircleFadeWidth;

varying float vFoamFactor;
varying float vElevation;
varying vec2 vUv;
varying vec3 vNormal;
varying vec2 vWorldPosition;

void main() {
  float colorMixStrength = (vElevation + uColorOffset) * uColorMultiplier;
  colorMixStrength = clamp(colorMixStrength, 0.0, 1.0);
  vec3 waterColor = mix(uDepthColor, uSurfaceColor, colorMixStrength);
  
  // FIXED: Improved foam texture animation with multiple moving layers
  // Layer 1: Moving diagonally with time
  vec2 foamUV1 = vUv * uFoamScale + vec2(uTime * uFoamSpeed * 0.8, uTime * uFoamSpeed * 0.6);
  
  // Layer 2: Moving in opposite direction with different speed
  vec2 foamUV2 = vUv * uFoamScale * 0.7 + vec2(-uTime * uFoamSpeed * 1.2, uTime * uFoamSpeed * 0.9);
  
  // Layer 3: Circular motion for more dynamic movement
  float angle = uTime * uFoamSpeed * 2.0;
  vec2 circularOffset = vec2(cos(angle), sin(angle)) * 0.1;
  vec2 foamUV3 = vUv * uFoamScale * 1.3 + circularOffset;
  
  float foamTex1 = texture2D(uFoamTexture, foamUV1).r;
  float foamTex2 = texture2D(uFoamTexture, foamUV2).r;
  float foamTex3 = texture2D(uFoamTexture, foamUV3).r;
  
  // Combine multiple texture layers for richer movement
  float foamTex = mix(mix(foamTex1, foamTex2, 0.5), foamTex3, 0.3);
  foamTex = foamTex * 2.0 - 1.0;
  
  // FIXED: Multiple animated noise layers with different frequencies and time offsets
  float baseTime = uTime * uFoamSpeed;
  
  // Primary foam noise - medium frequency, main movement
  float foamNoise1 = cnoise(vec3(vWorldPosition * uFoamScale * 0.1, baseTime * 0.8 + 100.0));
  
  // Secondary foam noise - higher frequency, faster movement
  float foamNoise2 = cnoise(vec3(vWorldPosition * uFoamScale * 0.15, baseTime * 1.3 + 200.0));
  
  // Tertiary foam noise - lower frequency, slower movement for larger patterns
  float foamNoise3 = cnoise(vec3(vWorldPosition * uFoamScale * 0.05, baseTime * 0.5 + 300.0));
  
  // Additional high-frequency detail noise
  float foamDetail = cnoise(vec3(vWorldPosition * uFoamScale * 0.25, baseTime * 2.0 + 400.0));
  
  // FIXED: Combine noise layers with proper weighting and ensure continuous animation
  float combinedNoise = foamNoise1 * 0.4 + 
                       foamNoise2 * 0.3 + 
                       foamNoise3 * 0.2 + 
                       foamDetail * 0.1;
  
  // Add time-based oscillation to prevent static areas
  float timeOscillation = sin(baseTime * 1.5) * 0.1;
  combinedNoise += timeOscillation;
  
  // Ensure the noise is properly normalized
  combinedNoise = combinedNoise * 0.8; // Reduce intensity slightly for better blending
  
  // FIXED: Improved foam combination with better balance
  float foam = vFoamFactor * 0.6 + foamTex * 0.25 + combinedNoise * 0.25;
  
  // Add subtle time-based variation to foam threshold to prevent static patterns
  float dynamicOffset = uFoamOffset + sin(baseTime * 0.7) * 0.05;
  
  foam = smoothstep(dynamicOffset, dynamicOffset + 0.4, foam) * uFoamIntensity;
  foam = clamp(foam, 0.0, 1.0);
  
  float alpha = 1.0;
  
  if (uIsCircle) {
    // Calculate distance from center for circular mask
    vec2 center = vec2(0.0, 0.0);
    float distFromCenter = length(vWorldPosition - center);
    
    // Create circular mask with soft fade
    float circleMask = 1.0 - smoothstep(uCircleRadius - uCircleFadeWidth, uCircleRadius, distFromCenter);
    alpha = circleMask;
  } else {
    // Square shape - fade at edges
    float distX = min(vUv.x, 1.0 - vUv.x);
    float distY = min(vUv.y, 1.0 - vUv.y);
    float dist = min(distX, distY);
    alpha = smoothstep(0.0, 0.1, dist);
  }
  
  vec3 finalColor = mix(waterColor, uFoamColor, foam);
  gl_FragColor = vec4(finalColor, alpha);
}
`;

// Sea variants configuration
const seaVariants = {
  cold: {
    bgColor: "#89bcc8",
    surfaceColor: "#2e7385",
    depthColor: "#154956",
    foamColor: "#98cbe1",
    colorOffset: 0.2,
    colorMultiplier: 5.4,
  },
  warm: {
    bgColor: "#94ebff",
    surfaceColor: "#01c4d2",
    depthColor: "#2a7eb7",
    foamColor: "#d1f1ff",
    colorOffset: 0.183,
    colorMultiplier: 3.1,
  },
  temperate: {
    bgColor: "#b3dbf1",
    surfaceColor: "#2c76af",
    depthColor: "#114178",
    foamColor: "#b3d8f4",
    colorOffset: 0.3,
    colorMultiplier: 4.5,
  },
};

const WaterEffect = forwardRef(({
  // Ocean shader properties
  waveElevation = 0.215,
  waveFrequency = [2.5, 1.05],
  waveSpeed = 0.4,
  waveWarpIntensity = 0.08,
  chopWaveElevation = 0.105,
  chopWaveFrequency = 1.75,
  chopWaveSpeed = 0.2,
  chopWaveIterations = 3,
  
  // Color properties
  variant = 'warm', // 'cold', 'warm', 'temperate'
  customColors = null, // Override variant colors
  
  // Foam properties
  foamTexture = '1', // '1', '2', or 'none'
  foamOffset = 0.25, // Balanced for moderate foam frequency
  foamIntensity = 2.5, // Moderate foam visibility
  foamSpeed = 0.02,
  foamScale = 6, // Balanced scale that responds to changes
  
  // Geometry properties
  segments = 64,
  size = [10, 10],
  shape = 'square', // 'square' or 'circle'
  circleFadeWidth = 0.5, // Fade width for circular edges
  
  // Transform properties
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  
  // Animation
  autoAnimate = true,
  
  // Callbacks
  onUpdate,
  scene,
  ...props
}, ref) => {
  const groupRef = useRef(null);
  const waterMeshRef = useRef(null);
  const waterGeometryRef = useRef(null);
  const waterMaterialRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timeRef = useRef(0);
  const isInitializedRef = useRef(false);
  const foamTexturesRef = useRef({});
  const textureLoaderRef = useRef(new THREE.TextureLoader());
  const clockRef = useRef(new THREE.Clock()); // Add clock for consistent timing

  // Load foam textures
  const loadFoamTextures = useCallback(async () => {
    const textureUrls = {
      '1': 'https://raw.githubusercontent.com/Aditya02git/Foam-textures/main/foam-texture-1.webp',
      // '2': 'https://raw.githubusercontent.com/Aditya02git/Foam-textures/main/foam-texture-2.webp'
    };

    try {
      for (const [key, url] of Object.entries(textureUrls)) {
        if (!foamTexturesRef.current[key]) {
          const texture = await new Promise((resolve, reject) => {
            textureLoaderRef.current.load(
              url,
              resolve,
              undefined,
              reject
            );
          });
          
          // Configure texture
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.flipY = false;
          
          foamTexturesRef.current[key] = texture;
        }
      }
      
      // Create default empty texture for 'none'
      if (!foamTexturesRef.current.none) {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 1, 1);
        
        const emptyTexture = new THREE.CanvasTexture(canvas);
        foamTexturesRef.current.none = emptyTexture;
      }
      
    } catch (error) {
      console.warn('Failed to load foam textures:', error);
      // Create fallback empty texture
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, 1, 1);
      
      const fallbackTexture = new THREE.CanvasTexture(canvas);
      foamTexturesRef.current.none = fallbackTexture;
      foamTexturesRef.current['1'] = fallbackTexture;
      foamTexturesRef.current['2'] = fallbackTexture;
    }
  }, []);

  // Get current variant colors
  const getVariantColors = useCallback(() => {
    if (customColors) return customColors;
    return seaVariants[variant] || seaVariants.warm;
  }, [variant, customColors]);

  // Create water geometry - always use plane geometry now
  const createWaterGeometry = useCallback(() => {
    return new THREE.PlaneGeometry(
      size[0],
      size[1],
      segments,
      segments
    );
  }, [size, segments]);

  // Create shader material
  const createShaderMaterial = useCallback(async () => {
    const colors = getVariantColors();
    
    // Ensure foam textures are loaded
    await loadFoamTextures();
    
    // Get the selected foam texture
    const selectedTexture = foamTexturesRef.current[foamTexture] || foamTexturesRef.current.none;
    
    // Calculate circle radius for circular shape
    const circleRadius = shape === 'circle' ? Math.max(...size) / 2 : 0;
    
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uWavesElevation: { value: waveElevation },
        uWavesFrequency: { value: new THREE.Vector2(waveFrequency[0], waveFrequency[1]) },
        uWavesSpeed: { value: waveSpeed },
        uWavesWarpIntensity: { value: waveWarpIntensity },
        uChopWavesElevation: { value: chopWaveElevation },
        uChopWavesFrequency: { value: chopWaveFrequency },
        uChopWavesSpeed: { value: chopWaveSpeed },
        uChopWavesIterations: { value: chopWaveIterations },
        uSurfaceColor: { value: new THREE.Color(colors.surfaceColor) },
        uDepthColor: { value: new THREE.Color(colors.depthColor) },
        uColorOffset: { value: colors.colorOffset },
        uColorMultiplier: { value: colors.colorMultiplier },
        uFoamColor: { value: new THREE.Color(colors.foamColor) },
        uFoamOffset: { value: foamOffset },
        uFoamIntensity: { value: foamIntensity },
        uFoamSpeed: { value: foamSpeed },
        uFoamScale: { value: foamScale },
        uFoamTexture: { value: selectedTexture },
        uIsCircle: { value: shape === 'circle' },
        uCircleRadius: { value: circleRadius },
        uCircleFadeWidth: { value: circleFadeWidth },
      },
    });
  }, [
    waveElevation, waveFrequency, waveSpeed, waveWarpIntensity,
    chopWaveElevation, chopWaveFrequency, chopWaveSpeed, chopWaveIterations,
    foamTexture, foamOffset, foamIntensity, foamSpeed, foamScale,
    getVariantColors, loadFoamTextures, shape, size, circleFadeWidth
  ]);

  // Create the complete water object
  const createWaterObject = useCallback(async () => {
    if (!scene || isInitializedRef.current) return;

    // Create main group
    const group = new THREE.Group();
    groupRef.current = group;

    // Set transform
    group.position.set(...position);
    group.rotation.set(...rotation);
    group.scale.set(...scale);

    // Create geometry and material
    const geometry = createWaterGeometry();
    const material = await createShaderMaterial();

    // Always rotate plane to be horizontal
    geometry.rotateX(-Math.PI / 2);

    // Create mesh
    const waterMesh = new THREE.Mesh(geometry, material);
    group.add(waterMesh);

    // Store references
    waterGeometryRef.current = geometry;
    waterMaterialRef.current = material;
    waterMeshRef.current = waterMesh;

    // Add to scene
    scene.add(group);
    isInitializedRef.current = true;

    // Set background color if it's the main scene
    const colors = getVariantColors();
    // if (scene.background) {
    //   scene.background = new THREE.Color(colors.bgColor);
    // }
  }, [
    scene, position, rotation, scale,
    createWaterGeometry, createShaderMaterial, getVariantColors
  ]);

  // Animation loop - FIXED: Use clock for consistent time updates
  const animate = useCallback(() => {
    if (!autoAnimate || !waterMaterialRef.current) return;

    // Use THREE.Clock for consistent timing
    const elapsedTime = clockRef.current.getElapsedTime();
    waterMaterialRef.current.uniforms.uTime.value = elapsedTime;
    timeRef.current = elapsedTime;

    onUpdate?.(elapsedTime);
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [autoAnimate, onUpdate]);

  // Start animation
  const startAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    clockRef.current.start(); // Start the clock
    animate();
  }, [animate]);

  // Stop animation
  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    clockRef.current.stop();
  }, []);

  // Update foam texture when foamTexture prop changes
  useEffect(() => {
    if (!waterMaterialRef.current) return;

    const updateTexture = async () => {
      await loadFoamTextures();
      const selectedTexture = foamTexturesRef.current[foamTexture] || foamTexturesRef.current.none;
      waterMaterialRef.current.uniforms.uFoamTexture.value = selectedTexture;
    };

    updateTexture();
  }, [foamTexture, loadFoamTextures]);

  // Update material uniforms when properties change
  useEffect(() => {
    if (!waterMaterialRef.current) return;

    const material = waterMaterialRef.current;
    material.uniforms.uWavesElevation.value = waveElevation;
    material.uniforms.uWavesFrequency.value.set(waveFrequency[0], waveFrequency[1]);
    material.uniforms.uWavesSpeed.value = waveSpeed;
    material.uniforms.uWavesWarpIntensity.value = waveWarpIntensity;
    material.uniforms.uChopWavesElevation.value = chopWaveElevation;
    material.uniforms.uChopWavesFrequency.value = chopWaveFrequency;
    material.uniforms.uChopWavesSpeed.value = chopWaveSpeed;
    material.uniforms.uChopWavesIterations.value = chopWaveIterations;
    material.uniforms.uFoamOffset.value = foamOffset;
    material.uniforms.uFoamIntensity.value = foamIntensity;
    material.uniforms.uFoamSpeed.value = foamSpeed;
    material.uniforms.uFoamScale.value = foamScale;
  }, [
    waveElevation, waveFrequency, waveSpeed, waveWarpIntensity,
    chopWaveElevation, chopWaveFrequency, chopWaveSpeed, chopWaveIterations,
    foamOffset, foamIntensity, foamSpeed, foamScale
  ]);

  // Update shape-related uniforms when shape changes
  useEffect(() => {
    if (!waterMaterialRef.current) return;

    const material = waterMaterialRef.current;
    const circleRadius = shape === 'circle' ? Math.max(...size) / 2 : 0;
    
    material.uniforms.uIsCircle.value = shape === 'circle';
    material.uniforms.uCircleRadius.value = circleRadius;
    material.uniforms.uCircleFadeWidth.value = circleFadeWidth;
  }, [shape, size, circleFadeWidth]);

  // Update colors when variant or custom colors change
  useEffect(() => {
    if (!waterMaterialRef.current) return;

    const colors = getVariantColors();
    const material = waterMaterialRef.current;
    
    material.uniforms.uSurfaceColor.value.set(colors.surfaceColor);
    material.uniforms.uDepthColor.value.set(colors.depthColor);
    material.uniforms.uFoamColor.value.set(colors.foamColor);
    material.uniforms.uColorOffset.value = colors.colorOffset;
    material.uniforms.uColorMultiplier.value = colors.colorMultiplier;

    // Update scene background
    // if (scene && scene.background) {
    //   scene.background.set(colors.bgColor);
    // }
  }, [variant, customColors, getVariantColors, scene]);

  // Update transforms when props change
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...position);
      groupRef.current.rotation.set(...rotation);
      groupRef.current.scale.set(...scale);
    }
  }, [position, rotation, scale]);

  // Recreate geometry when segments or size change
  useEffect(() => {
    if (isInitializedRef.current && (waterGeometryRef.current || waterMeshRef.current)) {
      // Dispose old geometry
      if (waterGeometryRef.current) {
        waterGeometryRef.current.dispose();
      }

      // Create new geometry
      const geometry = createWaterGeometry();
      geometry.rotateX(-Math.PI / 2);

      // Update mesh
      if (waterMeshRef.current) {
        waterMeshRef.current.geometry = geometry;
        waterGeometryRef.current = geometry;
      }
    }
  }, [segments, size, createWaterGeometry]);

  // Handle autoAnimate changes
  useEffect(() => {
    if (autoAnimate && waterMaterialRef.current) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [autoAnimate, startAnimation, stopAnimation]);

  // Initialize on mount
  useEffect(() => {
    const init = async () => {
      await createWaterObject();
      
      if (autoAnimate) {
        startAnimation();
      }
    };

    init();

    return () => {
      stopAnimation();
      if (groupRef.current && scene) {
        scene.remove(groupRef.current);
      }
      if (waterGeometryRef.current) {
        waterGeometryRef.current.dispose();
      }
      if (waterMaterialRef.current) {
        waterMaterialRef.current.dispose();
      }
      // Dispose foam textures
      Object.values(foamTexturesRef.current).forEach(texture => {
        if (texture) texture.dispose();
      });
      isInitializedRef.current = false;
    };
  }, [createWaterObject, startAnimation, stopAnimation, autoAnimate, scene]);

  // Exposed methods for external control
  const setVariant = useCallback((newVariant) => {
    if (seaVariants[newVariant] && waterMaterialRef.current) {
      const colors = seaVariants[newVariant];
      const material = waterMaterialRef.current;
      
      material.uniforms.uSurfaceColor.value.set(colors.surfaceColor);
      material.uniforms.uDepthColor.value.set(colors.depthColor);
      material.uniforms.uFoamColor.value.set(colors.foamColor);
      material.uniforms.uColorOffset.value = colors.colorOffset;
      material.uniforms.uColorMultiplier.value = colors.colorMultiplier;

      // if (scene && scene.background) {
      //   scene.background.set(colors.bgColor);
      // }
    }
  }, [scene]);

  const setFoamTexture = useCallback(async (textureKey) => {
    if (!waterMaterialRef.current) return;

    await loadFoamTextures();
    const selectedTexture = foamTexturesRef.current[textureKey] || foamTexturesRef.current.none;
    waterMaterialRef.current.uniforms.uFoamTexture.value = selectedTexture;
  }, [loadFoamTextures]);

  const setWaveProperties = useCallback((properties) => {
    if (!waterMaterialRef.current) return;

    const material = waterMaterialRef.current;
    if (properties.waveElevation !== undefined) {
      material.uniforms.uWavesElevation.value = properties.waveElevation;
    }
    if (properties.waveSpeed !== undefined) {
      material.uniforms.uWavesSpeed.value = properties.waveSpeed;
    }
    if (properties.foamIntensity !== undefined) {
      material.uniforms.uFoamIntensity.value = properties.foamIntensity;
    }
  }, []);

  const getGroup = useCallback(() => groupRef.current, []);
  const getMaterial = useCallback(() => waterMaterialRef.current, []);

  // Attach methods to ref for external access
  useImperativeHandle(ref, () => ({
    setVariant,
    setFoamTexture,
    setWaveProperties,
    getGroup,
    getMaterial,
    getCurrentTime: () => timeRef.current,
    getFoamTextures: () => foamTexturesRef.current,
    startAnimation,
    stopAnimation,
  }), [setVariant, setFoamTexture, setWaveProperties, getGroup, getMaterial, startAnimation, stopAnimation]);

  return null;
});

WaterEffect.displayName = 'WaterEffect';

export default WaterEffect;