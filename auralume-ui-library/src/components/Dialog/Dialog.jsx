import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import './Dialog.css';

/**
 * @typedef {Object} DialogProps
 * @property {string} [id] - Unique identifier for the dialog
 * @property {React.ReactElement} trigger - Button or element that triggers the dialog
 * @property {string} [title] - Dialog title
 * @property {React.ReactNode} children - Dialog content
 * @property {'default' | 'cross' | 'auto-close'} [variant='default'] - Dialog variant
 * @property {string} [className=''] - Additional CSS classes
 * @property {string} [theme=''] - Theme class (e.g., 'dialog-dark', 'dialog-light')
 * @property {string} [width] - Custom width (e.g., '500px', '80%')
 * @property {string} [bgBlur='8px'] - Backdrop blur amount
 * @property {string} [bgOverlay='rgba(0, 0, 0, 0.5)'] - Backdrop overlay color/opacity
 * @property {() => void} [onClose] - Callback when dialog closes
 * @property {number} [autoCloseDelay=3000] - Auto-close delay in milliseconds (for auto-close variant)
 */

/**
 * @typedef {Object} DialogRef
 * @property {() => void} close - Close the dialog
 * @property {() => void} open - Open the dialog
 * @property {boolean} isOpen - Whether the dialog is currently open
 */

/**
 * Dialog component with various variants and customization options
 * @type {React.ForwardRefExoticComponent<DialogProps & React.RefAttributes<DialogRef>>}
 */
const Dialog = forwardRef(({
  id,
  trigger,
  title,
  children,
  variant = 'default',
  className = '',
  theme = '',
  width,
  bgBlur = '0px',
  bgOverlay = 'rgba(0, 0, 0, 0.5)',
  onClose,
  autoCloseDelay = 3000,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const dialogRef = useRef(null);
  const scrollPositionRef = useRef(0);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setCountdown(null);
    
    if (dialogRef.current) {
      dialogRef.current.hidePopover();
    }
    
    // Restore scroll position AFTER closing
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollPositionRef.current);
    
    onClose?.();
  }, [onClose]);

  const openDialog = useCallback(() => {
    // Save current scroll position BEFORE opening
    scrollPositionRef.current = window.scrollY;
    
    // Prevent body scroll and maintain position
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPositionRef.current}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    setIsOpen(true);
    if (dialogRef.current) {
      dialogRef.current.showPopover();
    }

    // Auto-close countdown - set initial countdown
    if (variant === 'auto-close') {
      const seconds = Math.ceil(autoCloseDelay / 1000);
      setCountdown(seconds);
    }
  }, [variant, autoCloseDelay]);

  // Handle auto-close countdown in useEffect
  useEffect(() => {
    if (!isOpen || variant !== 'auto-close' || countdown === null) {
      return;
    }

    if (countdown <= 0) {
      closeDialog();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isOpen, variant, countdown, closeDialog]);

  // Handle backdrop click - prevent closing for all variants
  const handleBackdropClick = useCallback(() => {
    // Do nothing when clicking outside for all variants
    // Dialog can only be closed via buttons or programmatically
  }, []);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    close: closeDialog,
    open: openDialog,
    isOpen: isOpen
  }));

  useEffect(() => {
    return () => {
      // Cleanup: restore scroll on unmount if dialog is open
      if (isOpen) {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  const renderCloseButton = () => (
    <button
      className="dialog-close-x"
      onClick={closeDialog}
      aria-label="Close dialog"
    >
      <svg style={{color: 'gray'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
      </svg>
    </button>
  );

  const renderCountdown = () => {
    if (variant === 'auto-close' && countdown !== null && countdown > 0) {
      return (
        <div className="dialog-countdown">
          Closing in {countdown}s
        </div>
      );
    }
    return null;
  };

  // Create style object for width, blur, and overlay
  const dialogStyle = width ? { '--dialogbox-width': width } : {};
  const backdropStyle = { 
    '--background-blur': `blur(${bgBlur})`,
    '--background-overlay': bgOverlay
  };

  return (
    <>
      {React.cloneElement(trigger, {
        onClick: openDialog,
        'aria-haspopup': 'dialog'
      })}

      {/* Backdrop to block outside clicks */}
      {isOpen && (
        <div className="dialog-backdrop" onClick={handleBackdropClick} style={backdropStyle} />
      )}

      <dialog
        ref={dialogRef}
        id={id}
        popover="manual"
        className={`dialog ${theme} dialog-${variant} ${className}`}
        style={dialogStyle}
        {...props}
      >
        {variant === 'cross' && renderCloseButton()}

        <div className="dialog-content">
          {title && <h3 className="dialog-title">{title}</h3>}
          <div className="dialog-body">
            {children}
            {renderCountdown()}
          </div>
        </div>
      </dialog>
    </>
  );
});

Dialog.displayName = 'Dialog';

export default Dialog;