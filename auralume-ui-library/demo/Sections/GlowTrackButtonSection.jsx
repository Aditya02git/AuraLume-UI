import React, { useState, useEffect } from "react";
import GlowTrackButton from "../../src/components/GlowTrackButton/GlowTrackButton";


// Preview Toggle Component
const PreviewToggle = ({ activeTab, onTabChange }) => {
  const tabs = ['Preview', 'TSX/JSX'];
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Get theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  // Listen for storage changes to sync theme across components
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('darkMode');
      if (saved) {
        setIsDarkMode(JSON.parse(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  return (
    <div style={{ 
      display: 'flex', 
      gap: '4px', 
      backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', 
      padding: '4px', 
      borderRadius: '8px',
      marginBottom: '16px',
      width: 'fit-content'
    }}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: activeTab === tab ? '#e33de0' : 'transparent',
            color: activeTab === tab ? 'white' : '#64748b',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s ease'
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
    <div style={{ 
      position: 'relative', 
      backgroundColor: '#1e293b', 
      borderRadius: '8px', 
      overflow: 'hidden',
      marginBottom: '16px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#334155',
        borderBottom: '1px solid #475569'
      }}>
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
            padding: '6px 12px',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
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
      <pre style={{ 
        padding: '16px', 
        margin: 0, 
        color: '#e2e8f0', 
        fontSize: '14px',
        lineHeight: '1.5',
        overflow: 'auto'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Button Section with Preview Toggle
const ButtonSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('Preview');

  return (
    <section style={{ marginBottom: '4rem' }}>
      <h2 style={{ marginBottom: '2rem', color: isDarkMode ? '#ffffff' : '#000000', fontSize: '24px', fontWeight: 'bold' }}>
        {title}
      </h2>
      
      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'Preview' && (
        <div style={{
          padding: '32px',
          backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
          borderRadius: '12px',
          border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
          transition: 'all 0.3s ease'
        }}>
          {children}
        </div>
      )}
      
      {activeTab === 'TSX/JSX' && (
        <CodeDisplay code={jsxCode} language="TSX/JSX" />
      )}
    </section>
  );
};

const GlowTrackButtonSection = ({ count, setCount, loading, handleLoadingDemo }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Get theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  // Listen for storage changes to sync theme across components
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('darkMode');
      if (saved) {
        setIsDarkMode(JSON.parse(saved));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const basicCode = `<GlowTrackButton variant="glow-track">Basic</GlowTrackButton>`;
  const rgbCode = `
              <GlowTrackButton 
              variant="glow-track"
              buttonBackground="#001122"
              buttonShadow="rgba(255, 0, 0, 0.3)"
              buttonColor="#ffffff"
              buttonShineLeft="rgba(255, 0, 102, 0.5)"
              buttonShineRight="rgba(255, 102, 0, 0.65)"
              buttonGlowStart="#FF0066"
              buttonGlowEnd="#FF6600"
            >
              Custom Red
            </GlowTrackButton>

            <GlowTrackButton 
              variant="glow-track"
              buttonBackground="#001122"
              buttonColor="#ffffff"
              buttonShadow="rgba(0, 255, 0, 0.3)"
              buttonShineLeft="rgba(0, 255, 102, 0.5)"
              buttonShineRight="rgba(102, 255, 0, 0.65)"
              buttonGlowStart="#00FF66"
              buttonGlowEnd="#66FF00"
            >
              Green
            </GlowTrackButton>

            <GlowTrackButton 
              variant="glow-track"
              buttonBackground="#001122"
              buttonColor="#ffffff"
              buttonShadow="rgba(0, 0, 255, 0.3)"
              buttonShineLeft="rgba(0, 102, 255, 0.5)"
              buttonShineRight="rgba(0, 204, 255, 0.65)"
              buttonGlowStart="#0066FF"
              buttonGlowEnd="#00CCFF"
            >
              Custom Blue
            </GlowTrackButton>`;
  const customizeCode = `
              <GlowTrackButton 
              variant="glow-track"
              buttonBackground="#001122"
              buttonColor="#ffffff"
              buttonShadow="rgba(0, 255, 255, 0.3)"
              buttonShineLeft="rgba(0, 200, 255, 0.8)"
              buttonShineRight="rgba(0, 255, 200, 0.9)"
              buttonGlowStart="#00FFFF"
              buttonGlowEnd="#0080FF"
            >
              Custom Cyan
            </GlowTrackButton>
            <GlowTrackButton
              variant="glow-track"
              buttonBackground="#001122"
              buttonColor="#ffffff"
              buttonShadow="rgba(255, 215, 0, 0.3)"
              buttonShineLeft="rgba(255, 215, 0, 0.5)"
              buttonShineRight="rgba(255, 165, 0, 0.65)"
              buttonGlowStart="#FFD700"
              buttonGlowEnd="#FFA500"
            >
              Custom Gold
            </GlowTrackButton>`;

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
        <div style={{ overflowX: 'auto'}}>
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
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>
                Prop
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>
                Type
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>
                Default
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {[
          { prop: "children", type: "ReactNode", default: "-", desc: "Content inside the button, typically text or icons." },
          { prop: "variant", type: "string", default: "'glow-track'", desc: "Button style variant; 'glow-track' adds glowing track effect." },
          { prop: "size", type: "string", default: "'medium'", desc: "Size of the button: small, medium, or large." },
          { prop: "disabled", type: "boolean", default: "false", desc: "Disables the button when true." },
          { prop: "loading", type: "boolean", default: "false", desc: "Shows a loading state when true." },
          { prop: "onClick", type: "function", default: "-", desc: "Callback triggered when the button is clicked." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class applied to the button." },
          { prop: "buttonBackground", type: "string", default: "'#09041e'", desc: "Background color of the button for glow-track variant." },
          { prop: "buttonColor", type: "string", default: "'#fff'", desc: "Text/icon color inside the button." },
          { prop: "buttonShadow", type: "string", default: "'rgba(33, 4, 104, 0.2)'", desc: "Shadow color under the button." },
          { prop: "buttonShineLeft", type: "string", default: "'rgba(120, 0, 245, 0.8)'", desc: "Left-side shine color for glow-track effect." },
          { prop: "buttonShineRight", type: "string", default: "'rgba(200, 148, 255, 0.9)'", desc: "Right-side shine color for glow-track effect." },
          { prop: "buttonGlowStart", type: "string", default: "'#B000E8'", desc: "Start color of the button glow effect." },
          { prop: "buttonGlowEnd", type: "string", default: "'#009FFD'", desc: "End color of the button glow effect." },
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
      
      <div>
   
        {/* Glow Buttons */}
        <ButtonSectionWithPreview
          title="Basic"
          isDarkMode={isDarkMode}
          jsxCode={basicCode}
        >
          <div
            style={{
              padding: "60px",
              display: "flex",
              flexWrap: "wrap",
              gap: "20px", 
              alignItems: "center", 
              justifyContent: "center"
            }}
          >
            <GlowTrackButton variant="glow-track">Basic</GlowTrackButton>
          </div>
        </ButtonSectionWithPreview>
       
        <ButtonSectionWithPreview
          title="RGB Variants"
          isDarkMode={isDarkMode}
          jsxCode={rgbCode}
        >
          <div
            style={{
              padding: "60px",
              display: "flex",
              flexWrap: "wrap",
              gap: "20px", 
              alignItems: "center", 
              justifyContent: "center"
            }}
          >
            <GlowTrackButton 
              variant="glow-track"
              buttonBackground="#001122"
              buttonShadow="rgba(255, 0, 0, 0.3)"
              buttonColor="#ffffff"
              buttonShineLeft="rgba(255, 0, 102, 0.5)"
              buttonShineRight="rgba(255, 102, 0, 0.65)"
              buttonGlowStart="#FF0066"
              buttonGlowEnd="#FF6600"
            >
              Custom Red
            </GlowTrackButton>

            <GlowTrackButton 
              variant="glow-track"
              buttonBackground="#001122"
              buttonColor="#ffffff"
              buttonShadow="rgba(0, 255, 0, 0.3)"
              buttonShineLeft="rgba(0, 255, 102, 0.5)"
              buttonShineRight="rgba(102, 255, 0, 0.65)"
              buttonGlowStart="#00FF66"
              buttonGlowEnd="#66FF00"
            >
              Green
            </GlowTrackButton>

            <GlowTrackButton 
              variant="glow-track"
              buttonBackground="#001122"
              buttonColor="#ffffff"
              buttonShadow="rgba(0, 0, 255, 0.3)"
              buttonShineLeft="rgba(0, 102, 255, 0.5)"
              buttonShineRight="rgba(0, 204, 255, 0.65)"
              buttonGlowStart="#0066FF"
              buttonGlowEnd="#00CCFF"
            >
              Custom Blue
            </GlowTrackButton>
          </div>
        </ButtonSectionWithPreview>
        
        <ButtonSectionWithPreview
          title="Customize"
          isDarkMode={isDarkMode}
          jsxCode={customizeCode}
        >
          <div
            style={{
              padding: "60px",
              display: "flex",
              flexWrap: "wrap",
              gap: "20px", 
              alignItems: "center", 
              justifyContent: "center"
            }}
          >
            <GlowTrackButton 
              variant="glow-track"
              buttonBackground="#001122"
              buttonColor="#ffffff"
              buttonShadow="rgba(0, 255, 255, 0.3)"
              buttonShineLeft="rgba(0, 200, 255, 0.8)"
              buttonShineRight="rgba(0, 255, 200, 0.9)"
              buttonGlowStart="#00FFFF"
              buttonGlowEnd="#0080FF"
            >
              Custom Cyan
            </GlowTrackButton>
            <GlowTrackButton
              variant="glow-track"
              buttonBackground="#001122"
              buttonColor="#ffffff"
              buttonShadow="rgba(255, 215, 0, 0.3)"
              buttonShineLeft="rgba(255, 215, 0, 0.5)"
              buttonShineRight="rgba(255, 165, 0, 0.65)"
              buttonGlowStart="#FFD700"
              buttonGlowEnd="#FFA500"
            >
              Custom Gold
            </GlowTrackButton>
          </div>
        </ButtonSectionWithPreview>

      </div>
    </div>
  );
};

export default GlowTrackButtonSection;