import React, { useState, useEffect } from 'react';
import Input from '../../src/components/Input';

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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

const InputSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('Preview');

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
      
      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode} />
      
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

const InputSection = ({isDarkMode, setIsDarkMode}) => {
  const [basicInputValue, setBasicInputValue] = useState('');
  const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [smallInputValue, setSmallInputValue] = useState('');
  const [mediumInputValue, setMediumInputValue] = useState('');
  const [largeInputValue, setLargeInputValue] = useState('');
  const [fullInputValue, setFullInputValue] = useState('');

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

  // JSX Examples
  const basicInputJSX = `
  const [value, setValue] = useState('');

    <Input
      label="Full Name"
      type="text"
      size="medium"
      placeholder="Enter your full name"
      hint="Please enter your complete name"
      required
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />`;

  const sizesJSX = `
  const [small, setSmall] = useState('');
  const [medium, setMedium] = useState('');
  const [large, setLarge] = useState('');
  const [full, setFull] = useState('');

      {/* Small Input (200px) */}
      <Input
        label="Small Input"
        size="small"
        placeholder="Small input"
        hint="Small size (200px)"
        value={small}
        onChange={(e) => setSmall(e.target.value)}
      />

      {/* Medium Input (400px) - Default */}
      <Input
        label="Medium Input"
        size="medium"
        placeholder="Medium input"
        hint="Medium size (400px)"
        value={medium}
        onChange={(e) => setMedium(e.target.value)}
      />

      {/* Large Input (600px) */}
      <Input
        label="Large Input"
        size="large"
        placeholder="Large input"
        hint="Large size (600px)"
        value={large}
        onChange={(e) => setLarge(e.target.value)}
      />

      {/* Full Width Input */}
      <Input
        label="Full Width Input"
        size="full"
        placeholder="Full width input"
        hint="Full width (100%)"
        value={full}
        onChange={(e) => setFull(e.target.value)}
      />`;

  const emailInputJSX = `
  const [email, setEmail] = useState('');

    <Input
      label="Email Address"
      type="email"
      size="medium"
      placeholder="Enter your email"
      hint="We'll never share your email"
      required
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />`;

  const passwordInputJSX = `

  const [password, setPassword] = useState('');

    <Input
      label="Password"
      type="password"
      size="medium"
      placeholder="Enter your password"
      hint="Minimum 8 characters required"
      required
      minLength={8}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
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
          { prop: "label", type: "string", default: "-", desc: "Text label displayed above or beside the input field." },
          { prop: "id", type: "string", default: "-", desc: "Unique identifier for the input element." },
          { prop: "name", type: "string", default: "-", desc: "Name attribute for form submissions and event handling." },
          { prop: "type", type: "string", default: "'text'", desc: "Type of input (e.g., text, email, password, number)." },
          { prop: "placeholder", type: "string", default: "-", desc: "Hint text displayed when the input is empty." },
          { prop: "hint", type: "string", default: "-", desc: "Optional helper text displayed below the input field." },
          { prop: "required", type: "boolean", default: "false", desc: "Marks the input as required for form validation." },
          { prop: "maxLength", type: "number", default: "-", desc: "Maximum number of characters allowed in the input." },
          { prop: "pattern", type: "string", default: "-", desc: "Regular expression pattern for input validation." },
          { prop: "value", type: "string | number", default: "-", desc: "Current value of the input field." },
          { prop: "onChange", type: "function", default: "-", desc: "Event handler called when the input value changes." },
          { prop: "onBlur", type: "function", default: "-", desc: "Event handler called when the input loses focus." },
          { prop: "onFocus", type: "function", default: "-", desc: "Event handler called when the input gains focus." },
          { prop: "disabled", type: "boolean", default: "false", desc: "Disables the input field when set to true." },
          { prop: "size", type: "'small' | 'medium' | 'large' | 'full'", default: "'medium'", desc: "Determines the size or width of the input field." },
          { prop: "focusColor", type: "string", default: "-", desc: "Custom color for the input’s focus outline or border." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class for styling the input component." },
          { prop: "...props", type: "object", default: "-", desc: "Additional props spread to the underlying input element." },
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

      {/* Basic Input */}
      <InputSectionWithPreview
        title="Basic Input"
        jsxCode={basicInputJSX}
        isDarkMode={isDarkMode}
      >
        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          hint="Please enter your complete name"
          required
          value={basicInputValue}
          onChange={(e) => setBasicInputValue(e.target.value)}
          className={isDarkMode ? 'input-dark' : 'input-light'}
        />
      </InputSectionWithPreview>

      {/* Different Sizes */}
      <InputSectionWithPreview
        title="Input Sizes"
        jsxCode={sizesJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Input
            size="small"
            label="Small Input"
            type="text"
            placeholder="Small input"
            hint="Small size (200px)"
            value={smallInputValue}
            onChange={(e) => setSmallInputValue(e.target.value)}
            className={isDarkMode ? 'input-dark' : 'input-light'}
          />
          <Input
            size="medium"
            label="Medium Input"
            type="text"
            placeholder="Medium input"
            hint="Medium size (400px)"
            value={mediumInputValue}
            onChange={(e) => setMediumInputValue(e.target.value)}
            className={isDarkMode ? 'input-dark' : 'input-light'}
          />
          <Input
            size="large"
            label="Large Input"
            type="text"
            placeholder="Large input"
            hint="Large size (600px)"
            value={largeInputValue}
            onChange={(e) => setLargeInputValue(e.target.value)}
            className={isDarkMode ? 'input-dark' : 'input-light'}
          />
          <Input
            size="full"
            label="Full Width Input"
            type="text"
            placeholder="Full width input"
            hint="Full width (100%)"
            value={fullInputValue}
            onChange={(e) => setFullInputValue(e.target.value)}
            className={isDarkMode ? 'input-dark' : 'input-light'}
          />
        </div>
      </InputSectionWithPreview>

      {/* Email Input */}
      <InputSectionWithPreview
        title="Email Input"
        jsxCode={emailInputJSX}
        isDarkMode={isDarkMode}
      >
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          hint="We'll never share your email"
          required
          value={emailInputValue}
          onChange={(e) => setEmailInputValue(e.target.value)}
          className={isDarkMode ? 'input-dark' : 'input-light'}
        />
      </InputSectionWithPreview>

      {/* Password Input */}
      <InputSectionWithPreview
        title="Password Input"
        jsxCode={passwordInputJSX}
        isDarkMode={isDarkMode}
      >
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          hint="Minimum 8 characters required"
          required
          minLength={8}
          value={passwordInputValue}
          onChange={(e) => setPasswordInputValue(e.target.value)}
          className={isDarkMode ? 'input-dark' : 'input-light'}
        />
      </InputSectionWithPreview>
    </div>
  );
};

export default InputSection;