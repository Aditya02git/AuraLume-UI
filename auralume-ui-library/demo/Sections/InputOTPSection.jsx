import React, { useState, useEffect } from 'react';
import InputOTP from '../../src/components/InputOTP/InputOTP';

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

const OTPSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
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
      
      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode}/>
      
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

const InputOTPSection = ({isDarkMode, setIsDarkMode}) => {

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

  const handleComplete = () => {
    alert("Complete!")
  }

  const handleResend = () => {
    alert("OTP resend successfully!")
  }

  const basicOTPJSX = `
      const handleComplete = () => {
        alert("Complete!")
      }

      const handleResend = () => {
        alert("OTP resend successfully!")
      }
        <InputOTP
          length={6}
          email="user@example.com"
          timeLimit={120}
          onComplete={handleComplete}
          onResend={handleResend}
          className={isDarkMode ? 'inputotp-dark' : 'inputotp-light'}
        />`;
  const customOTPJSX = `
          const handleComplete = () => {
            alert("Complete!")
          }

          const handleResend = () => {
            alert("OTP resend successfully!")
          }
            <InputOTP
              length={4}
              email="admin@company.com"
              timeLimit={60}
              onComplete={handleComplete}
              onResend={handleResend}
              className={isDarkMode ? 'inputotp-dark' : 'inputotp-light'}
            />`;
  const withoutTimerOTPJSX = `
          const handleComplete = () => {
            alert("Complete!")
          }

          const handleResend = () => {
            alert("OTP resend successfully!")
          }
          <InputOTP
            length={6}
            email="support@service.com"
            timeLimit={0}
            onComplete={handleComplete}
            onResend={handleResend}
            className={isDarkMode ? 'inputotp-dark' : 'inputotp-light'}
          />`

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
          { prop: "length", type: "number", default: "6", desc: "Number of OTP input boxes to display." },
          { prop: "onComplete", type: "function", default: "-", desc: "Callback fired when the user completes entering all OTP digits." },
          { prop: "onResend", type: "function", default: "-", desc: "Callback triggered when the user requests to resend the OTP." },
          { prop: "email", type: "string", default: "''", desc: "Email address associated with the OTP process (for display or resend logic)." },
          { prop: "timeLimit", type: "number", default: "120", desc: "Time limit in seconds before allowing OTP resend." },
          { prop: "autoFocus", type: "boolean", default: "true", desc: "Automatically focuses the first OTP input field on render." },
          { prop: "disabled", type: "boolean", default: "false", desc: "Disables all OTP input fields when set to true." },
          { prop: "className", type: "string", default: "'inputotp-light'", desc: "CSS class for styling the OTP input container and theme." },
          { prop: "placeholder", type: "string", default: "''", desc: "Placeholder text displayed inside each OTP input box." },
          { prop: "focusColor", type: "string", default: "-", desc: "Custom color for the input focus border and shadow effect." },
          { prop: "...props", type: "object", default: "-", desc: "Additional props spread to the container or input elements." },
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

      <OTPSectionWithPreview
      title="Basic InputOTP"
      jsxCode={basicOTPJSX}
      isDarkMode={isDarkMode}
      >
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <InputOTP
      length={6}
      email="user@example.com"
      timeLimit={120}
      onComplete={handleComplete}
      onResend={handleResend}
      className={isDarkMode ? 'inputotp-dark' : 'inputotp-light'}
      />
      </div>
      </OTPSectionWithPreview>

      {/* Custom Length OTP */}
      <OTPSectionWithPreview
      title="Custom Length (4 digits)"
      jsxCode={customOTPJSX}
      isDarkMode={isDarkMode}
      >
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <InputOTP
      length={4}
      email="admin@company.com"
      timeLimit={60}
      onComplete={handleComplete}
      onResend={handleResend}
      className={isDarkMode ? 'inputotp-dark' : 'inputotp-light'}
      />
      </div>
      </OTPSectionWithPreview>

      {/* Without Timer */}
      <OTPSectionWithPreview
      title="Without Timer"
      jsxCode={withoutTimerOTPJSX}
      isDarkMode={isDarkMode}
      >
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <InputOTP
      length={6}
      email="support@service.com"
      timeLimit={0}
      onComplete={handleComplete}
      onResend={handleResend}
      className={isDarkMode ? 'inputotp-dark' : 'inputotp-light'}
      />
      </div>
      </OTPSectionWithPreview>

    </div>
  );
};

export default InputOTPSection;