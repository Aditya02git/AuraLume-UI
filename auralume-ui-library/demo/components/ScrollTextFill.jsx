import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../src';
import { useNavigate } from 'react-router-dom';

export default function ScrollTextFill() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = containerRef.current;
      if (!element) return;

      const elementTop = element.getBoundingClientRect().top;
      const elementHeight = element.clientHeight;
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when element enters, 1 when fully visible
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - elementTop) / (windowHeight + elementHeight)
      ));

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate individual progress for each text line (0-1 range)
  // Color starts changing after 0.5 seconds (0.05 progress) for each line
  const getLineColor = (lineIndex) => {
    const staggerDelay = 0.05; // 0.05 progress = ~0.5 sec delay before color change starts
    const lineSpacing = 0.15; // Space between each line's color change start
    const triggerPoint = staggerDelay + lineIndex * lineSpacing;
    
    if (scrollProgress < triggerPoint) {
      return '#d1d1d1';
    }
    
    const lineProgress = Math.min(1, (scrollProgress - triggerPoint) / 0.2);
    return lineProgress < 0.8 ? '#d1d1d1' : 'gray';
  };

  const getGradientOpacity = (lineIndex) => {
    const staggerDelay = 0.05;
    const lineSpacing = 0.15;
    const triggerPoint = staggerDelay + lineIndex * lineSpacing;
    
    if (scrollProgress < triggerPoint) {
      return '#d1d1d1';
    }
    
    const lineProgress = Math.min(1, (scrollProgress - triggerPoint) / 0.2);
    return lineProgress < 0.6 ? '#d1d1d1' : 'transparent';
  };

  return (
    <div className="w-full min-h-screen bg-white p-8" style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
      <div className="max-w-4xl mx-auto">

        {/* Main heading with scroll fill */}
        <div 
          ref={containerRef}
          className="flex items-center flex-col justify-center min-h-screen"
        >
          <h1
            className="text-6xl md:text-7xl font-bold leading-tight tracking-tight transition-colors duration-500"
            style={{
              color: getLineColor(0),
            }}
          >
            85 Components
          </h1>
          <h1
            className="text-6xl md:text-7xl font-bold leading-tight tracking-tight transition-colors duration-500"
            style={{
              color: getLineColor(1),
            }}
          >
            500+ utility classes
          </h1>            
          <h1
            className="text-6xl md:text-7xl font-bold leading-tight tracking-tight transition-all duration-500"
            style={{
              backgroundImage: `linear-gradient(45deg, #00f5ff, #ff006e)`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: getGradientOpacity(2),
              color: getGradientOpacity(2),
              filter: getGradientOpacity(2) === 'transparent' ? `drop-shadow(0 0 3px #00bfff)` : 'none',
            }}
          >
            Limitless Design
          </h1>
          <h1
            className="text-4xl md:text-4xl font-bold leading-tight tracking-tight transition-colors duration-500"
            style={{
              color: '#d1d1d1',
            }}
          >
            Craft your web aura with Auralume
          </h1>
          <div style={{margin: '40px'}}>
            <Button variant='secondary' onClick={()=> navigate('/components/accordions')}>See All Components</Button>
          </div>
        </div>
      </div>
    </div>
  );
}