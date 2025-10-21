import React, { useEffect, useState } from 'react';
import CodeBlock from '../../src/components/CodeBlock';


const NormalTheming = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    // Get theme from localStorage
    useEffect(() => {
      const saved = localStorage.getItem("darkMode");
      if (saved) {
        setIsDarkMode(JSON.parse(saved));
      }
    }, []);
  
    // Listen for storage changes to sync theme across components
    useEffect(() => {
      const handleStorageChange = () => {
        const saved = localStorage.getItem("darkMode");
        if (saved) {
          setIsDarkMode(JSON.parse(saved));
        }
      };
  
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }, []);
  return (
    <div style={{
      minHeight: '100vh',
      transition: 'background-color 0.3s ease'
    }}>

      {/* Main Content */}
      <div style={{
        maxWidth: '896px',
        margin: '0 auto',
        padding: '48px 24px'
      }}>
        <div style={{
          maxWidth: 'none'
        }}>
        
          <p style={{
            color: isDarkMode ? '#94a3b8' : '#475569',
            marginBottom: '40px',
            fontSize: '18px',
            lineHeight: '1.8',
            paddingLeft: '1.5rem'
          }}>
            Start with the essentials - a clean light and dark mode implementation. Wrap your application with the ThemeProvider in your{' '}
            <code style={{
              padding: '4px 10px',
              fontSize: '16px',
              fontFamily: 'ui-monospace, monospace',
              backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              color: '#385dba',
              borderRadius: '6px',
              fontWeight: '600'
            }}>main.jsx</code>{' '}
            file and you're ready to go.
          </p>

          <div style={{ marginBottom: '48px' }}>
            <CodeBlock language='jsx'>{`//main.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./HomePage";
import Project from "./Project";
import { ThemeProvider } from "@aditya030/aura-lume1";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Your routes here */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;`}</CodeBlock>
          </div>
          
          <p style={{
            color: isDarkMode ? '#94a3b8' : '#475569',
            marginBottom: '24px',
            fontSize: '17px',
            lineHeight: '1.8'
          }}>
            Create a{' '}
            <code style={{
              padding: '4px 10px',
              fontSize: '16px',
              fontFamily: 'ui-monospace, monospace',
              backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              color: 'green',
              borderRadius: '6px',
              fontWeight: '600'
            }}>ThemeSwitcher</code>{' '}
            component with a simple toggle button that switches between light and dark modes effortlessly.
          </p>

          <div style={{ marginBottom: '56px' }}>
            <CodeBlock language='jsx'>
              {`
import { useTheme } from "@aditya030/aura-lume1";
import React, { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const { theme, themeName, setThemeName } = useTheme();

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setThemeName(themeName === "light" ? "dark" : "light");
  };

  const buttonStyle = {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: theme.buttonBg,
    color: theme.buttonText,
    transition: "all 0.3s ease",
  };

  return (
    <nav
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(10px)",
      }}
    >
        {/* Theme toggle button */}
        <button onClick={toggleTheme} style={buttonStyle}>
          {themeName === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>
    </nav>
  );
};

export default ThemeSwitcher;
`}
            </CodeBlock>
          </div>

          <p style={{
            color: isDarkMode ? '#94a3b8' : '#475569',
            marginBottom: '24px',
            fontSize: '17px',
            lineHeight: '1.8'
          }}>
            Don't forget to include the base styles! Add the following{' '}
            <code style={{
              padding: '4px 10px',
              fontSize: '16px',
              fontFamily: 'ui-monospace, monospace',
              backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              color: isDarkMode ? '#fbbf24' : '#f59e0b',
              borderRadius: '6px',
              fontWeight: '600'
            }}>index.css</code>{' '}
            file to ensure smooth scrollbar styling and proper theme integration.
          </p>

          <div style={{ marginBottom: '48px' }}>
            <CodeBlock language='css'>{`//index.css

@import '@ui/aura-lume1.css';

 .react-select__menu-list::-webkit-scrollbar {
   width: 10px;
 }
 .react-select__menu-list::-webkit-scrollbar-track {
   background: var(--scrollbar-track);
 }
 .react-select__menu-list::-webkit-scrollbar-thumb {
   background: var(--scrollbar-thumb);
   border-radius: 10px;
 }
`}</CodeBlock>
          </div>


          <h2 style={{
            fontSize: '42px',
            fontWeight: '800',
            color: isDarkMode ? '#f1f5f9' : '#0f172a',
            marginBottom: '16px',
            position: 'relative',
            paddingLeft: '1.5rem',
            marginTop: '64px',
            lineHeight: '1.2',
            letterSpacing: '-0.02em'
          }}>
            <div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '6px',
              height: '3.5rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '3px',
              boxShadow: '0 4px 14px rgba(102, 126, 234, 0.5)'
            }}></div>
            See It In Action
          </h2>

          <p style={{
            color: isDarkMode ? '#94a3b8' : '#475569',
            marginBottom: '32px',
            fontSize: '18px',
            lineHeight: '1.8',
            paddingLeft: '1.5rem'
          }}>
            Watch your theme come alive with this complete example. Add this code to your{' '}
            <code style={{
              padding: '4px 10px',
              fontSize: '16px',
              fontFamily: 'ui-monospace, monospace',
              backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              color: '#385dba',
              borderRadius: '6px',
              fontWeight: '600'
            }}>App.jsx</code>{' '}
            and experience seamless theme transitions throughout your entire application.
          </p>

          <div style={{ marginBottom: '32px' }}>
            <CodeBlock language="jsx">
              {`
import { useTheme } from "@aditya030/aura-lume1";
import React from "react";

const App = () => {
  const { theme, themeName } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        transition: "all 0.3s ease",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: '2rem'}}>Welcome to Home Page</h1>
      <p style={{ margin: '2rem'}}>
        Current Theme: <strong>{themeName}</strong>
      </p>


      {/* Example Div with theme.divBg and theme.divText */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          width: "80%",
          maxWidth: "400px",
          backgroundColor: theme.divBg,
          color: theme.divText,
          borderRadius: "12px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: theme.h2 }}>This is a themed div</h2>
        <p>The colors of this div change with the theme!</p>
      </div>

      <div style={{ maxWidth: "600px", textAlign: 'justify' , margin: '2rem'}}>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
          aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
          imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
          mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
          semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
          porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante,
          dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla
          ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam
          ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam
          eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum
          rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed
          ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id,
          lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae
          sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet
          orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit
          amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget
          bibendum sodales, augue velit cursus nunc,
        </p>
      </div>
    </div>
  );
};

export default App;
`}
            </CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NormalTheming;