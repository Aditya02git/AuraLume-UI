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
  material = 'normal', // 'normal', 'basic', 'standard', 'phong'
  
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
  const shapesRef = useRef([]);
  const animationIdRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000);
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.lookAt(scene.position);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    rendererRef.current = renderer;

    // Geometry based on triangularFaces
    let geometry;
    
    if (triangularFaces <= 8) {
      // Octahedron (8 triangular faces)
      geometry = new THREE.OctahedronGeometry(size);
    } else if (triangularFaces <= 20) {
      // Icosahedron (20 triangular faces) - default
      geometry = new THREE.IcosahedronGeometry(size, 0);
    } else if (triangularFaces <= 80) {
      // Subdivided Icosahedron (80 triangular faces)
      geometry = new THREE.IcosahedronGeometry(size, 1);
    } else if (triangularFaces <= 320) {
      // Highly subdivided Icosahedron (320 triangular faces)
      geometry = new THREE.IcosahedronGeometry(size, 2);
    } else {
      // Very high detail sphere-like geometry
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

    // Orbit controls (if enabled)
    let controls;
    if (orbitControl) {
      // Note: In a real implementation, you'd import OrbitControls
      // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
      // controls = new OrbitControls(camera, renderer.domElement);
    }

    // Click handler
    const handleClick = (event) => {
      if (onClick) {
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
        // Animate each shape with different rotations
        shapes.forEach((shape, index) => {
          const speed = rotationSpeed[index] || rotationSpeed[0];
          shape.rotation.x += speed.x * animationSpeed;
          shape.rotation.y += speed.y * animationSpeed;
          shape.rotation.z += speed.z * animationSpeed;
        });
      }

      if (controls) {
        controls.update();
      }

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Add to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Add click listener
    if (onClick) {
      renderer.domElement.addEventListener('click', handleClick);
    }

    // Handle resize
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

    // Call onReady callback
    if (onReady) {
      onReady({ scene, camera, renderer, shapes });
    }

    // Cleanup
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

      if (controls) {
        controls.dispose();
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
        ...style
      }}
    />
  );
};

export default Polyhedra;