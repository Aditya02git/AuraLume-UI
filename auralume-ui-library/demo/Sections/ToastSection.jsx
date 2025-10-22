import React, { useState, useEffect } from 'react'
import Toast, { useToast, ToastContainer } from '../../src/components/Toast';
import { Button } from '../../src';

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
            color: activeTab === tab 
              ? 'white' 
              : isDarkMode ? '#94a3b8' : '#64748b',
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
          {copied ? <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg style={{color: '#43eb34'}} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/>
          </svg><p>Copied</p></div>
            : <div title='Copy'><svg style={{color: '#bdbdbd'}} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clipRule="evenodd"/>
            <path fillRule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clipRule="evenodd"/>
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

const ToastSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('Preview');

  return (
    <section style={{ marginBottom: '4rem' }}>
      <h2 style={{ 
        marginBottom: '2rem', 
        color: isDarkMode ? '#ffffff' : '#ec4899', 
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
        <CodeDisplay code={jsxCode} language="TSX/JSX" isDarkMode={isDarkMode} />
      )}
    </section>
  );
};

const ToastSection = ({isDarkMode, setIsDarkMode}) => {

  const { toasts, success, error, warning, info, removeToast } = useToast();

  const handleSuccess = () => {
    success('Success!', 'Your action was completed successfully.',{
       position: 'top-center',
    });
    
  };

  const handleError = () => {
    error('Error!', 'Something went wrong. Please try again.',{
      position: 'top-left',
    });
  };
  
  const handleWarning = () => {
    warning('Warning!', 'Your privacy may be at risk.',{
      position: 'top-right',
    });
  };
  
  const handleInfo = () => {
    info('Info!', 'Aura-Lume is a UI Library',{
      position: 'bottom-center'
    });
  };

  const jsxCode = `
  const { toasts, success, error, warning, info, removeToast } = useToast();

  const handleSuccess = () => {
    success('Success!', 'Your action was completed successfully.',{
       position: 'top-center',
    });
    
  };

  const handleError = () => {
    error('Error!', 'Something went wrong. Please try again.');
  };
  
  const handleWarning = () => {
    warning('Warning!', 'Your privacy may be at risk.');
  };
  
  const handleInfo = () => {
    info('Info!', 'Aura-Lume is a UI Library');
  };

 
    <div className="toast-demo">
          <Button variant='primary' size='small' onClick={handleSuccess}>Show Success Toast</Button>
          <Button variant='primary' size='small' onClick={handleError}>Show Error Toast</Button>
          <Button variant='primary' size='small' onClick={handleWarning}>Show Warning Toast</Button>
          <Button variant='primary' size='small' onClick={handleInfo}>Show Info Toast</Button>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
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
              { prop: "position", type: "string", default: "top-center", desc: "Displays the toast at the top center of the screen" },
              { prop: "position", type: "string", default: "top-right", desc: "Displays the toast at the top right of the screen" },
              { prop: "position", type: "string", default: "top-left", desc: "Displays the toast at the top left of the screen" },
              { prop: "position", type: "string", default: "bottom-center", desc: "Displays the toast at the bottom center of the screen" },
              { prop: "position", type: "string", default: "bottom-right", desc: "Displays the toast at the bottom right of the screen" },
              { prop: "position", type: "string", default: "bottom-left", desc: "Displays the toast at the bottom left of the screen" },
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

    <div>
      <ToastSectionWithPreview
        title=""
        jsxCode={jsxCode}
        isDarkMode={isDarkMode}
      >
        <div style={{        
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          minHeight: '200px',
        }}>
          <Button variant='primary' size='small' onClick={handleSuccess}>Show Success Toast</Button>
          <Button variant='primary' size='small' onClick={handleError}>Show Error Toast</Button>
          <Button variant='primary' size='small' onClick={handleWarning}>Show Warning Toast</Button>
          <Button variant='primary' size='small' onClick={handleInfo}>Show Info Toast</Button>
        </div>
      </ToastSectionWithPreview>
      
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
    </div>
  );
};

export default ToastSection;