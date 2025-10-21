import React from 'react';
import './LumeButton.css';

const LumeButton = ({ 
  children = 'Button', 
  onClick, 
  className = '',
  speed = 0.8,
  radius = 8,
  size = 2.5,
  color = '#F0ABFC',
  backgroundColor = '#1F2124',
  ...props 
}) => {
  return (
    <button 
      className={`lume-button ${className}`}
      onClick={onClick}
      style={{
        '--speed': speed,
        '--radius': `${radius}px`,
        '--size': `${size}px`,
        '--color': color,
        '--btn-background': backgroundColor
      }}
      {...props}
    >
      <span className="lume-glow-container">	
        <span className="lume-glow"></span>
      </span>
      
      <span className="lume-text">{children}</span>
    </button>
  );
};

export default LumeButton;