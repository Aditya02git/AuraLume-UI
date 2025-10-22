import React, { useState, useEffect } from 'react';
import Pagination from '../../src/components/Pagination';

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

const PaginationSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
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

const PaginationSection = ({isDarkMode, setIsDarkMode}) => {
  const [basicCurrentPage, setBasicCurrentPage] = useState(2);
  const [borderedCurrentPage, setBorderedCurrentPage] = useState(3);
  const [hoverableCurrentPage, setHoverableCurrentPage] = useState(1);
  const [smartCurrentPage, setSmartCurrentPage] = useState(5);

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

  const basicPaginationJSX = `const [currentPage, setCurrentPage] = useState(2);

<Pagination 
  currentPage={currentPage} 
  totalPages={10} 
  onPageChange={setCurrentPage} 
  theme={isDarkMode ? 'pagination-dark' : 'pagination-light'}
/>`;

  const borderedPaginationJSX = `const [currentPage, setCurrentPage] = useState(3);

<Pagination 
  theme={isDarkMode ? 'pagination-dark' : 'pagination-light'}
  variant="bordered"
  currentPage={currentPage}
  totalPages={8}
  onPageChange={setCurrentPage}
/>`;

  const hoverablePaginationJSX = `const [currentPage, setCurrentPage] = useState(1);

<Pagination 
  variant="hoverable"
  showPrevNext={false}
  currentPage={currentPage}
  totalPages={5}
  onPageChange={setCurrentPage}
  theme={isDarkMode ? 'pagination-dark' : 'pagination-light'}
/>`;

  const smartPaginationJSX = `const [currentPage, setCurrentPage] = useState(5);

<Pagination 
  variant="smart"
  currentPage={currentPage} 
  totalPages={100} 
  onPageChange={setCurrentPage}
  theme={isDarkMode ? 'pagination-dark' : 'pagination-light'}
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
              { prop: "--link-color", type: "color", default: "#9e9e9e", desc: "The color of the page links" },
              { prop: "currentPage", type: "number", default: "1", desc: "The currently active page" },
              { prop: "totalPages", type: "number", default: "7", desc: "Total number of pages" },
              { prop: "onPageChange", type: "function", default: "() => {}", desc: "Callback when a page is changed" },
              { prop: "theme", type: "string", default: "'pagination-light'", desc: "Theme for the pagination (e.g., 'pagination-light', 'pagination-dark')" },
              { prop: "variant", type: "string", default: "'simple'", desc: "Style variant ('simple', 'hoverable', 'bordered')" },
              { prop: "showPrevNext", type: "boolean", default: "true", desc: "Whether to show Previous and Next buttons" },
              { prop: "className", type: "string", default: "''", desc: "Custom CSS class for styling" },
              { prop: "disabled", type: "boolean", default: "false", desc: "Disables the entire pagination control" },
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

      {/* Basic Pagination */}
      <PaginationSectionWithPreview
        title="Basic Pagination"
        jsxCode={basicPaginationJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Pagination 
            currentPage={basicCurrentPage} 
            totalPages={10} 
            onPageChange={setBasicCurrentPage} 
            theme={isDarkMode ? 'pagination-dark' : 'pagination-light'}
          />
        </div>
      </PaginationSectionWithPreview>

      {/* Bordered Pagination */}
      <PaginationSectionWithPreview
        title="Dark Theme with Bordered Style"
        jsxCode={borderedPaginationJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Pagination 
            theme={isDarkMode ? 'pagination-dark' : 'pagination-light'}
            variant="bordered"
            currentPage={borderedCurrentPage}
            totalPages={8}
            onPageChange={setBorderedCurrentPage}
          />
        </div>
      </PaginationSectionWithPreview>

      {/* Hoverable Pagination */}
      <PaginationSectionWithPreview
        title="Hoverable Variant without Prev/Next"
        jsxCode={hoverablePaginationJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Pagination 
            variant="hoverable"
            showPrevNext={false}
            currentPage={hoverableCurrentPage}
            totalPages={5}
            onPageChange={setHoverableCurrentPage}
            theme={isDarkMode ? 'pagination-dark' : 'pagination-light'}
          />
        </div>
      </PaginationSectionWithPreview>

      {/* Smart Pagination */}
      <PaginationSectionWithPreview
        title="Smart Pagination for Large Datasets"
        jsxCode={smartPaginationJSX}
        isDarkMode={isDarkMode}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Pagination 
            variant="smart"
            currentPage={smartCurrentPage} 
            totalPages={100} 
            onPageChange={setSmartCurrentPage}
            theme={isDarkMode ? 'pagination-dark' : 'pagination-light'}
          />
        </div>
      </PaginationSectionWithPreview>
    </div>
  );
};

export default PaginationSection;