import React, { useState, useEffect } from 'react';

// Mock TrieSearch component for demonstration
const TrieSearch = ({ data, placeholder, maxResults, showStats, searchMode, onResultSelect, debounceMs, caseSensitive, showSearchMode, theme }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      let filtered = [];
      
      if (searchMode === 'prefix') {
        filtered = data.filter(word => 
          caseSensitive ? word.startsWith(query) : word.toLowerCase().startsWith(query.toLowerCase())
        );
      } else if (searchMode === 'exact') {
        filtered = data.filter(word => 
          caseSensitive ? word === query : word.toLowerCase() === query.toLowerCase()
        );
      } else if (searchMode === 'wildcard') {
        const pattern = query.replace(/\*/g, '.*');
        const regex = new RegExp(`^${pattern}$`, caseSensitive ? '' : 'i');
        filtered = data.filter(word => regex.test(word));
      }
      
      setResults(filtered.slice(0, maxResults));
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, data, searchMode, maxResults, debounceMs, caseSensitive]);

  const isDark = theme === 'search-dark';

  return (
    <div style={{ width: '100%' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          borderRadius: '8px',
          border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`,
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          color: isDark ? '#e2e8f0' : '#1a1a1a',
          outline: 'none'
        }}
      />
      {showStats && results.length > 0 && (
        <div style={{ 
          marginTop: '10px', 
          fontSize: '14px', 
          color: isDark ? '#94a3b8' : '#64748b' 
        }}>
          Found {results.length} result{results.length !== 1 ? 's' : ''}
        </div>
      )}
      {results.length > 0 && (
        <div style={{ 
          marginTop: '10px', 
          border: `1px solid ${isDark ? '#475569' : '#cbd5e1'}`, 
          borderRadius: '8px',
          backgroundColor: isDark ? '#1e293b' : '#ffffff',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {results.map((result, idx) => (
            <div
              key={idx}
              onClick={() => onResultSelect(result)}
              style={{
                padding: '12px',
                cursor: 'pointer',
                borderBottom: idx < results.length - 1 ? `1px solid ${isDark ? '#334155' : '#e2e8f0'}` : 'none',
                color: isDark ? '#e2e8f0' : '#1a1a1a',
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? '#334155' : '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isDark ? '#1e293b' : '#ffffff';
              }}
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

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
    
    // Also listen for custom event for same-window updates
    const handleCustomStorageChange = (e) => {
      if (e.detail && e.detail.key === 'darkMode') {
        setIsDarkMode(e.detail.value);
      }
    };
    window.addEventListener('localStorageUpdate', handleCustomStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdate', handleCustomStorageChange);
    };
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

const TrieSearchSectionWithPreview = ({ title, children, htmlCode, jsxCode }) => {
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
    
    // Also listen for custom event for same-window updates
    const handleCustomStorageChange = (e) => {
      if (e.detail && e.detail.key === 'darkMode') {
        setIsDarkMode(e.detail.value);
      }
    };
    window.addEventListener('localStorageUpdate', handleCustomStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdate', handleCustomStorageChange);
    };
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

const TrieSearchSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedResult, setSelectedResult] = useState('');
  const [searchMode, setSearchMode] = useState('prefix');

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
    
    // Also listen for custom event for same-window updates
    const handleCustomStorageChange = (e) => {
      if (e.detail && e.detail.key === 'darkMode') {
        setIsDarkMode(e.detail.value);
      }
    };
    window.addEventListener('localStorageUpdate', handleCustomStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdate', handleCustomStorageChange);
    };
  }, []);

  const containerStyle = {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'transparent',
    color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };

  const handleResultSelect = (result) => {
    setSelectedResult(result);
    console.log('Selected:', result);
  };

  // JSX code example
  const basicTrieSearchJSX = `import TrieSearch from './TrieSearch';
import wordListData from './wordList.json';

const [selectedResult, setSelectedResult] = useState('');
const [searchMode, setSearchMode] = useState('prefix');

const handleResultSelect = (result) => {
  setSelectedResult(result);
  console.log('Selected:', result);
};

function App() {
  return (
    <div>
      {/* Search Mode Toggle */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Search Mode:</h3>
        <label style={{ marginRight: '15px' }}>
          <input
            type="radio"
            value="prefix"
            checked={searchMode === 'prefix'}
            onChange={(e) => setSearchMode(e.target.value)}
          />
          Prefix Search
        </label>
        <label style={{ marginRight: '15px' }}>
          <input
            type="radio"
            value="wildcard"
            checked={searchMode === 'wildcard'}
            onChange={(e) => setSearchMode(e.target.value)}
          />
          Wildcard Search
        </label>
        <label>
          <input
            type="radio"
            value="exact"
            checked={searchMode === 'exact'}
            onChange={(e) => setSearchMode(e.target.value)}
          />
          Exact Match
        </label>
      </div>

      {/* TrieSearch Component */}
      <TrieSearch
        data={wordListData.words}
        placeholder={\`Try \${searchMode} search...\`}
        maxResults={20}
        showStats={true}
        searchMode={searchMode}
        onResultSelect={handleResultSelect}
        debounceMs={150}
        caseSensitive={false}
      />

      {/* Selected Result Display */}
      {selectedResult && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#e7f3ff', 
          borderRadius: '8px',
          border: '1px solid #007bff'
        }}>
          <strong>Selected:</strong> {selectedResult}
        </div>
      )}
    </div>
  );
}`;

  const wordsData = {
    "words": [
      "the", "of", "and", "to", "a", "in", "for", "is", "on", "that",
      "by", "this", "with", "i", "you", "it", "not", "or", "be", "are",
    ]
  };

  const wordListData = {
    words: [
      "the", "of", "and", "to", "a", "in", "for", "is", "on", "that",
      "by", "this", "with", "i", "you", "it", "not", "or", "be", "are",
      "apple", "application", "apply", "approve", "apricot", "apartment",
      "about", "above", "after", "again", "against", "all", "also", "always"
    ]
  };

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
                  borderBottom: "1px solid #bababa",
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
                { prop: "data", type: "array", default: "[]", desc: "Array of searchable items (strings or objects depending on implementation)." },
                { prop: "placeholder", type: "string", default: "'Enter word to search'", desc: "Text placeholder displayed inside the search input." },
                { prop: "maxResults", type: "number", default: "50", desc: "Maximum number of results to display after performing a search." },
                { prop: "showStats", type: "boolean", default: "true", desc: "Whether to display search statistics like total matches or time taken." },
                { prop: "searchMode", type: "string", default: "'prefix'", desc: "Search behavior mode — can be 'prefix', 'wildcard', or 'exact'." },
                { prop: "onResultSelect", type: "function", default: "null", desc: "Callback function triggered when a result is selected or clicked." },
                { prop: "className", type: "string", default: "''", desc: "Custom class name for the component wrapper." },
                { prop: "debounceMs", type: "number", default: "100", desc: "Delay (in milliseconds) before executing the search after typing stops." },
                { prop: "caseSensitive", type: "boolean", default: "false", desc: "Enables case-sensitive matching when set to true." },
                { prop: "theme", type: "string", default: "'search-light'", desc: "Defines the visual theme of the component — 'search-light' or 'search-dark'." },
                { prop: "color", type: "string", default: "'#e33de0'", desc: "Accent color for focus states and highlights in the UI." },
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

      <h2 style={{padding: '1.5rem', color: isDarkMode? '#ffffff' : '#000000', fontStyle: 'italic', fontWeight: '500px'}}>Make a file "<span style={{color: 'red'}}>wordList.json</span>"</h2>
      <div style={{padding: '20px',
          position: 'relative', 
          backgroundColor: '#1e293b',
          color: '#e2e8f0', 
          borderRadius: '8px', 
          overflow: 'hidden',
          marginBottom: '16px'}}>
        <pre>{JSON.stringify(wordsData, null, 2)}</pre>
      </div>
      <TrieSearchSectionWithPreview
        title="Interactive Trie Search Component"
        jsxCode={basicTrieSearchJSX}
      >
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ 
            marginBottom: '15px',
            color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
            fontSize: '18px'
          }}>
            Search Mode:
          </h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
              cursor: 'pointer'
            }}>
              <input
                type="radio"
                value="prefix"
                checked={searchMode === 'prefix'}
                onChange={(e) => setSearchMode(e.target.value)}
                style={{ cursor: 'pointer' }}
              />
              Prefix Search
            </label>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
              cursor: 'pointer'
            }}>
              <input
                type="radio"
                value="wildcard"
                checked={searchMode === 'wildcard'}
                onChange={(e) => setSearchMode(e.target.value)}
                style={{ cursor: 'pointer' }}
              />
              Wildcard Search (use *)
            </label>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
              cursor: 'pointer'
            }}>
              <input
                type="radio"
                value="exact"
                checked={searchMode === 'exact'}
                onChange={(e) => setSearchMode(e.target.value)}
                style={{ cursor: 'pointer' }}
              />
              Exact Match
            </label>
          </div>
        </div>

        <TrieSearch
          data={wordListData.words}
          placeholder={`Try ${searchMode} search...`}
          maxResults={20}
          showStats={true}
          searchMode={searchMode}
          onResultSelect={handleResultSelect}
          debounceMs={150}
          caseSensitive={false}
          showSearchMode={false}
          theme={isDarkMode ? 'search-dark' : 'search-light'}
        />

        {selectedResult && (
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            backgroundColor: isDarkMode ? '#1e40af' : '#e7f3ff', 
            borderRadius: '8px',
            border: `1px solid ${isDarkMode ? '#3b82f6' : '#007bff'}`,
            color: isDarkMode ? '#ffffff' : '#1a1a1a'
          }}>
            <strong>Selected:</strong> {selectedResult}
          </div>
        )}

        <div style={{ 
          marginTop: '30px', 
          fontSize: '14px', 
          color: isDarkMode ? '#94a3b8' : '#666666',
          backgroundColor: isDarkMode ? '#374151' : '#f8f9fa',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <h3 style={{ 
            marginTop: '0', 
            marginBottom: '15px',
            color: isDarkMode ? '#e2e8f0' : '#1a1a1a'
          }}>
            Usage Examples:
          </h3>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            <li style={{ marginBottom: '8px' }}>
              <strong>Prefix Search:</strong> Type "app" to find "apple", "application", "apply", etc.
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Wildcard Search:</strong> Type "a*e" to find words starting with 'a' and ending with 'e'
            </li>
            <li style={{ marginBottom: '8px' }}>
              <strong>Exact Search:</strong> Type "apple" to find only exact matches
            </li>
          </ul>
        </div>
      </TrieSearchSectionWithPreview>
    </div>
  );
};

export default TrieSearchSection;