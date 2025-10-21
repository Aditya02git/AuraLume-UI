import React from 'react';
import './GlassmorphicBackground.css';

const GlassmorphicBackground = ({
  backgroundColor = '#0A2463',
  blobColor = 'rgba(47, 184, 255, 0.7)',
  numberOfBlobs = 3,
  animation = true,
  animationSpeed = 'normal', // 'slow', 'normal', 'fast'
  children
}) => {
  // Convert animation speed to duration multiplier
  const getSpeedMultiplier = () => {
    switch (animationSpeed) {
      case 'slow':
        return 2;
      case 'fast':
        return 0.5;
      case 'normal':
      default:
        return 1;
    }
  };

  const speedMultiplier = getSpeedMultiplier();

  // Generate blob configurations
  const generateBlobs = () => {
    const blobs = [];
    const positions = [
      { left: '70%', top: '50%', size: 200 },
      { left: '-200px', top: '-150px', size: 500 },
      { left: '500px', top: '-150px', size: 350 },
      { left: '80%', top: '20%', size: 300 },
      { left: '10%', top: '70%', size: 400 },
      { left: '60%', top: '80%', size: 250 },
      { left: '-100px', top: '50%', size: 350 },
      { left: '90%', top: '-50px', size: 280 }
    ];

    for (let i = 0; i < numberOfBlobs; i++) {
      const pos = positions[i % positions.length];
      blobs.push({
        id: i,
        ...pos,
        animationIndex: i % 2
      });
    }

    return blobs;
  };

  const blobs = generateBlobs();

  return (
    <div 
      className="glassmorphic-container" 
      style={{ background: backgroundColor }}
    >
      {blobs.map((blob) => (
        <div
          key={blob.id}
          className={`shape-blob ${animation ? 'animated' : 'static'}`}
          style={{
            background: blobColor,
            height: `${blob.size}px`,
            width: `${blob.size}px`,
            left: blob.left,
            top: blob.top,
            animationDuration: animation 
              ? `${20 * speedMultiplier}s, ${40 * speedMultiplier}s` 
              : 'none',
            animationName: animation 
              ? `transform, movement_${blob.animationIndex === 0 ? 'one' : 'two'}` 
              : 'none'
          }}
        />
      ))}
      {children}
    </div>
  );
};

export default GlassmorphicBackground;