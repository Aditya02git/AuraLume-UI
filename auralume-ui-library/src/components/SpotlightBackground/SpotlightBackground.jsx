// SpotlightBackground.jsx
import React, { useEffect, useRef, useState } from 'react';
import './SpotlightBackground.css';

const SpotlightBackground = ({ 
  className = '', 
  children, 
  backgroundColor = '#19355d',
  gridColor = 'rgba(55,89,138,0.2)',
  spotlightSize = '100vh',
  spotlightColor = 'rgba(55,89,138,0.2)'
}) => {
  const wrapperRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        // Normalize mouse position to -1 to 1 range
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Helper function to lighten color
  const lightenColor = (color, percent) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1);
  };

  // Helper function to add alpha to hex color
  const hexToRgba = (hex, alpha) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const baseColor = backgroundColor;
  const lightColor = lightenColor(baseColor, 20);
  const lighterColor = lightenColor(baseColor, 40);

  // Calculate spotlight movement (subtle effect)
  const spotlightTransform = {
    transform: `translate(${mousePosition.x * 15}vh, ${mousePosition.y * 10}vh)`
  };

  const swivelTransform = {
    transform: `rotate(${-mousePosition.x * 10}deg) scaleY(${1 + Math.abs(mousePosition.y) * 0.1}) translateY(${mousePosition.y * 2}vh)`
  };

  const backdropStyle = {
    backgroundImage: `linear-gradient(#000000, ${baseColor} 90%, ${baseColor})`
  };

  const stageHighlightStyle = {
    ...spotlightTransform,
    backgroundImage: `radial-gradient(ellipse closest-side at 50% 82%, ${lighterColor}, ${hexToRgba(lighterColor, 0)} 100%)`,
    transition: 'none'
  };

  const lampStyle = {
    backgroundImage: `radial-gradient(ellipse, ${hexToRgba(lightColor, 0.5)}, ${hexToRgba(lightColor, 0.2)} 25%, ${hexToRgba(lightColor, 0)} 50%)`,
    transition: 'none'
  };

  return (
    <div 
      ref={wrapperRef} 
      className={`spotlight-wrapper ${className}`}
      style={{
        '--grid-color': gridColor,
        '--spotlight-size': spotlightSize,
        '--spotlight-color': spotlightColor
      }}
    >
      <div className="spotlight-backdrop" style={backdropStyle}></div>
      <div className="spotlight-stage-highlight" style={stageHighlightStyle}></div>
      <div className="spotlight-swivel" style={swivelTransform}>
        <div className="spotlight-lamp" style={lampStyle}></div>
        <div className="spotlight-beam"></div>
      </div>
      {children && (
        <div className="spotlight-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default SpotlightBackground;