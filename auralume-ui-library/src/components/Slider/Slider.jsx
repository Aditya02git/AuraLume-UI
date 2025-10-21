import React, { useState, useRef, useCallback, useEffect } from 'react';
import './Slider.css';

const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  defaultValues = [25, 75],
  variant = 'default',
  dir = 'ltr',
  disabled = false,
  showOutput = true,
  theme = 'slider-light',
  color = '#e33de0', // Any valid CSS color
  className = '',
  onChange,
  onChangeEnd,
  ...props
}) => {
  // State for single range
  const [value, setValue] = useState(defaultValue);
  
  // State for dual range
  const [values, setValues] = useState(defaultValues);
  
  // Track which thumb is being dragged
  const [activeThumb, setActiveThumb] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Refs for direct DOM manipulation
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const thumb2Ref = useRef(null);
  const fillRef = useRef(null);
  
  // Generate dynamic color styles based on the color prop
  const getDynamicColorStyle = () => {
    return {
      '--fill-color': color,
      '--thumb-border-color': color,
      '--output-color': theme === 'slider-dark' ? '#f3f4f6' : '#374151',
    };
  };
  
  // Calculate percentage for positioning
  const getPercentage = useCallback((val) => {
    return ((val - min) / (max - min)) * 100;
  }, [min, max]);
  
  // Get value from mouse/touch position
  const getValueFromPosition = useCallback((clientX) => {
    if (!trackRef.current) return min;
    
    const rect = trackRef.current.getBoundingClientRect();
    const isRTL = dir === 'rtl';
    
    let percentage;
    if (isRTL) {
      percentage = (rect.right - clientX) / rect.width;
    } else {
      percentage = (clientX - rect.left) / rect.width;
    }
    
    percentage = Math.max(0, Math.min(1, percentage));
    
    const rawValue = min + percentage * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    
    return Math.max(min, Math.min(max, steppedValue));
  }, [min, max, step, dir]);
  
  // Update visual elements immediately
  const updateVisuals = useCallback((newValue, newValues = null) => {
    if (!trackRef.current || !fillRef.current) return;
    
    const isRTL = dir === 'rtl';
    
    if (variant === 'dual' && newValues) {
      const [val1, val2] = newValues;
      const percent1 = getPercentage(val1);
      const percent2 = getPercentage(val2);
      
      if (thumbRef.current && thumb2Ref.current) {
        if (isRTL) {
          thumbRef.current.style.right = `${percent1}%`;
          thumb2Ref.current.style.right = `${percent2}%`;
        } else {
          thumbRef.current.style.left = `${percent1}%`;
          thumb2Ref.current.style.left = `${percent2}%`;
        }
      }
      
      // Update fill track
      const leftPercent = Math.min(percent1, percent2);
      const rightPercent = Math.max(percent1, percent2);
      
      if (isRTL) {
        fillRef.current.style.right = `${100 - rightPercent}%`;
        fillRef.current.style.left = `${100 - leftPercent}%`;
      } else {
        fillRef.current.style.left = `${leftPercent}%`;
        fillRef.current.style.right = `${100 - rightPercent}%`;
      }
    } else {
      const percent = getPercentage(newValue);
      
      if (thumbRef.current) {
        if (isRTL) {
          thumbRef.current.style.right = `${percent}%`;
        } else {
          thumbRef.current.style.left = `${percent}%`;
        }
      }
      
      // Update fill track for single range
      if (isRTL) {
        fillRef.current.style.right = `${percent}%`;
        fillRef.current.style.left = '0%';
      } else {
        fillRef.current.style.left = '0%';
        fillRef.current.style.right = `${100 - percent}%`;
      }
    }
  }, [variant, dir, getPercentage]);
  
  // Handle single range change
  const handleSingleChange = useCallback((newValue) => {
    if (disabled) return;
    
    setValue(newValue);
    updateVisuals(newValue);
    onChange?.(newValue);
  }, [disabled, onChange, updateVisuals]);
  
  // Handle dual range change
  const handleDualChange = useCallback((newValue, thumbIndex) => {
    if (disabled) return;
    
    const newValues = [...values];
    newValues[thumbIndex] = newValue;
    
    // Ensure values don't cross over
    if (thumbIndex === 0 && newValue > values[1]) {
      newValues[1] = newValue;
    } else if (thumbIndex === 1 && newValue < values[0]) {
      newValues[0] = newValue;
    }
    
    setValues(newValues);
    updateVisuals(null, newValues);
    onChange?.(newValues);
  }, [disabled, values, onChange, updateVisuals]);
  
  // Get closest thumb for dual range
  const getClosestThumb = useCallback((clientX) => {
    const newValue = getValueFromPosition(clientX);
    const distance1 = Math.abs(newValue - values[0]);
    const distance2 = Math.abs(newValue - values[1]);
    
    return distance1 <= distance2 ? 0 : 1;
  }, [values, getValueFromPosition]);
  
  // Mouse/Touch event handlers for dual range
  const handlePointerDown = useCallback((e) => {
    if (disabled) return;
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    
    if (variant === 'dual') {
      const thumbIndex = getClosestThumb(clientX);
      setActiveThumb(thumbIndex);
    }
    
    setIsDragging(true);
    
    // Prevent default to avoid text selection
    e.preventDefault();
  }, [disabled, variant, getClosestThumb]);
  
  const handlePointerMove = useCallback((e) => {
    if (!isDragging || disabled) return;
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const newValue = getValueFromPosition(clientX);
    
    if (variant === 'dual' && activeThumb !== null) {
      handleDualChange(newValue, activeThumb);
    } else if (variant === 'default') {
      handleSingleChange(newValue);
    }
    
    e.preventDefault();
  }, [isDragging, disabled, variant, activeThumb, getValueFromPosition, handleDualChange, handleSingleChange]);
  
  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    setActiveThumb(null);
    
    const finalValue = variant === 'dual' ? values : value;
    onChangeEnd?.(finalValue);
  }, [isDragging, variant, values, value, onChangeEnd]);
  
  // Keyboard support
  const handleKeyDown = useCallback((e, thumbIndex = null) => {
    if (disabled) return;
    
    let newValue;
    const currentValue = variant === 'dual' ? values[thumbIndex] : value;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, currentValue + step);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, currentValue - step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }
    
    if (variant === 'dual') {
      handleDualChange(newValue, thumbIndex);
    } else {
      handleSingleChange(newValue);
    }
    
    e.preventDefault();
  }, [disabled, variant, values, value, min, max, step, handleDualChange, handleSingleChange]);
  
  // Initialize visuals on mount and when props change
  useEffect(() => {
    if (variant === 'dual') {
      updateVisuals(null, values);
    } else {
      updateVisuals(value);
    }
  }, [variant, value, values, updateVisuals]);
  
  // Add global event listeners for mouse/touch events
  useEffect(() => {
    if (!isDragging) return;
    
    const handleGlobalPointerMove = (e) => handlePointerMove(e);
    const handleGlobalPointerUp = () => handlePointerUp();
    
    // Mouse events
    document.addEventListener('mousemove', handleGlobalPointerMove);
    document.addEventListener('mouseup', handleGlobalPointerUp);
    
    // Touch events
    document.addEventListener('touchmove', handleGlobalPointerMove, { passive: false });
    document.addEventListener('touchend', handleGlobalPointerUp);
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalPointerMove);
      document.removeEventListener('mouseup', handleGlobalPointerUp);
      document.removeEventListener('touchmove', handleGlobalPointerMove);
      document.removeEventListener('touchend', handleGlobalPointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);
  
  const sliderClasses = [
    'slider',
    `slider--${variant}`,
    `slider--${dir}`,
    theme,
    disabled ? 'slider--disabled' : '',
    isDragging ? 'slider--dragging' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={sliderClasses} ref={containerRef} style={getDynamicColorStyle()} {...props}>
      <div className="slider__container">
        <div 
          className="slider__track" 
          ref={trackRef}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
        >
          <div className="slider__fill" ref={fillRef} />
          
          {variant === 'default' ? (
            <div 
              className="slider__thumb" 
              ref={thumbRef}
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          ) : (
            <>
              <div 
                className={`slider__thumb slider__thumb--first ${activeThumb === 0 ? 'slider__thumb--active' : ''}`}
                ref={thumbRef}
                tabIndex={disabled ? -1 : 0}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={values[0]}
                onKeyDown={(e) => handleKeyDown(e, 0)}
              />
              <div 
                className={`slider__thumb slider__thumb--second ${activeThumb === 1 ? 'slider__thumb--active' : ''}`}
                ref={thumb2Ref}
                tabIndex={disabled ? -1 : 0}
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={values[1]}
                onKeyDown={(e) => handleKeyDown(e, 1)}
              />
            </>
          )}
        </div>
        
        {showOutput && (
          <div className="slider__output">
            {variant === 'dual' ? (
              <div className="slider__output-dual">
                <span>{Math.round(values[0])}</span>
                <span>-</span>
                <span>{Math.round(values[1])}</span>
              </div>
            ) : (
              <span>{Math.round(value)}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;