import React, { useRef, useEffect } from 'react';
import './Roadmap.css';

const Roadmap = ({ 
  variant = 'left', 
  items = [], 
  title,
  subtitle,
  className = '',
  showImages = true,
  customLineColor,
  customAccentColor,
  theme = 'roadmap-light',
  color = '#e33de0' // Primary color for theming
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
    containerRef.current.style.setProperty('--roadmap-accent-color', color);
    containerRef.current.style.setProperty('--roadmap-accent-light', adjustColor(color, 85));
    containerRef.current.style.setProperty('--roadmap-accent-dark', adjustColor(color, -15));
    containerRef.current.style.setProperty('--roadmap-text-on-accent', textColor);
    
    // For line color - use a lighter version
    const lineColor = adjustColor(color, 70);
    containerRef.current.style.setProperty('--roadmap-line-color', lineColor);
    
    // For zigzag variant - create semi-transparent versions
    containerRef.current.style.setProperty('--roadmap-bar-color', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.5)`);
  }, [color]);

  const renderLeftVariant = () => (
    <div className={`roadmap-container roadmap-left ${theme} ${className}`}>
      {title && (
        <div className="roadmap-header">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      <div className="roadmap-timeline">
        <div className="roadmap-timeline-line"></div>
        {items.map((item, index) => (
          <div key={index} className="roadmap-timeline-item">
            <div className="roadmap-timeline-number">{item.step || index + 1}</div>
            <div className="roadmap-timeline-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {item.date && <span className="roadmap-date">{item.date}</span>}
            </div>
            {showImages && item.icon && (
              <div className="roadmap-timeline-image">
                {typeof item.icon === 'string' ? (
                  <span className="roadmap-emoji">{item.icon}</span>
                ) : (
                  item.icon
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAlternativeVariant = () => (
    <div className={`roadmap-container roadmap-alternative ${theme} ${className}`}>
      {title && (
        <div className="roadmap-header">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      <div className="roadmap-timeline roadmap-timeline-alternative">
        <div className="roadmap-timeline-line-alt"></div>
        {items.map((item, index) => (
          <div 
            key={index} 
            className={`roadmap-timeline-item-alt ${index % 2 === 0 ? 'roadmap-left-item' : 'roadmap-right-item'}`}
          >
            <div className="roadmap-timeline-content-alt">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {item.date && <span className="roadmap-date">{item.date}</span>}
            </div>
            <div className="roadmap-timeline-marker">
              <div className="roadmap-timeline-dot">
                {item.step || index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderZigzagVariant = () => {
    const columns = 3;
    const rows = Math.ceil(items.length / columns);
    const itemsInRows = [];
    
    for (let i = 0; i < rows; i++) {
      itemsInRows.push(items.slice(i * columns, (i + 1) * columns));
    }

    return (
      <div className={`roadmap-container roadmap-zigzag ${theme} ${className}`}>
        {title && (
          <div className="roadmap-header">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        )}
        <div className="roadmap-map-wrapper">
          {itemsInRows.map((row, rowIndex) => (
            <div key={rowIndex} className="roadmap-row">
              {Array.from({ length: columns }).map((_, colIndex) => {
                const item = row[colIndex];
                return (
                  <div 
                    key={colIndex} 
                    className={`roadmap-item-bar ${!item ? 'roadmap-empty' : ''}`}
                  >
                    {item && (
                      <>
                        <div className="roadmap-item-info">
                          {item.icon && (
                            <span className="roadmap-item-emoji">
                              {typeof item.icon === 'string' ? item.icon : ''}
                            </span>
                          )}
                          {item.title}
                        </div>
                        <div className="roadmap-item-date">{item.date}</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVariant = () => {
    switch (variant) {
      case 'alternative':
        return renderAlternativeVariant();
      case 'zigzag':
        return renderZigzagVariant();
      case 'left':
      default:
        return renderLeftVariant();
    }
  };

  // Apply custom colors via CSS variables (legacy support)
  const customStyles = {};
  if (customLineColor) {
    customStyles['--roadmap-line-color'] = customLineColor;
  }
  if (customAccentColor) {
    customStyles['--roadmap-accent-color'] = customAccentColor;
  }

  return (
    <div style={customStyles} ref={containerRef}>
      {renderVariant()}
    </div>
  );
};

export default Roadmap;