import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Polyhedra = ({
  // Basic styling
  color = '#ffffff',
  width = '100%',
  height = '400px',
  
  // Animation controls
  animation = true,
  animationSpeed = 1,
  rotationSpeed = [
    { x: 0.035, y: -0.005, z: 0 },
    { x: 0, y: 0.015, z: -0.005 },
    { x: 0.005, y: 0, z: -0.025 }
  ],
  
  // Geometry
  triangularFaces = 20,
  size = 2.5,
  shapeCount = 3,
  
  // Camera
  cameraPosition = { x: 0, y: 0, z: 10 },
  fov = 75,
  
  // Lighting
  ambientLightColor = '#111111',
  ambientLightIntensity = 5,
  pointLightColor = '#fca4c5',
  pointLightIntensity = 1,
  pointLightPosition = { x: 0, y: 250, z: 0 },
  
  // Controls
  orbitControl = false,
  
  // Material
  wireframe = false,
  material = 'normal',
  
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
  const cameraRef = useRef(null);
  const shapesRef = useRef([]);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Wait for container to have dimensions
    const initScene = () => {
      const container = mountRef.current;
      if (!container || container.clientWidth === 0) {
        // Retry if container doesn't have dimensions yet
        setTimeout(initScene, 50);
        return;
      }

      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Get actual container dimensions
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      // Camera setup with proper aspect ratio
      const aspect = containerWidth / containerHeight;
      const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
      camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
      camera.lookAt(scene.position);
      cameraRef.current = camera;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for performance
      renderer.setSize(containerWidth, containerHeight);
      rendererRef.current = renderer;

      // Geometry based on triangularFaces
      let geometry;
      
      if (triangularFaces <= 8) {
        geometry = new THREE.OctahedronGeometry(size);
      } else if (triangularFaces <= 20) {
        geometry = new THREE.IcosahedronGeometry(size, 0);
      } else if (triangularFaces <= 80) {
        geometry = new THREE.IcosahedronGeometry(size, 1);
      } else if (triangularFaces <= 320) {
        geometry = new THREE.IcosahedronGeometry(size, 2);
      } else {
        geometry = new THREE.SphereGeometry(size, 32, 16);
      }
      
      // Material
      let mat;
      switch (material) {
        case 'basic':
          mat = new THREE.MeshBasicMaterial({ 
            color: new THREE.Color(color),
            wireframe 
          });
          break;
        case 'standard':
          mat = new THREE.MeshStandardMaterial({ 
            color: new THREE.Color(color),
            wireframe 
          });
          break;
        case 'phong':
          mat = new THREE.MeshPhongMaterial({ 
            color: new THREE.Color(color),
            wireframe 
          });
          break;
        default:
          mat = new THREE.MeshNormalMaterial({ wireframe });
      }

      // Create multiple overlapping shapes
      const shapes = [];
      for (let i = 0; i < shapeCount; i++) {
        const shape = new THREE.Mesh(geometry, mat.clone());
        shape.position.set(0, 0, 0);
        shape.name = `Polyhedra-${i}`;
        scene.add(shape);
        shapes.push(shape);
      }
      shapesRef.current = shapes;

      // Lights
      const ambientLight = new THREE.HemisphereLight(
        ambientLightColor, 
        '#000000', 
        ambientLightIntensity
      );
      const pointLight = new THREE.PointLight(
        pointLightColor, 
        pointLightIntensity
      );
      pointLight.position.set(
        pointLightPosition.x, 
        pointLightPosition.y, 
        pointLightPosition.z
      );
      pointLight.castShadow = true;
      
      scene.add(ambientLight);
      scene.add(pointLight);

      // Click handler
      const handleClick = (event) => {
        if (onClick && mountRef.current) {
          const rect = mountRef.current.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
          
          const raycaster = new THREE.Raycaster();
          raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
          const intersects = raycaster.intersectObjects(shapes);
          
          if (intersects.length > 0) {
            onClick(intersects[0]);
          }
        }
      };

      // Animation loop
      const animate = () => {
        if (animation) {
          shapes.forEach((shape, index) => {
            const speed = rotationSpeed[index] || rotationSpeed[0];
            shape.rotation.x += speed.x * animationSpeed;
            shape.rotation.y += speed.y * animationSpeed;
            shape.rotation.z += speed.z * animationSpeed;
          });
        }

        renderer.render(scene, camera);
        animationIdRef.current = requestAnimationFrame(animate);
      };

      // Handle resize
      const handleResize = () => {
        if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
        
        const newWidth = mountRef.current.clientWidth;
        const newHeight = mountRef.current.clientHeight;
        
        // Ensure we have valid dimensions
        if (newWidth === 0 || newHeight === 0) return;
        
        const newAspect = newWidth / newHeight;
        
        cameraRef.current.aspect = newAspect;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(newWidth, newHeight);
      };

      // Add to DOM first
      container.appendChild(renderer.domElement);

      // Start animation
      animate();

      // Add event listeners after DOM insertion
      if (onClick) {
        renderer.domElement.addEventListener('click', handleClick);
      }

      window.addEventListener('resize', handleResize);

      // Call onReady callback
      if (onReady) {
        onReady({ scene, camera, renderer, shapes });
      }

      // Cleanup function
      return () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        
        window.removeEventListener('resize', handleResize);
        
        if (onClick && renderer.domElement) {
          renderer.domElement.removeEventListener('click', handleClick);
        }
        
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        
        // Dispose of Three.js resources
        geometry.dispose();
        mat.dispose();
        
        shapesRef.current.forEach(shape => {
          if (shape.material !== mat) {
            shape.material.dispose();
          }
        });
        
        if (rendererRef.current) {
          rendererRef.current.dispose();
        }
      };
    };

    const cleanup = initScene();

    return () => {
      if (cleanup && typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [
    color, width, height, animation, animationSpeed,
    rotationSpeed, triangularFaces, size, shapeCount, cameraPosition, fov,
    ambientLightColor, ambientLightIntensity, pointLightColor,
    pointLightIntensity, pointLightPosition, orbitControl, wireframe,
    material, onClick, onReady
  ]);

  return (
    <div
      ref={mountRef}
      className={`polyhedra-container ${className}`}
      style={{
        width,
        height,
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        ...style
      }}
    />
  );
};

export default Polyhedra;