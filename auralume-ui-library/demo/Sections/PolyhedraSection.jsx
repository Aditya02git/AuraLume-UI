import React, { useState, useEffect } from "react";
import Polyhedra from "../../src/components/ThreeJs/Polyhedra";

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
            padding: "clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)",
            border: "none",
            borderRadius: "6px",
            backgroundColor: activeTab === tab ? "#e33de0" : "transparent",
            color:
              activeTab === tab ? "white" : isDarkMode ? "#94a3b8" : "#64748b",
            cursor: "pointer",
            fontSize: "clamp(12px, 2.5vw, 14px)",
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
    navigator.clipboard?.writeText(code);
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

const PolyhedraSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState("Preview");

  return (
    <section style={{ marginBottom: "clamp(2rem, 5vw, 4rem)" }}>
      <h2
        style={{
          marginBottom: "clamp(1rem, 3vw, 2rem)",
          color: isDarkMode ? "#ffffff" : "#000000",
          fontSize: "clamp(1.25rem, 5vw, 1.5rem)",
          fontWeight: "bold",
        }}
      >
        {title}
      </h2>

      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode}/>

      {activeTab === "Preview" && (
        <div
          style={{
            padding: "clamp(16px, 4vw, 32px)",
            background: "linear-gradient(0deg, #8c76ed, #fca4c5)",
            borderRadius: "12px",
            border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
            transition: "all 0.3s ease",
            height: "clamp(400px, 60vh, 500px)",
            minHeight: "400px",
            position: "relative",
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

const PolyhedraSection = ({isDarkMode, setIsDarkMode}) => {

  const containerStyle = {
    padding: "clamp(20px, 5vw, 40px)",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    background: "transparent",
    color: isDarkMode ? "#e2e8f0" : "#1a1a1a",
    minHeight: "100vh",
    transition: "all 0.3s ease",
  };

  // JSX Code Examples
  const basicShapesJSX = `import Polyhedra from './Polyhedra';

// Basic usage with default props
<Polyhedra />

// Custom configuration
<Polyhedra 
  colors={['0x7658ef', '0xfca4c5']} 
  triangularFaces={20} 
  animation={true} 
/>

// Animation disabled
<Polyhedra 
  colors={['0xff6b6b', '0x4ecdc4']} 
  triangularFaces={12} 
  animation={false} 
/>`;

  const propsTableData = [
  // 🎨 Basic Styling
  { prop: "color", type: "string", default: "'#ffffff'", desc: "Base color of the polyhedra objects" },
  { prop: "width", type: "string", default: "'100%'", desc: "Width of the canvas container" },
  { prop: "height", type: "string", default: "'400px'", desc: "Height of the canvas container" },

  // ⚙️ Animation Controls
  { prop: "animation", type: "boolean", default: "true", desc: "Enable or disable polyhedra animation" },
  { prop: "animationSpeed", type: "number", default: "1", desc: "Overall animation speed multiplier" },
  { prop: "rotationSpeed", type: "array", default: "[{ x: 0.035, y: -0.005, z: 0 }, { x: 0, y: 0.015, z: -0.005 }, { x: 0.005, y: 0, z: -0.025 }]", desc: "Rotation speeds for each polyhedron object" },

  // 🔷 Geometry
  { prop: "triangularFaces", type: "number", default: "20", desc: "Number of triangular faces used for polyhedron geometry" },
  { prop: "size", type: "number", default: "2.5", desc: "Overall scale or size of each polyhedron shape" },
  { prop: "shapeCount", type: "number", default: "3", desc: "Number of polyhedra shapes rendered in the scene" },

  // 🎥 Camera
  { prop: "cameraPosition", type: "object", default: "{ x: 0, y: 0, z: 10 }", desc: "Initial position of the camera in 3D space" },
  { prop: "fov", type: "number", default: "75", desc: "Camera field of view in degrees" },

  // 💡 Lighting
  { prop: "ambientLightColor", type: "string", default: "'#111111'", desc: "Color of the ambient light illuminating the scene" },
  { prop: "ambientLightIntensity", type: "number", default: "5", desc: "Intensity of the ambient light" },
  { prop: "pointLightColor", type: "string", default: "'#fca4c5'", desc: "Color of the point light source" },
  { prop: "pointLightIntensity", type: "number", default: "1", desc: "Intensity of the point light" },
  { prop: "pointLightPosition", type: "object", default: "{ x: 0, y: 250, z: 0 }", desc: "Position of the point light source in 3D space" },

  // 🕹️ Controls
  { prop: "orbitControl", type: "boolean", default: "false", desc: "Enables interactive orbit control for the camera" },

  // 🧱 Material
  { prop: "wireframe", type: "boolean", default: "false", desc: "Renders the polyhedra in wireframe mode" },
  { prop: "material", type: "string", default: "'normal'", desc: "Material type used for rendering ('normal', 'basic', 'standard', 'phong')" },

  // 🧩 Events
  { prop: "onReady", type: "function", default: "null", desc: "Callback fired when the polyhedra scene is ready" },
  { prop: "onClick", type: "function", default: "null", desc: "Callback triggered when a polyhedron is clicked" },

  // 🎨 Custom Styles
  { prop: "className", type: "string", default: "''", desc: "Custom CSS class for container styling" },
  { prop: "style", type: "object", default: "{}", desc: "Inline styles for container customization" },
];

  return (
    <div>
      <div
        style={{
          backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
          borderRadius: "12px",
          border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
          overflow: "hidden",
          marginBottom: "25px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "clamp(12px, 2.5vw, 14px)",
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
                    padding: "clamp(8px, 2vw, 16px)",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Prop
                </th>
                <th
                  style={{
                    padding: "clamp(8px, 2vw, 16px)",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Type
                </th>
                <th
                  style={{
                    padding: "clamp(8px, 2vw, 16px)",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Default
                </th>
                <th
                  style={{
                    padding: "clamp(8px, 2vw, 16px)",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {propsTableData.map((row, index) => (
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
                      padding: "clamp(8px, 2vw, 16px)",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#fbbf24" : "#d97706",
                      wordBreak: "break-word",
                    }}
                  >
                    {row.prop}
                  </td>
                  <td
                    style={{
                      padding: "clamp(8px, 2vw, 16px)",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#8b5cf6" : "#7c3aed",
                      wordBreak: "break-word",
                    }}
                  >
                    {row.type}
                  </td>
                  <td
                    style={{
                      padding: "clamp(8px, 2vw, 16px)",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#06b6d4" : "#0891b2",
                      wordBreak: "break-word",
                    }}
                  >
                    {row.default}
                  </td>
                  <td
                    style={{
                      padding: "clamp(8px, 2vw, 16px)",
                      wordBreak: "break-word",
                    }}
                  >
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PolyhedraSectionWithPreview title="Interactive Polyhedra" jsxCode={basicShapesJSX} isDarkMode={isDarkMode}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "90%",
              height: "90%",
              maxWidth: "500px",
              maxHeight: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Polyhedra
              colors={["0x7658ef", "0xfca4c5"]}
              triangularFaces={20}
              animation={true}
            />
          </div>
        </div>
      </PolyhedraSectionWithPreview>
    </div>
  );
};

export default PolyhedraSection;
