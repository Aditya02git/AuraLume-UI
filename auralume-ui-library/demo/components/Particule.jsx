import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

class Particule {
  constructor(scene, burst, font) {
    const radius = Math.random() * 0.002 + 0.0008;
    this.group = new THREE.Group();
    this.isInitialized = false;
    this.isLoaded = false;

    const textsArray = [
      // Texts
      "Website", "Portfolio", "3D", "Text", "UI", "Design",
      "UX", "Frontend", "HTML", "CSS", "JavaScript",
      "TypeScript", "React", "Vue", "Angular", "Svelte", "NextJS", "Vite",
      "Web", "Tailwind", "Bootstrap",
      "Component", "Layout", "Grid", "Flexbox", "Responsive", "Animation",
      "Canvas", "SVG", "ThreeJS", "WebGL", "Shader", "Prototype", "Wireframe",
      "Figma", "Color", "Typography", "Icon", "Button",
      "Form", "Input", "Navbar", "Footer", "Card", "Dashboard", "Landing",
      "Background", "Gradient",
    ];
    this.randomText = textsArray[Math.floor(Math.random() * textsArray.length)];

    // Start hidden until font is loaded
    this.group.visible = false;

    // Build text if font is available, otherwise mark for later
    if (font) {
      this.buildText(this.randomText, font);
      this.isLoaded = true;
      this.group.visible = true;
    }

    this.group.scale.set(radius, radius, 0.00001);
    this.percent = burst ? 0.2 : Math.random();
    this.burst = !!burst;

    this.offset = new THREE.Vector3(
      (Math.random() - 0.5) * 0.025,
      (Math.random() - 0.5) * 0.025,
      0
    );

    this.speed = Math.random() * 0.0004 + 0.0002;
    if (this.burst) {
      this.speed += 0.003;
      this.group.scale.multiplyScalar(1.4);
    }

    this.rotate = new THREE.Vector3(
      -Math.random() * 0.1 + 0.01,
      0,
      Math.random() * 0.01
    );

    this.pos = new THREE.Vector3(0, 0, 0);
    scene.add(this.group);
  }

  // Method to load font after initialization
  loadFont(font) {
    if (!this.isLoaded && font) {
      this.buildText(this.randomText, font);
      this.isLoaded = true;
      this.group.visible = true;
    }
  }

  buildText(text, font) {
    if (!font) {
      return;
    }

    // Clear existing children
    while (this.group.children.length > 0) {
      this.group.remove(this.group.children[0]);
    }

    try {
      // Create geometry using imported TextGeometry
      const geom = new TextGeometry(text, {
        font: font,
        size: 1.0,
        height: 0.12,
        curveSegments: 6,
        bevelEnabled: false
      });

      // Center the geometry
      if (geom.center) {
        geom.center();
      } else {
        geom.computeBoundingBox();
        const b = geom.boundingBox.getCenter(new THREE.Vector3());
        geom.translate(-b.x, -b.y, -b.z);
      }

      const mat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
        flatShading: true
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.group.add(mesh);
    } catch (error) {
      console.error('Error building text geometry:', error);
      // Fallback to sprite
      this.buildTextSprite(text);
    }
  }

  // Lightweight canvas-to-texture fallback
  buildTextSprite(text) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;

    ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 60%)`;
    ctx.font = '64px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.2, 0.1, 1);
    this.group.add(sprite);
  }

  update(tunnel) {
    // Only update if tunnel and curve are properly initialized
    if (!tunnel || !tunnel.curve) {
      return;
    }

    this.percent += this.speed * (this.burst ? 1 : tunnel.speed);
    const newPercent = 1 - (this.percent % 1);
    
    // Get position on the curve
    try {
      this.pos = tunnel.curve.getPoint(newPercent).add(this.offset);
      this.group.position.copy(this.pos);
      
      // Only show particles in the visible range and if loaded
      if (newPercent < 0.05 || newPercent > 0.98 || !this.isLoaded) {
        this.group.visible = false;
      } else {
        this.group.visible = this.group.children.length > 0;
      }
      
      this.group.rotation.x += this.rotate.x;
      this.group.rotation.y += this.rotate.y;
      this.group.rotation.z += this.rotate.z;
      
      this.isInitialized = true;
    } catch (error) {
      // If curve update fails, hide the particle
      this.group.visible = false;
    }
  }

  dispose() {
    // Clean up resources
    this.group.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (child.material.map) child.material.map.dispose();
        child.material.dispose();
      }
    });
    if (this.group.parent) {
      this.group.parent.remove(this.group);
    }
  }
}

// Loading Manager for tracking resource loading
export class LoadingManager {
  constructor() {
    this.loaded = false;
    this.loadingElement = null;
    this.totalResources = 0;
    this.loadedResources = 0;
    this.onLoadCallback = null;
    
    this.createLoader();
  }

  createLoader() {
    // Create loader overlay
    this.loadingElement = document.createElement('div');
    this.loadingElement.id = 'loader-overlay';
    this.loadingElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.5s ease;
    `;

    // Spinner
    const spinner = document.createElement('div');
    spinner.style.cssText = `
      width: 60px;
      height: 60px;
      border: 4px solid #ff006e;
      border-top: 4px solid #00f5ff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    `;

    // Loading text
    const text = document.createElement('div');
    text.id = 'loader-text';
    text.textContent = 'Loading...';
    text.style.cssText = `
      color: #000;
      font-size: 24px;
      font-family: Arial, sans-serif;
      margin-top: 20px;
      font-weight: 300;
      letter-spacing: 2px;
    `;

    // Progress bar
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
      width: 300px;
      height: 4px;
      background: #cdcdcd;
      border-radius: 2px;
      margin-top: 30px;
      overflow: hidden;
    `;

    this.progressBar = document.createElement('div');
    this.progressBar.style.cssText = `
      width: 0%;
      height: 100%;
      background: #000000;
      border-radius: 2px;
      transition: width 0.3s ease;
    `;

    progressContainer.appendChild(this.progressBar);
    this.loadingElement.appendChild(spinner);
    this.loadingElement.appendChild(text);
    this.loadingElement.appendChild(progressContainer);

    // Add keyframes for spinner
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(this.loadingElement);
  }

  setTotalResources(count) {
    this.totalResources = count;
  }

  updateProgress(loaded) {
    this.loadedResources = loaded;
    const progress = (this.loadedResources / this.totalResources) * 100;
    if (this.progressBar) {
      this.progressBar.style.width = `${progress}%`;
    }
  }

  onLoad(callback) {
    this.onLoadCallback = callback;
  }

  complete() {
    if (this.loaded) return;
    this.loaded = true;
    
    if (this.progressBar) {
      this.progressBar.style.width = '100%';
    }

    setTimeout(() => {
      if (this.loadingElement) {
        this.loadingElement.style.opacity = '0';
        setTimeout(() => {
          if (this.loadingElement && this.loadingElement.parentNode) {
            this.loadingElement.parentNode.removeChild(this.loadingElement);
          }
        }, 500);
      }
      
      if (this.onLoadCallback) {
        this.onLoadCallback();
      }
    }, 300);
  }
}

export default Particule;