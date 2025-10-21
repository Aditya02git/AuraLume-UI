import React from 'react';
import './FakeShader.css';

const FakeShader = ({ 
  variant = 'default', 
  children, 
  className = '',
  style = {},
  speedFactor = 4,
  ...props 
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'vivid':
        return 'background-shader--vivid';
      case 'metal':
        return 'background-shader--metal';
      case 'silk':
        return 'background-shader--silk';
      default:
        return '';
    }
  };

  const combinedStyle = {
    '--speed-factor': speedFactor,
    ...style
  };

  return (
    <div 
      className={`background-shader ${getVariantClass()} ${className}`}
      style={combinedStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default FakeShader;