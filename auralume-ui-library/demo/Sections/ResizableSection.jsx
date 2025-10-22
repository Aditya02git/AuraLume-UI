import React, { useState, useEffect, useMemo } from 'react';
import Resizable from '../../src/components/Resizable';

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

const ResizableSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
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
          padding: '16px', // Reduced padding for mobile
          backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
          borderRadius: '12px',
          border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
          transition: 'all 0.3s ease',
          overflow: 'hidden', // Prevent overflow
          width: '100%',
          boxSizing: 'border-box'
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

// Utility hook for responsive dimensions
const useResponsiveDimensions = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate max dimensions based on viewport - memoized
  const maxDimensions = useMemo(() => {
    const isMobile = viewportWidth < 768;
    const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
    
    if (isMobile) {
      return {
        maxWidth: Math.min(viewportWidth - 60, 320), // Account for padding and margins
        maxHeight: 300
      };
    } else if (isTablet) {
      return {
        maxWidth: Math.min(viewportWidth - 100, 500),
        maxHeight: 400
      };
    } else {
      return {
        maxWidth: 600,
        maxHeight: 400
      };
    }
  }, [viewportWidth]);

  const initialDimensions = useMemo(() => {
    const isMobile = viewportWidth < 768;
    
    return {
      basic: {
        width: Math.min(isMobile ? 280 : 300, maxDimensions.maxWidth),
        height: Math.min(isMobile ? 180 : 200, maxDimensions.maxHeight)
      },
      sidebar: Math.min(isMobile ? 200 : 250, maxDimensions.maxWidth),
      multi: {
        width: Math.min(isMobile ? 280 : 300, maxDimensions.maxWidth),
        height: Math.min(isMobile ? 200 : 250, maxDimensions.maxHeight)
      }
    };
  }, [viewportWidth, maxDimensions]);

  return { maxDimensions, initialDimensions, isMobile: viewportWidth < 768 };
};

const ResizableSection = ({isDarkMode, setIsDarkMode}) => {
  const { maxDimensions, initialDimensions, isMobile } = useResponsiveDimensions();
  
  // State for maintaining resized dimensions - initialize with static values first
  const [basicDimensions, setBasicDimensions] = useState({ width: 300, height: 200 });
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [multiDimensions, setMultiDimensions] = useState({ width: 300, height: 250 });

  // Update dimensions when initialDimensions change (viewport resize)
  useEffect(() => {
    setBasicDimensions(prev => ({
      width: Math.min(prev.width, maxDimensions.maxWidth),
      height: Math.min(prev.height, maxDimensions.maxHeight)
    }));
    
    setSidebarWidth(prev => Math.min(prev, maxDimensions.maxWidth));
    
    setMultiDimensions(prev => ({
      width: Math.min(prev.width, maxDimensions.maxWidth),
      height: Math.min(prev.height, maxDimensions.maxHeight)
    }));
  }, [maxDimensions.maxWidth, maxDimensions.maxHeight]);

  // Set initial dimensions once when component mounts
  useEffect(() => {
    setBasicDimensions(initialDimensions.basic);
    setSidebarWidth(initialDimensions.sidebar);
    setMultiDimensions(initialDimensions.multi);
  }, []); // Only run once on mount

  // Resize handlers that update state with constraints
  const handleBasicResize = (data) => {
    console.log('Basic resizing:', data);
    const constrainedWidth = Math.min(data.width, maxDimensions.maxWidth);
    const constrainedHeight = Math.min(data.height, maxDimensions.maxHeight);
    setBasicDimensions({ width: constrainedWidth, height: constrainedHeight });
  };

  const handleSidebarResize = (data) => {
    console.log('Sidebar resizing:', data);
    const constrainedWidth = Math.min(data.width, maxDimensions.maxWidth);
    setSidebarWidth(constrainedWidth);
  };

  const handleMultiResize = (data) => {
    console.log('Multi resizing:', data);
    const constrainedWidth = Math.min(data.width, maxDimensions.maxWidth);
    const constrainedHeight = Math.min(data.height, maxDimensions.maxHeight);
    setMultiDimensions({ width: constrainedWidth, height: constrainedHeight });
  };

  // JSX examples remain the same but with updated constraints
  const basicResizableJSX = `
  const [dimensions, setDimensions] = useState({ width: 300, height: 200 });
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMaxWidth = () => {
    const isMobile = viewportWidth < 768;
    return isMobile ? Math.min(viewportWidth - 60, 320) : 600;
  };

  const handleResize = (data) => {
    const maxWidth = getMaxWidth();
    setDimensions({ 
      width: Math.min(data.width, maxWidth), 
      height: Math.min(data.height, 400)
    });
  };


    <Resizable 
      directions={['right', 'bottom']} 
      width={dimensions.width} 
      height={dimensions.height}
      minWidth={100}
      maxWidth={getMaxWidth()}
      maxHeight={400}
      onResize={handleResize}
      onResizeEnd={handleResize}
      style={{
        backgroundColor: '#f0f8ff',
        border: '2px solid #4682b4',
        borderRadius: '8px'
      }}
    >
      <div style={{ padding: '20px' }}>
        <h3>Resizable Container</h3>
        <p>Current size: {dimensions.width}px × {dimensions.height}px</p>
        <p>This demonstrates responsive resizable functionality.</p>
      </div>
    </Resizable>`;

  const flexboxResizableJSX = `
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMaxWidth = () => {
    const isMobile = viewportWidth < 768;
    return isMobile ? Math.min(viewportWidth - 60, 200) : 400;
  };

  const handleSidebarResize = (data) => {
    setSidebarWidth(Math.min(data.width, getMaxWidth()));
  };


    <div style={{ 
      display: 'flex', 
      height: viewportWidth < 768 ? '300px' : '400px', 
      gap: '10px',
      overflow: 'hidden'
    }}>
      <Resizable 
        directions={['right']} 
        flex={true}
        width={sidebarWidth}
        minWidth={150}
        maxWidth={getMaxWidth()}
        onResize={handleSidebarResize}
        onResizeEnd={handleSidebarResize}
        style={{
          backgroundColor: '#e6f3ff',
          border: '2px solid #0066cc',
          borderRadius: '8px'
        }}
      >
        <div style={{ padding: '20px' }}>
          <h4>Sidebar (Resizable)</h4>
          <p>Width: {sidebarWidth}px</p>
          <p>Responsive sidebar with constraints.</p>
        </div>
      </Resizable>
      
      <div style={{
        flex: 1,
        backgroundColor: '#f0f8ff',
        border: '2px solid #4682b4',
        borderRadius: '8px',
        padding: '20px',
        minWidth: 0 // Prevent flex item from overflowing
      }}>
        <h4>Main Content</h4>
        <p>This content area adapts to available space.</p>
      </div>
    </div>`;

  const multiDirectionJSX = `
  const [dimensions, setDimensions] = useState({ width: 300, height: 250 });
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMaxDimensions = () => {
    const isMobile = viewportWidth < 768;
    return {
      maxWidth: isMobile ? Math.min(viewportWidth - 60, 320) : 500,
      maxHeight: isMobile ? 300 : 400
    };
  };

  const handleResize = (data) => {
    const { maxWidth, maxHeight } = getMaxDimensions();
    setDimensions({ 
      width: Math.min(data.width, maxWidth), 
      height: Math.min(data.height, maxHeight)
    });
  };

  const { maxWidth, maxHeight } = getMaxDimensions();


    <Resizable 
      directions={['top', 'right', 'bottom', 'left']} 
      width={dimensions.width} 
      height={dimensions.height}
      minWidth={150}
      minHeight={100}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      style={{
        backgroundColor: '#fff0f5',
        border: '2px solid #ff69b4',
        borderRadius: '8px'
      }}
      onResize={handleResize}
      onResizeEnd={handleResize}
    >
      <div style={{ padding: '20px' }}>
        <h4>Multi-Direction Resize</h4>
        <p>Size: {dimensions.width}px × {dimensions.height}px</p>
        <p>Responsive with viewport-based constraints.</p>
      </div>
    </Resizable>`;

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
            fontSize: isMobile ? "12px" : "14px",
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
              <th style={{ padding: isMobile ? "12px 8px" : "16px", textAlign: "left", fontWeight: "600" }}>
                Prop
              </th>
              <th style={{ padding: isMobile ? "12px 8px" : "16px", textAlign: "left", fontWeight: "600" }}>
                Type
              </th>
              <th style={{ padding: isMobile ? "12px 8px" : "16px", textAlign: "left", fontWeight: "600" }}>
                Default
              </th>
              <th style={{ padding: isMobile ? "12px 8px" : "16px", textAlign: "left", fontWeight: "600" }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {[
                  {
                    prop: "directions",
                    type: "Array<'top' | 'right' | 'bottom' | 'left'>",
                    default: "['right', 'bottom']",
                    desc: "Specifies which edges can be resized. Controls which resize handles are shown."
                  },
                  {
                    prop: "width",
                    type: "number",
                    default: "undefined",
                    desc: "Initial width of the resizable container in pixels."
                  },
                  {
                    prop: "height", 
                    type: "number",
                    default: "undefined",
                    desc: "Initial height of the resizable container in pixels."
                  },
                  {
                    prop: "minWidth",
                    type: "number",
                    default: "undefined",
                    desc: "Minimum width constraint in pixels."
                  },
                  {
                    prop: "minHeight",
                    type: "number", 
                    default: "undefined",
                    desc: "Minimum height constraint in pixels."
                  },
                  {
                    prop: "maxWidth",
                    type: "number",
                    default: "undefined", 
                    desc: "Maximum width constraint in pixels."
                  },
                  {
                    prop: "maxHeight",
                    type: "number",
                    default: "undefined",
                    desc: "Maximum height constraint in pixels."
                  },
                  {
                    prop: "flex",
                    type: "boolean",
                    default: "false",
                    desc: "Enables flexbox mode for integration with flex layouts."
                  },
                  {
                    prop: "style",
                    type: "React.CSSProperties",
                    default: "{}",
                    desc: "CSS styles to apply to the resizable container."
                  },
                  {
                    prop: "onResize",
                    type: "(data: ResizeData) => void",
                    default: "undefined",
                    desc: "Callback fired during resize. Receives current dimensions."
                  },
                  {
                    prop: "onResizeStart",
                    type: "(data: ResizeData) => void", 
                    default: "undefined",
                    desc: "Callback fired when resize operation starts."
                  },
                  {
                    prop: "onResizeEnd",
                    type: "(data: ResizeData) => void",
                    default: "undefined",
                    desc: "Callback fired when resize operation ends."
                  },
                  {
                    prop: "children",
                    type: "React.ReactNode",
                    default: "undefined",
                    desc: "Content to render inside the resizable container."
                  }
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
                    padding: isMobile ? "12px 8px" : "16px",
                    fontFamily: "monospace",
                    color: isDarkMode ? "#fbbf24" : "#d97706",
                  }}
                >
                  {row.prop}
                </td>
                <td
                  style={{
                    padding: isMobile ? "12px 8px" : "16px",
                    fontFamily: "monospace",
                    color: isDarkMode ? "#8b5cf6" : "#7c3aed",
                    fontSize: isMobile ? "10px" : "inherit"
                  }}
                >
                  {row.type}
                </td>
                <td
                  style={{
                    padding: isMobile ? "12px 8px" : "16px",
                    fontFamily: "monospace",
                    color: isDarkMode ? "#06b6d4" : "#0891b2",
                  }}
                >
                  {row.default}
                </td>
                <td style={{ padding: isMobile ? "12px 8px" : "16px" }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      <ResizableSectionWithPreview
        title="Basic Resizable Container"
        jsxCode={basicResizableJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <Resizable 
            directions={['right', 'bottom']} 
            width={basicDimensions.width} 
            height={basicDimensions.height}
            minWidth={isMobile ? 200 : 100}
            maxWidth={maxDimensions.maxWidth}
            maxHeight={maxDimensions.maxHeight}
            onResize={handleBasicResize}
            onResizeEnd={handleBasicResize}
            style={{
              backgroundColor: '#f0f8ff',
              border: '2px solid #4682b4',
              borderRadius: '8px'
            }}
          >
            <div style={{ padding: isMobile ? '12px' : '20px' }}>
              <h3 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: isMobile ? '16px' : '18px' }}>
                Resizable Container
              </h3>
              <p style={{ margin: '0 0 12px 0', color: '#34495e', fontSize: isMobile ? '12px' : '14px' }}>
                Drag the handles on the right and bottom edges to resize.
              </p>
              <p style={{ margin: '0 0 12px 0', color: '#34495e', fontSize: isMobile ? '12px' : '14px' }}>
                Current: {basicDimensions.width}px × {basicDimensions.height}px
              </p>
              <p style={{ margin: '0', color: '#34495e', fontSize: isMobile ? '12px' : '14px' }}>
                Responsive with viewport-based constraints.
              </p>
            </div>
          </Resizable>
        </div>
      </ResizableSectionWithPreview>

      <ResizableSectionWithPreview
        title="Flexbox Integration"
        jsxCode={flexboxResizableJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ 
          display: 'flex', 
          height: isMobile ? '250px' : '300px', 
          gap: '10px',
          overflow: 'hidden',
          width: '100%'
        }}>
          <Resizable 
            directions={['right']} 
            flex={true}
            width={sidebarWidth}
            minWidth={isMobile ? 120 : 150}
            maxWidth={maxDimensions.maxWidth * 0.6} // Max 60% of available width
            onResize={handleSidebarResize}
            onResizeEnd={handleSidebarResize}
            style={{
              backgroundColor: '#e6f3ff',
              border: '2px solid #0066cc',
              borderRadius: '8px'
            }}
          >
            <div style={{ padding: isMobile ? '12px' : '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: isMobile ? '14px' : '16px' }}>
                Sidebar
              </h4>
              <p style={{ margin: '0 0 12px 0', color: '#34495e', fontSize: isMobile ? '11px' : '14px' }}>
                Resizable sidebar with responsive constraints.
              </p>
              <p style={{ margin: '0', color: '#34495e', fontSize: isMobile ? '11px' : '14px' }}>
                Width: {sidebarWidth}px
              </p>
            </div>
          </Resizable>
          
          <div style={{
            flex: 1,
            backgroundColor: '#f0f8ff',
            border: '2px solid #4682b4',
            borderRadius: '8px',
            padding: isMobile ? '12px' : '20px',
            minWidth: 0, // Prevent flex item overflow
            overflow: 'hidden'
          }}>
            <h4 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: isMobile ? '14px' : '16px' }}>
              Main Content
            </h4>
            <p style={{ margin: '0', color: '#34495e', fontSize: isMobile ? '11px' : '14px' }}>
              This content adapts to available space as you resize the sidebar.
            </p>
          </div>
        </div>
      </ResizableSectionWithPreview>

      <ResizableSectionWithPreview
        title="Multi-Direction Resize with Constraints"
        jsxCode={multiDirectionJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <Resizable 
            directions={['top', 'right', 'bottom', 'left']} 
            width={multiDimensions.width} 
            height={multiDimensions.height}
            minWidth={isMobile ? 120 : 150}
            minHeight={isMobile ? 80 : 100}
            maxWidth={maxDimensions.maxWidth}
            maxHeight={maxDimensions.maxHeight}
            style={{
              backgroundColor: '#fff0f5',
              border: '2px solid #ff69b4',
              borderRadius: '8px'
            }}
            onResizeStart={(data) => console.log('Resize started:', data)}
            onResize={handleMultiResize}
            onResizeEnd={handleMultiResize}
          >
            <div style={{ padding: isMobile ? '12px' : '20px' }}>
              <h4 style={{ margin: '0 0 16px 0', color: '#2c3e50', fontSize: isMobile ? '14px' : '16px' }}>
                Multi-Direction Resize
              </h4>
              <p style={{ margin: '0 0 12px 0', color: '#34495e', fontSize: isMobile ? '11px' : '14px' }}>
                Resizable from all four sides with responsive constraints.
              </p>
              <p style={{ margin: '0 0 12px 0', color: '#34495e', fontSize: isMobile ? '11px' : '14px' }}>
                Current: {multiDimensions.width}px × {multiDimensions.height}px
              </p>
              <p style={{ margin: '0', color: '#34495e', fontSize: isMobile ? '11px' : '14px' }}>
                Max: {maxDimensions.maxWidth}px × {maxDimensions.maxHeight}px
              </p>
            </div>
          </Resizable>
        </div>
      </ResizableSectionWithPreview>
    </div>
  );
};

export default ResizableSection;