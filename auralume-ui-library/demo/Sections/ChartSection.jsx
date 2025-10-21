import React, { useState, useEffect } from 'react';
import Chart from '../../src/components/Chart';
import copyIcon from '/copy.png';

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
            backgroundColor: activeTab === tab ? '#3b82f6' : 'transparent',
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

const ChartSection = () => {
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

  const lineChartJSX = `import Chart from '../../src/components/Chart';

const ChartDemo = () => {
  const sampleData = {
    sales: [65, 78, 90, 81, 56, 72, 88],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '500px',
      gap: '2rem',
      flexWrap: 'wrap'
    }}>
      {/* Line Chart - Blue Theme */}
      <Chart
        type="line"
        data={sampleData.sales}
        labels={sampleData.months}
        color="#3b82f6"
        title="Monthly Sales Trend"
        width={500}
        height={300}
        showLegend={false}
        showValues={true}
        animated={true}
      />
    </div>
  );
};`;
  const pieChartJSX = `import Chart from '../../src/components/Chart';

const ChartDemo = () => {
  const sampleData = {
    
    pieData: [25, 35, 20, 15, 5],
    pieLabels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV', 'Others'],
    
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '500px',
      gap: '2rem',
      flexWrap: 'wrap'
    }}>

      {/* Pie Chart - Green Theme */}
      <Chart
        type="pie"
        data={sampleData.pieData}
        labels={sampleData.pieLabels}
        color="#10b981"
        title="Device Usage Distribution"
        width={400}
        height={400}
        showLegend={true}
        showValues={false}
        animated={true}
      />

    </div>
  );
};`;
  const barChartJSX = `import Chart from '../../src/components/Chart';

const ChartDemo = () => {
  const sampleData = {
    
    barData: [120, 95, 140, 110, 85, 130],
    barLabels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6']

  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '500px',
      gap: '2rem',
      flexWrap: 'wrap'
    }}>

      {/* Bar Chart - Purple Theme */}
      <Chart
        type="bar"
        data={sampleData.barData}
        labels={sampleData.barLabels}
        color="#8b5cf6"
        title="Quarterly Performance"
        width={450}
        height={350}
        showLegend={true}
        showValues={true}
        animated={true}
      />
    </div>
  );
};`;

  const sampleData = {
    sales: [65, 78, 90, 81, 56, 72, 88],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    
    pieData: [25, 35, 20, 15, 5],
    pieLabels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV', 'Others'],
    
    barData: [120, 95, 140, 110, 85, 130],
    barLabels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6']
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install chart.js react-chartjs-2");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
              { prop: "type", type: "string", default: "'line'", desc: "Chart type: 'line', 'pie', or 'bar'" },
              { prop: "data", type: "number[]", default: "[]", desc: "Array of numerical data values" },
              { prop: "labels", type: "string[]", default: "[]", desc: "Array of labels for data points" },
              { prop: "color", type: "string", default: "'#000000'", desc: "Base color for chart theme (hex color)" },
              { prop: "title", type: "string", default: "''", desc: "Chart title displayed at the top" },
              { prop: "width", type: "number", default: "400", desc: "Chart width in pixels" },
              { prop: "height", type: "number", default: "300", desc: "Chart height in pixels" },
              { prop: "showLegend", type: "boolean", default: "true", desc: "Show/hide the chart legend" },
              { prop: "showValues", type: "boolean", default: "true", desc: "Show/hide data values on chart" },
              { prop: "animated", type: "boolean", default: "true", desc: "Enable/disable chart animations" }
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

      <h2 style={{        
        marginBottom: '1rem', 
        color: 'red', 
        fontSize: '20px', 
        fontWeight: 'semi-bold' }}>
          * Required Dependencies
      </h2>      
      <div
        style={{
          backgroundColor: isDarkMode ? "#1e293b" : "#f3f6f9",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "25px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <code style={{ 
            fontSize: "14px", 
            color: isDarkMode ? "#e2e8f0" : "#1a1a1a",
            fontFamily: "monospace" 
          }}>
            npm install chart.js react-chartjs-2
          </code>
        </div>
        <button
          onClick={handleCopy}
          style={{
            marginLeft: "10px",
            padding: "8px 12px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
            backgroundColor: isDarkMode ? "#334155" : "#dbe3e8",
            color: isDarkMode ? "#f3f6f9" : "#334a51",
            fontSize: "10px",
            fontWeight: "500"
          }}
        >
          {copied ? "Copied!" : 
          <img 
            src={copyIcon} 
            height="15px" 
            width="15px" 
            style={{ filter: isDarkMode ? 'brightness(0) invert(1)' : 'none' }} 
          />
}
        </button>
      </div>

<div>
      {/* Chart Examples */}
      <CardSectionWithPreview
        title="Line Chart"
        jsxCode={lineChartJSX}
      >    
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '500px',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>
          {/* Line Chart - Blue Theme */}
          <Chart
            type="line"
            data={sampleData.sales}
            labels={sampleData.months}
            color="#3b82f6"
            title="Monthly Sales Trend"
            width={500}
            height={300}
            showLegend={false}
            showValues={true}
            animated={true}
            theme={isDarkMode ? 'chart-dark' : 'chart-light'}
          />
        </div>
      </CardSectionWithPreview>


      <CardSectionWithPreview
        title="Pie Chart"
        jsxCode={pieChartJSX}
      >    
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '500px',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>

          {/* Pie Chart - Green Theme */}
          <Chart
            type="pie"
            data={sampleData.pieData}
            labels={sampleData.pieLabels}
            color="#10b981"
            title="Device Usage Distribution"
            width={400}
            height={400}
            showLegend={true}
            showValues={false}
            animated={true}
            theme={isDarkMode ? 'chart-dark' : 'chart-light'}
          />
        </div>
      </CardSectionWithPreview>


      <CardSectionWithPreview
        title="Bar Chart"
        jsxCode={barChartJSX}
      >    
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '500px',
          gap: '2rem',
          flexWrap: 'wrap'
        }}>

          {/* Bar Chart - Purple Theme */}
          <Chart
            type="bar"
            data={sampleData.barData}
            labels={sampleData.barLabels}
            color="#8b5cf6"
            title="Quarterly Performance"
            width={450}
            height={350}
            showLegend={true}
            showValues={true}
            animated={true}
            theme={isDarkMode ? 'chart-dark' : 'chart-light'}
          />
        </div>
      </CardSectionWithPreview>
      </div>
    </div>
  );
};

export default ChartSection;