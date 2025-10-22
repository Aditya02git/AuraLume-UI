import React, { useState, useEffect } from "react";
import { Button, Dialog } from "../../src";
import {
  confettiVariations,
  triggerConfetti,
} from "../../src/components/Confetti/Confetti";

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></div>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
          </div>
          <span style={{ color: '#94a3b8', fontSize: '14px', fontWeight: '500', marginLeft: '8px' }}>
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
          {copied ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg style={{color: '#43eb34'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
          </svg><p>Copied</p></div>
            : <div title='Copy'><svg style={{color: '#bdbdbd'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clip-rule="evenodd"/>
          </svg></div>
          }
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

const ConfettiButtonSectionWithPreview = ({
  title,
  children,
  jsxCode,
  isDarkMode
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

// Dependency Install Component
const DependencyInstall = ({ command, description, isDarkMode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isDarkMode ? "#1e293b" : "rgb(248, 250, 252)",
        padding: "12px 16px",
        borderRadius: "8px",
        marginBottom: "16px",
        border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span
          style={{
            fontFamily:
              'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: "14px",
            color: isDarkMode ? "#e2e8f0" : "#1f2937",
            fontWeight: "500",
          }}
        >
          {command}
        </span>
        {description && (
          <span
            style={{
              fontSize: "12px",
              color: isDarkMode ? "#94a3b8" : "#64748b",
              fontStyle: "italic",
            }}
          >
            {description}
          </span>
        )}
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
          fontWeight: "500",
        }}
      >
          {copied ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg style={{color: '#43eb34'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5"/>
          </svg><p>Copied</p></div>
            : <div title='Copy'><svg style={{color: '#bdbdbd'}} class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clip-rule="evenodd"/>
            <path fill-rule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clip-rule="evenodd"/>
          </svg></div>
          }
      </button>
    </div>
  );
};

const ConfettiButtonSection = ({isDarkMode, setIsDarkMode}) => {

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

  const basicJSX = `
    const basicHandleClick = () => {
    triggerConfetti();  
  };
  <Button onClick={basicHandleClick}>Click me</Button>`;

  const successJSX = `
    const successHandleClick = () => {
    confettiVariations.success();  
  };
  <Button onClick={successHandleClick}>Click me</Button>`;
  const partyJSX = `
    const partyHandleClick = () => {
    confettiVariations.party();  
  };
  <Button onClick={partyHandleClick}>Click me</Button>`;

  const fireworksJSX = `
    const fireworksHandleClick = () => {
    confettiVariations.fireworks();
  };
  <Button onClick={fireworksHandleClick}>Click me</Button>`;

  const basicHandleClick = () => {
    triggerConfetti();
  };
  const successHandleClick = () => {
    confettiVariations.success();
  };
  const partyHandleClick = () => {
    confettiVariations.party();
  };
  const fireworksHandleClick = () => {
    confettiVariations.fireworks();
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install canvas-confetti");
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
          marginBottom: "25px"
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
                  borderBottom: "1px solid #bababa"
                }}
              >
                <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>Prop</th>
                <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>Type</th>
                <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>Default</th>
                <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: "particleCount", type: "number", default: "150", desc: "Total number of particles to be emitted" },
                { prop: "spread", type: "number", default: "60", desc: "Controls how widely the particles spread out" },
                { prop: "startVelocity", type: "number", default: "30", desc: "Initial velocity of the emitted particles" },
                { prop: "decay", type: "number", default: "0.9", desc: "Rate at which particle speed decays (0–1 range)" },
                { prop: "gravity", type: "number", default: "1", desc: "Downward pull affecting the particles" },
                { prop: "drift", type: "number", default: "0", desc: "Horizontal drift factor applied to particles" },
                { prop: "scalar", type: "number", default: "1", desc: "Scales particle size and movement strength" },
                { prop: "colors", type: "array | undefined", default: "undefined", desc: "Custom color palette for particles" },
                { prop: "origin", type: "object", default: "{ x: 0.5, y: 0.6 }", desc: "Normalized origin point of particle emission (0–1 range)" },
              ].map((row, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: `1px solid ${isDarkMode ? "#475569" : "#e2e8f0"}`,
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
            npm install canvas-confetti
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

      <ConfettiButtonSectionWithPreview title="Basic" jsxCode={basicJSX} isDarkMode={isDarkMode}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onClick={basicHandleClick}>Click me</Button>
        </div>
      </ConfettiButtonSectionWithPreview>

      <ConfettiButtonSectionWithPreview title="Success" jsxCode={successJSX} isDarkMode={isDarkMode}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onClick={successHandleClick}>Click me</Button>
        </div>
      </ConfettiButtonSectionWithPreview>

      <ConfettiButtonSectionWithPreview title="Party" jsxCode={partyJSX} isDarkMode={isDarkMode}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onClick={partyHandleClick}>Click me</Button>
        </div>
      </ConfettiButtonSectionWithPreview>

      <ConfettiButtonSectionWithPreview
        title="Fireworks"
        jsxCode={fireworksJSX}
        isDarkMode={isDarkMode}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onClick={fireworksHandleClick}>Click me</Button>
        </div>
      </ConfettiButtonSectionWithPreview>
    </div>
  );
};

export default ConfettiButtonSection;
