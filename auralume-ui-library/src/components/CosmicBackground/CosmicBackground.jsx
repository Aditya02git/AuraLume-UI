import React from 'react';
import './CosmicBackground.css';

const CosmicBackground = ({ children, className= "" }) => {
  return (
    <div className={`cosmic-background-container ${className}`}>
      {/* White stars */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      
      {/* Colored stars */}
      <div id="blue-stars"></div>
      <div id="red-stars"></div>
      <div id="green-stars"></div>
      <div id="yellow-stars"></div>
      <div id="purple-stars"></div>
      <div id="orange-stars"></div>
      
      {/* Nebulas */}
      <div className="nebula nebula-1"></div>
      <div className="nebula nebula-2"></div>
      <div className="nebula nebula-3"></div>
      <div className="nebula nebula-4"></div>
      
      <div className="cosmic-content">
        {children}
      </div>
    </div>
  );
};

export default CosmicBackground;