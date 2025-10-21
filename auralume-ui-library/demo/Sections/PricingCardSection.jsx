import React, { useState, useEffect } from 'react';
import { Button } from '../../src';
import PricingCard from '../../src/components/PricingCard/PricingCard';

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

const PricingCardSectionWithPreview = ({ title, children, jsxCode }) => {
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
          padding: '32px 16px', // Reduced horizontal padding for mobile
          backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
          borderRadius: '12px',
          border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
          transition: 'all 0.3s ease',
          overflow: 'hidden' // Prevent content overflow
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

const PricingCardSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  

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
    padding: '20px 16px', // Reduced padding for mobile
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    background: 'transparent',
    color: isDarkMode ? '#e2e8f0' : '#1a1a1a',
    minHeight: '100vh',
    transition: 'all 0.3s ease'
  };

  // JSX for basic usage - Updated with responsive grid
  const basicUsageJSX = `
            <div className="pricing-cards-container" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              width: '100%',
              alignItems: 'center'
            }}>
              <PricingCard 
                title="Basic Plan"
                price="$9/mo"
                features={[
                  '10 Projects',
                  '5GB Storage',
                  'Email Support',
                  'Basic Analytics'
                ]}
                variant={isDarkMode ? 'pricingcard-dark' : 'pricingcard-light'}
              >
                <Button>Get Started</Button>
              </PricingCard>

              <PricingCard 
                title="Pro Plan"
                price="$29/mo"
                features={[
                  'Unlimited Projects',
                  '100GB Storage',
                  'Priority Support',
                  'Advanced Analytics',
                  'Custom Integrations'
                ]}
                variant={isDarkMode ? 'pricingcard-dark' : 'pricingcard-light'}
                isPopular={true}
              >
                <Button>Choose Pro</Button>
              </PricingCard>

              <PricingCard 
                title="Enterprise"
                price="$99/mo"
                features={[
                  'Everything in Pro',
                  'Unlimited Storage',
                  '24/7 Phone Support',
                  'Custom Solutions',
                  'Dedicated Manager'
                ]}
                variant={isDarkMode ? 'pricingcard-dark' : 'pricingcard-light'}
              >
                <Button>Contact Sales</Button>
              </PricingCard>
            </div>

            /* Responsive Styles */
            @media (min-width: 768px) {
              .pricing-cards-container {
                flex-direction: row !important;
                justify-content: center;
                align-items: flex-start;
                gap: 2rem !important;
              }
            }

            @media (min-width: 1024px) {
              .pricing-cards-container {
                gap: 2.5rem !important;
              }
            }`;

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
        <div style={{ overflowX: 'auto', minWidth: '320px' }}>
        <table
          style={{
            width: "100%",
            minWidth: '600px', // Ensure table has minimum width for mobile scroll
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
              <th style={{ padding: "12px 8px", textAlign: "left", fontWeight: "600", minWidth: '100px' }}>Prop</th>
              <th style={{ padding: "12px 8px", textAlign: "left", fontWeight: "600", minWidth: '80px' }}>Type</th>
              <th style={{ padding: "12px 8px", textAlign: "left", fontWeight: "600", minWidth: '120px' }}>Default</th>
              <th style={{ padding: "12px 8px", textAlign: "left", fontWeight: "600", minWidth: '200px' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {[
          { prop: "theme", type: "string", default: "'pricingcard-light'", desc: "Defines the theme of the pricing card, e.g. 'pricingcard-light' or 'pricingcard-dark'." },
          { prop: "title", type: "string", default: "'Basic Plan'", desc: "Title or name of the pricing plan." },
          { prop: "price", type: "string", default: "'$9/mo'", desc: "Displays the pricing information for the plan." },
          { prop: "features", type: "array", default: "[]", desc: "List of plan features or benefits displayed in the card." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class name for the pricing card container." },
          { prop: "isPopular", type: "boolean", default: "false", desc: "Highlights the card as 'Popular' or featured if true." },
          { prop: "customClass", type: "string", default: "''", desc: "Additional class for more granular control or styling." },
          { prop: "color", type: "string", default: "'#667eea'", desc: "Primary color for theming the card and its accents." },
          { prop: "children", type: "ReactNode", default: "undefined", desc: "Optional React children to render custom content inside the card." },
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
                    padding: "12px 8px",
                    fontFamily: "monospace",
                    color: isDarkMode ? "#fbbf24" : "#d97706",
                    fontSize: '13px'
                  }}
                >
                  {row.prop}
                </td>
                <td
                  style={{
                    padding: "12px 8px",
                    fontFamily: "monospace",
                    color: isDarkMode ? "#8b5cf6" : "#7c3aed",
                    fontSize: '13px'
                  }}
                >
                  {row.type}
                </td>
                <td
                  style={{
                    padding: "12px 8px",
                    fontFamily: "monospace",
                    color: isDarkMode ? "#06b6d4" : "#0891b2",
                    fontSize: '13px'
                  }}
                >
                  {row.default}
                </td>
                <td style={{ padding: "12px 8px", fontSize: '13px' }}>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>

      <PricingCardSectionWithPreview
        title="Basic usage with default plans"
        jsxCode={basicUsageJSX}
      >
        <div style={{ width: '100%', overflow: 'hidden' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '2rem', 
            textAlign: 'center',
            fontWeight: '700'
          }}>
            Pricing Plans
          </h2>
          
          {/* Mobile-first responsive container */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1.5rem',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <PricingCard 
              title="Basic Plan"
              price="$9/mo"
              features={[
                '10 Projects',
                '5GB Storage',
                'Email Support',
                'Basic Analytics'
              ]}
              theme={isDarkMode ? 'pricingcard-dark' : 'pricingcard-light'}
            >
              <Button>Get Started</Button>
            </PricingCard>

            <PricingCard 
              title="Pro Plan"
              price="$29/mo"
              features={[
                'Unlimited Projects',
                '100GB Storage',
                'Priority Support',
                'Advanced Analytics',
                'Custom Integrations'
              ]}
              theme={isDarkMode ? 'pricingcard-dark' : 'pricingcard-light'}
              isPopular={true}
            >
              <Button>Choose Pro</Button>
            </PricingCard>

            <PricingCard 
              title="Enterprise"
              price="$99/mo"
              features={[
                'Everything in Pro',
                'Unlimited Storage',
                '24/7 Phone Support',
                'Custom Solutions',
                'Dedicated Manager'
              ]}
              theme={isDarkMode ? 'pricingcard-dark' : 'pricingcard-light'}
            >
              <Button>Contact Sales</Button>
            </PricingCard>
          </div>
        </div>
      </PricingCardSectionWithPreview>

    </div>
  );
};

export default PricingCardSection;