import React, { useState, useEffect } from 'react';
import SkeletonLoader from '../../src/components/SkeletonLoader';

// Preview Toggle Component
const PreviewToggle = ({ activeTab, onTabChange }) => {
  const tabs = ['Preview', 'TSX/JSX'];
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

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
      gap: '2px', 
      backgroundColor: isDarkMode ? '#1e293b' : '#f1f5f9', 
      padding: '4px', 
      borderRadius: '8px',
      marginBottom: '24px',
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
            transition: 'all 0.2s ease',
            minWidth: '80px'
          }}
          onMouseEnter={(e) => {
            if (activeTab !== tab) {
              e.target.style.backgroundColor = isDarkMode ? '#334155' : '#e2e8f0';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTab !== tab) {
              e.target.style.backgroundColor = 'transparent';
            }
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
      backgroundColor: '#0f172a', 
      borderRadius: '12px', 
      overflow: 'hidden',
      marginBottom: '16px',
      border: '1px solid #1e293b',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        backgroundColor: '#1e293b',
        borderBottom: '1px solid #334155'
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
            borderRadius: '6px',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontWeight: '500'
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
        padding: '20px', 
        margin: 0, 
        color: '#e2e8f0', 
        fontSize: '14px',
        lineHeight: '1.6',
        overflow: 'auto',
        fontFamily: '"Fira Code", "Monaco", "Cascadia Code", monospace'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const SwitchSectionWithPreview = ({ title, children, jsxCode, description }) => {
  const [activeTab, setActiveTab] = useState('Preview');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

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
    <section style={{ marginBottom: '5rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ 
          marginBottom: '0.5rem', 
          color: isDarkMode ? '#ffffff' : '#1a1a1a', 
          fontSize: '28px', 
          fontWeight: '700',
          letterSpacing: '-0.025em'
        }}>
          {title}
        </h2>
        {description && (
          <p style={{
            color: isDarkMode ? '#94a3b8' : '#64748b',
            fontSize: '16px',
            lineHeight: '1.6',
            margin: 0
          }}>
            {description}
          </p>
        )}
      </div>
      
      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'Preview' && (
        <div style={{
          padding: '40px',
          backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
          borderRadius: '16px',
          border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
          transition: 'all 0.3s ease',
          boxShadow: isDarkMode 
            ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          position: 'relative'
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

const SkeletonLoaderSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

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
    padding: '60px 40px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    background: 'transparent',
    color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };

  const basicSkeletonJSX = `<SkeletonLoader 
  theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
  width="300px"
  height="20px"
/>`;

  const multipleSkeletonJSX = `<SkeletonLoader 
  theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
  width="100%"
  height="16px"
  count={3}
  spacing="8px"
/>`;

  const avatarSkeletonJSX = `<SkeletonLoader 
  theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
  variant="circular"
  width="60px"
  height="60px"
/>`;

  const cardSkeletonJSX = `<SkeletonLoader 
  theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
  variant="rounded"
  width="100%"
  height="200px"
/>`;

  const buttonSkeletonJSX = `<SkeletonLoader 
  theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
  variant="rounded"
  width="120px"
  height="40px"
/>`;

  const waveSkeletonJSX = `<SkeletonLoader 
  theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
  animation="wave"
  width="100%"
  height="20px"
  count={2}
/>`;

  const userCardSkeletonJSX = `<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
  <SkeletonLoader 
    theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
    variant="circular"
    width="50px"
    height="50px"
  />
  <div style={{ flex: 1 }}>
    <SkeletonLoader 
      theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
      width="120px"
      height="16px"
      style={{ marginBottom: '8px' }}
    />
    <SkeletonLoader 
      theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
      width="80px"
      height="14px"
    />
  </div>
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
        <div style={{ overflowX: 'auto'}}>
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
              { prop: "width", type: "string", default: "'100%'", desc: "Width of the skeleton loader" },
              { prop: "height", type: "string", default: "'20px'", desc: "Height of the skeleton loader" },
              { prop: "borderRadius", type: "string", default: "'4px'", desc: "Border radius for rounded corners" },
              { prop: "count", type: "number", default: "1", desc: "Number of skeleton lines to render" },
              { prop: "spacing", type: "string", default: "'10px'", desc: "Spacing between multiple skeletons" },
              { prop: "variant", type: "string", default: "'text'", desc: "Shape of the loader ('text', 'circular', 'rectangular', 'rounded')" },
              { prop: "animation", type: "string", default: "'pulse'", desc: "Animation style ('pulse', 'wave', 'none')" },
              { prop: "theme", type: "string", default: "'skeleton-light'", desc: "Theme of the skeleton loader (e.g., 'skeleton-light', 'skeleton-dark')" },
              { prop: "className", type: "string", default: "''", desc: "Custom CSS class for styling" },
              { prop: "style", type: "object", default: "{}", desc: "Inline style overrides for the skeleton element" },
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

      {/* Header Section */}

      <SwitchSectionWithPreview
        title="Basic Usage"
        description=""
        jsxCode={basicSkeletonJSX}
      >
        <SkeletonLoader 
          theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
          width="230px"
          height="20px"
        />
      </SwitchSectionWithPreview>

      <SwitchSectionWithPreview
        title="Multiple Lines"
        description=""
        jsxCode={multipleSkeletonJSX}
      >
        <SkeletonLoader 
          theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
          width="100%"
          height="16px"
          count={3}
          spacing="8px"
        />
      </SwitchSectionWithPreview>

      <SwitchSectionWithPreview
        title="Avatar Skeleton"
        description=""
        jsxCode={avatarSkeletonJSX}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <SkeletonLoader 
            theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
            variant="circular"
            width="60px"
            height="60px"
          />
          <SkeletonLoader 
            theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
            variant="circular"
            width="80px"
            height="80px"
          />
          <SkeletonLoader 
            theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
            variant="circular"
            width="100px"
            height="100px"
          />
        </div>
      </SwitchSectionWithPreview>

      <SwitchSectionWithPreview
        title="Card Skeleton"
        description=""
        jsxCode={cardSkeletonJSX}
      >
        <SkeletonLoader 
          theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
          variant="rounded"
          width="100%"
          height="200px"
        />
      </SwitchSectionWithPreview>

      <SwitchSectionWithPreview
        title="Button Skeleton"
        description=""
        jsxCode={buttonSkeletonJSX}
      >
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <SkeletonLoader 
            theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
            variant="rounded"
            width="120px"
            height="40px"
          />
          <SkeletonLoader 
            theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
            variant="rounded"
            width="100px"
            height="32px"
          />
          <SkeletonLoader 
            theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
            variant="rounded"
            width="80px"
            height="36px"
          />
        </div>
      </SwitchSectionWithPreview>

      <SwitchSectionWithPreview
        title="Wave Animation"
        description=""
        jsxCode={waveSkeletonJSX}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SkeletonLoader 
            theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
            animation="wave"
            width="100%"
            height="20px"
          />
          <SkeletonLoader 
            theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
            animation="wave"
            width="80%"
            height="20px"
          />
        </div>
      </SwitchSectionWithPreview>

      <SwitchSectionWithPreview
        title="User Card Skeleton"
        description=""
        jsxCode={userCardSkeletonJSX}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <SkeletonLoader 
              theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
              variant="circular"
              width="50px"
              height="50px"
            />
            <div style={{ flex: 1 }}>
              <SkeletonLoader 
                theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
                width="120px"
                height="16px"
                style={{ marginBottom: '8px' }}
              />
              <SkeletonLoader 
                theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
                width="80px"
                height="14px"
              />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <SkeletonLoader 
              theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
              variant="circular"
              width="50px"
              height="50px"
            />
            <div style={{ flex: 1 }}>
              <SkeletonLoader 
                theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
                width="140px"
                height="16px"
                style={{ marginBottom: '8px' }}
              />
              <SkeletonLoader 
                theme={isDarkMode ? 'skeleton-dark' : 'skeleton-light'}
                width="100px"
                height="14px"
              />
            </div>
          </div>
        </div>
      </SwitchSectionWithPreview>
    </div>
  );
};

export default SkeletonLoaderSection;