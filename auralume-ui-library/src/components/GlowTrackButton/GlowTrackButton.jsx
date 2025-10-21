import React, { useRef, useEffect } from 'react'
import './GlowTrackButton.css'

const GlowTrackButton = ({ 
  children, 
  variant = 'glow-track', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  onClick,
  className = '',
  // Customizable theme properties for glow-track variant
  buttonBackground = '#09041e',
  buttonColor = '#fff',
  buttonShadow = 'rgba(33, 4, 104, 0.2)',
  buttonShineLeft = 'rgba(120, 0, 245, 0.8)',
  buttonShineRight = 'rgba(200, 148, 255, 0.9)',
  buttonGlowStart = '#B000E8',
  buttonGlowEnd = '#009FFD',
  ...props 
}) => {
  const buttonRef = useRef(null)
  
  const baseClass = 'my-ui-btn'
  const variantClass = `${baseClass}--${variant}`
  const sizeClass = `${baseClass}--${size}`
  const disabledClass = disabled ? `${baseClass}--disabled` : ''
  const loadingClass = loading ? `${baseClass}--loading` : ''
  
  const buttonClass = [
    baseClass,
    variantClass,
    sizeClass,
    disabledClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ')
  
  // Check if this is the glow-track variant
  const isGlowTrackVariant = variant === 'glow-track'
  
  // Initialize glow tracking effect
  useEffect(() => {
    if (isGlowTrackVariant && buttonRef.current) {
      const button = buttonRef.current
      let gradientElem = button.querySelector('.my-ui-btn__glow-gradient')
      
      if (!gradientElem) {
        gradientElem = document.createElement('div')
        gradientElem.classList.add('my-ui-btn__glow-gradient')
        button.appendChild(gradientElem)
      }
      
      const handlePointerMove = (e) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        // Calculate color mix based on x position
        const ratio = x / rect.width
        const startColor = getComputedStyle(button).getPropertyValue('--button-glow-start').trim()
        const endColor = getComputedStyle(button).getPropertyValue('--button-glow-end').trim()
        
        // Simple color interpolation (you can replace with more sophisticated color mixing)
        const mixedColor = interpolateColor(startColor, endColor, ratio)
        
        button.style.setProperty('--pointer-x', `${x}px`)
        button.style.setProperty('--pointer-y', `${y}px`)
        button.style.setProperty('--button-glow', mixedColor)
      }
      
      button.addEventListener('pointermove', handlePointerMove)
      
      return () => {
        button.removeEventListener('pointermove', handlePointerMove)
      }
    }
  }, [isGlowTrackVariant])
  
  // Simple color interpolation function
  const interpolateColor = (color1, color2, factor) => {
    // This is a simplified version - you might want to use a proper color library
    return color1 // Fallback to first color for now
  }
  
  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e)
    }
  }
  
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <span className={`${baseClass}__spinner`}></span>
          <span className={`${baseClass}__text ${baseClass}__text--loading`}>
            {children}
          </span>
        </>
      )
    }
    
    return <span className={`${baseClass}__text`}>{children}</span>
  }
  
  // Create custom style object with theme properties for glow-track variant
  const customStyle = isGlowTrackVariant ? {
    '--button-background': buttonBackground,
    '--button-color': buttonColor,
    '--button-shadow': buttonShadow,
    '--button-shine-left': buttonShineLeft,
    '--button-shine-right': buttonShineRight,
    '--button-glow-start': buttonGlowStart,
    '--button-glow-end': buttonGlowEnd,
  } : {}
  
  return (
    <button 
      ref={buttonRef}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={handleClick}
      style={customStyle}
      {...props}
    >
      {renderContent()}
    </button>
  )
}

export default GlowTrackButton