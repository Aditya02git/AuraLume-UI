import React, { useEffect } from 'react';
import './AlertDialog.css';

const AlertDialog = ({
  isOpen = false,
  onClose,
  onConfirm,
  title = 'Alert',
  message = 'Are you sure you want to continue?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'default', // 'default', 'danger', 'warning', 'success'
  showCancel = true,
  className = '',
  ...props
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose?.();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleConfirm = () => {
    onConfirm?.();
    onClose?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`alert-dialog-overlay ${className}`}
      {...props}
    >
      <div className={`alert-dialog alert-dialog--${type}`}>
        <div className="alert-dialog__header">
          <h3 className="alert-dialog__title">{title}</h3>
          <button
            className="alert-dialog__close"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <svg style={{color: 'gray'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
          </button>
        </div>
        
        <div className="alert-dialog__body">
          <p className="alert-dialog__message">{message}</p>
        </div>
        
        <div className="alert-dialog__footer">
          {showCancel && (
            <button
              className="alert-dialog__button alert-dialog__button--cancel"
              onClick={handleCancel}
            >
              {cancelText}
            </button>
          )}
          <button
            className={`alert-dialog__button alert-dialog__button--confirm alert-dialog__button--${type}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;