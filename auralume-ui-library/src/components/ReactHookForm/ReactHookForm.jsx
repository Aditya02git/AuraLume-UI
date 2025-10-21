import React, { useState, useMemo } from 'react';
import './ReactHookForm.css';

const ReactHookForm = ({
  fields = [],
  onSubmit,
  title = "Form",
  submitButtonText = "Submit",
  resetButtonText = "Reset",
  showResetButton = true,
  theme="",
  className = "",
  formClassName = "",
  headerClassName = "",
  tableClassName = "",
  data = [],
  showDataTable = false,
  tableTitle = "Data",
  customValidation = {},
  color = '#3b82f6',
  ...props
}) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(data);

  // Generate color variants
  const colorVariants = useMemo(() => {
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 59, g: 130, b: 246 };
    };

    const rgbToHex = (r, g, b) => {
      return '#' + [r, g, b].map(x => {
        const hex = Math.round(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
    };

    const adjustBrightness = (rgb, factor) => ({
      r: Math.max(0, Math.min(255, rgb.r * factor)),
      g: Math.max(0, Math.min(255, rgb.g * factor)),
      b: Math.max(0, Math.min(255, rgb.b * factor))
    });

    const rgb = hexToRgb(color);
    const darker = adjustBrightness(rgb, 0.8);
    
    return {
      base: color,
      hover: rgbToHex(darker.r, darker.g, darker.b),
      light: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`,
      rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`
    };
  }, [color]);

  // Validation rules
  const validateField = (name, value, field) => {
    const rules = customValidation[name] || field.validation || {};
    
    if (rules.required && (!value || value.trim() === '')) {
      return `${field.label || name} is required`;
    }
    
    if (rules.minLength && value && value.length < rules.minLength) {
      return `${field.label || name} must be at least ${rules.minLength} characters`;
    }
    
    if (rules.maxLength && value && value.length > rules.maxLength) {
      return `${field.label || name} must be no more than ${rules.maxLength} characters`;
    }
    
    if (rules.pattern && value && !rules.pattern.test(value)) {
      return rules.message || `${field.label || name} format is invalid`;
    }
    
    if (field.type === 'email' && value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        return 'Please enter a valid email address';
      }
    }
    
    return null;
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    let hasErrors = false;
    
    fields.forEach(field => {
      const error = validateField(field.name, formData[field.name], field);
      if (error) {
        newErrors[field.name] = error;
        hasErrors = true;
      }
    });
    
    setErrors(newErrors);
    
    if (!hasErrors) {
      const newEntry = {
        ...formData,
        id: submittedData.length + 1
      };
      
      if (showDataTable) {
        setSubmittedData(prev => [...prev, newEntry]);
      }
      
      if (onSubmit) {
        onSubmit(newEntry);
      }
      
      setFormData({});
    }
  };

  const handleReset = () => {
    setFormData({});
    setErrors({});
  };

  const renderField = (field) => {
    const {
      name,
      type = 'text',
      label,
      placeholder,
      options = [],
      className: fieldClassName = '',
      ...fieldProps
    } = field;

    const inputClassName = `rhf-input ${errors[name] ? 'rhf-input-error' : ''} ${fieldClassName}`;

    switch (type) {
      case 'select':
        return (
          <select
            className={inputClassName}
            value={formData[name] || ''}
            onChange={(e) => handleInputChange(name, e.target.value)}
            {...fieldProps}
          >
            <option value="">{placeholder || `Select ${label || name}`}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
        );
      
      case 'textarea':
        return (
          <textarea
            className={inputClassName}
            value={formData[name] || ''}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            rows={4}
            {...fieldProps}
          />
        );
      
      case 'checkbox':
        return (
          <label className="rhf-checkbox-label">
            <input
              type="checkbox"
              className="rhf-checkbox"
              checked={formData[name] || false}
              onChange={(e) => handleInputChange(name, e.target.checked)}
              {...fieldProps}
            />
            <span className="rhf-checkbox-text">{label || name}</span>
          </label>
        );
      
      case 'radio':
        return (
          <div className="rhf-radio-group">
            {options.map((option, index) => (
              <label key={index} className="rhf-radio-label">
                <input
                  type="radio"
                  className="rhf-radio"
                  name={name}
                  value={option.value || option}
                  checked={formData[name] === (option.value || option)}
                  onChange={(e) => handleInputChange(name, e.target.value)}
                  {...fieldProps}
                />
                <span className="rhf-radio-text">{option.label || option}</span>
              </label>
            ))}
          </div>
        );
      
      default:
        return (
          <input
            type={type}
            className={inputClassName}
            value={formData[name] || ''}
            onChange={(e) => handleInputChange(name, e.target.value)}
            placeholder={placeholder}
            {...fieldProps}
          />
        );
    }
  };

  return (
    <div 
      className={`rhf-container ${theme}`} 
      style={{
        '--rhf-color-base': colorVariants.base,
        '--rhf-color-hover': colorVariants.hover,
        '--rhf-color-light': colorVariants.light,
        '--rhf-color-rgb': colorVariants.rgb
      }}
      {...props}
    >
      {title && (
        <header className={`rhf-header ${headerClassName}`}>
          <h2 className="rhf-title">{title}</h2>
        </header>
      )}
      
      <form onSubmit={handleSubmit} className={`rhf-form ${formClassName}`}>
        {fields.map((field) => (
          <div key={field.name} className="rhf-form-group">
            {field.type !== 'checkbox' && (
              <label htmlFor={field.name} className="rhf-label">
                {field.label || field.name}
                {field.validation?.required && <span className="rhf-required">*</span>}
              </label>
            )}
            
            {renderField(field)}
            
            {errors[field.name] && (
              <div className="rhf-error-message">
                <svg viewBox="0 0 20 20" fill="currentColor" className="rhf-error-icon">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
                <span>{errors[field.name]}</span>
              </div>
            )}
          </div>
        ))}
        
        <div className="rhf-form-actions">
          {showResetButton && (
            <button
              type="button"
              onClick={handleReset}
              className="rhf-button rhf-button-secondary"
            >
              {resetButtonText}
            </button>
          )}
          <button type="submit" className="rhf-button rhf-button-primary">
            {submitButtonText}
          </button>
        </div>
      </form>
      
      {showDataTable && (
        <div className={`rhf-data-table-container ${tableClassName}`}>
          <h3 className="rhf-data-title">
            {tableTitle} ({submittedData.length})
          </h3>
          <table className="rhf-data-table">
            <thead>
              <tr>
                <th>ID</th>
                {fields
                  .filter(field => field.type !== 'checkbox' || formData[field.name])
                  .map(field => (
                    <th key={field.name}>{field.label || field.name}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {submittedData.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  {fields
                    .filter(field => field.type !== 'checkbox' || item[field.name])
                    .map(field => (
                      <td key={field.name}>
                        {typeof item[field.name] === 'boolean' 
                          ? item[field.name] ? 'Yes' : 'No'
                          : item[field.name] || '-'}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReactHookForm;