import React, { useState, useEffect } from 'react';
import ProgressBar from '../../src/components/ProgressBar';

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
      width: 'fit-content',
      border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
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

const ProgressSectionWithPreview = ({ title, children, jsxCode }) => {
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
    <section style={{ marginBottom: '3rem' }}>
      <h2 style={{ 
        marginBottom: '1.5rem', 
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
          transition: 'all 0.3s ease',
          minHeight: '120px',
          width: '100%'
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

const ProgressBarSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [progress, setProgress] = useState(65);

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

  const containerStyle = {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    background: 'transparent',
    color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };

  // JSX Code examples
  const progressControlJSX = `<div style={{ marginBottom: '20px' }}>
  <label>
    Progress: {progress}%
    <input
      type="range"
      min="0"
      max="100"
      value={progress}
      onChange={(e) => setProgress(parseInt(e.target.value))}
      style={{ marginLeft: '10px' }}
    />
  </label>
</div>`;

  const linearSmallJSX = `<ProgressBar
  type="linear"
  progress={${progress}}
  size="small"
  variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
  showLabel={true}
/>`;

  const linearMediumJSX = `<ProgressBar
  type="linear"
  progress={${progress}}
  size="medium"
  variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
  showLabel={true}
/>`;

  const linearLargeJSX = `<ProgressBar
  type="linear"
  progress={${progress}}
  size="large"
  variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
  showLabel={true}
/>`;

  const customLabelJSX = `<ProgressBar
  type="linear"
  progress={${progress}}
  variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
  showLabel={true}
  label={\`\${progress}/100 Complete\`}
/>`;

  const spinnerJSX = `<div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
  <ProgressBar type="spinner" progress={${progress}} size="small" variant="..." />
  <ProgressBar type="spinner" progress={${progress}} size="medium" variant="..." />
  <ProgressBar type="spinner" progress={${progress}} size="large" variant="..." />
</div>`;

  const edgeCasesJSX = `<ProgressBar
  type="linear"
  progress={0}
  variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
  showLabel={true}
/>

<ProgressBar
  type="linear"
  progress={100}
  variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
  showLabel={true}
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
          { prop: "type", type: "string", default: "'linear'", desc: "Specifies the type of progress bar — can be 'linear' or 'circular'." },
          { prop: "progress", type: "number", default: "0", desc: "Current progress value as a percentage (0–100)." },
          { prop: "size", type: "string", default: "'medium'", desc: "Controls the size of the progress bar — options like 'small', 'medium', or 'large'." },
          { prop: "variant", type: "string", default: "'progressbar-light'", desc: "Defines the color theme variant — e.g., 'progressbar-light' or 'progressbar-dark'." },
          { prop: "showLabel", type: "boolean", default: "false", desc: "Determines whether to show a label displaying the progress percentage or text." },
          { prop: "label", type: "string", default: "''", desc: "Custom label text displayed inside or near the progress bar." },
          { prop: "className", type: "string", default: "''", desc: "Additional custom CSS class name for styling." },
          { prop: "color", type: "string", default: "'#3b82f6'", desc: "Primary color used to style the progress bar fill." },
          { prop: "props", type: "object", default: "{}", desc: "Additional props passed to the root progress bar element." },
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

      {/* Progress Control */}
      <ProgressSectionWithPreview
        title="Progress Control"
        jsxCode={progressControlJSX}
      >
<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <label
    style={{
      fontSize: "16px",
      fontWeight: "500",
      color: isDarkMode ? "#e2e8f0" : "#374151",
    }}
  >
    Progress: {progress}%
  </label>

  <input
    type="range"
    min="0"
    max="100"
    value={progress}
    onChange={(e) => setProgress(parseInt(e.target.value))}
    style={{
      width: "250px",
      height: "6px",
      borderRadius: "3px",
      // Gradient for the filled (left) and unfilled (right) parts
      background: `linear-gradient(to right, ${
        isDarkMode ? "#ff00ff" : "#ff00ff"
      } ${progress}%, ${isDarkMode ? "#374151" : "#e5e7eb"} ${progress}%)`,
      outline: "none",
      cursor: "pointer",
      appearance: "none",
    }}
  />

  {/* Optional: custom thumb styling */}
  <style>{`
    input[type=range]::-webkit-slider-thumb {
      appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: ${isDarkMode ? "#c700c7" : "#c700c7"};
      cursor: pointer;
      transition: background 0.2s;
    }
    input[type=range]::-webkit-slider-thumb:hover {
      background: #b502b5;
    }
  `}</style>
</div>

      </ProgressSectionWithPreview>

      {/* Linear Progress Bars - Different Sizes */}
      <ProgressSectionWithPreview
        title="Linear Progress Bar Sizes"
        jsxCode={`${linearSmallJSX}\n\n${linearMediumJSX}\n\n${linearLargeJSX}`}
      >   
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h4 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              color: isDarkMode ? '#cbd5e1' : '#4b5563' 
            }}>Small</h4>
            <ProgressBar
              type="linear"
              progress={progress}
              size="small"
              variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
              showLabel={true}
              color='#ff00ff'
            />
          </div>
          <div>
            <h4 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              color: isDarkMode ? '#cbd5e1' : '#4b5563' 
            }}>Medium (Default)</h4>
            <ProgressBar
              type="linear"
              progress={progress}
              size="medium"
              variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
              showLabel={true}
              color='#ff00ff'
            />
          </div>
          <div>
            <h4 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              color: isDarkMode ? '#cbd5e1' : '#4b5563' 
            }}>Large</h4>
            <ProgressBar
              type="linear"
              progress={progress}
              size="large"
              variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
              showLabel={true}
              color='#ff00ff'
            />
          </div>
        </div>
      </ProgressSectionWithPreview>

      {/* Custom Label */}
      <ProgressSectionWithPreview
        title="Custom Label"
        jsxCode={customLabelJSX}
      >
        <div style={{ width: '100%', "--progress-color": '#008000' }}>
          <h4 style={{ 
            margin: '0 0 12px 0', 
            fontSize: '16px', 
            color: isDarkMode ? '#cbd5e1' : '#4b5563' 
          }}>With Custom Label</h4>
          <ProgressBar
            type="linear"
            progress={progress}
            variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
            showLabel={true}
            label={`${progress}/100 Complete`}
            color='#ff00ff'
          />
        </div>
      </ProgressSectionWithPreview>

      {/* Spinner Progress Bars */}
      <ProgressSectionWithPreview
        title="Spinner Progress Bars"
        jsxCode={spinnerJSX}
      >
        <div style={{ width: '100%' }}>
          <div style={{ 
            display: 'flex', 
            gap: '40px', 
            alignItems: 'center', 
            marginBottom: '32px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '14px', 
                color: isDarkMode ? '#cbd5e1' : '#4b5563' 
              }}>Small</h4>
              <ProgressBar
                type="spinner"
                progress={progress}
                size="small"
                variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
                color='#ff00ff'
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <h4 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '14px', 
                color: isDarkMode ? '#cbd5e1' : '#4b5563' 
              }}>Medium</h4>
              <ProgressBar
                type="spinner"
                progress={progress}
                size="medium"
                variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
                color='#ff00ff'
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <h4 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '14px', 
                color: isDarkMode ? '#cbd5e1' : '#4b5563' 
              }}>Large</h4>
              <ProgressBar
                type="spinner"
                progress={progress}
                size="large"
                variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
                color='#ff00ff'
              />
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h4 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              color: isDarkMode ? '#cbd5e1' : '#4b5563' 
            }}>With Label</h4>
            <ProgressBar
              type="spinner"
              progress={progress}
              size="large"
              variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
              showLabel={true}
              color='#ff00ff'
            />
          </div>
        </div>
      </ProgressSectionWithPreview>

      {/* Edge Cases */}
      <ProgressSectionWithPreview
        title="Edge Cases"
        jsxCode={edgeCasesJSX}
      >
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h4 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              color: isDarkMode ? '#cbd5e1' : '#4b5563' 
            }}>0% Progress</h4>
            <ProgressBar
              type="linear"
              progress={0}
              variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
              showLabel={true}
              color='#ff00ff'
            />
          </div>

          <div>
            <h4 style={{ 
              margin: '0 0 12px 0', 
              fontSize: '16px', 
              color: isDarkMode ? '#cbd5e1' : '#4b5563' 
            }}>100% Progress</h4>
            <ProgressBar
              type="linear"
              progress={100}
              variant={isDarkMode ? 'progressbar-dark' : 'progressbar-light'}
              showLabel={true}
              color='#ff00ff'
            />
          </div>
        </div>
      </ProgressSectionWithPreview>

    </div>
  );
};

export default ProgressBarSection;