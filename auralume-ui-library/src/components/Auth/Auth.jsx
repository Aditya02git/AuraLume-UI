import React, { useState, useEffect } from 'react';
import './Auth.css';

const Auth = ({ 
  onSignIn = () => {}, 
  onSignUp = () => {}, 
  onSocialLogin = () => {},
  enableSocialLogin = true,
  className = '',
  color = '#000000',
  ...props 
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  // Function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
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
    const root = document.documentElement;
    const rgb = hexToRgb(color);
    
    // Set CSS custom properties
    root.style.setProperty('--form-bg-color', '#FFFFFF');
    root.style.setProperty('--form-text-primary', color);
    root.style.setProperty('--form-text-secondary', adjustColor(color, 30));
    root.style.setProperty('--form-text-color', '#FFFFFF');
    root.style.setProperty('--form-input-color', adjustColor(color, 90));
    root.style.setProperty('--form-focus-color', adjustColor(color, 80));
    root.style.setProperty('--form-btn-color', color);
    root.style.setProperty('--form-btn-hover', adjustColor(color, -20));
    root.style.setProperty('--form-btn-border', adjustColor(color, 40));
    root.style.setProperty('--form-social-border', adjustColor(color, 70));
    root.style.setProperty('--form-social-bg', '#FFFFFF');
    root.style.setProperty('--form-social-hover', adjustColor(color, 95));
    root.style.setProperty('--form-shadow-color', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.25)`);
    root.style.setProperty('--form-shadow-light', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.22)`);
  }, [color]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (type === 'signin') {
      onSignIn({ email: formData.email, password: formData.password });
    } else {
      onSignUp(formData);
    }
  };

  const handleSocialLogin = (provider) => {
    onSocialLogin(provider);
  };

  const SocialButtons = () => (
    enableSocialLogin && (
      <div className="auth-social-container">
        <button 
          type="button" 
          className="auth-social"
          onClick={() => handleSocialLogin('facebook')}
          aria-label="Sign in with Facebook"
        >
          <i className="fab fa-facebook-f"></i>
        </button>
        <button 
          type="button" 
          className="auth-social"
          onClick={() => handleSocialLogin('google')}
          aria-label="Sign in with Google"
        >
          <i className="fab fa-google-plus-g"></i>
        </button>
        <button 
          type="button" 
          className="auth-social"
          onClick={() => handleSocialLogin('linkedin')}
          aria-label="Sign in with LinkedIn"
        >
          <i className="fab fa-linkedin-in"></i>
        </button>
      </div>
    )
  );

  return (
    <div className={`auth-container ${className}`} {...props}>
      <div className="auth-form-wrapper">
        <form 
          className="auth-form" 
          onSubmit={(e) => handleSubmit(e, isSignUp ? 'signup' : 'signin')}
        >
          <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
          
          <SocialButtons />
          
          {enableSocialLogin && (
            <span className="auth-divider">
              or use your email {isSignUp ? 'for registration' : ''}
            </span>
          )}

          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          
          {!isSignUp && (
            <a href="#" className="auth-forgot-password">
              Forgot your password?
            </a>
          )}
          
          <button type="submit" className="auth-submit-btn">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          
          <div className="auth-toggle">
            <span>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              type="button"
              className="auth-toggle-btn"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;