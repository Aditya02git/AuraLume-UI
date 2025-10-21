import React, { useState, useEffect } from 'react';
import VHS from '../../src/components/VHS';

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

// ------------------- Accordion Section With Preview -------------------
const VHSSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
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
            // Add centering for preview container
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px', // Give it some minimum height
          }}
        >
          {children}
        </div>
      )}

      {activeTab === 'TSX/JSX' && <CodeDisplay code={jsxCode} language="TSX/JSX" />}
    </section>
  );
};

// ------------------- Main Accordion Section -------------------
const VHSSection = () => {
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

  const jsxCode1 = `<VHS 
  playText="Record"
  sequence="7" 
  tapeNumber="TAPE 007"
  date="DEC. 25 2024"
  time="11:59:59 PM"
  style={{height: '400px', width: '600px'}}
>
  <div style={{ 
    padding: '2rem', 
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }}>
    Your content here
  </div>
</VHS>`;

  const jsxCode2 = `<VHS showFrame={false} style={{height: '400px', width: '600px'}}>
  <img 
    src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/image-1.webp" 
    alt="VHS filtered image" 
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }}
  />
</VHS>`;

  const jsxCode3 = `<VHS 
  showFilmGrain={false}  
  style={{height: '400px', width: '600px', backgroundColor: 'black'}}
>
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }}>
    <h1 style={{color: 'red'}}>VHS with background color</h1>
  </div>
</VHS>`;

  const jsxCode4 = `<VHS 
  showFilmGrain={false} 
  showStatic={false} 
  style={{height: '400px', width: '600px'}}
>
  <div style={{
    height: '100%',
    overflowY: 'auto',
    padding: '20px'
  }}>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
      <section 
        key={num}
        style={{
          margin: '20px 0',
          padding: '40px',
          border: '2px solid white',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold'
        }}
      >
        Section {num}
      </section>
    ))}
  </div>
</VHS>`;

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
          { prop: "children", type: "ReactNode", default: "—", desc: "Elements or components to display within the VHS visual frame." },
          { prop: "showFrame", type: "boolean", default: "true", desc: "Determines whether to display the retro VHS-style frame overlay." },
          { prop: "showFilmGrain", type: "boolean", default: "true", desc: "Adds a subtle film grain texture over the content to simulate VHS static noise." },
          { prop: "showStatic", type: "boolean", default: "true", desc: "Enables or disables VHS static effect animation for a nostalgic glitch look." },
          { prop: "playText", type: "string", default: "'Play'", desc: "Text displayed on screen representing the VHS playback label." },
          { prop: "playTextColor", type: "string", default: "'#fff'", desc: "Color of the play text displayed in the VHS overlay." },
          { prop: "sequence", type: "string", default: "'3'", desc: "Indicates the VHS sequence number label shown on screen." },
          { prop: "tapeNumber", type: "string", default: "'TAPE 003'", desc: "Displays a custom tape identifier number in the overlay." },
          { prop: "date", type: "string", default: "'MAR. 03 2024'", desc: "Date text displayed as part of the VHS overlay interface." },
          { prop: "time", type: "string", default: "'00:00:00 AM'", desc: "Displays the time label on the VHS overlay for a realistic effect." },
          { prop: "textColor", type: "string", default: "'#ff0000'", desc: "Sets the primary color for VHS overlay text such as date, time, and labels." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class name for layout, sizing, or style control." },
          { prop: "...props", type: "any", default: "—", desc: "Additional props passed down to the VHS container element." },
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

      <VHSSectionWithPreview
        title="Basic VHS effect with all features enabled"
        jsxCode={jsxCode1}
        isDarkMode={isDarkMode}
      >
        <VHS 
          playText="Record"
          sequence="7" 
          tapeNumber="TAPE 007"
          date="DEC. 25 2024"
          time="11:59:59 PM"
          style={{height: '100vh', width: '100%'}}
        >
          <div style={{ 
            padding: '2rem', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#ff0000'
          }}>
            Your content here
          </div>
        </VHS>
      </VHSSectionWithPreview>

      <VHSSectionWithPreview
        title="Minimal VHS effect (only film grain and static)"
        jsxCode={jsxCode2}
        isDarkMode={isDarkMode}
      >
        <VHS showFrame={false} style={{height: '100vh', width: '100%'}}>
          <img 
            src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/image-1.webp" 
            alt="VHS filtered image" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </VHS>
      </VHSSectionWithPreview>

      <VHSSectionWithPreview
        title="VHS with background color"
        jsxCode={jsxCode3}
        isDarkMode={isDarkMode}
      >
        <VHS 
          showFilmGrain={false}  
          style={{height: '100vh', width: '100%', backgroundColor: 'black'}}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}>
            <h1 style={{color: 'red'}}>VHS with background color</h1>
          </div>
        </VHS>
      </VHSSectionWithPreview>

      <VHSSectionWithPreview
        title="Scrollable content inside VHS"
        jsxCode={jsxCode4}
        isDarkMode={isDarkMode}
      >
        <VHS showFrame={false}

          style={{height: '100vh', width: '100%', backgroundColor: 'black'}}
        >
          <div style={{
            height: '100%',
            overflowY: 'auto',
            padding: '20px'
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <section 
                key={num}
                style={{
                  margin: '20px 0',
                  padding: '40px',
                  border: '2px solid white',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}
              >
                Section {num}
              </section>
            ))}
          </div>
        </VHS>
      </VHSSectionWithPreview>
    </div>
  );
};

export default VHSSection;