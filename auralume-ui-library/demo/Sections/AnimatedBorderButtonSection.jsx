import React, { useState, useEffect } from "react";
import { AnimatedBorderButton } from "../../src/components/AnimatedBorderButton";


// Preview Toggle Component
const PreviewToggle = ({ activeTab, onTabChange, isDarkMode }) => {
  const tabs = ['Preview', 'TSX/JSX'];

  
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
      
      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode}/>
      
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

const AnimatedBorderButtonSection = ({ count, setCount, loading, handleLoadingDemo, isDarkMode, setIsDarkMode }) => {


  const basicCode = `<AnimatedBorderButton>Shinny</AnimatedBorderButton>`;
  const customCode = `
            <div style={{"--primary-color": '#10b981', "--secondary-color": '#84ffb8'}}>
            <AnimatedBorderButton>Green</AnimatedBorderButton>
            </div>
            <div style={{"--primary-color": '#8b5cf6', "--secondary-color": '#c4b5fd'}}>
            <AnimatedBorderButton>Purple</AnimatedBorderButton>
            </div>
            <div style={{"--primary-color": '#ec4899', "--secondary-color": '#f9a8d4'}}>
            <AnimatedBorderButton>Pink</AnimatedBorderButton>
            </div>
            <div style={{"--primary-color": '#f97316', "--secondary-color": '#fdba74'}}>
            <AnimatedBorderButton>Orange</AnimatedBorderButton>
            </div>`;

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
            minWidth: "600px"
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
          { prop: "children", type: "ReactNode", default: "undefined", desc: "The content inside the button, typically text or elements." },
          { prop: "variant", type: "'shiny' | 'outline' | 'solid' | 'ghost'", default: "'shiny'", desc: "Defines the visual style of the button." },
          { prop: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", desc: "Determines the button size." },
          { prop: "disabled", type: "boolean", default: "false", desc: "Disables the button, preventing user interaction." },
          { prop: "loading", type: "boolean", default: "false", desc: "Displays a loading state, disabling interactions temporarily." },
          { prop: "onClick", type: "function", default: "undefined", desc: "Click handler function called when the button is clicked." },
          { prop: "className", type: "string", default: "''", desc: "Custom class name for additional styling." },
          { prop: "icon", type: "ReactNode | string", default: "undefined", desc: "Optional icon to display inside the button." },
          { prop: "iconPosition", type: "'left' | 'right'", default: "'left'", desc: "Defines the icon placement relative to the button text." },
          { prop: "primaryColor", type: "string", default: "undefined", desc: "Primary color used for the button background or border (if supported by variant)." },
          { prop: "secondaryColor", type: "string", default: "undefined", desc: "Secondary color used for gradients or accent effects." },
          { prop: "props", type: "object", default: "{}", desc: "Additional props spread onto the button element." },
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
          title="Basic Buttons"
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
            <AnimatedBorderButton>Shinny</AnimatedBorderButton>
          </div>
        </ButtonSectionWithPreview>
        
        <ButtonSectionWithPreview
          title="Custom Buttons"
          isDarkMode={isDarkMode}
          jsxCode={customCode}
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
            <div>
            <AnimatedBorderButton primaryColor={'#10b981'} secondaryColor={'#84ffb8'}>Green</AnimatedBorderButton>
            </div>
            <div>
            <AnimatedBorderButton primaryColor={'#8b5cf6'} secondaryColor={'#c4b5fd'}>Purple</AnimatedBorderButton>
            </div>
            <div>
            <AnimatedBorderButton primaryColor={'#ec4899'} secondaryColor={'#f9a8d4'}>Pink</AnimatedBorderButton>
            </div>
            <div>
            <AnimatedBorderButton primaryColor={'#f97316'} secondaryColor={'#fdba74'}>Orange</AnimatedBorderButton>
            </div>
          </div>
        </ButtonSectionWithPreview>

      </div>
    </div>
  );
};

export default AnimatedBorderButtonSection;