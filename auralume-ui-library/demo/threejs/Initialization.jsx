import React, { useEffect, useState } from 'react';
import CodeBlock from '../../src/components/CodeBlock';


const Initialization = ({isDarkMode, setIsDarkMode}) => {

  return (
    <div style={{
      minHeight: '100vh',
      transition: 'background-color 0.3s ease'
    }}>

      {/* Main Content */}
      <div style={{
        maxWidth: '896px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        <div style={{
          maxWidth: 'none'
        }}>
          <p style={{
            color: isDarkMode ? '#94a3b8' : '#475569',
            marginBottom: '24px',
            fontSize: '18px',
            fontWeight: '600',
            lineHeight: '1.8',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <svg style={{color: isDarkMode ? '#94a3b8' : '#475569'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M20.337 3.664c.213.212.354.486.404.782.294 1.711.657 5.195-.906 6.76-1.77 1.768-8.485 5.517-10.611 6.683a.987.987 0 0 1-1.176-.173l-.882-.88-.877-.884a.988.988 0 0 1-.173-1.177c1.165-2.126 4.913-8.841 6.682-10.611 1.562-1.563 5.046-1.198 6.757-.904.296.05.57.191.782.404ZM5.407 7.576l4-.341-2.69 4.48-2.857-.334a.996.996 0 0 1-.565-1.694l2.112-2.111Zm11.357 7.02-.34 4-2.111 2.113a.996.996 0 0 1-1.69-.565l-.422-2.807 4.563-2.74Zm.84-6.21a1.99 1.99 0 1 1-3.98 0 1.99 1.99 0 0 1 3.98 0Z" clip-rule="evenodd"/>
            </svg>
            Get Started
          </p>

          <div style={{ marginBottom: '48px' }}>
            <CodeBlock language='npm'>{`npm install auralume-three-ui@latest`}</CodeBlock>
          </div>

          <p style={{
            color: isDarkMode ? '#94a3b8' : '#475569',
            marginBottom: '40px',
            fontSize: '16px',
            lineHeight: '1.8',
            paddingLeft: '1.5rem'
          }}>
            Next, install the required dependencies for{' '}
            <code style={{
              padding: '4px 10px',
              fontSize: '16px',
              fontFamily: 'ui-monospace, monospace',
              backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              color: '#385dba',
              borderRadius: '6px',
              fontWeight: '600'
            }}>Three.js</code>{' '}and
            <code style={{
              padding: '4px 10px',
              fontSize: '16px',
              fontFamily: 'ui-monospace, monospace',
              backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              color: '#385dba',
              borderRadius: '6px',
              fontWeight: '600'
            }}>React Three Fiber</code>{' '}
          </p>

          <div style={{ marginBottom: '48px' }}>
            <CodeBlock language='npm'>
              {`npm i three`}
            </CodeBlock>
          </div>
          <div style={{ marginBottom: '48px' }}>
            <CodeBlock language='npm'>
              {`npm install @react-three/fiber`}
            </CodeBlock>
          </div>
          <div style={{ marginBottom: '48px' }}>
            <CodeBlock language='npm'>
              {`npm install @react-three/drei`}
            </CodeBlock>
          </div>

          <p style={{
            color: isDarkMode ? '#94a3b8' : '#475569',
            marginBottom: '40px',
            fontSize: '16px',
            lineHeight: '1.8',
            display: 'flex',
            alignItems: 'center',
            gap:'10px'
          }}>
            <svg style={{color: isDarkMode ? '#94a3b8' : '#475569'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M7.05 4.05A7 7 0 0 1 19 9c0 2.407-1.197 3.874-2.186 5.084l-.04.048C15.77 15.362 15 16.34 15 18a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1c0-1.612-.77-2.613-1.78-3.875l-.045-.056C6.193 12.842 5 11.352 5 9a7 7 0 0 1 2.05-4.95ZM9 21a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1Zm1.586-13.414A2 2 0 0 1 12 7a1 1 0 1 0 0-2 4 4 0 0 0-4 4 1 1 0 0 0 2 0 2 2 0 0 1 .586-1.414Z" clip-rule="evenodd"/>
            </svg>

            Install the packages at once
          </p>

          <div style={{ marginBottom: '48px' }}>
            <CodeBlock language='npm'>
              {`npm i three @react-three/fiber @react-three/drei`}
            </CodeBlock>
          </div>

          <p style={{
            color: isDarkMode ? '#94a3b8' : '#475569',
            marginBottom: '24px',
            fontSize: '16px',
            lineHeight: '1.8',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.1 9.2214C18.29 9.2214 17.55 7.9414 18.45 6.3714C18.97 5.4614 18.66 4.3014 17.75 3.7814L16.02 2.7914C15.23 2.3214 14.21 2.6014 13.74 3.3914L13.63 3.5814C12.73 5.1514 11.25 5.1514 10.34 3.5814L10.23 3.3914C9.78 2.6014 8.76 2.3214 7.97 2.7914L6.24 3.7814C5.33 4.3014 5.02 5.4714 5.54 6.3814C6.45 7.9414 5.71 9.2214 3.9 9.2214C2.86 9.2214 2 10.0714 2 11.1214V12.8814C2 13.9214 2.85 14.7814 3.9 14.7814C5.71 14.7814 6.45 16.0614 5.54 17.6314C5.02 18.5414 5.33 19.7014 6.24 20.2214L7.97 21.2114C8.76 21.6814 9.78 21.4014 10.25 20.6114L10.36 20.4214C11.26 18.8514 12.74 18.8514 13.65 20.4214L13.76 20.6114C14.23 21.4014 15.25 21.6814 16.04 21.2114L17.77 20.2214C18.68 19.7014 18.99 18.5314 18.47 17.6314C17.56 16.0614 18.3 14.7814 20.11 14.7814C21.15 14.7814 22.01 13.9314 22.01 12.8814V11.1214C22 10.0814 21.15 9.2214 20.1 9.2214ZM12 15.2514C10.21 15.2514 8.75 13.7914 8.75 12.0014C8.75 10.2114 10.21 8.7514 12 8.7514C13.79 8.7514 15.25 10.2114 15.25 12.0014C15.25 13.7914 13.79 15.2514 12 15.2514Z" fill={isDarkMode ? '#94a3b8' : '#475569'}/>
            </svg>
            Setting up files <span style={{fontWeight: 'bold'}}>(Not Compulsory)</span>
          </p>

          <div style={{ marginBottom: '48px' }}>
            <CodeBlock language='jsx'>{`
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
      console.log('3d component added to scene:', group);
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
      
      {/* 3d component - only render when scene is ready */}
      {sceneReady && sceneRef.current && (

      // add three js components here

      )}
    </div>
  );
};

export default App;`}</CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Initialization;