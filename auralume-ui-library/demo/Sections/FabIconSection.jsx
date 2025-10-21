import React, { useState, useEffect } from 'react';
import FabIcon from '../../src/components/FabIcon';

// ------------------- Preview Toggle -------------------
const PreviewToggle = ({ activeTab, onTabChange, isDarkMode }) => {
  const tabs = ['Preview', 'TSX/JSX'];

  return (
    <div
      style={{
        display: 'flex',
        gap: '4px',
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        padding: '4px',
        borderRadius: '8px',
        marginBottom: '16px',
        width: 'fit-content',
      }}
    >
      {tabs.map((tab) => (
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
            transition: 'all 0.2s ease',
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// ------------------- Code Display -------------------
const CodeDisplay = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (err) {
      console.error('Clipboard copy failed, using fallback', err);
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
    }

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: 'relative',
        backgroundColor: '#1e293b',
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          backgroundColor: '#334155',
          borderBottom: '1px solid #475569',
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
            padding: '6px 12px',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
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
          padding: '16px',
          margin: 0,
          color: '#e2e8f0',
          fontSize: '14px',
          lineHeight: '1.5',
          overflow: 'auto',
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

// ------------------- Demo Container Component -------------------
const DemoContainer = ({ title, children, height = '300px', isDarkMode }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h3 style={{ 
      marginBottom: '1rem', 
      color: isDarkMode ? '#ffffff' : '#000000',
      fontSize: '18px',
      fontWeight: '600'
    }}>
      {title}
    </h3>
    <div
      style={{
        position: 'relative',
        width: '100%',
        height,
        backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
        border: `2px dashed ${isDarkMode ? '#334155' : '#cbd5e1'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  </div>
);

// ------------------- Accordion Section With Preview -------------------
const FabIconSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('Preview');

  return (
    <section style={{ marginBottom: '4rem' }}>
      <h2
        style={{
          marginBottom: '2rem',
          color: isDarkMode ? '#ffffff' : '#000000',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        {title}
      </h2>

      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode} />

      {activeTab === 'Preview' && (
        <div
          style={{
            padding: '32px',
            background: 'transparent',
            transition: 'all 0.3s ease',
          }}
        >
          {children}
        </div>
      )}

      {activeTab === 'TSX/JSX' && <CodeDisplay code={jsxCode} language="TSX/JSX" />}
    </section>
  );
};

const Heart = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7z" />
  </svg>
);

const Mic = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14q-1.25 0-2.125-.875T9 11V5q0-1.25.875-2.125T12 2t2.125.875T15 5v6q0 1.25-.875 2.125T12 14m-1 7v-3.075q-2.6-.35-4.3-2.325T5 11h2q0 2.075 1.463 3.538T12 16t3.538-1.463T17 11h2q0 2.625-1.7 4.6T13 17.925V21z" />
  </svg>
);

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z" />
  </svg>
);

const Settings = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 22q-1.525 0-3.125-.55t-2.9-1.5t-2.137-2.225T3 15v-3l4 3l-1.55 1.55q.725 1.275 2.3 2.2T11 19.925V11H8V9h3V7.825q-.875-.325-1.437-1.088T9 5q0-1.25.875-2.125T12 2t2.125.875T15 5q0 .975-.562 1.738T13 7.825V9h3v2h-3v8.925q1.675-.25 3.25-1.175t2.3-2.2L17 15l4-3v3q0 1.45-.837 2.725t-2.138 2.225t-2.9 1.5T12 22m0-16q.425 0 .713-.287T13 5t-.288-.712T12 4t-.712.288T11 5t.288.713T12 6" />
  </svg>
);

// ------------------- Main Accordion Section -------------------
const FabIconSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved) setIsDarkMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('darkMode');
      if (saved) setIsDarkMode(JSON.parse(saved));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const menuItems = [
    { icon: <Heart />, label: 'Favorites', id: 'favorites' },
    { icon: <Mic />, label: 'Voice', id: 'voice' },
    { icon: <Star />, label: 'Rate', id: 'rate' },
    { icon: <Settings />, label: 'Settings', id: 'settings' }
  ];

  const handleItemClick = (item, index) => {
    console.log('Clicked:', item.label, 'at index:', index);
    // Handle your action here
  };

  const radialCode = `
// Define your menu items
const menuItems = [
  { icon: <HeartIcon />, label: 'Favorites', id: 'favorites' },
  { icon: <MicIcon />, label: 'Voice', id: 'voice' },
  { icon: <StarIcon />, label: 'Rate', id: 'rate' },
  { icon: <SettingsIcon />, label: 'Settings', id: 'settings' }
];

const handleItemClick = (item, index) => {
  console.log('Clicked:', item.label, 'at index:', index);
};

      {/* Radial FAB */}
      <FabIcon
        type="radial"
        theme="fab-light"
        items={menuItems}
        size="medium"
        onItemClick={handleItemClick}
      />`;
      
  const linearCode = `
// Define your menu items
const menuItems = [
  { icon: <HeartIcon />, label: 'Favorites', id: 'favorites' },
  { icon: <MicIcon />, label: 'Voice', id: 'voice' },
  { icon: <StarIcon />, label: 'Rate', id: 'rate' },
  { icon: <SettingsIcon />, label: 'Settings', id: 'settings' }
];

const handleItemClick = (item, index) => {
  console.log('Clicked:', item.label, 'at index:', index);
};

      {/* Linear FAB */}
      <FabIcon
        type="linear"
        theme="fab-dark"
        items={menuItems.slice(0, 3)}
        size="small"
        onItemClick={handleItemClick}
      />`;

  const circularCode = `
// Define your menu items
const menuItems = [
  { icon: <HeartIcon />, label: 'Favorites', id: 'favorites' },
  { icon: <MicIcon />, label: 'Voice', id: 'voice' },
  { icon: <StarIcon />, label: 'Rate', id: 'rate' },
  { icon: <SettingsIcon />, label: 'Settings', id: 'settings' }
];

const handleItemClick = (item, index) => {
  console.log('Clicked:', item.label, 'at index:', index);
};

      {/* Circular FAB with custom positioning */}
      <FabIcon
        type="circular"
        theme="fab-light"
        items={menuItems}
        size="large"
        position="bottom-right"
        onItemClick={handleItemClick}
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
              { prop: "type", type: "'linear' | 'radial' | 'circular'", default: "'radial'", desc: "Layout type for menu items" },
              { prop: "theme", type: "'fab-light' | 'fab-dark'", default: "'fab-light'", desc: "Theme variant" },
              { prop: "items", type: "Array<{icon, label, id}>", default: "[]", desc: "Array of menu items" },
              { prop: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", desc: "Size variant" },
              { prop: "position", type: "'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'", default: "'bottom-right'", desc: "Fixed positioning" },
              { prop: "color", type: "string", default: "'#000000'", desc: "Primary color of the FabIcon." },
              { prop: "onItemClick", type: "(item, index) => void", default: "() => {}", desc: "Callback function when item is clicked" },
              { prop: "disabled", type: "boolean", default: "false", desc: "Disable the component" },
              { prop: "className", type: "string", default: "''", desc: "Additional CSS classes" },
              { prop: "style", type: "CSSProperties", default: "{}", desc: "Inline styles" },
              { prop: "triggerIcon", type: "ReactNode", default: "null", desc: "Custom trigger icon" },
              { prop: "closeOnItemClick", type: "boolean", default: "true", desc: "Close menu after item click" },
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

      <FabIconSectionWithPreview
        title="Radial FAB"
        jsxCode={radialCode}
        isDarkMode={isDarkMode}
      >
        {/* Radial FAB Demo */}
        <DemoContainer title="" isDarkMode={isDarkMode} height="400px">
          <FabIcon
            type="arc"
            theme={isDarkMode ? 'fab-dark' : 'fab-light'}
            items={menuItems.slice(0, 3)}
            size="small"
            onItemClick={handleItemClick}
            style={{ position: 'absolute' }}
          />
        </DemoContainer>

      </FabIconSectionWithPreview>


      <FabIconSectionWithPreview
        title="Linear FAB"
        jsxCode={linearCode}
        isDarkMode={isDarkMode}
      >

        {/* Linear FAB Demo */}
        <DemoContainer title="" isDarkMode={isDarkMode} height="400px">
          <FabIcon
            type="linear"
            theme={isDarkMode ? 'fab-dark' : 'fab-light'}
            items={menuItems.slice(0, 3)}
            size="medium"
            onItemClick={handleItemClick}
            style={{ position: 'absolute' }}
          />
        </DemoContainer>
      </FabIconSectionWithPreview>


      <FabIconSectionWithPreview
        title="Circular FAB"
        jsxCode={circularCode}
        isDarkMode={isDarkMode}
      >
        {/* Circular FAB Demo */}
        <DemoContainer title="" isDarkMode={isDarkMode} height="400px">
          <FabIcon
            type="circular"
            theme={isDarkMode ? 'fab-dark' : 'fab-light'}
            items={menuItems}
            size="large"
            position='center'
            onItemClick={handleItemClick}
            style={{ position: 'absolute' }}
          />
        </DemoContainer>
      </FabIconSectionWithPreview>
    </div>
  );
};

export default FabIconSection;