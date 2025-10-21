import React, { useState, useEffect } from "react";
import ThemeButton from "../../src/components/ThemeButton";

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
            color: activeTab === tab ? "white" : "#64748b",
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

// Button Section with Preview Toggle
const ThemeButtonSectionWithPreview = ({
  title,
  children,
  jsxCode,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState("Preview");

  return (
    <section style={{ marginBottom: "4rem" }}>
      <h2
        style={{
          marginBottom: "2rem",
          color: isDarkMode ? "#ffffff" : "#000000",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {title}
      </h2>

      <PreviewToggle
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDarkMode={isDarkMode}
      />

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

// Main Toggle Button Section Component
const ThemeButtonSection = ({
  count,
  setCount,
  isDarkMode,
  setIsDarkMode,
}) => {
  const [localToggle, setLocalToggle] = useState(false);
  const [themeToggle, setThemeToggle] = useState(false);

  const jsxCode = `import { ThemeButton } from './ThemeButton';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  
  const [localToggle, setLocalToggle] = useState(false);

  return (
    <ThemeButton
      isOn={isDarkMode} 
      onChange={(value) => setIsDarkMode(value)}
      size="medium"
    />
  );
}`;

  const themeJsxCode = `import { ThemeButton } from './ThemeButton';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeButton
      variant="custom"
      isOn={isDarkMode}
      onChange={setIsDarkMode}
      applyBodyTheme={true}
      size="medium"
      lightIcon="https://arsentech.github.io/source-codes/icons/light.svg"
      darkIcon="https://arsentech.github.io/source-codes/icons/dark.svg"
    />
  );
}`;

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
              minWidth: "600px",
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
          { prop: "isOn", type: "boolean", default: "false", desc: "Determines whether the dark mode is active (true for dark mode, false for light)." },
          { prop: "onChange", type: "function", default: "undefined", desc: "Callback triggered when the theme is toggled (receives the new state)." },
          { prop: "size", type: "string", default: "'medium'", desc: "Defines button size — can be 'small', 'medium', or 'large'." },
          { prop: "disabled", type: "boolean", default: "false", desc: "Disables interaction when set to true." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class name for additional styling." },
          { prop: "isStaticColor", type: "boolean", default: "false", desc: "If true, the button uses a fixed color instead of adapting to the theme." },
          { prop: "variant", type: "string", default: "'default'", desc: "Visual style of the button — 'default' or 'animated' for transition effects." },
          { prop: "lightIcon", type: "string", default: "'https://cdn.jsdelivr.net/gh/Aditya02git/Icons/light.svg'", desc: "URL of the icon used when light theme is active." },
          { prop: "darkIcon", type: "string", default: "'https://cdn.jsdelivr.net/gh/Aditya02git/Icons/dark.svg'", desc: "URL of the icon used when dark theme is active." },
          { prop: "applyBodyTheme", type: "boolean", default: "false", desc: "If true, applies the selected theme directly to the document body." },
          { prop: "width", type: "number | string", default: "undefined", desc: "Custom width for the button, overrides default sizing." },
          { prop: "height", type: "number | string", default: "undefined", desc: "Custom height for the button, overrides default sizing." },
          { prop: "...props", type: "object", default: "{}", desc: "Spread operator for passing additional props to the button element." },
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

      {/* Preview Section with Code Toggle - Moon/Sun */}
      <ThemeButtonSectionWithPreview
        title="Basic Theme Toggle"
        isDarkMode={isDarkMode}
        jsxCode={jsxCode}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <h3 style={{ margin: 0, opacity: 0.8 }}>Preview Mode Toggle</h3>
          <ThemeButton
            variant="default"
            applyBodyTheme={true}
            isOn={isDarkMode}
            onChange={(value) => setIsDarkMode(value)}
            size="small"
          />
        </div>
      </ThemeButtonSectionWithPreview>

      {/* Preview Section with Code Toggle - Theme */}
      <ThemeButtonSectionWithPreview
        title="Interactive Theme Toggle"
        isDarkMode={isDarkMode}
        jsxCode={themeJsxCode}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <h3 style={{ margin: 0, opacity: 0.8 }}>Theme Toggle Preview</h3>
          <ThemeButton
            variant="animated"
            width={85}
            height={85}
            isOn={isDarkMode}
            onChange={(value) => setIsDarkMode(value)}
          />
        </div>
      </ThemeButtonSectionWithPreview>
    </div>
  );
};

export default ThemeButtonSection;
