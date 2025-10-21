import React from 'react';
import './Accordion.css';

// Helper function to convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Helper function to generate color variants
const generateColorVariants = (baseColor) => {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return {};

  // Lighten function
  const lighten = (r, g, b, amount) => {
    return {
      r: Math.min(255, Math.round(r + (255 - r) * amount)),
      g: Math.min(255, Math.round(g + (255 - g) * amount)),
      b: Math.min(255, Math.round(b + (255 - b) * amount))
    };
  };

  // Darken function
  const darken = (r, g, b, amount) => {
    return {
      r: Math.max(0, Math.round(r * (1 - amount))),
      g: Math.max(0, Math.round(g * (1 - amount))),
      b: Math.max(0, Math.round(b * (1 - amount)))
    };
  };

  const veryLight = lighten(rgb.r, rgb.g, rgb.b, 0.9);
  const light = lighten(rgb.r, rgb.g, rgb.b, 0.7);
  const mediumLight = lighten(rgb.r, rgb.g, rgb.b, 0.5);
  const dark = darken(rgb.r, rgb.g, rgb.b, 0.3);

  return {
    base: baseColor,
    veryLight: `rgb(${veryLight.r}, ${veryLight.g}, ${veryLight.b})`,
    light: `rgb(${light.r}, ${light.g}, ${light.b})`,
    mediumLight: `rgb(${mediumLight.r}, ${mediumLight.g}, ${mediumLight.b})`,
    dark: `rgb(${dark.r}, ${dark.g}, ${dark.b})`
  };
};

const AccordionItem = ({ question, answer, isOpen, onToggle, colorVariants }) => {
  return (
    <div 
      className="accordion-item"
      style={{
        '--item-bg': colorVariants.mediumLight,
        '--item-hover': colorVariants.light,
        '--item-text': colorVariants.dark,
        '--icon-color': colorVariants.dark
      }}
    >
      <button 
        className="accordion-button" 
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h2 className="accordion-question">{question}</h2>
        <svg 
          className={`accordion-icon ${isOpen ? 'accordion-icon-open' : ''}`}
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M6 9L12 15L18 9" 
            stroke="var(--icon-color)" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </button>
      <div className={`accordion-content ${isOpen ? 'accordion-content-open' : ''}`}>
        <p className="accordion-answer">{answer}</p>
      </div>
    </div>
  );
};

const Accordion = ({ 
  items = [], 
  allowMultiple = false, 
  className = "",
  showHeader = true,
  color = "#ffff00"
}) => {
  const [openItems, setOpenItems] = React.useState(new Set());
  const colorVariants = generateColorVariants(color);

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    
    if (allowMultiple) {
      if (newOpenItems.has(index)) {
        newOpenItems.delete(index);
      } else {
        newOpenItems.add(index);
      }
    } else {
      if (newOpenItems.has(index)) {
        newOpenItems.clear();
      } else {
        newOpenItems.clear();
        newOpenItems.add(index);
      }
    }
    
    setOpenItems(newOpenItems);
  };

  return (
    <div 
      className={`accordion-container ${className}`}
      style={{
        '--acc-bg-color': colorVariants.veryLight,
        '--acc-border-color': colorVariants.mediumLight,
      }}
    >
      <div className="accordion-wrapper">
        {showHeader && (
          <div className="accordion-header">
          </div>
        )}
        
        <div className="accordion-list">
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openItems.has(index)}
              onToggle={() => toggleItem(index)}
              colorVariants={colorVariants}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;