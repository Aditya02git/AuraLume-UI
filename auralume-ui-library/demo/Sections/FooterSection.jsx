import React, { useState, useEffect } from 'react';
import Footer from '../../src/components/Footer';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";


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
            backgroundColor: copied ? '#10b981' : '#3b82f6',
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

const FooterSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
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

const FooterSection = ({isDarkMode, setIsDarkMode}) => {

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

  // Basic Footer JSX
  const basicFooterJSX = `import Footer from './Footer';

function App() {
  return (
    <Footer 
      backgroundColor = {isDarkMode ? 'rgb(15, 23, 42)' : '#dedede'}
      titleColor= {isDarkMode ? '#ffffff' : '#000000'} 
      textColor = {isDarkMode ? '#ffffff': '#000000'}
      linkColor = {'#60a5fa'}
      linkHoverColor = {'#3b82f6'}
      linkDecoration='none'
      containerMaxWidth = {'1200px'}
      sections={[
        {
          title: "TechCorp",
          content: (
            <div>
              <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.6', opacity: '0.8' }}>
                Building innovative solutions for the digital world. 
                We create amazing products that help businesses grow and succeed.
              </p>
            </div>
          )
        },
        {
          title: "Quick Links",
          links: [
            { text: "About Us", href: "/about" },
            { text: "Services", href: "/services" },
            { text: "Contact", href: "/contact" },
            { text: "Privacy Policy", href: "/privacy" }
          ]
        },
        {
          title: "Newsletter",
          content: (
            <div>
              <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
                Subscribe to our newsletter for updates
              </p>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    border: '1px solid #374151',
                    borderRadius: '4px',
                    backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                    color: isDarkMode ? '#ffffff' : '#000000',
                    fontSize: '14px'
                  }}
                />
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: isDarkMode ? '#000000' : '#000000',
                  color: 'white',
                  border: '1px solid rgb(51, 65, 85)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  Subscribe
                </button>
              </div>
            </div>
          )
        }
      ]}
      socialLinks={[
        { href: "https://facebook.com/techcorp", label: "Facebook", icon: <FaFacebook color="#1877f2"/> },
        { href: "https://twitter.com/techcorp", label: "Twitter", icon: <FaTwitter /> },
        { href: "https://linkedin.com/company/techcorp", label: "LinkedIn", icon: <FaLinkedin color="#0A66C2"/> },
        { href: "https://instagram.com/techcorp", label: "Instagram", icon: <FaInstagram color="#E4405F"/> }
      ]}
      bottomText="© 2024 TechCorp. All rights reserved."
    />
  );
}`;

  // Multi-Column Footer JSX
  const multiColumnFooterJSX = `import Footer from './Footer';

function App() {
  return (
    <Footer 
      backgroundColor = {isDarkMode ? 'rgb(15, 23, 42)' : '#f2f2f2'}
      titleColor= {isDarkMode ? '#ffffff' : '#000000'}
      textColor = {isDarkMode ? '#ffffff': '#000000'}
      linkColor = {'#787878'}
      linkDecoration='none'
      linkHoverColor = {'#000000'}
      containerMaxWidth = {'1200px'}
      sections={[
        {
          title: "Products",
          links: [
            { text: "Web App", href: "/webapp" },
            { text: "Mobile App", href: "/mobile" },
            { text: "Desktop App", href: "/desktop" },
            { text: "API", href: "/api" }
          ]
        },
        {
          title: "Company",
          links: [
            { text: "About Us", href: "/about" },
            { text: "Our Team", href: "/team" },
            { text: "Careers", href: "/careers" },
            { text: "Press Kit", href: "/press" }
          ]
        },
        {
          title: "Support",
          links: [
            { text: "Help Center", href: "/help" },
            { text: "Documentation", href: "/docs", external: true },
            { text: "Contact Support", href: "/support" },
            { text: "Status Page", href: "https://status.example.com", external: true }
          ]
        },
        {
          title: "Legal",
          links: [
            { text: "Privacy Policy", href: "/privacy" },
            { text: "Terms of Service", href: "/terms" },
            { text: "Cookie Policy", href: "/cookies" }
          ]
        }
      ]}
      bottomText="© 2024 Your Company. All rights reserved."
    />
  );
}`;

  // Footer with Social Links JSX
  const socialFooterJSX = `import Footer from './Footer';

function App() {
  return (
    <Footer
      backgroundColor = {isDarkMode ? 'rgb(15, 23, 42)' : '#e3e9f1'}
      titleColor= {isDarkMode ? '#ffffff' : '#000000'}
      textColor = {isDarkMode ? '#ffffff': '#000000'}
      linkColor = {'#60a5fa'}
      linkHoverColor = {'#3b82f6'}
      containerMaxWidth = {'1200px'} 
      borderRadius='10px'
      sections={[
        {
          title: "Company",
          links: [
            { text: "About", href: "/about" },
            { text: "Careers", href: "/careers" },
            { text: "Contact", href: "/contact" }
          ]
        },
        {
          title: "Resources",
          links: [
            { text: "Blog", href: "/blog" },
            { text: "Help Center", href: "/help" },
            { text: "Privacy Policy", href: "/privacy" }
          ]
        },
        {
          title: "Contact Info",
          content: (
            <div>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>123 Business Street</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>City, State 12345</p>
              <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Phone: (555) 123-4567</p>
              <p style={{ margin: '0', fontSize: '14px' }}>Email: hello@company.com</p>
            </div>
          )
        }
      ]}
      socialLinks={[
        { href: "https://facebook.com/techcorp", label: "Facebook", icon: <FaFacebook color="#1877f2"/> },
        { href: "https://twitter.com/techcorp", label: "Twitter", icon: <FaTwitter /> },
        { href: "https://linkedin.com/company/techcorp", label: "LinkedIn", icon: <FaLinkedin color="#0A66C2"/> },
        { href: "https://instagram.com/techcorp", label: "Instagram", icon: <FaInstagram color="#E4405F"/> }
      ]}
      bottomText="© 2024 Your Company. Built with ❤️ by our amazing team."
    />
  );
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
          { prop: "sections", type: "array", default: "[]", desc: "Array of footer sections, each containing title and links." },
          { prop: "bottomText", type: "string", default: "''", desc: "Text displayed at the bottom of the footer." },
          { prop: "socialLinks", type: "array", default: "[]", desc: "Array of social link objects for icons and URLs." },
          { prop: "backgroundColor", type: "string", default: "'#1a1a1a'", desc: "Background color of the footer." },
          { prop: "titleColor", type: "string", default: "'#000000'", desc: "Color of section titles in the footer." },
          { prop: "textColor", type: "string", default: "'#ffffff'", desc: "Color of the normal text in the footer." },
          { prop: "linkColor", type: "string", default: "'#60a5fa'", desc: "Default color of links in the footer." },
          { prop: "linkHoverColor", type: "string", default: "'#3b82f6'", desc: "Link color when hovered." },
          { prop: "linkDecoration", type: "string", default: "'underline'", desc: "Text decoration style for links." },
          { prop: "borderRadius", type: "string", default: "'0px'", desc: "Border radius of the footer container." },
          { prop: "color", type: "string | null", default: "null", desc: "Optional primary color for the footer." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class applied to the footer container." },
          { prop: "containerMaxWidth", type: "string", default: "'1200px'", desc: "Maximum width of the footer container." },
          { prop: "showDivider", type: "boolean", default: "true", desc: "Whether to show a divider line above the bottom text." },
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
        <FooterSectionWithPreview
          title="Company Footer with Newsletter"
          jsxCode={basicFooterJSX}
          isDarkMode={isDarkMode}
        >
          <Footer 
            backgroundColor = {isDarkMode ? 'rgb(15, 23, 42)' : '#dedede'}
            titleColor= {isDarkMode ? '#ffffff' : '#000000'} 
            textColor = {isDarkMode ? '#ffffff': '#000000'}
            linkColor = {'#60a5fa'}
            linkHoverColor = {'#3b82f6'}
            linkDecoration='none'
            containerMaxWidth = {'1200px'}
            sections={[
              {
                title: "TechCorp",
                content: (
                  <div>
                    <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: '1.6', opacity: '0.8' }}>
                      Building innovative solutions for the digital world. 
                      We create amazing products that help businesses grow and succeed.
                    </p>
                  </div>
                )
              },
              {
                title: "Quick Links",
                links: [
                  { text: "About Us", href: "/about" },
                  { text: "Services", href: "/services" },
                  { text: "Contact", href: "/contact" },
                  { text: "Privacy Policy", href: "/privacy" }
                ]
              },
              {
                title: "Newsletter",
                content: (
                  <div>
                    <p style={{ margin: '0 0 12px 0', fontSize: '14px' }}>
                      Subscribe to our newsletter for updates
                    </p>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                      <input 
                        type="email" 
                        placeholder="Enter your email"
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          border: '1px solid #374151',
                          borderRadius: '4px',
                          backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                          color: isDarkMode ? '#ffffff' : '#000000',
                          fontSize: '14px',
                        }}
                      />
                      <button style={{
                        padding: '8px 16px',
                        backgroundColor: isDarkMode ? '#000000' : '#000000',
                        color: 'white',
                        border: '1px solid rgb(51, 65, 85)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}>
                        Subscribe
                      </button>
                    </div>
                  </div>
                )
              }
            ]}
            socialLinks={[
              { href: "https://facebook.com/techcorp", label: "Facebook", icon: <FaFacebook color="#1877f2"/> },
              { href: "https://twitter.com/techcorp", label: "Twitter", icon: <FaTwitter /> },
              { href: "https://linkedin.com/company/techcorp", label: "LinkedIn", icon: <FaLinkedin color="#0A66C2"/> },
              { href: "https://instagram.com/techcorp", label: "Instagram", icon: <FaInstagram color="#E4405F"/> }
            ]}
            bottomText="© 2024 TechCorp. All rights reserved."
          />
        </FooterSectionWithPreview>

        <FooterSectionWithPreview
          title="Multi-Column Footer"
          jsxCode={multiColumnFooterJSX}
          isDarkMode={isDarkMode}
        >
          <Footer 
            backgroundColor = {isDarkMode ? 'rgb(15, 23, 42)' : '#f2f2f2'}
            titleColor= {isDarkMode ? '#ffffff' : '#000000'}
            textColor = {isDarkMode ? '#ffffff': '#000000'}
            linkColor = {'#787878'}
            linkDecoration='none'
            linkHoverColor = {'#000000'}
            containerMaxWidth = {'1200px'}
            sections={[
              {
                title: "Products",
                links: [
                  { text: "Web App", href: "/webapp" },
                  { text: "Mobile App", href: "/mobile" },
                  { text: "Desktop App", href: "/desktop" },
                  { text: "API", href: "/api" }
                ]
              },
              {
                title: "Company",
                links: [
                  { text: "About Us", href: "/about" },
                  { text: "Our Team", href: "/team" },
                  { text: "Careers", href: "/careers" },
                  { text: "Press Kit", href: "/press" }
                ]
              },
              {
                title: "Support",
                links: [
                  { text: "Help Center", href: "/help" },
                  { text: "Documentation", href: "/docs", external: true },
                  { text: "Contact Support", href: "/support" },
                  { text: "Status Page", href: "https://status.example.com", external: true }
                ]
              },
              {
                title: "Legal",
                links: [
                  { text: "Privacy Policy", href: "/privacy" },
                  { text: "Terms of Service", href: "/terms" },
                  { text: "Cookie Policy", href: "/cookies" }
                ]
              }
            ]}
            bottomText="© 2024 Your Company. All rights reserved."
          />
        </FooterSectionWithPreview>

        <FooterSectionWithPreview
          title="Footer with Social Links & Custom Content"
          jsxCode={socialFooterJSX}
          isDarkMode={isDarkMode}
        >
          <Footer
            backgroundColor = {isDarkMode ? 'rgb(15, 23, 42)' : '#e3e9f1'}
            titleColor= {isDarkMode ? '#ffffff' : '#000000'}
            textColor = {isDarkMode ? '#ffffff': '#000000'}
            linkColor = {'#60a5fa'}
            linkHoverColor = {'#3b82f6'}
            containerMaxWidth = {'1200px'} 
            borderRadius='10px'
            sections={[
              {
                title: "Company",
                links: [
                  { text: "About", href: "/about" },
                  { text: "Careers", href: "/careers" },
                  { text: "Contact", href: "/contact" }
                ]
              },
              {
                title: "Resources",
                links: [
                  { text: "Blog", href: "/blog" },
                  { text: "Help Center", href: "/help" },
                  { text: "Privacy Policy", href: "/privacy" }
                ]
              },
              {
                title: "Contact Info",
                content: (
                  <div>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>123 Business Street</p>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>City, State 12345</p>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Phone: (555) 123-4567</p>
                    <p style={{ margin: '0', fontSize: '14px' }}>Email: hello@company.com</p>
                  </div>
                )
              }
            ]}
            socialLinks={[
              { href: "https://facebook.com/techcorp", label: "Facebook", icon: <FaFacebook color="#1877f2"/> },
              { href: "https://twitter.com/techcorp", label: "Twitter", icon: <FaTwitter /> },
              { href: "https://linkedin.com/company/techcorp", label: "LinkedIn", icon: <FaLinkedin color="#0A66C2"/> },
              { href: "https://instagram.com/techcorp", label: "Instagram", icon: <FaInstagram color="#E4405F"/> }
            ]}
            bottomText="© 2024 Your Company. Built with ❤️ by our amazing team."
          />
        </FooterSectionWithPreview>
      </div>
    </div>
  );
};

export default FooterSection;