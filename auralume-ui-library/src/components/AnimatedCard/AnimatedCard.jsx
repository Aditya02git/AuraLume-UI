import React, { useRef, useEffect, useState } from 'react';
import './AnimatedCard.css';

const AnimatedCard = ({ 
  children, 
  animationType = 'alphabetical', 
  className = '',
  style = {},
  onClick,
  href,
  size = 'medium', // small, medium, large, responsive
  ...props 
}) => {
  const cardRef = useRef(null);
  const lettersRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile/tablet on mount and resize
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Character sets for different animation types
  const getCharacterSet = (type) => {
    switch (type) {
      case 'alphabetical':
        return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      case 'ascii':
        return "01";
      case 'pixels':
        return "█▉▊▋▌▍▎▏▐░▒▓■□▪▫▬▭▮▯°∙·‥…⁘⁙⁚⁛⁜⁝⁞";
      default:
        return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    }
  };

  const randomCharacter = (chars) => chars[Math.floor(Math.random() * chars.length)];
  
  const randomString = (length, chars) => 
    Array.from({ length }, () => randomCharacter(chars)).join("");

  const updatePosition = (x, y) => {
    if (!lettersRef.current) return;
    
    lettersRef.current.style.setProperty("--x", `${x}px`);
    lettersRef.current.style.setProperty("--y", `${y}px`);
    
    const chars = getCharacterSet(animationType);
    // Reduce character count on mobile for better performance
    const charCount = isMobile ? 1000 : 2000;
    lettersRef.current.innerText = randomString(charCount, chars);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    updatePosition(x, y);
  };

  const handleTouchStart = (e) => {
    if (!cardRef.current || !e.touches[0]) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    
    updatePosition(x, y);
  };

  const handleTouchMove = (e) => {
    if (!cardRef.current || !e.touches[0]) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    
    updatePosition(x, y);
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  // Build className with size and responsive classes
  const cardClassName = [
    'animated-card-hover-container',
    animationType,
    size,
    className
  ].filter(Boolean).join(' ');

  const cardContent = (
    <div
      ref={cardRef}
      className={cardClassName}
      style={{
        ...style,
        touchAction: 'none' // Prevent default touch behaviors
      }}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      {...props}
    >
      <div className="animated-card-gradient"></div>
      <div className="animated-card-content">
        {children}
      </div>
      <div 
        ref={lettersRef}
        className="animated-card-bg-characters"
      ></div>
    </div>
  );

  if (href) {
    return (
      <div className="animated-card-wrapper">
        <a href={href} className="animated-card-link">
          {cardContent}
        </a>
      </div>
    );
  }

  return (
    <div className="animated-card-wrapper">
      {cardContent}
    </div>
  );
};

export default AnimatedCard;