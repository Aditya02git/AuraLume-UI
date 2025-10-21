import React, { useState, useEffect } from 'react'
import Badge from '../../src/components/Badge';


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
            color: activeTab === tab ? 'white' : '#64748b',
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

const BadgeSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('Preview');

  return (
    <section style={{ marginBottom: '4rem' }}>
      <h2 style={{ marginBottom: '2rem', color: '#f472b6', fontSize: '24px', fontWeight: 'bold' }}>
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

const BadgeSection = () => {
  const [tags, setTags] = useState([
    { id: 1, label: 'React', variant: 'primary' },
    { id: 2, label: 'JavaScript', variant: 'warning' },
    { id: 3, label: 'CSS', variant: 'info' }
  ]);
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

  const removeTag = (id) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const jsxCode = `import React, { useState } from 'react';
import { Badge } from './Badge';

const BadgeSection = () => {
  const [tags, setTags] = useState([
    { id: 1, label: 'React', variant: 'primary' },
    { id: 2, label: 'JavaScript', variant: 'warning' },
    { id: 3, label: 'CSS', variant: 'info' }
  ]);

  const removeTag = (id) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  return (
    <div style={{
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      {/* Basic Variants */}
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Basic Variants</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Sizes</h3>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <Badge size="sm" variant="primary">Small</Badge>
          <Badge size="md" variant="primary">Medium</Badge>
          <Badge size="lg" variant="primary">Large</Badge>
        </div>
      </div>

      {/* Rounded & Tagged */}
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Special Variants</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Badge rounded variant="primary">Rounded</Badge>
          <Badge tagged variant="success">Tagged</Badge>
          <Badge rounded tagged variant="info">Rounded Tagged</Badge>
        </div>
      </div>

      {/* Interactive Tags */}
      <div>
        <h3 style={{ marginBottom: '1rem' }}>Interactive Tags</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <Badge
              key={tag.id}
              variant={tag.variant}
              closable
              onClose={() => removeTag(tag.id)}
            >
              {tag.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BadgeSection;`;

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
            minWidth: "600px"
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
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {[
          { prop: "children", type: "ReactNode", default: "-", desc: "Content inside the badge, such as text or icons." },
          { prop: "variant", type: "string", default: "'default'", desc: "Defines the badge style variant (e.g., 'default', 'primary', 'secondary' 'success', 'warning', 'danger', 'info')." },
          { prop: "size", type: "string", default: "'md'", desc: "Sets the badge size (options: 'sm', 'md', 'lg')." },
          { prop: "rounded", type: "boolean", default: "false", desc: "Determines whether the badge has fully rounded corners." },
          { prop: "closable", type: "boolean", default: "false", desc: "Displays a close icon to allow dismissing the badge." },
          { prop: "tagged", type: "boolean", default: "false", desc: "Adds a small tag-like style or indicator to the badge." },
          { prop: "className", type: "string", default: "''", desc: "Custom class name for applying additional styles." },
          { prop: "onClose", type: "function", default: "undefined", desc: "Callback triggered when the badge's close button is clicked." },
          { prop: "props", type: "object", default: "{}", desc: "Additional props spread onto the root badge element." },
          { prop: "ref", type: "React.Ref", default: "-", desc: "Forwarded ref for direct DOM or component access." },
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

    <BadgeSectionWithPreview
      title=""
      jsxCode={jsxCode}
      isDarkMode={isDarkMode}
    >
      <div style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {/* Basic Variants */}
        <div>
          <h3 style={{ 
            marginBottom: '1rem',
            color: isDarkMode ? '#e2e8f0' : '#374151',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Basic Variants
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 style={{ 
            marginBottom: '1rem',
            color: isDarkMode ? '#e2e8f0' : '#374151',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Sizes
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Badge size="sm" variant="primary">Small</Badge>
            <Badge size="md" variant="primary">Medium</Badge>
            <Badge size="lg" variant="primary">Large</Badge>
          </div>
        </div>

        {/* Rounded & Tagged */}
        <div>
          <h3 style={{ 
            marginBottom: '1rem',
            color: isDarkMode ? '#e2e8f0' : '#374151',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Special Variants
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Badge rounded variant="primary">Rounded</Badge>
            <Badge tagged variant="success">Tagged</Badge>
            <Badge rounded tagged variant="info">Rounded Tagged</Badge>
          </div>
        </div>

        {/* Interactive Tags */}
        <div>
          <h3 style={{ 
            marginBottom: '1rem',
            color: isDarkMode ? '#e2e8f0' : '#374151',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Interactive Tags
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tags.map(tag => (
              <Badge
                key={tag.id}
                variant={tag.variant}
                closable
                onClose={() => removeTag(tag.id)}
              >
                {tag.label}
              </Badge>
            ))}
          </div>
          <p style={{ 
            marginTop: '1rem', 
            fontSize: '14px', 
            color: isDarkMode ? '#94a3b8' : '#64748b'
          }}>
            Click the × to remove tags
          </p>
        </div>

        {/* All Combinations */}
        <div>
          <h3 style={{ 
            marginBottom: '1rem',
            color: isDarkMode ? '#e2e8f0' : '#374151',
            fontSize: '18px',
            fontWeight: '600'
          }}>
            Combined Features
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Badge size="sm" tagged closable variant="primary" onClose={() => console.log('Small badge closed')}>
              Small Tagged Closable
            </Badge>
            <Badge rounded tagged closable variant="success" onClose={() => console.log('Rounded badge closed')}>
              Rounded Tagged Closable
            </Badge>
            <Badge size="lg" rounded tagged variant="warning">
              Large Rounded Tagged
            </Badge>
          </div>
        </div>
      </div>
    </BadgeSectionWithPreview>
    </div>
  )
}

export default BadgeSection