import React from 'react';
import './Breadcrumb.css';

const Breadcrumb = ({ 
  items = [], 
  theme = 'breadcrumb-light', 
  separator = 'fa-caret-right',
  color = null,
  onItemClick,
  className = '',
  ...props 
}) => {
  const handleItemClick = (item, index, event) => {
    if (onItemClick) {
      onItemClick(item, index, event);
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  // Generate custom style object when color prop is provided
  const customStyle = color ? {
    '--main-color': color,
    '--hover-color': color,
  } : {};

  return (
    <div 
      className={`breadcrumb-wrapper ${theme} ${className}`} 
      style={customStyle}
      {...props}
    >
      <nav className="breadcrumb-nav">
        {items.map((item, index) => (
          <div key={index} className="breadcrumb-wrap">
            {index > 0 && (
              <span className="sep">
                <i className={`fa ${separator}`}></i>
              </span>
            )}
            <span className="breadcrumb">
              {item.href ? (
                <a 
                  href={item.href} 
                  onClick={(e) => handleItemClick(item, index, e)}
                  title={item.label}
                >
                  {item.label}
                </a>
              ) : (
                <span 
                  onClick={(e) => handleItemClick(item, index, e)}
                  title={item.label}
                  style={{ cursor: item.onClick || onItemClick ? 'pointer' : 'default' }}
                >
                  {item.label}
                </span>
              )}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;