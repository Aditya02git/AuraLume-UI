import React, { useState, useRef, useEffect } from 'react';
import './SearchBar.css';

const SearchIcon = ({ className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="18" 
    height="18" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    aria-hidden="true"
    className={className}
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const SearchBar = ({
  type = 'simple', // 'simple' or 'animated'
  placeholder = 'Search...',
  value,
  onChange,
  onSubmit,
  onFocus,
  onBlur,
  disabled = false,
  className = '',
  iconPosition = 'left', // 'left' or 'right'
  size = 'medium', // 'small', 'medium', 'large'
  variant = 'default', // 'default', 'outlined', 'filled'
  theme = 'light', // 'light' or 'dark'
  color = '#3b82f6', // Primary color for theming
  autoFocus = false,
  clearable = false,
  onClear,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const searchValue = value !== undefined ? value : internalValue;
  const isControlled = value !== undefined;

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
    containerRef.current.style.setProperty('--searchbar-primary', color);
    containerRef.current.style.setProperty('--searchbar-primary-hover', adjustColor(color, -10));
    containerRef.current.style.setProperty('--searchbar-primary-light', adjustColor(color, 90));
    containerRef.current.style.setProperty('--searchbar-primary-dark', adjustColor(color, -20));
    containerRef.current.style.setProperty('--searchbar-focus-shadow', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.3)`);
    containerRef.current.style.setProperty('--searchbar-text-on-primary', textColor);
    containerRef.current.style.setProperty('--outline-color', color);
  }, [color]);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(searchValue, e);
  };

  const handleFocus = (e) => {
    if (type === 'animated') {
      setIsActive(true);
    }
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    if (type === 'animated' && !searchValue.trim()) {
      setIsActive(false);
    }
    onBlur?.(e);
  };

  const handleIconClick = () => {
    if (type === 'animated') {
      if (!isActive) {
        setIsActive(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      } else if (!searchValue.trim()) {
        setIsActive(false);
      }
    } else {
      inputRef.current?.focus();
    }
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    onClear?.();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      inputRef.current?.blur();
      if (type === 'animated' && !searchValue.trim()) {
        setIsActive(false);
      }
    }
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const baseClasses = [
    'searchbar',
    `searchbar--${type}`,
    `searchbar--${size}`,
    `searchbar--${variant}`,
    `searchbar--${theme}`,
    `searchbar--icon-${iconPosition}`,
    isActive && type === 'animated' ? 'searchbar--active' : '',
    disabled ? 'searchbar--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  const showClearButton = clearable && searchValue && !disabled;

  if (type === 'simple') {
    return (
      <form className={baseClasses} onSubmit={handleSubmit} ref={containerRef}>
        {iconPosition === 'left' && (
          <button
            type="button"
            className="searchbar__icon-btn"
            onClick={handleIconClick}
            disabled={disabled}
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        )}
        
        <input
          ref={inputRef}
          type="search"
          className="searchbar__input"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Search"
          {...props}
        />

        {showClearButton && (
          <button
            type="button"
            className="searchbar__clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}

        {iconPosition === 'right' && (
          <button
            type="submit"
            className="searchbar__icon-btn"
            disabled={disabled}
            aria-label="Search"
          >
            <SearchIcon />
          </button>
        )}
      </form>
    );
  }

  // Animated type
  return (
    <div className={baseClasses} ref={containerRef}>
      <button
        type="button"
        className="searchbar__icon-btn"
        onClick={handleIconClick}
        disabled={disabled}
        aria-label={isActive ? "Search" : "Open search"}
      >
        <SearchIcon />
      </button>
      
      <form onSubmit={handleSubmit} className="searchbar__form">
        <input
          ref={inputRef}
          type="search"
          className="searchbar__input"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-label="Search"
          {...props}
        />
      </form>

      {showClearButton && (
        <button
          type="button"
          className="searchbar__clear-btn"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;