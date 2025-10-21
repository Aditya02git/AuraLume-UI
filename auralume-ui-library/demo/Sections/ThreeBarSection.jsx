import React, { useState, useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ThreeBar from "../../src/components/ThreeJs/ThreeBar/ThreeBar";


// Canvas Component with 3D Bar Chart
const ThreeCanvas = ({ barData, barProps, canvasId }) => {
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

    // Get actual container dimensions
    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(barProps.backgroundColor || 0xffffff);
    sceneRef.current = scene;

    // Camera setup
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(18, aspect, 0.1, 1000);
    const camPos = barProps.cameraPosition || { x: -4, y: 1, z: 4 };
    camera.position.set(camPos.x, camPos.y, camPos.z);
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
    controls.dampingFactor = 0.3;
    controls.enableZoom = true;
    // controls.rotateSpeed = 10;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controlsRef.current = controls;

    // Lighting setup
    const mainLight = new THREE.DirectionalLight(0xffffff, barProps.mainLightIntensity || 3.0);
    mainLight.position.set(10, 10, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, barProps.ambientLightIntensity || 3.0);
    scene.add(ambientLight);

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
      
      // Log first few frames
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
        const width = mountRef.current.clientWidth || 800;
        const height = mountRef.current.clientHeight || 500;
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
  }, [barData, barProps, initReady]);

  // Handler that ensures scene is ready
  const handleBarGroupCreated = (group) => {
    console.log('handleBarGroupCreated called with:', group);
    if (sceneRef.current && group) {
      sceneRef.current.add(group);
      console.log('Bar group successfully added to scene');
    } else {
      console.warn('Scene not ready or group is null:', { scene: sceneRef.current, group });
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '500px' }}>
      {/* Three.js Canvas */}
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '500px',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: barProps.backgroundColor || '#ffffff',
        }}
      />
      
      {/* ThreeBar Component - now integrated into the scene */}
      {sceneReady && sceneRef.current && (
        <ThreeBar
          ref={effectRef}
          data={barData}
          {...barProps}
          onGroupCreated={handleBarGroupCreated}
          key={`bar-${canvasId}-${sceneReady}`}
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
const PreviewSection = ({ title, barData, barProps }) => {
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
          height: "clamp(500px, 60vh, 700px)",
          position: "relative",
          minHeight: "500px",
          width: "100%",
        }}
      >
        {title && (
          <h3 
            style={{ 
              color: isDarkMode ? '#333' : '#333', 
              fontWeight: 'bold',
              margin: 0, 
              fontSize: 'clamp(1.125rem, 4vw, 1.5rem)', 
              position: 'absolute',
              top: '20px', 
              left: '20px',
              zIndex: 20,
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
            barData={barData}
            barProps={barProps}
            canvasId={`canvas-${title ? title.replace(/\s+/g, '-').toLowerCase() : 'bar'}`}
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
const ThreeBarSection = () => {
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

  // JSX Code Example
const threeBarJSX1 = `
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const App = ({ barData, barProps, canvasId }) => {
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

  // Wait for proper dimensions before initializing
  useEffect(() => {
    if (!mountRef.current) return;

    const checkAndInit = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      if (width > 0 && height > 0) {
        setInitReady(true);
      } else {
        setTimeout(checkAndInit, 100);
      }
    };

    checkAndInit();
  }, []);

  useEffect(() => {
    if (!initReady || !mountRef.current) return;

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(barProps.backgroundColor || 0xffffff);
    sceneRef.current = scene;

    // Camera setup
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(18, aspect, 0.1, 1000);
    const camPos = barProps.cameraPosition || { x: -4, y: 1, z: 4 };
    camera.position.set(camPos.x, camPos.y, camPos.z);
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
    controls.dampingFactor = 0.3;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controlsRef.current = controls;

    // Lighting
    const mainLight = new THREE.DirectionalLight(0xffffff, barProps.mainLightIntensity || 3.0);
    mainLight.position.set(10, 10, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, barProps.ambientLightIntensity || 3.0);
    scene.add(ambientLight);

    setTimeout(() => setSceneReady(true), 100);

    // Animation loop
    const animate = (time) => {
      frameId.current = requestAnimationFrame(animate);
      const deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      if (effectRef.current?.updateEffect) effectRef.current.updateEffect(deltaTime);
      controls.update();
      renderer.render(scene, camera);
    };
    animate(0);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth || 800;
      const height = mountRef.current.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 250);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId.current);
      controls.dispose();
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [barData, barProps, initReady]);

  const handleBarGroupCreated = (group) => {
    if (sceneRef.current && group) sceneRef.current.add(group);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '500px' }}>
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '500px',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: barProps?.backgroundColor || '#ffffff',
        }}
      />
      {sceneReady && (
        <ThreeBar
          ref={effectRef}
          data={barData}
          {...barProps}
          onGroupCreated={handleBarGroupCreated}
          key={\`bar-\${canvasId}-\${sceneReady}\`}
        />
      )}
    </div>
  );
};

export default function Demo() {
  const barData = [
    [1, 1, 1],
    [6, 5, 4],
    [5, 7, 6],
  ];

  const barProps = {
    color: '#10b981',
    backgroundColor: '#9effae',
    barWidth: 0.2,
    barDepth: 0.2,
    position: { x: 0, y: 0, z: 0 },
    cameraPosition: { x: -8, y: 2, z: 8 },
    mainLightIntensity: 3.0,
    ambientLightIntensity: 3.0,
  };

  return (
    <div style={{ width: '100vw', height: '100vh', padding: '20px' }}>
      <App barData={barData} barProps={barProps} canvasId="demo-bar-chart" />
    </div>
  );
}
`;
const threeBarJSX2 = `
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const App = ({ barData, barProps, canvasId }) => {
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

  // Wait for proper dimensions before initializing
  useEffect(() => {
    if (!mountRef.current) return;

    const checkAndInit = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      if (width > 0 && height > 0) {
        setInitReady(true);
      } else {
        setTimeout(checkAndInit, 100);
      }
    };

    checkAndInit();
  }, []);

  useEffect(() => {
    if (!initReady || !mountRef.current) return;

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 500;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(barProps.backgroundColor || 0xffffff);
    sceneRef.current = scene;

    // Camera setup
    const aspect = width / height;
    const camera = new THREE.PerspectiveCamera(18, aspect, 0.1, 1000);
    const camPos = barProps.cameraPosition || { x: -4, y: 1, z: 4 };
    camera.position.set(camPos.x, camPos.y, camPos.z);
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
    controls.dampingFactor = 0.3;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controlsRef.current = controls;

    // Lighting
    const mainLight = new THREE.DirectionalLight(0xffffff, barProps.mainLightIntensity || 3.0);
    mainLight.position.set(10, 10, 10);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x202020, barProps.ambientLightIntensity || 3.0);
    scene.add(ambientLight);

    setTimeout(() => setSceneReady(true), 100);

    // Animation loop
    const animate = (time) => {
      frameId.current = requestAnimationFrame(animate);
      const deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;
      if (effectRef.current?.updateEffect) effectRef.current.updateEffect(deltaTime);
      controls.update();
      renderer.render(scene, camera);
    };
    animate(0);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth || 800;
      const height = mountRef.current.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 250);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId.current);
      controls.dispose();
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [barData, barProps, initReady]);

  const handleBarGroupCreated = (group) => {
    if (sceneRef.current && group) sceneRef.current.add(group);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '500px' }}>
      <div
        ref={mountRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '500px',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: barProps?.backgroundColor || '#ffffff',
        }}
      />
      {sceneReady && (
        <ThreeBar
          ref={effectRef}
          data={barData}
          {...barProps}
          onGroupCreated={handleBarGroupCreated}
          key={\`bar-\${canvasId}-\${sceneReady}\`}
        />
      )}
    </div>
  );
};

export default function Demo() {
  const barData = [
    [1, 1, 1],
    [6, 5, 4],
    [5, 7, 6],
  ];

  const barProps = {
    textureUrl: 'https://cdn.jsdelivr.net/gh/Aditya02git/Textures-v1/inkpaint.jpg',
    backgroundColor: '#f7fc88',
    barWidth: 0.2,
    barDepth: 0.2,
    position: { x: 0, y: 0, z: 0 },
    cameraPosition: { x: -8, y: 2, z: 8 },
    mainLightIntensity: 3.0,
    ambientLightIntensity: 3.0
  };

  return (
    <div style={{ width: '100vw', height: '100vh', padding: '20px' }}>
      <App barData={barData} barProps={barProps} canvasId="demo-bar-chart" />
    </div>
  );
}
`;



  const propsTableData = [
    { prop: "data", type: "number[][]", default: "[[3,2,1],[6,5,4],[5,7,6]]", desc: "2D array of bar values" },
    { prop: "textureUrl", type: "string", default: "null", desc: "URL of texture to apply to bars (priority over color)" },
    { prop: "color", type: "string", default: "'#3b82f6'", desc: "Base color for bars with gradient by value" },
    { prop: "backgroundColor", type: "string", default: "'white'", desc: "Background color of the scene" },
    { prop: "barWidth", type: "number", default: "0.2", desc: "Width of each bar" },
    { prop: "barDepth", type: "number", default: "0.2", desc: "Depth of each bar" },
    { prop: "rotationSpeed", type: "number", default: "0.001", desc: "Auto-rotation speed of bar group" },
    { prop: "position", type: "object", default: "{x: 0, y: 0, z: 0}", desc: "3D position of the bar group" },
    { prop: "rotation", type: "object", default: "{x: 0, y: 0, z: 0}", desc: "3D rotation of the bar group" },
    { prop: "onGroupCreated", type: "function", default: "null", desc: "Callback when Three.js group is created" },
    { prop: "onLoad", type: "function", default: "null", desc: "Callback when texture is loaded" },
    { prop: "onError", type: "function", default: "null", desc: "Callback when error occurs" },
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
                      wordBreak: "break-word",
                    }}
                  >
                    {row.prop}
                  </td>
                  <td
                    style={{
                      padding: "clamp(8px, 2vw, 16px)",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#8b5cf6" : "#7c3aed",
                      wordBreak: "break-word",
                    }}
                  >
                    {row.type}
                  </td>
                  <td
                    style={{
                      padding: "clamp(8px, 2vw, 16px)",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#06b6d4" : "#0891b2",
                      wordBreak: "break-word",
                    }}
                  >
                    {row.default}
                  </td>
                  <td style={{ padding: "clamp(8px, 2vw, 16px)", wordBreak: "break-word" }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Section - Color Gradient */}
      <PreviewSection
        title="3D Bar Chart - Color Gradient"
        barData={[
          [3, 2, 1],
          [6, 5, 4],
          [5, 7, 6]
        ]}
        barProps={{
          color: '#10b981',
          backgroundColor: '#9effae',
          barWidth: 0.2,
          barDepth: 0.2,
          position: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: -8, y: 2, z: 8 },
          mainLightIntensity: 3.0,
          ambientLightIntensity: 3.0
        }}
      />

      {/* Code Section */}
      <CodeSection
        title="Code"
        jsxCode={threeBarJSX1}
      />

      {/* Preview Section - With Texture */}
      <PreviewSection
        title="3D Bar Chart - With Texture"
        barData={[
          [3, 2, 1],
          [6, 5, 4],
          [5, 7, 6]
        ]}
        barProps={{
          textureUrl: 'https://cdn.jsdelivr.net/gh/Aditya02git/Textures-v1/inkpaint.jpg',
          backgroundColor: '#f7fc88',
          barWidth: 0.2,
          barDepth: 0.2,
          position: { x: 0, y: 0, z: 0 },
          cameraPosition: { x: -8, y: 2, z: 8 },
          mainLightIntensity: 3.0,
          ambientLightIntensity: 3.0
        }}
      />

      {/* Code Section */}
      <CodeSection
        title="Code"
        jsxCode={threeBarJSX2}
      />
    </div>
  );
};

export default ThreeBarSection;