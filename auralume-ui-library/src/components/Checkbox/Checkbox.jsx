import React from 'react';
import './Checkbox.css';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  disabled = false,
  label,
  id,
  name,
  value,
  className = '',
  color = '#6366F1', // Default indigo color
  matchTextColor = false,
  ...props 
}) => {
  const handleChange = (e) => {
    if (onChange && !disabled) {
      onChange(e);
    }
  };

  const getCheckboxClasses = () => {
    let classes = 'checkbox-wrapper checkbox-basic';
    if (disabled) classes += ' checkbox-disabled';
    if (className) classes += ` ${className}`;
    return classes;
  };

  // Function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 99, g: 102, b: 241 }; // Default to indigo if invalid
  };

  // Generate lighter variant (for hover/background effects)
  const getLighterVariant = (hex, opacity = 0.1) => {
    const rgb = hexToRgb(hex);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  };

  // Create inline styles for color customization
  const checkboxStyles = {
    '--checkbox-primary': color,
    '--checkbox-text': matchTextColor ? color : null,
    '--checkbox-primary-light': getLighterVariant(color, 0.1),
    '--checkbox-primary-hover': getLighterVariant(color, 0.05),
  };

  return (
    <div className={getCheckboxClasses()} style={checkboxStyles}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};

export default Checkbox;