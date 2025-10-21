import React, { useEffect, useRef } from 'react';
import './GradientText.css';

const GradientText = ({
  children,
  colors = ['rgb(123, 31, 162)', 'rgb(103, 58, 183)', 'rgb(244, 143, 177)'],
  animationSpeed = 3000,
  className = '',
  style = {},
  ...props
}) => {
  const magicRef = useRef(null);

  useEffect(() => {
    if (!magicRef.current) return;

    // Set CSS custom properties for colors
    const gradientColors = colors.length >= 3 ? colors : [...colors, ...colors].slice(0, 3);
    magicRef.current.style.setProperty('--gradient-color-1', gradientColors[0]);
    magicRef.current.style.setProperty('--gradient-color-2', gradientColors[1]);
    magicRef.current.style.setProperty('--gradient-color-3', gradientColors[2]);
    magicRef.current.style.setProperty('--animation-speed', `${animationSpeed}ms`);
  }, [colors, animationSpeed]);

  return (
    <span 
      ref={magicRef}
      className={`magic ${className}`}
      style={style}
      {...props}
    >
      <span className="magic-text">
        {children}
      </span>
    </span>
  );
};

export default GradientText;