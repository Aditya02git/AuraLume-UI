import { CSSProperties } from 'react';
import * as THREE from 'three';

export interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

export interface BlobCallbackData {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  icosahedron: THREE.Mesh;
}

export interface BlobProps {
  // Basic styling
  color?: string;
  backgroundColor?: string;
  width?: string | number;
  height?: string | number;
  
  // Animation controls
  animation?: boolean;
  animationSpeed?: number;
  rotationSpeed?: Vector3Like;
  morphStrength?: number;
  
  // Geometry
  detail?: number;
  size?: number;
  
  // Camera
  cameraPosition?: Vector3Like;
  fov?: number;
  
  // Lighting
  ambientLightColor?: string;
  ambientLightIntensity?: number;
  pointLightColor?: string;
  pointLightIntensity?: number;
  pointLightPosition?: Vector3Like;
  
  // Controls
  orbitControl?: boolean;
  
  // Material
  wireframe?: boolean;
  material?: 'normal' | 'basic' | 'standard' | 'phong';
  
  // Events
  onReady?: (data: BlobCallbackData) => void;
  onClick?: (intersection: THREE.Intersection) => void;
  
  // Custom styles
  className?: string;
  style?: CSSProperties;
}

declare const Blob: React.FC<BlobProps>;
export default Blob;