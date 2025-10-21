import React, { useState } from 'react';
import './RadioGroup.css';

const RadioGroup = ({
  options = [],
  name,
  value,
  onChange,
  variant = 'basic',
  theme = 'light',
  color = "#e33de0", // New color prop
  className = '',
  disabled = false,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = useState(value || '');

  const handleChange = (optionValue) => {
    if (disabled) return;
    setSelectedValue(optionValue);
    if (onChange) {
      onChange(optionValue);
    }
  };

  // Generate custom style object when color prop is provided
  const customStyle = color ? {
    '--radio-primary': color,
    '--radio-primary-light': `${color}20`, // Add transparency
  } : {};

  const renderOption = (option, index) => {
    const isChecked = selectedValue === option.value;
    const optionId = `${name}-${option.value}-${index}`;

    switch (variant) {
      case 'basic':
        return (
          <div key={option.value} className="radio-option">
            <input
              type="radio"
              id={optionId}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              disabled={disabled}
            />
            <label htmlFor={optionId}>{option.label}</label>
          </div>
        );

      case 'inline':
        return (
          <div key={option.value} className="radio-option">
            <input
              type="radio"
              id={optionId}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              disabled={disabled}
            />
            <label htmlFor={optionId}>{option.label}</label>
          </div>
        );

      case 'modern-circle':
        return (
          <div key={option.value} className="radio-option">
            <input
              type="radio"
              id={optionId}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              disabled={disabled}
            />
            <label htmlFor={optionId}>{option.label}</label>
          </div>
        );

      case 'toggle':
        return (
          <React.Fragment key={option.value}>
            <input
              type="radio"
              id={optionId}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              disabled={disabled}
            />
            <label htmlFor={optionId}>{option.label}</label>
          </React.Fragment>
        );

      case 'card':
        return (
          <div key={option.value} className="card-radio">
            <input
              type="radio"
              id={optionId}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              disabled={disabled}
            />
            <label htmlFor={optionId}>
              {option.title && <div className="card-title">{option.title}</div>}
              {option.price && <div className="price">{option.price}</div>}
              {option.description && <div className="description">{option.description}</div>}
            </label>
          </div>
        );

      case 'emoji-rating':
        return (
          <div key={option.value} className="radio-option">
            <input
              type="radio"
              id={optionId}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              disabled={disabled}
            />
            <label htmlFor={optionId}>{option.emoji || option.label}</label>
          </div>
        );

      case 'color':
        return (
          <div key={option.value} className="image-radio">
            <input
              type="radio"
              id={optionId}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              disabled={disabled}
            />
            <label htmlFor={optionId}>
              <div 
                className="color-box" 
                style={{ backgroundColor: option.color || option.value }}
              ></div>
            </label>
          </div>
        );

      case 'vertical-list':
        return (
          <div key={option.value} className="vertical-list-item">
            <input
              type="radio"
              id={optionId}
              name={name}
              value={option.value}
              checked={isChecked}
              onChange={() => handleChange(option.value)}
              disabled={disabled}
            />
            <label htmlFor={optionId}>{option.label}</label>
          </div>
        );

      default:
        return null;
    }
  };

  const getContainerClass = () => {
    const baseClass = 'radio-group';
    const variantClass = `radio-group-${variant}`;
    const themeClass = `radio-group-${theme}`;
    
    switch (variant) {
      case 'basic':
        return `${baseClass} ${variantClass} ${themeClass} basic-container`;
      case 'inline':
        return `${baseClass} ${variantClass} ${themeClass} inline-container`;
      case 'modern-circle':
        return `${baseClass} ${variantClass} ${themeClass} custom-radio-1`;
      case 'toggle':
        return `${baseClass} ${variantClass} ${themeClass} toggle-container`;
      case 'card':
        return `${baseClass} ${variantClass} ${themeClass} card-options`;
      case 'emoji-rating':
        return `${baseClass} ${variantClass} ${themeClass} rating-container`;
      case 'color':
        return `${baseClass} ${variantClass} ${themeClass} image-options`;
      case 'vertical-list':
        return `${baseClass} ${variantClass} ${themeClass} vertical-list`;
      default:
        return `${baseClass} ${variantClass} ${themeClass}`;
    }
  };

  return (
    <div 
      className={`${getContainerClass()} ${className} ${disabled ? 'disabled' : ''}`}
      style={customStyle}
      {...props}
    >
      {options.map((option, index) => renderOption(option, index))}
      {variant === 'toggle' && <div className="slide"></div>}
    </div>
  );
};

export default RadioGroup;