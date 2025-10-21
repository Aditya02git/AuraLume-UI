import React, { useState, useEffect } from 'react';
import Navbar from '../../src/components/Navbar';
import menuIcon from '/menu.png';
import bellIcon from '/bell.png';
import checkIcon from '/check.png';
import storeIcon from '/grocery-store.png';
import infoIcon from'/info-button.png';
import mobileIcon from '/mobile.png';
import settingIcon from '/setting.png';
import contactIcon from '/contact.png'
import homeIcon from '/home.png'
import { Button } from '../../src';

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
      width: 'fit-content',
      border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
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
      marginBottom: '16px',
      fontSize: window.innerWidth <= 768 ? '12px' : '14px'
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
            fontSize: window.innerWidth <= 768 ? '11px' : '12px',
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
        padding: window.innerWidth <= 768 ? '12px' : '16px', 
        margin: 0, 
        color: '#e2e8f0', 
        fontSize: window.innerWidth <= 768 ? '11px' : '14px',
        lineHeight: '1.5',
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word'
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const NavbarSectionWithPreview = ({ title, children, jsxCode, description }) => {
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
    <section style={{ 
      marginBottom: '4rem',
      position: 'relative'
    }}>
      <h2 style={{ 
        marginBottom: '1rem', 
        color: isDarkMode ? '#ffffff' : '#1f2937', 
        fontSize: window.innerWidth <= 768 ? '20px' : '24px', 
        fontWeight: 'bold'
      }}>
        {title}
      </h2>
      
      {description && (
        <p style={{
          marginBottom: '2rem',
          color: isDarkMode ? '#9ca3af' : '#6b7280',
          fontSize: window.innerWidth <= 768 ? '14px' : '16px',
          lineHeight: '1.6'
        }}>
          {description}
        </p>
      )}
      
      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} />
      
      {activeTab === 'Preview' && (
        <div style={{
          padding: window.innerWidth <= 768 ? '16px' : '32px',
          backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
          borderRadius: '12px',
          border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          height: '100vh'
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

const NavbarSection = () => {
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
    padding: window.innerWidth <= 768 ? '20px' : '40px',
    paddingTop: window.innerWidth <= 768 ? '80px' : '120px', // Responsive top padding
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    minHeight: '200vh', // Ensure enough content to scroll
    transition: 'all 0.3s ease',
    position: 'relative'
  };

  const menuItems = [
    { label: 'Home' },
    { label: 'About' },
    { 
      label: 'Contents', 
      dropdown: [
        { label: 'Web Development', icon: '💻' },
        { label: 'Design', icon: '🎨' },
        { label: 'Consulting', icon: '📋' }
      ]
    },
    { label: 'Contact' }
  ];

  // Fixed menu items for specific examples - moved inside render to ensure fresh references
  const notificationsMenuItems = [
    { 
      label: 'Notifications', 
      dropdown: [
        { label: 'Messages', icon: '💌' },
        { label: 'Updates', icon: '🔄' },
        { label: 'Alerts', icon: '⚠️' }
      ]
    }
  ];

  const categoriesMenuItems = [
    { 
      label: 'Categories', 
      dropdown: [
        { label: 'Electronics', icon: '🔌' },
        { label: 'Clothing', icon: '👕' },
        { label: 'Books', icon: '📚' }
      ]
    }
  ];

  const productsMenuItems = [
    { 
      label: 'Products', 
      dropdown: [
        { label: 'Laptops', icon: '💻' },
        { label: 'Phones', icon: '📱' },
        { label: 'Tablets', icon: '📋' }
      ]
    }
  ];

  // Debug: Let's add some logging to see if menu items are being passed correctly
  console.log('notificationsMenuItems:', notificationsMenuItems);
  console.log('categoriesMenuItems:', categoriesMenuItems);

  const handleMenuClick = (item, index) => {
    console.log('Menu clicked:', item, index);
  };

  const handleIconClick = (position) => {
    console.log('Icon clicked:', position);
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
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
          { prop: "title", type: "string", default: "—", desc: "Title text displayed in the navbar." },
          { prop: "logo", type: "string | JSX.Element", default: "—", desc: "Logo image URL or JSX element." },
          { prop: "endIcon", type: "JSX.Element", default: "—", desc: "Optional icon or element displayed on the right side." },
          { prop: "menuItems", type: "array", default: "[]", desc: "Array of navigation menu items." },
          { prop: "searchable", type: "boolean", default: "false", desc: "Enables search input in the navbar." },
          { prop: "searchPlaceholder", type: "string", default: "'Search...'", desc: "Placeholder text for the search input." },
          { prop: "onSearch", type: "function", default: "—", desc: "Callback when search input value changes or is submitted." },
          { prop: "className", type: "string", default: "''", desc: "Custom CSS class for styling." },
          { prop: "variant", type: "string", default: "'default'", desc: "Visual style variant (e.g., 'default', 'glass', 'minimal')." },
          { prop: "centerLogo", type: "boolean", default: "false", desc: "Centers the logo horizontally in the navbar." },
          { prop: "onMenuClick", type: "function", default: "—", desc: "Callback triggered when a menu item is clicked." },
          { prop: "onIconClick", type: "function", default: "—", desc: "Callback triggered when the end icon is clicked." },
          { prop: "color", type: "string", default: "'#3b82f6'", desc: "Accent color used for highlights or links." },
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

      <NavbarSectionWithPreview
        title="Navbar with title only"
        jsxCode={`<div style={{ marginBottom: '3rem' }}>
  <Navbar 
    title="My App" 
    className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
  />
</div>`}
      >
        <div style={{ marginBottom: '3rem' }}>
          <Navbar 
            title="My App" 
            className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
          />
        </div>
      </NavbarSectionWithPreview>

      <NavbarSectionWithPreview
        title="Navbar with icon at start and end"
        jsxCode={`<div style={{ marginBottom: '3rem' }}>
  <Navbar 
    title="My App"
    startIcon={<img style={{filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)'}} src={menuIcon} height="20px" width="20px"/>}
    endIcon={<img style={{filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)'}} src={contactIcon} height="20px" width="20px"/>}
    onIconClick={handleIconClick}
    className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
  />
</div>`}
      >
        <div style={{ marginBottom: '3rem' }}>
          <Navbar 
            title="My App"
            startIcon={<img style={{filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)'}} src={menuIcon} height="20px" width="20px"/>}
            endIcon={<img style={{filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)'}} src={contactIcon} height="20px" width="20px"/>}
            onIconClick={handleIconClick}
            className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
          />
        </div>
      </NavbarSectionWithPreview>

      <NavbarSectionWithPreview
        title="Navbar with menu and submenu"
        jsxCode={`<div style={{ marginBottom: '3rem' }}>
  <Navbar 
    title="My App"
    menuItems={menuItems}
    onMenuClick={handleMenuClick}
    className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
  />
</div>`}
      >
        <div style={{ marginBottom: '3rem' }}>
          <Navbar 
            title="My App"
            menuItems={menuItems}
            onMenuClick={handleMenuClick}
            className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
          />
        </div>
      </NavbarSectionWithPreview>

      <NavbarSectionWithPreview
        title="Navbar with search input and dropdown"
        jsxCode={`// Define the menu items
const productsMenuItems = [
  { 
    label: 'Products', 
    dropdown: [
      { label: 'Laptops', icon: '💻' },
      { label: 'Phones', icon: '📱' },
      { label: 'Tablets', icon: '📋' }
    ]
  }
];

<div style={{ marginBottom: '3rem' }}>
  <Navbar 
    title="My App"
    menuItems={productsMenuItems}
    searchable={true}
    searchPlaceholder="Search products..."
    onSearch={handleSearch}
    onMenuClick={handleMenuClick}
    className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
  />
</div>`}
      >
        <div style={{ marginBottom: '3rem' }}>
          <Navbar 
            title="My App"
            menuItems={productsMenuItems}
            searchable={true}
            searchPlaceholder="Search products..."
            onSearch={handleSearch}
            onMenuClick={handleMenuClick}
            className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
          />
        </div>
      </NavbarSectionWithPreview>

      <NavbarSectionWithPreview
        title="Navbar with icon, indicator and dropdown"
        jsxCode={`// Define the menu items
const notificationsMenuItems = [
  { 
    label: 'Notifications', 
    dropdown: [
      { label: 'Messages', icon: '💌' },
      { label: 'Updates', icon: '🔄' },
      { label: 'Alerts', icon: '⚠️' }
    ]
  }
];

<div style={{ marginBottom: '3rem' }}>
  <Navbar 
    title="My App"
    endIcon={<img style={{filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)'}} src={bellIcon} height="20px" width="20px"/>}
    showIndicator={true}
    indicatorCount={5}
    menuItems={notificationsMenuItems}
    onIconClick={handleIconClick}
    onMenuClick={handleMenuClick}
    className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
  />
</div>`}
      >
        <div style={{ marginBottom: '3rem' }}>
          <Navbar 
            title="My App"
            endIcon={<img style={{filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)'}} src={bellIcon} height="20px" width="20px"/>}
            showIndicator={true}
            indicatorCount={5}
            menuItems={notificationsMenuItems}
            onIconClick={handleIconClick}
            onMenuClick={handleMenuClick}
            className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
          />
        </div>
      </NavbarSectionWithPreview>

      <NavbarSectionWithPreview
        title="Navbar with dropdown, center logo and icon"
        jsxCode={`// Define the menu items
const categoriesMenuItems = [
  { 
    label: 'Categories', 
    dropdown: [
      { label: 'Electronics', icon: '🔌' },
      { label: 'Clothing', icon: '👕' },
      { label: 'Books', icon: '📚' }
    ]
  }
];

<div style={{ marginBottom: '3rem' }}>
  <Navbar 
    logo="🌟" // You can also use: logo="/path/to/logo.png"
    centerLogo={true}
    startIcon={<img style={{filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)'}} src={menuIcon} height="20px" width="20px"/>}
    endIcon={<img style={{filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)'}} src={storeIcon} height="20px" width="20px"/>}
    showIndicator={true}
    indicatorCount={3}
    menuItems={categoriesMenuItems}
    onIconClick={handleIconClick}
    onMenuClick={handleMenuClick}
    className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
  />
</div>`}
      >
        <div style={{ marginBottom: '3rem' }}>
          <Navbar 
            logo="https://placehold.co/200x50.png?text=Logo"
            endIcon={<Button variant='primary' size='small'>Login</Button>}
            showIndicator={true}
            menuItems={categoriesMenuItems}
            onIconClick={handleIconClick}
            onMenuClick={handleMenuClick}
            className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
          />
        </div>
      </NavbarSectionWithPreview>

      <NavbarSectionWithPreview
        title="Navbar with full features (menu, search, logo, icons)"
        jsxCode={`<div style={{ marginBottom: '3rem' }}>
  <Navbar 
    title="Responsive App"
    endIcon={<img style={{filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)'}} src={contactIcon} height="20px" width="20px"/>}
    menuItems={menuItems}
    searchable={true}
    onIconClick={handleIconClick}
    onMenuClick={handleMenuClick}
    onSearch={handleSearch}
    className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
  />
</div>`}
      >
        <div style={{ marginBottom: '3rem' }}>
          <Navbar 
            title="Responsive App"
            endIcon={<img style={{filter: isDarkMode ? 'brightness(0) invert(1)' : 'brightness(0) saturate(100%)'}} src={contactIcon} height="20px" width="20px"/>}
            menuItems={menuItems}
            searchable={true}
            onIconClick={handleIconClick}
            onMenuClick={handleMenuClick}
            onSearch={handleSearch}
            className={isDarkMode ? 'navbar-dark' : 'navbar-light'}
          />
        </div>
      </NavbarSectionWithPreview>
    </div>
  );
};

export default NavbarSection;