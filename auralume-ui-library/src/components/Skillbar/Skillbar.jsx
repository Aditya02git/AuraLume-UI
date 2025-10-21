import React, { useState, useEffect } from 'react';
import './Skillbar.css';

const Skillbar = ({
  skills = [],
  variant = 'linear',
  title = '',
  animationDuration = 2000,
  color = '#e33de0',
  className = '',
  theme = 'skillbar-light'
}) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const renderLinearSkillbar = () => (
    <div className={`skillbar-container ${theme} ${className}`}>
      {title && <h3 className="skillbar-main-title">{title}</h3>}
      {skills.map((skill, index) => (
        <div className="skillbar-box" key={index}>
          <span className="skillbar-title">{skill.name}</span>
          <div className="skillbar-bar">
            <span
              className={`skillbar-progress ${animated ? 'animated' : ''}`}
              style={{
                width: animated ? `${skill.level}%` : '0%',
                backgroundColor: color,
                transition: `width ${animationDuration}ms ease-out ${index * 100}ms`,
                opacity: 1
              }}
            >
              <span
                className="skillbar-tooltip"
                style={{ backgroundColor: color }}
              >
                {skill.level}%
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCircularSkillbar = () => (
    <div className={`skillbar-circular-container ${theme} ${className}`}>
      {title && <h3 className="skillbar-main-title">{title}</h3>}
      <div className="skillbar-circular-grid">
        {skills.map((skill, index) => {
          const radius = 45;
          const circumference = 2 * Math.PI * radius;
          const offset = circumference - (skill.level / 100) * circumference;

          return (
            <div className="skillbar-circular-box" key={index}>
              <div className="skillbar-circular-wrapper">
                <svg className="skillbar-circular-svg" viewBox="0 0 100 100">
                  <circle
                    className="skillbar-circular-bg"
                    cx="50"
                    cy="50"
                    r={radius}
                  />
                  <circle
                    className={`skillbar-circular-progress ${animated ? 'animated' : ''}`}
                    cx="50"
                    cy="50"
                    r={radius}
                    style={{
                      stroke: color,
                      strokeDasharray: circumference,
                      strokeDashoffset: animated ? offset : circumference,
                      transition: `stroke-dashoffset ${animationDuration}ms ease-out ${index * 100}ms`,
                      opacity: 1
                    }}
                  />
                </svg>
                <div className="skillbar-circular-text">
                  <span className="skillbar-circular-percent">{skill.level}%</span>
                </div>
              </div>
              <span className="skillbar-circular-name">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return variant === 'circular' ? renderCircularSkillbar() : renderLinearSkillbar();
};

export default Skillbar;