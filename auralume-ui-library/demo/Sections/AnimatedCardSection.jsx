import React, { useState, useEffect } from 'react';
import AnimatedCard, { ANIMATION_TYPES, COLOR_VARIANTS, SIZE_VARIANTS } from '../../src/components/AnimatedCard';

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
            color: activeTab === tab ? 'white' : (isDarkMode ? '#94a3b8' : '#64748b'),
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

const CardSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('Preview');

  return (
    <section style={{ marginBottom: '4rem' }}>
      <h2 style={{ 
        marginBottom: '2rem', 
        color: isDarkMode ? '#ffffff' : '#000000', 
        fontSize: 'clamp(20px, 4vw, 24px)', 
        fontWeight: 'bold' 
      }}>
        {title}
      </h2>
      
      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode} />
      
      {activeTab === 'Preview' && (
        <div style={{
          padding: 'clamp(16px, 4vw, 32px)',
          backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
          borderRadius: '12px',
          border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
          transition: 'all 0.3s ease',
          overflow: 'hidden', // Prevent content overflow
          width: '100%',
          boxSizing: 'border-box'
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

const AnimatedCardSection = ({isDarkMode, setIsDarkMode}) => {

  const containerStyle = {
    padding: 'clamp(16px, 4vw, 40px)',
    maxWidth: '1400px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    background: 'transparent',
    color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
    minHeight: '100vh',
    transition: 'all 0.3s ease',
    width: '100%',
    boxSizing: 'border-box'
  };

  // Responsive grid styles
  const getGridStyle = (minWidth = '280px') => ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
    gap: 'clamp(1rem, 3vw, 2rem)',
    marginBottom: '2rem',
    width: '100%',
    boxSizing: 'border-box'
  });

  // Common text styles that respond to dark mode
  const headingStyle = {
    marginBottom: '0.5rem',
    fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
    color: isDarkMode ? '#ffffff' : '#ffffff'
  };

  const smallHeadingStyle = {
    margin: 0,
    fontSize: 'clamp(1rem, 3vw, 1.25rem)',
    color: isDarkMode ? '#ffffff' : '#ffffff'
  };

  const paragraphStyle = {
    opacity: 0.8,
    margin: 0,
    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
    color: isDarkMode ? '#d1d5db' : '#6b7280'
  };

  // Animation Types JSX
  const animationTypesJSX = `

    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: 'clamp(1rem, 3vw, 2rem)' 
    }}>
      <AnimatedCard animationType={ANIMATION_TYPES.ALPHABETICAL}>
        <h3>Alphabetical</h3>
        <p>Letters and numbers animation</p>
      </AnimatedCard>

      <AnimatedCard animationType={ANIMATION_TYPES.ASCII}>
        <h3>ASCII Art</h3>
        <p>Special characters animation</p>
      </AnimatedCard>

      <AnimatedCard animationType={ANIMATION_TYPES.PIXELS}>
        <h3>Pixel Art</h3>
        <p>Block characters animation</p>
      </AnimatedCard>
    </div>`;

  // Color Variants JSX
  const colorVariantsJSX = `

    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: 'clamp(1rem, 2.5vw, 1.5rem)' 
    }}>
      <AnimatedCard className={COLOR_VARIANTS.PURPLE}>
        <h3>Purple</h3>
      </AnimatedCard>
      
      <AnimatedCard className={COLOR_VARIANTS.BLUE}>
        <h3>Blue</h3>
      </AnimatedCard>
      
      <AnimatedCard className={COLOR_VARIANTS.GREEN}>
        <h3>Green</h3>
      </AnimatedCard>
      
      <AnimatedCard className={COLOR_VARIANTS.RED}>
        <h3>Red</h3>
      </AnimatedCard>
      
      <AnimatedCard className={COLOR_VARIANTS.ORANGE}>
        <h3>Orange</h3>
      </AnimatedCard>
    </div>`;

  // Interactive JSX
  const interactiveJSX = `

  const handleClick = () => {
    alert('Card clicked!');
  };

    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: 'clamp(1rem, 3vw, 1.5rem)' 
    }}>
      <AnimatedCard onClick={handleClick}>
        <h3>Click Me!</h3>
        <p>Interactive card with onClick handler</p>
      </AnimatedCard>

      <AnimatedCard href="https://github.com">
        <img 
          src="https://www.yudiz.com/codepen/code-hover//github-mark-white.svg" 
          alt="GitHub" 
          style={{ width: '60px', height: '60px', marginBottom: '1rem' }}
        />
        <h3>GitHub</h3>
        <p>Visit our repository</p>
      </AnimatedCard>
    </div>`;

  return (
    <div>
      {/* Props Table */}
      <div
        style={{
          backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
          borderRadius: "12px",
          border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
          overflow: "hidden",
          marginBottom: "25px",
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ overflowX: "auto" }}>
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
                  borderBottom: "1px solid #bababa"
                }}
              >
                <th style={{ padding: "clamp(12px, 2vw, 16px)", textAlign: "left", fontWeight: "600" }}>Prop</th>
                <th style={{ padding: "clamp(12px, 2vw, 16px)", textAlign: "left", fontWeight: "600" }}>Type</th>
                <th style={{ padding: "clamp(12px, 2vw, 16px)", textAlign: "left", fontWeight: "600" }}>Default</th>
                <th style={{ padding: "clamp(12px, 2vw, 16px)", textAlign: "left", fontWeight: "600" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: "children", type: "ReactNode", default: "-", desc: "Content to be rendered inside the card" },
                { prop: "animationType", type: "string", default: "'alphabetical'", desc: "Type of animation (e.g., 'alphabetical', 'fade', 'slide')" },
                { prop: "className", type: "string", default: "''", desc: "Custom CSS class for additional styling" },
                { prop: "style", type: "object", default: "{}", desc: "Inline styles applied to the root container" },
                { prop: "onClick", type: "function", default: "-", desc: "Callback triggered when the card is clicked" },
                { prop: "href", type: "string", default: "-", desc: "Optional URL, if the card should act as a link" },
                { prop: "...props", type: "object", default: "-", desc: "Additional props spread to the root element" },
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
                      padding: "clamp(12px, 2vw, 16px)",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#fbbf24" : "#d97706",
                      fontSize: "clamp(11px, 2vw, 13px)",
                      wordBreak: 'break-word'
                    }}
                  >
                    {row.prop}
                  </td>
                  <td
                    style={{
                      padding: "clamp(12px, 2vw, 16px)",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#8b5cf6" : "#7c3aed",
                      fontSize: "clamp(11px, 2vw, 13px)",
                      wordBreak: 'break-word'
                    }}
                  >
                    {row.type}
                  </td>
                  <td
                    style={{
                      padding: "clamp(12px, 2vw, 16px)",
                      fontFamily: "monospace",
                      color: isDarkMode ? "#06b6d4" : "#0891b2",
                      fontSize: "clamp(11px, 2vw, 13px)",
                      wordBreak: 'break-word'
                    }}
                  >
                    {row.default}
                  </td>
                  <td style={{ 
                    padding: "clamp(12px, 2vw, 16px)",
                    fontSize: "clamp(11px, 2vw, 14px)",
                    wordBreak: 'break-word'
                  }}>
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Animation Types */}
      <CardSectionWithPreview
        title="Animation Types"
        jsxCode={animationTypesJSX}
        isDarkMode={isDarkMode}
      >
        <div style={getGridStyle('200px')}>
          <AnimatedCard animationType={ANIMATION_TYPES.ALPHABETICAL}>
            <h3 style={headingStyle}>Alphabetical</h3>
            <p style={paragraphStyle}>Letters and numbers animation</p>
          </AnimatedCard>

          <AnimatedCard animationType={ANIMATION_TYPES.ASCII} className={COLOR_VARIANTS.GREEN}>
            <h3 style={headingStyle}>ASCII Art</h3>
            <p style={paragraphStyle}>Special characters animation</p>
          </AnimatedCard>

          <AnimatedCard animationType={ANIMATION_TYPES.PIXELS}>
            <h3 style={headingStyle}>Pixel Art</h3>
            <p style={paragraphStyle}>Block characters animation</p>
          </AnimatedCard>
        </div>
      </CardSectionWithPreview>

      {/* Color Variants */}
      <CardSectionWithPreview
        title="Color Variants"
        jsxCode={colorVariantsJSX}
        isDarkMode={isDarkMode}
      >
        <div style={getGridStyle('200px')}>
          <AnimatedCard className={COLOR_VARIANTS.PURPLE}>
            <h3 style={smallHeadingStyle}>Purple</h3>
          </AnimatedCard>
          
          <AnimatedCard className={COLOR_VARIANTS.BLUE}>
            <h3 style={smallHeadingStyle}>Blue</h3>
          </AnimatedCard>
          
          <AnimatedCard className={COLOR_VARIANTS.GREEN}>
            <h3 style={smallHeadingStyle}>Green</h3>
          </AnimatedCard>
          
          <AnimatedCard className={COLOR_VARIANTS.RED}>
            <h3 style={smallHeadingStyle}>Red</h3>
          </AnimatedCard>
          
          <AnimatedCard className={COLOR_VARIANTS.ORANGE}>
            <h3 style={smallHeadingStyle}>Orange</h3>
          </AnimatedCard>
        </div>
      </CardSectionWithPreview>

      {/* Interactive Examples */}
      <CardSectionWithPreview
        title="Interactive Examples"
        jsxCode={interactiveJSX}
        isDarkMode={isDarkMode}
      >
        <div style={getGridStyle('200px')}>
          <AnimatedCard onClick={() => alert('Card clicked!')}>
            <h3 style={headingStyle}>Click Me! 👆</h3>
            <p style={paragraphStyle}>Interactive card with onClick handler</p>
          </AnimatedCard>

          <AnimatedCard href="https://github.com">
            <img 
              src="https://www.yudiz.com/codepen/code-hover//github-mark-white.svg" 
              alt="GitHub" 
              style={{ 
                width: 'clamp(40px, 10vw, 60px)', 
                height: 'clamp(40px, 10vw, 60px)', 
                marginBottom: '1rem' 
              }}
            />
            <h3 style={headingStyle}>GitHub</h3>
            <p style={paragraphStyle}>Visit our repository</p>
          </AnimatedCard>
        </div>
      </CardSectionWithPreview>
    </div>
  );
};

export default AnimatedCardSection;