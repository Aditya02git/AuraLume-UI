import React, { useState, useEffect } from "react";
import NoiseBackground from "../../src/components/NoiseBackground";

// Preview Toggle Component
const PreviewToggle = ({ activeTab, onTabChange, isDarkMode }) => {
  const tabs = ["Preview", "TSX/JSX"];

  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
        padding: "4px",
        borderRadius: "8px",
        marginBottom: "16px",
        width: "fit-content",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: activeTab === tab ? "#e33de0" : "transparent",
            color:
              activeTab === tab ? "white" : isDarkMode ? "#94a3b8" : "#64748b",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// Code Display Component
const CodeDisplay = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundColor: "#1e293b",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          backgroundColor: "#334155",
          borderBottom: "1px solid #475569",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ display: "flex", gap: "4px" }}>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#ef4444",
              }}
            ></div>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#f59e0b",
              }}
            ></div>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10b981",
              }}
            ></div>
          </div>
          <span
            style={{
              color: "#94a3b8",
              fontSize: "14px",
              fontWeight: "500",
              marginLeft: "8px",
            }}
          >
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            padding: "6px 12px",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          {copied ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                style={{ color: "#43eb34" }}
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 11.917 9.724 16.5 19 7.5"
                />
              </svg>
              <p>Copied</p>
            </div>
          ) : (
            <div title="Copy">
              <svg
                style={{ color: "#bdbdbd" }}
                class="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          )}
        </button>
      </div>
      <pre
        style={{
          padding: "16px",
          margin: 0,
          color: "#e2e8f0",
          fontSize: "14px",
          lineHeight: "1.5",
          overflow: "auto",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

const NoiseBackgroundSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState("Preview");

  return (
    <section style={{ marginBottom: "4rem" }}>
      <h2
        style={{
          marginBottom: "2rem",
          color: isDarkMode ? "#f472b6" : "#000000",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {title}
      </h2>

      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode}/>

      {activeTab === "Preview" && (
        <div
          style={{
            padding: "32px",
            backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
            borderRadius: "12px",
            border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
            transition: "all 0.3s ease",
          }}
        >
          {children}
        </div>
      )}

      {activeTab === "TSX/JSX" && (
        <CodeDisplay code={jsxCode} language="TSX/JSX" />
      )}
    </section>
  );
};

const NoiseBackgroundSection = ({isDarkMode, setIsDarkMode}) => {

  const containerStyle = {
    padding: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    background: "transparent",
    color: isDarkMode ? "#e2e8f0" : "#1a1a1a",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  };

  // JSX code for basic spotlight
  const noiseJSX = `            <NoiseBackground>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh'}}>
            <h1 style={{ 
                 
                fontSize: '4rem', 
                fontWeight: '600',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(255,255,255,0.5)',
                color: 'white'
            }}>
                Noise Background
            </h1>
            <p style={{ 
                fontSize: '1.5rem', 
                textAlign: 'center',
                marginTop: '2rem',
                color: 'white'
            }}>
                Noise backgrounds add texture and realism to your design
            </p>
            </div>
            </NoiseBackground>`;

            const [copied, setCopied] = useState(false);

              const handleCopy = () => {
    navigator.clipboard.writeText("npm install simplex-noise");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
          borderRadius: "12px",
          border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
          overflow: "hidden",
          marginBottom: "25px",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: isDarkMode ? "#334155" : "#f8fafc",
                  borderBottom: "1px solid #bababa",
                }}
              >
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Prop
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Default
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {[
          { prop: "children", type: "ReactNode", default: "—", desc: "Content or elements rendered inside the noise background overlay." },
          { prop: "speed", type: "number", default: "0.01", desc: "Animation speed of the noise effect. Higher values increase motion intensity." },
          { prop: "scaleX", type: "number", default: "100", desc: "Horizontal scaling factor of the noise texture pattern." },
          { prop: "scaleY", type: "number", default: "100", desc: "Vertical scaling factor of the noise texture pattern." },
          { prop: "size", type: "number", default: "20", desc: "Pixel size of each noise cell in the generated pattern." },
          { prop: "radius", type: "number", default: "0", desc: "Corner radius of the noise overlay for rounded visual effects." },
          { prop: "hueBase", type: "number", default: "258", desc: "Base hue value in the HSL color model controlling overall tone." },
          { prop: "hueRange", type: "number", default: "10", desc: "Range of hue variation across the noise texture." },
          { prop: "saturationBase", type: "number", default: "68", desc: "Base saturation level for the noise color palette." },
          { prop: "saturationRange", type: "number", default: "0", desc: "Range of variation for saturation values across the noise texture." },
          { prop: "lightnessBase", type: "number", default: "58", desc: "Base lightness value for the noise color tones." },
          { prop: "lightnessRange", type: "number", default: "0", desc: "Range of lightness variation in the noise texture." },
          { prop: "backgroundColor", type: "string", default: "'hsl(258, 62%, 7%)'", desc: "Background fill color beneath the animated noise texture." },
          { prop: "interactiveColor", type: "string", default: "'hsl(180, 80%, 70%)'", desc: "Highlight color that appears interactively based on cursor proximity." },
          { prop: "interactiveRadius", type: "number", default: "150", desc: "Radius in pixels that defines the area affected by interactive highlights." },
          { prop: "interactiveIntensity", type: "number", default: "1.5", desc: "Intensity multiplier for interactive highlight brightness." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class name for additional styling of the container." },
          { prop: "seed", type: "number", default: "10000", desc: "Seed value used for randomizing the noise pattern generation." },
        ].map((row, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: `1px solid ${
                      isDarkMode ? "#475569" : "#e2e8f0"
                    }`,
                    backgroundColor:
                      index % 2 === 0
                        ? "transparent"
                        : isDarkMode
                        ? "#1e293b50"
                        : "#f8fafc50",
                  }}
                >
                  <td
                    style={{
                      padding: "16px",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#fbbf24" : "#d97706",
                    }}
                  >
                    {row.prop}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#8b5cf6" : "#7c3aed",
                    }}
                  >
                    {row.type}
                  </td>
                  <td
                    style={{
                      padding: "16px",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#06b6d4" : "#0891b2",
                    }}
                  >
                    {row.default}
                  </td>
                  <td style={{ padding: "16px" }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
              <h2  
        style={{
          marginBottom: "1rem",
          color: "red",
          fontSize: "20px",
          fontWeight: "semi-bold",
        }}
      >
        * Required Dependencies
      </h2>
      <div
        style={{
          backgroundColor: isDarkMode ? "#1e293b" : "#f3f6f9",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "25px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <code
            style={{
              fontSize: "14px",
              color: isDarkMode ? "#e2e8f0" : "#1a1a1a",
              fontFamily: "monospace",
            }}
          >
            npm install simplex-noise
          </code>
        </div>
          <button
            onClick={handleCopy}
            style={{
              marginLeft: "10px",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              backgroundColor: isDarkMode ? "#334155" : "#dbe3e8",
              color: isDarkMode ? "#f3f6f9" : "#334a51",
              fontSize: "10px",
              fontWeight: "500",
            }}
          >
            {copied ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <svg
                  style={{ color: "#43eb34" }}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 11.917 9.724 16.5 19 7.5"
                  />
                </svg>
                <p style={{ margin: 0 }}>Copied</p>
              </div>
            ) : (
              <div title="Copy">
                <svg
                  style={{ color: isDarkMode ? "white" : "black" }}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
          </div>
        <NoiseBackgroundSectionWithPreview title="" jsxCode={noiseJSX} isDarkMode={isDarkMode}>
          <div style={{ height: "100vh", position: "relative" }}>
            <NoiseBackground>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh'}}>
            <h1 style={{ 
                 
                fontSize: '4rem', 
                fontWeight: '600',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(255,255,255,0.5)',
                color: 'white'
            }}>
                Noise Background
            </h1>
            <p style={{ 
                fontSize: '1.5rem', 
                textAlign: 'center',
                marginTop: '2rem',
                color: 'white'
            }}>
                Noise backgrounds add texture and realism to your design
            </p>
            </div>
            </NoiseBackground>
          </div>
        </NoiseBackgroundSectionWithPreview>
      </div>
    </div>
  );
};

export default NoiseBackgroundSection;
