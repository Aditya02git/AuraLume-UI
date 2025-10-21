import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';

const Carousel = ({
  className = '',
  autoPlay = false,
  autoPlayInterval = 6000,
  showDots = false,
  showArrows = false,
  data = [],
  headerColor = '#ffffff',
  textColor = '#ffffff'
}) => {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);
  const slideRef = useRef(null);
  const autoPlayRef = useRef(null);
  const swipeDataRef = useRef({
    startX: null,
    startY: null,
    lock: false
  });
  const dragDataRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    lock: false
  });
  const wheelDataRef = useRef({
    accum: 0,
    lock: false
  });

  // Constants for interaction thresholds
  const SWIPE_THRESHOLD = 36;
  const SWIPE_COOLDOWN = 280;
  const DRAG_THRESHOLD = 34;
  const DRAG_COOLDOWN = 260;
  const WHEEL_THRESHOLD = 90;
  const WHEEL_COOLDOWN = 420;

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && data.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrent(prev => (prev + 1) % data.length);
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, autoPlayInterval, data.length]);

  // Stop auto-play on user interaction
  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  // Navigation function
  const go = (delta) => {
    stopAutoPlay();
    setCurrent(prev => (prev + delta + data.length) % data.length);
  };

  // Touch handlers
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleTouchStart = (e) => {
      if (swipeDataRef.current.lock) return;
      const touch = e.touches[0];
      swipeDataRef.current.startX = touch.clientX;
      swipeDataRef.current.startY = touch.clientY;
    };

    const handleTouchMove = (e) => {
      const { startX, startY } = swipeDataRef.current;
      if (startX === null) return;
      
      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.3) {
        swipeDataRef.current.lock = true;
        go(dx < 0 ? 1 : -1);
        swipeDataRef.current.startX = null;
        swipeDataRef.current.startY = null;
        setTimeout(() => {
          swipeDataRef.current.lock = false;
        }, SWIPE_COOLDOWN);
      }
    };

    const handleTouchEnd = () => {
      swipeDataRef.current.startX = null;
      swipeDataRef.current.startY = null;
    };

    carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
    carousel.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchmove', handleTouchMove);
      carousel.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Mouse drag handlers
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handlePointerDown = (e) => {
      if (dragDataRef.current.lock || e.button !== 0) return;
      dragDataRef.current.dragging = true;
      dragDataRef.current.startX = e.clientX;
      dragDataRef.current.startY = e.clientY;
    };

    const handlePointerMove = (e) => {
      if (!dragDataRef.current.dragging || dragDataRef.current.lock) return;
      
      const dx = e.clientX - dragDataRef.current.startX;
      const dy = e.clientY - dragDataRef.current.startY;

      if (Math.abs(dx) > DRAG_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.3) {
        dragDataRef.current.lock = true;
        dragDataRef.current.dragging = false;
        go(dx < 0 ? 1 : -1);
        setTimeout(() => {
          dragDataRef.current.lock = false;
        }, DRAG_COOLDOWN);
      }
    };

    const handlePointerUp = () => {
      dragDataRef.current.dragging = false;
    };

    carousel.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      carousel.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  // Wheel handler
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleWheel = (e) => {
      const dx = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : 0;
      if (!dx) return;
      e.preventDefault();

      if (wheelDataRef.current.lock) return;

      const scale = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? carousel.clientWidth : 1;
      wheelDataRef.current.accum += dx * scale;

      if (Math.abs(wheelDataRef.current.accum) >= WHEEL_THRESHOLD) {
        go(wheelDataRef.current.accum > 0 ? 1 : -1);
        wheelDataRef.current.accum = 0;
        wheelDataRef.current.lock = true;
        setTimeout(() => {
          wheelDataRef.current.lock = false;
        }, WHEEL_COOLDOWN);
      }
    };

    carousel.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      carousel.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Keyboard handler
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };

  // Render slide content
  const renderSlide = () => {
    if (!data.length) return null;
    
    const slide = data[current];
    
    return (
      <div className="carousel__slide">
        {slide.icon && <i className={slide.icon}></i>}
        {slide.title && <h3>{slide.title}</h3>}
        {slide.text && <p>{slide.text}</p>}
        {slide.description && <div className="carousel__slide-description">{slide.description}</div>}
      </div>
    );
  };

  // Get current slide background styling
  const getCurrentBackground = () => {
    if (!data.length) return {};
    const slide = data[current];
    
    // If slide has an image, use it as background
    if (slide.image) {
      return {
        backgroundImage: `url(${slide.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    
    // If slide has a backgroundColor, create a gradient with it
    if (slide.backgroundColor) {
      return {
        background: `radial-gradient(120% 140% at 50% 100%, ${slide.backgroundColor} 0%, ${adjustColorBrightness(slide.backgroundColor, -20)} 55%, ${adjustColorBrightness(slide.backgroundColor, -40)} 100%)`
      };
    }
    
    // Default gradient if no image or backgroundColor
    return {};
  };

  // Helper function to adjust color brightness
  const adjustColorBrightness = (hex, percent) => {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Parse hex to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Adjust brightness
    const adjustedR = Math.max(0, Math.min(255, r + (r * percent / 100)));
    const adjustedG = Math.max(0, Math.min(255, g + (g * percent / 100)));
    const adjustedB = Math.max(0, Math.min(255, b + (b * percent / 100)));
    
    // Convert back to hex
    return `#${Math.round(adjustedR).toString(16).padStart(2, '0')}${Math.round(adjustedG).toString(16).padStart(2, '0')}${Math.round(adjustedB).toString(16).padStart(2, '0')}`;
  };

  if (!data.length) {
    return <div className={`carousel ${className}`}>No data provided</div>;
  }

  return (
    <section 
      ref={carouselRef}
      className={`carousel ${className}`}
      style={{
        ...getCurrentBackground(),
        '--header-color': headerColor,
        '--text-color': textColor
      }}
    >
      <div className="carousel__stage" aria-hidden="true"></div>
      <div className="carousel__overlay" aria-hidden="true"></div>
      
      <article 
        ref={slideRef}
        className="carousel__panel" 
        tabIndex="0" 
        aria-roledescription="carousel"
        onKeyDown={handleKeyDown}
      >
        {renderSlide()}
      </article>

      {showArrows && data.length > 1 && (
        <>
          <button 
            className="carousel__nav carousel__nav--prev" 
            aria-label="Previous slide"
            onClick={() => go(-1)}
          >
            <i className="fa-solid fa-angle-left" aria-hidden="true"></i>
          </button>
          <button 
            className="carousel__nav carousel__nav--next" 
            aria-label="Next slide"
            onClick={() => go(1)}
          >
            <i className="fa-solid fa-angle-right" aria-hidden="true"></i>
          </button>
        </>
      )}

      {showDots && data.length > 1 && (
        <div className="carousel__progress">
          <div className="carousel__dots">
            {data.map((_, index) => (
              <span
                key={index}
                className={`carousel__dot ${index === current ? 'active' : ''}`}
                onClick={() => {
                  stopAutoPlay();
                  setCurrent(index);
                }}
                role="button"
                tabIndex={0}
                aria-label={`Go to slide ${index + 1}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    stopAutoPlay();
                    setCurrent(index);
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Carousel;