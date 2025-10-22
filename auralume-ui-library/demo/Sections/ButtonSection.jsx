import React, { useState, useEffect } from "react";
import Button from "../../src/components/Button";

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
      <h2 style={{ marginBottom: '2rem', fontSize: '24px', fontWeight: 'bold' }}>
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

const ButtonSection = ({ count, setCount, loading, handleLoadingDemo, isDarkMode, setIsDarkMode }) => {

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
      <div style={{      
        overflowX: "auto"}}
      >
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
          { prop: "children", type: "ReactNode", default: "—", desc: "Content inside the button (text or elements)." },
          { prop: "variant", type: "string", default: "'primary'", desc: "Defines the visual style variant — e.g., 'primary', 'secondary', 'danger', 'outline'." },
          { prop: "size", type: "string", default: "'medium'", desc: "Specifies the button size — options: 'small', 'medium', 'large'." },
          { prop: "disabled", type: "boolean", default: "false", desc: "Disables the button interaction when true." },
          { prop: "loading", type: "boolean", default: "false", desc: "Displays a loading spinner or indicator when true." },
          { prop: "onClick", type: "function", default: "undefined", desc: "Callback fired when the button is clicked." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class for styling overrides." },
          { prop: "icon", type: "ReactNode | string", default: "undefined", desc: "Icon element or URL to render inside the button." },
          { prop: "iconPosition", type: "'left' | 'right'", default: "'left'", desc: "Determines icon placement relative to text." },
          { prop: "glitchText", type: "string", default: "undefined", desc: "Optional animated glitch text overlay for futuristic button effects." },
          { prop: "shimmerEffect", type: "string", default: "'spin'", desc: "Defines shimmer style — e.g., 'spin', 'wave', 'pulse'." },
          { prop: "hoverText", type: "string", default: "undefined", desc: "Text shown when button is hovered." },
          { prop: "dataHover", type: "string", default: "undefined", desc: "Data attribute used for hover-triggered visual effects." },
          { prop: "svgUrl", type: "string", default: "undefined", desc: "URL to an SVG icon to render inside the button." },
          { prop: "btnColor", type: "string", default: "undefined", desc: "Custom background color for the button (e.g., '#1d4ed8')." },
          { prop: "btnTextColor", type: "string", default: "undefined", desc: "Defines the text color of the button label." },
          { prop: "btnHoverColor", type: "string", default: "undefined", desc: "Background color when the button is hovered." },
          { prop: "btnBorderColor", type: "string", default: "undefined", desc: "Custom color for the button border." },
          { prop: "btnBorderWeight", type: "string | number", default: "undefined", desc: "Thickness of the button border (e.g., '2px')." },
          { prop: "btnTextColorHover", type: "string", default: "undefined", desc: "Text color when the button is hovered." },
          { prop: "neonColor", type: "string", default: "undefined", desc: "Applies a glowing neon border or text effect with the specified color." },
          { prop: "gradientColor1", type: "string", default: "undefined", desc: "First color for gradient background." },
          { prop: "gradientColor2", type: "string", default: "undefined", desc: "Second color for gradient background." },
          { prop: "props", type: "object", default: "{}", desc: "Additional attributes spread onto the button element (e.g., aria-label, data-*)." },
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

      <h2 style={{ marginBottom: '2rem', color: isDarkMode ? '#ffffff' : '#000000', fontSize: '24px', fontWeight: 'bold' }}>Primary & Secondary Buttons</h2>
      <div>
      {/* Primary & Secondary Buttons */}
      <ButtonSectionWithPreview
        title=""
        isDarkMode={isDarkMode}
        jsxCode={`<Button variant="primary" onClick={() => alert("Primary clicked!")}>
          Primary Button
        </Button>
        <Button 
          variant="secondary"
          style={{"--btn-secondary-color": '#d4a1a1', "--btn-secondary-hover": '#bf7b7b'}}
          onClick={() => alert("Secondary clicked!")}
        >
          Secondary Button
        </Button>
        <Button variant="danger" onClick={() => alert("Danger clicked!")}>
          Danger Button
        </Button>
        <Button disabled>Disabled Button</Button>

        {/* Different Sizes */}
        <Button variant="primary" size="small">Small</Button>
        <Button variant="primary" size="medium">Medium</Button>
        <Button variant="primary" size="large">Large</Button>`}
      >
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "1rem",
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div style={{"--btn-hovercolor": '#0891b2'}}>
            <Button variant="primary" onClick={() => alert("Primary clicked!")}>
              Primary Button
            </Button>
            </div>
            <div style={{"--btn-textcolor": isDarkMode ? 'white' : ''}}>
            <Button
              variant="secondary"
              onClick={() => alert("Secondary clicked!")}
            >
              Secondary Button
            </Button>
            </div>
            <Button disabled>Disabled Button</Button>
          </div>
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: 'center',
            }}
          >
            <Button variant="primary" size="small">
              Small
            </Button>
            <Button variant="primary" size="medium">
              Medium
            </Button>
            <Button variant="primary" size="large">
              Large
            </Button>
          </div>
        </div>
      </ButtonSectionWithPreview>



      <h2 style={{ marginBottom: '2rem', color: isDarkMode ? '#ffffff' : '#000000', fontSize: '24px', fontWeight: 'bold' }}>Epic Buttons</h2>

    {/* Epic Button Variants */}
      <ButtonSectionWithPreview
        title=""
        isDarkMode={isDarkMode}
        jsxCode={`          
          <Button
            variant="default"
            btnColor="#979695"
            btnHoverColor="#5e5e5e"
            style={{
              borderRadius: "0px",
            }}
          >
            Default
          </Button>

          <Button
            variant="shadow-colored"
            btnColor="#dd7e2a"
            btnHoverColor="#b5c952"
          >
            Shadow Color
          </Button>

          <Button
            variant="shadow-glow"
            btnColor="#979695"
            btnHoverColor="#5e5e5e"
          >
            Shadow Glow
          </Button>

          <Button
            variant="shadow-inset"
            btnColor="#716eef"
            btnHoverColor="#dd648a"
          >
            Shadow Inset
          </Button>

          <Button
            variant="shadow-offset"
            btnColor="#979695"
            btnHoverColor="#dd6395"
          >
            Shadow Offset
          </Button>

          <Button variant="bg-dots" btnColor="#6ee2efff">
            Dots
          </Button>

          <Button
            variant="bg-gradient"
            gradientColor1="#a1c4fd"
            gradientColor2="#c2e9fb"
            btnTextColor="#464646"
            btnTextColorHover="#000"
          >
            Gradient
          </Button>

          <Button
            variant="bg-horizontal"
            btnColor="#dd6395"
            btnHoverColor="#dd7e2a"
          >
            Horizontal
          </Button>

          <Button
            variant="bg-vertical"
            btnColor="#dd7e2a"
            btnHoverColor="#dd648a"
          >
            Vertical
          </Button>

          <Button
            variant="bg-circle"
            btnColor="#716eef"
            btnHoverColor="#dd648a"
          >
            Circle
          </Button>

          <Button
            variant="bg-diagonal"
            btnColor="#9b59b6"
          >
            Diagonal
          </Button>

          <Button variant="bg-sweep" btnColor="#dd6395">
            Sweep
          </Button>

          <Button variant="bg-split">
            Split 
          </Button>

          <Button
            variant="border-draw"
            btnColor="#979695"
            btnHoverColor="#dd6395"
            style={{
              borderRadius: "0px",
            }}
          >
            Border
          </Button>

          <Button
            variant="border-reveal"
            btnColor="#dd6395"
            style={{ borderRadius: "0px" }}
          >
            Reveal
          </Button>

          <Button
            variant="transform-slide"
            dataHover="Click me!"
            btnColor="rgba(221, 99, 149, 1)"
            btnBorderColor="#dd2a73"
          >
            Slide
          </Button>

          <Button
            variant="transform-arrow"
            btnColor="#dd7e2a"
            btnHoverColor="rgba(223, 183, 148, 0.73)"
          >
            Arrow
          </Button>

          <Button
            variant="transform-3d"
            dataHover="Click me!"
            btnColor="#716eef"
            btnHoverColor="#3936af"
          >
            Transform 3d
          </Button>

          <Button
            variant="transform-shine"
            dataHover="Click me!"
            btnColor="#bf7b7b"
            btnHoverColor="#8b5252"
          >
            Shine
          </Button>`}
      >
        <div
          style={{
            padding: "60px",
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            textAlign: "center",
            justifyContent: "center"
          }}
        >
          <Button
            variant="default"
            btnColor="#979695"
            btnHoverColor="#5e5e5e"
            style={{
              borderRadius: "0px",
            }}
          >
            Default
          </Button>

          <Button
            variant="shadow-colored"
            btnColor="#dd7e2a"
            btnHoverColor="#b5c952"
          >
            Shadow Color
          </Button>

          <Button
            variant="shadow-glow"
            btnColor="#979695"
            btnHoverColor="#5e5e5e"
          >
            Shadow Glow
          </Button>

          <Button
            variant="shadow-inset"
            btnColor="#716eef"
            btnHoverColor="#dd648a"
          >
            Shadow Inset
          </Button>

          <Button
            variant="shadow-offset"
            btnColor="#979695"
            btnHoverColor="#dd6395"
          >
            Shadow Offset
          </Button>

          <Button variant="bg-dots" btnColor="#6ee2efff">
            Dots
          </Button>

          <Button
            variant="bg-gradient"
            gradientColor1="#a1c4fd"
            gradientColor2="#c2e9fb"
            btnTextColor="#464646"
            btnTextColorHover="#000"
          >
            Gradient
          </Button>

          <Button
            variant="bg-horizontal"
            btnColor="#dd6395"
            btnHoverColor="#dd7e2a"
          >
            Horizontal
          </Button>

          <Button
            variant="bg-vertical"
            btnColor="#dd7e2a"
            btnHoverColor="#dd648a"
          >
            Vertical
          </Button>

          <Button
            variant="bg-circle"
            btnColor="#716eef"
            btnHoverColor="#dd648a"
          >
            Circle
          </Button>

          <Button
            variant="bg-diagonal"
            btnColor="#9b59b6"
          >
            Diagonal
          </Button>

          <Button variant="bg-sweep" btnColor="#dd6395">
            Sweep
          </Button>

          <Button variant="bg-split">
            Split 
          </Button>

          <Button
            variant="border-draw"
            btnColor="#979695"
            btnHoverColor="#dd6395"
            style={{
              borderRadius: "0px",
            }}
          >
            Border
          </Button>

          <Button
            variant="border-reveal"
            btnColor="#dd6395"
            style={{ borderRadius: "0px" }}
          >
            Reveal
          </Button>

          <Button
            variant="transform-slide"
            dataHover="Click me!"
            btnColor="rgba(221, 99, 149, 1)"
            btnBorderColor="#dd2a73"
          >
            Slide
          </Button>

          <Button
            variant="transform-arrow"
            btnColor="#dd7e2a"
            btnHoverColor="rgba(223, 183, 148, 0.73)"
          >
            Arrow
          </Button>

          <Button
            variant="transform-3d"
            dataHover="Click me!"
            btnColor="#716eef"
            btnHoverColor="#3936af"
          >
            Transform 3d
          </Button>

          <Button
            variant="transform-shine"
            dataHover="Click me!"
            btnColor="#bf7b7b"
            btnHoverColor="#8b5252"
          >
            Shine
          </Button>
        </div>
      </ButtonSectionWithPreview>



      <h2 style={{ marginBottom: '2rem', color: isDarkMode ? '#ffffff' : '#000000', fontSize: '24px', fontWeight: 'bold' }}>Neon Effect</h2>

      {/* Neon Button Effects */}
      <ButtonSectionWithPreview
        title=""
        isDarkMode={isDarkMode}
        jsxCode={`          
          <div>
          <Button variant="neon" neonColor='#00f5ff'>Neon Cyan</Button>
          </div>
          <div>
          <Button variant="neon" neonColor='#ff006e'>Neon Pink</Button>
          </div>
          <div>
          <Button variant="neon" neonColor='#ff0000'>Neon Purple</Button>
          </div>
          <div>
          <Button variant="neon" neonColor='#10b981'>Neon Green</Button>
          </div>
          <div>
          <Button variant="neon" neonColor='#f59e0b'>Neon Orange</Button>
          </div>
          <div>
          <Button variant="neon" neonColor='#3b82f6'>Neon Blue</Button>
          </div>`}
      >
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: 'center', justifyContent: 'center' }}>
          <div>
          <Button variant="neon" neonColor='#00f5ff'>Neon Cyan</Button>
          </div>
          <div>
          <Button variant="neon" neonColor='#ff006e'>Neon Pink</Button>
          </div>
          <div>
          <Button variant="neon" neonColor='#ff0000'>Neon Purple</Button>
          </div>
          <div>
          <Button variant="neon" neonColor='#10b981'>Neon Green</Button>
          </div>
          <div>
          <Button variant="neon" neonColor='#f59e0b'>Neon Orange</Button>
          </div>
          <div>
          <Button variant="neon" neonColor='#3b82f6'>Neon Blue</Button>
          </div>
        </div>
      </ButtonSectionWithPreview>



      <h2 style={{ marginBottom: '2rem', color: isDarkMode ? '#ffffff' : '#000000', fontSize: '24px', fontWeight: 'bold' }}>Glassmorphism Effect</h2>

      {/* Glassmorphism Effects */}
      <ButtonSectionWithPreview
        title=""
        isDarkMode={isDarkMode}
        jsxCode={`<Button variant="glass">Glass</Button>`}
      >
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: 'center', textAlign: 'center' }}>
          <div>
          <Button variant="glass" btnTextColor={isDarkMode ? '#ffffff' : '#000000'} >Glass</Button>
          </div>
        </div>
      </ButtonSectionWithPreview>



      <h2 style={{ marginBottom: '2rem', color: isDarkMode ? '#ffffff' : '#000000', fontSize: '24px', fontWeight: 'bold' }}>Loading State</h2>

      {/* Loading States */}
      <ButtonSectionWithPreview
        title=""
        isDarkMode={isDarkMode}
        jsxCode={`          
          <Button
            variant="primary"
            loading={loading}
            onClick={handleLoadingDemo}
          >
            {loading ? (
              <>
                <span className="my-ui-btn__text--loading">Loading...</span>
              </>
            ) : (
              "Click to Load"
            )}
          </Button>
          <Button variant="secondary" disabled={loading} btnTextColor={isDarkMode ? 'white' : ''}>
            {loading ? "Please Wait..." : "Another Action"}
          </Button>`}
                >
            <div
             style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center", // centers horizontally
              alignItems: "center",     // centers vertically within row
            }}>
          <Button
            variant="primary"
            loading={loading}
            onClick={handleLoadingDemo}
          >
            {loading ? (
              <>
                <span className="my-ui-btn__text--loading">Loading...</span>
              </>
            ) : (
              "Click to Load"
            )}
          </Button>
          <Button variant="secondary" disabled={loading} btnTextColor={isDarkMode ? 'white' : ''}>
            {loading ? "Please Wait..." : "Another Action"}
          </Button>
        </div>
      </ButtonSectionWithPreview>
    </div>
   </div>
  );
};

export default ButtonSection;