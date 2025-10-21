import React, { useRef, useEffect } from 'react';
import './FluidButton.css';

const FluidButton = ({
  children = 'Fluid Button',
  onClick,
  disabled = false,
  className = '',
  hue = 170,
  hueAnimation = true,
  size = '1.5em',
  padding = '2em',
  animationDuration = 20,
  enableIntro = true,
  ...props
}) => {
  const buttonRef = useRef(null);
  const introIntervalRef = useRef(null);

  const moveBg = (e) => {
    if (disabled) return;
    
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.x) / rect.width) * 100;
    const y = ((e.clientY - rect.y) / rect.height) * 100;
    
    e.target.style.setProperty('--x', x);
    e.target.style.setProperty('--y', y);
  };

  const intro = () => {
    if (!enableIntro || !buttonRef.current) return;
    
    let i = 4;
    const button = buttonRef.current;
    button.style.setProperty('--a', '100%');
    
    introIntervalRef.current = setInterval(() => {
      const x = ((Math.cos(i) + 2) / 3.6) * 100;
      const y = ((Math.sin(i) + 2) / 3.6) * 100;
      
      button.style.setProperty('--x', x);
      button.style.setProperty('--y', y);
      
      i += 0.03;
      
      if (i > 11.5) {
        clearInterval(introIntervalRef.current);
        button.style.setProperty('--a', '');
      }
    }, 16);
  };

  const handlePointerOver = (e) => {
    if (disabled) return;
    
    if (introIntervalRef.current) {
      clearInterval(introIntervalRef.current);
    }
    e.target.style.setProperty('--a', '');
  };

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  useEffect(() => {
    intro();
    
    return () => {
      if (introIntervalRef.current) {
        clearInterval(introIntervalRef.current);
      }
    };
  }, [enableIntro]);

  const buttonStyle = {
    '--hue': `${hue}deg`,
    '--initial-hue': `${hue}deg`,
    '--size': size,
    '--padding': padding,
    '--animation-duration': `${animationDuration}s`,
    fontSize: size,
  };

  // Build className with hueAnimation control
  const buttonClassName = `fluid-button ${!hueAnimation ? 'no-hue-animation' : ''} ${className}`.trim();

  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="5" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="-5 11" />
          </feComponentTransfer>
        </filter>
      </svg>
      
      <button
        ref={buttonRef}
        type="button"
        className={buttonClassName}
        style={buttonStyle}
        onClick={handleClick}
        onPointerMove={moveBg}
        onPointerOver={handlePointerOver}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export default FluidButton;