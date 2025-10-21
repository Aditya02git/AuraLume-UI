import React, { useEffect, useRef } from 'react';
import './Counter.css';

const Counter = ({
  data = [],
  theme = 'counter-light',
  columns = 3,
  gap = 24,
  padding = 24,
  fontSize = 50,
  labelSize = 20,
  borderRadius = 25,
  className = '',
  animationDuration = 1000,
  threshold = 0.9,
  color = '#2D3748',
  ...props
}) => {
  const containerRef = useRef(null);
  const odometerInstances = useRef([]);

  // Function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
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
    const root = document.documentElement;
    const rgb = hexToRgb(color);
    
    // Set CSS custom properties
    root.style.setProperty('--bg-color', adjustColor(color, 85));
    root.style.setProperty('--bg-hover', adjustColor(color, 92));
    root.style.setProperty('--text-color', color);
    root.style.setProperty('--border-color', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.1)`);
    root.style.setProperty('--shadow-color', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.15)`);
  }, [color]);

  useEffect(() => {
    // Dynamically load Odometer.js
    const loadOdometer = async () => {
      if (window.Odometer) {
        initializeCounters();
        return;
      }

      // Load CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/odometer.js/0.4.7/themes/odometer-theme-default.css';
      document.head.appendChild(cssLink);

      // Load JS
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/odometer.js/0.4.7/odometer.min.js';
      script.onload = () => initializeCounters();
      document.body.appendChild(script);
    };

    loadOdometer();

    return () => {
      // Cleanup observers
      odometerInstances.current.forEach(({ observer }) => {
        if (observer) observer.disconnect();
      });
    };
  }, [data, threshold, animationDuration]);

  const initializeCounters = () => {
    const elements = containerRef.current?.querySelectorAll('.counter-odometer');
    if (!elements) return;

    elements.forEach((el, index) => {
      const odometer = new window.Odometer({
        el: el,
        value: 0,
        duration: animationDuration,
        format: '(,ddd)',
      });

      let hasRun = false;
      const options = {
        threshold: [0, threshold],
      };

      const callback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun) {
            odometer.update(data[index]?.value || 0);
            hasRun = true;
          }
        });
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(el);

      odometerInstances.current[index] = { odometer, observer };
    });
  };

  const containerStyles = {
    gap: `${gap}px`,
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
  };

  const statStyles = {
    padding: `${padding}px`,
    borderRadius: `${borderRadius}px`,
  };

  const odometerStyles = {
    fontSize: `${fontSize}px`,
  };

  const labelStyles = {
    fontSize: `${labelSize}px`,
  };

  return (
    <div
      ref={containerRef}
      className={`counter-container ${theme} ${className}`}
      style={containerStyles}
      {...props}
    >
      {data.map((item, index) => (
        <div
          key={index}
          className="counter-stat"
          style={statStyles}
        >
          <div
            className={`counter-odometer odometer ${item.showPlus ? 'plus' : ''}`}
            style={odometerStyles}
          >
            0
          </div>
          <div className="counter-type" style={labelStyles}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Counter;