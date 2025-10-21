import { useState, useEffect, Children, cloneElement, useRef } from 'react';
import './Tab.css';

// Helper function to darken a color
function darkenColor(color, percent = 20) {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const darkenedR = Math.max(0, Math.floor(r * (1 - percent / 100)));
  const darkenedG = Math.max(0, Math.floor(g * (1 - percent / 100)));
  const darkenedB = Math.max(0, Math.floor(b * (1 - percent / 100)));
  
  return `#${darkenedR.toString(16).padStart(2, '0')}${darkenedG.toString(16).padStart(2, '0')}${darkenedB.toString(16).padStart(2, '0')}`;
}

// Helper function to lighten a color
function lightenColor(color, percent = 20) {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  const lightenedR = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  const lightenedG = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  const lightenedB = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));
  
  return `#${lightenedR.toString(16).padStart(2, '0')}${lightenedG.toString(16).padStart(2, '0')}${lightenedB.toString(16).padStart(2, '0')}`;
}

export default function Tab({ 
  children, 
  theme = 'tab-light', 
  defaultTab = 0, 
  onTabChange, 
  className = '', 
  tabGroupName, 
  color = null,
  activeColor = null,
  textColor = null,
  maxWidth = '500px',
  showCopy = false,
  ...props 
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [copied, setCopied] = useState(false);
  const panelRef = useRef(null);
  const childrenArray = Children.toArray(children);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleTabChange = (index) => {
    setActiveTab(index);
    setCopied(false); // Reset copied state when switching tabs
    if (onTabChange) {
      onTabChange(index);
    }
  };

  const handleCopy = async () => {
    if (panelRef.current) {
      const textContent = panelRef.current.innerText;
      try {
        await navigator.clipboard.writeText(textContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Only compute colors if color prop is provided
  const darkerColor = color ? darkenColor(color, 20) : null;
  const lighterColor = color ? lightenColor(color, 20) : null;

  // Create style object only if colors are provided
  const containerStyle = {};
  if (color) {
    containerStyle['--bg-color'] = lighterColor;
  }
  
  // Add maxWidth to container style
  if (maxWidth) {
    containerStyle.maxWidth = maxWidth;
  }
  
  const getTabItemStyle = (isActive) => {
    const style = {};
    if (color) {
      style['--tab-color'] = darkerColor;
    }
    if (isActive && activeColor) {
      style.color = activeColor;
    } else if (textColor) {
      style.color = textColor;
    }
    return style;
  };
  
  const getTabPanelStyle = (index) => {
    const style = {
      borderTopLeftRadius: activeTab !== 0 ? '12px' : '0px'
    };
    if (color) {
      style['--tab-color'] = darkerColor;
    }
    if (textColor) {
      style.color = textColor;
    }
    return style;
  };

  return (
    <div 
      className={`tab-container ${theme} ${className}`} 
      {...props}
      style={containerStyle}
    >
      <ul className="tab-list" role="tablist" aria-label={tabGroupName}>
        {childrenArray.map((child, index) => {
          const isActive = activeTab === index;
          const label = child.props.label || `Tab ${index + 1}`;
          
          return (
            <li
              key={index}
              onClick={() => handleTabChange(index)}
              className={`tab-item ${isActive ? 'active' : ''}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${index}`}
              style={getTabItemStyle(isActive)}
            >
              {index !== 0 && (
                <div className="tab-curve-left">
                  <div className="tab-curve-left-inner"></div>
                </div>
              )}
              <div className="tab-curve-right">
                <div className="tab-curve-right-inner"></div>
              </div>
              {label}
            </li>
          );
        })}
      </ul>
      <div className="tab-content-wrapper">
        {showCopy && (
          <button
            className={`copy-button ${theme}`}
            onClick={handleCopy}
            title={copied ? 'Copied!' : 'Copy'}
            aria-label="Copy"
          >
            {copied ? (
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z"/>
              </svg>
            ) : (
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-5-4v4h4V3h-4Z"/>
              </svg>
            )}
          </button>
        )}
        {childrenArray.map((child, index) => (
          <div
            key={index}
            ref={activeTab === index ? panelRef : null}
            className={`tab-panel ${activeTab === index ? 'active' : ''}`}
            role="tabpanel"
            id={`panel-${index}`}
            aria-hidden={activeTab !== index}
            style={getTabPanelStyle(index)}
          >
            {cloneElement(child, { isActive: activeTab === index })}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TabPanel({ children, label, isActive, ...props }) {
  return <div {...props}>{children}</div>;
}