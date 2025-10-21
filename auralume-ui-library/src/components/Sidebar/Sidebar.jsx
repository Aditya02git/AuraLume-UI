import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({
  position = 'left',
  width = 250,
  color = '#010101',
  hamburgerPosition = { top: 20, left: 20, right: 20 },
  items = [],
  isOpen = false,
  onToggle,
  children,
  className = '',
  textColor = '#ffffff',
  hamburgerColor = '#333333',
  hamburgerBorder = '1px solid #a5a5a5',
  showHamburger = true,
  closeOnItemClick = true
}) => {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  
  const isControlled = onToggle !== undefined;
  const open = isControlled ? isOpen : internalOpen;
  
  const handleToggle = () => {
    if (isControlled) {
      onToggle(!open);
    } else {
      setInternalOpen(!internalOpen);
    }
  };

  const handleItemClick = (item) => {
    if (closeOnItemClick) {
      if (isControlled) {
        onToggle(false);
      } else {
        setInternalOpen(false);
      }
    }
    if (item.onClick) {
      item.onClick();
    }
  };

  const sidebarStyles = {
    '--sidebar-width': `${width}px`,
    '--sidebar-bg': color,
    '--sidebar-text-color': textColor,
    '--hamburger-color': hamburgerColor,
    '--hamburger-border': hamburgerBorder,
    '--hamburger-top': `${hamburgerPosition.top}px`,
    '--hamburger-left': position === 'left' ? `${hamburgerPosition.left}px` : 'auto',
    '--hamburger-right': position === 'right' ? `${hamburgerPosition.right}px` : 'auto',
  };

  return (
    <nav 
      className={`sidebar ${className}`} 
      style={sidebarStyles}
      data-position={position}
    >
      {showHamburger && (
        <div 
          className={`hamburger-menu ${open ? 'is-active' : ''}`}
          onClick={handleToggle}
          role="button"
          aria-label="Toggle navigation"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
      )}
      
      <ul className={`sidebar-list ${open ? 'slide-in' : ''}`}>
        {items.map((item, index) => (
          <li key={index} className="sidebar-item">
            {item.href ? (
              <a 
                className="sidebar-link" 
                href={item.href}
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </a>
            ) : (
              <button 
                className="sidebar-link sidebar-button" 
                onClick={() => handleItemClick(item)}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
        {children}
      </ul>
      
      {open && (
        <div 
          className="sidebar-overlay"
          onClick={handleToggle}
          aria-hidden="true"
        />
      )}
    </nav>
  );
};

export default Sidebar;