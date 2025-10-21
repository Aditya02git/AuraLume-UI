import React, { useState, useRef, useEffect } from 'react';
import './FabIcon.css';

const FabIcon = ({
  type = 'arc',
  theme = 'fab-light',
  items = [],
  size = 'medium',
  position = 'bottom-right',
  color = '#000000',
  onItemClick = () => {},
  disabled = false,
  className = '',
  style = {},
  triggerIcon = null,
  closeOnItemClick = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Function to calculate luminance and determine contrast color
  const getContrastColor = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return '#ffffff';
    
    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    
    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Function to adjust color brightness
  const adjustColor = (hex, percent) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const adjust = (value) => {
      if (percent > 0) {
        // Lighten
        const adjusted = value + (255 - value) * (percent / 100);
        return Math.min(255, Math.max(0, Math.round(adjusted)));
      } else {
        // Darken
        const darkened = value * (1 + percent / 100);
        return Math.min(255, Math.max(0, Math.round(darkened)));
      }
    };
    
    const r = adjust(rgb.r);
    const g = adjust(rgb.g);
    const b = adjust(rgb.b);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    if (menuRef.current) {
      const rgb = hexToRgb(color);
      const contrastColor = getContrastColor(color);
      
      // Set CSS custom properties for colors
      menuRef.current.style.setProperty('--fab-menu-bg', color);
      menuRef.current.style.setProperty('--fab-menu-fg', contrastColor);
      menuRef.current.style.setProperty('--fab-menu-hover', adjustColor(color, -10));
      menuRef.current.style.setProperty('--fab-menu-shadow', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.15)`);
      menuRef.current.style.setProperty('--fab-item-bg', color);
      menuRef.current.style.setProperty('--fab-item-fg', contrastColor);
      menuRef.current.style.setProperty('--fab-item-hover', adjustColor(color, -10));

      const menuItems = menuRef.current.querySelectorAll('.fab-item');
      const itemCount = menuItems.length;
      
      // Set max items count for CSS calculations
      menuRef.current.style.setProperty('--max-items', itemCount);
      
      // Calculate dynamic scaling based on item count
      let dynamicScale = 1;
      let dynamicDistanceMultiplier = 1;
      
      if (itemCount <= 3) {
        dynamicScale = 1;
        dynamicDistanceMultiplier = 1;
      } else if (itemCount <= 5) {
        dynamicScale = 0.9;
        dynamicDistanceMultiplier = 1.1;
      } else if (itemCount <= 7) {
        dynamicScale = 0.8;
        dynamicDistanceMultiplier = 1.2;
      } else if (itemCount <= 9) {
        dynamicScale = 0.7;
        dynamicDistanceMultiplier = 1.3;
      } else if (itemCount <= 12) {
        dynamicScale = 0.6;
        dynamicDistanceMultiplier = 1.4;
      } else {
        // For more than 12 items, continue scaling down
        dynamicScale = Math.max(0.4, 1 - (itemCount - 3) * 0.04);
        dynamicDistanceMultiplier = Math.min(1.8, 1 + (itemCount - 3) * 0.035);
      }
      
      menuRef.current.style.setProperty('--dynamic-scale', dynamicScale);
      menuRef.current.style.setProperty('--dynamic-distance-multiplier', dynamicDistanceMultiplier);
      
      // Set individual item indices
      menuItems.forEach((el, index) => {
        el.style.setProperty('--item', index);
      });
    }
  }, [items, color]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (item, index) => {
    onItemClick(item, index);
    if (closeOnItemClick) {
      setIsOpen(false);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'fab-small';
      case 'large': return 'fab-large';
      default: return 'fab-medium';
    }
  };

  const getPositionClass = () => {
    if (!position) return '';
    
    // Add fab-fixed class only when position is specified
    const fixedClass = 'fab-fixed';
    switch (position) {
      case 'top-left': return `${fixedClass} fab-top-left`;
      case 'top-right': return `${fixedClass} fab-top-right`;
      case 'bottom-left': return `${fixedClass} fab-bottom-left`;
      case 'center': return `${fixedClass} fab-center`;
      case 'bottom-right': return `${fixedClass} fab-bottom-right`;
      default: return '';
    }
  };

  const defaultTriggerIcon = (
    <div className="fab-icon">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );

  const renderItems = () => {
    if (type === 'linear') {
      return items.map((item, index) => (
        <span
          key={index}
          className="fab-item fab-item-linear"
          onClick={() => handleItemClick(item, index)}
          title={item.label}
        >
          {item.icon}
        </span>
      ));
    }

    return items.map((item, index) => (
      <span
        key={index}
        className="fab-item"
        onClick={() => handleItemClick(item, index)}
        title={item.label}
      >
        {item.icon}
      </span>
    ));
  };

  return (
    <div
      ref={menuRef}
      className={`
        fab-menu 
        ${theme} 
        ${getSizeClass()} 
        ${getPositionClass()}
        fab-${type}
        ${isOpen ? 'fab-open' : ''}
        ${disabled ? 'fab-disabled' : ''}
        ${className}
      `}
      style={style}
    >
      <div 
        className="fab-trigger"
        onClick={handleToggle}
        role="button"
        aria-expanded={isOpen}
        aria-label="Toggle menu"
      >
        {triggerIcon || defaultTriggerIcon}
      </div>
      {renderItems()}
    </div>
  );
};

export default FabIcon;