import React, { useEffect, useRef } from 'react';
import './StarEffect.css';

const StarEffect = ({ 
  image = '', 
  svg = '',
  width = 300, 
  height = 'auto',
  starCount = 3,
  starSize = 10,
  animationInterval = 2000,
  starColor = 'rgb(103, 58, 183)',
  glowColor = 'rgba(244, 143, 177, 0.5)',
  className = ''
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const stars = containerRef.current.querySelectorAll('.magic-star');
    let index = 0;

    const rand = (min, max) => 
      Math.floor(Math.random() * (max - min + 1)) + min;

    const animate = (star) => {
      star.style.setProperty('--star-left', `${rand(-10, 110)}%`);
      star.style.setProperty('--star-top', `${rand(-10, 110)}%`);
      star.style.animation = 'none';
      star.offsetHeight; // Trigger reflow
      star.style.animation = '';
    };

    const intervals = [];
    const timeouts = [];

    stars.forEach((star) => {
      const timeout = setTimeout(() => {
        animate(star);
        const interval = setInterval(() => animate(star), animationInterval);
        intervals.push(interval);
      }, index++ * (animationInterval / 3));
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [animationInterval]);

  const renderStars = () => {
    return Array.from({ length: starCount }).map((_, index) => (
      <span 
        key={index} 
        className="magic-star"
        style={{ 
          '--size': `${starSize}px`,
          '--star-color': starColor
        }}
      >
        <svg viewBox="0 0 512 512">
          <path 
            d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z"
          />
        </svg>
      </span>
    ));
  };

  const commonStyles = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    filter: `drop-shadow(0 0 20px ${glowColor})`
  };

  const renderContent = () => {
    // Prioritize svg over image if both are provided
    if (svg) {
      return (
        <div 
          style={commonStyles}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      );
    } else if (image) {
      return (
        <img 
          src={image} 
          alt="Magic Item"
          style={commonStyles}
        />
      );
    }
    return null;
  };

  return (
    <div 
      ref={containerRef}
      className={`magic-wand-container ${className}`}
    >
      {renderContent()}
      {renderStars()}
    </div>
  );
};

export default StarEffect;