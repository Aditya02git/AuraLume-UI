import React, { useRef, useEffect } from 'react';
import './Testimonial.css';

const Testimonial = ({
  testimonials = [],
  variant = 'collage',
  theme = 'testimonial-light',
  showQuotes = true,
  showImages = true,
  className = '',
  color = '#6c757d', // Default gray color
  ...props
}) => {
  const containerRef = useRef(null);

  // Function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Function to calculate luminance and determine if color is light or dark
  const getContrastColor = (hex) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return '#ffffff';
    
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  // Function to lighten/darken color
  const adjustColor = (hex, percent) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    if (percent > 0) {
      const adjust = (value) => {
        const adjusted = value + (255 - value) * (percent / 100);
        return Math.min(255, Math.max(0, Math.round(adjusted)));
      };
      return `#${adjust(rgb.r).toString(16).padStart(2, '0')}${adjust(rgb.g).toString(16).padStart(2, '0')}${adjust(rgb.b).toString(16).padStart(2, '0')}`;
    } else {
      const darken = (value) => {
        const darkened = value * (1 + percent / 100);
        return Math.min(255, Math.max(0, Math.round(darkened)));
      };
      return `#${darken(rgb.r).toString(16).padStart(2, '0')}${darken(rgb.g).toString(16).padStart(2, '0')}${darken(rgb.b).toString(16).padStart(2, '0')}`;
    }
  };

  // Set CSS custom properties based on color prop
  useEffect(() => {
    if (!containerRef.current) return;
    
    const textColor = getContrastColor(color);
    const lightBg = adjustColor(color, 85);
    const mediumBg = adjustColor(color, 70);
    const darkBg = adjustColor(color, -20);
    const darkerBg = adjustColor(color, -35);
    const darkestBg = adjustColor(color, -50);
    const borderColor = adjustColor(color, 60);
    
    // For light theme
    const lightThemeBg = theme === 'testimonial-light' ? adjustColor(color, 90) : adjustColor(color, -80);
    const lightThemeText = theme === 'testimonial-light' ? '#212529' : '#f8f9fa';
    
    // Set CSS custom properties on the container
    containerRef.current.style.setProperty('--testimonial-primary', color);
    containerRef.current.style.setProperty('--testimonial-text', textColor);
    containerRef.current.style.setProperty('--testimonial-bg-1', color);
    containerRef.current.style.setProperty('--testimonial-bg-2', darkBg);
    containerRef.current.style.setProperty('--testimonial-bg-3', lightBg);
    containerRef.current.style.setProperty('--testimonial-bg-4', mediumBg);
    containerRef.current.style.setProperty('--testimonial-bg-5', darkerBg);
    containerRef.current.style.setProperty('--testimonial-border', borderColor);
    containerRef.current.style.setProperty('--testimonial-container-bg', lightThemeBg);
    containerRef.current.style.setProperty('--testimonial-container-text', lightThemeText);
    containerRef.current.style.setProperty('--testimonial-focus-color', color);
  }, [color, theme]);

  // Default testimonials data if none provided
  const defaultTestimonials = [
    {
      id: 1,
      name: 'Kelly Sikkema',
      image: 'https://i.ibb.co/SsyV7sf/testimonials-1.png',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non voluptate numquam doloribus placeat quia natus dolor! Expedita sint nobis vero eligendi, nemo consectetur, voluptas voluptatibus dignissimos in ullam inventore distinctio maxime dolorem omnis.',
      featured: true
    },
    {
      id: 2,
      name: 'Ethan Hoover',
      image: 'https://i.ibb.co/98DW2mz/testimonials-2.png',
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ratione aliquam voluptate alias error consequuntur fugiat suscipit perspiciatis velit dolore.'
    },
    {
      id: 3,
      name: 'Joseph Pearson',
      image: 'https://i.ibb.co/xHsLjSZ/testimonials-3.png',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora unde ducimus ab nisi asperiores quaerat debitis repudiandae officiis vero recusandae deleniti culpa quos deserunt nam quibusdam dicta, ullam nostrum aperiam aliquam dolorem hic.',
      featured: true
    },
    {
      id: 4,
      name: 'Daniel Lincoln',
      image: 'https://i.ibb.co/fqz3jGL/testimonials-4.png',
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ratione aliquam voluptate alias error consequuntur fugiat suscipit perspiciatis velit dolore.'
    },
    {
      id: 5,
      name: 'Mike Austin',
      image: 'https://i.ibb.co/LzdgpPg/testimonials-5.png',
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, fugiat! Odio blanditiis aspernatur nesciunt quo dolorem asperiores atque, non reiciendis exercitationem velit debitis voluptate, cumque excepturi.'
    }
  ];

  const testimonialData = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const renderTestimonialCard = (testimonial, index) => {
    const cardClass = `testimonial-item testimonial-item-${index + 1} ${testimonial.featured ? 'testimonial-featured' : ''}`;
    
    return (
      <div key={testimonial.id} className={cardClass}>
        {showImages && testimonial.image && (
          <img 
            src={testimonial.image} 
            alt={`${testimonial.name}`}
            className="testimonial-image"
          />
        )}
        <div className="testimonial-name">{testimonial.name}</div>
        <div className="testimonial-title">{testimonial.title}</div>
        <div className="testimonial-description">
          {showQuotes && <span className="quote-before">"</span>}
          {testimonial.description}
          {showQuotes && <span className="quote-after">"</span>}
        </div>
      </div>
    );
  };

  const containerClasses = [
    'testimonials',
    `testimonials--${variant}`,
    theme,
    className
  ].filter(Boolean).join(' ');

  return (
    <section ref={containerRef} className={containerClasses} {...props}>
      <div className="testimonials-container">
        {testimonialData.map((testimonial, index) => 
          renderTestimonialCard(testimonial, index)
        )}
      </div>
    </section>
  );
};

export default Testimonial;