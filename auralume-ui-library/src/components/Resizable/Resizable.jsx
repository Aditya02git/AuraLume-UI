import React, { useRef, useCallback, useEffect, useState } from 'react';
import './Resizable.css';

const Resizable = ({
  children,
  directions = ['right', 'bottom'],
  width,
  height,
  minWidth = 50,
  minHeight = 50,
  maxWidth,
  maxHeight,
  flex = false,
  centeredX = false,
  centeredY = false,
  disabled = false,
  handleContent,
  onResizeStart,
  onResize,
  onResizeEnd,
  className = '',
  style = {},
  ...props
}) => {
  const elementRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragState, setDragState] = useState({
    direction: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    axis: null
  });

  const throttleTimer = useRef(null);
  
  const throttle = useCallback((func, delay = 16) => {
    if (throttleTimer.current) {
      clearTimeout(throttleTimer.current);
    }
    throttleTimer.current = setTimeout(func, delay);
  }, []);

  const getFlexBasisProperty = useCallback(() => {
    const style = document.documentElement.style;
    if ('flexBasis' in style) return 'flexBasis';
    if ('webkitFlexBasis' in style) return 'webkitFlexBasis';
    if ('msFlexPreferredSize' in style) return 'msFlexPreferredSize';
    return 'flexBasis';
  }, []);

  const updateSize = useCallback((newWidth, newHeight) => {
    const element = elementRef.current;
    if (!element) return;

    const property = flex ? getFlexBasisProperty() : null;
    
    if (newWidth !== null) {
      const constrainedWidth = Math.max(
        minWidth, 
        maxWidth ? Math.min(newWidth, maxWidth) : newWidth
      );
      
      if (flex && (dragState.axis === 'x')) {
        element.style[property] = `${constrainedWidth}px`;
      } else {
        element.style.width = `${constrainedWidth}px`;
      }
    }
    
    if (newHeight !== null) {
      const constrainedHeight = Math.max(
        minHeight, 
        maxHeight ? Math.min(newHeight, maxHeight) : newHeight
      );
      
      if (flex && (dragState.axis === 'y')) {
        element.style[property] = `${constrainedHeight}px`;
      } else {
        element.style.height = `${constrainedHeight}px`;
      }
    }
  }, [flex, minWidth, minHeight, maxWidth, maxHeight, dragState.axis, getFlexBasisProperty]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !elementRef.current) return;

    const { direction, startX, startY, startWidth, startHeight } = dragState;
    const vx = centeredX ? 2 : 1;
    const vy = centeredY ? 2 : 1;
    
    let newWidth = null;
    let newHeight = null;
    
    const offsetX = startX - e.clientX;
    const offsetY = startY - e.clientY;

    switch (direction) {
      case 'top':
        newHeight = startHeight + (offsetY * vy);
        break;
      case 'bottom':
        newHeight = startHeight - (offsetY * vy);
        break;
      case 'left':
        newWidth = startWidth + (offsetX * vx);
        break;
      case 'right':
        newWidth = startWidth - (offsetX * vx);
        break;
    }

    updateSize(newWidth, newHeight);

    if (onResize) {
      throttle(() => {
        const element = elementRef.current;
        if (element) {
          onResize({
            width: newWidth || startWidth,
            height: newHeight || startHeight,
            direction,
            event: e
          });
        }
      });
    }
  }, [isDragging, dragState, centeredX, centeredY, onResize, throttle, updateSize]);

  const handleMouseUp = useCallback((e) => {
    if (!isDragging) return;

    setIsDragging(false);
    elementRef.current?.classList.remove('no-transition');

    if (onResizeEnd) {
      const element = elementRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        onResizeEnd({
          width: rect.width,
          height: rect.height,
          direction: dragState.direction,
          event: e
        });
      }
    }

    setDragState({
      direction: null,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
      axis: null
    });
  }, [isDragging, dragState.direction, onResizeEnd]);

  const handleMouseDown = useCallback((e, direction) => {
    if (disabled || e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();

    const element = elementRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(element);
    
    const startWidth = parseInt(computedStyle.getPropertyValue('width'), 10);
    const startHeight = parseInt(computedStyle.getPropertyValue('height'), 10);
    const axis = (direction === 'left' || direction === 'right') ? 'x' : 'y';

    setDragState({
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth,
      startHeight,
      axis
    });

    setIsDragging(true);
    element.classList.add('no-transition');

    if (onResizeStart) {
      onResizeStart({
        width: startWidth,
        height: startHeight,
        direction,
        event: e
      });
    }
  }, [disabled, onResizeStart]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, false);
      document.addEventListener('mouseup', handleMouseUp, false);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove, false);
      document.removeEventListener('mouseup', handleMouseUp, false);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Apply initial dimensions
  useEffect(() => {
    if (width !== undefined || height !== undefined) {
      updateSize(width || null, height || null);
    }
  }, [width, height, updateSize]);

  const renderHandle = (direction) => {
    const handleProps = {
      className: `resize-handle rg-${direction}${isDragging && dragState.direction === direction ? ' dragging' : ''}`,
      onMouseDown: (e) => handleMouseDown(e, direction),
      onDragStart: () => false // Prevent default drag behavior
    };

    return (
      <div key={direction} {...handleProps}>
        {handleContent ? (
          <div className="custom-handle">{handleContent}</div>
        ) : (
          <span />
        )}
      </div>
    );
  };

  const combinedStyle = {
    ...style,
    ...(width !== undefined && { width: `${width}px` }),
    ...(height !== undefined && { height: `${height}px` })
  };

  return (
    <div
      ref={elementRef}
      className={`resizable ${className}`}
      style={combinedStyle}
      {...props}
    >
      {children}
      {!disabled && directions.map(renderHandle)}
    </div>
  );
};

export default Resizable;