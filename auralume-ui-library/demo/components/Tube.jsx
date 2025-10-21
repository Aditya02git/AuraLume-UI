import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import Particule, { LoadingManager } from './Particule';

class Tube {
  constructor(canvas) {
    this.canvas = canvas;
    this.animationId = null;
    this.isPaused = false;
    this.font = null;
    this.isReady = false;
    
    // Create loading manager
    this.loadingManager = new LoadingManager();
    this.loadingManager.setTotalResources(2); // Font + Scene setup
    
    this.init();
  }

  async init() {
    this.ww = window.innerWidth;
    this.wh = window.innerHeight;
    this.isMobile = this.ww < 500;
    
    this.speed = 1;
    this.prevTime = 0;

    this.mouse = {
      position: new THREE.Vector2(this.ww * 0.5, this.wh * 0.7),
      ratio: new THREE.Vector2(0, 0),
      target: new THREE.Vector2(this.ww * 0.5, this.wh * 0.7)
    };

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.canvas,
      powerPreference: "high-performance",
    });

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.ww, this.wh);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.camera = new THREE.PerspectiveCamera(15, this.ww / this.wh, 0.01, 100);
    this.camera.rotation.y = Math.PI;
    this.camera.position.z = 0.35;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000d25, 0.05, 1.6);

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 0);
    light.castShadow = true;
    this.scene.add(light);

    // Update loading progress for scene setup
    this.loadingManager.updateProgress(1);

    // Initialize particles array (empty until font loads)
    this.particles = [];

    // Load font asynchronously
    await this.loadFont();
    
    // Create mesh after font is loaded
    this.createMesh();
    
    // Add particles with font
    this.addParticle();
    
    // Setup event handlers
    this.handleEvents();
    
    // Mark as ready and complete loading
    this.isReady = true;
    this.loadingManager.complete();
    
    // Start animation after a short delay to ensure smooth transition
    setTimeout(() => {
      this.animationId = window.requestAnimationFrame(this.render.bind(this));
    }, 100);
  }

  async loadFont() {
    return new Promise((resolve, reject) => {
      const loader = new FontLoader();
      loader.load(
        'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
        (font) => {
          this.font = font;
          this.loadingManager.updateProgress(2);
          resolve(font);
        },
        (progress) => {
          // Optional: Update progress during font loading
          const fontProgress = 1 + (progress.loaded / progress.total);
          this.loadingManager.updateProgress(fontProgress);
        },
        (error) => {
          console.error('Error loading font:', error);
          reject(error);
        }
      );
    });
  }

  handleEvents() {
    this.onResize = this.onResize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    window.addEventListener("resize", this.onResize, { passive: true });
    document.body.addEventListener("mousemove", this.onMouseMove, { passive: true });
    document.body.addEventListener("touchmove", this.onMouseMove, { passive: true });
    document.body.addEventListener("touchstart", this.onMouseDown, { passive: true });
    document.body.addEventListener("mousedown", this.onMouseDown, { passive: true });
    document.body.addEventListener("mouseup", this.onMouseUp, { passive: true });
    document.body.addEventListener("mouseleave", this.onMouseUp, { passive: true });
    document.body.addEventListener("touchend", this.onMouseUp, { passive: true });
    window.addEventListener("mouseout", this.onMouseUp, { passive: true });
  }

  addParticle() {
    // Only add particles if font is loaded
    if (!this.font) {
      console.warn('Font not loaded yet, skipping particle creation');
      return;
    }

    this.particles = [];
    const particleCount = this.isMobile ? 70 : 150;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = new Particule(this.scene, false, this.font);
      this.particles.push(particle);
    }
  }

  createMesh() {
    const points = [];
    
    if (this.tubeMesh) {
      this.scene.remove(this.tubeMesh);
    }

    for (let i = 0; i < 5; i += 1) {
      points.push(new THREE.Vector3(0, 0, 2.5 * (i / 4)));
    }
    points[4].y = -0.06;

    this.curve = new THREE.CatmullRomCurve3(points);
    this.curve.type = "catmullrom";

    // Create spline mesh for reference
    const splineGeometry = new THREE.BufferGeometry().setFromPoints(this.curve.getPoints(70));
    this.splineMesh = new THREE.Line(splineGeometry, new THREE.LineBasicMaterial());

    this.tubeMaterial = new THREE.MeshBasicMaterial({
      side: THREE.BackSide,
      color: 0xffffff
    });

    this.tubeGeometry = new THREE.TubeGeometry(this.curve, 70, 0.02, 30, false);
    this.tubeMesh = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial);

    this.scene.add(this.tubeMesh);
  }

  onMouseDown() {
    this.mousedown = true;
  }

  onMouseUp() {
    this.mousedown = false;
  }

  onResize() {
    this.ww = window.innerWidth;
    this.wh = window.innerHeight;
    this.isMobile = this.ww < 500;

    this.camera.aspect = this.ww / this.wh;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.ww, this.wh);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  onMouseMove(e) {
    if (e.type === "mousemove") {
      this.mouse.target.x = e.clientX;
      this.mouse.target.y = e.clientY;
    } else {
      this.mouse.target.x = e.touches[0].clientX;
      this.mouse.target.y = e.touches[0].clientY;
    }
  }

  updateCameraPosition() {
    this.mouse.position.x += (this.mouse.target.x - this.mouse.position.x) / 30;
    this.mouse.position.y += (this.mouse.target.y - this.mouse.position.y) / 30;

    this.mouse.ratio.x = this.mouse.position.x / this.ww;
    this.mouse.ratio.y = this.mouse.position.y / this.wh;

    this.camera.rotation.z = this.mouse.ratio.x * 1 - 0.05;
    this.camera.rotation.y = Math.PI - (this.mouse.ratio.x * 0.3 - 0.15);
    this.camera.position.x = this.mouse.ratio.x * 0.044 - 0.025;
    this.camera.position.y = this.mouse.ratio.y * 0.044 - 0.025;
  }

  updateCurve() {
    // Update curve points based on mouse position first
    this.curve.points[2].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;
    this.curve.points[3].x = 0;
    this.curve.points[4].x = 0.6 * (1 - this.mouse.ratio.x) - 0.3;

    this.curve.points[2].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;
    this.curve.points[3].y = 0;
    this.curve.points[4].y = 0.6 * (1 - this.mouse.ratio.y) - 0.3;

    // Recreate the tube geometry with the updated curve
    this.scene.remove(this.tubeMesh);
    this.tubeGeometry.dispose();
    
    this.tubeGeometry = new THREE.TubeGeometry(this.curve, 70, 0.02, 30, false);
    this.tubeMesh = new THREE.Mesh(this.tubeGeometry, this.tubeMaterial);
    this.scene.add(this.tubeMesh);

    // Update spline mesh for particle reference
    const newSplinePoints = this.curve.getPoints(70);
    this.splineMesh.geometry.setFromPoints(newSplinePoints);
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    if (this.isPaused) {
      this.isPaused = false;
      this.animationId = window.requestAnimationFrame(this.render.bind(this));
    }
  }

  render(time) {
    // Don't render if paused or not ready
    if (this.isPaused || !this.isReady) {
      return;
    }

    this.updateCameraPosition();
    this.updateCurve();

    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(this);
      if (this.particles[i].burst && this.particles[i].percent > 1) {
        this.particles[i].dispose();
        this.particles.splice(i, 1);
        i--;
      }
    }

    // When mouse down, add particles
    if (this.mousedown && this.font) {
      if (time - this.prevTime > 20) {
        this.prevTime = time;
        this.particles.push(new Particule(this.scene, true, this.font));

        if (!this.isMobile) {
          this.particles.push(new Particule(this.scene, true, this.font));
          this.particles.push(new Particule(this.scene, true, this.font));
        }
      }
    }

    this.renderer.render(this.scene, this.camera);
    this.animationId = window.requestAnimationFrame(this.render.bind(this));
  }

  cleanup() {
    this.isPaused = true;
    this.isReady = false;
    
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
    }
    
    // Remove event listeners
    window.removeEventListener("resize", this.onResize);
    document.body.removeEventListener("mousemove", this.onMouseMove);
    document.body.removeEventListener("touchmove", this.onMouseMove);
    document.body.removeEventListener("touchstart", this.onMouseDown);
    document.body.removeEventListener("mousedown", this.onMouseDown);
    document.body.removeEventListener("mouseup", this.onMouseUp);
    document.body.removeEventListener("mouseleave", this.onMouseUp);
    document.body.removeEventListener("touchend", this.onMouseUp);
    window.removeEventListener("mouseout", this.onMouseUp);

    // Dispose of particles
    if (this.particles) {
      this.particles.forEach(particle => {
        if (particle.dispose) {
          particle.dispose();
        }
      });
      this.particles = [];
    }

    // Dispose of Three.js resources
    if (this.renderer) {
      this.renderer.dispose();
    }
    
    if (this.scene) {
      this.scene.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }
  }
}

export default Tube;