import React, { useEffect, useRef } from 'react';
import './InfiniteScroller.css';

const InfiniteScroller = ({ 
  items = [], 
  type = 'type-1',
  slideWidth = 'clamp(150px, 20vw, 300px)',
  animationDuration = '8s',
  backgroundColor = '#120020',
  color = null,
  className = '',
  onSlideClick = null,
  rows = 5,
  tagPrefix = '#',
  direction = 'left',
  speed = 'medium'
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

  // Function to calculate luminance and determine contrast color
  const getContrastColor = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return '#ffffff';
    
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Function to adjust color brightness
  const adjustColor = (hex, percent) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const adjust = (value) => {
      if (percent > 0) {
        const adjusted = value + (255 - value) * (percent / 100);
        return Math.min(255, Math.max(0, Math.round(adjusted)));
      } else {
        const darkened = value * (1 + percent / 100);
        return Math.min(255, Math.max(0, Math.round(darkened)));
      }
    };
    
    const r = adjust(rgb.r);
    const g = adjust(rgb.g);
    const b = adjust(rgb.b);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Generate color scheme from single color prop
  useEffect(() => {
    if (color && containerRef.current) {
      const rgb = hexToRgb(color);
      const autoBackgroundColor = adjustColor(color, -70);
      const autoButtonColor = adjustColor(color, -20);
      const autoButtonHoverColor = adjustColor(color, -10);
      const autoTextColor = getContrastColor(autoButtonColor);
      const autoShadowColor = `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.4)`;
      
      containerRef.current.style.setProperty('--auto-bg-color', autoBackgroundColor);
      containerRef.current.style.setProperty('--auto-btn-color', autoButtonColor);
      containerRef.current.style.setProperty('--auto-btn-hover-color', autoButtonHoverColor);
      containerRef.current.style.setProperty('--auto-btn-text-color', autoTextColor);
      containerRef.current.style.setProperty('--auto-shadow-color', autoShadowColor);
    }
  }, [color]);

  // Determine which background color to use
  const finalBackgroundColor = color ? 'var(--auto-bg-color)' : backgroundColor;

  // Default items for type-1 (images)
  const defaultImageItems = [
    { id: 1, src: 'https://images.pexels.com/photos/2887718/pexels-photo-2887718.jpeg', alt: 'Image 1' },
    { id: 2, src: 'https://images.pexels.com/photos/12176130/pexels-photo-12176130.jpeg', alt: 'Image 2' },
    { id: 3, src: 'https://images.pexels.com/photos/17042334/pexels-photo-17042334.jpeg', alt: 'Image 3' },
    { id: 4, src: 'https://images.pexels.com/photos/2836486/pexels-photo-2836486.jpeg', alt: 'Image 4' },
    { id: 5, src: 'https://images.pexels.com/photos/19759593/pexels-photo-19759593.jpeg', alt: 'Image 5' },
    { id: 6, src: 'https://images.pexels.com/photos/12774432/pexels-photo-12774432.jpeg', alt: 'Image 6' }
  ];

  // Default items for type-2 (tags)
  const defaultTagRows = [
    [
      { id: 1, text: 'JavaScript' },
      { id: 2, text: 'webdev' },
      { id: 3, text: 'TypeScript' },
      { id: 4, text: 'Next.js' },
      { id: 5, text: 'UI/UX' }
    ],
    [
      { id: 6, text: 'webdev' },
      { id: 7, text: 'Gatsby' },
      { id: 8, text: 'JavaScript' },
      { id: 9, text: 'Tailwind' },
      { id: 10, text: 'TypeScript' }
    ],
    [
      { id: 11, text: 'animation' },
      { id: 12, text: 'Tailwind' },
      { id: 13, text: 'React' },
      { id: 14, text: 'SVG' },
      { id: 15, text: 'HTML' }
    ],
    [
      { id: 16, text: 'Gatsby' },
      { id: 17, text: 'HTML' },
      { id: 18, text: 'CSS' },
      { id: 19, text: 'React' },
      { id: 20, text: 'Next.js' }
    ],
    [
      { id: 21, text: 'Next.js' },
      { id: 22, text: 'React' },
      { id: 23, text: 'webdev' },
      { id: 24, text: 'TypeScript' },
      { id: 25, text: 'Gatsby' }
    ]
  ];

  // Default items for type-3 (horizontal scroll)
  const defaultScrollItems = [
    { id: 1, text: 'Cheeky' },
    { id: 2, text: 'monkey' },
    { id: 3, text: 'swinging' },
    { id: 4, text: 'through' },
    { id: 5, text: 'trees' },
    { id: 6, text: 'with' },
    { id: 7, text: 'ease !' }
  ];

  const defaultScrollImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', alt: 'brown monkey' },
    { id: 2, src: 'https://images.unsplash.com/photo-1605559911160-a3d95d213904?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', alt: 'a little monkey' },
    { id: 3, src: 'https://images.unsplash.com/photo-1615038552039-e1b271f14ec8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', alt: 'monkey with big mouth opened' },
    { id: 4, src: 'https://images.unsplash.com/photo-1463852247062-1bbca38f7805?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', alt: 'a big monkey' },
    { id: 5, src: 'https://images.unsplash.com/photo-1618661057302-8b01d93bd898?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', alt: 'a running monkey' },
    { id: 6, src: 'https://images.unsplash.com/photo-1579786419323-980ee401051b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', alt: 'monkey hanging on a tree' },
    { id: 7, src: 'https://images.unsplash.com/photo-1570288685280-7802a8f8c4fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', alt: 'a little monkey with a long mustache' }
  ];

  const handleSlideClick = (item, index) => {
    if (onSlideClick) {
      onSlideClick(item, index);
    }
  };

  const handleTagClick = (tag, rowIndex, tagIndex) => {
    if (onSlideClick) {
      onSlideClick(tag, { rowIndex, tagIndex });
    }
  };

  const generateRandomDuration = (baseTime = 15000) => {
    return Math.floor(baseTime + Math.random() * 5000);
  };

  if (type === 'type-1') {
    const scrollerItems = items.length > 0 ? items : defaultImageItems;
    const duplicatedItems = [...scrollerItems, ...scrollerItems];

    const containerStyle = {
      '--slide-width': slideWidth,
      '--slide-gap': `calc(${slideWidth} * 0.06)`,
      '--slide-border-radius': `calc(${slideWidth} * 0.06)`,
      '--background-color': finalBackgroundColor,
      '--animation-duration': animationDuration
    };
    
    return (
      <div 
        ref={containerRef}
        className={`scroller-container ${className}`}
        style={containerStyle}
      >
        <div className="scroller-wrapper">
          {duplicatedItems.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="scroller-slide"
              onClick={() => handleSlideClick(item, index)}
            >
              <img 
                src={item.src} 
                alt={item.alt || `Slide ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'type-2') {
    const tagRows = items.length > 0 ? items : defaultTagRows;
    const limitedRows = tagRows.slice(0, rows);

    const containerStyle = {
      '--background-color': finalBackgroundColor,
      '--btn-color': color ? 'var(--auto-btn-color)' : undefined,
      '--btn-hover-color': color ? 'var(--auto-btn-hover-color)' : undefined,
      '--btn-text-color': color ? 'var(--auto-btn-text-color)' : undefined
    };

    return (
      <div 
        ref={containerRef}
        className={`tag-list ${className}`}
        style={containerStyle}
      >
        {limitedRows.map((row, rowIndex) => {
          const duplicatedRow = [...row, ...row];
          const direction = rowIndex % 2 === 0 ? 'normal' : 'reverse';
          const duration = generateRandomDuration();
          
          return (
            <div 
              key={rowIndex}
              className="loop-slider"
              style={{
                '--duration': `${duration}ms`,
                '--direction': direction
              }}
            >
              <div className="inner">
                {duplicatedRow.map((tag, tagIndex) => (
                  <div 
                    key={`${tag.id}-${tagIndex}`}
                    className="tag"
                    onClick={() => handleTagClick(tag, rowIndex, tagIndex)}
                  >
                    <span>{tagPrefix}</span> {tag.text}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        <div className="fade"></div>
      </div>
    );
  }

  if (type === 'type-3') {
    const scrollerItems = items.length > 0 ? items : (items.some(item => item.src) ? defaultScrollImages : defaultScrollItems);
    const duplicatedItems = [...scrollerItems, ...scrollerItems];

    const getAnimationDuration = () => {
      switch (speed) {
        case 'slow': return '20s';
        case 'fast': return '10s';
        case 'medium':
        default: return '15s';
      }
    };

    const containerStyle = {
      '--background-color': finalBackgroundColor,
      '--animation-duration': getAnimationDuration(),
      '--animation-direction': direction === 'left' ? 'forwards' : 'reverse',
      '--btn-color': color ? 'var(--auto-btn-color)' : undefined,
      '--btn-text-color': color ? 'var(--auto-btn-text-color)' : undefined,
      '--shadow-color': color ? 'var(--auto-shadow-color)' : undefined
    };

    return (
      <div 
        ref={containerRef}
        className={`horizontal-scroller ${className}`}
        style={containerStyle}
      >
        <div className="horizontal-scroller__inner">
          {duplicatedItems.map((item, index) => {
            if (item.src) {
              return (
                <div 
                  key={`${item.id}-${index}`}
                  className="horizontal-scroller__item"
                  onClick={() => handleSlideClick(item, index)}
                >
                  <img 
                    src={item.src} 
                    alt={item.alt || `Image ${index + 1}`}
                    loading="lazy"
                  />
                </div>
              );
            } else {
              return (
                <div 
                  key={`${item.id}-${index}`}
                  className="horizontal-scroller__item horizontal-scroller__text"
                  onClick={() => handleSlideClick(item, index)}
                >
                  {item.text}
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }

  return null;
};

export default InfiniteScroller;