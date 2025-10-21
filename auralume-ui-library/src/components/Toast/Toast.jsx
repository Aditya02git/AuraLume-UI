import React, { useState, useEffect } from 'react';
import './Toast.css';

// Toast Hook for easier usage
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (options) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      ...options,
      isVisible: true
    };

    setToasts(prev => [...prev, toast]);

    // Auto remove after duration + animation time
    const duration = options.duration || 5000;
    setTimeout(() => {
      removeToast(id);
    }, duration + 500);

    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  // Convenience methods
  const success = (title, message, options = {}) => 
    showToast({ type: 'success', title, message, ...options });

  const error = (title, message, options = {}) => 
    showToast({ type: 'error', title, message, ...options });

  const warning = (title, message, options = {}) => 
    showToast({ type: 'warning', title, message, ...options });

  const info = (title, message, options = {}) => 
    showToast({ type: 'info', title, message, ...options });

  return {
    toasts,
    showToast,
    removeToast,
    removeAllToasts,
    success,
    error,
    warning,
    info
  };
};

// Toast Container Component
export const ToastContainer = ({ toasts, onRemoveToast }) => {
  return (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => onRemoveToast(toast.id)}
        />
      ))}
    </>
  );
};

const Toast = ({ 
  type = 'success', 
  title = 'Notification', 
  message = '', 
  duration = 5000,
  position = 'top-right',
  onClose,
  isVisible = false 
}) => {
  const [show, setShow] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      setAnimationClass('toast-active');
      
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setAnimationClass('toast-hide');
    setTimeout(() => {
      setShow(false);
      setAnimationClass('');
      if (onClose) onClose();
    }, 500);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="toast-icon">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="toast-icon">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="toast-icon">
            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
        );
      case 'info':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="toast-icon">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="toast-icon">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  if (!show) return null;

  return (
    <div className={`toast toast-${type} toast-${position} ${animationClass}`}>
      <div className="toast-inner">
        <div className="toast-left">
          {getIcon()}
        </div>
        <div className="toast-body">
          <h4 className="toast-title">{title}</h4>
          {message && (
            <div className="toast-text">
              <p>{message}</p>
            </div>
          )}
        </div>
        <button 
          className="toast-close"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="toast-close-icon">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Toast;