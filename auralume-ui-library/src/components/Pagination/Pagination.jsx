import React, { useRef, useEffect } from 'react';
import './Pagination.css';

const Pagination = ({
  currentPage = 1,
  totalPages = 7,
  onPageChange = () => {},
  theme = 'pagination-light',
  variant = 'simple', // 'simple', 'hoverable', 'bordered'
  showPrevNext = true,
  className = '',
  disabled = false,
  color = '#9e9e9e' // Primary color for theming
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

  // Function to calculate luminance and determine if color is light or dark
  const getContrastColor = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return '#ffffff';
    
    // Calculate relative luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    
    // Return white for dark colors, black for light colors
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
    
    // Set CSS custom properties on the container
    containerRef.current.style.setProperty('--pagination-primary', color);
    containerRef.current.style.setProperty('--pagination-primary-hover', adjustColor(color, -10));
    containerRef.current.style.setProperty('--pagination-primary-light', adjustColor(color, 90));
    containerRef.current.style.setProperty('--pagination-text-on-primary', textColor);
    containerRef.current.style.setProperty('--pagination-focus-outline', color);
    
    // For dark theme, create a lighter version for better visibility
    const lighterColor = adjustColor(color, 30);
    containerRef.current.style.setProperty('--pagination-primary-lighter', lighterColor);
    containerRef.current.style.setProperty('--pagination-text-on-lighter', getContrastColor(lighterColor));
  }, [color]);

  const handlePageClick = (page, event) => {
    event.preventDefault();
    if (!disabled && page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePrevClick = (event) => {
    event.preventDefault();
    if (!disabled && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    if (!disabled && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    if (variant !== 'smart') {
      // default: show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const delta = 2; // how many pages to show around currentPage

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // always show first page
        i === totalPages || // always show last page
        (i >= currentPage - delta && i <= currentPage + delta) // show near current
      ) {
        pages.push(i);
      } else if (
        pages[pages.length - 1] !== '...' // avoid duplicates
      ) {
        pages.push('...');
      }
    }

    return pages;
  };

  const getThemeClass = () => {
    return `pagination ${theme} pagination-${variant}`;
  };

  const pages = getPageNumbers();

  return (
    <div className={`pagination-wrapper ${className}`} ref={containerRef}>
      <ul className={getThemeClass()}>
        {showPrevNext && (
          <li>
            <a
              href="#"
              onClick={handlePrevClick}
              className={`pagination-link ${
                currentPage === 1 || disabled ? 'disabled' : ''
              }`}
              aria-label="Previous page"
            >
              «
            </a>
          </li>
        )}
        
        {pages.map((page, index) => (
          <li key={`${page}-${index}`}>
            {page === '...' ? (
              <span className="pagination-ellipsis" aria-hidden="true">
                ...
              </span>
            ) : (
              <a
                href="#"
                onClick={(event) => handlePageClick(page, event)}
                className={`pagination-link ${
                  currentPage === page ? 'active' : ''
                } ${disabled ? 'disabled' : ''}`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </a>
            )}
          </li>
        ))}
        
        {showPrevNext && (
          <li>
            <a
              href="#"
              onClick={handleNextClick}
              className={`pagination-link ${
                currentPage === totalPages || disabled ? 'disabled' : ''
              }`}
              aria-label="Next page"
            >
              »
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;