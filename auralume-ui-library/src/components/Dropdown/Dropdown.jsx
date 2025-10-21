import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Dropdown = ({
  type = 'simple',
  label,
  placeholder = 'Choose one',
  options = [],
  value,
  onChange,
  className = '',
  disabled = false,
  width = '14rem',
  color = '#87CEEB',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState(
    type === 'multi' ? (Array.isArray(value) ? value : []) : value || ''
  );
  const dropdownRef = useRef(null);
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
    containerRef.current.style.setProperty('--dropdown-primary', color);
    containerRef.current.style.setProperty('--dropdown-primary-hover', adjustColor(color, -10));
    containerRef.current.style.setProperty('--dropdown-primary-light', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.4)`);
    containerRef.current.style.setProperty('--dropdown-focus-shadow', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.5)`);
    containerRef.current.style.setProperty('--dropdown-tag-text', textColor);
  }, [color]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSimpleClick = (option) => {
    if (option.onClick) {
      option.onClick();
    }
    setIsOpen(false);
  };

  const handleSelectClick = (option) => {
    setSelectedValues(option.value);
    if (onChange) {
      onChange(option.value);
    }
    setIsOpen(false);
  };

  const handleMultiSelectClick = (option) => {
    const newSelectedValues = selectedValues.includes(option.value)
      ? selectedValues.filter(v => v !== option.value)
      : [...selectedValues, option.value];
    
    setSelectedValues(newSelectedValues);
    if (onChange) {
      onChange(newSelectedValues);
    }
  };

  const getDisplayValue = () => {
    if (type === 'multi') {
      if (selectedValues.length === 0) {
        return <span className="dropdown-placeholder">{placeholder}</span>;
      }
      return (
        <div className="dropdown-selected-tags">
          {selectedValues.map(value => {
            const option = options.find(opt => opt.value === value);
            return option ? (
              <span key={value} className="dropdown-selected-tag">
                {option.label}
              </span>
            ) : null;
          })}
        </div>
      );
    }
    
    if (type === 'select') {
      const selectedOption = options.find(opt => opt.value === selectedValues);
      return selectedOption ? selectedOption.label : placeholder;
    }
    
    return placeholder;
  };

  const renderOptions = () => {
    return options.map((option, index) => {
      if (type === 'simple') {
        return (
          <a
            key={index}
            href={option.href || '#'}
            className="dropdown-menu-item"
            role="menuitem"
            onClick={(e) => {
              e.preventDefault();
              handleSimpleClick(option);
            }}
          >
            {option.label}
          </a>
        );
      }
      
      if (type === 'select') {
        return (
          <div
            key={option.value}
            className="dropdown-select-option"
            role="menuitem"
            onClick={() => handleSelectClick(option)}
          >
            {option.label}
          </div>
        );
      }
      
      if (type === 'multi') {
        const isSelected = selectedValues.includes(option.value);
        return (
          <div
            key={option.value}
            className={`dropdown-multi-select-option ${isSelected ? 'selected' : ''}`}
            role="option"
            onClick={() => handleMultiSelectClick(option)}
          >
            <span>{option.label}</span>
            <span className="dropdown-checkbox-icon">
              <CheckIcon />
            </span>
          </div>
        );
      }
      
      return null;
    });
  };

  const buttonClass = `dropdown-button ${
    type === 'multi' ? 'dropdown-multi-select-button' : 
    type === 'select' ? 'dropdown-select-button' : 
    'dropdown-simple-button'
  } ${disabled ? 'disabled' : ''}`;

  // Apply className to the container for theming
  const containerClass = `dropdown-container ${className}`;

  return (
    <div className={containerClass} ref={containerRef} {...props}>
      <div ref={dropdownRef}>
        {label && type !== 'simple' && (
          <label className="dropdown-label">{label}</label>
        )}
        
        <button
          type="button"
          className={buttonClass}
          onClick={toggleDropdown}
          disabled={disabled}
          style={{ width }}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <div className="dropdown-button-content">
            {getDisplayValue()}
          </div>
          <span className={`dropdown-icon ${isOpen ? "rotated" : ""}`}>
            <img src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/drop-down.png" alt="" height="20px" width="20px"/>
          </span>
        </button>

        <div 
          className={`dropdown-content ${isOpen ? 'show' : ''}`}
          style={{ width }}
        >
          <div 
            role="menu" 
            aria-orientation="vertical"
            style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
          >
            {renderOptions()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;