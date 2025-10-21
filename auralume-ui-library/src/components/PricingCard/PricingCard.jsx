import React, { useRef, useEffect } from 'react';
import './PricingCard.css';

const PricingCard = ({ 
  theme = 'pricingcard-light',
  title = 'Basic Plan',
  price = '$9/mo',
  features = [],
  className = '',
  isPopular = false,
  customClass = '',
  color = '#667eea', // Primary color for theming
  children
}) => {
  const containerRef = useRef(null);

  // Function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Function to calculate luminance and determine if color is light or dark
  const getContrastColor = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return '#ffffff';
    
    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    
    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Function to lighten/darken color
  const adjustColor = (hex, percent) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const adjust = (value) => {
      const adjusted = value + (255 - value) * (percent / 100);
      return Math.min(255, Math.max(0, Math.round(adjusted)));
    };
    
    if (percent > 0) {
      return `#${adjust(rgb.r).toString(16).padStart(2, '0')}${adjust(rgb.g).toString(16).padStart(2, '0')}${adjust(rgb.b).toString(16).padStart(2, '0')}`;
    } else {
      const darken = (value) => {
        const darkened = value * (1 + percent / 100);
        return Math.min(255, Math.max(0, Math.round(darkened)));
      };
      return `#${darken(rgb.r).toString(16).padStart(2, '0')}${darken(rgb.g).toString(16).padStart(2, '0')}${darken(rgb.b).toString(16).padStart(2, '0')}`;
    }
  };

  // Generate color variants
  useEffect(() => {
    if (!containerRef.current) return;
    
    const rgb = hexToRgb(color);
    const textColor = getContrastColor(color);
    
    // Set CSS custom properties on the container
    containerRef.current.style.setProperty('--pricing-primary', color);
    containerRef.current.style.setProperty('--pricing-primary-dark', adjustColor(color, -15));
    containerRef.current.style.setProperty('--pricing-primary-light', adjustColor(color, 95));
    containerRef.current.style.setProperty('--pricing-text-on-primary', textColor);
    
    // Create gradient colors
    const secondaryColor = adjustColor(color, -20);
    containerRef.current.style.setProperty('--pricing-gradient-start', color);
    containerRef.current.style.setProperty('--pricing-gradient-end', secondaryColor);
    
    // Shadow colors with opacity
    containerRef.current.style.setProperty('--pricing-shadow-color', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.2)`);
    containerRef.current.style.setProperty('--pricing-shadow-hover', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.4)`);
  }, [color]);

  const cardClasses = `pricingcard ${theme} ${customClass} ${isPopular ? 'pricingcard-popular' : ''}`.trim();

  return (
    <div className={cardClasses} ref={containerRef}>
      {isPopular && <div className="pricingcard-badge">Most Popular</div>}
      
      <div className="pricingcard-content">
        <div className="pricingcard-header">
          <h3 className="pricingcard-title">{title}</h3>
          <h1 className="pricingcard-price">{price}</h1>
        </div>
        
        {features && features.length > 0 && (
          <ul className="pricingcard-features">
            {features.map((feature, index) => (
              <li key={index} className="pricingcard-feature">
                {feature}
              </li>
            ))}
          </ul>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default PricingCard;