import React, { useRef, useEffect } from 'react';
import './Tooltip.css';

const Tooltip = ({ 
  children, 
  text, 
  position = 'up', 
  length = 'medium',
  className = '',
  color = '#ddd',
  ...props 
}) => {
  const tooltipRef = useRef(null);

  // Function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Function to calculate luminance and determine if color is light or dark
  const getContrastColor = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return '#000000';
    
    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    
    // Return black for light colors, white for dark colors
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Function to darken color for box shadow
  const darkenColor = (hex, percent = 10) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const darken = (value) => {
      const darkened = value * (1 - percent / 100);
      return Math.min(255, Math.max(0, Math.round(darkened)));
    };
    
    return `#${darken(rgb.r).toString(16).padStart(2, '0')}${darken(rgb.g).toString(16).padStart(2, '0')}${darken(rgb.b).toString(16).padStart(2, '0')}`;
  };

  // Set CSS custom properties based on color prop
  useEffect(() => {
    if (!tooltipRef.current) return;
    
    const textColor = getContrastColor(color);
    const shadowColor = darkenColor(color, 15);
    
    // Set CSS custom properties on the tooltip element
    tooltipRef.current.style.setProperty('--tooltip-bg', color);
    tooltipRef.current.style.setProperty('--tooltip-bs', shadowColor);
    tooltipRef.current.style.setProperty('--tooltip-text', textColor);
  }, [color]);

  return (
    <span
      ref={tooltipRef}
      className={`tooltip ${className}`}
      data-tooltip={text}
      data-tooltip-pos={position}
      data-tooltip-length={length}
      {...props}
    >
      {children}
    </span>
  );
};

export default Tooltip;