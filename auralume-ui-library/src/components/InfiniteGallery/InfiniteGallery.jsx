import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import './InfiniteGallery.css';

const InfiniteGallery = ({
  images = [],
  rows = 5,
  columns = 9,
  useInertia = true,
  useCenterGrid = true,
  dragResistance = 0.96,
  snapThreshold = 50,
  centerDuration = 700,
  imageSize = 0.35,
  gutter = 0.05,
  className = '',
  theme= '',
  onImageClick = null,
  loadingPlaceholder = true,
  friction = 0.85,
  minVelocity = 0.5,
  enableCursorLerp = false,
  lerpStrength = 0.05,
  lerpSmoothing = 0.1
}) => {
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const animationRef = useRef(null);
  const velocityRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const isCenteringRef = useRef(false);
  
  // Grid management refs
  const gridItemsRef = useRef([]);
  const imgRepRef = useRef([]);
  const rowArrayRef = useRef([]);

  // Cursor lerp refs
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const lerpOffsetRef = useRef({ x: 0, y: 0 });
  const lerpAnimationRef = useRef(null);
  
  const [dimensions, setDimensions] = useState({
    boxWidth: 0,
    boxHeight: 0,
    gutterSize: 0,
    winWidth: 0,
    winHeight: 0,
    spacingX: 0,
    spacingY: 0
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Calculate responsive dimensions
  const calculateDimensions = useCallback(() => {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const boxWidth = winWidth * imageSize;
    const boxHeight = winHeight * imageSize;
    const gutterSize = winWidth * gutter;
    const spacingX = boxWidth + gutterSize;
    const spacingY = boxHeight + gutterSize;
    
    setDimensions({
      boxWidth,
      boxHeight,
      gutterSize,
      winWidth,
      winHeight,
      spacingX,
      spacingY
    });
  }, [imageSize, gutter]);

  // Get image URL from data
  const getImageUrl = useCallback((imageData, index) => {
    if (!imageData) {
      if (loadingPlaceholder) {
        const size = Math.floor(Math.max(dimensions.winWidth, dimensions.winHeight) / 3);
        return `https://picsum.photos/${size}/${size}?random=${index}`;
      }
      return null;
    }
    
    if (typeof imageData === 'string') return imageData;
    return imageData.url || imageData.src || null;
  }, [loadingPlaceholder, dimensions]);

  // Check if image is within viewport bounds (with some tolerance)
  const isImageInViewport = useCallback((x, y) => {
    const { winWidth, winHeight, boxWidth, boxHeight } = dimensions;
    const tolerance = Math.max(boxWidth, boxHeight) * 0.1; // 10% tolerance
    
    return (
      x >= -tolerance && 
      x <= winWidth + tolerance && 
      y >= -tolerance && 
      y <= winHeight + tolerance
    );
  }, [dimensions]);

  // Create grid items
  const createGrid = useCallback(() => {
    if (!containerRef.current || dimensions.boxWidth === 0) return;

    const container = containerRef.current;
    container.innerHTML = '';
    
    gridItemsRef.current = [];
    imgRepRef.current = [];
    rowArrayRef.current = [];

    // Create rows and items
    for (let row = 0; row < rows; row++) {
      const rowElement = document.createElement('div');
      rowElement.className = 'infinite-gallery-row';
      rowElement.style.position = 'absolute';
      
      const rowItems = [];
      
      for (let col = 0; col < columns; col++) {
        const item = document.createElement('div');
        item.className = 'infinite-gallery-image';
        
        const index = row * columns + col;
        const imageData = images.length > 0 ? images[index % images.length] : null;
        const imageUrl = getImageUrl(imageData, index);
        
        // Set initial styles
        item.style.position = 'absolute';
        item.style.width = `${dimensions.boxWidth}px`;
        item.style.height = `${dimensions.boxHeight}px`;
        item.style.backgroundSize = 'cover';
        item.style.backgroundPosition = 'center';
        item.style.backgroundRepeat = 'no-repeat';
        item.style.cursor = onImageClick ? 'pointer' : 'inherit';
        item.style.zIndex = '10'; // Start with positive z-index
        item.style.transition = 'z-index 0.1s ease-out';
        
        if (imageUrl) {
          item.style.backgroundImage = `url(${imageUrl})`;
        }
        
        // Add click handler
        if (onImageClick) {
          item.addEventListener('click', (e) => {
            if (!isDraggingRef.current) {
              e.stopPropagation();
              onImageClick(imageData, index);
            }
          });
        }
        
        // Store grid data
        const gridItem = {
          element: item,
          row,
          col,
          index,
          imageData,
          baseX: col * dimensions.spacingX,
          baseY: row * dimensions.spacingY,
          currentX: col * dimensions.spacingX,
          currentY: row * dimensions.spacingY,
          isVisible: true
        };
        
        rowItems.push(gridItem);
        gridItemsRef.current.push(gridItem);
        rowElement.appendChild(item);
      }
      
      imgRepRef.current.push(rowItems);
      rowArrayRef.current.push(rowElement);
      container.appendChild(rowElement);
    }
    
    setIsInitialized(true);
  }, [dimensions, rows, columns, images, getImageUrl, onImageClick]);

  // Position items in the grid with z-index management
  const positionItems = useCallback(() => {
    if (!isInitialized) return;
    
    const { spacingX, spacingY, winWidth, winHeight } = dimensions;
    const { x: containerX, y: containerY } = positionRef.current;

    // Apply lerp offset to the container position
    const lerpX = enableCursorLerp ? lerpOffsetRef.current.x : 0;
    const lerpY = enableCursorLerp ? lerpOffsetRef.current.y : 0;
    const adjustedContainerX = containerX + lerpX;
    const adjustedContainerY = containerY + lerpY;

    gridItemsRef.current.forEach((gridItem, index) => {
      const { element, row, col } = gridItem;
      
      // Calculate honeycomb offset
      const offsetX = row % 2 === 1 ? dimensions.boxWidth / 2 : 0;
      
      // Base position
      const baseX = col * spacingX + offsetX;
      const baseY = row * spacingY;
      
      // Final position with container offset (including lerp)
      let finalX = baseX + adjustedContainerX;
      let finalY = baseY + adjustedContainerY;
      
      // Handle infinite scrolling with extended viewport for smoother transitions
      const viewportBuffer = Math.max(dimensions.boxWidth, dimensions.boxHeight) * 2;
      
      // Store original position before wrapping
      const originalX = finalX;
      const originalY = finalY;
      
      // Horizontal wrapping
      while (finalX > winWidth + viewportBuffer) {
        finalX -= columns * spacingX;
      }
      while (finalX < -viewportBuffer - dimensions.boxWidth) {
        finalX += columns * spacingX;
      }
      
      // Vertical wrapping
      while (finalY > winHeight + viewportBuffer) {
        finalY -= rows * spacingY;
      }
      while (finalY < -viewportBuffer - dimensions.boxHeight) {
        finalY += rows * spacingY;
      }
      
      // Check if position changed due to wrapping (indicating transition)
      const isTransitioning = (originalX !== finalX || originalY !== finalY);
      
      // Z-index management: hide images during transitions and outside viewport
      const inViewport = isImageInViewport(finalX, finalY);
      
      if (isTransitioning || !inViewport) {
        // Hide behind background during transition or when outside viewport
        element.style.zIndex = '-10';
        gridItem.isVisible = false;
      } else {
        // Show in front when properly positioned and in viewport
        element.style.zIndex = '10';
        gridItem.isVisible = true;
      }
      
      // Apply position with hardware acceleration
      element.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;
      element.style.willChange = isDraggingRef.current ? 'transform' : 'auto';
      
      // Update current position (without lerp offset for calculations)
      gridItem.currentX = finalX - containerX;
      gridItem.currentY = finalY - containerY;
    });
  }, [isInitialized, dimensions, rows, columns, isImageInViewport, enableCursorLerp]);

  // Animation loop
  const animate = useCallback(() => {
    if (isCenteringRef.current) {
      // Smooth centering animation
      const dx = targetPositionRef.current.x - positionRef.current.x;
      const dy = targetPositionRef.current.y - positionRef.current.y;
      
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        positionRef.current = { ...targetPositionRef.current };
        isCenteringRef.current = false;
        positionItems();
        return;
      }
      
      positionRef.current.x += dx * 0.12;
      positionRef.current.y += dy * 0.12;
    } else if (useInertia && !isDraggingRef.current && 
               (Math.abs(velocityRef.current.x) > minVelocity || Math.abs(velocityRef.current.y) > minVelocity)) {
      // Inertia animation
      positionRef.current.x += velocityRef.current.x;
      positionRef.current.y += velocityRef.current.y;
      
      velocityRef.current.x *= friction;
      velocityRef.current.y *= friction;
      
      // Stop when velocity is too small
      if (Math.abs(velocityRef.current.x) < minVelocity) velocityRef.current.x = 0;
      if (Math.abs(velocityRef.current.y) < minVelocity) velocityRef.current.y = 0;
    }
    
    positionItems();
    
    if (isCenteringRef.current || 
        (useInertia && !isDraggingRef.current && 
         (Math.abs(velocityRef.current.x) > minVelocity || Math.abs(velocityRef.current.y) > minVelocity))) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (useCenterGrid && !isDraggingRef.current && !isCenteringRef.current) {
      // Auto-center to nearest image with delay to prevent conflicts
      setTimeout(centerToNearestImage, 200);
    }
  }, [positionItems, useInertia, useCenterGrid, friction, minVelocity]);

  // Lerp animation loop for cursor tracking  
  const animateLerp = useCallback(() => {
    if (!enableCursorLerp) return;
    
    const { winWidth, winHeight } = dimensions;
    if (winWidth === 0 || winHeight === 0) {
      lerpAnimationRef.current = requestAnimationFrame(animateLerp);
      return;
    }
    
    // Calculate normalized mouse position (-1 to 1)
    const normalizedX = (mousePositionRef.current.x / winWidth) * 2 - 1;
    const normalizedY = (mousePositionRef.current.y / winHeight) * 2 - 1;
    
    // Calculate target lerp offset (inverse movement)
    const targetLerpX = -normalizedX * winWidth * lerpStrength;
    const targetLerpY = -normalizedY * winHeight * lerpStrength;
    
    // Smooth interpolation to target
    lerpOffsetRef.current.x += (targetLerpX - lerpOffsetRef.current.x) * lerpSmoothing;
    lerpOffsetRef.current.y += (targetLerpY - lerpOffsetRef.current.y) * lerpSmoothing;
    
    // Update positions with lerp offset
    positionItems();
    
    lerpAnimationRef.current = requestAnimationFrame(animateLerp);
  }, [enableCursorLerp, dimensions, lerpStrength, lerpSmoothing, positionItems]);

  // Mouse move handler for lerp effect
  const handleMouseMoveForLerp = useCallback((e) => {
    if (enableCursorLerp) {
      mousePositionRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    }
  }, [enableCursorLerp]);

  // Center to nearest image
  const centerToNearestImage = useCallback(() => {
    if (!isInitialized) return;
    
    const { winWidth, winHeight } = dimensions;
    const centerX = winWidth / 2;
    const centerY = winHeight / 2;
    
    let closestItem = null;
    let minDistance = Infinity;
    
    // Only consider visible items for centering
    gridItemsRef.current
      .filter(item => item.isVisible)
      .forEach((gridItem) => {
        const rect = gridItem.element.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(itemCenterX - centerX, 2) + Math.pow(itemCenterY - centerY, 2)
        );
        
        if (distance < minDistance) {
          minDistance = distance;
          closestItem = { gridItem, centerX: itemCenterX, centerY: itemCenterY };
        }
      });
    
    if (closestItem && minDistance > snapThreshold) {
      const deltaX = centerX - closestItem.centerX;
      const deltaY = centerY - closestItem.centerY;
      
      targetPositionRef.current = {
        x: positionRef.current.x + deltaX,
        y: positionRef.current.y + deltaY
      };
      
      isCenteringRef.current = true;
      animate();
    }
  }, [isInitialized, dimensions, snapThreshold, animate]);

  // Event handlers
  const handleStart = useCallback((clientX, clientY) => {
    isDraggingRef.current = true;
    startPosRef.current = { x: clientX, y: clientY };
    dragStartRef.current = { ...positionRef.current };
    lastPosRef.current = { x: clientX, y: clientY };
    lastTimeRef.current = Date.now();
    velocityRef.current = { x: 0, y: 0 };
    isCenteringRef.current = false;
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const handleMove = useCallback((clientX, clientY) => {
    if (!isDraggingRef.current) return;
    
    const now = Date.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    
    const dx = clientX - lastPosRef.current.x;
    const dy = clientY - lastPosRef.current.y;
    
    // Calculate velocity
    velocityRef.current.x = (dx / dt) * 16 * dragResistance;
    velocityRef.current.y = (dy / dt) * 16 * dragResistance;
    
    // Update position
    const deltaX = clientX - startPosRef.current.x;
    const deltaY = clientY - startPosRef.current.y;
    
    positionRef.current = {
      x: dragStartRef.current.x + deltaX,
      y: dragStartRef.current.y + deltaY
    };
    
    lastPosRef.current = { x: clientX, y: clientY };
    lastTimeRef.current = now;
    
    positionItems();
  }, [dragResistance, positionItems]);

  const handleEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    
    isDraggingRef.current = false;
    
    if (useInertia && (Math.abs(velocityRef.current.x) > minVelocity || Math.abs(velocityRef.current.y) > minVelocity)) {
      animate();
    } else if (useCenterGrid) {
      setTimeout(centerToNearestImage, 100);
    }
  }, [useInertia, useCenterGrid, animate, centerToNearestImage, minVelocity]);

  // Mouse events
  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  }, [handleStart]);

  const handleMouseMove = useCallback((e) => {
    handleMove(e.clientX, e.clientY);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    handleEnd();
  }, [handleEnd]);

  // Touch events
  const handleTouchStart = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  }, [handleStart]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  }, [handleMove]);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    handleEnd();
  }, [handleEnd]);

  // Initialize
  useEffect(() => {
    calculateDimensions();
    
    const handleResize = () => {
      calculateDimensions();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateDimensions]);

  // Create grid when dimensions are ready
  useEffect(() => {
    if (dimensions.boxWidth > 0) {
      createGrid();
    }
  }, [createGrid, dimensions.boxWidth]);

  // Initial positioning and lerp setup
  useEffect(() => {
    if (isInitialized && dimensions.boxWidth > 0) {
      // Center initial view
      const { winWidth, winHeight, spacingX, spacingY } = dimensions;
      const centerCol = Math.floor(columns / 2);
      const centerRow = Math.floor(rows / 2);
      
      // Calculate center position
      const offsetX = centerRow % 2 === 1 ? dimensions.boxWidth / 2 : 0;
      const centerItemX = centerCol * spacingX + offsetX;
      const centerItemY = centerRow * spacingY;
      
      positionRef.current = {
        x: winWidth / 2 - centerItemX - dimensions.boxWidth / 2,
        y: winHeight / 2 - centerItemY - dimensions.boxHeight / 2
      };
      
      // Initialize lerp effect
      if (enableCursorLerp) {
        // Initialize mouse position to center
        mousePositionRef.current = {
          x: winWidth / 2,
          y: winHeight / 2
        };
        
        // Start lerp animation
        if (lerpAnimationRef.current) {
          cancelAnimationFrame(lerpAnimationRef.current);
        }
        lerpAnimationRef.current = requestAnimationFrame(animateLerp);
      }
      
      positionItems();
    }
  }, [isInitialized, dimensions, positionItems, columns, rows, enableCursorLerp, animateLerp]);

  // Event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse events
    container.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Touch events  
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Add global mouse move listener for lerp effect
    if (enableCursorLerp) {
      document.addEventListener('mousemove', handleMouseMoveForLerp);
    }

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      
      if (enableCursorLerp) {
        document.removeEventListener('mousemove', handleMouseMoveForLerp);
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (lerpAnimationRef.current) {
        cancelAnimationFrame(lerpAnimationRef.current);
      }
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleTouchStart, handleTouchMove, handleTouchEnd, enableCursorLerp, handleMouseMoveForLerp]);

  if (dimensions.boxWidth === 0) {
    return <div className={`infinite-gallery loading ${theme}`}>Loading...</div>;
  }

  return (
    <div className={`infinite-gallery ${theme}`}>
      {/* Background layer - sits between hidden (-z) and visible (+z) images */}
      <div 
        ref={backgroundRef}
        className="infinite-gallery-background"
      />
      
      {/* Grid Container */}
      <div 
        ref={containerRef}
        className="infinite-gallery-container"
        style={{ 
          cursor: isDraggingRef.current ? 'grabbing' : 'grab',
          userSelect: 'none',
          touchAction: 'none'
        }}
      />
    </div>
  );
};

export default InfiniteGallery;