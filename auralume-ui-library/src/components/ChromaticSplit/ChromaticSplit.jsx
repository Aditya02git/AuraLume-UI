import React, { useEffect, useRef, useState } from 'react';
import './ChromaticSplit.css';

const ChromaticSplit = ({ 
  image, 
  width = 400, 
  height = 500,
  autoGlitch = true,
  glitchIntensity = 15,
  mouseIntensity = 25,
  className = '',
  ...props 
}) => {
  const containerRef = useRef(null);
  const redImageRef = useRef(null);
  const greenImageRef = useRef(null);
  const blueImageRef = useRef(null);
  const normalImageRef = useRef(null);
  const glitchOverlayRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const randomIntFromInterval = (min, max) => {
    return Math.random() * (max - min + 1) + min;
  };

  const createRGBSplit = (offsetX, offsetY) => {
    if (!redImageRef.current || !greenImageRef.current || !blueImageRef.current) return;

    const redTransform = `translate(${offsetX}px, ${offsetY * 0.5}px)`;
    const greenTransform = `translate(${-offsetX * 0.5}px, ${offsetY}px)`;
    const blueTransform = `translate(${-offsetX}px, ${-offsetY * 0.5}px)`;

    redImageRef.current.style.transform = `translate(-50%, -50%) ${redTransform}`;
    greenImageRef.current.style.transform = `translate(-50%, -50%) ${greenTransform}`;
    blueImageRef.current.style.transform = `translate(-50%, -50%) ${blueTransform}`;
  };

  const resetTransforms = () => {
    if (!redImageRef.current || !greenImageRef.current || !blueImageRef.current) return;

    const resetTransform = 'translate(-50%, -50%)';
    redImageRef.current.style.transform = resetTransform;
    greenImageRef.current.style.transform = resetTransform;
    blueImageRef.current.style.transform = resetTransform;
  };

  const triggerGlitch = (intensity = 1) => {
    if (!glitchOverlayRef.current) return;

    glitchOverlayRef.current.classList.add('active');
    
    // Random RGB split during glitch
    const offsetX = randomIntFromInterval(-glitchIntensity, glitchIntensity) * intensity;
    const offsetY = randomIntFromInterval(-glitchIntensity, glitchIntensity) * intensity;
    createRGBSplit(offsetX, offsetY);

    setTimeout(() => {
      if (glitchOverlayRef.current) {
        glitchOverlayRef.current.classList.remove('active');
      }
      resetTransforms();
    }, 300);
  };

  const startAutoGlitch = () => {
    const performGlitch = () => {
      if (!autoGlitch) return;

      triggerGlitch(randomIntFromInterval(0.5, 1));
      
      const nextDelay = randomIntFromInterval(2000, 6000);
      animationRef.current = setTimeout(performGlitch, nextDelay);
    };

    // Start first glitch after a delay
    animationRef.current = setTimeout(performGlitch, randomIntFromInterval(1000, 3000));
  };

  useEffect(() => {
    if (autoGlitch && isLoaded) {
      startAutoGlitch();
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [autoGlitch, isLoaded]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoaded(false);
  };

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Update CSS custom properties for the overlay effect
    containerRef.current.style.setProperty('--mouse-x', `${x * 100}%`);
    containerRef.current.style.setProperty('--mouse-y', `${y * 100}%`);

    // Apply mouse-based RGB split
    const offsetX = (x - 0.5) * mouseIntensity;
    const offsetY = (y - 0.5) * mouseIntensity;
    createRGBSplit(offsetX, offsetY);

    // Random glitch on movement
    if (Math.random() < 0.05) {
      triggerGlitch(0.3);
    }
  };

  const handleMouseLeave = () => {
    resetTransforms();
  };

  const handleMouseEnter = () => {
    triggerGlitch(0.4);
  };

  if (!image) {
    return (
      <div 
        className={`chromatic-split-container ${className}`}
        style={{ 
          width, 
          height, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: '#222',
          color: '#666'
        }}
      >
        No image provided
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`chromatic-split-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ width, height }}
      {...props}
    >
      <div className="chromatic-split-image-wrapper">
        {/* Normal image (base layer) */}
        <img
          ref={normalImageRef}
          src={image}
          alt=""
          className="chromatic-split-image chromatic-split-normal"
          onLoad={handleImageLoad}
          onError={handleImageError}
          draggable={false}
        />
        
        {/* RGB split layers */}
        <img
          ref={redImageRef}
          src={image}
          alt=""
          className="chromatic-split-image chromatic-split-red"
          draggable={false}
        />
        <img
          ref={greenImageRef}
          src={image}
          alt=""
          className="chromatic-split-image chromatic-split-green"
          draggable={false}
        />
        <img
          ref={blueImageRef}
          src={image}
          alt=""
          className="chromatic-split-image chromatic-split-blue"
          draggable={false}
        />
      </div>

      {/* Glitch overlay effects */}
      <div 
        ref={glitchOverlayRef}
        className="chromatic-split-glitch"
      />
      
      {/* Mouse overlay */}
      <div className="chromatic-split-overlay" />

      {/* Loading state */}
      {!isLoaded && !imageError && (
        <div className="chromatic-split-loading">
          Loading
        </div>
      )}

      {/* Error state */}
      {imageError && (
        <div 
          className="chromatic-split-loading"
          style={{ color: '#ff6b6b' }}
        >
          Failed to load image
        </div>
      )}
    </div>
  );
};

export default ChromaticSplit;