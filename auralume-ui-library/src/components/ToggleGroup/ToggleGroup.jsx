import React, { useState, useRef, useEffect } from 'react';
import './ToggleGroup.css';

const ToggleGroup = ({ 
  buttons = [], 
  defaultActive = 0, 
  onToggle = () => {},
  className = '',
  variant = 'default', // 'default', 'outline', 'minimal'
  theme = 'togglegroup-light', // 'togglegroup-light', 'togglegroup-dark'
  color = '#e33de0'
}) => {
  const [activeButton, setActiveButton] = useState(defaultActive);
  const containerRef = useRef(null);

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
    if (!rgb) return '#ffffff';
    
    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    
    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Function to create rgba color with opacity
  const colorWithOpacity = (hex, opacity) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return `rgba(0, 0, 0, ${opacity})`;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  };

  // Function to lighten color for hover states
  const lightenColor = (hex, percent) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const adjust = (value) => {
      const adjusted = value + (255 - value) * (percent / 100);
      return Math.min(255, Math.max(0, Math.round(adjusted)));
    };
    
    return `#${adjust(rgb.r).toString(16).padStart(2, '0')}${adjust(rgb.g).toString(16).padStart(2, '0')}${adjust(rgb.b).toString(16).padStart(2, '0')}`;
  };

  // Set CSS custom properties based on color prop
  useEffect(() => {
    if (!containerRef.current) return;
    
    const textColor = getContrastColor(color);
    const hoverColor = colorWithOpacity(color, 0.1);
    const lightColor = lightenColor(color, 30);
    const veryLightColor = colorWithOpacity(color, 0.15);
    const darkenedColor = lightenColor(color, -10);
    
    // Set CSS custom properties on the container
    containerRef.current.style.setProperty('--active-color', color);
    containerRef.current.style.setProperty('--active-text-color', textColor);
    containerRef.current.style.setProperty('--button-bg-color', veryLightColor);
    containerRef.current.style.setProperty('--button-text-color', color);
    containerRef.current.style.setProperty('--button-hover-bg', hoverColor);
    containerRef.current.style.setProperty('--button-hover-text', darkenedColor);
    containerRef.current.style.setProperty('--hover-color', hoverColor);
    containerRef.current.style.setProperty('--light-color', lightColor);
  }, [color]);

  const handleButtonClick = (index) => {
    setActiveButton(index);
    onToggle(index, buttons[index]);
  };

  return (
    <div 
      ref={containerRef}
      className={`toggle-group ${variant} ${theme} ${className}`}
    >
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`toggle-button ${activeButton === index ? 'active' : ''}`}
          onClick={() => handleButtonClick(index)}
          type="button"
        >
          {button.icon && (
            typeof button.icon === "string" ? (
              <i className={button.icon}></i>
            ) : (
              button.icon
            )
          )}
          <span className="text">{button.text}</span>
        </button>
      ))}
    </div>
  );
};

export default ToggleGroup;