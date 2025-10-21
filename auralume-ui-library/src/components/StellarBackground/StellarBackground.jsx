import React from 'react';
import './StellarBackground.css';

const StellarBackground = ({ 
  children,
  numberOfStars = 300,
  numberOfMeteors = 5,
  meteorMinDuration = 10,
  meteorMaxDuration = 30,
  className = ''
}) => {
  // Generate random positions for stars
  const generateStarShadows = () => {
    const shadows = [];
    for (let i = 0; i < numberOfStars; i++) {
      const x = Math.floor(Math.random() * 1920);
      const y = Math.floor(Math.random() * 1000);
      shadows.push(`${x}px ${y}px #fff`);
    }
    return shadows.join(', ');
  };

  // Generate meteor configurations
  const generateMeteors = () => {
    const meteors = [];
    for (let i = 0; i < numberOfMeteors; i++) {
      const left = Math.floor(Math.random() * 90) + 9; // 9-99%
      const top = Math.floor(Math.random() * 250) + 50; // 50-300px
      const duration = (Math.floor(Math.random() * 70) / 10 + meteorMinDuration).toFixed(1); // 3-10s by default
      
      meteors.push({
        id: i,
        left: `${left}%`,
        top: `${top}px`,
        duration: `${duration}s`
      });
    }
    return meteors;
  };

  const starShadows = React.useMemo(() => generateStarShadows(), [numberOfStars]);
  const meteors = React.useMemo(() => generateMeteors(), [numberOfMeteors, meteorMinDuration, meteorMaxDuration]);

  return (
    <div className={`stellar-background ${className}`}>
      <div 
        className="stellar-stars" 
        style={{ boxShadow: starShadows }}
      />
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="stellar-meteor"
          style={{
            left: meteor.left,
            top: meteor.top,
            animationDuration: meteor.duration
          }}
        />
      ))}
      <div className="stellar-content">
        {children}
      </div>
    </div>
  );
};

export default StellarBackground;