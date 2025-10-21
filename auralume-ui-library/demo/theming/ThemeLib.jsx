import React, { useState } from 'react';

const themes = {
light: {
  background: "#ffffff",
  text: "#000000",
  buttonBg: "#e0e0e0",
  buttonText: "#000000",
  divBg: "#f5f5f5",
  divText: "#000000",
  h1: "#111111",
  progress: "#3b82f6", 
  svgColor: "#000000",
},
dark: {
  background: "#1d232a",
  text: "#ffffff",
  buttonBg: "#191e24",
  buttonText: "#ffffff",
  divBg: "#15191e",
  divText: "#ffffff",
  h1: "#ffffff",
  progress: "#9ca3af", 
  svgColor: "#ffffff",
},
dim: {
  background: "#2a303c",
  text: "#dcdcdc",
  buttonBg: "#9fe88d",
  buttonText: "#ffffff",
  divBg: "#222630",
  divText: "#dcdcdc",
  h1: "#ffffff",
  progress: "#dcdcdc", // emerald tone, fits the muted vibe
  svgColor: "#dcdcdc",
},
night: {
  background: "#1a2338",
  text: "#90959e",
  buttonBg: "#3abdf8",
  buttonText: "#000000",
  divBg: "#0c1425",
  divText: "#f0f0f0",
  h1: "#c9cbd0",
  progress: "#38bdf8", // cool blue, subtle glow for night mode
  svgColor: "#f0f0f0",
},

  business: {
    background: "#f2f2f2",
    text: "#333333",
    buttonBg: "#0073e6",
    buttonText: "#ffffff",
    divBg: "#e6e6e6",
    divText: "#333333",
    h1: "#0073e6",
    progress: "#0073e6",
    svgColor: "#333333",
  },
  summer: {
    background: "#ffebc2",
    text: "#ff6f00",
    buttonBg: "#ffd166",
    buttonText: "#333333",
    divBg: "#fff8e1",
    divText: "#ff6f00",
    h1: "#ff8c42",
    progress: "#ffd166",
    svgColor: "#ff6f00",
  },
  autumn: {
    background: "#ffe8cc",
    text: "#804000",
    buttonBg: "#ff9933",
    buttonText: "#ffffff",
    divBg: "#fff8f0",
    divText: "#804000",
    h1: "#cc6600",
    progress: "#ff9933",
    svgColor: "#804000",
  },
  winter: {
    background: "#c9e2ff",
    text: "#004080",
    buttonBg: "#66b3ff",
    buttonText: "#ffffff",
    divBg: "#e6f2ff",
    divText: "#004080",
    h1: "#3399ff",
    progress: "#3399ff",
    svgColor: "#004080",
  },
  valentine: {
    background: "#ffe5ec",
    text: "#a10043",
    buttonBg: "#ff4c79",
    buttonText: "#ffffff",
    divBg: "#fff0f5",
    divText: "#a10043",
    h1: "#ff4c79",
    progress: "#ff4c79",
    svgColor: "#a10043",
  },
  halloween: {
    background: "#1b1816",
    text: "#ff7518",
    buttonBg: "#ffa733",
    buttonText: "#131616",
    divBg: "#26221f",
    divText: "#ff7518",
    h1: "#cdcdcd",
    progress: "#ff4500",
    svgColor: "#ff7518",
  },
  forest: {
    background: "#2d2727",
    text: "#969494",
    buttonBg: "#1fb854",
    buttonText: "#000000",
    divBg: "#161212",
    divText: "#a4d4a4",
    h1: "#cac9c9",
    progress: "#2e8b57",
    svgColor: "#a4d4a4",
  },
  aqua: {
    background: "#e0f7fa",
    text: "#006064",
    buttonBg: "#00bcd4",
    buttonText: "#ffffff",
    divBg: "#b2ebf2",
    divText: "#006064",
    h1: "#00bcd4",
    progress: "#00bcd4",
    svgColor: "#006064",
  },
  sunset: {
    background: "#ffcccb",
    text: "#800000",
    buttonBg: "#ff7f50",
    buttonText: "#ffffff",
    divBg: "#ffd9d6",
    divText: "#800000",
    h1: "#ff4500",
    progress: "#ff7f50",
    svgColor: "#800000",
  },
  cream: {
    background: "#f8e8e8",
    text: "#3a1c1c",
    buttonBg: "#f9b8b8",
    buttonText: "#3a1c1c",
    divBg: "#faf7f5",
    divText: "#3a1c1c",
    h1: "#5c1a1a",
    progress: "#ff7f7f",
    svgColor: "#3a1c1c",
  },
  honey: {
    background: "#fff7aa",
    text: "#3b2f00",
    buttonBg: "#ffd500",
    buttonText: "#3b2f00",
    divBg: "#fffacd",
    divText: "#3b2f00",
    h1: "#5c3a00",
    progress: "#ffc107",
    svgColor: "#3b2f00",
  },
  coffee: {
    background: "#2b202a",
    text: "#f3e0d8",
    buttonBg: "#6f4e37",
    buttonText: "#ffffff",
    divBg: "#1e151d",
    divText: "#95774f",
    h1: "#c59f61",
    progress: "#6f4e37",
    svgColor: "#f3e0d8",
  },
  caramel: {
    background: "#ffd59a",
    text: "#5c3a21",
    buttonBg: "#e5a55c",
    buttonText: "#ffffff",
    divBg: "#ffe1b3",
    divText: "#5c3a21",
    h1: "#e5a55c",
    progress: "#e5a55c",
    svgColor: "#5c3a21",
  },
  lofi: {
    background: "#f5f0e6",
    text: "#3d2b1f",
    buttonBg: "#b08ea2",
    buttonText: "#ffffff",
    divBg: "#f8f4ef",
    divText: "#3d2b1f",
    h1: "#7a5c48",
    progress: "#b08ea2",
    svgColor: "#3d2b1f",
  },
  fantasy: {
    background: "#f0e6ff",
    text: "#4b0082",
    buttonBg: "#9370db",
    buttonText: "#ffffff",
    divBg: "#e6d6ff",
    divText: "#4b0082",
    h1: "#9370db",
    progress: "#9370db",
    svgColor: "#4b0082",
  },
  retro: {
    background: "#ece3ca",
    text: "#793205",
    buttonBg: "#ff9fa0",
    buttonText: "#801518",
    divBg: "#e3d7b3",
    divText: "#9b673f",
    h1: "#793205",
    progress: "#d98c56",
    svgColor: "#5c3a21",
  },
  "neo-retro": {
    background: "#09002f",
    text: "#747cc2",
    buttonBg: "#f861b4",
    buttonText: "#500323",
    divBg: "#140d3f",
    divText: "#747cc2",
    h1: "#a1b1ff",
    progress: "#ff3c9d",
    svgColor: "#ff6ec7",
  },
  cyberpunk: {
    background: "#fff248",
    text: "#000000",
    buttonBg: "#fa6393",
    buttonText: "#00ffff",
    divBg: "#f7e83a",
    divText: "#ff5861",
    h1: "#000000",
    progress: "#ff00ff",
    svgColor: "#00ffff",
  },
  odyssey: {
    background: "#E7DCC8",
    text: "#704214",
    buttonBg: "#A0805A",
    buttonText: "#F4E8D0",
    divBg: "#F4E8D0",
    divText: "#5c3410",
    h1: "#704214",
    progress: "#A0805A",
    svgColor: "#704214",
  },
  thor: {
    background: "#1a1f2e",
    text: "#e0ffff",
    buttonBg: "#DC143C",
    buttonText: "#ffffff",
    divBg: "#2C3E50",
    divText: "#e0ffff",
    h1: "#FFD700",
    progress: "#00BFFF",
    svgColor: "#FFD700",
  },
  eerie: {
    background: "#0a0a0a",
    text: "#8b7d6b",
    buttonBg: "#2d1810",
    buttonText: "#c9b8a0",
    divBg: "#1a0f0a",
    divText: "#8b7d6b",
    h1: "#4a2c1a",
    progress: "#4a2c1a",
    svgColor: "#6e4228",
  },
  abyzou: {
    background: "#000000",
    text: "#8b0000",
    buttonBg: "#1a0000",
    buttonText: "#ff0000",
    divBg: "#1a0a0a",
    divText: "#8b0000",
    h1: "#ff0000",
    progress: "#8b0000",
    svgColor: "#ff0000",
  },
};

const ThemeLib = ({ isDarkMode, setIsDarkMode }) => {
  const [selectedTheme, setSelectedTheme] = useState(isDarkMode ? 'night' : 'light');
  const [progress, setProgress] = useState(65);

  const currentTheme = themes[selectedTheme];

  const getMajorColors = (theme) => {
    return [
      theme.background,
      theme.text,
      theme.buttonBg,
      theme.divBg,
    ];
  };

  return (
    <div style={{ 
      backgroundColor: currentTheme.background, 
      color: currentTheme.text,
      minHeight: '100vh',
      transition: 'all 0.3s ease',
      borderRadius: '12px',
      border: `2px solid ${currentTheme.divBg}`
    }}>
      {/* Header */}
      <div style={{
        padding: '2rem',
        borderBottom: `2px solid ${currentTheme.divBg}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h1 style={{ 
          color: currentTheme.h1, 
          fontSize: '2.5rem',
          marginBottom: '1rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 512 512"><path fill= {currentTheme.svgColor} d="m441 336.2l-.06-.05c-9.93-9.18-22.78-11.34-32.16-12.92l-.69-.12c-9.05-1.49-10.48-2.5-14.58-6.17c-2.44-2.17-5.35-5.65-5.35-9.94s2.91-7.77 5.34-9.94l30.28-26.87c25.92-22.91 40.2-53.66 40.2-86.59s-14.25-63.68-40.2-86.6c-35.89-31.59-85-49-138.37-49C223.72 48 162 71.37 116 112.11c-43.87 38.77-68 90.71-68 146.24s24.16 107.47 68 146.23c21.75 19.24 47.49 34.18 76.52 44.42a266.17 266.17 0 0 0 86.87 15h1.81c61 0 119.09-20.57 159.39-56.4c9.7-8.56 15.15-20.83 15.34-34.56c.21-14.17-5.37-27.95-14.93-36.84ZM112 208a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm40 135a32 32 0 1 1 32-32a32 32 0 0 1-32 32Zm40-199a32 32 0 1 1 32 32a32 32 0 0 1-32-32Zm64 271a48 48 0 1 1 48-48a48 48 0 0 1-48 48Zm72-239a32 32 0 1 1 32-32a32 32 0 0 1-32 32Z"/></svg> 
          Theme Library
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>
          Explore {Object.keys(themes).length} beautiful themes - Click any theme to preview
        </p>
      </div>

      {/* Main Content */}
      <div style={{ padding: '2rem' }}>
        {/* Theme Grid with 2x2 Color Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {Object.entries(themes).map(([themeName, theme]) => {
            const majorColors = getMajorColors(theme);
            const isSelected = selectedTheme === themeName;

            return (
              <div
                key={themeName}
                onClick={() => setSelectedTheme(themeName)}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                {/* Theme Name */}
                <div style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: '0.5rem',
                  textTransform: 'capitalize',
                  color: currentTheme.text
                }}>
                  {themeName}
                </div>

                {/* 2x2 Color Matrix */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gridTemplateRows: '1fr 1fr',
                  gap: '4px',
                  aspectRatio: '1',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: isSelected ? `4px solid ${currentTheme.progress}` : '4px solid transparent',
                  boxShadow: isSelected 
                    ? `0 0 20px ${currentTheme.progress}` 
                    : '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                  {majorColors.map((color, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Preview Section */}
        <div style={{
          backgroundColor: currentTheme.divBg,
          padding: '2rem',
          borderRadius: '16px',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            color: currentTheme.h1, 
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            textTransform: 'capitalize'
          }}>
            Current Theme: {selectedTheme}
          </h2>

          {/* Sample Content */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: currentTheme.divText, fontSize: '1.3rem', marginBottom: '0.8rem' }}>
              Sample Heading
            </h3>
            <p style={{ color: currentTheme.divText, lineHeight: '1.6', marginBottom: '1rem' }}>
              This is a sample paragraph demonstrating how text looks in the {selectedTheme} theme. 
              The theme applies consistent colors across all UI elements for a cohesive look.
            </p>
          </div>

          {/* Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: currentTheme.buttonBg,
              color: currentTheme.buttonText,
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Primary Button
            </button>
            <button style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              color: currentTheme.text,
              border: `2px solid ${currentTheme.buttonBg}`,
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = currentTheme.buttonBg;
              e.target.style.color = currentTheme.buttonText;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = currentTheme.text;
            }}
            >
              Secondary Button
            </button>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: currentTheme.divText, fontWeight: '600' }}>Progress</span>
              <span style={{ color: currentTheme.divText, fontWeight: '600' }}>{progress}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '12px',
              backgroundColor: currentTheme.background,
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                backgroundColor: currentTheme.progress,
                transition: 'width 0.3s ease',
                borderRadius: '6px'
              }} />
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setProgress(Math.max(0, progress - 10))}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: currentTheme.buttonBg,
                  color: currentTheme.buttonText,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                - 10%
              </button>
              <button
                onClick={() => setProgress(Math.min(100, progress + 10))}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: currentTheme.buttonBg,
                  color: currentTheme.buttonText,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                + 10%
              </button>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <h3 style={{ color: currentTheme.divText, fontSize: '1.3rem', marginBottom: '1rem' }}>
              Color Palette
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '1rem'
            }}>
              {Object.entries(currentTheme).map(([key, value]) => (
                <div key={key} style={{
                  padding: '1rem',
                  backgroundColor: currentTheme.background,
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '100%',
                    height: '60px',
                    backgroundColor: value,
                    borderRadius: '6px',
                    marginBottom: '0.5rem',
                    border: `2px solid ${currentTheme.divText}33`
                  }} />
                  <div style={{ 
                    fontSize: '0.8rem', 
                    color: currentTheme.divText,
                    fontWeight: '600',
                    marginBottom: '0.25rem'
                  }}>
                    {key}
                  </div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: currentTheme.divText,
                    opacity: 0.7,
                    fontFamily: 'monospace'
                  }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeLib;