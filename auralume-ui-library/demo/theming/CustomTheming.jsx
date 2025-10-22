import React, { useEffect, useState } from 'react';
import CodeBlock from '../../src/components/CodeBlock';


const CustomTheming = ({isDarkMode, setIsDarkMode}) => {

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
            Transform your application's appearance with personalized themes. Begin by creating a{' '}
            <code style={{
              padding: '4px 10px',
              fontSize: '16px',
              fontFamily: 'ui-monospace, monospace',
              backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              color: 'green',
              borderRadius: '6px',
              fontWeight: '600'
            }}>myThemes.js</code>{' '}
            file where you'll define your custom style configurations.
          </p>

          <div style={{ marginBottom: '48px' }}>
            <CodeBlock language='javascript'>
              {`// src/myThemes.js

const customThemes = {
  customTheme1: {
    background: "#000000",
    text: "#eee",
    buttonBg: "#16213e",
    buttonText: "#fff",
    divBg: "#0f3460",
    divText: "#eee",
    h1: "#e94560",
    h2: "#e94560",
    h3: "#e94560",
    progress: "#e94560",
    svgColor: "#eee",
    scrollbar: { track: "#1a1a2e", thumb: "#e94560" },
  },

  customTheme2: {
    background: "#006994",
    text: "#ffffff",
    buttonBg: "#00a8cc",
    buttonText: "#ffffff",
    divBg: "#005082",
    divText: "#ffffff",
    h1: "#00d9ff",
    h2: "#00d9ff",
    h3: "#00d9ff",
    progress: "#00d9ff",
    svgColor: "#ffffff",
    scrollbar: { track: "#006994", thumb: "#00d9ff" },
  },
};

export default customThemes;
`}
            </CodeBlock>
          </div>
          
          <p style={{
            color: isDarkMode ? '#94a3b8' : '#475569',
            marginBottom: '24px',
            fontSize: '17px',
            lineHeight: '1.8'
          }}>
            Next, integrate your custom themes into your application by wrapping your routes with the ThemeProvider in your main entry file{' '}
            <code style={{
              padding: '4px 10px',
              fontSize: '16px',
              fontFamily: 'ui-monospace, monospace',
              backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              color: '#385dba',
              borderRadius: '6px',
              fontWeight: '600'
            }}>main.jsx</code>.
          </p>

          <div style={{ marginBottom: '48px' }}>
            <CodeBlock language='jsx'>{`//main.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./HomePage";
import Project from "./Project";
import { ThemeProvider } from "@aditya030/aura-lume1";
import customThemes from "./myThemes";

function App() {
  return (
    <ThemeProvider customThemes={customThemes}>
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
            Add a 
            <code style={{
              padding: '4px 10px',
              fontSize: '16px',
              fontFamily: 'ui-monospace, monospace',
              backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              color: isDarkMode ? '#fbbf24' : '#f59e0b',
              borderRadius: '6px',
              fontWeight: '600'
            }}>index.css</code> file.
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
              color: '#385dba',
              borderRadius: '6px',
              fontWeight: '600'
            }}>ThemeSwitcher</code>{' '}
            component to enable seamless switching between your custom themes with an elegant dropdown interface.
          </p>

          <div style={{ marginBottom: '56px' }}>
            <CodeBlock language='jsx'>
              {`
import { useTheme } from "@aditya030/aura-lume1";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const ThemeSwitcher = () => {
  const { theme, themeName, setThemeName } = useTheme();

  // Filter to show only custom themes
  const customThemeNames = ['customTheme1', 'customTheme2'];
  
  const options = customThemeNames.map((key) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(),
  }));

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        transition: "all 0.3s ease",
        padding: "20px",
        textAlign: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(10px)",
        boxShadow: isScrolled
          ? "0 4px 12px rgba(0, 0, 0, 0.15)"
          : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "15px",
        }}
      >
        {/* Custom Themes */}
        <Select
          value={options.find((opt) => opt.value === themeName)}
          onChange={(selected) => setThemeName(selected.value)}
          options={options}
          menuPlacement="auto"
          isSearchable={false}
          placeholder="Select Theme"
          classNamePrefix="react-select"
          styles={{
            control: (base, state) => ({
              ...base,
              backgroundColor: theme.buttonBg,
              color: theme.buttonText,
              border: "none",
              padding: "0.5px 5px",
              borderRadius: "8px",
              minWidth: "150px",
              boxShadow: state.isFocused ? "0 0 0 2px #aaa" : "none",
              cursor: "pointer",
            }),
            singleValue: (base) => ({
              ...base,
              color: theme.buttonText,
            }),
            placeholder: (base) => ({
              ...base,
              color: theme.buttonText,
              opacity: 0.7,
            }),
            option: (base, state) => ({
              ...base,
              backgroundColor: state.isFocused
                ? theme.buttonBg
                : theme.background,
              color: theme.text,
              cursor: "pointer",
              "&:active": {
                backgroundColor: theme.buttonBg,
              },
            }),
            menu: (base) => ({
              ...base,
              backgroundColor: theme.background,
              color: theme.text,
              border: \`1px solid \${theme.buttonBg}\`,
            }),
            menuList: (base) => ({
              ...base,
              backgroundColor: theme.background,
              color: theme.text,
              padding: 0,
            }),
            indicatorSeparator: () => ({
              display: "none",
            }),
            dropdownIndicator: (base) => ({
              ...base,
              color: theme.buttonText,
              cursor: "pointer",
              "&:hover": {
                color: theme.buttonText,
              },
            }),
          }}
        />
      </div>
    </div>
  );
};

export default ThemeSwitcher;`}
            </CodeBlock>
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
            Test your custom themes with this complete example. Add the following code to your{' '}
            <code style={{
              padding: '4px 10px',
              fontSize: '16px',
              fontFamily: 'ui-monospace, monospace',
              backgroundColor: isDarkMode ? '#1e293b' : '#e2e8f0',
              color: '#385dba',
              borderRadius: '6px',
              fontWeight: '600'
            }}>App.jsx</code>{' '}
            to see how theme values are applied throughout your components.
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

export default CustomTheming;