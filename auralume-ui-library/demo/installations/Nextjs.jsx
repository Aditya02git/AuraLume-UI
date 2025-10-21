import React, { useEffect, useState } from 'react';
import CodeBlock from '../../src/components/CodeBlock';


const Nextjs = () => {
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
            color: isDarkMode? '#6b7280' : '#4b5563',
            fontSize: '18px',
            lineHeight: '1.75',
            marginBottom: '32px'
          }}>
            Install and configure auralume/ui for Next.js.
          </p>

          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: isDarkMode? 'white' : 'black',
            marginBottom: '24px',
            position: 'relative',
            paddingLeft: '1rem',
          }}><div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
            Create project
          </h2>
          
          <p style={{
            color: isDarkMode ? '#6b7280' : '#374151',
            marginBottom: '24px'
          }}>
            Run the <code style={{
              padding: '2px 8px',
              fontSize: '14px',
              fontFamily: 'monospace',
              color: 'red'
            }}>init</code> command to create a new Next.js project or to setup an existing one:
          </p>

          <div style={{ marginBottom: '32px' }}>
            <CodeBlock language='pnpm'>bunx --bun aura-lume@latest init</CodeBlock>
          </div>
          <div style={{ marginBottom: '32px' }}>
            <CodeBlock language='npm'>npx aura-lume@latest init</CodeBlock>
          </div>
          <div style={{ marginBottom: '32px' }}>
            <CodeBlock language='yarn'>yarn aura-lume@latest init</CodeBlock>
          </div>
          <div style={{ marginBottom: '32px' }}>
            <CodeBlock language='bun'>bunx --bun aura-lume@latest init</CodeBlock>
          </div>

          <p style={{
            color: isDarkMode ? '#6b7280' : '#374151',
            marginBottom: '32px'
          }}>
            Choose between a Next.js project or a Monorepo.
          </p>

          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: isDarkMode ? 'white' : 'black',
            marginBottom: '24px',
            position: 'relative',
            paddingLeft: '1rem',
          }}><div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
            Update next.config.mjs
          </h2>

          <div style={{ marginBottom: '32px' }}>
            <CodeBlock language='mjs'>
              {`import path from "path";
import { fileURLToPath } from "url";

// Define __dirname manually since it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@ui"] = path.resolve(
      __dirname,
      "node_modules/aura-lume/dist"
    );
    return config;
  },
};

export default nextConfig;
`}
            </CodeBlock>
          </div>


          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: isDarkMode ? 'white' : 'black',
            marginBottom: '24px',
            position: 'relative',
            paddingLeft: '1rem',
          }}><div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
            Add This In layout.tsx/layout.js
          </h2>

          <div style={{ marginBottom: '32px' }}>
            <CodeBlock language='css'>
              {`@import '@ui/aura-lume1.css';`}
            </CodeBlock>
          </div>

          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: isDarkMode ? 'white' : 'black',
            marginBottom: '24px',
            position: 'relative',
            paddingLeft: '1rem',
          }}><div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
            Add Components
          </h2>

          <p style={{
            color: isDarkMode ? '#6b7280' : '#374151',
            marginBottom: '24px'
          }}>
            In the page.tsx/page.js add the <code style={{
              padding: '2px 8px',
              fontSize: '14px',
              fontFamily: 'monospace',
              color: 'red'
            }}>Button</code> component to your project. You can then import it like this:
          </p>

          <div style={{ marginBottom: '32px' }}>
            <CodeBlock language="tsx">
              {`"use client";

import { Button } from "aura-lume";

export default function HomePage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      <h1 style={{ marginBottom: 20 }}>Next.js + Aura Lume </h1>
      <Button variant="primary" onClick={() => alert("Primary clicked!")}>
        Primary Button
      </Button>
    </main>
  );
}`}
            </CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nextjs;