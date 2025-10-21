import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SmoothBlob = ({
  // Basic styling
  color = '#ffffff',
  gradientColors = ['#ff006e', '#8338ec'], // Pink to purple gradient
  useGradient = false,
  width = '100%',
  height = '400px',
  
  // Animation controls
  animation = true,
  animationSpeed = 1,
  rotationSpeed = { x: 0.05, y: 0.1 },
  morphStrength = 0.3,
  morphSpeed = { x: 1.5, y: 1.3, z: 0.7 },
  morphFrequency = { x: 3, y: 4, z: 2 },
  
  // Geometry
  resolution = 128,
  size = 1,
  
  // Camera
  cameraPosition = { x: 0, y: 0, z: 3 },
  fov = 75,
  
  // Lighting
  ambientLightColor = '#404040',
  ambientLightIntensity = 1,
  directionalLightColor = '#ffffff',
  directionalLightIntensity = 1,
  directionalLightPosition = { x: 1, y: 1, z: 1 },
  pointLightColor = '#ffffff',
  pointLightIntensity = 1,
  pointLightPosition = { x: 2, y: 3, z: 4 },
  pointLightDistance = 10,
  
  // Controls
  orbitControl = false,
  
  // Material
  wireframe = false,
  roughness = 0.4,
  metalness = 0.6,
  flatShading = false,
  material = 'standard', // Changed to 'standard' so color prop works by default
  
  // Events
  onReady = null,
  onClick = null,
  
  // Custom styles
  className = '',
  style = {}
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const blobRef = useRef(null);
  const animationIdRef = useRef(null);
  const timeRef = useRef(0);
  const originalPositionsRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.lookAt(scene.position);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    rendererRef.current = renderer;

    const geometry = new THREE.SphereGeometry(size, resolution, resolution);
    
    const positions = geometry.attributes.position;
    originalPositionsRef.current = positions.array.slice();
    
    // Add vertex colors for gradient ONLY if gradient is enabled
    if (useGradient && material !== 'normal') {
      const colors = new Float32Array(positions.count * 3);
      const color1 = new THREE.Color(gradientColors[0]);
      const color2 = new THREE.Color(gradientColors[1]);
      
      for (let i = 0; i < positions.count; i++) {
        const y = positions.getY(i);
        const normalizedY = (y + size) / (size * 2);
        
        const color = color1.clone().lerp(color2, normalizedY);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
      
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
    
    let mat;
    switch (material) {
      case 'basic':
        mat = new THREE.MeshBasicMaterial({ 
          color: new THREE.Color(color),
          vertexColors: useGradient,
          wireframe 
        });
        break;
      case 'standard':
        mat = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color(color),
          vertexColors: useGradient,
          roughness,
          metalness,
          flatShading,
          wireframe 
        });
        break;
      case 'phong':
        mat = new THREE.MeshPhongMaterial({ 
          color: new THREE.Color(color),
          vertexColors: useGradient,
          flatShading,
          wireframe 
        });
        break;
      case 'normal':
        mat = new THREE.MeshNormalMaterial({ 
          flatShading,
          wireframe 
        });
        break;
      default:
        mat = new THREE.MeshStandardMaterial({ 
          color: new THREE.Color(color),
          vertexColors: useGradient,
          roughness,
          metalness,
          flatShading,
          wireframe 
        });
    }

    const blob = new THREE.Mesh(geometry, mat);
    blob.name = 'SmoothBlob';
    scene.add(blob);
    blobRef.current = blob;

    const ambientLight = new THREE.AmbientLight(
      ambientLightColor, 
      ambientLightIntensity
    );
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(
      directionalLightColor, 
      directionalLightIntensity
    );
    directionalLight.position.set(
      directionalLightPosition.x,
      directionalLightPosition.y,
      directionalLightPosition.z
    );
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(
      pointLightColor, 
      pointLightIntensity,
      pointLightDistance
    );
    pointLight.position.set(
      pointLightPosition.x,
      pointLightPosition.y,
      pointLightPosition.z
    );
    scene.add(pointLight);

    let controls;
    if (orbitControl) {
      // controls = new OrbitControls(camera, renderer.domElement);
    }

    const handleClick = (event) => {
      if (onClick) {
        const rect = mountRef.current.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
        const intersects = raycaster.intersectObject(blob);
        
        if (intersects.length > 0) {
          onClick(intersects[0]);
        }
      }
    };

    const animate = () => {
      timeRef.current += 0.004 * animationSpeed;

      if (animation) {
        const positions = blob.geometry.attributes.position;
        const originalPositions = originalPositionsRef.current;
        const time = timeRef.current;

        for (let i = 0; i < positions.count; i++) {
          const ix = i * 3;
          const iy = i * 3 + 1;
          const iz = i * 3 + 2;
          
          const x = originalPositions[ix];
          const y = originalPositions[iy];
          const z = originalPositions[iz];
          
          const displacement = morphStrength * 
                              (Math.sin(x * morphFrequency.x + time * morphSpeed.x) + 
                               Math.cos(y * morphFrequency.y + time * morphSpeed.y) + 
                               Math.sin(z * morphFrequency.z + time * morphSpeed.z)) / 3;
          
          positions.array[ix] = x + x * displacement;
          positions.array[iy] = y + y * displacement;
          positions.array[iz] = z + z * displacement;
        }
        
        positions.needsUpdate = true;
        blob.geometry.computeVertexNormals();
        
        blob.rotation.x = time * rotationSpeed.x;
        blob.rotation.y = time * rotationSpeed.y;
      }

      if (controls) {
        controls.update();
      }

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();
    mountRef.current.appendChild(renderer.domElement);

    if (onClick) {
      renderer.domElement.addEventListener('click', handleClick);
    }

    const handleResize = () => {
      if (!mountRef.current) return;
      
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      const newAspect = newWidth / newHeight;
      
      camera.aspect = newAspect;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    if (onReady) {
      onReady({ scene, camera, renderer, blob });
    }

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (onClick && renderer.domElement) {
        renderer.domElement.removeEventListener('click', handleClick);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      if (blobRef.current) {
        blobRef.current.geometry.dispose();
        blobRef.current.material.dispose();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      if (controls) {
        controls.dispose();
      }
    };
  }, [
    color, gradientColors, useGradient, width, height, animation, animationSpeed,
    rotationSpeed, morphStrength, morphSpeed, morphFrequency,
    resolution, size, cameraPosition, fov,
    ambientLightColor, ambientLightIntensity,
    directionalLightColor, directionalLightIntensity, directionalLightPosition,
    pointLightColor, pointLightIntensity, pointLightPosition, pointLightDistance,
    orbitControl, wireframe, roughness, metalness, flatShading,
    material, onClick, onReady
  ]);

  return (
    <div
      ref={mountRef}
      className={`smooth-blob-container ${className}`}
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    />
  );
};

export default SmoothBlob;