import React, { useState, useEffect } from 'react';
import CRT from '../../src/components/CRT';

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
const CRTSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
          }}
        >
          {children}
        </div>
      )}

      {activeTab === 'TSX/JSX' && <CodeDisplay code={jsxCode} language="TSX/JSX" />}
    </section>
  );
};

// ------------------- Main CRT Section -------------------
const CRTSection = ({isDarkMode, setIsDarkMode}) => {

  const jsxCode1 = `<CRT 
  intensity="heavy"
  showGrain={true}
  showScratches={true}
  className="custom-crt-class"
>
  <div  style={{height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
    <h1 className="crt-title">
      <span className="crt-title-span">CRT</span>
    </h1>
    <p>Vintage film effect</p>
  </div>
</CRT>`;

  const jsxCode2 = `<CRT 
  intensity="heavy"
  showGrain={true}
  showScratches={true}
  bgColor='black'
>
  <div  style={{height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
    <h1 className="crt-title">
      <span className="crt-title-span">CRT</span>
    </h1>
    <p>Vintage film effect</p>
  </div>
</CRT>`;

  const jsxCode3 = `<CRT 
  intensity="heavy"
  backgroundImage="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/example_img_1.jpg
  showScratches={true}
  className="custom-crt-class"
>
  <div  style={{height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
    <h1 className="crt-title">
      <span className="crt-title-span">CRT</span>
    </h1>
    <p>Vintage film effect</p>
  </div>
</CRT>`;

  const jsxCode4 = `<CRT 
  intensity="heavy"
  backgroundImage="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/example_img_1.jpg"
  showGrain={true}
  showScratches={true}
  className="custom-crt-class"
>
  <div style={{
    height: '100vh',
    width: '100%',
    overflowY: 'auto',
    padding: '20px'
  }}>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <h1 className="crt-title">
        <span className="crt-title-span">CRT</span>
      </h1>
      <p style={{padding: '10px'}}>Vintage film effect</p>
    </div>
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
</CRT>`;

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
          { prop: "children", type: "ReactNode", default: "—", desc: "Elements or content to render inside the CRT screen container." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class for styling or layout adjustments." },
          { prop: "backgroundImage", type: "string", default: "''", desc: "Background image URL displayed behind the CRT overlay." },
          { prop: "showGrain", type: "boolean", default: "true", desc: "Enable or disable film grain overlay to simulate CRT texture." },
          { prop: "showScratches", type: "boolean", default: "true", desc: "Enable or disable scratch overlays for added realism." },
          { prop: "intensity", type: "string", default: "'normal'", desc: "Overall intensity of the CRT effect — can be 'light', 'normal', or 'heavy'." },
          { prop: "bgColor", type: "string", default: "'none'", desc: "Background color behind the CRT screen if no image is provided." },
          { prop: "headerColor", type: "string", default: "'#fff'", desc: "Default heading color displayed within the CRT screen." },
          { prop: "scanLineOpacity", type: "number", default: "0.1", desc: "Opacity of horizontal scan lines over the CRT content." },
          { prop: "flickerIntensity", type: "number", default: "0.03", desc: "Intensity of subtle flicker effect to simulate CRT screen instability." },
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

      <CRTSectionWithPreview
        title="Basic CRT effect with all features enabled"
        jsxCode={jsxCode1}
        isDarkMode={isDarkMode}
      >
        <div style={{height: '100vh', width: '100%'}}>
        <CRT 
        intensity="heavy"
        showGrain={true}
        showScratches={true}
        className="custom-crt-class"
        >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h1 className="crt-title">
            <span className="crt-title-span">CRT</span>
            </h1>
            <p>Vintage film effect</p>
        </div>
        </CRT>
        </div>
      </CRTSectionWithPreview>

      <CRTSectionWithPreview
        title="CRT with background color"
        jsxCode={jsxCode2}
        isDarkMode={isDarkMode}
      >
        <div style={{width: '100%', height: '100vh'}}>
      <CRT 
        intensity="heavy"
        showGrain={true}
        showScratches={true}
        bgColor='black'
        >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h1 className="crt-title">
            <span className="crt-title-span">CRT</span>
            </h1>
            <p>Vintage film effect</p>
        </div>
      </CRT>
      </div>
      </CRTSectionWithPreview>

      <CRTSectionWithPreview
        title="CRT with background image"
        jsxCode={jsxCode3}
        isDarkMode={isDarkMode}
      >
        <div style={{height: '100vh', width: '100%'}}>
      <CRT 
        intensity="heavy"
        backgroundImage="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/example_img_1.jpg"
        showGrain={true}
        showScratches={true}
        className="custom-crt-class"
        >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <h1 className="crt-title">
            <span className="crt-title-span">CRT</span>
            </h1>
            <p>Vintage film effect</p>
        </div>
      </CRT>
      </div>
      </CRTSectionWithPreview>

      <CRTSectionWithPreview
        title="CRT with scrollable sections"
        jsxCode={jsxCode4}
        isDarkMode={isDarkMode}
      >
        <div style={{height: '100vh', width: '100%'}}>
      <CRT 
        intensity="heavy"
        backgroundImage="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/example_img_1.jpg"
        showGrain={true}
        showScratches={true}
        className="custom-crt-class"
        >
          <div style={{
            height: '100%',
            width: '100%',
            overflowY: 'auto',
            padding: '20px'
          }}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <h1 className="crt-title">
                <span className="crt-title-span">CRT</span>
                </h1>
                <p style={{padding: '10px'}}>Vintage film effect</p>
            </div>
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
      </CRT>
      </div>
      </CRTSectionWithPreview>

    </div>
  );
};

export default CRTSection;