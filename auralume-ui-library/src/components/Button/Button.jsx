import React, { useRef, useEffect } from 'react'
import './Button.css'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  loading = false,
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  glitchText,
  shimmerEffect = 'spin',
  hoverText,
  dataHover,
  svgUrl,
  // New color props
  btnColor,
  btnTextColor,
  btnHoverColor,
  btnBorderColor,
  btnBorderWeight,
  btnTextColorHover,
  neonColor,
  gradientColor1,
  gradientColor2,
  gradientColor3,
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
  
  // Check variant types
  const isShimmerVariant = variant.startsWith('shimmer-')
  const isShadowVariant = variant.startsWith('shadow-')
  const isBgVariant = variant.startsWith('bg-')
  const isBorderVariant = variant.startsWith('border-')
  const isTransformVariant = variant.startsWith('transform-')
  const isGlowTrackVariant = variant === 'glow-track'
  const isCreditsVariant = variant === 'svg-but'
  const isSvgSquareVariant = variant === 'svg-square'
  const isSvgCircleVariant = variant === 'svg-circle'
  const isSvgTransparentVariant = variant === 'svg-transparent'
  const isSvgVariant = isCreditsVariant || isSvgSquareVariant || isSvgCircleVariant || isSvgTransparentVariant
  
  // Build inline styles for CSS custom properties
  const customStyles = {
    ...props.style // Merge existing styles from props
  }
  
  if (btnColor) customStyles['--btn-color'] = btnColor
  if (btnTextColor) customStyles['--btn-textcolor'] = btnTextColor
  if (btnHoverColor) customStyles['--btn-hovercolor'] = btnHoverColor
  if (btnBorderColor) customStyles['--btn-bordercolor'] = btnBorderColor
  if (btnBorderWeight) customStyles['--btn-borderweight'] = btnBorderWeight
  if (btnTextColorHover) customStyles['--btn-textcolor-hover'] = btnTextColorHover
  if (neonColor) customStyles['--neon-color'] = neonColor
  if (gradientColor1) customStyles['--gradient-color-1'] = gradientColor1
  if (gradientColor2) customStyles['--gradient-color-2'] = gradientColor2
  if (gradientColor3) customStyles['--gradient-color-3'] = gradientColor3
  
  // Remove style from props to avoid duplication
  const { style: _, ...restProps } = props
  
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
        
        const ratio = x / rect.width
        const startColor = getComputedStyle(button).getPropertyValue('--button-glow-start').trim()
        const endColor = getComputedStyle(button).getPropertyValue('--button-glow-end').trim()
        
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
  
  const interpolateColor = (color1, color2, factor) => {
    return color1
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
    
    // Special content rendering for specific variants
    if (variant === 'border-corners') {
      return <span className={`${baseClass}__text`}>{children}</span>
    }
    
    if (variant === 'border-sequence') {
      return <span className={`${baseClass}__text`}>{children}</span>
    }
    
    if (variant === 'bg-split') {
      return <span className={`${baseClass}__text`}>{children}</span>
    }
    
    if (variant === 'border-reveal') {
      return <span className={`${baseClass}__text`} style={{ position: 'relative', zIndex: 3 }}>{children}</span>
    }
    
    if (variant === 'transform-double') {
      return (
        <>
          <div className={`${baseClass}__block`}>
            <span></span>
          </div>
          <span className={`${baseClass}__text`} data-name="hover">Hover</span>
          <span className={`${baseClass}__text`} data-name="me">me</span>
        </>
      )
    }
    
    if (variant === 'transform-complex') {
      return <span className={`${baseClass}__text`}>{children}</span>
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
    
    // For default case, just return children directly to preserve their structure
    return children
  }
  
  const renderEffectLayers = () => {
    const effects = []
    
    if (isShimmerVariant) {
      effects.push(<span key="shimmer" className={`${baseClass}__shimmer`}></span>)
    }
    
    if (variant.includes('progress')) {
      effects.push(<span key="progress" className={`${baseClass}__progress-bar`}></span>)
    }
    
    if (variant.includes('pulse')) {
      effects.push(<span key="pulse" className={`${baseClass}__pulse-ring`}></span>)
    }
    
    if (variant.includes('dots')) {
      effects.push(
        <span key="dots" className={`${baseClass}__dots`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      )
    }
    
    if (variant === 'shiny') {
      effects.push(
        <span key="shiny-dots" className={`${baseClass}__shiny-dots`}></span>,
        <span key="shiny-shimmer" className={`${baseClass}__shiny-shimmer`}></span>,
        <span key="shiny-glow" className={`${baseClass}__shiny-glow`}></span>
      )
    }
    
    return effects
  }
  
  const getAdditionalProps = () => {
    const additionalProps = {}
    
    if (dataHover || variant === 'transform-slide' || variant === 'transform-complex' || variant === 'transform-3d') {
      additionalProps['data-hover'] = dataHover || hoverText || 'Click me!'
    }
    
    return additionalProps
  }
  
  return (
    <button 
      ref={buttonRef}
      className={buttonClass}
      disabled={disabled || loading}
      onClick={handleClick}
      style={customStyles}
      {...getAdditionalProps()}
      {...restProps}
    >
      {renderContent()}
      {renderEffectLayers()}
    </button>
  )
}

export default Button