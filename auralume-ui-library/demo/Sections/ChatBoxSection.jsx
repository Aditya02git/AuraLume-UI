import React, { useState, useEffect } from 'react';
import Avatar from '../../src/components/Avatar';
import { Button } from '../../src';

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

const ChatBoxSectionWithPreview = ({ title, children, jsxCode }) => {
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
        <CodeDisplay code={jsxCode} language="TSX/JSX" />
      )}
    </section>
  );
};

const ChatBoxSection = () => {
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
    background: 'transparent',
    color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };

  // JSX
  const basicSwitchJSX = `
  const [messages, setMessages] = useState([
    { text: "Hey! 👋", sender: "bot" },
    { text: "Hi there! How are you?", sender: "user" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };
      <div
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "500px",
        margin: "20px auto",
        borderRadius: "12px",
        boxShadow: "0 5px 12px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Header */}
      <div style={{display: 'flex', alignItems: 'center', background: "#e3e9f1",paddingLeft: '12px'}}>
          <Avatar 
          src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/man.png" 
          alt="John Doe" 
          size="small" 
          variant="circle" 
        />
        <div style={{display: 'flex', flexDirection: 'column', padding: "12px",}}>
      <div
        style={{
          color: "#000",
          
          fontWeight: "bold",
          textAlign: "left",
        }}
      >   
        User
      </div>
      <div style={{color: 'green', fontSize: '10px'}}>Online</div>
      </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "12px",
          overflowY: "auto",
          background: "#f9f9f9",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: "12px",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            {/* Avatar */}
            {msg.sender === "bot" && (
              <div
                style={{
                  marginRight: "8px",
                  flexShrink: 0,
                }}
              >
          <Avatar 
            src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/man.png" 
            alt="John Doe" 
            size="small" 
            variant="circle" 
          />
              </div>
            )}

            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "16px",
                background: msg.sender === "user" ? "#6effad" : "#e5e5ea",
                color: msg.sender === "user" ? "#fff" : "#000",
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </span>

            {/* Avatar */}
            {msg.sender === "user" && (
              <div
                style={{
                  marginLeft: "8px",
                  flexShrink: 0,
                }}
              >
          <Avatar 
            src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/man.png" 
            alt="John Doe" 
            size="small" 
            variant="circle" 
          />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #ddd",
          padding: "8px",
          background: "#fff",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "8px",
            outline: "none",
            fontSize: "14px",
          }}
          placeholder="Type a message..."
        />
        <Button
          onClick={handleSend}
          variant='secondary'
          size='small'
        >
          Send
        </Button>
      </div>
    </div>`;

  const [messages, setMessages] = useState([
    { text: "Hey! 👋", sender: "bot" },
    { text: "Hi there! How are you?", sender: "user" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };
  return (
    <div>

      <ChatBoxSectionWithPreview
        title=""
        jsxCode={basicSwitchJSX}
      >
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        height: "500px",
        margin: "20px auto",
        borderRadius: "12px",
        boxShadow: "0 5px 12px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Header */}
      <div style={{display: 'flex', alignItems: 'center', background: "#e3e9f1",paddingLeft: '12px'}}>
          <Avatar 
          src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/man.png" 
          alt="John Doe" 
          size="small" 
          variant="circle" 
        />
        <div style={{display: 'flex', flexDirection: 'column', padding: "12px",}}>
      <div
        style={{
          color: "#000",
          
          fontWeight: "bold",
          textAlign: "left",
        }}
      >   
        User
      </div>
      <div style={{color: 'green', fontSize: '10px'}}>Online</div>
      </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "12px",
          overflowY: "auto",
          background: "#f9f9f9",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: "12px",
              justifyContent:
                msg.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            {/* Avatar */}
            {msg.sender === "bot" && (
              <div
                style={{
                  marginRight: "8px",
                  flexShrink: 0,
                }}
              >
          <Avatar 
            src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/man.png" 
            alt="John Doe" 
            size="small" 
            variant="circle"
            style={{filter: 'grayscale(100%)'}} 
          />
              </div>
            )}

            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "16px",
                background: msg.sender === "user" ? "#6effad" : "#e5e5ea",
                color: msg.sender === "user" ? "#fff" : "#000",
                maxWidth: "70%",
                wordBreak: "break-word",
              }}
            >
              {msg.text}
            </span>

            {/* Avatar */}
            {msg.sender === "user" && (
              <div
                style={{
                  marginLeft: "8px",
                  flexShrink: 0,
                }}
              >
          <Avatar 
            src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/man.png" 
            alt="John Doe" 
            size="small" 
            variant="circle" 
          />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #ddd",
          padding: "8px",
          background: "#fff",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "8px",
            outline: "none",
            fontSize: "14px",
            minWidth: '100px'
          }}
          placeholder="Type a message..."
        />
        <Button
          onClick={handleSend}
          variant='primary'
          size='small'
        >
          Send
        </Button>
      </div>
    </div>
      </ChatBoxSectionWithPreview>
    </div>
  );
};

export default ChatBoxSection;