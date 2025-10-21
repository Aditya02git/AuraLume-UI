import { useState, useEffect, useMemo } from 'react';
import { Button } from '../../src';
import { useNavigate } from 'react-router-dom';
import TextMask from '../../src/components/TextMask';

export default function ScrollScaleText() {
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
    const Icon = useMemo(() => {
      return ({ src, alt }) => {
        const [hover, setHover] = useState(false);
  
        return (
          <img
            src={src}
            height="50px"
            width="50px"
            alt={alt}
            style={{
              borderRadius: "8px",
              background: "transparent",
              boxShadow: "0 0 8px 2px #00f5ff, 0 0 12px 4px #ff006e",
              transform: hover ? "scale(1.1)" : "none",
              transition: "0.3s all ease-in-out",
              cursor: "pointer",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          />
        );
      };
    }, []);
  
    const icons = useMemo(() => [
      "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/react.png",
      "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/vue.png",
      "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/angular.png",
      "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/svelte.png",
      "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/vanilla.png",
      "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/three.png",
    ], []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / maxScroll;
      
      // Scale from 1 to 2.5 based on scroll position, then stop
      const newScale = Math.min(1 + (scrollPercentage * 1.5), 2.5);
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-[300vh] bg-white" style={{padding: '20px'}}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <h1 
          className="text-black font-bold text-center px-8 transition-transform duration-100"
          style={{ 
            transform: `scale(${scale})`,
            fontSize: isMobile ? '2rem' : '3rem',
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: isMobile ? '5px' : '15px'
          }}
        >
          Try 
          <TextMask 
        text="AuraLume" 
        backgroundImage="https://cdn.jsdelivr.net/gh/Aditya02git/Textures-v1/inkpaint.jpg"
        fontSize= {isMobile ? "2.5rem" : "4rem"}
        fontWeight="900"
        fallbackColor="#ff6b6b"
        />
          <br />
        </h1>
          <h1 
    style={{ 
      fontSize: isMobile ? '28px' : '60px', 
      textAlign: 'center',
      marginTop: 0,
      lineHeight: isMobile ? '1.3' : '1.2'
    }}
  >
    on your favourite framework
  </h1>
        <div
            style={{
            margin: isMobile ? "1.5rem 0" : "2rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? "20px" : "55px",
            }}
        >
            {icons.map((src, i) => (
            <Icon key={i} src={src} alt={`icon-${i}`} />
            ))}
        </div>
        
        <div 
            style={{
            alignItems: 'center', 
            justifyContent: 'center', 
            display: 'flex', 
            // margin: isMobile ? '1.5rem 0' : '2rem'
            }}
        >
            <Button onClick={() => navigate('/docs/installation')}>
            See All Examples
            </Button>
        </div>
      </div>
    </div>
  );
}