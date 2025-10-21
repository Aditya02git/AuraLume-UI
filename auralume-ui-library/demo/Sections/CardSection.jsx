import React, { useState, useEffect } from 'react';
import { Button } from '../../src';


// Preview Toggle Component
const PreviewToggle = ({ activeTab, onTabChange }) => {
  const tabs = ['Preview','TSX/JSX'];
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

const CardSectionWithPreview = ({ title, children, htmlCode, jsxCode }) => {
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

const CardSection = () => {
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

  const sample3DCards = [
    {
      shadowImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
      backgroundImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
      cutoutImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop',
      title: 'Mountain Adventure',
      description: 'Experience breathtaking views and thrilling adventures in the mountains.',
      borderPosition: 'left',
      onClick: () => console.log('Mountain Adventure clicked')
    },
    {
      shadowImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
      backgroundImage: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop',
      title: 'Forest Exploration',
      description: 'Discover the hidden secrets of ancient forests and wildlife.',
      borderPosition: 'right',
      onClick: () => console.log('Forest Exploration clicked')
    }
  ];

  const basicCardJSX = `
              <div 
              style={{
                width: '300px', 
                border: '1px solid #ddd', 
                borderRadius: '12px', 
                padding: '16px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                background: '#fff', 
                fontFamily: 'Arial, sans-serif'}}
            >
              {/* <img 
                src="https://via.placeholder.com/300x150" 
                alt="Card Image" 
                style={{width: '100%', borderRadius: '8px'}}
              /> */}
              <h2 style={{fontSize: '20px', margin: '12px 0 6px', color: 'black',}}>Card Title</h2>
              <p style={{fontSize: '14px', color: '#555', marginBottom: '12px'}}>
                This is a simple card component with inline CSS.
              </p>
              <Button 
                variant='primary'
              >
                Action
              </Button>
            </div>`;

  const eventCardJSX = `
              <div
              style={{
                width: "400px",
                borderRadius: "12px",
                padding: "0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                background: "#fff",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  height: "180px",          
                  borderTopLeftRadius: "8px",      
                  borderTopRightRadius: "8px",      
                  overflow: "hidden",      
                  marginBottom: "12px",
                  position: "relative",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop"
                  alt="Card Image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",        
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                    transition: "transform 0.45s ease",
                    display: "block",
                  }}
                />
              </div>

              <div style={{padding: '16px'}}>
              <h2 style={{ fontSize: "20px", margin: "0 0 6px", color: "#111" }}>Card Title</h2>
              <p style={{ fontSize: "14px", color: "#555", marginBottom: "12px" }}>
                This is a simple card component with inline CSS.
              </p>
              </div>
            </div>`;


const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
            
      <CardSectionWithPreview
        title="Basic Card"
        jsxCode={basicCardJSX}
      >
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div 
              style={{
                width: '300px', 
                border: '1px solid #ddd', 
                borderRadius: '12px', 
                padding: '16px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                background: '#fff', 
                fontFamily: 'Arial, sans-serif'}}
            >
              {/* <img 
                src="https://via.placeholder.com/300x150" 
                alt="Card Image" 
                style={{width: '100%', borderRadius: '8px'}}
              /> */}
              <h2 style={{fontSize: '20px', margin: '12px 0 6px', color: 'black',}}>Card Title</h2>
              <p style={{fontSize: '14px', color: '#555', marginBottom: '12px'}}>
                This is a simple card component with inline CSS.
              </p>
              <Button 
                variant='primary'
              >
                Action
              </Button>
            </div>
          </div>
      </CardSectionWithPreview>

      <CardSectionWithPreview
        title="Event Card"
        jsxCode={eventCardJSX}
      >
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div
              style={{
                width: "400px",
                borderRadius: "12px",
                padding: "0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                background: "#fff",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  height: "180px",          
                  borderTopLeftRadius: "8px",      
                  borderTopRightRadius: "8px",      
                  overflow: "hidden",      
                  marginBottom: "12px",
                  position: "relative",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop"
                  alt="Card Image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",        
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                    transition: "transform 0.45s ease",
                    display: "block",
                  }}
                />
              </div>

              <div style={{padding: '16px'}}>
              <h2 style={{ fontSize: "20px", margin: "0 0 6px", color: "#111" }}>Card Title</h2>
              <p style={{ fontSize: "14px", color: "#555", marginBottom: "12px" }}>
                This is a simple card component with inline CSS.
              </p>
              </div>
            </div>
          </div>
      </CardSectionWithPreview>
    </div>
  );
};

export default CardSection;