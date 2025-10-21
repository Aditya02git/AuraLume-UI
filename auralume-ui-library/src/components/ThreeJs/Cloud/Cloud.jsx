import React, { useRef, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';

// Enhanced Fluffy Cloud Shaders with MUCH slower animation speeds
const fluffyCloudVertexShader = `
uniform float uTime;
uniform float uFluffiness;
uniform vec3 uWindDirection;
uniform float uWindSpeed;
uniform float uCloudType; // 0=cirrus, 1=cumulus, 2=stratus, 3=nimbus

attribute float vertexRandomness;
attribute vec3 originalPosition;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vFluffyness;
varying vec2 vUv;
varying float vVertexRandomness;

// Improved noise function
float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    return mix(
        mix(mix(hash(i + vec3(0,0,0)), hash(i + vec3(1,0,0)), f.x),
            mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
        mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
            mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}

float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 6; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vUv = uv;
    vPosition = position;
    vVertexRandomness = vertexRandomness;
    
    vec3 pos = originalPosition;
    // MUCH slower time-based animation
    vec3 animatedPos = pos + uWindDirection * uTime * uWindSpeed * 0.1; // Reduced by 10x
    
    // Different displacement patterns for different cloud types - ALL MUCH SLOWER
    float displacement = 0.0;
    
    if (uCloudType < 0.5) { // Cirrus - wispy, thin
        displacement = fbm(animatedPos * 3.0 + uTime * 0.02) * 0.3; // Reduced from 0.2 to 0.02
        displacement += sin(pos.x * 8.0 + uTime * 0.1) * 0.1; // Reduced time factor by 10x
    } else if (uCloudType < 1.5) { // Cumulus - puffy, round
        displacement = fbm(animatedPos * 2.0 + uTime * 0.01) * 0.8; // Reduced from 0.1 to 0.01
        displacement += noise(pos * 6.0 + uTime * 0.05) * 0.4; // Added slow time component
    } else if (uCloudType < 2.5) { // Stratus - flat, layered
        displacement = fbm(animatedPos * 1.5 + uTime * 0.005) * 0.4; // Reduced from 0.05 to 0.005
        displacement += sin(pos.y * 12.0 + uTime * 0.03) * 0.1; // Much slower oscillation
    } else { // Nimbus - dark, stormy
        displacement = fbm(animatedPos * 2.5 + uTime * 0.03) * 1.0; // Reduced from 0.3 to 0.03
        displacement += noise(pos * 4.0 + uTime * 0.05) * 0.3; // Reduced from 0.5 to 0.05
    }
    
    // Apply fluffiness with better distribution
    vec3 fluffyPos = pos + normal * displacement * uFluffiness;
    
    // Add vertex-based randomness for more organic shape
    fluffyPos += normal * vertexRandomness * uFluffiness * 0.2;
    
    // Much more subtle wind deformation
    vec3 windOffset = uWindDirection * sin(uTime * 0.03 + pos.x * 0.3) * 0.05; // Much slower and smaller
    fluffyPos += windOffset;
    
    vFluffyness = displacement;
    vWorldPosition = (modelMatrix * vec4(fluffyPos, 1.0)).xyz;
    
    // Better normal calculation for proper lighting
    vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
    vec3 bitangent = cross(normal, tangent);
    vec3 newNormal = normalize(normal + tangent * displacement * 0.2 + bitangent * displacement * 0.1);
    vNormal = newNormal;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(fluffyPos, 1.0);
}
`;

const fluffyCloudFragmentShader = `
uniform vec3 uColor;
uniform vec3 uShadowColor;
uniform float uOpacity;
uniform vec3 uLightDirection;
uniform float uTime;
uniform float uDensity;
uniform float uCloudType;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying float vFluffyness;
varying vec2 vUv;
varying float vVertexRandomness;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(uLightDirection);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    
    // Enhanced lighting calculation
    float NdotL = dot(normal, lightDir);
    float lightIntensity = NdotL * 0.4 + 0.6; // Softer lighting
    
    // Fresnel-like rim lighting for anime style
    float rim = 1.0 - abs(dot(viewDir, normal));
    rim = pow(rim, 2.0);
    
    // Cloud texture based on type - MUCH SLOWER animation
    vec2 cloudUv = vUv * 2.0 + uTime * 0.001; // Reduced from 0.01 to 0.001
    float cloudTexture = 0.0;
    
    if (uCloudType < 0.5) { // Cirrus
        cloudTexture = fbm(cloudUv * 4.0) * 0.8;
        cloudTexture += noise(cloudUv * 12.0) * 0.3;
    } else if (uCloudType < 1.5) { // Cumulus
        cloudTexture = fbm(cloudUv * 2.0) * 0.9;
        cloudTexture += noise(cloudUv * 8.0) * 0.4;
    } else if (uCloudType < 2.5) { // Stratus
        cloudTexture = fbm(cloudUv * 1.5) * 0.7;
        cloudTexture += sin(cloudUv.y * 20.0) * 0.2;
    } else { // Nimbus
        cloudTexture = fbm(cloudUv * 3.0) * 1.0;
        cloudTexture += noise(cloudUv * 6.0) * 0.5;
    }
    
    // Combine with vertex displacement
    cloudTexture = mix(cloudTexture, vFluffyness, 0.3);
    cloudTexture = clamp(cloudTexture, 0.0, 1.0);
    
    // Color mixing with anime-style lighting
    vec3 baseColor = mix(uShadowColor, uColor, lightIntensity);
    vec3 rimColor = uColor * 1.3;
    vec3 finalColor = mix(baseColor, rimColor, rim * 0.4);
    
    // Add cloud texture variation
    finalColor = mix(finalColor * 0.9, finalColor * 1.1, cloudTexture);
    
    // Much better alpha calculation to completely prevent holes
    float centerDistance = length(vUv - 0.5);
    
    // Create a solid center with smooth edges - no holes
    float solidCenter = 1.0 - smoothstep(0.2, 0.8, centerDistance);
    float edgeFade = smoothstep(0.6, 1.0, centerDistance);
    
    // Cloud type specific alpha modifications
    float baseAlpha = uOpacity * uDensity;
    
    if (uCloudType < 0.5) { // Cirrus - more transparent
        baseAlpha *= 0.8;
        solidCenter *= 0.9; // Still maintain center solidity
    } else if (uCloudType < 1.5) { // Cumulus - solid
        baseAlpha *= 1.0;
        solidCenter *= 1.0; // Full center solidity
    } else if (uCloudType < 2.5) { // Stratus - uniform
        baseAlpha *= 0.9;
        solidCenter *= 0.95;
    } else { // Nimbus - dense
        baseAlpha *= 1.1;
        solidCenter *= 1.0;
    }
    
    // Ensure solid center with gradual fade to edges - NO HOLES
    float minCenterAlpha = baseAlpha * 0.8; // Strong center
    float maxEdgeAlpha = baseAlpha * 0.3;   // Soft edges
    
    float alpha = mix(maxEdgeAlpha, minCenterAlpha, solidCenter);
    alpha = max(alpha, baseAlpha * 0.4); // Minimum alpha threshold
    
    // Add very subtle texture variation (reduced to prevent holes)
    alpha *= (0.9 + cloudTexture * 0.2);
    
    // Subtle rim effect without creating holes
    alpha += rim * 0.1;
    
    gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
}
`;

// Environment shader (same as before)
const environmentVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const environmentFragmentShader = `
uniform vec3 uTopColor;
uniform vec3 uBottomColor;
uniform vec3 uSpot1Color;
uniform vec3 uSpot2Color;
uniform vec2 uSpot1Position;
uniform vec2 uSpot2Position;
varying vec2 vUv;

float distanceFromPoint(vec2 uv, vec2 point, float max) {
  float d = distance(uv, point);
  d = smoothstep(0.0, max, d);
  d = 1.0 - d;
  return d;
}

void main() {
  float d1 = distanceFromPoint(vUv, vec2(uSpot1Position), 0.3);
  float d2 = distanceFromPoint(vUv, vec2(uSpot2Position), 0.4);
  
  vec4 colorSpot1 = vec4(uSpot1Color, 1.0 * d1 * 0.8);
  vec4 colorSpot2 = vec4(uSpot2Color, 1.0 * d2 * 0.8);
  vec4 verticalGradient = vec4(mix(uBottomColor, uTopColor, vUv.y), 1.0);
  
  vec4 mixVS1 = mix(verticalGradient, colorSpot1, colorSpot1.a);
  vec4 final = mix(mixVS1, colorSpot2, colorSpot2.a);
  
  gl_FragColor = vec4(final.rgb, 1.0);
}
`;

// Cloud type configurations with adjusted speeds
const CLOUD_TYPES = {
  CIRRUS: 0,    // Wispy, high-altitude clouds
  CUMULUS: 1,   // Puffy, cotton-like clouds
  STRATUS: 2,   // Flat, layered clouds
  NIMBUS: 3     // Dark, storm clouds
};

const CLOUD_CONFIGS = {
  [CLOUD_TYPES.CIRRUS]: {
    name: 'Cirrus',
    baseColor: '#ffffff',
    shadowColor: '#e8f0ff',
    opacity: 0.6,
    density: 0.7,
    fluffiness: 0.3,
    scaleRange: [[2, 0.5, 0.8], [3, 0.8, 1.2]],
    speed: 0.3 // Reduced from 1.2
  },
  [CLOUD_TYPES.CUMULUS]: {
    name: 'Cumulus',
    baseColor: '#ffffff',
    shadowColor: '#d0d8e0',
    opacity: 0.9,
    density: 1.0,
    fluffiness: 0.8,
    scaleRange: [[1.5, 1.2, 1.5], [2.5, 2.0, 2.5]],
    speed: 0.2 // Reduced from 0.8
  },
  [CLOUD_TYPES.STRATUS]: {
    name: 'Stratus',
    baseColor: '#f8f8f8',
    shadowColor: '#c8d0d8',
    opacity: 0.8,
    density: 0.9,
    fluffiness: 0.4,
    scaleRange: [[3, 0.8, 2], [5, 1.2, 3]],
    speed: 0.125 // Reduced from 0.5
  },
  [CLOUD_TYPES.NIMBUS]: {
    name: 'Nimbus',
    baseColor: '#e0e0e0',
    shadowColor: '#808088',
    opacity: 0.95,
    density: 1.1,
    fluffiness: 1.0,
    scaleRange: [[2, 1.5, 2], [3.5, 2.5, 3.5]],
    speed: 0.15 // Reduced from 0.6
  }
};

const Cloud = forwardRef(({
  // Cloud area properties
  areaSize = [50, 8, 50],
  areaCenter = [0, 15, 0], // Changed from [0, 5, 0] to [0, 15, 0] for higher clouds
  
  // Movement properties
  windDirection = 'east',
  windSpeed = 0.1, // Much slower default wind speed
  
  // Procedural generation
  cloudDensity = 0.3,
  spawnRate = 5.0, // Slower spawn rate
  cloudLifetime = 120.0, // Longer lifetime
  
  // Cloud properties
  cloudCount = 15,
  cloudScale = [1, 1, 1],
  cloudPosition = [0, 0, 0], // Position of the entire cloud group container
  
  // Animation properties
  animationSpeed = 1, // Much slower default animation
  
  // Cloud type distribution (percentages that sum to 1.0)
  cloudTypeDistribution = {
    cirrus: 0,
    cumulus: 0.35,
    stratus: 0,
    nimbus: 0
  },
  
  // Override individual cloud properties (optional)
  cloudColor = null,
  shadowColor = null,
  opacity = null,
  fluffiness = null,
  density = null,
  cloudSize = [2, 1.5, 2],
  
  // Callback
  onGroupCreated,
  
  ...props
}, ref) => {
  const groupRef = useRef(null);
  const cloudInstancesRef = useRef([]);
  const materialsRef = useRef({});
  const lastSpawnTimeRef = useRef(0);
  const cloudIdCounterRef = useRef(0);

  // Convert wind direction to vector
  const getWindVector = () => {
    if (typeof windDirection === 'string') {
      switch (windDirection.toLowerCase()) {
        case 'north': return new THREE.Vector3(0, 0, -1);
        case 'south': return new THREE.Vector3(0, 0, 1);
        case 'east': return new THREE.Vector3(1, 0, 0);
        case 'west': return new THREE.Vector3(-1, 0, 0);
        case 'northeast': return new THREE.Vector3(0.707, 0, -0.707);
        case 'northwest': return new THREE.Vector3(-0.707, 0, -0.707);
        case 'southeast': return new THREE.Vector3(0.707, 0, 0.707);
        case 'southwest': return new THREE.Vector3(-0.707, 0, 0.707);
        default: return new THREE.Vector3(1, 0, 0);
      }
    } else if (Array.isArray(windDirection)) {
      return new THREE.Vector3(...windDirection).normalize();
    }
    return new THREE.Vector3(1, 0, 0);
  };

  const windVector = getWindVector();

  // Create different geometries for different cloud types - STRAIGHT orientation
  const createCloudGeometry = (cloudType) => {
    let baseGeometry;
    
    switch (cloudType) {
      case CLOUD_TYPES.CIRRUS:
        // Elongated, wispy shape - HORIZONTAL
        baseGeometry = new THREE.SphereGeometry(1, 16, 8);
        baseGeometry.scale(2.5, 0.4, 1); // Wide and thin, straight
        break;
      case CLOUD_TYPES.CUMULUS:
        // Round, puffy shape - keep natural
        baseGeometry = new THREE.SphereGeometry(1, 20, 16);
        break;
      case CLOUD_TYPES.STRATUS:
        // Flat, wide shape - HORIZONTAL layers
        baseGeometry = new THREE.SphereGeometry(1, 24, 12);
        baseGeometry.scale(3, 0.3, 1.8); // Very flat and wide
        break;
      case CLOUD_TYPES.NIMBUS:
        // Dense shape - slightly flattened but not rotated
        baseGeometry = new THREE.SphereGeometry(1, 18, 14);
        baseGeometry.scale(1.3, 1.2, 1.3); // Slightly wider
        break;
      default:
        baseGeometry = new THREE.SphereGeometry(1, 16, 12);
    }
    
    // Add custom attributes
    const positionCount = baseGeometry.attributes.position.count;
    const randomnessArray = new Float32Array(positionCount);
    const originalPositions = new Float32Array(positionCount * 3);
    
    for (let i = 0; i < positionCount; i++) {
      randomnessArray[i] = Math.random();
      originalPositions[i * 3] = baseGeometry.attributes.position.array[i * 3];
      originalPositions[i * 3 + 1] = baseGeometry.attributes.position.array[i * 3 + 1];
      originalPositions[i * 3 + 2] = baseGeometry.attributes.position.array[i * 3 + 2];
    }
    
    baseGeometry.setAttribute('vertexRandomness', new THREE.BufferAttribute(randomnessArray, 1));
    baseGeometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));
    
    return baseGeometry;
  };

  // Create shared geometries for each cloud type
  const sharedGeometries = useMemo(() => {
    return {
      [CLOUD_TYPES.CIRRUS]: createCloudGeometry(CLOUD_TYPES.CIRRUS),
      [CLOUD_TYPES.CUMULUS]: createCloudGeometry(CLOUD_TYPES.CUMULUS),
      [CLOUD_TYPES.STRATUS]: createCloudGeometry(CLOUD_TYPES.STRATUS),
      [CLOUD_TYPES.NIMBUS]: createCloudGeometry(CLOUD_TYPES.NIMBUS)
    };
  }, []);

  // Create cloud material for specific type
  const createCloudMaterial = (cloudType) => {
    const config = CLOUD_CONFIGS[cloudType];
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(cloudColor || config.baseColor) },
        uShadowColor: { value: new THREE.Color(shadowColor || config.shadowColor) },
        uOpacity: { value: opacity !== null ? opacity : config.opacity },
        uDensity: { value: density !== null ? density : config.density },
        uLightDirection: { value: new THREE.Vector3(0.5, 0.8, 0.3).normalize() },
        uFluffiness: { value: fluffiness !== null ? fluffiness : config.fluffiness },
        uWindDirection: { value: windVector },
        uWindSpeed: { value: windSpeed * animationSpeed * 0.1 }, // Further reduced wind effect
        uCloudType: { value: cloudType },
      },
      vertexShader: fluffyCloudVertexShader,
      fragmentShader: fluffyCloudFragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      alphaTest: 0.01, // Higher alpha test to eliminate holes
      blending: THREE.NormalBlending,
      depthFunc: THREE.LessEqualDepth // Better depth handling
    });

    return material;
  };

  // Select random cloud type based on distribution
  const selectCloudType = () => {
    const rand = Math.random();
    let cumulative = 0;
    
    if (rand < (cumulative += cloudTypeDistribution.cirrus)) return CLOUD_TYPES.CIRRUS;
    if (rand < (cumulative += cloudTypeDistribution.cumulus)) return CLOUD_TYPES.CUMULUS;
    if (rand < (cumulative += cloudTypeDistribution.stratus)) return CLOUD_TYPES.STRATUS;
    return CLOUD_TYPES.NIMBUS;
  };

  // Generate random cloud properties
  const generateCloudData = (spawnAtEdge = false) => {
    const id = cloudIdCounterRef.current++;
    const cloudType = selectCloudType();
    const config = CLOUD_CONFIGS[cloudType];
    
    const spawnArea = {
      x: areaSize[0],
      y: areaSize[1], 
      z: areaSize[2]
    };

    let position;
    
    if (spawnAtEdge) {
      const upwindEdge = windVector.clone().multiplyScalar(-spawnArea.x * 0.6);
      position = [
        areaCenter[0] + upwindEdge.x + (Math.random() - 0.5) * spawnArea.x * 0.2,
        areaCenter[1] + (Math.random() - 0.5) * spawnArea.y,
        areaCenter[2] + upwindEdge.z + (Math.random() - 0.5) * spawnArea.z * 0.2
      ];
    } else {
      position = [
        areaCenter[0] + (Math.random() - 0.5) * spawnArea.x,
        areaCenter[1] + (Math.random() - 0.5) * spawnArea.y,
        areaCenter[2] + (Math.random() - 0.5) * spawnArea.z
      ];
    }

    // Random scale within the config range
    const scaleMin = config.scaleRange[0];
    const scaleMax = config.scaleRange[1];
    const randomScale = [
      scaleMin[0] + Math.random() * (scaleMax[0] - scaleMin[0]),
      scaleMin[1] + Math.random() * (scaleMax[1] - scaleMin[1]),
      scaleMin[2] + Math.random() * (scaleMax[2] - scaleMin[2])
    ];

    return {
      id,
      cloudType,
      position,
      rotation: [
        0, // No random X rotation - keep straight
        Math.random() * Math.PI * 0.1, // Much smaller Y rotation
        0  // No Z rotation - keep flat
      ],
      scale: randomScale,
      velocity: windVector.clone().multiplyScalar(windSpeed * config.speed * animationSpeed * (0.8 + Math.random() * 0.4)),
      rotationSpeed: (Math.random() - 0.5) * 0.001 * animationSpeed, // MUCH slower rotation
      birthTime: performance.now() * 0.001,
      lifespan: cloudLifetime * (0.8 + Math.random() * 0.4),
      opacity: config.opacity * (0.8 + Math.random() * 0.2),
    };
  };

  // Create initial clouds
  const createInitialClouds = () => {
    if (!groupRef.current) return;

    const initialCount = Math.min(cloudCount, Math.floor(areaSize[0] * areaSize[2] * cloudDensity));
    
    for (let i = 0; i < initialCount; i++) {
      const cloudData = generateCloudData(false);
      spawnCloud(cloudData);
    }
  };

  // Spawn a single cloud with initial zero opacity
  const spawnCloud = (cloudData) => {
    if (!groupRef.current || cloudInstancesRef.current.length >= cloudCount) return;

    const geometry = sharedGeometries[cloudData.cloudType];
    const material = createCloudMaterial(cloudData.cloudType);
    material.uniforms.uOpacity.value = 0; // Start completely transparent
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...cloudData.position);
    mesh.rotation.set(...cloudData.rotation);
    mesh.scale.set(
      cloudData.scale[0] * cloudSize[0],
      cloudData.scale[1] * cloudSize[1],
      cloudData.scale[2] * cloudSize[2]
    );
    mesh.userData = cloudData;
    mesh.frustumCulled = true;
    mesh.renderOrder = -1; // Render clouds before other objects

    groupRef.current.add(mesh);
    cloudInstancesRef.current.push(mesh);
  };

  // Check if cloud is outside area bounds
  const isCloudOutOfBounds = (position) => {
    const bounds = {
      minX: areaCenter[0] - areaSize[0] * 0.7,
      maxX: areaCenter[0] + areaSize[0] * 0.7,
      minY: areaCenter[1] - areaSize[1] * 0.7,
      maxY: areaCenter[1] + areaSize[1] * 0.7,
      minZ: areaCenter[2] - areaSize[2] * 0.7,
      maxZ: areaCenter[2] + areaSize[2] * 0.7
    };

    return (
      position[0] < bounds.minX || position[0] > bounds.maxX ||
      position[1] < bounds.minY || position[1] > bounds.maxY ||
      position[2] < bounds.minZ || position[2] > bounds.maxZ
    );
  };

  // Initialize the group and effects
  useEffect(() => {
    if (!groupRef.current) {
      const group = new THREE.Group();
      group.position.set(...cloudPosition);
      group.scale.set(...cloudScale);
      groupRef.current = group;

      // Create initial clouds
      setTimeout(() => createInitialClouds(), 100);

      if (onGroupCreated) {
        onGroupCreated(group);
      }
    }

    return () => {
      if (groupRef.current) {
        cloudInstancesRef.current.forEach(mesh => {
          mesh.material?.dispose();
        });
        Object.values(sharedGeometries).forEach(geometry => {
          geometry?.dispose();
        });
      }
    };
  }, [cloudPosition, cloudScale, onGroupCreated]);

  // Main update function
  const updateEffect = (deltaTime) => {
    const currentTime = performance.now() * 0.001;
    
    // Update existing clouds
    cloudInstancesRef.current.forEach((cloud, index) => {
      if (cloud.material && cloud.material.uniforms && cloud.userData) {
        const userData = cloud.userData;
        const age = currentTime - userData.birthTime;
        
        // Update shader time with proper animation speed
        cloud.material.uniforms.uTime.value = currentTime * animationSpeed;
        
        // Move cloud with wind (controlled by animation speed)
        cloud.position.x += userData.velocity.x * deltaTime;
        cloud.position.y += userData.velocity.y * deltaTime;
        cloud.position.z += userData.velocity.z * deltaTime;
        
        // Very gentle rotation - keep clouds mostly straight (controlled by animation speed)
        cloud.rotation.y += userData.rotationSpeed * deltaTime;
        
        // Smooth opacity spawning and lifecycle
        const spawnDuration = 5.0; // Longer spawn duration for smoother fade-in
        const effectiveLifespan = userData.lifespan;
        
        let currentOpacity = userData.opacity;
        
        // Spawn phase - fade in from 0 to full opacity
        if (age < spawnDuration) {
          const spawnProgress = age / spawnDuration;
          const easeInOpacity = spawnProgress * spawnProgress; // Smooth ease-in
          currentOpacity = userData.opacity * easeInOpacity;
        }
        // Death phase - fade out
        else {
          const fadeStartTime = effectiveLifespan - spawnDuration;
          if (age > fadeStartTime) {
            const fadeProgress = (age - fadeStartTime) / spawnDuration;
            const easeOutOpacity = 1.0 - (fadeProgress * fadeProgress); // Smooth ease-out
            currentOpacity = userData.opacity * easeOutOpacity;
          }
        }
        
        cloud.material.uniforms.uOpacity.value = currentOpacity;
        
        // Mark for removal if out of bounds or too old
        if (age > effectiveLifespan || isCloudOutOfBounds([cloud.position.x, cloud.position.y, cloud.position.z])) {
          userData.shouldRemove = true;
        }
      }
    });

    // Remove old clouds
    const cloudsToRemove = cloudInstancesRef.current.filter(cloud => cloud.userData?.shouldRemove);
    cloudsToRemove.forEach(cloud => {
      const index = cloudInstancesRef.current.indexOf(cloud);
      if (index > -1) {
        cloudInstancesRef.current.splice(index, 1);
        groupRef.current.remove(cloud);
        cloud.material?.dispose();
      }
    });

    // Spawn new clouds with proper timing
    if (currentTime - lastSpawnTimeRef.current > spawnRate) {
      if (cloudInstancesRef.current.length < cloudCount) {
        const newCloudData = generateCloudData(true);
        spawnCloud(newCloudData);
      }
      lastSpawnTimeRef.current = currentTime;
    }
  };

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    updateEffect,
    dispose: () => {
      cloudInstancesRef.current.forEach(mesh => {
        mesh.material?.dispose();
      });
      Object.values(sharedGeometries).forEach(geometry => {
        geometry?.dispose();
      });
    },
    getGroup: () => groupRef.current,
    // Control methods
    changeWindDirection: (newDirection) => {
      const newWindVector = typeof newDirection === 'string' ? 
        getWindVector(newDirection) : new THREE.Vector3(...newDirection).normalize();
      
      cloudInstancesRef.current.forEach(cloud => {
        if (cloud.material?.uniforms?.uWindDirection) {
          cloud.material.uniforms.uWindDirection.value = newWindVector;
        }
        if (cloud.userData) {
          const config = CLOUD_CONFIGS[cloud.userData.cloudType];
          cloud.userData.velocity = newWindVector.clone().multiplyScalar(windSpeed * config.speed * animationSpeed);
        }
      });
    },
    getAreaInfo: () => ({
      areaSize,
      areaCenter,
      windDirection,
      windSpeed,
      activeCloudCount: cloudInstancesRef.current.length,
      maxCloudCount: cloudCount,
      cloudTypes: Object.keys(CLOUD_TYPES).map(key => ({
        name: CLOUD_CONFIGS[CLOUD_TYPES[key]].name,
        type: CLOUD_TYPES[key],
        count: cloudInstancesRef.current.filter(cloud => 
          cloud.userData?.cloudType === CLOUD_TYPES[key]
        ).length
      }))
    }),
    // New methods for animation control
    setAnimationSpeed: (newSpeed) => {
      // Update all existing cloud materials with new wind speed
      cloudInstancesRef.current.forEach(cloud => {
        if (cloud.material?.uniforms?.uWindSpeed) {
          cloud.material.uniforms.uWindSpeed.value = windSpeed * newSpeed * 0.1;
        }
        // Update velocity for existing clouds
        if (cloud.userData) {
          const config = CLOUD_CONFIGS[cloud.userData.cloudType];
          cloud.userData.velocity = windVector.clone().multiplyScalar(windSpeed * config.speed * newSpeed);
          cloud.userData.rotationSpeed = (Math.random() - 0.5) * 0.001 * newSpeed;
        }
      });
    },
    getAnimationSpeed: () => animationSpeed,
    setCloudTypeDistribution: (newDistribution) => {
      Object.assign(cloudTypeDistribution, newDistribution);
    },
    spawnSpecificCloudType: (cloudType, position = null) => {
      if (cloudInstancesRef.current.length < cloudCount) {
        const cloudData = generateCloudData(false);
        cloudData.cloudType = cloudType;
        if (position) {
          cloudData.position = position;
        }
        spawnCloud(cloudData);
      }
    },
    getCloudStats: () => {
      const stats = {};
      Object.values(CLOUD_TYPES).forEach(type => {
        stats[CLOUD_CONFIGS[type].name] = cloudInstancesRef.current.filter(
          cloud => cloud.userData?.cloudType === type
        ).length;
      });
      return stats;
    }
  }));

  return null;
});

Cloud.displayName = 'Cloud';

// Export cloud types for external use
export { CLOUD_TYPES, CLOUD_CONFIGS };
export default Cloud;