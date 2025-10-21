import React, { useEffect, useRef } from 'react';
import './VHS.css';

const VHS = ({ 
  children, 
  showFrame = true, 
  showFilmGrain = true, 
  showStatic = true,
  playText = "Play",
  playTextColor = '#fff',
  sequence = "3",
  tapeNumber = "TAPE 003",
  date = "MAR. 03 2024",
  time = "00:00:00 AM",
  textColor = "#ff0000",
  className = "",
  ...props 
}) => {
  const filmGrainRef = useRef(null);

  useEffect(() => {
    if (!showFilmGrain) return;

    const filmGrainImage = filmGrainRef.current;
    if (!filmGrainImage) return;

    const generateRandomValues = () => {
      const randomX = Math.random() * 30 - 5;
      const randomY = Math.random() * 46 - 12;
      return `translateX(${randomX}%) translateY(${randomY}%) translateZ(0px)`;
    };

    const updateTransform = () => {
      filmGrainImage.style.transform = generateRandomValues();
    };

    updateTransform(); // Initial transform
    const interval = setInterval(updateTransform, 100);

    return () => clearInterval(interval);
  }, [showFilmGrain]);

  return (
    <div className={`vhs-wrapper ${className}`} {...props}>
      {/* VHS Frame UI */}
      {showFrame && (
        <div className="vhs-frame">
          <p className="vhs-play" style={{color: textColor}}>
            {playText}
            <span>
              <svg
                width="20"
                height="24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 22.292V1.781A1 1 0 0 1 1.52.927L19.04 11.61a1 1 0 0 1-.03 1.726L1.49 23.165A1 1 0 0 1 0 22.292Z"
                  fill= {playTextColor}
                />
              </svg>
            </span>
          </p>
          <p className="vhs-sequence" style={{color: textColor}}>{sequence}</p>
          <p className="vhs-year" style={{color: textColor}}>{tapeNumber}</p>
          <p className="vhs-date" style={{color: textColor}}>
            <span>{date}</span>
            <span>{time}</span>
          </p>
          <div className="vhs-tl">
            <div className="vhs-top"></div>
            <div className="vhs-bottom"></div>
          </div>
          <div className="vhs-tr">
            <div className="vhs-top"></div>
            <div className="vhs-bottom"></div>
          </div>
          <div className="vhs-br">
            <div className="vhs-top"></div>
            <div className="vhs-bottom-right"></div>
          </div>
          <div className="vhs-bl">
            <div className="vhs-top"></div>
            <div className="vhs-bottom"></div>
          </div>
          <div className="vhs-vignette"></div>
        </div>
      )}

      {/* VHS Static Video */}
      {showStatic && (
        <div className="vhs-static">
          <video
            src={"https://res.cloudinary.com/dhcl0fsay/video/upload/v1758365149/deadmeat-horror-awards-24/vhs_svgkmp.mp4"}
            loop
            autoPlay
            playsInline
            muted
            style={{
              cursor: 'auto',
              width: '100%',
              height: '100%',
              borderRadius: '0px',
              display: 'block',
              objectFit: 'cover',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              objectPosition: '50% 50%',
            }}
          />
        </div>
      )}

      {/* Film Grain Effect */}
      {showFilmGrain && (
        <div className="vhs-film-grain">
          <div className="vhs-film-grain-container">
            <div 
              className="vhs-film-grain-image" 
              ref={filmGrainRef}
            ></div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="vhs-content">
        {children}
      </div>
    </div>
  );
};

export default VHS;