import React, { useState, useEffect } from 'react';
import Slider from '../../src/components/Slider';

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

const SliderSectionWithPreview = ({ title, children, Code }) => {
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
        <CodeDisplay code={Code} language="TSX/JSX" />
      )}
    </section>
  );
};

const SliderSection = () => {
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

  const containerStyle = {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'transparent',
    color: isDarkMode ? '#e2e8f0' : '#9ca3af',
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };

  // JSX Code Examples
  const defaultSliderJSX = `
  const handleSliderChange = (value) => {
    console.log('Current value:', value);
  };


    <Slider
      min={0}
      max={100}
      step={1}
      defaultValue={50}
      onChange={handleSliderChange}
      showOutput={true}
    />`;

  const dualRangeJSX = `
  const handleRangeChange = (values) => {
    console.log('Range values:', values); // [minValue, maxValue]
  };


    <Slider
      variant="dual"
      min={0}
      max={100}
      step={1}
      defaultValues={[25, 75]}
      onChange={handleRangeChange}
      showOutput={true}
    />`;

  const rtlSliderJSX = `
  const handleSliderChange = (value) => {
    console.log('value:', value);
  };


    <Slider
      min={0}
      max={100}
      step={1}
      defaultValue={30}
      onChange={handleSliderChange}
      showOutput={false}
    />`;

  const disabledSliderJSX = `
    <Slider
      disabled={true}
      min={0}
      max={100}
      step={1}
      defaultValue={50}
      showOutput={true}
    />`;


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
          backgroundColor: isDarkMode ? "#334155" : "#f8fafc", borderBottom: "1px solid #bababa"
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
          { prop: "min", type: "number", default: "0", desc: "Minimum value of the slider." },
          { prop: "max", type: "number", default: "100", desc: "Maximum value of the slider." },
          { prop: "step", type: "number", default: "1", desc: "Step size for each slider increment." },
          { prop: "defaultValue", type: "number", default: "50", desc: "Initial value for a single slider." },
          { prop: "defaultValues", type: "array", default: "[25, 75]", desc: "Initial range values when using a dual-range slider." },
          { prop: "variant", type: "string", default: "'default'", desc: "Visual variant — e.g., 'default', 'outlined', or 'filled'." },
          { prop: "dir", type: "string", default: "'ltr'", desc: "Direction of the slider, supports 'ltr' or 'rtl'." },
          { prop: "disabled", type: "boolean", default: "false", desc: "Disables slider interaction when true." },
          { prop: "showOutput", type: "boolean", default: "true", desc: "Displays the current slider value(s) below the slider." },
          { prop: "theme", type: "string", default: "'slider-light'", desc: "Defines color mode — 'slider-light' or 'slider-dark'." },
          { prop: "color", type: "string", default: "'#e33de0'", desc: "Primary color used for the slider track and thumb." },
          { prop: "className", type: "string", default: "''", desc: "Additional CSS classes for customization." },
          { prop: "onChange", type: "function", default: "() => {}", desc: "Callback triggered on value change." },
          { prop: "onChangeEnd", type: "function", default: "() => {}", desc: "Callback triggered after user stops dragging." },
          { prop: "...props", type: "object", default: "—", desc: "Any other valid input range props." },
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

      
      <SliderSectionWithPreview
        title="Default Single Range Slider"
        Code={defaultSliderJSX}
      >
        <div>
        <Slider
          min={0} 
          max={100} 
          defaultValue={50}
          step={0.1}
          showOutput={true}
          onChange={(value) => console.log('Default slider:', value)}
          theme={isDarkMode ? 'slider-dark' : 'slider-light'}
        /></div>
      </SliderSectionWithPreview>

      <SliderSectionWithPreview
        title="Dual Range Slider"
        Code={dualRangeJSX}
      >
        <Slider 
          variant="dual"
          min={0} 
          max={100} 
          defaultValues={[25, 75]}
          showOutput={true}
          onChange={(values) => console.log('Dual slider:', values)}
          theme={isDarkMode ? 'slider-dark' : 'slider-light'}
        />
      </SliderSectionWithPreview>

      <SliderSectionWithPreview
        title="Slider Without Output"
        Code={rtlSliderJSX}
      >
        <Slider 
          min={0} 
          max={100} 
          defaultValue={30}
          showOutput={false}
          onChange={(value) => console.log('RTL slider:', value)}
          theme={isDarkMode ? 'slider-dark' : 'slider-light'}
        />
      </SliderSectionWithPreview>

      <SliderSectionWithPreview
        title="Disabled Slider"
        Code={disabledSliderJSX}
      >
        <Slider 
          disabled={true}
          min={0}
          max={100}
          defaultValue={50}
          theme={isDarkMode ? 'slider-dark' : 'slider-light'}
        />
      </SliderSectionWithPreview>
    </div>
  );
};

export default SliderSection;