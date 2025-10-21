import React, { useState, useEffect } from 'react';
import TextArea from '../../src/components/TextArea';

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

const TextAreaSectionWithPreview = ({ title, children, jsxCode }) => {
  const [activeTab, setActiveTab] = useState('Preview');
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
    <section style={{ marginBottom: '4rem' }}>
      <h2 style={{ 
        marginBottom: '2rem', 
        color: isDarkMode ? '#ffffff' : '#000000', 
        fontSize: '24px', 
        fontWeight: 'bold' 
      }}>
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

const TextAreaSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerStyle = {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    background: 'transparent',
    color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };

  const [basicText, setBasicText] = useState('');
  const [counterText, setCounterText] = useState('');
  const [autoExpandText, setAutoExpandText] = useState('');
  const [customText, setCustomText] = useState('');

  // JSX Code examples
  const basicTextAreaJSX = `
  const [basicText, setBasicText] = useState('');
  const [counterText, setCounterText] = useState('');
  const [autoExpandText, setAutoExpandText] = useState('');
  const [customText, setCustomText] = useState('');

  <TextArea
  placeholder="Enter your text here..."
  value={basicText}
  onChange={(e) => setBasicText(e.target.value)}
  theme={isDarkMode ? 'textarea-dark' : 'textarea-light'}
/>`;

  const counterTextAreaJSX = `
  const [basicText, setBasicText] = useState('');
  const [counterText, setCounterText] = useState('');
  const [autoExpandText, setAutoExpandText] = useState('');
  const [customText, setCustomText] = useState('');

  <TextArea
  variant="counter"
  placeholder="Type to see character and word count..."
  value={counterText}
  onChange={(e) => setCounterText(e.target.value)}
  theme={isDarkMode ? 'textarea-dark' : 'textarea-light'}
/>`;

  const autoExpandTextAreaJSX = `
  const [basicText, setBasicText] = useState('');
  const [counterText, setCounterText] = useState('');
  const [autoExpandText, setAutoExpandText] = useState('');
  const [customText, setCustomText] = useState('');

  <TextArea
  variant="auto-expand"
  placeholder="This textarea grows as you type..."
  value={autoExpandText}
  onChange={(e) => setAutoExpandText(e.target.value)}
  minHeight={60}
  maxHeight={250}
  theme={isDarkMode ? 'textarea-dark' : 'textarea-light'}
/>`;

  const customConfigJSX = `
  const [basicText, setBasicText] = useState('');
  const [counterText, setCounterText] = useState('');
  const [autoExpandText, setAutoExpandText] = useState('');
  const [customText, setCustomText] = useState('');

  // Auto-expand with counter
<TextArea
  autoExpand
  showCounter
  placeholder="Auto-expand with counter..."
  minHeight={80}
  maxHeight={200}
  theme={isDarkMode ? 'textarea-dark' : 'textarea-light'}
/>

// Disabled state
<TextArea
  disabled
  value="This textarea is disabled"
  placeholder="You can't edit this..."
  theme={isDarkMode ? 'textarea-dark' : 'textarea-light'}
/>

// Custom styling
<TextArea
  className="my-custom-textarea"
  placeholder="Custom styled textarea..."
  showCounter
  theme={isDarkMode ? 'textarea-dark' : 'textarea-light'}
/>`;

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
        <div style={{overflowX: 'auto'}}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
            minWidth: '600px'
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
          { prop: "variant", type: "string", default: "'default'", desc: "Defines the visual style of the textarea — e.g., 'default', 'outline', or 'filled'." },
          { prop: "placeholder", type: "string", default: "'Start typing...'", desc: "Text displayed when the textarea is empty." },
          { prop: "value", type: "string", default: "''", desc: "Current value of the textarea." },
          { prop: "onChange", type: "function", default: "() => {}", desc: "Callback triggered when the text value changes." },
          { prop: "showCounter", type: "boolean", default: "false", desc: "If true, displays a character counter below the textarea." },
          { prop: "autoExpand", type: "boolean", default: "false", desc: "If true, automatically expands the textarea height based on content." },
          { prop: "minHeight", type: "number", default: "60", desc: "Minimum height of the textarea in pixels." },
          { prop: "maxHeight", type: "number", default: "300", desc: "Maximum height of the textarea in pixels (for autoExpand)." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class for styling." },
          { prop: "disabled", type: "boolean", default: "false", desc: "Disables user input when true." },
          { prop: "rows", type: "number", default: "4", desc: "Sets the number of visible text lines (ignored if autoExpand is true)." },
          { prop: "theme", type: "string", default: "'textarea-light'", desc: "Defines color theme — 'textarea-light' or 'textarea-dark'." },
          { prop: "color", type: "string", default: "'#6c757d'", desc: "Base border/text color for the textarea." },
          { prop: "focusColor", type: "string", default: "'#3b82f6'", desc: "Color applied to border and glow when focused." },
          { prop: "...props", type: "object", default: "—", desc: "Additional HTML attributes passed to the textarea element." },
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

      {/* Basic TextArea */}
      <TextAreaSectionWithPreview
        title="Basic TextArea"
        jsxCode={basicTextAreaJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextArea
            placeholder="Enter your text here..."
            value={basicText}
            onChange={(e) => setBasicText(e.target.value)}
            theme={isDarkMode ? 'textarea-dark' : 'textarea-light'}
          />
        </div>
      </TextAreaSectionWithPreview>

      {/* Counter Variant */}
      <TextAreaSectionWithPreview
        title="TextArea with Counter"
        jsxCode={counterTextAreaJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextArea
            variant="counter"
            placeholder="Type to see character and word count..."
            value={counterText}
            onChange={(e) => setCounterText(e.target.value)}
            theme={isDarkMode ? 'textarea-dark' : 'textarea-light'}
          />
        </div>
      </TextAreaSectionWithPreview>

      {/* Auto-Expand Variant */}
      <TextAreaSectionWithPreview
        title="Auto-Expanding TextArea"
        jsxCode={autoExpandTextAreaJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextArea
            variant="auto-expand"
            placeholder="This textarea grows as you type..."
            value={autoExpandText}
            onChange={(e) => setAutoExpandText(e.target.value)}
            minHeight={60}
            maxHeight={250}
            theme={isDarkMode ? 'textarea-dark' : 'textarea-light'}
          />
        </div>
      </TextAreaSectionWithPreview>

      {/* Custom Configuration Examples - FIXED */}
      <TextAreaSectionWithPreview
        title="Custom Configurations"
        jsxCode={customConfigJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ 
          display: 'grid', 
          gap: '32px',
          // Fixed grid for mobile responsiveness
          gridTemplateColumns: isMobile 
            ? '1fr' 
            : 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          // Alternative CSS-only approach (commented out in favor of JS solution)
          // gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          width: '100%',
          overflow: 'hidden'
        }}>
          {/* Auto-expand with counter */}
          <div style={{ 
            padding: '24px',
            backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
            borderRadius: '12px',
            border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
            minWidth: 0, // Prevents grid item from overflowing
            overflow: 'hidden'
          }}>
            <h3 style={{ 
              marginBottom: '16px', 
              color: isDarkMode ? '#06b6d4' : '#0369a1',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Auto-expand + Counter
            </h3>
            <TextArea
              autoExpand
              showCounter
              placeholder="Auto-expand with counter..."
              minHeight={80}
              maxHeight={200}
              theme={isDarkMode ? 'textarea-dark' : 'textarea-light'}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />
          </div>

          {/* Disabled state */}
          <div style={{ 
            padding: '24px',
            backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
            borderRadius: '12px',
            border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
            minWidth: 0,
            overflow: 'hidden'
          }}>
            <h3 style={{ 
              marginBottom: '16px', 
              color: isDarkMode ? '#f59e0b' : '#d97706',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Disabled TextArea
            </h3>
            <TextArea
              disabled
              value="This textarea is disabled"
              placeholder="You can't edit this..."
              theme={isDarkMode ? 'textarea-dark' : 'textarea-light'}
            />
          </div>

          {/* Custom styling */}
          <div style={{ 
            padding: '24px',
            backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
            borderRadius: '12px',
            border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
            gridColumn: isMobile ? 'auto' : '1 / -1', // Full width only on desktop
            minWidth: 0,
            overflow: 'hidden'
          }}>
            <h3 style={{ 
              marginBottom: '16px', 
              color: isDarkMode ? '#8b5cf6' : '#7c3aed',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              With Custom Class & Counter
            </h3>
            <TextArea
              className="my-custom-textarea"
              placeholder="Custom styled textarea..."
              showCounter
              theme={isDarkMode ? 'textarea-dark' : 'textarea-light'}
            />
          </div>
        </div>
      </TextAreaSectionWithPreview>
    </div>
  );
};

export default TextAreaSection;