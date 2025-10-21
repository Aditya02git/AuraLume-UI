import React, { useRef, useEffect } from 'react';
import './ProgressBar.css';

const ProgressBar = ({
  type = 'linear',
  progress = 0,
  size = 'medium',
  variant = 'progressbar-light',
  showLabel = false,
  label = '',
  className = '',
  color = '#3b82f6', // Primary color for theming
  ...props
}) => {
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

  // Function to lighten/darken color
  const adjustColor = (hex, percent) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const adjust = (value) => {
      const adjusted = value + (255 - value) * (percent / 100);
      return Math.min(255, Math.max(0, Math.round(adjusted)));
    };
    
    if (percent > 0) {
      return `#${adjust(rgb.r).toString(16).padStart(2, '0')}${adjust(rgb.g).toString(16).padStart(2, '0')}${adjust(rgb.b).toString(16).padStart(2, '0')}`;
    } else {
      const darken = (value) => {
        const darkened = value * (1 + percent / 100);
        return Math.min(255, Math.max(0, Math.round(darkened)));
      };
      return `#${darken(rgb.r).toString(16).padStart(2, '0')}${darken(rgb.g).toString(16).padStart(2, '0')}${darken(rgb.b).toString(16).padStart(2, '0')}`;
    }
  };

  // Generate color variants
  useEffect(() => {
    if (!containerRef.current) return;
    
    const rgb = hexToRgb(color);
    const textColor = getContrastColor(color);
    
    // Set CSS custom properties on the container
    containerRef.current.style.setProperty('--progress-color', color);
    containerRef.current.style.setProperty('--progress-color-dark', adjustColor(color, -30));
    containerRef.current.style.setProperty('--progress-color-light', adjustColor(color, 20));
    containerRef.current.style.setProperty('--progress-text-on-color', textColor);
    containerRef.current.style.setProperty('--progress-focus-outline', color);
  }, [color]);

  // Clamp progress between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  const baseClasses = `progressbar progressbar--${type} progressbar--${size} ${variant}`;
  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (type === 'spinner') {
    return (
      <div className={combinedClasses} ref={containerRef} {...props}>
        <div className="progressbar__spinner">
          <svg className="progressbar__spinner-svg" viewBox="0 0 50 50">
            <circle
              className="progressbar__spinner-track"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
            />
            <circle
              className="progressbar__spinner-fill"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
              strokeDasharray={`${normalizedProgress * 1.26} 126`}
              strokeDashoffset="0"
            />
          </svg>
          {showLabel && (
            <div className="progressbar__label progressbar__label--center">
              {label || `${normalizedProgress}%`}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={combinedClasses} ref={containerRef} {...props}>
      <div className="progressbar__track">
        <div
          className="progressbar__fill"
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
      {showLabel && (
        <div className="progressbar__label">
          {label || `${normalizedProgress}%`}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;