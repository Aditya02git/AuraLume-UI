// ThemeProvider.jsx
import React, { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import { themes } from "../themes/themes";

const injectBaseStyles = () => {
  if (document.getElementById('ui-library-theme-base')) return;
  
  const style = document.createElement('style');
  style.id = 'ui-library-theme-base';
  style.textContent = `
    :root {
      --bg-color: #ffffff;
      --text-color: #000000;
      --button-bg: #e0e0e0;
      --button-text: #000000;
      --div-bg: #f5f5f5;
      --div-text: #000000;
      --h1-color: #111111;
      --h2-color: #222222;
      --h3-color: #333333;
      --svg-color: #000000;
      --scrollbar-track: #f1f1f1;
      --scrollbar-thumb: #888888;
    }
    
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
      transition: background-color 0.3s ease, color 0.3s ease;
    }
    
    body::-webkit-scrollbar { width: 10px; }
    body::-webkit-scrollbar-track { background: var(--scrollbar-track); }
    body::-webkit-scrollbar-thumb { background: var(--scrollbar-thumb); border-radius: 10px; }
  `;
  document.head.appendChild(style);
};

export const ThemeProvider = ({ children, customThemes = {}, defaultTheme = "light" }) => {
  // Merge built-in themes with custom themes
  const allThemes = { ...themes, ...customThemes };
  
  const [themeName, setThemeName] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      // Check if saved theme exists in allThemes, otherwise use defaultTheme
      if (saved && allThemes[saved]) {
        return saved;
      }
      return defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const theme = allThemes[themeName] || allThemes[defaultTheme] || themes.light;

  useEffect(() => {
    injectBaseStyles();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("theme", themeName);
    } catch {
      // localStorage not available
    }

    // Update CSS variables for theme colors
    document.documentElement.style.setProperty("--bg-color", theme.background);
    document.documentElement.style.setProperty("--text-color", theme.text);
    document.documentElement.style.setProperty("--button-bg", theme.buttonBg);
    document.documentElement.style.setProperty("--button-text", theme.buttonText);
    document.documentElement.style.setProperty("--div-bg", theme.divBg || theme.background);
    document.documentElement.style.setProperty("--div-text", theme.divText || theme.text);
    document.documentElement.style.setProperty("--h1-color", theme.h1 || theme.text);
    document.documentElement.style.setProperty("--h2-color", theme.h2 || theme.text);
    document.documentElement.style.setProperty("--h3-color", theme.h3 || theme.text);
    document.documentElement.style.setProperty("--svg-color", theme.svgColor || theme.text);
    document.documentElement.style.setProperty(
      "--scrollbar-track",
      theme.scrollbar?.track || "#f1f1f1"
    );
    document.documentElement.style.setProperty(
      "--scrollbar-thumb",
      theme.scrollbar?.thumb || "#888"
    );
  }, [themeName, theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName, allThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};