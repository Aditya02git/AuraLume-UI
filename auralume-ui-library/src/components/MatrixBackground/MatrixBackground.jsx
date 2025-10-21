import React, { useEffect, useRef, useMemo } from 'react';
import './MatrixBackground.css';

const MatrixBackground = ({ 
  children,
  className = '',
  animationChance = 0.02
}) => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);

  const animationClasses = useMemo(() => [
    "four-seconds-green",
    "five-seconds-green",
    "six-seconds-green",
    "seven-seconds-green",
  ], []);

  const getRanNum = () => {
    if (Math.random() < 0.15) {
      return Math.random() < 0.5 ? '0' : '1';
    }
    return '';
  };

  const loadElements = () => {
    if (!gridRef.current) return;

    gridRef.current.innerHTML = '';

    const containerRect = containerRef.current.getBoundingClientRect();
    const elementHeight = 24;
    const elementWidth = 14;
    
    const width = Math.max(containerRect.width, 320);
    const height = Math.max(containerRect.height, 480);
    const numCols = Math.max(1, Math.floor(width / elementWidth));
    const numRows = Math.max(1, Math.floor(height / elementHeight));

    gridRef.current.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
    gridRef.current.style.gridTemplateRows = `repeat(${numRows}, ${elementHeight}px)`;

    const fragment = document.createDocumentFragment();
    const animClassLen = animationClasses.length;

    for (let i = 0; i < (numCols * numRows); i++) {
      const span = document.createElement("span");
      
      if (Math.random() < animationChance) {
        const idx = Math.floor(Math.random() * animClassLen);
        span.className = `matrix-char ${animationClasses[idx]}`;
      } else {
        span.className = "matrix-char";
      }

      const num = getRanNum();
      if (num) span.textContent = num;
      
      fragment.appendChild(span);
    }

    gridRef.current.appendChild(fragment);
  };

  useEffect(() => {
    let resizeTimeout;
    
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        loadElements();
      }, 300);
    };

    loadElements();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [animationChance, animationClasses]);

  return (
    <div 
      ref={containerRef}
      className={`matrix-container ${className}`}
    >
      <div ref={gridRef} className="matrix-grid" />
      <div className="matrix-content">
        {children}
      </div>
    </div>
  );
};

export default MatrixBackground;