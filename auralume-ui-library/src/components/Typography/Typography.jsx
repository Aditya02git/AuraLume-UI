import React, { useEffect, useRef, useState } from 'react';
import './Typography.css';

const Typography = ({ 
  children, 
  variant = 'fadeInUp',
  fontSize = 48,
  color = '#FFFFFF',
  duration = 500,
  stagger = 80,
  trigger = 'mount', // 'mount', 'hover', 'click', 'manual'
  className = '',
  style = {},
  ...props
}) => {
  const containerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayText, setDisplayText] = useState(children);

  const decoderChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*&%$#@!';
  
  const getRandomChar = () => {
    return decoderChars[Math.floor(Math.random() * decoderChars.length)];
  };

  const animateText = () => {
    if (isAnimating || !containerRef.current) return;
    
    setIsAnimating(true);
    const container = containerRef.current;
    const text = typeof children === 'string' ? children : container.textContent;
    
    // Clear existing content
    container.innerHTML = '';
    
    const characters = text.split('');
    
    characters.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'typography-char';
      
      if (char === ' ') {
        span.innerHTML = '&nbsp;';
      }
      
      // Set initial state but don't hide completely
      span.style.opacity = '0';
      span.style.display = 'inline-block'; // Ensure proper display
      container.appendChild(span);
      
      const delay = index * stagger;
      
      switch (variant) {
        case 'fadeInUp':
          span.animate([
            { opacity: 0, transform: `translateY(${fontSize * 0.5}px)` },
            { opacity: 1, transform: 'translateY(0px)' }
          ], {
            duration: duration,
            delay: delay,
            fill: 'forwards',
            easing: 'ease-out'
          }).addEventListener('finish', () => {
            // Ensure final state is maintained
            span.style.opacity = '1';
            span.style.transform = 'translateY(0px)';
          });
          break;
          
        case 'flyInLeft':
          span.animate([
            { opacity: 0, transform: `translateX(-${fontSize * 0.75}px)` },
            { opacity: 1, transform: 'translateX(0px)' }
          ], {
            duration: duration,
            delay: delay,
            fill: 'forwards',
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }).addEventListener('finish', () => {
            span.style.opacity = '1';
            span.style.transform = 'translateX(0px)';
          });
          break;
          
        case 'flyInRight':
          span.animate([
            { opacity: 0, transform: `translateX(${fontSize * 0.75}px)` },
            { opacity: 1, transform: 'translateX(0px)' }
          ], {
            duration: duration,
            delay: delay,
            fill: 'forwards',
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }).addEventListener('finish', () => {
            span.style.opacity = '1';
            span.style.transform = 'translateX(0px)';
          });
          break;
          
        case 'decoder':
          span.style.opacity = '1';
          let cycles = 0;
          const totalCycles = Math.max(5, Math.floor(duration / 80));
          const cycleIntervalTime = duration / totalCycles / 1.5;
          
          setTimeout(() => {
            const intervalId = setInterval(() => {
              span.textContent = getRandomChar();
              cycles++;
              if (cycles >= totalCycles) {
                clearInterval(intervalId);
                span.textContent = char === ' ' ? ' ' : char;
                // Ensure final state
                span.style.opacity = '1';
              }
            }, cycleIntervalTime);
          }, delay);
          break;
          
        case 'typewriter':
          span.animate([
            { opacity: 0 },
            { opacity: 1 }
          ], {
            duration: 50,
            delay: delay,
            fill: 'forwards',
            easing: 'step-start'
          }).addEventListener('finish', () => {
            span.style.opacity = '1';
          });
          break;
          
        case 'zoomIn':
          span.animate([
            { opacity: 0, transform: 'scale(0.5)' },
            { opacity: 1, transform: 'scale(1)' }
          ], {
            duration: duration,
            delay: delay,
            fill: 'forwards',
            easing: 'ease-out'
          }).addEventListener('finish', () => {
            span.style.opacity = '1';
            span.style.transform = 'scale(1)';
          });
          break;
          
        case 'rotateIn':
          span.animate([
            { opacity: 0, transform: 'rotate(180deg) scale(0.5)' },
            { opacity: 1, transform: 'rotate(0deg) scale(1)' }
          ], {
            duration: duration,
            delay: delay,
            fill: 'forwards',
            easing: 'ease-out'
          }).addEventListener('finish', () => {
            span.style.opacity = '1';
            span.style.transform = 'rotate(0deg) scale(1)';
          });
          break;
          
        case 'fadeInDown':
          span.animate([
            { opacity: 0, transform: `translateY(-${fontSize * 0.5}px)` },
            { opacity: 1, transform: 'translateY(0px)' }
          ], {
            duration: duration,
            delay: delay,
            fill: 'forwards',
            easing: 'ease-out'
          }).addEventListener('finish', () => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0px)';
          });
          break;
      }
    });
    
    // Animation complete callback - calculate total animation time
    const totalAnimationTime = (characters.length - 1) * stagger + duration;
    setTimeout(() => {
      setIsAnimating(false);
      setHasAnimated(true);
      setDisplayText(text); // Ensure text is preserved
      
      // Final safety check - make sure all characters are visible
      if (containerRef.current) {
        const spans = containerRef.current.querySelectorAll('.typography-char');
        spans.forEach(span => {
          span.style.opacity = '1';
        });
      }
    }, totalAnimationTime + 100); // Add small buffer
  };

  // Reset animation when children changes
  useEffect(() => {
    setHasAnimated(false);
    setDisplayText(children);
    if (trigger === 'mount') {
      // Small delay to ensure component is mounted
      setTimeout(() => {
        animateText();
      }, 50);
    }
  }, [children]);

  const handleTrigger = () => {
    if (trigger === 'click' || trigger === 'hover') {
      setHasAnimated(false); // Allow re-animation
      animateText();
    }
  };

  const containerProps = {
    ref: containerRef,
    className: `typography-container ${className}`,
    style: {
      fontSize: `${fontSize}px`,
      color: color,
      minHeight: `${fontSize * 1.2}px`, // Prevent layout shift
      display: 'inline-block',
      ...style
    },
    ...props
  };

  if (trigger === 'click') {
    containerProps.onClick = handleTrigger;
    containerProps.style.cursor = 'pointer';
  } else if (trigger === 'hover') {
    containerProps.onMouseEnter = handleTrigger;
  }

  return (
    <span {...containerProps}>
      {/* Show children initially, then let animation take over */}
      {!hasAnimated && trigger === 'manual' ? children : ''}
    </span>
  );
};

// Predefined variants for common use cases
export const Typography1 = (props) => (
  <Typography variant="fadeInUp" fontSize={48} {...props} />
);

export const Typography2 = (props) => (
  <Typography variant="flyInLeft" fontSize={36} {...props} />
);

export const Typography3 = (props) => (
  <Typography variant="decoder" fontSize={32} {...props} />
);

export const Typography4 = (props) => (
  <Typography variant="typewriter" fontSize={28} {...props} />
);

export const Typography5 = (props) => (
  <Typography variant="zoomIn" fontSize={24} {...props} />
);

export const Typography6 = (props) => (
  <Typography variant="rotateIn" fontSize={20} {...props} />
);

export default Typography;