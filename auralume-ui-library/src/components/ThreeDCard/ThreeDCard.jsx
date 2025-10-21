import React, { useRef, useEffect } from 'react';
import './ThreeDCard.css';

const ThreeDCard = ({ 
  children, 
  className = '', 
  width = 300, 
  height = 400,
  backgroundImage,
  bgColor,
  style = {},
  ...props 
}) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const boundsRef = useRef(null);

  const rotateToMouse = (e) => {
    if (!cardRef.current || !glowRef.current || !boundsRef.current) return;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - boundsRef.current.x;
    const topY = mouseY - boundsRef.current.y;
    const center = {
      x: leftX - boundsRef.current.width / 2,
      y: topY - boundsRef.current.height / 2
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    cardRef.current.style.transform = `
      scale3d(1.07, 1.07, 1.07)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2}deg
      )
    `;

    glowRef.current.style.backgroundImage = `
      radial-gradient(
        circle at
        ${center.x * 2 + boundsRef.current.width / 2}px
        ${center.y * 2 + boundsRef.current.height / 2}px,
        #ffffff55,
        #0000000f
      )
    `;
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    boundsRef.current = cardRef.current.getBoundingClientRect();
    document.addEventListener('mousemove', rotateToMouse);
  };

  const handleMouseLeave = () => {
    document.removeEventListener('mousemove', rotateToMouse);
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
    if (glowRef.current) {
      glowRef.current.style.backgroundImage = '';
    }
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', rotateToMouse);
    };
  }, []);

  const cardStyle = {
    width: `${width}px`,
    height: `${height}px`,
    ...(backgroundImage 
      ? { backgroundImage: `url(${backgroundImage})` }
      : bgColor 
      ? { background: bgColor }
      : {}
    ),
    ...style
  };

  return (
    <div
      ref={cardRef}
      className={`threed-card ${className}`}
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      <div ref={glowRef} className="threed-card-glow" />
    </div>
  );
};

export default ThreeDCard;