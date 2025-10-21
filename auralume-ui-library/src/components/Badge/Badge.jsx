import React, { forwardRef } from 'react';
import './Badge.css';

const Badge = forwardRef(({
  children,
  variant = 'default',
  size = 'md',
  rounded = false,
  closable = false,
  tagged = false,
  className = '',
  onClose,
  ...props
}, ref) => {
  const baseClass = 'badge';
  const variantClass = `badge--${variant}`;
  const sizeClass = `badge--${size}`;
  const roundedClass = rounded ? 'badge--rounded' : '';
  const closableClass = closable ? 'badge--closable' : '';
  const taggedClass = tagged ? 'badge--tagged' : '';

  const badgeClasses = [
    baseClass,
    variantClass,
    sizeClass,
    roundedClass,
    closableClass,
    taggedClass,
    className
  ].filter(Boolean).join(' ');

  const handleClose = (e) => {
    e.stopPropagation();
    if (onClose) {
      onClose(e);
    }
  };

  return (
    <span
      ref={ref}
      className={badgeClasses}
      {...props}
    >
      {tagged && (
        <span className="badge__tag-icon" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.41 11.58L12.41 2.58A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 21.41 11.58zM7 9a2 2 0 1 1 2-2A2 2 0 0 1 7 9z"/>
          </svg>
        </span>
      )}
      <span className="badge__content">
        {children}
      </span>
      {closable && (
        <button
          type="button"
          className="badge__close"
          onClick={handleClose}
          aria-label="Remove badge"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.36 6.64a1 1 0 0 1 0 1.41L13.41 13l4.95 4.95a1 1 0 1 1-1.41 1.41L12 14.41l-4.95 4.95a1 1 0 0 1-1.41-1.41L10.59 13 5.64 8.05a1 1 0 0 1 1.41-1.41L12 11.59l4.95-4.95a1 1 0 0 1 1.41 0z"/>
          </svg>
        </button>
      )}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;