import React, { useState, useEffect, useRef } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import FireEffect from "../../src/components/ThreeJs/FireEffect";

// Canvas Component with 3D Model Loading and Integrated Effects
const ThreeCanvas = ({ modelPath, effectType, effectProps, canvasId }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const frameId = useRef(null);
  const effectRef = useRef(null);
  const lastTimeRef = useRef(0);
  const [sceneReady, setSceneReady] = useState(false);
  const [initReady, setInitReady] = useState(false);


  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);  
  // Wait for proper dimensions before initializing
  useEffect(() => {
    if (!mountRef.current) return;

    const checkAndInit = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      console.log('Checking dimensions:', { width, height });
      
      if (width > 0 && height > 0) {
        console.log('Valid dimensions found, allowing initialization');
        setInitReady(true);
      } else {
        console.log('Invalid dimensions, waiting...');
        setTimeout(checkAndInit, 100);
      }
    };

    checkAndInit();
  }, []);

  useEffect(() => {
    if (!initReady || !mountRef.current) {
      console.log('Not ready to initialize:', { initReady, hasMountRef: !!mountRef.current });
      return;
    }
    
    console.log('Starting Three.js initialization');

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);
    sceneRef.current = scene;

    // Get actual container dimensions
    const width = mountRef.current.clientWidth || 400;
    const height = mountRef.current.clientHeight || 400;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls setup
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x191970, 5);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;

    const d = 20;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;
    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.radius = 4;

    scene.add(directionalLight);

    // Point lights for better illumination
    const pointLight1 = new THREE.PointLight(0x7658ef, 0.6, 100);
    pointLight1.position.set(-10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xfca4c5, 0.6, 100);
    pointLight2.position.set(10, -10, 10);
    scene.add(pointLight2);

    const fireLight = new THREE.PointLight(0xFF5E00, 2, 20, 2);
    fireLight.position.set(-2, -2, 0.3);
    scene.add(fireLight);

    // Add immediate fallback cube so something is always visible
    // const geometry = new THREE.BoxGeometry(2, 2, 2);
    // const material = new THREE.MeshPhongMaterial({ color: 0x7658ef });
    // const fallbackMesh = new THREE.Mesh(geometry, material);
    // fallbackMesh.castShadow = true;
    // fallbackMesh.receiveShadow = true;
    // fallbackMesh.position.set(0, 0, 0);
    // scene.add(fallbackMesh);
    // console.log('Fallback cube added to scene');

    // Load 3D Model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        console.log('Model loaded successfully');
        setIsLoading(false);
        const model = gltf.scene;
        
        // Remove fallback cube
        const fallbackCube = scene.children.find(child => child.geometry && child.geometry.type === 'BoxGeometry');
        if (fallbackCube) {
          scene.remove(fallbackCube);
        }
        
        // Scale and position the model
        model.scale.set(1, 1, 1);
        model.position.set(0, -1, 0);
        model.rotation.set(0,Math.PI/2,0);
        
        // Enable shadows for the model
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Enhance material properties
            if (child.material) {
              child.material.metalness = 0.3;
              child.material.roughness = 0.4;
            }
          }
        });
        
        scene.add(model);
        
        // Fit camera to model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxSize = Math.max(size.x, size.y, size.z);
        const fitHeightDistance = maxSize / (2 * Math.atan(Math.PI * camera.fov / 360));
        const fitWidthDistance = fitHeightDistance / camera.aspect;
        const distance = 0.6 * Math.max(fitHeightDistance, fitWidthDistance);
        
        camera.position.copy(center);
        camera.position.z = distance;
        camera.position.x =  0.1 * Math.max(fitHeightDistance, fitWidthDistance);
        camera.lookAt(center);
        
        controls.target.copy(center);
        controls.update();
      },
      (progress) => {
        const percentComplete = (progress.loaded / progress.total) * 100;
        setLoadingProgress(Math.round(percentComplete));
        console.log(`Loading progress: ${Math.round(percentComplete)}%`);      
      },
      (error) => {
        console.error('Error loading model:', error);
        // ✅ CHANGE 5: Hide loading on error too
        setIsLoading(false);
      }
    );

    // Set scene ready after everything is initialized
    setTimeout(() => {
      setSceneReady(true);
    }, 100);

    // Animation loop
    let frameCount = 0;
    const animate = (currentTime) => {
      frameId.current = requestAnimationFrame(animate);
      
      // Calculate delta time
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      fireLight.intensity = 1.5 + Math.sin(Date.now() * 0.02) * 0.5 + Math.random() * 0.1;
      fireLight.color.setHSL(0.07 + Math.random() * 0.02, 1, 0.5);
      
      // Log first few frames to confirm animation is running
      if (frameCount < 5) {
        console.log(`Frame ${frameCount}: rendering scene`);
        frameCount++;
      }
      
      // Update effect animation
      if (effectRef.current && effectRef.current.updateEffect) {
        effectRef.current.updateEffect(deltaTime);
      }
      
      controls.update();
      
      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    };
    
    console.log('Starting animation loop');
    animate(0);

    // Handle resize
    const handleResize = () => {
      if (mountRef.current && camera && renderer) {
        const width = mountRef.current.clientWidth || 400;
        const height = mountRef.current.clientHeight || 400;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        console.log('Resized to:', { width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Force initial resize after a brief delay
    setTimeout(() => handleResize(), 250);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      setSceneReady(false);
      
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
      
      if (effectRef.current && effectRef.current.dispose) {
        effectRef.current.dispose();
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
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
    };
  }, [modelPath, effectType, initReady]);

  const handleFireEffect2Created = (fireGroup) => {
    console.log('handleFireEffect2Created called with:', fireGroup);
    if (sceneRef.current && fireGroup) {
      sceneRef.current.add(fireGroup);
      console.log('Fire effect group successfully added to scene');
    } else {
      console.warn('Scene not ready or fire group is null:', { scene: sceneRef.current, fireGroup });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px' }}>
      {/* Three.js Canvas */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#000000',
        }}
      />
            {/* ✅ CHANGE 6: Add this entire loading progress overlay */}
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(135, 206, 235, 0.9)',
            borderRadius: '12px',
            zIndex: 10,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            {/* Progress Bar */}
            <div
              style={{
                width: '200px',
                height: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: `${loadingProgress}%`,
                  height: '100%',
                  backgroundColor: '#7658ef',
                  transition: 'width 0.3s ease',
                  borderRadius: '4px',
                }}
              />
            </div>
            {/* Progress Text */}
            <p
              style={{
                color: '#1e293b',
                fontSize: '18px',
                fontWeight: '600',
                margin: 0,
              }}
            >
              Loading... {loadingProgress}%
            </p>
          </div>
        </div>
      )}
      
      {/* FireEffect Component - now integrated into the scene */}
      {sceneReady && sceneRef.current && (
        <FireEffect
          position={{ x: -2, y: -1.95, z: -0.3 }}
          scale={1.3}
          speed={0.6}
          onGroupCreated={handleFireEffect2Created}
          key={`fire-effect-${canvasId}-${sceneReady}`}
        />
      )}
    </div>
  );
};

// Code Display Component
const CodeDisplay = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#1e293b",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          backgroundColor: "#334155",
          borderBottom: "1px solid #475569",
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
          </div>
          <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500', marginLeft: '8px' }}>
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            padding: "6px 12px",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {copied ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg style={{color: '#43eb34'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
          </svg><p>Copied</p></div>
            : <div title='Copy'><svg style={{color: '#bdbdbd'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clip-rule="evenodd"/>
          </svg></div>
          }
        </button>
      </div>
      <pre
        style={{
            padding: "16px",
            margin: 0,
            color: "#e2e8f0",
            fontSize: "14px",
            lineHeight: "1.5",
            overflow: "auto",
            maxHeight: "500px",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Preview Section Component
const PreviewSection = ({ title, modelPath, effectType, effectProps }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage?.getItem("darkMode");
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage?.getItem("darkMode");
      if (saved) {
        setIsDarkMode(JSON.parse(saved));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <section style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
      <div
        style={{
          transition: "all 0.3s ease",
          height: "clamp(400px, 60vh, 600px)",
          position: "relative",
          minHeight: "400px",
          width: "100%",
        }}
      >
        {title && (
          <h3 
            style={{ 
              color: 'white', 
              margin: 0, 
              fontSize: 'clamp(1.125rem, 4vw, 1.5rem)', 
              position: 'absolute',
              top: '20px', 
              left: '20px',
              zIndex: 20,
              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            {title}
          </h3>
        )}
        
        <div style={{ 
          width: '100%',
          height: '100%',
          position: 'relative',
        }}>
          <ThreeCanvas
            modelPath={modelPath}
            effectType={effectType}
            effectProps={effectProps}
            canvasId={`canvas-${title ? title.replace(/\s+/g, '-').toLowerCase() : 'default'}`}
          />
        </div>
      </div>
    </section>
  );
};

// Code Section Component
const CodeSection = ({ title, jsxCode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage?.getItem("darkMode");
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage?.getItem("darkMode");
      if (saved) {
        setIsDarkMode(JSON.parse(saved));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <section style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
      <h2
        style={{
          marginBottom: "2rem",
          color: isDarkMode ? "#ffffff" : "#000000",
          fontSize: "clamp(1.25rem, 5vw, 1.5rem)",
          fontWeight: "bold",
        }}
      >
        {title}
      </h2>

      <CodeDisplay code={jsxCode} language="TSX/JSX" />
    </section>
  );
};

// Main Component
const FireEffectSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage?.getItem("darkMode");
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage?.getItem("darkMode");
      if (saved) {
        setIsDarkMode(JSON.parse(saved));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const containerStyle = {
    padding: "clamp(20px, 5vw, 40px)",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    background: "transparent",
    color: isDarkMode ? "#e2e8f0" : "#1a1a1a",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  };

  const fireEffectJSX = `
import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const App = () => {
  const mountRef = useRef(null);
  const effectRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const frameIdRef = useRef(null);
  const [sceneReady, setSceneReady] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Get container dimensions
    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 600;

    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 2, 8);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add a simple object to visualize the scene
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0x7658ef });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, 0, 0);
    scene.add(cube);

    // Mark scene as ready after setup
    setTimeout(() => {
      setSceneReady(true);
      console.log('Scene is ready');
    }, 100);

    // Animation loop
    let lastTime = 0;
    const animate = (currentTime) => {
      frameIdRef.current = requestAnimationFrame(animate);

      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Update effect
      if (effectRef.current && effectRef.current.updateEffect) {
        effectRef.current.updateEffect(deltaTime);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate(0);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth || 800;
      const height = mountRef.current.clientHeight || 600;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      setSceneReady(false);
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (effectRef.current && effectRef.current.dispose) {
        effectRef.current.dispose();
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (rendererRef.current && mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  const handleEffectGroupCreated = (group) => {
    if (sceneRef.current && group) {
      sceneRef.current.add(group);
      console.log('Fire effect added to scene:', group);
    } else {
      console.warn('Could not add effect - scene or group missing');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      {/* Three.js canvas container */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1a1a2e',
        }}
      />
      
      {/* FireEffect component - only render when scene is ready */}
      {sceneReady && sceneRef.current && (
        <FireEffect 
          ref={effectRef} 
          speed={1.5} 
          animation={true} 
          position={{x: 0, y: 1, z: 0}}
          scale={1}
          onGroupCreated={handleEffectGroupCreated}
          key={\`fire-effect-\${sceneReady}\`}
        />
      )}
    </div>
  );
};

export default App;`;

  const propsTableData = [
    { prop: "position", type: "object", default: "{x: 0, y: 0, z: 0}", desc: "3D position of the fire effect" },
    { prop: "scale", type: "object", default: "{x: 1, y: 1, z: 1}", desc: "3D scale of the fire effect" },
    { prop: "intensity", type: "number", default: "1", desc: "Intensity of the fire effect" },
    { prop: "color", type: "string[]", default: "['#FF0000', '#FF4500', '#FFD700']", desc: "Array of colors for fire gradient" },
    { prop: "speed", type: "number", default: "1", desc: "Animation speed of the fire" },
    { prop: "size", type: "number", default: "1", desc: "Size of the fire particles" },
    { prop: "onGroupCreated", type: "function", default: "null", desc: "Callback when Three.js group is created" },
    { prop: "animated", type: "boolean", default: "true", desc: "Enable/disable fire animation" },
  ];

  return (
    <div>
      {/* Props Table */}
      <div
        style={{
          backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
          borderRadius: "12px",
          border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
          overflow: "hidden",
          marginBottom: "25px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div style={{overflowX: 'auto', WebkitOverflowScrolling: 'touch'}}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "clamp(12px, 2.5vw, 14px)",
              minWidth: "600px"
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: isDarkMode ? "#334155" : "#f8fafc", 
                  borderBottom: "1px solid #bababa"
                }}
              >
                <th style={{ padding: "clamp(8px, 2vw, 16px)", textAlign: "left", fontWeight: "600" }}>Prop</th>
                <th style={{ padding: "clamp(8px, 2vw, 16px)", textAlign: "left", fontWeight: "600" }}>Type</th>
                <th style={{ padding: "clamp(8px, 2vw, 16px)", textAlign: "left", fontWeight: "600" }}>Default</th>
                <th style={{ padding: "clamp(8px, 2vw, 16px)", textAlign: "left", fontWeight: "600" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {propsTableData.map((row, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: `1px solid ${isDarkMode ? "#475569" : "#e2e8f0"}`,
                    backgroundColor:
                      index % 2 === 0
                        ? "transparent"
                        : isDarkMode
                        ? "#1e293b50"
                        : "#f8fafc50",
                  }}
                >
                  <td
                    style={{
                      padding: "clamp(8px, 2vw, 16px)",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#fbbf24" : "#d97706",
                    }}
                  >
                    {row.prop}
                  </td>
                  <td
                    style={{
                      padding: "clamp(8px, 2vw, 16px)",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#8b5cf6" : "#7c3aed",
                    }}
                  >
                    {row.type}
                  </td>
                  <td
                    style={{
                      padding: "clamp(8px, 2vw, 16px)",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#06b6d4" : "#0891b2",
                    }}
                  >
                    {row.default}
                  </td>
                  <td style={{ padding: "clamp(8px, 2vw, 16px)" }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

<div
  style={{
    backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
    borderRadius: "16px",
    border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
    padding: "20px",
    marginBottom: "25px",
    boxShadow: isDarkMode
      ? "0 4px 12px rgba(0, 0, 0, 0.4)"
      : "0 4px 12px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease-in-out",
  }}
>
  <h1
    style={{
      fontSize: "1.4rem",
      marginBottom: "12px",
      color: isDarkMode ? "#f8fafc" : "#0f172a",
      borderBottom: `2px solid ${isDarkMode ? "#475569" : "#cbd5e1"}`,
      paddingBottom: "6px",
      fontWeight: "600",
    }}
  >
    Fire Colors Tips:
  </h1>

  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
    <li
      style={{
        backgroundColor: isDarkMode ? "#334155" : "#f8fafc",
        padding: "8px 12px",
        borderRadius: "8px",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ color: isDarkMode ? "#facc15" : "#b45309" }}>Orange</span>
      <code style={{ color: isDarkMode ? "#f1f5f9" : "#475569" }}>
        [1.0, 0.549, 0.18]
      </code>
    </li>

    <li
      style={{
        backgroundColor: isDarkMode ? "#334155" : "#f8fafc",
        padding: "8px 12px",
        borderRadius: "8px",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ color: "#3b82f6" }}>Blue</span>
      <code style={{ color: isDarkMode ? "#f1f5f9" : "#475569" }}>
        [0.2, 0.4, 1.0]
      </code>
    </li>

    <li
      style={{
        backgroundColor: isDarkMode ? "#334155" : "#f8fafc",
        padding: "8px 12px",
        borderRadius: "8px",
        marginBottom: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ color: "#22c55e" }}>Green</span>
      <code style={{ color: isDarkMode ? "#f1f5f9" : "#475569" }}>
        [50, 255, 100]
      </code>
    </li>
  </ul>
</div>


      {/* Preview Section */}
      <PreviewSection
        title=""
        modelPath="https://cdn.jsdelivr.net/gh/Aditya02git/3d-models-cdn/camp_fire.glb"
        effectType="fire"
        effectProps={{}}
      />

      {/* Code Section */}
      <CodeSection
        title="Code"
        jsxCode={fireEffectJSX}
      />
    </div>
  );
};

export default FireEffectSection;