import React, { useState, useEffect } from "react";
import { HaloBackground } from "../../src/components/HaloBackground";

// Preview Toggle Component
const PreviewToggle = ({ activeTab, onTabChange }) => {
  const tabs = ["Preview", "TSX/JSX"];
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Get theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  // Listen for storage changes to sync theme across components
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("darkMode");
      if (saved) {
        setIsDarkMode(JSON.parse(saved));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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

const HaloBackgroundSectionWithPreview = ({ title, children, jsxCode }) => {
  const [activeTab, setActiveTab] = useState("Preview");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Get theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  // Listen for storage changes to sync theme across components
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("darkMode");
      if (saved) {
        setIsDarkMode(JSON.parse(saved));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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

      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} />

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

const HaloBackgroundSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Get theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  // Listen for storage changes to sync theme across components
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("darkMode");
      if (saved) {
        setIsDarkMode(JSON.parse(saved));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
  const basicSpotlightJSX = `            <HaloBackground>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh'}}>
            <h1 style={{ 
                fontSize: '4rem', 
                fontWeight: '600',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(255,255,255,0.5)',
                color: 'white'
            }}>
                Halo Background
            </h1>
            <p style={{ 
                fontSize: '1.5rem', 
                textAlign: 'center',
                marginTop: '2rem',
                color: 'white'
            }}>
                A glowing horizon effect that softly illuminates the bottom of your page
            </p>
            </div>
            </HaloBackground>`;

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
                { prop: "children", type: "ReactNode", default: "—", desc: "The elements or content rendered inside the Halo background." },
                { prop: "className", type: "string", default: "''", desc: "Custom CSS class for additional styling of the background container." },
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
        <HaloBackgroundSectionWithPreview title="" jsxCode={basicSpotlightJSX}>
          <div style={{ height: "100vh", position: "relative" }}>
            <HaloBackground>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', height: '100vh'}}>
            <h1 style={{ 
                fontSize: '4rem', 
                fontWeight: '600',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(255,255,255,0.5)',
                color: 'white'
            }}>
                Halo Background
            </h1>
            <p style={{ 
                fontSize: '1.5rem', 
                textAlign: 'center',
                marginTop: '2rem',
                color: 'white'
            }}>
                A glowing horizon effect that softly illuminates the bottom of your page
            </p>
            </div>
            </HaloBackground>
          </div>
        </HaloBackgroundSectionWithPreview>
      </div>
    </div>
  );
};

export default HaloBackgroundSection;
