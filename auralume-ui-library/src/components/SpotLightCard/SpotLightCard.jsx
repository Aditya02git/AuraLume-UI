import React, { useRef, useEffect } from 'react';
import './SpotLightCard.css';

const SpotLightCard = ({ children, color = "#00fff1", className = "" }) => {
  const cardsRef = useRef(null);

  // Function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Spotlight is always white
  const getSpotlightColor = (opacity = 0.4) => {
    return `rgba(255, 255, 255, ${opacity})`;
  };

  // Function to create dark variant (decrease brightness)
  const getDarkVariant = (hex, opacity = 0.1) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const darken = (value) => Math.floor(value * 0.5);
    return `rgba(${darken(rgb.r)}, ${darken(rgb.g)}, ${darken(rgb.b)}, ${opacity})`;
  };

  useEffect(() => {
    const wrapper = cardsRef.current;
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll('.spotlight-card');
    const spotlightColor = getSpotlightColor(0.4);
    const borderColor = getDarkVariant(color, 0.2);

    // Set CSS custom properties for colors
    cards.forEach((card) => {
      card.style.setProperty('--spotlight-color', spotlightColor);
      card.style.setProperty('--border-color', borderColor);
      card.style.setProperty('--bg-color', color);
    });

    const handleMouseMove = (event) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty('--xPos', `${x}px`);
        card.style.setProperty('--yPos', `${y}px`);
      });
    };

    wrapper.addEventListener('mousemove', handleMouseMove);

    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove);
    };
  }, [color]);

  return (
    <div className={`spotlight-cards ${className}`} ref={cardsRef}>
      {React.Children.map(children, (child) => (
        <div className="spotlight-card">
          <div className="spotlight-card-content">{child}</div>
        </div>
      ))}
    </div>
  );
};

export default SpotLightCard;