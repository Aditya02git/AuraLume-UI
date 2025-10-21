import React, { useState, useEffect } from 'react';
import InfiniteGallery from '../../src/components/InfiniteGallery';

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

const GallerySectionWithPreview = ({ title, children, jsxCode }) => {
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
          position: 'relative',
          height: '600px', // Fixed height for the gallery preview
          backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
          borderRadius: '12px',
          border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
          transition: 'all 0.3s ease',
          overflow: 'hidden'
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

const InfiniteGallerySection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentEffect, setCurrentEffect] = useState('zoomIn1');
  const [imageSize, setImageSize] = useState('small'); // Changed to small for preview
  const [rows, setRows] = useState(4); // Reduced for preview
  const [columns, setColumns] = useState(6); // Reduced for preview

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

  const sampleImages = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3',
    'https://picsum.photos/800/600?random=4',
    'https://picsum.photos/800/600?random=5',
    'https://picsum.photos/800/600?random=8',
    'https://picsum.photos/800/600?random=9',
    'https://picsum.photos/800/600?random=10',
    // Add more images as needed
  ];

  const handleImageClick = (imageData, index) => {
    console.log('Image clicked:', imageData, 'at index:', index);
    // Handle image click - could open modal, navigate, etc.
    alert(`Clicked image ${index + 1}`);
  };

// JSX Code
const JSX = `import React from 'react';
import InfiniteGallery from './components/InfiniteGallery';

const GalleryDemo = () => {
  const sampleImages = [
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3',
    'https://picsum.photos/800/600?random=4',
    'https://picsum.photos/800/600?random=5',
    'https://picsum.photos/800/600?random=8',
    'https://picsum.photos/800/600?random=9',
    'https://picsum.photos/800/600?random=10',
  ];

  const handleImageClick = (imageData, index) => {
    console.log('Image clicked:', imageData, 'at index:', index);
    alert(\`Clicked image \${index + 1}\`);
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <InfiniteGallery 
        images={sampleImages}
        rows={10}
        columns={10}
        useInertia={true}
        useCenterGrid={true}
        dragResistance={0.96}
        snapThreshold={50}
        centerDuration={700}
        imageSize={0.20}
        gutter={0.05}
        theme={isDarkMode ? "dramatic" : "light"} 
        onImageClick={handleImageClick}
        loadingPlaceholder={true}
        friction={0.85}
        minVelocity={0.5}
        lerpStrength={0.03}
        lerpSmoothing={0.08}
        enableCursorLerp={true}
      />        
    </div>
  );
};

export default GalleryDemo;`;

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
          { prop: "images", type: "array", default: "[]", desc: "List of image URLs to display in the gallery grid." },
          { prop: "rows", type: "number", default: "5", desc: "Number of rows in the gallery grid." },
          { prop: "columns", type: "number", default: "9", desc: "Number of columns in the gallery grid." },
          { prop: "useInertia", type: "boolean", default: "true", desc: "Enables inertia-based scrolling for smooth dragging." },
          { prop: "useCenterGrid", type: "boolean", default: "true", desc: "Centers the grid layout around the viewport." },
          { prop: "dragResistance", type: "number", default: "0.96", desc: "Resistance factor applied during drag to slow motion gradually." },
          { prop: "snapThreshold", type: "number", default: "50", desc: "Pixel threshold for snapping gallery back to position after drag." },
          { prop: "centerDuration", type: "number", default: "700", desc: "Duration (in ms) for centering animations." },
          { prop: "imageSize", type: "number", default: "0.35", desc: "Relative size scale for each image cell in the grid." },
          { prop: "gutter", type: "number", default: "0.05", desc: "Gap space between images in the grid." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class for styling the gallery container." },
          { prop: "theme", type: "string", default: "''", desc: "Theme identifier for ( light, dark, dramatic, warm, cool, vintage, minimal ) styling." },
          { prop: "onImageClick", type: "function", default: "null", desc: "Callback triggered when an image is clicked." },
          { prop: "loadingPlaceholder", type: "boolean", default: "true", desc: "Shows placeholder visuals while images are loading." },
          { prop: "friction", type: "number", default: "0.85", desc: "Controls the deceleration of scrolling inertia." },
          { prop: "minVelocity", type: "number", default: "0.5", desc: "Minimum velocity threshold for continuing scroll motion." },
          { prop: "enableCursorLerp", type: "boolean", default: "false", desc: "Enables smooth cursor tracking for hover interactions." },
          { prop: "lerpStrength", type: "number", default: "0.05", desc: "Determines how strongly the cursor lerps toward the target position." },
          { prop: "lerpSmoothing", type: "number", default: "0.1", desc: "Controls the smoothing factor for cursor lerp transitions." },
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
      <GallerySectionWithPreview
        title=""
        jsxCode={JSX}
      >
      <InfiniteGallery 
        images={sampleImages}
        rows={10}
        columns={10}
        useInertia={true}
        useCenterGrid={true}
        dragResistance={0.96} // Higher = more responsive, lower = more damped
        snapThreshold={50} // Distance threshold for auto-centering
        centerDuration={700} // Animation duration in ms
        imageSize={0.20} // 35% of viewport
        gutter={0.05} // 5% of viewport
        theme={isDarkMode ? "minimal" : "light"} // Try: 'dark', 'light', 'minimal'
        onImageClick={handleImageClick}
        loadingPlaceholder={true}
        friction={0.85} // Inertia friction (0-1)
        minVelocity={0.5} // Minimum velocity to continue inertia
        lerpStrength={0.03}        // How strong the cursor effect (0-1)
        lerpSmoothing={0.08}       // How smooth the transition (0-1) 
        enableCursorLerp={true}    // Enable/disable cursor tracking
      />        
      </GallerySectionWithPreview>
    </div>
    </div>
  );
};

export default InfiniteGallerySection;