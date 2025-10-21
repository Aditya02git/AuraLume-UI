import React from 'react';
import './GradientBackground.css';

const GradientBackground = ({ 
  children, 
  colors = ['#ee7752', '#e73c7e', '#23a6d5', '#23d5ab'],
  angle = '-45deg',
  animationDuration = '15s',
  className = ''
}) => {
  const gradientStyle = {
    background: `linear-gradient(${angle}, ${colors.join(', ')})`,
    backgroundSize: '400% 400%',
    animation: `gradient ${animationDuration} ease infinite`
  };

  return (
    <div className={`gradient-background ${className}`} style={gradientStyle}>
      {children}
    </div>
  );
};

export default GradientBackground;