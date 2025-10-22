import { useState, useEffect } from "react";
import ToggleButton from "../../src/components/ThemeButton";

const ThemeGenerator = ({ isDarkMode, setIsDarkMode }) => {
  const [hue, setHue] = useState(360);
  const [chroma, setChroma] = useState(0.2);
  const [colors, setColors] = useState([]);

  // Helper function to add opacity to OKLCH
  const addOpacityToOKLCH = (oklchString, opacity) => {
    return oklchString.replace(")", ` / ${opacity}%)`);
  };

  // Simple APCACH-like calculations (simplified for this demo)
  const calculateLightness = (targetContrast, isForDark = false) => {
    const baseLightness = isForDark ? 24 : 100;
    const adjustment = (targetContrast / 100) * (isForDark ? 76 : -76);
    return Math.max(0, Math.min(100, baseLightness + adjustment));
  };

  const generateColors = () => {
    const newColors = [];

    // Background
    const background = {
      name: "--background",
      oklchLight: `oklch(100% 0 ${hue})`,
      oklchDark: `oklch(24% ${chroma / 10} ${hue})`,
    };
    newColors.push(background);

    // On Accent (white)
    const onAccent = {
      name: "--on-accent",
      oklchLight: `oklch(100% 0 0)`,
      oklchDark: `oklch(100% 0 0)`,
    };
    newColors.push(onAccent);

    // Accent
    const accent = {
      name: "--accent",
      oklchLight: `oklch(${calculateLightness(70, false)}% 0.15 ${hue})`,
      oklchDark: `oklch(${calculateLightness(70, true)}% 0.15 ${hue})`,
    };
    newColors.push(accent);

    // Accent B (with opacity)
    const accentB = {
      name: "--accent-b",
      oklchLight: addOpacityToOKLCH(accent.oklchLight, 16),
      oklchDark: addOpacityToOKLCH(accent.oklchDark, 24),
    };
    newColors.push(accentB);

    // Gradient backgrounds
    newColors.push({
      name: "--gradient-bg-start",
      oklchLight: addOpacityToOKLCH(accent.oklchLight, 8),
      oklchDark: addOpacityToOKLCH(accent.oklchDark, 12),
    });

    newColors.push({
      name: "--gradient-bg-end",
      oklchLight: addOpacityToOKLCH(accent.oklchLight, 0),
      oklchDark: addOpacityToOKLCH(accent.oklchDark, 0),
    });

    // Text colors
    newColors.push({
      name: "--text-primary",
      oklchLight: `oklch(0% 0 0)`,
      oklchDark: `oklch(100% 0 0)`,
    });

    newColors.push({
      name: "--text-secondary",
      oklchLight: `oklch(${calculateLightness(70, false)}% ${chroma} ${hue})`,
      oklchDark: `oklch(${calculateLightness(70, true)}% ${chroma} ${hue})`,
    });

    newColors.push({
      name: "--text-tertiary",
      oklchLight: `oklch(${calculateLightness(45, false)}% ${chroma} ${hue})`,
      oklchDark: `oklch(${calculateLightness(45, true)}% ${chroma} ${hue})`,
    });

    // Borders
    [1, 2, 3].forEach((level) => {
      const opacity = level === 1 ? 8 : level === 2 ? 16 : 32;
      newColors.push({
        name: `--border-level-${level}`,
        oklchLight: addOpacityToOKLCH(
          `oklch(${calculateLightness(50, false)}% ${chroma * 2} ${hue})`,
          opacity
        ),
        oklchDark: addOpacityToOKLCH(
          `oklch(${calculateLightness(50, true)}% ${chroma * 2} ${hue})`,
          opacity
        ),
      });
    });

    // Surfaces
    [1, 2, 3].forEach((level) => {
      const opacity = level === 1 ? 4 : level === 2 ? 8 : 16;
      newColors.push({
        name: `--surface-level-${level}`,
        oklchLight: addOpacityToOKLCH(
          `oklch(${calculateLightness(50, false)}% ${chroma * 2} ${hue})`,
          opacity
        ),
        oklchDark: addOpacityToOKLCH(
          `oklch(${calculateLightness(50, true)}% ${chroma * 2} ${hue})`,
          opacity
        ),
      });
    });

    setColors(newColors);
  };

  useEffect(() => {
    generateColors();
  }, [hue, chroma]);

  const ThemePanel = ({ isDark }) => {
    const cssVars = {};

    colors.forEach((color) => {
      cssVars[color.name] = isDark ? color.oklchDark : color.oklchLight;
    });

    const gradientStart = cssVars["--gradient-bg-start"] || "transparent";
    const gradientEnd = cssVars["--gradient-bg-end"] || "transparent";

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: window.innerWidth >= 1024 ? "row" : "column",
          backgroundColor: cssVars["--background"],
          color: cssVars["--text-primary"],
          borderRadius: "12px",
        }}
      >
        {/* Color List */}
        <div
          style={{
            width: window.innerWidth >= 1024 ? "380px" : "100%",
            minWidth: window.innerWidth >= 1024 ? "380px" : "auto",
            maxHeight: window.innerWidth >= 1024 ? "100%" : "none",
            overflowY: window.innerWidth >= 1024 ? "auto" : "visible",
            padding: "16px",
            fontSize: "11px",
            fontFamily: "monospace",
            boxSizing: "border-box",
            borderBottom:
              window.innerWidth >= 1024 ? "none" : "1px solid rgba(0,0,0,0.1)",
            borderRight:
              window.innerWidth >= 1024 ? "1px solid rgba(0,0,0,0.1)" : "none",
          }}
        >
          <div
            style={{
              fontWeight: "600",
              marginBottom: "12px",
              fontSize: "14px",
            }}
          >
            Color Palette
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {colors.map((color, idx) => {
              const colorValue = isDark ? color.oklchDark : color.oklchLight;
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    padding: "6px 8px",
                    borderRadius: "4px",
                    backgroundColor: "rgba(0,0,0,0.03)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      minWidth: 0,
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        minWidth: "32px",
                        borderRadius: "4px",
                        backgroundColor: colorValue,
                        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)",
                      }}
                    />
                    <div
                      style={{
                        minWidth: 0,
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "11px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {color.name}
                      </div>
                      <div
                        style={{
                          color: cssVars["--text-secondary"],
                          fontSize: "9px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {colorValue}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Demo Container */}
        <div
          style={{
            flex: 1,
            width: "100%",
            overflowY: window.innerWidth >= 1024 ? "auto" : "visible",
            padding: "16px",
            boxSizing: "border-box",
            background: `linear-gradient(${gradientStart} 0%, ${gradientEnd} 40%)`,
          }}
        >
          {/* Nav */}
          <nav
            style={{
              margin: "0 0 16px 0",
              padding: "16px 20px",
              borderRadius: "12px",
              backgroundColor: cssVars["--background"],
              boxShadow: `0 0 0 1px ${cssVars["--border-level-2"]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <a
                href="#"
                style={{
                  padding: "4px 12px",
                  color: cssVars["--text-primary"],
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                <svg style={{color: cssVars["--text-secondary"]}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                </svg>
              </a>
              <a
                href="#"
                style={{
                  padding: "4px 12px",
                  color: cssVars["--text-primary"],
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                <svg style={{color: cssVars["--text-secondary"]}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z" clip-rule="evenodd"/>
                  <path fill-rule="evenodd" d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z" clip-rule="evenodd"/>
                </svg>
              </a>
              <a
                href="#"
                style={{
                  padding: "4px 12px",
                  color: cssVars["--text-primary"],
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                <svg style={{color: cssVars["--text-secondary"]}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
                </svg>
              </a>
              <a
                href="#"
                style={{
                  padding: "4px 12px",
                  color: cssVars["--text-primary"],
                  textDecoration: "none",
                  fontSize: "14px",
                }}
              >
                <svg style={{color: cssVars["--text-secondary"]}} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12 2a7 7 0 0 0-7 7 3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V9a5 5 0 1 1 10 0v7.083A2.919 2.919 0 0 1 14.083 19H14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 1.732-1h.351a4.917 4.917 0 0 0 4.83-4H19a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3 7 7 0 0 0-7-7Zm1.45 3.275a4 4 0 0 0-4.352.976 1 1 0 0 0 1.452 1.376 2.001 2.001 0 0 1 2.836-.067 1 1 0 1 0 1.386-1.442 4 4 0 0 0-1.321-.843Z" clip-rule="evenodd"/>
                </svg>
              </a>
            </div>
          </nav>

          {/* Hero Section */}
          <div
            style={{
              margin: "0 0 16px 0",
              padding: "24px",
              borderRadius: "12px",
              backgroundColor: cssVars["--background"],
              boxShadow: `0 0 0 1px ${cssVars["--border-level-2"]}`,
            }}
          >
            <h1
              style={{
                fontSize: "clamp(28px, 5vw, 49.5px)",
                fontWeight: "600",
                margin: "0 0 12px 0",
                padding: 0,
                letterSpacing: "-0.03em",
                lineHeight: "1.1",
              }}
            >
              Welcome To AuraLume Playground
            </h1>
            <p
              style={{
                margin: "0 0 16px 0",
                fontSize: "clamp(14px, 2vw, 16.5px)",
                lineHeight: "1.6",
                color: cssVars["--text-secondary"],
              }}
            >
              Use this to make your custom themes and play with it.
            </p>
            <div
              style={{
                display: "flex",
                gap: "8px",
                margin: "0 0 12px 0",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  backgroundColor: cssVars["--accent"],
                  color: cssVars["--on-accent"],
                }}
              >
                Primary
              </button>
              <button
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  backgroundColor: "transparent",
                  color: cssVars["--text-secondary"],
                  boxShadow: `0 0 0 1px ${cssVars["--border-level-3"]}`,
                }}
              >
                Secondary
              </button>
            </div>
            <div
              style={{
                margin: "12px 0 0 0",
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: "13px",
                lineHeight: "1.4",
                backgroundColor: cssVars["--surface-level-2"],
                color: cssVars["--text-tertiary"],
              }}
            >
              Some not very important caption.
            </div>
          </div>

          {/* Two Columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "12px",
            }}
          >
            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                backgroundColor: cssVars["--background"],
                boxShadow: `0 0 0 1px ${cssVars["--border-level-2"]}`,
                color: cssVars["--text-secondary"],
              }}
            >
              <p style={{ margin: "0 0 12px 0", fontWeight: "600" }}>Borders</p>
              <div
                style={{
                  margin: "8px 0",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  boxShadow: `0 0 0 1px ${cssVars["--border-level-1"]}`,
                  fontSize: "13px",
                }}
              >
                Border level 1
              </div>
              <div
                style={{
                  margin: "8px 0",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  boxShadow: `0 0 0 1px ${cssVars["--border-level-2"]}`,
                  fontSize: "13px",
                }}
              >
                Border level 2
              </div>
              <div
                style={{
                  margin: "8px 0",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  boxShadow: `0 0 0 1px ${cssVars["--border-level-3"]}`,
                  fontSize: "13px",
                }}
              >
                Border level 3
              </div>
            </div>
            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                backgroundColor: cssVars["--background"],
                boxShadow: `0 0 0 1px ${cssVars["--border-level-2"]}`,
                color: cssVars["--text-secondary"],
              }}
            >
              <p style={{ margin: "0 0 12px 0", fontWeight: "600" }}>
                Surfaces
              </p>
              <div
                style={{
                  margin: "8px 0",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  backgroundColor: cssVars["--surface-level-1"],
                  fontSize: "13px",
                }}
              >
                Surface level 1
              </div>
              <div
                style={{
                  margin: "8px 0",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  backgroundColor: cssVars["--surface-level-2"],
                  fontSize: "13px",
                }}
              >
                Surface level 2
              </div>
              <div
                style={{
                  margin: "8px 0",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  backgroundColor: cssVars["--surface-level-3"],
                  fontSize: "13px",
                }}
              >
                Surface level 3
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const hueGradient = `linear-gradient(to right,
    oklch(70% ${chroma} 0),
    oklch(70% ${chroma} 60),
    oklch(70% ${chroma} 120),
    oklch(70% ${chroma} 180),
    oklch(70% ${chroma} 240),
    oklch(70% ${chroma} 300),
    oklch(70% ${chroma} 360)
  )`;

  const chromaGradient = `linear-gradient(to right, oklch(70% 0 ${hue}), oklch(70% 0.2 ${hue}))`;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "transparent",
          padding: "12px 16px",
          boxShadow: "0 1px 0 0 rgba(0,0,0,0.08)",
          zIndex: 10,
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Controls Row */}
          <div
            style={{
              display: "flex",
              flexDirection: window.innerWidth < 768 ? "column" : "row",
              gap: "12px",
              alignItems: window.innerWidth < 768 ? "stretch" : "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flex: 1,
              }}
            >
              <label style={{ fontSize: "12px", minWidth: "70px" }}>
                Base tone:
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={hue}
                onChange={(e) => setHue(Number(e.target.value))}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: "8px",
                  borderRadius: "12px",
                  appearance: "none",
                  WebkitAppearance: "none",
                  cursor: "pointer",
                  background: hueGradient,
                  outline: "none",
                  border: "none",
                }}
              />
              <input
                type="number"
                min="0"
                max="360"
                step="1"
                value={hue}
                onChange={(e) => setHue(Number(e.target.value))}
                style={{
                  width: "60px",
                  padding: "5px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "4px",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flex: 1,
              }}
            >
              <label style={{ fontSize: "12px", minWidth: "70px" }}>
                Chroma:
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.001"
                value={chroma}
                onChange={(e) => setChroma(Number(e.target.value))}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: "8px",
                  borderRadius: "12px",
                  appearance: "none",
                  WebkitAppearance: "none",
                  cursor: "pointer",
                  background: chromaGradient,
                  outline: "none",
                  border: "none",
                }}
              />
              <input
                type="number"
                min="0"
                max="0.2"
                step="0.001"
                value={chroma}
                onChange={(e) => setChroma(Number(e.target.value))}
                style={{
                  width: "60px",
                  padding: "5px",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "4px",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              />
            </div>
          </div>

          {/* Theme Toggle */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            {/* Circle */}
            <div
              style={{
                backgroundColor: isDarkMode ? "#000000" : "#ffffff",
                borderRadius: "50%",
                width: "80px",
                height: "80px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                border: isDarkMode ? "1px solid #333" : "1px solid #ddd",
              }}
            />

            {/* Toggle Button inside circle */}
            <div
              style={{
                position: "absolute",
              }}
            >
              <ToggleButton
                height={50}
                width={50}
                applyBodyTheme={true}
                isOn={isDarkMode}
                onChange={() => setIsDarkMode((prev) => !prev)}
                size="small"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Theme Panels Container */}
      <div
        style={{
          paddingTop:
            window.innerWidth < 768
              ? "40px"
              : window.innerWidth < 1024
              ? "120px"
              : "15px",
          width: "100%",
          height:
            window.innerWidth >= 1024
              ? `calc(100vh - ${
                  window.innerWidth < 768
                    ? "40px"
                    : window.innerWidth < 1024
                    ? "120px"
                    : "100px"
                })`
              : "auto",
          overflow: window.innerWidth >= 1024 ? "hidden" : "visible",
        }}
      >
        {/* Single panel with toggle */}
        <div
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          {isDarkMode ? (
            <ThemePanel isDark={true} />
          ) : (
            <ThemePanel isDark={false} />
          )}
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          background: white;
          border: 2px solid rgba(0,0,0,0.1);
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: white;
          border: 2px solid rgba(0,0,0,0.1);
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ThemeGenerator;
