import React, { useState, useEffect } from 'react'
import { Avatar, AvatarGroup } from '../../src/components/Avatar'

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
      width: 'fit-content',
      border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
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
const CodeDisplay = ({ code, language, isDarkMode }) => {
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
      marginBottom: '16px',
      border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#334155',
        borderBottom: `1px solid ${'#475569'}`
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
        color: '#e2e8f0' , 
        fontSize: '14px',
        lineHeight: '1.5',
        overflow: 'auto',
        backgroundColor: 'transparent'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Button Section with Preview Toggle
const AvatarSectionWithPreview = ({ title, children, jsxCode, isDarkMode }) => {
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
      
      <PreviewToggle 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isDarkMode={isDarkMode} 
      />
      
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
        <CodeDisplay code={jsxCode} language="TSX/JSX" isDarkMode={isDarkMode} />
      )}
    </section>
  );
};

const AvatarSection = ({isDarkMode, setIsDarkMode}) => {

  // Sample users list
  const usersList = [
    { id: 1, src: 'https://randomuser.me/api/portraits/men/1.jpg', name: 'John Doe', alt: 'John Doe' },
    { id: 2, src: 'https://randomuser.me/api/portraits/men/3.jpg', name: 'Mike Smith', alt: 'Mike Smith' },
    { id: 3, src: 'https://randomuser.me/api/portraits/men/4.jpg', name: 'Tom Wilson', alt: 'Tom Wilson' },
    { id: 4, src: 'https://randomuser.me/api/portraits/men/5.jpg', name: 'David Brown', alt: 'David Brown' },
    { id: 5, src: 'https://randomuser.me/api/portraits/men/6.jpg', name: 'Chris Lee', alt: 'Chris Lee' },
    { id: 6, src: 'https://randomuser.me/api/portraits/women/7.jpg', name: 'Sarah Johnson', alt: 'Sarah Johnson' },
    { id: 7, src: 'https://randomuser.me/api/portraits/women/8.jpg', name: 'Emma Davis', alt: 'Emma Davis' },
  ];

  // Handler functions
  const handleUserClick = (user) => {
    console.log('User clicked:', user);
  };

  const showAllUsers = () => {
    console.log('Show all users clicked');
  };

  const containerStyle = {
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: 'transparent',
    color: isDarkMode ? '#f1f5f9' : '#1e293b',
    transition: 'all 0.3s ease'
  };

  const sectionStyle = {
    marginBottom: '32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const flexContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  };

  // JSX code examples
  const singleAvatarJsx = `<Avatar 
  src="https://randomuser.me/api/portraits/men/1.jpg" 
  alt="John Doe" 
  size="large" 
  variant="circle" 
/>`;

  const avatarGroupJsx = `
  const usersList = [
    { id: 1, src: 'https://randomuser.me/api/portraits/men/1.jpg', name: 'John Doe', alt: 'John Doe' },
    { id: 2, src: 'https://randomuser.me/api/portraits/men/3.jpg', name: 'Mike Smith', alt: 'Mike Smith' },
    { id: 3, src: 'https://randomuser.me/api/portraits/men/4.jpg', name: 'Tom Wilson', alt: 'Tom Wilson' },
    { id: 4, src: 'https://randomuser.me/api/portraits/men/5.jpg', name: 'David Brown', alt: 'David Brown' },
    { id: 5, src: 'https://randomuser.me/api/portraits/men/6.jpg', name: 'Chris Lee', alt: 'Chris Lee' },
    { id: 6, src: 'https://randomuser.me/api/portraits/women/7.jpg', name: 'Sarah Johnson', alt: 'Sarah Johnson' },
    { id: 7, src: 'https://randomuser.me/api/portraits/women/8.jpg', name: 'Emma Davis', alt: 'Emma Davis' },
  ];

  <AvatarGroup 
  avatars={usersList} 
  max={5} 
  spacing="normal"
  onAvatarClick={(user) => handleUserClick(user)}
  onMoreClick={(count) => showAllUsers()}
/>`;

  const differentSizesJsx = `<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
  <Avatar src="..." alt="Sarah" size="small" variant="circle" />
  <Avatar src="..." alt="Sarah" size="medium" variant="circle" />
  <Avatar src="..." alt="Sarah" size="large" variant="circle" />
  <Avatar src="..." alt="Sarah" size="xlarge" variant="circle" />
</div>`;

  const differentShapesJsx = `<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
  <Avatar src="..." alt="Mike" size="large" variant="circle" />
  <Avatar src="..." alt="Mike" size="large" variant="square" />
  <Avatar src="..." alt="Mike" size="large" variant="rounded" />
</div>`;

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
                Default
              </th>
              <th style={{ padding: "16px", textAlign: "left", fontWeight: "600" }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {[
          { prop: "src", type: "string", default: "undefined", desc: "Image URL source for the avatar." },
          { prop: "alt", type: "string", default: "'Avatar'", desc: "Alternative text for the avatar image for accessibility." },
          { prop: "size", type: "'small' | 'medium' | 'large'", default: "'medium'", desc: "Determines the size of the avatar." },
          { prop: "variant", type: "'circle' | 'square' | 'rounded'", default: "'circle'", desc: "Specifies the shape of the avatar." },
          { prop: "fallback", type: "string | ReactNode", default: "undefined", desc: "Fallback element or text to show when the image fails to load." },
          { prop: "className", type: "string", default: "''", desc: "Custom class for styling the avatar component." },
          { prop: "onClick", type: "function", default: "undefined", desc: "Click handler function for the avatar element." },
          { prop: "props", type: "object", default: "{}", desc: "Additional props spread onto the avatar container." },
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
  
      {/* Single Avatar */}
      <AvatarSectionWithPreview
        title="Single Avatar"
        jsxCode={singleAvatarJsx}
        isDarkMode={isDarkMode}
      >
        <div style={sectionStyle}>
          <Avatar 
            src="https://randomuser.me/api/portraits/men/1.jpg" 
            alt="John Doe" 
            size="large" 
            variant="circle" 
          />
        </div>
      </AvatarSectionWithPreview>

      {/* Avatar Group */}
      <AvatarSectionWithPreview
        title="Avatar Group"
        jsxCode={avatarGroupJsx}
        isDarkMode={isDarkMode}
      >
        <div style={sectionStyle}>
          <AvatarGroup 
            avatars={usersList} 
            max={5} 
            spacing="normal"
            onAvatarClick={(user) => handleUserClick(user)}
            onMoreClick={(count) => showAllUsers()}
          />
        </div>
      </AvatarSectionWithPreview>

      {/* Different Sizes */}
      <AvatarSectionWithPreview
        title="Different Sizes"
        jsxCode={differentSizesJsx}
        isDarkMode={isDarkMode}
      >
        <div style={sectionStyle}>
          <div style={flexContainerStyle}>
            <Avatar 
              src="https://randomuser.me/api/portraits/women/26.jpg" 
              alt="Sarah" 
              size="small" 
              variant="circle" 
            />
            <Avatar 
              src="https://randomuser.me/api/portraits/women/26.jpg" 
              alt="Sarah" 
              size="medium" 
              variant="circle" 
            />
            <Avatar 
              src="https://randomuser.me/api/portraits/women/26.jpg" 
              alt="Sarah" 
              size="large" 
              variant="circle" 
            />
            <Avatar 
              src="https://randomuser.me/api/portraits/women/26.jpg" 
              alt="Sarah" 
              size="xlarge" 
              variant="circle" 
            />
          </div>
        </div>
      </AvatarSectionWithPreview>

      {/* Different Shapes */}
      <AvatarSectionWithPreview
        title="Different Shapes"
        jsxCode={differentShapesJsx}
        isDarkMode={isDarkMode}
      >
        <div style={sectionStyle}>
          <div style={flexContainerStyle}>
            <Avatar 
              src="https://randomuser.me/api/portraits/men/84.jpg" 
              alt="Mike" 
              size="large" 
              variant="circle" 
            />
            <Avatar 
              src="https://randomuser.me/api/portraits/men/84.jpg" 
              alt="Mike" 
              size="large" 
              variant="square" 
            />
            <Avatar 
              src="https://randomuser.me/api/portraits/men/84.jpg" 
              alt="Mike" 
              size="large" 
              variant="oval" 
            />
          </div>
        </div>
      </AvatarSectionWithPreview>
    </div>
    </div>
  )
}

export default AvatarSection