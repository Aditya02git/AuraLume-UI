import React, { useEffect, useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

const SmokeEffect = forwardRef(({
speed = 1,
animation = true,
size = 1,
position = { x: 0, y: 0, z: 0 },
rotation = { x: 0, y: 0, z: 0 },
color = [],
onGroupCreated = null // Callback to receive the Three.js group
}, ref) => {
const effectGroupRef = useRef(null);
const puffsRef = useRef([]);
const animationDataRef = useRef({
lastTime: 0,
isAnimating: false
});

// Memoized colors based on custom colors
const effectColors = useMemo(() => {
if (color && color.length > 0) {
return color.map(c => new THREE.Color(c));
}

return [
new THREE.Color(0xFFFFFF), // White
new THREE.Color(0xE0E0E0), // Light Gray
new THREE.Color(0xD3D3D3), // Light Gray
new THREE.Color(0xC0C0C0), // Silver
new THREE.Color(0xA9A9A9) // Dark Gray
];
}, [color]);

// Calculate scale factor based on size (normalize to size 50 as baseline)
const scaleFactor = useMemo(() => size / 50, [size]);

// Expose methods to parent component
useImperativeHandle(ref, () => ({
getGroup: () => effectGroupRef.current,
updateEffect: (deltaTime) => {
if (animation && effectGroupRef.current) {
updateEffectAnimation(deltaTime);
}
},
setPosition: (x, y, z) => {
if (effectGroupRef.current) {
effectGroupRef.current.position.set(x, y, z);
}
},
setRotation: (x, y, z) => {
if (effectGroupRef.current) {
effectGroupRef.current.rotation.set(x, y, z);
}
},
dispose: () => {
disposeEffect();
}
}), [animation]);

// Animation update function
const updateEffectAnimation = (deltaTime) => {
const effectGroup = effectGroupRef.current;
if (!effectGroup) return;

const baseMaxHeight = 300;
const maxHeight = baseMaxHeight * scaleFactor;

for (let i = 0; i < puffsRef.current.length; i++) {
const mesh = effectGroup.children[i];
if (mesh) {
// Smoke continues moving upward
if (puffsRef.current[i] >= maxHeight) {
puffsRef.current[i] = scaleFactor; // Start from scaled minimum
} else {
puffsRef.current[i] += speed * deltaTime * 60 * scaleFactor; // Scale speed with size
}

// Update position
mesh.position.setY(puffsRef.current[i]);

mesh.scale.setScalar(Math.sin(puffsRef.current[i] / maxHeight * Math.PI));
// Smoke rotates gently - scale rotation with size
const rotationSpeed = deltaTime * 60 / (25000.0 * scaleFactor);
mesh.rotateX(Math.sin(puffsRef.current[i] * rotationSpeed));
mesh.rotateY(Math.sin(puffsRef.current[i] * rotationSpeed));
mesh.rotateZ(Math.sin(puffsRef.current[i] * rotationSpeed));

// Update opacity based on height
const opacity = Math.sin(puffsRef.current[i] / maxHeight * Math.PI) * 0.8;
mesh.material.opacity = Math.max(0.1, opacity);
}
}
};

// Dispose function
const disposeEffect = () => {
if (effectGroupRef.current) {
effectGroupRef.current.children.forEach(mesh => {
if (mesh.geometry) mesh.geometry.dispose();
if (mesh.material) mesh.material.dispose();
});
effectGroupRef.current.clear();
}
};

// Initialize effect group
useEffect(() => {
// Create effect group
const effectGroup = new THREE.Group();
effectGroup.position.set(position.x, position.y, position.z);
effectGroup.rotation.set(rotation.x, rotation.y, rotation.z);
effectGroupRef.current = effectGroup;

// Create smoke puffs
const baseSpacing = 25;
const spacing = baseSpacing * scaleFactor;
const puffPositions = Array.from({ length: 12 }, (_, i) => i * spacing);
puffsRef.current = [...puffPositions];

for (let i = 0; i < puffPositions.length; i++) {
const geometry = new THREE.IcosahedronGeometry(size, 0);

// Create material with color variation
const colorIndex = i % effectColors.length;
const material = new THREE.MeshLambertMaterial({
color: effectColors[colorIndex],
transparent: true,
opacity: 0.8
});

const mesh = new THREE.Mesh(geometry, material);

if (mesh.geometry.computeFlatVertexNormals) {
mesh.geometry.computeFlatVertexNormals();
}

// Smoke starts at random positions
const baseRandomRange = 40;
const randomRange = baseRandomRange * scaleFactor;
mesh.position.setX((Math.random() - 0.5) * randomRange);
mesh.position.setZ((Math.random() - 0.5) * randomRange);
mesh.rotation.x = Math.random();
mesh.rotation.y = Math.random();
mesh.rotation.z = Math.random();

effectGroup.add(mesh);
}

// Notify parent component that group is ready
if (onGroupCreated) {
onGroupCreated(effectGroup);
}

// Cleanup function
return () => {
disposeEffect();
};
}, [size, scaleFactor, effectColors, position.x, position.y, position.z, rotation.x, rotation.y, rotation.z, onGroupCreated]);

// Update position when position prop changes
useEffect(() => {
if (effectGroupRef.current) {
effectGroupRef.current.position.set(position.x, position.y, position.z);
}
}, [position.x, position.y, position.z]);

// Update rotation when rotation prop changes
useEffect(() => {
if (effectGroupRef.current) {
effectGroupRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
}
}, [rotation.x, rotation.y, rotation.z]);

// This component doesn't render anything visible in React
// The Three.js objects are managed through refs and callbacks
return null;
});

SmokeEffect.displayName = 'SmokeEffect';

export default SmokeEffect;