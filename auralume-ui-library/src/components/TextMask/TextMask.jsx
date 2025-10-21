// TextMask.jsx
import React from 'react';
import './TextMask.css';

const TextMask = ({ 
  text = 'Hello World', 
  backgroundImage = '',
  backgroundType = 'image', // 'image' or 'gradient'
  gradient = 'linear-gradient(to right, #ff6b6b, #4ecdc4)',
  fontSize = '7rem',
  fontWeight = '700',
  fallbackColor = '#68d0e0',
  className = '',
  style = {}
}) => {
  const backgroundStyle = backgroundType === 'gradient' 
    ? { backgroundImage: gradient }
    : { backgroundImage: `url(${backgroundImage})` };

  return (
    <div 
      className={`text-mask ${className}`}
      style={{
        fontSize,
        fontWeight,
        color: fallbackColor,
        ...backgroundStyle,
        ...style
      }}
    >
      {text}
    </div>
  );
};

export default TextMask;