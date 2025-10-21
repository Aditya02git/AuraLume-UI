import { useState, useEffect, useRef } from 'react';
import TextMask from '../../src/components/TextMask';

export default function ScrollFadeText() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the section has been scrolled through
      // 0 = section just entering viewport, 1 = section just leaving viewport
      const scrollStart = -rect.top;
      const scrollEnd = containerHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, scrollStart / scrollEnd));
      
      setScrollProgress(progress);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const sections = [
    { title: "Welcome", text: "Scroll down to see the magic happen" },
  ];

  // Determine which section to show based on progress
  const sectionCount = sections.length;
  const currentSectionIndex = Math.floor(scrollProgress * sectionCount);
  const sectionProgress = (scrollProgress * sectionCount) % 1;
  
  // Calculate opacity: fade in at start, fade out at end
  let opacity = 1;
  if (scrollProgress < 0.05) {
    // Fade in during first 5%
    opacity = scrollProgress / 0.05;
  } else if (scrollProgress > 0.95) {
    // Fade out during last 5%
    opacity = (1 - scrollProgress) / 0.05;
  }

  const activeSection = sections[Math.min(currentSectionIndex, sectionCount - 1)];

  return (
    <div ref={containerRef} className="relative bg-white" style={{ height: '500vh' }}>
      {/* Fixed text container */}
      <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none">
        <div 
          className="text-center text-black px-4 transition-opacity duration-300"
          style={{ opacity, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <h1 className='text-3xl md:text-6xl font-bold mb-6 flex flex-row' style={{alignItems: 'center', gap: '15px'}}>
        <TextMask 
        text="26" 
        backgroundImage="https://cdn.jsdelivr.net/gh/Aditya02git/Textures-v1/inkpaint.jpg"
        fontSize= {isMobile ? "2rem" : "4rem"}
        fontWeight="900"
        fallbackColor="#ff6b6b"
        /><span style={{}}> Modern UI Themes</span></h1>
          <p className="text-2xl opacity-90">{activeSection.text}</p>
          {scrollProgress < 0.1 && (
            <div className="mt-8 animate-bounce">
              <svg className="w-8 h-8 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}