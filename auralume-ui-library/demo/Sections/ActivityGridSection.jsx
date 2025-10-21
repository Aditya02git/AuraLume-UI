import React, { useState, useEffect } from 'react';
import ActivityGrid from '../../src/components/ActivityGrid';
import Slider from '../../src/components/Slider';

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

// ------------------- ActivityGrid Section With Preview -------------------
const ActivityGridSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
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
            backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
            borderRadius: '12px',
            border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
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

// ------------------- Main ActivityGrid Section -------------------
const ActivityGridSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hue, setHue] = useState(280);

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

  // Generate sample data for custom data example
  const sampleData = Array.from({ length: 365 }, (_, index) => {
    // Create a pattern that shows more activity in certain periods
    const dayOfYear = index + 1;
    if (dayOfYear % 7 === 0 || dayOfYear % 7 === 6) return Math.floor(Math.random() * 2); // Weekends - less activity
    if (dayOfYear > 100 && dayOfYear < 150) return Math.floor(Math.random() * 5); // Spring - high activity
    if (dayOfYear > 300 && dayOfYear < 350) return Math.floor(Math.random() * 4); // Late year - medium activity
    return Math.floor(Math.random() * 3); // Regular days
  });

  const customDataJSX = `import React from 'react';
import ActivityGrid from './ActivityGrid';

const sampleData = Array.from({ length: 365 }, (_, index) => {
  const dayOfYear = index + 1;
  if (dayOfYear % 7 === 0 || dayOfYear % 7 === 6) return Math.floor(Math.random() * 2);
  if (dayOfYear > 100 && dayOfYear < 150) return Math.floor(Math.random() * 5);
  if (dayOfYear > 300 && dayOfYear < 350) return Math.floor(Math.random() * 4);
  return Math.floor(Math.random() * 3);
});

function CustomDataExample() {
  return (
    <div style={{
      "--month-1": '280',
      "--month-2": '260',
      "--month-3": '240',
      "--month-4": '180',
      "--month-5": '120',
      "--month-6": '80',
      "--month-7": '80',
      "--month-8": '120',
      "--month-9": '180',
      "--month-10": '240',
      "--month-11": '260',
      "--month-12": '280',
    }}>
      <ActivityGrid 
        data={sampleData} 
        year={2024}
      />
    </div>
  );
}

export default CustomDataExample;`;

  const clickableJSX = `import React from 'react';
import ActivityGrid from './ActivityGrid';

function ClickableExample() {
  const handleDayClick = (dayInfo) => {
    console.log(dayInfo); // { date, level, dateString }
    alert(\`Clicked: \${dayInfo.dateString} (Level: \${dayInfo.level})\`);
  };

  const monthVars = Object.fromEntries(
    Array.from({ length: 12 }, (_, i) => [\`--month-\${i + 1}\`, "120"])
  );

  return (
    <div style={monthVars}>
      <ActivityGrid onDayClick={handleDayClick} />
    </div>
  );
}

export default ClickableExample;`;

  return (
    <div>
<div
  style={{
    backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
    borderRadius: "12px",
    border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
    overflow: "hidden",
    marginBottom: "25px",
  }}
>
  {/* Responsive wrapper */}
  <div style={{ overflowX: "auto" }}>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "14px",
        minWidth: "600px", // ensures scrolling kicks in for small screens
      }}
    >
      <thead>
        <tr
          style={{
            backgroundColor: isDarkMode ? "#334155" : "#f8fafc",
            borderBottom: "1px solid #bababa",
          }}
        >
          <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>
            CSS Variable
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
          { prop: "--month-1", type: "hue", default: "280", desc: "Hue value for January (0-360)" },
          { prop: "--month-2", type: "hue", default: "260", desc: "Hue value for February (0-360)" },
          { prop: "--month-3", type: "hue", default: "240", desc: "Hue value for March (0-360)" },
          { prop: "--month-4", type: "hue", default: "180", desc: "Hue value for April (0-360)" },
          { prop: "--month-5", type: "hue", default: "120", desc: "Hue value for May (0-360)" },
          { prop: "--month-6", type: "hue", default: "80", desc: "Hue value for June (0-360)" },
          { prop: "--month-7", type: "hue", default: "80", desc: "Hue value for July (0-360)" },
          { prop: "--month-8", type: "hue", default: "120", desc: "Hue value for August (0-360)" },
          { prop: "--month-9", type: "hue", default: "180", desc: "Hue value for September (0-360)" },
          { prop: "--month-10", type: "hue", default: "240", desc: "Hue value for October (0-360)" },
          { prop: "--month-11", type: "hue", default: "260", desc: "Hue value for November (0-360)" },
          { prop: "--month-12", type: "hue", default: "280", desc: "Hue value for December (0-360)" },
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


      {/* Isolated Hue Picker - won't affect ActivityGrid */}
      <div style={{ 
        marginBottom: "25px", 
        padding: "2rem", 
        textAlign: "center", 
        backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', 
        borderRadius: "10px",
        border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`
      }}>
        <h2 style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Hue Picker</h2>
        <p style={{ marginBottom: '1rem', color: isDarkMode ? '#94a3b8' : '#64748b' }}>
          This slider demonstrates color hue changes without affecting the ActivityGrid
        </p>

        <Slider
          min={0}
          max={360}
          step={0.1}
          defaultValue={hue}
          showOutput={false}
          onChange={(val) => setHue(val)}
        />

        <p style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Hue: {Math.round(hue)}°</p>

        <div
          style={{
            width: "150px",
            height: "150px",
            margin: "1rem auto",
            borderRadius: "12px",
            backgroundColor: `hsl(${hue}, 100%, 50%)`,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "background-color 0.2s ease",
          }}
        />
      </div>

      <div style={{
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        background: 'transparent',
        borderRadius: '10px',
        color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
        minHeight: '100vh',
        transition: 'all 0.3s ease'
      }}>

        <ActivityGridSectionWithPreview
          title="Custom Data Pattern"
          jsxCode={customDataJSX}
          isDarkMode={isDarkMode}
        >
          <div style={{
            padding: "2rem", 
            borderRadius: "1rem", 
            backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', 
            "--month-1": '280',
            "--month-2": '260',
            "--month-3": '240',
            "--month-4": '180',
            "--month-5": '120',
            "--month-6": '80',
            "--month-7": '80',
            "--month-8": '120',
            "--month-9": '180',
            "--month-10": '240',
            "--month-11": '260',
            "--month-12": '280',
          }}>
            <ActivityGrid 
              data={sampleData} 
              year={2024}
            />
          </div>
        </ActivityGridSectionWithPreview>

        <ActivityGridSectionWithPreview
          title="Interactive with Click Handler"
          jsxCode={clickableJSX}
          isDarkMode={isDarkMode}
        >
          <div style={{
            padding: "2rem", 
            borderRadius: "1rem", 
            backgroundColor: isDarkMode ? '#0f172a' : '#ffffff', 
            ...Object.fromEntries(Array.from({ length: 12 }, (_, i) => [`--month-${i + 1}`, '160']))
          }}>
            <ActivityGrid 
              onDayClick={(dayInfo) => {
                console.log(dayInfo);
                alert(`Clicked: ${dayInfo.dateString} (Level: ${dayInfo.level})`);
              }}
            />
          </div>
        </ActivityGridSectionWithPreview>
      </div>
    </div>
  );
};

export default ActivityGridSection;