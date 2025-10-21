import React from 'react';
import './Input.css';

const Input = ({
  label,
  id,
  name,
  type = 'text',
  placeholder,
  hint,
  required = false,
  maxLength,
  pattern,
  value,
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  size = 'medium', // 'small', 'medium', 'large', 'full'
  focusColor, // Custom focus outline color
  className = '',
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  const sizeClasses = {
    small: 'input-small',
    medium: 'input-medium', 
    large: 'input-large',
    full: 'input-full'
  };
  
  // Inline style for custom focus color
  const customStyle = focusColor ? {
    '--custom-focus-color': focusColor
  } : {};
  
  return (
    <div 
      className={`labeled-input ${sizeClasses[size]} ${focusColor ? 'has-custom-focus' : ''} ${className}`}
      style={customStyle}
    >
      {label && (
        <label htmlFor={inputId}>
          {label}
        </label>
      )}
      
      <input
        type={type}
        name={name}
        id={inputId}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        pattern={pattern}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        {...props}
      />
      
      <div className="hint-and-status">
        {hint && <span className="input-hint">{hint}</span>}
        <span className="input-status"></span>
      </div>
    </div>
  );
};

export default Input;