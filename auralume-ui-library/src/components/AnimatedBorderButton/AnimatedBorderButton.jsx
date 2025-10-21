import React, { useRef } from 'react'
import './AnimatedBorderButton.css'

const AnimatedBorderButton = ({ 
  children, 
  size = 'medium', 
  disabled = false, 
  loading = false,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  primaryColor,
  secondaryColor,
  ...props 
}) => {
  const buttonRef = useRef(null)
  
  // Build inline styles for color customization
  const customStyles = {}
  if (primaryColor) {
    customStyles['--primary-color'] = primaryColor
  }
  if (secondaryColor) {
    customStyles['--secondary-color'] = secondaryColor
  }
  
  const baseClass = 'my-ui-btn'
  const sizeClass = `${baseClass}--${size}`
  const disabledClass = disabled ? `${baseClass}--disabled` : ''
  const loadingClass = loading ? `${baseClass}--loading` : ''
  
  const buttonClass = [
    baseClass,
    `${baseClass}--shiny`,
    sizeClass,
    disabledClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ')
  
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
    
    if (icon) {
      return (
        <>
          {iconPosition === 'left' && <span className={`${baseClass}__icon`}>{icon}</span>}
          <span className={`${baseClass}__text`}>{children}</span>
          {iconPosition === 'right' && <span className={`${baseClass}__icon`}>{icon}</span>}
        </>
      )
    }
    
    return <span className={`${baseClass}__text`}>{children}</span>
  }
  
  return (
    <button 
      ref={buttonRef}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={handleClick}
      style={customStyles}
      {...props}
    >
      {renderContent()}
      <span className={`${baseClass}__shiny-shimmer`}></span>
      <span className={`${baseClass}__shiny-glow`}></span>
    </button>
  )
}

export default AnimatedBorderButton