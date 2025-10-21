import React, { useState, useRef } from 'react';
import './Switch.css';

const Switch = ({
  variant = 'toggle', // 'toggle' or 'three-state'
  size = 'medium', // 'small', 'medium', 'large'
  color = '#e33de0', // Any valid CSS color
  checked = false,
  value = '', 
  onChange,
  disabled = false,
  label,
  className = '',
  options = [],
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [currentValue, setCurrentValue] = useState(value);
  const containerRef = useRef(null);

  // Generate dynamic color styles based on the color prop
  const getDynamicColorStyle = () => {
    const isActive = variant === 'toggle' ? isChecked : currentValue;
    
    return {
      '--switch-bgcolor': isActive ? color : '#cbd5e1',
      '--switch-slidercolor': '#ffffff',
      '--text-color': '#1e293b',
      '--active-textcolor': '#1e293b',
    };
  };

  const handleToggleChange = (e) => {
    if (disabled) return;
    
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    
    if (onChange) {
      onChange(newChecked, e);
    }
  };

  const handleThreeStateClick = (newValue, index) => {
    if (disabled) return;
    
    setCurrentValue(newValue);
    
    if (onChange) {
      onChange(newValue, { target: { value: newValue }, index });
    }
  };

  const switchClasses = [
    'switch',
    `switch--${variant}`,
    `switch--${size}`,
    disabled && 'switch--disabled',
    className
  ].filter(Boolean).join(' ');

  if (variant === 'three-state') {
    const stateValues = [options[0], options[1], options[2]];
    const currentIndex = stateValues.indexOf(currentValue);

    return (
      <div
        className={switchClasses}
        ref={containerRef}
        style={getDynamicColorStyle()}
      >
        {label && <span className="switch__label">{label}</span>}
        <div className="switch__container">
          <span 
            className="switch__pill"
            style={{
              transform: `translateX(${currentIndex * 100}%)`
            }}
          ></span>
          {options.map((option, index) => (
            <div
              key={index}
              className={`switch__option ${currentIndex === index ? 'switch__option--active' : ''}`}
              onClick={() => handleThreeStateClick(stateValues[index], index)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={switchClasses} style={getDynamicColorStyle()}>
      {label && <span className="switch__label">{label}</span>}
      <label className="switch__wrapper">
        <input
          type="checkbox"
          className="switch__input"
          checked={isChecked}
          onChange={handleToggleChange}
          disabled={disabled}
          {...props}
        />
        <span className="switch__slider"></span>
      </label>
    </div>
  );
};

export default Switch;