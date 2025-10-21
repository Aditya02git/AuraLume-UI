import React from 'react';
import './ShaderWaveText.css';

const ShaderWaveText = ({ 
  text = "LOADING", 
  width = 100, 
  height = 20,
  fontSize = 17,
  animationDuration = "1.5s",
  gradientColors = { start: "#326384", end: "#123752" },
  waveOpacity = 0.6,
  baseOpacity = 0.1,
  className = "",
  style = {}
}) => {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  const waveId = `wave-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg 
      viewBox={`0 0 ${width} ${height}`}
      className={`shader-wave-text ${className}`}
      style={style}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="5%" stopColor={gradientColors.start}/>
          <stop offset="95%" stopColor={gradientColors.end}/>
        </linearGradient>
        <pattern 
          id={waveId} 
          x="0" 
          y="0" 
          width="120" 
          height={height} 
          patternUnits="userSpaceOnUse"
        >
          <path 
            d={`M-40 ${height/2 + 0.5} Q-30 ${height/2 - 1.5} -20 ${height/2 + 0.5} T0 ${height/2 + 0.5} T20 ${height/2 + 0.5} T40 ${height/2 + 0.5} T60 ${height/2 + 0.5} T80 ${height/2 + 0.5} T100 ${height/2 + 0.5} T120 ${height/2 + 0.5} V${height} H-40z`}
            fill={`url(#${gradientId})`}
          > 
            <animateTransform
              attributeName="transform"
              begin="0s"
              dur={animationDuration}
              type="translate"
              from="0,0"
              to="40,0"
              repeatCount="indefinite" 
            />
          </path>
        </pattern>
      </defs>
      
      {/* Wave text layer */}
      <text 
        textAnchor="middle" 
        x={width/2} 
        y={height * 0.75} 
        fontSize={fontSize} 
        fill={`url(#${waveId})`}  
        fillOpacity={waveOpacity}
      >
        {text}
      </text>
      
      {/* Base text layer */}
      <text 
        textAnchor="middle" 
        x={width/2} 
        y={height * 0.75} 
        fontSize={fontSize} 
        fill={`url(#${gradientId})`} 
        fillOpacity={baseOpacity}
      >
        {text}
      </text>
    </svg>
  );
};

export default ShaderWaveText;