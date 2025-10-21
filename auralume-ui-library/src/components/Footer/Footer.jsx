import React, { useEffect, useRef } from 'react';
import './Footer.css';

const Footer = ({
  sections = [],
  bottomText = '',
  socialLinks = [],
  backgroundColor = '#1a1a1a',
  titleColor = '#000000',
  textColor = '#ffffff',
  linkColor = '#60a5fa',
  linkHoverColor = '#3b82f6',
  linkDecoration = 'underline',
  borderRadius = '0px',
  color = null,
  className = '',
  containerMaxWidth = '1200px',
  showDivider = true
}) => {
  const footerRef = useRef(null);

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
    
    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    
    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? '#000000' : '#ffffff';
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
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Generate color scheme from single color prop
  useEffect(() => {
    if (color && footerRef.current) {
      const autoBackgroundColor = adjustColor(color, -60); // Much darker
      const autoTextColor = getContrastColor(autoBackgroundColor);
      const autoTitleColor = adjustColor(color, 20); // Lighter accent
      const autoLinkColor = color;
      const autoLinkHoverColor = adjustColor(color, -15);
      
      footerRef.current.style.setProperty('--auto-bg-color', autoBackgroundColor);
      footerRef.current.style.setProperty('--auto-text-color', autoTextColor);
      footerRef.current.style.setProperty('--auto-title-color', autoTitleColor);
      footerRef.current.style.setProperty('--auto-link-color', autoLinkColor);
      footerRef.current.style.setProperty('--auto-link-hover-color', autoLinkHoverColor);
    }
  }, [color]);

  // Determine which colors to use
  const finalBackgroundColor = color ? 'var(--auto-bg-color)' : backgroundColor;
  const finalTextColor = color ? 'var(--auto-text-color)' : textColor;
  const finalTitleColor = color ? 'var(--auto-title-color)' : titleColor;
  const finalLinkColor = color ? 'var(--auto-link-color)' : linkColor;
  const finalLinkHoverColor = color ? 'var(--auto-link-hover-color)' : linkHoverColor;

  return (
    <footer 
      ref={footerRef}
      className={`footer ${className}`}
      style={{ 
        backgroundColor: finalBackgroundColor, 
        color: finalTextColor,
        '--link-color': finalLinkColor,
        '--link-hover-color': finalLinkHoverColor,
        '--text-decoration': linkDecoration,
        '--border-radius': borderRadius,
        '--title-color': finalTitleColor,
      }}
    >
      <div 
        className="footer-container"
        style={{ maxWidth: containerMaxWidth }}
      >
        {sections.length > 0 && (
          <div className="footer-sections">
            {sections.map((section, index) => (
              <div key={index} className="footer-section">
                {section.title && (
                  <h3 className="footer-section-title">{section.title}</h3>
                )}
                {section.links && section.links.length > 0 && (
                  <ul className="footer-links">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="footer-link-item">
                        <a
                          href={link.href}
                          target={link.external ? '_blank' : '_self'}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="footer-link"
                          onClick={link.onClick}
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {section.content && (
                  <div className="footer-section-content">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {socialLinks.length > 0 && (
          <div className="footer-social">
            <div className="footer-social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={social.label}
                  onClick={social.onClick}
                >
                  {social.icon ? social.icon : social.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {showDivider && (sections.length > 0 || socialLinks.length > 0) && bottomText && (
          <hr className="footer-divider" style={{ borderColor: finalTextColor + '20' }} />
        )}

        {bottomText && (
          <div className="footer-bottom">
            <p className="footer-bottom-text">{bottomText}</p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;