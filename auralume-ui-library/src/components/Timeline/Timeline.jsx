import React, { useState, useRef, useEffect } from 'react';
import './Timeline.css';

const Timeline = ({ 
  items = [], 
  showControls = true, 
  className = '',
  expandedByDefault = false,
  theme = 'timeline-light',
  color = '#e33de0' // Default blue color
}) => {
  const [expandedItems, setExpandedItems] = useState(() => {
    if (expandedByDefault) {
      return new Set(items.map((_, index) => index));
    }
    return new Set();
  });
  
  const [animations, setAnimations] = useState(new Map());
  const timelineRef = useRef(null);

  // Function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Function to convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
        default: h = 0;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  // Function to calculate luminance and determine if color is light or dark
  const getContrastColor = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return '#000000';
    
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Function to create color with opacity
  const colorWithOpacity = (hex, opacity) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return `rgba(0, 0, 0, ${opacity})`;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
  };

  // Set CSS custom properties based on color prop
  useEffect(() => {
    if (!timelineRef.current) return;
    
    const rgb = hexToRgb(color);
    if (!rgb) return;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const buttonTextColor = getContrastColor(color);
    const contentBgColor = colorWithOpacity(color, 0.1);
    
    // Set CSS custom properties on the timeline container
    timelineRef.current.style.setProperty('--timeline-hue', hsl.h.toString());
    timelineRef.current.style.setProperty('--timeline-primary', color);
    timelineRef.current.style.setProperty('--timeline-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    timelineRef.current.style.setProperty('--timeline-button-text', buttonTextColor);
    timelineRef.current.style.setProperty('--timeline-content-bg', contentBgColor);
  }, [color]);

  const animateItemAction = (itemIndex, contentHeight, shouldCollapse) => {
    const ctrld = timelineRef.current?.querySelector(`#item${itemIndex}-ctrld`);
    if (!ctrld) return;

    const expandedClass = "timeline__item-body--expanded";
    const animOptions = {
      duration: 300,
      easing: "cubic-bezier(0.65,0,0.35,1)"
    };

    const existingAnimation = animations.get(itemIndex);
    if (existingAnimation) {
      existingAnimation.cancel();
    }

    let animation;

    if (shouldCollapse) {
      ctrld.classList.remove(expandedClass);
      animOptions.duration *= 2;
      animation = ctrld.animate([
        { height: `${contentHeight}px` },
        { height: `${contentHeight}px` },
        { height: "0px" }
      ], animOptions);
    } else {
      ctrld.classList.add(expandedClass);
      animation = ctrld.animate([
        { height: "0px" },
        { height: `${contentHeight}px` }
      ], animOptions);
    }

    setAnimations(prev => new Map(prev).set(itemIndex, animation));

    animation.addEventListener('finish', () => {
      setAnimations(prev => {
        const newMap = new Map(prev);
        newMap.delete(itemIndex);
        return newMap;
      });
    });
  };

  const toggleItem = (itemIndex) => {
    const ctrld = timelineRef.current?.querySelector(`#item${itemIndex}-ctrld`);
    const contentHeight = ctrld?.firstElementChild?.offsetHeight;
    const wasExpanded = expandedItems.has(itemIndex);

    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (wasExpanded) {
        newSet.delete(itemIndex);
      } else {
        newSet.add(itemIndex);
      }
      return newSet;
    });

    if (contentHeight) {
      animateItemAction(itemIndex, contentHeight, wasExpanded);
    }
  };

  const expandAll = () => {
    const itemsToExpand = items
      .map((_, index) => index)
      .filter(index => !expandedItems.has(index));

    setExpandedItems(new Set(items.map((_, index) => index)));

    itemsToExpand.forEach(itemIndex => {
      const ctrld = timelineRef.current?.querySelector(`#item${itemIndex}-ctrld`);
      const contentHeight = ctrld?.firstElementChild?.offsetHeight;
      if (contentHeight) {
        animateItemAction(itemIndex, contentHeight, false);
      }
    });
  };

  const collapseAll = () => {
    const itemsToCollapse = Array.from(expandedItems);

    setExpandedItems(new Set());

    itemsToCollapse.forEach(itemIndex => {
      const ctrld = timelineRef.current?.querySelector(`#item${itemIndex}-ctrld`);
      const contentHeight = ctrld?.firstElementChild?.offsetHeight;
      if (contentHeight) {
        animateItemAction(itemIndex, contentHeight, true);
      }
    });
  };

  return (
    <div className={`timeline ${theme} ${className}`} ref={timelineRef}>
      <svg display="none">
        <symbol id="arrow">
          <polyline 
            points="7 10,12 15,17 10" 
            fill="none" 
            stroke="currentcolor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
          />
        </symbol>
      </svg>

      {showControls && (
        <div className="btn-group">
          <button className="btn" type="button" onClick={expandAll}>
            Expand All
          </button>
          <button className="btn" type="button" onClick={collapseAll}>
            Collapse All
          </button>
        </div>
      )}

      {items.map((item, index) => {
        const isExpanded = expandedItems.has(index);
        return (
          <div key={index} className="timeline__item">
            <div className="timeline__item-header">
              <button
                className="timeline__arrow"
                type="button"
                id={`item${index}`}
                aria-labelledby={`item${index}-name`}
                aria-expanded={isExpanded}
                aria-controls={`item${index}-ctrld`}
                aria-haspopup="true"
                onClick={() => toggleItem(index)}
              >
                <svg className="timeline__arrow-icon" viewBox="0 0 24 24" width="24px" height="24px">
                  <use href="#arrow" />
                </svg>
              </button>
              <span className="timeline__dot"></span>
              <span id={`item${index}-name`} className="timeline__meta">
                <time className="timeline__date" dateTime={item.date}>
                  {item.dateDisplay}
                </time>
                <br />
                <strong className="timeline__title">{item.title}</strong>
              </span>
            </div>
            <div
              className={`timeline__item-body ${isExpanded ? 'timeline__item-body--expanded' : ''}`}
              id={`item${index}-ctrld`}
              role="region"
              aria-labelledby={`item${index}`}
              aria-hidden={!isExpanded}
            >
              <div className="timeline__item-body-content">
                <div className="timeline__item-p">
                  {typeof item.content === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  ) : (
                    item.content
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;