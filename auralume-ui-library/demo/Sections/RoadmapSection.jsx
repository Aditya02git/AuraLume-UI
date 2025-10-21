import React, { useState, useEffect } from 'react';
import Roadmap from '../../src/components/Roadmap';

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

const RoadmapSectionWithPreview = ({ title, children, jsxCode }) => {
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

const RoadmapSection = () => {
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

  // Sample data for all variants
  const websiteLaunchData = [
    {
      step: 1,
      title: "Plan & Design Your Vision",
      description: "Define your website's purpose, target audience, and desired aesthetic. Our tools help you map out the structure and create a visually appealing design.",
      date: "Week 1-2",
      icon: "🎨"
    },
    {
      step: 2,
      title: "Develop & Build Your Site",
      description: "Transform your design into a functional website. Our platform offers intuitive tools and resources to build pages, integrate features, and ensure responsiveness.",
      date: "Week 3-6",
      icon: "💻"
    },
    {
      step: 3,
      title: "Launch & Grow Your Online Presence",
      description: "Deploy your completed website to the world and begin your journey of online growth. Utilize our analytics and marketing tools to reach your audience and expand your reach.",
      date: "Week 7+",
      icon: "🚀"
    }
  ];

  const productRoadmapData = [
    {
      title: "Market Research & Analysis",
      description: "Conduct comprehensive market research to identify target audience and competitive landscape.",
      date: "Q1 2024",
      icon: "📊"
    },
    {
      title: "Product Design & Prototyping",
      description: "Create detailed mockups and prototypes based on research findings and user feedback.",
      date: "Q2 2024",
      icon: "🎨"
    },
    {
      title: "Development & Testing",
      description: "Build the product with rigorous testing phases to ensure quality and performance.",
      date: "Q3 2024",
      icon: "⚙️"
    },
    {
      title: "Beta Launch & Feedback",
      description: "Release beta version to select users and gather valuable feedback for improvements.",
      date: "Q4 2024",
      icon: "🚀"
    },
    {
      title: "Full Market Launch",
      description: "Official product launch with comprehensive marketing campaign and user onboarding.",
      date: "Q1 2025",
      icon: "🎯"
    }
  ];

const careerJourneyData = [
  {
    title: "Spawned in Washington",
    date: "1/01/2000",
  },
  {
    title: "Played first PC game",
    date: "2004",
  },
  {
    title: "Started Coding",
    date: "2010",
    icon: ""
  },
  {
    title: "Began Web design",
    date: "2012",
  },
  {
    title: "Began using Adobe software",
    date: "2014",
  },
  {
    title: "Google UX Cert. #1",
    date: "2018",
  },
  {
    title: "Google UX Cert. #2",
    date: "2019",
  },
  {
    title: "My first game!",
    date: "2019",
  },
  {
    title: "Game #1 Dept. Head",
    date: "Nov 2019",
  },
  {
    title: "Game #3 Lead Designer",
    date: "Jan 2022",
  },
  {
    title: "Game #2 Community Manager",
    date: "Feb 2022",
  },
  {
    title: "What I'm doing now!",
    date: "NOW",
  }
];

  const leftVariantJSX = `const websiteLaunchData = [
  {
    step: 1,
    title: "Plan & Design Your Vision",
    description: "Define your website's purpose, target audience, and desired aesthetic. Our tools help you map out the structure and create a visually appealing design.",
    date: "Week 1-2",
    icon: "🎨"
  },
  {
    step: 2,
    title: "Develop & Build Your Site",
    description: "Transform your design into a functional website. Our platform offers intuitive tools and resources to build pages, integrate features, and ensure responsiveness.",
    date: "Week 3-6",
    icon: "💻"
  },
  {
    step: 3,
    title: "Launch & Grow Your Online Presence",
    description: "Deploy your completed website to the world and begin your journey of online growth. Utilize our analytics and marketing tools to reach your audience and expand your reach.",
    date: "Week 7+",
    icon: "🚀"
  }
];

<Roadmap
  variant="left"
  title="Launch Your Dream Website in Three Steps"
  subtitle="Embark on a streamlined journey to bring your online presence to life with our simple, three-stage process."
  items={websiteLaunchData}
  showImages={true}
/>`;

  const alternativeVariantJSX = `const productRoadmapData = [
  {
    title: "Market Research & Analysis",
    description: "Conduct comprehensive market research to identify target audience and competitive landscape.",
    date: "Q1 2024",
    icon: "📊"
  },
  {
    title: "Product Design & Prototyping",
    description: "Create detailed mockups and prototypes based on research findings and user feedback.",
    date: "Q2 2024",
    icon: "🎨"
  },
  {
    title: "Development & Testing",
    description: "Build the product with rigorous testing phases to ensure quality and performance.",
    date: "Q3 2024",
    icon: "⚙️"
  },
  {
    title: "Beta Launch & Feedback",
    description: "Release beta version to select users and gather valuable feedback for improvements.",
    date: "Q4 2024",
    icon: "🚀"
  },
  {
    title: "Full Market Launch",
    description: "Official product launch with comprehensive marketing campaign and user onboarding.",
    date: "Q1 2025",
    icon: "🎯"
  }
];

<Roadmap
  variant="alternative"
  title="Product Development Roadmap"
  subtitle="Our journey from conception to market launch"
  items={productRoadmapData}
/>`;

  const zigzagVariantJSX = `const careerJourneyData = [
  {
    title: "Spawned in Washington",
    date: "1/01/2000",
  },
  {
    title: "Played first PC game",
    date: "2004",
  },
  {
    title: "Started Coding",
    date: "2010",
    icon: ""
  },
  {
    title: "Began Web design",
    date: "2012",
  },
  {
    title: "Began using Adobe software",
    date: "2014",
  },
  {
    title: "Google UX Cert. #1",
    date: "2018",
  },
  {
    title: "Google UX Cert. #2",
    date: "2019",
  },
  {
    title: "My first game!",
    date: "2019",
  },
  {
    title: "Game #1 Dept. Head",
    date: "Nov 2019",
  },
  {
    title: "Game #3 Lead Designer",
    date: "Jan 2022",
  },
  {
    title: "Game #2 Community Manager",
    date: "Feb 2022",
  },
  {
    title: "What I'm doing now!",
    date: "NOW",
  }
];

<Roadmap
  variant="zigzag"
  title="My Professional Journey"
  subtitle="Key milestones and achievements throughout my career"
  items={careerJourneyData}
  showImages={false}
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
          { prop: "variant", type: "string", default: "'left'", desc: "Defines the roadmap layout — options can include 'left', 'right', or 'alternate'." },
          { prop: "items", type: "array", default: "[]", desc: "Array of roadmap milestone objects, each containing content, date, image, or description." },
          { prop: "title", type: "string", default: "undefined", desc: "Main title text displayed at the top of the roadmap." },
          { prop: "subtitle", type: "string", default: "undefined", desc: "Optional subtitle or descriptive line shown below the title." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class name for styling the roadmap container." },
          { prop: "showImages", type: "boolean", default: "true", desc: "Toggles whether milestone images are displayed in each roadmap item." },
          { prop: "customLineColor", type: "string", default: "undefined", desc: "Custom color value for the connecting timeline line." },
          { prop: "customAccentColor", type: "string", default: "undefined", desc: "Custom accent color for milestone markers or highlights." },
          { prop: "theme", type: "string", default: "'roadmap-light'", desc: "Theme mode for the roadmap, e.g., 'roadmap-light' or 'roadmap-dark'." },
          { prop: "color", type: "string", default: "'#e33de0'", desc: "Primary accent color used for active elements and highlights." },
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


      <RoadmapSectionWithPreview
        title="Road Map - Left variant"
        jsxCode={leftVariantJSX}
      >
        <Roadmap
          variant="left"
          title="Launch Your Dream Website in Three Steps"
          subtitle="Embark on a streamlined journey to bring your online presence to life with our simple, three-stage process."
          items={websiteLaunchData}
          showImages={true}
          theme={isDarkMode ? 'roadmap-dark' : 'roadmap-light'}
        />
      </RoadmapSectionWithPreview>

      <RoadmapSectionWithPreview
        title="Road Map - Alternative variant"
        jsxCode={alternativeVariantJSX}
      >
        <Roadmap
          variant="alternative"
          title="Product Development Roadmap"
          subtitle="Our journey from conception to market launch"
          items={productRoadmapData}
          theme={isDarkMode ? 'roadmap-dark' : 'roadmap-light'}
        />
      </RoadmapSectionWithPreview>

      <RoadmapSectionWithPreview
        title="Road Map - Zigzag variant"
        jsxCode={zigzagVariantJSX}
      >
        <Roadmap
          variant="zigzag"
          title="My Professional Journey"
          subtitle="Key milestones and achievements throughout my career"
          items={careerJourneyData}
          showImages={false}
          theme={isDarkMode ? 'roadmap-dark' : 'roadmap-light'}
        />
      </RoadmapSectionWithPreview>

    </div>
  );
};

export default RoadmapSection;