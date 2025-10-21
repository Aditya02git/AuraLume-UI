import React from 'react';
import './CRT.css';

const CRT = ({ 
  children, 
  className = '', 
  backgroundImage = '',
  showGrain = true,
  showScratches = true,
  intensity = 'normal', // 'light', 'normal', 'heavy'
  bgColor = 'none',
  headerColor = '#fff',
  scanLineOpacity = 0.1,
  flickerIntensity = 0.03
}) => {
  const intensityClass = `crt-${intensity}`;
  
  const customStyles = {
    '--bg-color': bgColor,
    '--text-color': headerColor,
    '--scan-line-opacity': scanLineOpacity,
    '--flicker-intensity': flickerIntensity,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'
  };
  
  return (
    <div 
      className={`crt-wrapper ${intensityClass} ${className}`}
      style={{
        '--bg-color': bgColor,
        '--text-color': headerColor,
        '--scan-line-opacity': scanLineOpacity,
        '--flicker-intensity': flickerIntensity
      }}
    >
      <div className="crt-outer-scratch">
        <div className="crt-inner-scratch">
          <div 
            className={`crt-background ${showGrain ? 'crt-grain' : ''}`}
            style={{ 
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' 
            }}
          >
            <div className="crt-content">
              {children}
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay effects */}
      {showScratches && (
        <>
          <div className="crt-scratch-overlay crt-scratch-quick"></div>
          <div className="crt-scratch-overlay crt-scratch-slow"></div>
        </>
      )}
      
      {showGrain && <div className="crt-grain-overlay"></div>}
    </div>
  );
};

export default CRT;