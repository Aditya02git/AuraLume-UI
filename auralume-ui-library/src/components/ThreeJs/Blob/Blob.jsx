import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Simple Perlin noise implementation
class SimplexNoise {
  constructor() {
    this.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
                  [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
                  [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
    this.p = [];
    for(let i = 0; i < 256; i++) {
      this.p[i] = Math.floor(Math.random() * 256);
    }
    for(let i = 0; i < 512; i++) {
      this.perm = this.p[i & 255];
    }
  }

  dot(g, x, y, z) {
    return g[0] * x + g[1] * y + g[2] * z;
  }

  perlin3(x, y, z) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = this.fade(x);
    const v = this.fade(y);
    const w = this.fade(z);
    const A = this.p[X] + Y;
    const AA = this.p[A] + Z;
    const AB = this.p[A + 1] + Z;
    const B = this.p[X + 1] + Y;
    const BA = this.p[B] + Z;
    const BB = this.p[B + 1] + Z;

    return this.lerp(w, this.lerp(v, this.lerp(u, this.grad(this.p[AA], x, y, z),
                                                  this.grad(this.p[BA], x - 1, y, z)),
                                     this.lerp(u, this.grad(this.p[AB], x, y - 1, z),
                                                  this.grad(this.p[BB], x - 1, y - 1, z))),
                        this.lerp(v, this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1),
                                                  this.grad(this.p[BA + 1], x - 1, y, z - 1)),
                                     this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1),
                                                  this.grad(this.p[BB + 1], x - 1, y - 1, z - 1))));
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  lerp(t, a, b) {
    return a + t * (b - a);
  }

  grad(hash, x, y, z) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  }
}

const Blob = ({
  // Basic styling
  color = '#ffffff',
  width = '100%',
  height = '400px',
  
  // Animation controls
  animation = true,
  animationSpeed = 1,
  rotationSpeed = { x: 0.01, y: 0.005 },
  morphStrength = 0.1,
  
  // Geometry
  detail = 4,
  size = 1,
  
  // Camera
  cameraPosition = { x: 0, y: 0, z: 8 },
  fov = 35,
  
  // Lighting
  ambientLightColor = '#111111',
  ambientLightIntensity = 5,
  pointLightColor = '#f00555',
  pointLightIntensity = 0.5,
  pointLightPosition = { x: 0, y: 0, z: 3 },
  
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
  const icosahedronRef = useRef(null);
  const animationIdRef = useRef(null);
  const noiseRef = useRef(new SimplexNoise());
  const timeRef = useRef(0);

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

      // Geometry
      const geometry = new THREE.IcosahedronGeometry(size, detail);
      
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

      const icosahedron = new THREE.Mesh(geometry, mat);
      icosahedron.name = 'Blob';
      scene.add(icosahedron);
      icosahedronRef.current = icosahedron;

      // Store original vertices for morphing
      const originalVertices = [];
      const positionAttribute = geometry.getAttribute('position');
      for (let i = 0; i < positionAttribute.count; i++) {
        originalVertices.push(new THREE.Vector3(
          positionAttribute.getX(i),
          positionAttribute.getY(i),
          positionAttribute.getZ(i)
        ));
      }

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
          const intersects = raycaster.intersectObject(icosahedron);
          
          if (intersects.length > 0) {
            onClick(intersects[0]);
          }
        }
      };

      // Animation loop
      const animate = () => {
        timeRef.current += 0.005 * animationSpeed;

        if (animation) {
          // Rotation
          icosahedron.rotation.x += rotationSpeed.x * animationSpeed;
          icosahedron.rotation.y += rotationSpeed.y * animationSpeed;

          // Morphing
          const positionAttribute = icosahedron.geometry.getAttribute('position');
          const k = 2;
          
          for (let i = 0; i < originalVertices.length; i++) {
            const vertex = originalVertices[i].clone();
            const noise = noiseRef.current.perlin3(
              vertex.x * k + timeRef.current,
              vertex.y * k,
              vertex.z * k
            );
            
            vertex.normalize().multiplyScalar(1 + morphStrength * noise);
            
            positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
          }
          
          positionAttribute.needsUpdate = true;
          icosahedron.geometry.computeVertexNormals();
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
        onReady({ scene, camera, renderer, icosahedron });
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
        if (icosahedronRef.current) {
          icosahedronRef.current.geometry.dispose();
          icosahedronRef.current.material.dispose();
        }
        
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
    rotationSpeed, morphStrength, detail, size, cameraPosition, fov,
    ambientLightColor, ambientLightIntensity, pointLightColor,
    pointLightIntensity, pointLightPosition, orbitControl, wireframe,
    material, onClick, onReady
  ]);

  return (
    <div
      ref={mountRef}
      className={`blob-container ${className}`}
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

export default Blob;