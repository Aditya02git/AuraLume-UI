import React, { useEffect, useRef } from 'react';
import './EndlessReview.css';

const EndlessReview = ({ 
  theme = 'endlessreview-light',
  title = '',
  subtitle = '',
  reviews = [],
  animationDuration = 60,
  height = '40rem',
  color = '#60a5fa'
}) => {
  const themeClass = theme === 'endlessreview-dark' ? 'endlessreview-dark' : 'endlessreview-light';
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

  // Function to create gradient colors
  const createGradientColors = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return { color1: '#60a5fa', color2: '#a855f7' };

    // Create a complementary color by shifting hue
    const r2 = Math.min(255, rgb.r + 80);
    const g2 = Math.max(0, rgb.g - 40);
    const b2 = Math.min(255, rgb.b + 80);

    const color1 = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const color2 = `rgb(${r2}, ${g2}, ${b2})`;

    return { color1, color2 };
  };

  // Function to adjust color brightness
  const adjustColor = (hex, percent) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const adjust = (value) => {
      if (percent > 0) {
        // Lighten
        const adjusted = value + (255 - value) * (percent / 100);
        return Math.min(255, Math.max(0, Math.round(adjusted)));
      } else {
        // Darken
        const darkened = value * (1 + percent / 100);
        return Math.min(255, Math.max(0, Math.round(darkened)));
      }
    };
    
    const r = adjust(rgb.r);
    const g = adjust(rgb.g);
    const b = adjust(rgb.b);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Generate color variants
  useEffect(() => {
    if (!containerRef.current) return;
    
    const rgb = hexToRgb(color);
    const { color1, color2 } = createGradientColors(color);

    // Set CSS custom properties on the container
    containerRef.current.style.setProperty('--gradient-color-1', color1);
    containerRef.current.style.setProperty('--gradient-color-2', color2);
    
    // Card border and accent colors
    containerRef.current.style.setProperty('--card-border-color', adjustColor(color, theme === 'endlessreview-dark' ? -40 : 20));
    containerRef.current.style.setProperty('--card-hover-border', color);
    
    // Shadow colors
    containerRef.current.style.setProperty('--card-shadow-color', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.15)`);
    containerRef.current.style.setProperty('--card-shadow-color-hover', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.3)`);
    
    // Name accent color
    containerRef.current.style.setProperty('--name-accent-color', adjustColor(color, theme === 'endlessreview-dark' ? 30 : -10));
  }, [color, theme]);

  // Split reviews into three columns
  const column1Reviews = reviews.slice(0, Math.ceil(reviews.length / 3));
  const column2Reviews = reviews.slice(Math.ceil(reviews.length / 3), Math.ceil(2 * reviews.length / 3));
  const column3Reviews = reviews.slice(Math.ceil(2 * reviews.length / 3));

  const renderReviewCard = (review, index) => (
    <div key={index} className="endlessreview-card">
      <div className="endlessreview-card-header">
        <span className="endlessreview-avatar">{review.avatar}</span>
        <div>
          <p className="endlessreview-name">{review.name}</p>
          <p className="endlessreview-role">{review.role}</p>
        </div>
      </div>
      <div className="endlessreview-stars">{review.rating}</div>
      <p className="endlessreview-text">"{review.text}"</p>
    </div>
  );

  const renderColumn = (columnReviews, animationClass, maskClass) => (
    <div className={`endlessreview-column ${maskClass}`} style={{ height }}>
      <div 
        className={`endlessreview-scroll ${animationClass}`}
        style={{ animationDuration: `${animationDuration}s` }}
      >
        <div className="endlessreview-scroll-content">
          {columnReviews.map((review, index) => renderReviewCard(review, index))}
        </div>
        <div className="endlessreview-scroll-content">
          {columnReviews.map((review, index) => renderReviewCard(review, `duplicate-${index}`))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`endlessreview-container ${themeClass}`} ref={containerRef}>
      <div className="endlessreview-wrapper">
        <div className="endlessreview-header">
          <h1 className="endlessreview-title">{title}</h1>
          <p className="endlessreview-subtitle">{subtitle}</p>
        </div>

        <div className="endlessreview-grid">
          {/* Column 1 - Top to Bottom */}
          {renderColumn(column1Reviews, 'endlessreview-scroll-t2b', 'endlessreview-mask-tb')}
          
          {/* Column 2 - Bottom to Top */}
          <div className="endlessreview-column-md">
            {renderColumn(column2Reviews, 'endlessreview-scroll-b2t', 'endlessreview-mask-bt')}
          </div>
          
          {/* Column 3 - Top to Bottom */}
          <div className="endlessreview-column-lg">
            {renderColumn(column3Reviews, 'endlessreview-scroll-t2b', 'endlessreview-mask-tb')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndlessReview;