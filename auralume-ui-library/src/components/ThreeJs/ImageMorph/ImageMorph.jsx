import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ImageMorph = ({
  src,
  width = '100%',
  height = '400px',
  animationDuration = 3000,
  particleSize = 3.0,
  gridMultiplier = 22,
  influenceRadius = 0.3,
  rippleIntensity = 2.0,
  displacementForce = 10.0,
  smoothInterpolation = 0.1,
  className = '',
  onAnimationComplete = () => {},
  ...props
}) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const animationIdRef = useRef(null);
  const startTimeRef = useRef(null);
  const imageRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, isHovering: false });

  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!src) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      1000
    );
    camera.position.z = 150;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    };
    
    updateSize();

    // Texture loading
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      src,
      () => {
        setIsLoaded(true);
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );

    // Grid setup - use image aspect ratio for better alignment
    const col = 16 * gridMultiplier;
    const row = 9 * gridMultiplier;
    const vertices = [];
    const uvs = [];
    const randomZ = [];

    for (let i = 0; i < col; i++) {
      for (let j = 0; j < row; j++) {
        vertices.push(i, j, 0);
        randomZ.push((Math.random() - 0.5) * 300);
        uvs.push(i / (col - 1), j / (row - 1));
      }
    }

    // Geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setAttribute('aRandomZ', new THREE.Float32BufferAttribute(randomZ, 1));
    geometry.center();

    // Shaders with mouse interaction
    const vertexShader = `
      uniform float uProgress;
      uniform vec2 uMouse;
      uniform float uMouseInfluence;
      uniform bool uIsHovering;
      attribute float aRandomZ;
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        
        // Original animation position
        float newZ = mix(aRandomZ, position.z, uProgress);
        vec3 newPosition = vec3(position.x, position.y, newZ);
        
        // Mouse interaction after animation is complete
        if (uProgress >= 1.0 && uIsHovering) {
          vec2 normalizedPos = (position.xy + vec2(${(16 * gridMultiplier) / 2}, ${(9 * gridMultiplier) / 2})) / vec2(${16 * gridMultiplier}, ${9 * gridMultiplier});
          vec2 mouseDistance = normalizedPos - uMouse;
          float distance = length(mouseDistance);
          
          // Create ripple effect with configurable intensity
          float maxDistance = ${influenceRadius.toFixed(3)};
          if (distance < maxDistance) {
            float influence = (1.0 - distance / maxDistance) * uMouseInfluence;
            float ripple = sin(distance * ${rippleIntensity.toFixed(1)} - uProgress * 10.0) * influence * 15.0;
            newPosition.z += ripple;
            
            // Push particles away from mouse with configurable force
            newPosition.xy += mouseDistance * influence * ${displacementForce.toFixed(1)};
          }
        }
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        gl_PointSize = ${particleSize.toFixed(1)};
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        vec4 texColor = texture2D(uTexture, vUv);
        if (texColor.a < 0.1) discard;
        gl_FragColor = vec4(texColor.rgb, texColor.a * uOpacity);
      }
    `;

    // Material with mouse uniforms
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uProgress: { value: 0.0 },
        uOpacity: { value: 1.0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uMouseInfluence: { value: 0.0 },
        uIsHovering: { value: false }
      },
      vertexShader,
      fragmentShader,
      transparent: true
    });

    // Points mesh
    const mesh = new THREE.Points(geometry, material);
    scene.add(mesh);

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    materialRef.current = material;

    // Mouse event handlers
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = 1.0 - (event.clientY - rect.top) / rect.height; // Flip Y coordinate
      
      mouseRef.current.x = x;
      mouseRef.current.y = y;
      
      if (material.uniforms.uMouse) {
        material.uniforms.uMouse.value.set(x, y);
      }
    };

    const handleMouseEnter = () => {
      mouseRef.current.isHovering = true;
      if (material.uniforms.uIsHovering) {
        material.uniforms.uIsHovering.value = true;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      if (material.uniforms.uIsHovering) {
        material.uniforms.uIsHovering.value = false;
      }
      if (material.uniforms.uMouseInfluence) {
        material.uniforms.uMouseInfluence.value = 0.0;
      }
    };

    // Add mouse event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation function with mouse interaction
    const animate = (currentTime) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Smooth easing function
      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const easedProgress = easeInOutCubic(progress);
      material.uniforms.uProgress.value = easedProgress;

      // Update mouse influence after animation is complete with configurable interpolation
      if (progress >= 1.0 && mouseRef.current.isHovering) {
        const targetInfluence = 1.0;
        const currentInfluence = material.uniforms.uMouseInfluence.value;
        material.uniforms.uMouseInfluence.value += (targetInfluence - currentInfluence) * smoothInterpolation;
      } else if (!mouseRef.current.isHovering) {
        const currentInfluence = material.uniforms.uMouseInfluence.value;
        material.uniforms.uMouseInfluence.value += (0.0 - currentInfluence) * smoothInterpolation;
      }

      renderer.render(scene, camera);

      if (progress < 1) {
        animationIdRef.current = requestAnimationFrame(animate);
      } else {
        // Continue rendering for mouse interactions
        animationIdRef.current = requestAnimationFrame(animate);
        if (!mouseRef.current.animationCompleted) {
          mouseRef.current.animationCompleted = true;
          onAnimationComplete();
        }
      }
    };

    // Start animation when texture is loaded
    if (isLoaded) {
      startTimeRef.current = null;
      animationIdRef.current = requestAnimationFrame(animate);
    }

    // Handle resize
    const handleResize = () => {
      updateSize();
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (texture) texture.dispose();
      if (renderer) renderer.dispose();
    };
  }, [src, animationDuration, particleSize, gridMultiplier, influenceRadius, rippleIntensity, displacementForce, smoothInterpolation, isLoaded]);

  return (
    <div 
      className={`image-morph-container ${className}`}
      style={{ 
        position: 'relative', 
        width, 
        height,
        overflow: 'hidden',
        backgroundColor: 'transparent' // Ensure no background color interference
      }}
      {...props}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          
        }}
      />
    </div>
  );
};

export default ImageMorph;