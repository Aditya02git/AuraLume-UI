// LinkPreview.jsx
import React, { useEffect, useRef, useState } from 'react';
import './LinkPreview.css';

const LinkPreview = ({ 
  href, 
  children, 
  prefetch = 'pageload',
  width = 256,
  height = 144,
  scale = 0.25,
  className = '',
  followCursor = true,
  followIntensity = 0.15,
  linkColor = '#e33de0'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const linkRef = useRef(null);
  const parentRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Determine when to load the preview based on prefetch strategy
    switch (prefetch) {
      case 'pageload':
        setShouldLoad(true);
        break;
      
      case 'parenthover':
        const parent = linkRef.current?.parentElement;
        parentRef.current = parent;
        
        const handleParentHover = () => {
          setShouldLoad(true);
        };
        
        parent?.addEventListener('mouseenter', handleParentHover, { once: true });
        
        return () => {
          parent?.removeEventListener('mouseenter', handleParentHover);
        };
      
      case 'none':
        const handleLinkHover = () => {
          setShouldLoad(true);
        };
        
        linkRef.current?.addEventListener('mouseenter', handleLinkHover, { once: true });
        
        return () => {
          linkRef.current?.removeEventListener('mouseenter', handleLinkHover);
        };
      
      default:
        console.warn('Prefetch setting not recognized:', prefetch);
        break;
    }
  }, [prefetch]);

  useEffect(() => {
    if (!followCursor || !linkRef.current) return;

    const handleMouseMove = (e) => {
      const link = linkRef.current;
      const rect = link.getBoundingClientRect();
      
      // Calculate mouse position relative to link center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * followIntensity;
      const deltaY = (e.clientY - centerY) * followIntensity;
      
      setOffset({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    const link = linkRef.current;
    link.addEventListener('mousemove', handleMouseMove);
    link.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      link.removeEventListener('mousemove', handleMouseMove);
      link.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [followCursor, followIntensity]);

  useEffect(() => {
    // Position the wrapper relative to the link
    if (wrapperRef.current && linkRef.current) {
      const link = linkRef.current;
      const wrapper = wrapperRef.current;
      const fontSize = parseInt(window.getComputedStyle(link).fontSize, 10);
      const top = (link.offsetHeight + fontSize) / 2;
      const left = (link.offsetWidth - wrapper.offsetWidth) / 2;
      
      wrapper.style.top = `${top}px`;
      wrapper.style.left = `${left}px`;
    }
  }, []);

  const handleIframeLoad = () => {
    setIsLoaded(true);
  };

  const inversePercent = 100 / scale;

  return (
    <a 
      href={href} 
      ref={linkRef}
      className={`link-preview ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--link-color': linkColor }}
    >
      {children}
      <div 
        ref={wrapperRef}
        className="mini-preview-wrapper"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${offset.x}px, ${offset.y}px)`
        }}
      >
        <div className="mini-preview-loading" style={{ display: isLoaded ? 'none' : 'table' }}>
          Loading...
        </div>
        {shouldLoad && (
          <iframe
            className="mini-preview-frame"
            src={href}
            onLoad={handleIframeLoad}
            title="Link Preview"
            style={{
              width: `${inversePercent}%`,
              height: `${inversePercent}%`,
              transform: `scale(${scale})`,
              backgroundColor: isLoaded ? '#fff' : 'transparent'
            }}
          />
        )}
        <div className="mini-preview-cover" />
      </div>
    </a>
  );
};

export default LinkPreview;