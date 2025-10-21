import React, { useState, useEffect, useRef } from 'react';
import './InputOTP.css';

const InputOTP = ({
  length = 6,
  onComplete,
  onResend,
  email = '',
  timeLimit = 120,
  autoFocus = true,
  disabled = false,
  className = 'inputotp-light',
  placeholder = '',
  focusColor, // Custom focus border and shadow color
  ...props
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isExpired, setIsExpired] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    if (timeLimit > 0) {
      startTimer();
    }
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, [timeLimit]);

  const timerId = useRef(null);

  const startTimer = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
    }
    
    setTimeLeft(timeLimit);
    setIsExpired(false);
    setCanResend(true);

    timerId.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerId.current);
          setIsExpired(true);
          setCanResend(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleChange = (element, index) => {
    const value = element.value;
    
    // Only allow single digit
    if (value.length > 1) {
      element.value = value.slice(0, 1);
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Call onComplete when all fields are filled
    if (newOtp.every(digit => digit !== '') && onComplete) {
      onComplete(newOtp.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    // Prevent 'e' key for number inputs
    if (e.key === 'e' || e.key === 'E') {
      e.preventDefault();
      return;
    }

    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
      
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }

    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedDigits = pastedData.replace(/\D/g, '').slice(0, length);
    
    const newOtp = new Array(length).fill('');
    for (let i = 0; i < pastedDigits.length; i++) {
      newOtp[i] = pastedDigits[i];
    }
    
    setOtp(newOtp);
    
    // Focus on the next empty field or last field
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
    inputRefs.current[focusIndex].focus();

    // Call onComplete if all fields are filled
    if (newOtp.every(digit => digit !== '') && onComplete) {
      onComplete(newOtp.join(''));
    }
  };

  const handleResend = () => {
    if (canResend && onResend) {
      setOtp(new Array(length).fill(''));
      inputRefs.current[0].focus();
      startTimer();
      onResend();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getValue = () => otp.join('');
  
  const clear = () => {
    setOtp(new Array(length).fill(''));
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  // Expose methods via ref if needed
  React.useImperativeHandle(props.ref, () => ({
    getValue,
    clear,
    focus: () => inputRefs.current[0]?.focus()
  }));

  // Inline style for custom focus color
  const customStyle = focusColor ? {
    '--custom-focus-color': focusColor,
    '--custom-focus-shadow': `${focusColor}33` // Add 33 for 20% opacity
  } : {};

  return (
    <div 
      className={`otp-container ${className} ${focusColor ? 'has-custom-focus' : ''}`}
      style={customStyle}
    >
      <div className="otp-header">
        <h1 className="otp-title">OTP Verification</h1>
        {email && (
          <p className="otp-description">
            Enter the OTP you received to <span className="otp-email">{email}</span>
          </p>
        )}
      </div>
      
      <div className="otp-input-group">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="number"
            min="0"
            max="9"
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={disabled || isExpired}
            className={`otp-input ${isExpired ? 'expired' : ''}`}
            placeholder={placeholder}
            {...props}
          />
        ))}
      </div>

      {timeLimit > 0 && (
        <div className="otp-footer">
          <div className="resend-section">
            <span className="resend-text">Didn't receive the code? </span>
            <button
              type="button"
              onClick={handleResend}
              disabled={!canResend}
              className={`resend-link ${!canResend ? 'disabled' : ''}`}
            >
              Resend Code
            </button>
            <span className={`timer ${isExpired ? 'expired' : ''}`}>
              {isExpired ? 'Code expired' : `(${formatTime(timeLeft)})`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputOTP;