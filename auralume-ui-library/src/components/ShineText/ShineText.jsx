import React from 'react';
import './ShineText.css';

const ShineText = ({
  children,
  theme = 'shinetext-dark',
  size = 'medium',
  duration = 3,
  delay = 0,
  href,
  onClick,
  className = '',
  style = {},
  disabled = false,
  ...props
}) => {
  const baseClass = 'shine-text';
  const classes = [
    baseClass,
    theme,
    `${baseClass}--${size}`,
    disabled && `${baseClass}--disabled`,
    className
  ].filter(Boolean).join(' ');

  const animationStyle = {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    ...style
  };

  const commonProps = {
    className: classes,
    style: animationStyle,
    ...props
  };

  if (href && !disabled) {
    return (
      <a href={href} onClick={onClick} {...commonProps}>
        {children}
      </a>
    );
  }

  if (onClick && !disabled) {
    return (
      <button type="button" onClick={onClick} {...commonProps}>
        {children}
      </button>
    );
  }

  return (
    <span {...commonProps}>
      {children}
    </span>
  );
};

export default ShineText;