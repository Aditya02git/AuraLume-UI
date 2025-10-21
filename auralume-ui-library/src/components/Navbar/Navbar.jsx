import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({
  title,
  logo,
  endIcon,
  menuItems = [],
  searchable = false,
  searchPlaceholder = "Search...",
  onSearch,
  className = "",
  variant = "default",
  centerLogo = false,
  onMenuClick,
  onIconClick,
  color = "#3b82f6"
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const dropdownRefs = useRef({});
  const isTogglingRef = useRef(false);
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
    
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
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
    
    containerRef.current.style.setProperty('--navbar-primary', color);
    containerRef.current.style.setProperty('--navbar-primary-hover', adjustColor(color, -10));
    containerRef.current.style.setProperty('--navbar-primary-light', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.1)`);
    containerRef.current.style.setProperty('--navbar-focus-color', color);
    containerRef.current.style.setProperty('--menu-btn-hovercolor', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.15)`);
    containerRef.current.style.setProperty('--navbar-bg-tint', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.05)`);
  }, [color]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isTogglingRef.current) {
        isTogglingRef.current = false;
        return;
      }

      Object.keys(dropdownRefs.current).forEach(key => {
        const dropdownElement = dropdownRefs.current[key];
        if (dropdownElement && !dropdownElement.contains(event.target)) {
          setOpenDropdowns(prev => ({ ...prev, [key]: false }));
        }
      });
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(k => {
        if (k !== key) {
          newState[k] = false;
        }
      });
      newState[key] = !prev[key];
      return newState;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  const handleMenuItemClick = (item, index, event) => {
    event.stopPropagation();
    
    if (item.dropdown) {
      toggleDropdown(`menu-${index}`);
    } else if (onMenuClick) {
      onMenuClick(item, index);
    }
    
    if (!item.dropdown) {
      setIsMenuOpen(false);
    }
  };

  const renderIcon = (icon, onClick, className = "") => {
    if (!icon) return null;
    
    if (typeof icon === 'string') {
      return (
        <button 
          className={`navbar-icon ${className}`} 
          onClick={onClick}
          aria-label="Icon button"
        >
          {icon}
        </button>
      );
    }
    
    return (
      <button 
        className={`navbar-icon ${className}`} 
        onClick={onClick}
        aria-label="Icon button"
      >
        {icon}
      </button>
    );
  };

  const renderMenuItem = (item, index) => {
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    const isDropdownOpen = openDropdowns[`menu-${index}`];

    return (
      <div 
        key={index} 
        className="navbar-menu-item"
        ref={el => dropdownRefs.current[`menu-${index}`] = el}
      >
        <button
          className={`navbar-menu-button ${hasDropdown ? 'has-dropdown' : ''} ${isDropdownOpen ? 'active' : ''}`}
          onClick={(event) => handleMenuItemClick(item, index, event)}
        >
          {item.icon && <span className="menu-item-icon">{item.icon}</span>}
          <span>{item.label}</span>
          {item.badge && <span className="menu-badge">{item.badge}</span>}
          {hasDropdown && <span className="dropdown-arrow"><img src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/down.png" alt="" height="10px" width="10px"/></span>}
        </button>
        
        {hasDropdown && (
          <div className={`navbar-dropdown ${isDropdownOpen ? 'open' : ''}`}>
            {item.dropdown.map((subItem, subIndex) => (
              <button
                key={subIndex}
                className="navbar-dropdown-item"
                onClick={() => {
                  if (onMenuClick) onMenuClick(subItem, `${index}-${subIndex}`);
                  setOpenDropdowns(prev => ({ ...prev, [`menu-${index}`]: false }));
                  setIsMenuOpen(false);
                }}
              >
                {subItem.icon && <span className="dropdown-item-icon">{subItem.icon}</span>}
                <span>{subItem.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSearch = () => {
    if (!searchable) return null;

    return (
      <div className="navbar-search">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <img src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/loupe.png" alt="" height="15px" width="15px"/>
          </button>
        </form>
      </div>
    );
  };

  const renderLogo = () => {
    if (!logo) return null;
    
    return (
      <div className="navbar-logo">
        {typeof logo === 'string' ? (
          <img src={logo} alt="Logo" className="logo-image" />
        ) : (
          logo
        )}
      </div>
    );
  };

  return (
    <nav className={`navbar navbar-${variant} navbar-responsive ${className}`} ref={containerRef}>
      <div className="navbar-container">
        <div className="navbar-left">
          {!centerLogo && renderLogo()}
          {title && !centerLogo && <h1 className="navbar-title">{title}</h1>}
        </div>

        <div className="navbar-center">
          {centerLogo && renderLogo()}
          
          {menuItems.length > 0 && (
            <div className="navbar-menu desktop-menu">
              {menuItems.map((item, index) => renderMenuItem(item, index))}
            </div>
          )}

          {renderSearch()}
        </div>

        <div className="navbar-right">
          {endIcon && renderIcon(endIcon, () => onIconClick && onIconClick('end'))}

          {menuItems.length > 0 && (
            <button 
              className="navbar-mobile-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${isMenuOpen ? 'is-active' : ''}`}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </div>
            </button>
          )}
        </div>
      </div>

      {menuItems.length > 0 && (
        <div className={`navbar-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;