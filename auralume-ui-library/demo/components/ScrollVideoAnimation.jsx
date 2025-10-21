import React, { useState, useEffect, useRef, useMemo } from 'react';
import Portal from './Portal';


const ScrollImageAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showWelcomeText, setShowWelcomeText] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const sectionRef = useRef(null);
  const imageBoxRefs = useRef([]);
  const sectionTop = useRef(0);
  const sectionHeight = useRef(0);
  const lastScrollRef = useRef(0);
  const ticking = useRef(false);

const imageUrls = [
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-1.png',
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-2.png',
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-3.png',
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-4.png',
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-5.png',
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-6.png',
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-7.png',
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-8.png',
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-9.png',
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-10.png',
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-11.png',
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-12.png',
'https://cdn.jsdelivr.net/gh/Aditya02git/AuraLume-Images/img-13.png',
];

  const generateStartPosition = () => {
    const side = Math.floor(Math.random() * 4);
    let startX, startY;
    
    switch(side) {
      case 0:
        startX = Math.random() * window.innerWidth;
        startY = -600;
        break;
      case 1:
        startX = window.innerWidth + 600;
        startY = Math.random() * window.innerHeight;
        break;
      case 2:
        startX = Math.random() * window.innerWidth;
        startY = window.innerHeight + 600;
        break;
      case 3:
        startX = -600;
        startY = Math.random() * window.innerHeight;
        break;
      default:
        startX = 0;
        startY = 0;
    }
    
    return { x: startX, y: startY };
  };

  const imageBoxes = useMemo(() => 
    imageUrls.map((url, i) => ({
      id: i,
      url,
      startPos: generateStartPosition(),
      startProgress: Math.random() * 0.6,
      duration: 0.3
    })), []
  );

  const centerX = useRef(window.innerWidth / 2);
  const centerY = useRef(window.innerHeight / 2);

  // Direct DOM manipulation for maximum performance
  const updateBoxStyles = (progress) => {
    const startWidth = 800;
    const startHeight = 450;

    imageBoxes.forEach((box, index) => {
      const el = imageBoxRefs.current[index];
      if (!el) return;

      const boxStartProgress = box.startProgress;
      const boxEndProgress = boxStartProgress + box.duration;
      
      let boxProgress = 0;
      if (progress >= boxStartProgress && progress <= boxEndProgress) {
        boxProgress = (progress - boxStartProgress) / box.duration;
      } else if (progress > boxEndProgress) {
        boxProgress = 1;
      }

      if (boxProgress <= 0 || boxProgress >= 1) {
        if (el.style.display !== 'none') {
          el.style.display = 'none';
        }
        return;
      }

      const width = startWidth * (1 - boxProgress);
      const height = startHeight * (1 - boxProgress);
      const currentX = box.startPos.x + (centerX.current - box.startPos.x) * boxProgress;
      const currentY = box.startPos.y + (centerY.current - box.startPos.y) * boxProgress;

      let opacity;
      if (boxProgress < 0.2) {
        opacity = boxProgress / 0.2;
      } else if (boxProgress > 0.8) {
        opacity = (1 - boxProgress) / 0.2;
      } else {
        opacity = 1;
      }

      el.style.display = 'block';
      el.style.opacity = opacity;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.transform = `translate3d(${currentX - width / 2}px, ${currentY - height / 2}px, 0)`;
    });
  };

  useEffect(() => {
    const updateSectionPosition = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        sectionTop.current = rect.top + scrollTop;
        sectionHeight.current = sectionRef.current.scrollHeight;
      }
      centerX.current = window.innerWidth / 2;
      centerY.current = window.innerHeight / 2;
    };

    updateSectionPosition();
    window.addEventListener('resize', updateSectionPosition);
    setTimeout(updateSectionPosition, 100);
    
    return () => window.removeEventListener('resize', updateSectionPosition);
  }, []);

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      if (ticking.current) return;
      
      clearTimeout(scrollTimeout);
      ticking.current = true;
      const currentScroll = window.scrollY;

      requestAnimationFrame(() => {
        if (!sectionRef.current || sectionHeight.current === 0) {
          ticking.current = false;
          return;
        }

        if (Math.abs(currentScroll - lastScrollRef.current) < 1) {
          ticking.current = false;
          return;
        }
        lastScrollRef.current = currentScroll;

        const windowHeight = window.innerHeight;
        const scrollStart = sectionTop.current;
        const scrollEnd = sectionTop.current + sectionHeight.current - windowHeight;
        const scrollRange = scrollEnd - scrollStart;
        
        let progress = 0;
        if (currentScroll >= scrollStart && currentScroll <= scrollEnd) {
          progress = Math.max(0, Math.min(1, (currentScroll - scrollStart) / scrollRange));
        } else if (currentScroll > scrollEnd) {
          progress = 1;
        }
        
        const sectionInViewport = currentScroll >= scrollStart - windowHeight && currentScroll <= scrollEnd;
        
        // Show welcome text only at the very beginning (progress 0 to 0.05)
        if (sectionInViewport && progress >= 0 && progress <= 0.05) {
          if (!showWelcomeText) setShowWelcomeText(true);
          if (showPortal) setShowPortal(false);
        } 
        // Show portal after welcome text fades and throughout the animation (progress 0.05 to 1)
        else if (sectionInViewport && progress > 0.05 && progress < 1) {
          if (showWelcomeText) setShowWelcomeText(false);
          if (!showPortal) setShowPortal(true);
        }
        // Hide everything when outside viewport or animation complete
        else {
          if (showWelcomeText) setShowWelcomeText(false);
          if (showPortal) setShowPortal(false);
        }
        
        updateBoxStyles(progress);
        
        scrollTimeout = setTimeout(() => {
          setScrollProgress(progress);
        }, 50);

        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [imageBoxes, showWelcomeText, showPortal]);

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  return (
    <div 
      ref={sectionRef}
      style={{ 
        background: '#fff', 
        minHeight: '400vh', 
        margin: 0, 
        padding: 0,
        position: 'relative',
        width: '100%',
        overflowX: 'hidden'
      }}
    >
      {/* Welcome Text */}
      <div 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#000',
          fontFamily: 'Arial, sans-serif',
          fontSize: '24px',
          textAlign: 'center',
          opacity: showWelcomeText ? 1 : 0,
          transition: 'opacity 0.5s',
          pointerEvents: 'none',
          zIndex: 1,
          width: '100%'
        }}
      >
        Welcome to{` `}
        <span style={{ color: "#00f5ff", fontWeight: "bold", fontSize: '36px' }}> AuraLume</span>{` `}
        <span
          style={{
            background: "linear-gradient(45deg, #00f5ff, #ff006e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            fontSize: '36px'
          }}
        >
          3D
        </span>
      </div>

      {/* Portal */}
      <div 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: showPortal ? 1 : 0,
          transition: 'opacity 0.5s',
          pointerEvents: 'none',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Portal/>
      </div>

      {/* Animated Images */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 100
        }}
      >
        {imageBoxes.map((box, index) => (
          <div 
            key={box.id} 
            ref={el => imageBoxRefs.current[index] = el}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
              willChange: 'transform, opacity',
              display: 'none',
              backfaceVisibility: 'hidden',
              perspective: 1000,
              contain: 'layout style paint'
            }}
          >
            <img
              src={box.url}
              alt={`Animation ${index + 1}`}
              onLoad={handleImageLoad}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none',
                userSelect: 'none',
                draggable: false
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollImageAnimation;