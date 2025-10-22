import React, { useState, useEffect } from 'react';
import Timeline from '../../src/components/Timeline';
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

const TimelineSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
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

const TimelineSection = ({isDarkMode, setIsDarkMode}) => {

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

  const timelineData = [
    {
      date: "1970-01-01",
      dateDisplay: "January 1, 1970",
      title: "Unix Epoch",
      content: "This is the day the Unix clock began (or <time datetime='1969-12-31'>December 31, 1969</time> if you live behind UTC 😉)."
    },
    {
      date: "1973-10-17",
      dateDisplay: "October 17, 1973",
      title: "Digits Within ISO 8601 Format",
      content: "At 6:36:57 PM UTC, the date in ISO 8601 format (1973-10-17) within the time digits (119731017) appeared for the first time."
    },
    {
      date: "2001-09-09",
      dateDisplay: "September 9, 2001",
      title: "1 Billion Seconds",
      content: "Unix time reached 1,000,000,000 seconds at 1:46:40 AM UTC. The Danish UNIX User Group celebrated this in Copenhagen, Denmark."
    },
    {
      date: "2009-02-13",
      dateDisplay: "February 13, 2009",
      title: "1,234,567,890 Seconds",
      content: `At 11:31:30 PM UTC, the digits of the time were 1234567890. This was celebrated worldwide, and even Google had a <a href="https://www.google.com/logos/unix1234567890.gif" target="_blank" rel="noopener">doodle</a> for it.`
    },
    {
      date: "2033-05-18",
      dateDisplay: "May 18, 2033",
      title: "2 Billion Seconds",
      content: "Unix time will reach 2,000,000,000 seconds at 3:33:20 AM UTC."
    },
    {
      date: "2038-01-19",
      dateDisplay: "January 19, 2038",
      title: "Unix Epochalypse",
      content: "Also known as the year 2038 problem, clocks running on a 32-bit signed integer will flip from 3:14:08 AM UTC on this day to 8:45:52 PM UTC on December 13, 1901. Therefore, values only from -2,147,483,648 to 2,147,483,647 for the second are supported."
    }
  ];

  const simpleTimelineData = [
    {
      date: "2024-01-01",
      dateDisplay: "January 1, 2024",
      title: "Project Started",
      content: "Began development of the new UI library with modern React components."
    },
    {
      date: "2024-06-15",
      dateDisplay: "June 15, 2024",
      title: "First Release",
      content: "Released version 1.0 with basic components including buttons, forms, and navigation."
    },
    {
      date: "2024-12-01",
      dateDisplay: "December 1, 2024",
      title: "Timeline Component",
      content: "Added the interactive timeline component with collapsible items and smooth animations."
    }
  ];

  const reactContentData = [
    {
      date: "2024-01-01",
      dateDisplay: "January 1, 2024",
      title: "Interactive Content",
      content: (
        <div>
          <p>Timeline items can contain React components!</p>
          <Button
            variant='primary'
            size='small' 
            onClick={() => alert('Hello from Timeline!')}
          >
            Click me
          </Button>
        </div>
      )
    },
    {
      date: "2024-06-15",
      dateDisplay: "June 15, 2024",
      title: "Rich Media",
      content: (
        <div>
          <p>You can embed any React content:</p>
          <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
            <li>Lists and formatted text</li>
            <li>Images and media</li>
            <li>Interactive components</li>
            <li>Charts and graphs</li>
          </ul>
        </div>
      )
    }
  ];

  // JSX Code Examples
  const basicTimelineJSX = `
const timelineData = [
  {
    date: "1970-01-01",
    dateDisplay: "January 1, 1970",
    title: "Unix Epoch",
    content: "This is the day the Unix clock began..."
  },
  {
    date: "1973-10-17",
    dateDisplay: "October 17, 1973", 
    title: "Digits Within ISO 8601 Format",
    content: "At 6:36:57 PM UTC, the date in ISO 8601 format..."
  },
  // ... more items
];


    <div>
      <h1>A Brief History of Unix Time</h1>
      <Timeline items={timelineData} />
    </div>`;

  const simpleTimelineJSX = `
const simpleData = [
  {
    date: "2024-01-01",
    dateDisplay: "January 1, 2024",
    title: "Project Started", 
    content: "Began development of the new UI library..."
  },
  {
    date: "2024-06-15",
    dateDisplay: "June 15, 2024",
    title: "First Release",
    content: "Released version 1.0 with basic components..."
  }
];


 <Timeline items={simpleData} />;`;

  const expandedTimelineJSX = `
const reactContentData = [
  {
    date: "2024-01-01",
    dateDisplay: "January 1, 2024", 
    title: "Interactive Content",
    content: (
      <div>
        <p>Timeline items can contain React components!</p>
        <button onClick={() => alert('Hello!')}>
          Click me
        </button>
      </div>
    )
  }
];


    <Timeline 
      items={reactContentData}
      expandedByDefault={true}
      showControls={false}
    />`;

  const customizedTimelineJSX = `
    <Timeline 
      items={timelineData}
      showControls={true}
      expandedByDefault={false}
      className="my-custom-timeline"
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
        <div style={{overflowX: 'auto'}}>
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
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>Prop</th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>Type</th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>Default</th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
          { prop: "items", type: "array", default: "[]", desc: "Array of timeline event objects containing title, description, and optional date or icon." },
          { prop: "showControls", type: "boolean", default: "true", desc: "Determines whether navigation controls (like expand/collapse or scroll) are displayed." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class for additional styling or layout adjustments." },
          { prop: "expandedByDefault", type: "boolean", default: "false", desc: "If true, all timeline items start in an expanded (open) state." },
          { prop: "theme", type: "string", default: "'timeline-light'", desc: "Defines the visual theme of the timeline, such as 'timeline-light' or 'timeline-dark'." },
          { prop: "color", type: "string", default: "'#e33de0'", desc: "Primary accent color used for the timeline indicators and connectors." },
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


      <TimelineSectionWithPreview
        title="Basic Timeline"
        jsxCode={basicTimelineJSX}
        isDarkMode={isDarkMode}
      >
        <div>
          <h1 style={{ fontSize: '2em', margin: '0 0 3rem', textAlign: 'center' }}>
            A Brief History of Unix Time
          </h1>
          <Timeline items={timelineData} theme={isDarkMode ? 'timeline-dark' : 'timeline-light'} />
        </div>
      </TimelineSectionWithPreview>

      {/* Simple Timeline */}
      <TimelineSectionWithPreview
        title="Simple Timeline"
        jsxCode={simpleTimelineJSX}
        isDarkMode={isDarkMode}
      >
        <Timeline items={simpleTimelineData} theme={isDarkMode ? 'timeline-dark' : 'timeline-light'}/>
      </TimelineSectionWithPreview>

      {/* Timeline with React Content */}
      <TimelineSectionWithPreview
        title="Timeline with React Content"
        jsxCode={expandedTimelineJSX}
        isDarkMode={isDarkMode}
      >
        <Timeline 
          items={reactContentData}
          expandedByDefault={true}
          showControls={false}
          theme={isDarkMode ? 'timeline-dark' : 'timeline-light'}
        />
      </TimelineSectionWithPreview>

      {/* Customized Timeline */}
      <TimelineSectionWithPreview
        title="Customized Timeline"
        jsxCode={customizedTimelineJSX}
        isDarkMode={isDarkMode}
      >
        <Timeline 
          items={simpleTimelineData}
          showControls={true}
          expandedByDefault={false}
          className="custom-demo-timeline"
          theme={isDarkMode ? 'timeline-dark' : 'timeline-light'}
        />
      </TimelineSectionWithPreview>
    </div>
  );
};

export default TimelineSection;