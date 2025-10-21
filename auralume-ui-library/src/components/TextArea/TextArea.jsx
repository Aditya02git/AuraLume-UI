import React, { useState, useEffect, useRef } from 'react';
import './TextArea.css';

const TextArea = ({
  variant = 'default',
  placeholder = 'Start typing...',
  value = '',
  onChange = () => {},
  showCounter = false,
  autoExpand = false,
  minHeight = 60,
  maxHeight = 300,
  className = '',
  disabled = false,
  rows = 4,
  theme = 'textarea-light',
  color = '#6c757d', // Default gray color
  focusColor = '#3b82f6', // Custom focus color (falls back to color if not provided)
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const textareaRef = useRef(null);
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
    
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Function to lighten/darken color
  const adjustColor = (hex, percent) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    if (percent > 0) {
      const adjust = (value) => {
        const adjusted = value + (255 - value) * (percent / 100);
        return Math.min(255, Math.max(0, Math.round(adjusted)));
      };
      return `#${adjust(rgb.r).toString(16).padStart(2, '0')}${adjust(rgb.g).toString(16).padStart(2, '0')}${adjust(rgb.b).toString(16).padStart(2, '0')}`;
    } else {
      const darken = (value) => {
        const darkened = value * (1 + percent / 100);
        return Math.min(255, Math.max(0, Math.round(darkened)));
      };
      return `#${darken(rgb.r).toString(16).padStart(2, '0')}${darken(rgb.g).toString(16).padStart(2, '0')}${darken(rgb.b).toString(16).padStart(2, '0')}`;
    }
  };

  // Set CSS custom properties based on color and focusColor props
  useEffect(() => {
    if (!containerRef.current) return;
    
    const rgb = hexToRgb(color);
    const effectiveFocusColor = focusColor || color;
    const focusRgb = hexToRgb(effectiveFocusColor);
    
    const textColorDark = getContrastColor(color); // For dark theme
    const textColorLight = '#000000'; // Always black for light theme
    const lighterBg = adjustColor(color, 80);
    const darkerBg = adjustColor(color, -70);
    const disabledBg = adjustColor(color, theme === 'textarea-light' ? 85 : -80);
    const scrollbarColor = adjustColor(color, theme === 'textarea-light' ? 20 : -20);
    
    // Set CSS custom properties on the container
    containerRef.current.style.setProperty('--textarea-primary', color);
    containerRef.current.style.setProperty('--textarea-focus-color', effectiveFocusColor);
    containerRef.current.style.setProperty('--textarea-focus-rgb', `${focusRgb.r}, ${focusRgb.g}, ${focusRgb.b}`);
    containerRef.current.style.setProperty('--textarea-text-dark', textColorDark);
    containerRef.current.style.setProperty('--textarea-text-light', textColorLight);
    containerRef.current.style.setProperty('--textarea-bg-light', lighterBg);
    containerRef.current.style.setProperty('--textarea-bg-dark', darkerBg);
    containerRef.current.style.setProperty('--textarea-disabled-bg', disabledBg);
    containerRef.current.style.setProperty('--textarea-scrollbar', scrollbarColor);
    containerRef.current.style.setProperty('--textarea-counter-color', color);
  }, [color, focusColor, theme]);

  // Update internal value when prop changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Update counters
  useEffect(() => {
    const text = internalValue;
    setCharCount(text.length);
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(text.trim() === '' ? 0 : words.length);
  }, [internalValue]);

  // Auto-expand functionality
  useEffect(() => {
    if (autoExpand && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto';
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);
      textarea.style.height = newHeight + 'px';
    }
  }, [internalValue, autoExpand, minHeight, maxHeight]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange(e);
  };

  const getClassName = () => {
    let baseClass = 'textarea-component';
    if (variant === 'counter') baseClass += ' textarea-counter-variant';
    if (variant === 'auto-expand') baseClass += ' textarea-auto-expand-variant';
    if (autoExpand) baseClass += ' textarea-auto-expand';
    if (disabled) baseClass += ' textarea-disabled';
    if (theme) baseClass += ` ${theme}`;
    if (className) baseClass += ` ${className}`;
    return baseClass;
  };

  const textareaProps = {
    ref: textareaRef,
    value: internalValue,
    onChange: handleChange,
    placeholder,
    disabled,
    className: 'textarea-input',
    style: {
      minHeight: autoExpand ? `${minHeight}px` : undefined,
      maxHeight: autoExpand ? `${maxHeight}px` : undefined,
      resize: autoExpand ? 'none' : 'vertical',
      overflow: autoExpand ? 'hidden' : 'auto'
    },
    rows: autoExpand ? undefined : rows,
    ...props
  };

  return (
    <div ref={containerRef} className={getClassName()}>
      <div className="textarea-wrapper">
        <textarea {...textareaProps} />
        {(showCounter || variant === 'counter') && (
          <div className="textarea-counter">
            <span className="char-count">{charCount}</span> chars | 
            <span className="word-count"> {wordCount}</span> words
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;