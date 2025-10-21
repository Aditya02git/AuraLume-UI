// ShaderText.jsx
import React, { useState } from 'react';
import './GlitchText.css';

const GlitchText = ({ 
  children, 
  className = '', 
  playAnimation = false,
  hoverAnimation = false,
  clickAnimation = false,
  fontSize = '54px',
  fontWeight = '600',
  color = '#fff',
  ...props 
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e) => {
    if (clickAnimation) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 500);
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const getAnimationClass = () => {
    if (playAnimation) return 'rgb-glitch-btn--play';
    if (isClicked) return 'rgb-glitch-btn--clicked';
    if (hoverAnimation) return 'rgb-glitch-btn--hover';
    return '';
  };

  return (
    <button 
      className={`rgb-glitch-btn ${getAnimationClass()} ${className}`}
      data-text={children}
      style={{ fontSize, fontWeight, color }}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default GlitchText;