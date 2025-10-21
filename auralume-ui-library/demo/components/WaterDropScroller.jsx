import React, { useState, useEffect, useRef } from 'react';
import TextMask from '../../src/components/TextMask';

const themes = {
  light: {
    background: "#ffffff",
    text: "#000000",
    buttonBg: "#e0e0e0",
    buttonText: "#000000",
    divBg: "#f5f5f5",
    divText: "#000000",
    h1: "#111111",
    h2: "#222222",
    h3: "#333333",
    progress: "#3b82f6",
    svgColor: "#000000",
    scrollbar: { track: "#ffffff", thumb: "#cccccc" },
  },
  dark: {
    background: "#1d232a",
    text: "#ffffff",
    buttonBg: "#191e24",
    buttonText: "#ffffff",
    divBg: "#15191e",
    divText: "#ffffff",
    h1: "#ffffff",
    h2: "#dddddd",
    h3: "#bbbbbb",
    progress: "#9ca3af",
    svgColor: "#ffffff",
    scrollbar: { track: "#1d232a", thumb: "#333333" },
  },
  dim: {
    background: "#2a303c",
    text: "#dcdcdc",
    buttonBg: "#9fe88d",
    buttonText: "#ffffff",
    divBg: "#222630",
    divText: "#dcdcdc",
    h1: "#ffffff",
    h2: "#cccccc",
    h3: "#aaaaaa",
    progress: "#dcdcdc",
    svgColor: "#dcdcdc",
    scrollbar: { track: "#2a303c", thumb: "#1c1c1c" },
  },
  night: {
    background: "#1a2338",
    text: "#90959e",
    buttonBg: "#3abdf8",
    buttonText: "#000000",
    divBg: "#0c1425",
    divText: "#f0f0f0",
    h1: "#c9cbd0",
    h2: "#c9cbd0",
    h3: "#c9cbd0",
    progress: "#38bdf8",
    svgColor: "#f0f0f0",
    scrollbar: { track: "#1a2338", thumb: "#505664" },
  },
  business: {
    background: "#f2f2f2",
    text: "#333333",
    buttonBg: "#0073e6",
    buttonText: "#ffffff",
    divBg: "#e6e6e6",
    divText: "#333333",
    h1: "#0073e6",
    h2: "#005bb5",
    h3: "#004494",
    progress: "#0073e6",
    svgColor: "#333333",
    scrollbar: { track: "#f2f2f2", thumb: "#cccccc" },
  },
  summer: {
    background: "#ffebc2",
    text: "#ff6f00",
    buttonBg: "#ffd166",
    buttonText: "#333333",
    divBg: "#fff8e1",
    divText: "#ff6f00",
    h1: "#ff8c42",
    h2: "#ff9e57",
    h3: "#ffaf6e",
    progress: "#ffd166",
    svgColor: "#ff6f00",
    scrollbar: { track: "#fff5e1", thumb: "#ffd166" },
  },
  autumn: {
    background: "#ffe8cc",
    text: "#804000",
    buttonBg: "#ff9933",
    buttonText: "#ffffff",
    divBg: "#fff8f0",
    divText: "#804000",
    h1: "#cc6600",
    h2: "#e67300",
    h3: "#ff8000",
    progress: "#ff9933",
    svgColor: "#804000",
    scrollbar: { track: "#ffe8cc", thumb: "#ff9933" },
  },
  winter: {
    background: "#c9e2ff",
    text: "#004080",
    buttonBg: "#66b3ff",
    buttonText: "#ffffff",
    divBg: "#e6f2ff",
    divText: "#004080",
    h1: "#3399ff",
    h2: "#4da6ff",
    h3: "#66b3ff",
    progress: "#3399ff",
    svgColor: "#004080",
    scrollbar: { track: "#e1f0ff", thumb: "#66b3ff" },
  },
  valentine: {
    background: "#ffe5ec",
    text: "#a10043",
    buttonBg: "#ff4c79",
    buttonText: "#ffffff",
    divBg: "#fff0f5",
    divText: "#a10043",
    h1: "#ff4c79",
    h2: "#ff6699",
    h3: "#ff85aa",
    progress: "#ff4c79",
    svgColor: "#a10043",
    scrollbar: { track: "#ffe5ec", thumb: "#ff4c79" },
  },
  halloween: {
    background: "#1b1816",
    text: "#ff7518",
    buttonBg: "#ffa733",
    buttonText: "#131616",
    divBg: "#26221f",
    divText: "#ff7518",
    h1: "#cdcdcd",
    h2: "#cdcdcd",
    h3: "#cdcdcd",
    progress: "#ff4500",
    svgColor: "#ff7518",
    scrollbar: { track: "#1a1a1a", thumb: "#ff4500" },
  },
  forest: {
    background: "#2d2727",
    text: "#969494",
    buttonBg: "#1fb854",
    buttonText: "#000000",
    divBg: "#161212",
    divText: "#a4d4a4",
    h1: "#cac9c9",
    h2: "#cac9c9",
    h3: "#cac9c9",
    progress: "#2e8b57",
    svgColor: "#a4d4a4",
    scrollbar: { track: "#2d2727", thumb: "#2e8b57" },
  },
  aqua: {
    background: "#e0f7fa",
    text: "#006064",
    buttonBg: "#00bcd4",
    buttonText: "#ffffff",
    divBg: "#b2ebf2",
    divText: "#006064",
    h1: "#00bcd4",
    h2: "#26c6da",
    h3: "#4dd0e1",
    progress: "#00bcd4",
    svgColor: "#006064",
    scrollbar: { track: "#e0f7fa", thumb: "#00bcd4" },
  },
  sunset: {
    background: "#ffcccb",
    text: "#800000",
    buttonBg: "#ff7f50",
    buttonText: "#ffffff",
    divBg: "#ffd9d6",
    divText: "#800000",
    h1: "#ff4500",
    h2: "#ff6347",
    h3: "#ff7f50",
    progress: "#ff7f50",
    svgColor: "#800000",
    scrollbar: { track: "#ffcccb", thumb: "#ff7f50" },
  },
  cream: {
    background: "#f8e8e8",
    text: "#3a1c1c",
    buttonBg: "#f9b8b8",
    buttonText: "#3a1c1c",
    divBg: "#faf7f5",
    divText: "#3a1c1c",
    h1: "#5c1a1a",
    h2: "#703333",
    h3: "#8a4d4d",
    progress: "#ff7f7f",
    svgColor: "#3a1c1c",
    scrollbar: { track: "#f8e8e8", thumb: "#f9b8b8" },
  },
  honey: {
    background: "#fff7aa",
    text: "#3b2f00",
    buttonBg: "#ffd500",
    buttonText: "#3b2f00",
    divBg: "#fffacd",
    divText: "#3b2f00",
    h1: "#5c3a00",
    h2: "#705000",
    h3: "#8a6600",
    progress: "#ffc107",
    svgColor: "#3b2f00",
    scrollbar: { track: "#fff7aa", thumb: "#ffd500" },
  },
  coffee: {
    background: "#2b202a",
    text: "#f3e0d8",
    buttonBg: "#6f4e37",
    buttonText: "#ffffff",
    divBg: "#1e151d",
    divText: "#95774f",
    h1: "#c59f61",
    h2: "#7f5c44",
    h3: "#8f6a51",
    progress: "#6f4e37",
    svgColor: "#f3e0d8",
    scrollbar: { track: "#4b3621", thumb: "#6f4e37" },
  },
  caramel: {
    background: "#ffd59a",
    text: "#5c3a21",
    buttonBg: "#e5a55c",
    buttonText: "#ffffff",
    divBg: "#ffe1b3",
    divText: "#5c3a21",
    h1: "#e5a55c",
    h2: "#f0b078",
    h3: "#f4c29a",
    progress: "#e5a55c",
    svgColor: "#5c3a21",
    scrollbar: { track: "#ffd59a", thumb: "#e5a55c" },
  },
  lofi: {
    background: "#f5f0e6",
    text: "#3d2b1f",
    buttonBg: "#b08ea2",
    buttonText: "#ffffff",
    divBg: "#f8f4ef",
    divText: "#3d2b1f",
    h1: "#7a5c48",
    h2: "#8a6b58",
    h3: "#9a7b68",
    progress: "#b08ea2",
    svgColor: "#3d2b1f",
    scrollbar: { track: "#f5f0e6", thumb: "#b08ea2" },
  },
  fantasy: {
    background: "#f0e6ff",
    text: "#4b0082",
    buttonBg: "#9370db",
    buttonText: "#ffffff",
    divBg: "#e6d6ff",
    divText: "#4b0082",
    h1: "#9370db",
    h2: "#a36fd7",
    h3: "#b38ede",
    progress: "#9370db",
    svgColor: "#4b0082",
    scrollbar: { track: "#f0e6ff", thumb: "#9370db" },
  },
  retro: {
    background: "#ece3ca",
    text: "#793205",
    buttonBg: "#ff9fa0",
    buttonText: "#801518",
    divBg: "#e3d7b3",
    divText: "#9b673f",
    h1: "#793205",
    h2: "#793205",
    h3: "#793205",
    progress: "#d98c56",
    svgColor: "#5c3a21",
    scrollbar: { track: "#ece3ca", thumb: "#d98c56" },
  },
  "neo-retro": {
    background: "#09002f",
    text: "#747cc2",
    buttonBg: "#f861b4",
    buttonText: "#500323",
    divBg: "#140d3f",
    divText: "#747cc2",
    h1: "#a1b1ff",
    h2: "#a1b1ff",
    h3: "#a1b1ff",
    progress: "#ff3c9d",
    svgColor: "#ff6ec7",
    scrollbar: { track: "#09002f", thumb: "#ff3c9d" },
  },
  cyberpunk: {
    background: "#fff248",
    text: "#000000",
    buttonBg: "#fa6393",
    buttonText: "#00ffff",
    divBg: "#f7e83a",
    divText: "#ff5861",
    h1: "#000000",
    h2: "#000000",
    h3: "#000000",
    progress: "#ff00ff",
    svgColor: "#00ffff",
    scrollbar: { track: "#fff248", thumb: "#00ffff" },
  },
  odyssey: {
    background: "#E7DCC8",
    text: "#704214",
    buttonBg: "#A0805A",
    buttonText: "#F4E8D0",
    divBg: "#F4E8D0",
    divText: "#5c3410",
    h1: "#704214",
    h2: "#8a5319",
    h3: "#a0651e",
    progress: "#A0805A",
    svgColor: "#704214",
    scrollbar: { track: "#E7DCC8", thumb: "#A0805A" },
  },
  thor: {
    background: "#1a1f2e",
    text: "#e0ffff",
    buttonBg: "#DC143C",
    buttonText: "#ffffff",
    divBg: "#2C3E50",
    divText: "#e0ffff",
    h1: "#FFD700",
    h2: "#00BFFF",
    h3: "#C0C0C0",
    progress: "#00BFFF",
    svgColor: "#FFD700",
    scrollbar: { track: "#1a1f2e", thumb: "#DC143C" },
  },
  eerie: {
    background: "#0a0a0a",
    text: "#8b7d6b",
    buttonBg: "#2d1810",
    buttonText: "#c9b8a0",
    divBg: "#1a0f0a",
    divText: "#8b7d6b",
    h1: "#4a2c1a",
    h2: "#5c3621",
    h3: "#6e4228",
    progress: "#4a2c1a",
    svgColor: "#6e4228",
    scrollbar: { track: "#0a0a0a", thumb: "#2d1810" },
  },
  abyzou: {
    background: "#000000",
    text: "#8b0000",
    buttonBg: "#1a0000",
    buttonText: "#ff0000",
    divBg: "#1a0a0a",
    divText: "#8b0000",
    h1: "#ff0000",
    h2: "#cc0000",
    h3: "#990000",
    progress: "#8b0000",
    svgColor: "#ff0000",
    scrollbar: { track: "#000000", thumb: "#8b0000" },
  },
    "": {
    background: "#ffffff",
  },
};

const themeNames = Object.keys(themes);

const themeDescriptions = {
  light: "A clean and minimalist theme with crisp whites and subtle grays. Perfect for those who prefer clarity and simplicity in their digital workspace.",
  dark: "Embrace the shadows with this sleek dark theme. Easy on the eyes and perfect for late-night browsing with its sophisticated gray palette.",
  dim: "A balanced middle ground between light and dark. Soft colors reduce eye strain while maintaining excellent readability.",
  night: "Deep blue tones create a serene nocturnal atmosphere. Ideal for focused work sessions when the world outside is quiet.",
  business: "Professional and polished with bold blue accents. Commands attention while maintaining a corporate-friendly aesthetic.",
  summer: "Warm golden hues evoke sunny days and sandy beaches. Bring the joy of summer into your digital experience.",
  autumn: "Rich orange and amber tones capture the essence of fall. Cozy and inviting like a crisp October afternoon.",
  winter: "Cool blue shades reminiscent of frost and snow. Fresh and invigorating like a winter morning.",
  valentine: "Soft pinks and romantic reds celebrate love and tenderness. Sweet and charming for the romantics at heart.",
  halloween: "Dark and mysterious with vibrant orange accents. Spooky yet playful, perfect for the Halloween spirit.",
  forest: "Deep greens and earthy tones connect you with nature. Peaceful and grounding like a walk through the woods.",
  aqua: "Refreshing cyan and turquoise tones evoke tropical waters. Cool and calming like a dive into the ocean.",
  sunset: "Coral and warm red hues capture the magic of dusk. Vibrant and energetic like the sky at golden hour.",
  cream: "Soft beige and warm neutrals create a gentle, comforting ambiance. Elegant and timeless like a vintage photograph.",
  honey: "Golden yellows bring warmth and cheerfulness. Sweet and bright like sunshine in a bottle.",
  coffee: "Rich browns and warm tones for coffee lovers. Cozy and aromatic like your favorite café.",
  caramel: "Smooth golden browns with buttery highlights. Indulgent and warm like your favorite dessert.",
  lofi: "Muted pastels create a relaxed, nostalgic vibe. Perfect for study sessions with lofi beats.",
  fantasy: "Mystical purples and lavenders spark imagination. Enchanting and dreamy like a fairy tale.",
  retro: "Vintage colors bring back memories of yesteryear. Nostalgic and charming with old-school appeal.",
  "neo-retro": "Neon pinks and deep purples merge past and future. Bold and electric like an 80s cyberpunk dream.",
  cyberpunk: "Bright yellows and hot pinks create digital chaos. Futuristic and rebellious like a neon-lit dystopia.",
  odyssey: "Warm earth tones inspire ancient adventures. Journey through time with this classical palette.",
  thor: "Mythical blues and golds channel the god of thunder. Powerful and legendary like Asgard itself.",
  eerie: "Dark browns and muted tones create an unsettling atmosphere. Mysterious and haunting like an abandoned manor.",
  abyzou: "Deep reds on black evoke ancient darkness. Intense and dramatic with an edge of danger.",
  "": "The default canvas awaits your creative vision. Pure and pristine like a blank page."
};

export default function WaterDropScroller() {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentTheme = themes[themeNames[currentThemeIndex]];
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isFixed, setIsFixed] = useState(false);
  const containerRef = useRef(null);
  const [componentTop, setComponentTop] = useState(0);
  

  useEffect(() => {
    // Get the initial position of the component
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setComponentTop(rect.top + scrollTop);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrolled = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Check if component has reached the top of viewport
      const hasReachedTop = scrolled >= componentTop;
      
      if (!hasReachedTop) {
        // Component hasn't reached its position yet
        setIsFixed(false);
        setCurrentThemeIndex(0);
        setScrollProgress(0);
        return;
      }
      
      // Calculate scroll distance within the component section
      const scrollWithinComponent = scrolled - componentTop;
      
      // Calculate which theme section we're in
      const themeIndex = Math.floor(scrollWithinComponent / windowHeight);
      const cappedIndex = Math.min(themeIndex, themeNames.length - 1);
      
      // Calculate progress within current theme (0 to 1)
      const progressWithinTheme = (scrollWithinComponent % windowHeight) / windowHeight;
      
      // Check if we're still within the component's scroll range
      const totalComponentHeight = themeNames.length * windowHeight;
      const shouldBeFixed = scrollWithinComponent < totalComponentHeight;
      
      setCurrentThemeIndex(cappedIndex);
      setScrollProgress(progressWithinTheme);
      setIsFixed(shouldBeFixed);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [componentTop]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <style>{`
        .water-drop-app-container {
          width: 100%;
          min-height: ${themeNames.length * 100}vh;
          background: ${currentTheme.background};
          transition: background 0.5s ease;
          position: relative;
        }
        .water-drop-app-container .water-drop-fixed-content {
          position: ${isFixed ? 'fixed' : 'relative'};
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: ${isMobile ? 'column' : 'row'};
          justify-content: ${isMobile ? 'center' : 'space-between'};
          align-items: center;
          gap: 2rem;
          padding: ${isMobile ? '2rem' : '0 15%'};
          box-sizing: border-box;
        }
        .water-drop-app-container .water-drop-theme-name {
          font-size: ${isMobile ? '2.5rem' : '4rem'};
          font-weight: bold;
          color: ${currentTheme.text};
          text-transform: capitalize;
          transition: color 0.5s ease;
          font-family: system-ui, -apple-system, sans-serif;
          text-align: ${isMobile ? 'center' : 'right'};
          margin-bottom: 1rem;
        }
        .water-drop-app-container .water-drop-theme-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: ${isMobile ? '90%' : '500px'};
        }
        .water-drop-app-container .water-drop-theme-description {
          color: ${currentTheme.text};
          font-size: ${isMobile ? '1rem' : '1.1rem'};
          line-height: 1.6;
          text-align: ${isMobile ? 'center' : 'right'};
          padding: 1.5rem;
          background: ${currentTheme.divBg};
          border-radius: 12px;
          transition: all 0.5s ease;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .water-drop-app-container .water-drop-animation-container {
          width: 250px;
          height: 250px;
          position: relative;
          border-radius: 50%;
          overflow: hidden;
          filter: url(#water-drop-inWater);
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          flex-shrink: 0;
        }
        .water-drop-app-container .water-drop-stuck {
          filter: url(#water-drop-stuck);
        }
        .water-drop-app-container .water-drop-inWater {
          filter: url(#water-drop-inWater);
        }
        .water-drop-app-container .water-drop-drop {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .water-drop-app-container .water-drop-drop::after {
          content: "";
          width: 30px;
          height: 30px;
          background: linear-gradient(${currentTheme.progress}, ${currentTheme.buttonBg});
          box-shadow: 0 0 50px ${currentTheme.buttonBg};
          position: absolute;
          border-radius: 50%;
          transition: background 0.5s ease, box-shadow 0.5s ease;
        }
        .water-drop-app-container .water-drop-water {
          width: 100%;
          height: 120px;
          position: absolute;
          left: 0;
          bottom: -15px;
          background: linear-gradient(${currentTheme.progress}, ${currentTheme.buttonBg});
          border-radius: 20px 20px 0 0;
          filter: url(#water-drop-inWater);
          transition: background 0.5s ease;
        }
        .water-drop-app-container .water-drop-jump.water-drop-drop::after {
          width: 20px;
          height: 20px;
          left: calc(50% - 10px);
          animation: none;
        }
        .water-drop-app-container .water-drop-stuck.water-drop-drop::after {
          top: 0;
          left: calc(50% - 15px);
          animation: none;
        }
        .water-drop-app-container .water-drop-toDrop.water-drop-drop::after {
          left: calc(50% - 15px);
          animation: none;
        }
        .water-drop-app-container .water-drop-inWater.water-drop-drop::after {
          width: 74px;
          height: 74px;
          box-shadow: 0 0 60px ${currentTheme.buttonBg};
        }
        .water-drop-app-container .water-drop-inWater.water-drop-drop:nth-of-type(1)::after {
          animation: none;
        }
        .water-drop-app-container .water-drop-inWater.water-drop-drop:nth-of-type(2)::after {
          animation: none;
        }
        .water-drop-app-container .water-drop-progress-indicator {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          color: ${currentTheme.text};
          font-size: 1.2rem;
          font-family: system-ui, -apple-system, sans-serif;
          transition: color 0.5s ease;
        }
        .water-drop-app-container svg {
          width: 0;
          height: 0;
          position: absolute;
        }
      `}</style>

      <div className="water-drop-app-container" ref={containerRef}>
        <div className="water-drop-fixed-content">
          <div className="water-drop-animation-container">
            <div className="water-drop-stuckDrop">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="water-drop-drop water-drop-stuck"
                  style={{
                    transform: `scale(${scrollProgress < 0.3 ? 1.3 - scrollProgress * 1.33 : 0.9 + (scrollProgress - 0.3) * 0.57})`
                  }}
                ></div>
              ))}
            </div>
            <div className="water-drop-toDropDrops">
              <div 
                className="water-drop-drop water-drop-toDrop"
                style={{
                  top: `${scrollProgress < 0.5 ? scrollProgress * 120 : 60}%`,
                  transform: `scale(${scrollProgress < 0.5 ? 1.6 - scrollProgress * 1.8 : 0.7})`
                }}
              ></div>
            </div>
            <div className="water-drop-inWaterDrops">
              <div 
                className="water-drop-drop water-drop-inWater"
                style={{
                  top: `${scrollProgress < 0.2 ? 60 : scrollProgress < 0.38 ? 60 - (scrollProgress - 0.2) * 55.5 : 50 + (scrollProgress - 0.38) * 16.1}%`,
                  left: `calc(50% - 37px + ${scrollProgress > 0.2 ? (scrollProgress - 0.2) * 162.5 : 0}%)`
                }}
              ></div>
              <div 
                className="water-drop-drop water-drop-inWater"
                style={{
                  top: `${scrollProgress < 0.2 ? 60 : scrollProgress < 0.38 ? 60 - (scrollProgress - 0.2) * 55.5 : 50 + (scrollProgress - 0.38) * 16.1}%`,
                  left: `calc(50% - 37px - ${scrollProgress > 0.2 ? (scrollProgress - 0.2) * 87.5 : 0}%)`
                }}
              ></div>
              <div 
                className="water-drop-drop water-drop-jump"
                style={{
                  top: `${scrollProgress < 0.3 ? 60 : scrollProgress < 0.5 ? 60 - (scrollProgress - 0.3) * 150 : 30 + (scrollProgress - 0.5) * 60}%`
                }}
              ></div>
            </div>
            <div className="water-drop-water"></div>
          </div>

          <div className="water-drop-theme-info">
            <h1 className="water-drop-theme-name">{themeNames[currentThemeIndex]}</h1>
            {themeNames[currentThemeIndex] !== "" && (
              <div className="water-drop-theme-description" style={{textAlign: 'left'}}>
                {themeDescriptions[themeNames[currentThemeIndex]]}
              </div>
            )}
          </div>

        </div>

        <svg>
          <filter id="water-drop-stuck">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            <feColorMatrix values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -3
            " />
          </filter>
        </svg>
        <svg>
          <filter id="water-drop-toDrop">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            <feColorMatrix values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -10
            " />
          </filter>
        </svg>
        <svg>
          <filter id="water-drop-inWater">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            <feColorMatrix values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 20 -5
            " />
          </filter>
        </svg>
      </div>
    </>
  );
}