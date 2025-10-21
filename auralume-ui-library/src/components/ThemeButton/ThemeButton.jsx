import React, { useState, useEffect } from "react";
import "./ThemeButton.css";

const ThemeButton = ({
  isOn = false,
  onChange,
  size = "medium",
  disabled = false,
  className = "",
  isStaticColor = false,
  variant = "default", // "default" or "animated"
  lightIcon = "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/light.svg",
  darkIcon = "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/dark.svg",
  applyBodyTheme = false, // Whether to apply theme to document body
  width,
  height,
  ...props
}) => {
  const [isToggled, setIsToggled] = useState(isOn);

  // Apply theme to body when component mounts and when toggle changes
  useEffect(() => {
    if (applyBodyTheme) {
      if (isToggled) {
        document.body.classList.add("dark-theme");
      } else {
        document.body.classList.remove("dark-theme");
      }
    }
  }, [isToggled, applyBodyTheme]);

  // Cleanup: remove theme class when component unmounts
  useEffect(() => {
    return () => {
      if (applyBodyTheme) {
        document.body.classList.remove("dark-theme");
      }
    };
  }, [applyBodyTheme]);

  const handleToggle = () => {
    if (disabled) return;

    const newState = !isToggled;
    setIsToggled(newState);

    if (onChange) {
      onChange(newState);
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "toggle-small";
      case "large":
        return "toggle-large";
      default:
        return "toggle-medium";
    }
  };

  const getVariantClass = () => {
    return variant === "default" ? "toggle-theme" : "toggle-glassmorphic";
  };

  // Get dimensions based on props or size
  const getDimensions = () => {
    if (width && height) {
      return { width: `${width}px`, height: `${height}px` };
    }
    
    // Default sizes based on size prop
    switch (size) {
      case "small":
        return { width: "40px", height: "40px" };
      case "large":
        return { width: "80px", height: "80px" };
      default:
        return { width: "60px", height: "60px" };
    }
  };

  // Helper function to check if string is SVG code
  const isSVGString = (str) => {
    return typeof str === 'string' && str.trim().startsWith('<svg');
  };

  // Helper function to render icon (SVG string or image URL)
  const renderIcon = (icon, alt, iconStyle = {}) => {
    if (isSVGString(icon)) {
      return (
        <div
          className="svg-icon-wrapper"
          dangerouslySetInnerHTML={{ __html: icon }}
          style={iconStyle}
        />
      );
    }
    return <img src={icon} alt={alt} style={iconStyle} />;
  };

  const dimensions = getDimensions();

  // Render theme toggle variant (old one)
  if (isStaticColor) {
    const iconToRender = isToggled ? darkIcon : lightIcon;
    const iconStyle = {
      cursor: disabled ? "not-allowed" : "pointer",
      filter: isToggled ? "invert(1)" : "none",
      transition: "all 0.3s ease",
      width: dimensions.width,
      height: dimensions.height,
    };

    return (
      <div
        className={`toggle-container ${getSizeClass()} ${getVariantClass()} ${
          disabled ? "disabled" : ""
        } ${className}`}
        {...props}
      >
        <div className="theme-toggle-wrapper">
          <div
            className={`theme-toggler ${isToggled ? "dark-mode" : "light-mode"}`}
            onClick={handleToggle}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-pressed={isToggled}
            aria-label={`Switch to ${isToggled ? "light" : "dark"} theme`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle();
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...iconStyle
            }}
          >
            {renderIcon(iconToRender, "theme toggle", iconStyle)}
          </div>
        </div>
      </div>
    );
  }

  
  if ( variant === "default") {
    const iconToRender = isToggled ? darkIcon : lightIcon;
    const iconStyle = {
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.3s ease",
      width: dimensions.width,
      height: dimensions.height,
    };

    return (
      <div
        className={`toggle-container ${getSizeClass()} ${getVariantClass()} ${
          disabled ? "disabled" : ""
        } ${className}`}
        {...props}
      >
        <div className="theme-toggle-wrapper">
          <div
            className={`theme-toggler ${isToggled ? "dark-mode" : "light-mode"}`}
            onClick={handleToggle}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-pressed={isToggled}
            aria-label={`Switch to ${isToggled ? "light" : "dark"} theme`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle();
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              ...iconStyle
            }}
          >
            {renderIcon(iconToRender, "theme toggle", iconStyle)}
          </div>
        </div>
      </div>
    );
  }

  // Generate unique ID for this instance
  const uniqueId = `theme-${Math.random().toString(36).substr(2, 9)}`;

  // Render default glassmorphic theme switcher variant with icon support
  return (
    <div
      className={`toggle-container ${getSizeClass()} ${getVariantClass()} ${
        disabled ? "disabled" : ""
      } ${className}`}
      {...props}
    >
      <input 
        type="checkbox" 
        id={uniqueId}
        className="sr-only peer/theme" 
        checked={isToggled}
        onChange={handleToggle}
        disabled={disabled}
      />

      <div className="glassmorphic-wrapper">
        <label 
          htmlFor={uniqueId}
          className="glassmorphic-theme-toggle" 
          aria-label={`Switch to ${isToggled ? "light" : "dark"} mode`}
          style={{
            width: dimensions.width,
            height: dimensions.height,
          }}
        >
          {/* Use custom icons if provided, otherwise use material symbols */}
          {lightIcon && darkIcon ? (
            <>
              <div 
                className="custom-dark-icon"
                style={{
                  width: `calc(${dimensions.width} * 0.5)`,
                  height: `calc(${dimensions.height} * 0.5)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {renderIcon(
                  darkIcon, 
                  "dark mode",
                  {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }
                )}
              </div>
              <div 
                className="custom-light-icon"
                style={{
                  width: `calc(${dimensions.width} * 0.5)`,
                  height: `calc(${dimensions.height} * 0.5)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {renderIcon(
                  lightIcon, 
                  "light mode",
                  {
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }
                )}
              </div>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined dark-icon">dark_mode</span>
              <span className="material-symbols-outlined light-icon">light_mode</span>
            </>
          )}
        </label>
      </div>

      {/* Theme bg mask - exact copy from original */}
      <div className="glassmorphic-bg-mask"></div>
    </div>
  );
};

export default ThemeButton;