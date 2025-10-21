import React, { useState, useEffect } from "react";
import InfiniteScroller from "../../src/components/InfiniteScroller";

// Preview Toggle Component
const PreviewToggle = ({ activeTab, onTabChange }) => {
  const tabs = ["Preview", "TSX/JSX"];
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
    <div
      style={{
        display: "flex",
        gap: "4px",
        backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
        padding: "4px",
        borderRadius: "8px",
        marginBottom: "16px",
        width: "fit-content",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: activeTab === tab ? "#e33de0" : "transparent",
            color: activeTab === tab ? "white" : "#64748b",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
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
    <div
      style={{
        position: "relative",
        backgroundColor: "#1e293b",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          backgroundColor: "#334155",
          borderBottom: "1px solid #475569",
        }}
      >
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
            padding: "6px 12px",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "12px",
            cursor: "pointer",
            transition: "all 0.2s ease",
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
      <pre
        style={{
          padding: "16px",
          margin: 0,
          color: "#e2e8f0",
          fontSize: "14px",
          lineHeight: "1.5",
          overflow: "auto",
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Button Section with Preview Toggle
const ButtonSectionWithPreview = ({
  title,
  children,
  htmlCode,
  jsxCode,
  isDarkMode = false,
}) => {
  const [activeTab, setActiveTab] = useState("Preview");

  return (
    <section
      style={{ marginBottom: "4rem", width: "100%", maxWidth: "1200px" }}
    >
      <h2
        style={{
          marginBottom: "2rem",
          color: isDarkMode ? "#ffffff" : "#000000",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {title}
      </h2>

      <PreviewToggle activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "Preview" && (
        <div
          style={{
            padding: "32px",
            backgroundColor: isDarkMode ? "#1e293b" : "#f8fafc",
            borderRadius: "12px",
            border: `1px solid ${isDarkMode ? "#334155" : "#e2e8f0"}`,
            transition: "all 0.3s ease",
            width: "100%",
            maxWidth: "100%",
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      )}

      {activeTab === "TSX/JSX" && <CodeDisplay code={jsxCode} language="TSX/JSX" />}
    </section>
  );
};

const InfiniteScrollerSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) {
      setIsDarkMode(JSON.parse(saved));
    }
  }, []);

  // Optional: Custom tag rows for type-2
  const customTagRows = [
    [
      { id: 1, text: 'JavaScript' },
      { id: 2, text: 'webdev' },
      { id: 3, text: 'TypeScript' },
      { id: 4, text: 'Next.js' },
      { id: 5, text: 'UI/UX' }
    ],
    [
      { id: 6, text: 'webdev' },
      { id: 7, text: 'Gatsby' },
      { id: 8, text: 'JavaScript' },
      { id: 9, text: 'Tailwind' },
      { id: 10, text: 'TypeScript' }
    ],
    [
      { id: 11, text: 'animation' },
      { id: 12, text: 'Tailwind' },
      { id: 13, text: 'React' },
      { id: 14, text: 'SVG' },
      { id: 15, text: 'HTML' }
    ],
    [
      { id: 16, text: 'Gatsby' },
      { id: 17, text: 'HTML' },
      { id: 18, text: 'CSS' },
      { id: 19, text: 'React' },
      { id: 20, text: 'Next.js' }
    ],
    [
      { id: 21, text: 'Next.js' },
      { id: 22, text: 'React' },
      { id: 23, text: 'webdev' },
      { id: 24, text: 'TypeScript' },
      { id: 25, text: 'Gatsby' }
    ]
  ];

  // Custom items for type-3 (text scroll)
  const customScrollText = [
    { id: 1, text: "Welcome" },
    { id: 2, text: "to" },
    { id: 3, text: "our" },
    { id: 4, text: "amazing" },
    { id: 5, text: "website" },
    { id: 6, text: "!" },
  ];

  // Custom items for type-3 (image scroll)
  const customScrollImages = [
    { id: 1, src: 'https://images.pexels.com/photos/2887710/pexels-photo-2887710.jpeg', alt: 'Image 1' },
    { id: 2, src: 'https://images.pexels.com/photos/2887720/pexels-photo-2887720.jpeg', alt: 'Image 2' },
    { id: 3, src: 'https://images.pexels.com/photos/2887721/pexels-photo-2887721.jpeg', alt: 'Image 3' },
    { id: 4, src: 'https://images.pexels.com/photos/2887722/pexels-photo-2887722.jpeg', alt: 'Image 4' },
    { id: 5, src: 'https://images.pexels.com/photos/2887723/pexels-photo-2887723.jpeg', alt: 'Image 5' },
    { id: 6, src: 'https://images.pexels.com/photos/2887724/pexels-photo-2887724.jpeg', alt: 'Image 6' }
  ];

  const handleSlideClick = (item, index) => {
    console.log("Clicked slide:", item, "at index:", index);
  };

  const handleTagClick = (tag, position) => {
    console.log("Clicked tag:", tag, "at position:", position);
  };

  const handleScrollClick = (item, index) => {
    console.log("Clicked horizontal scroll item:", item, "at index:", index);
  };

  const type1JsxCode = `
  const customScrollImages = [
    { id: 1, src: 'https://images.pexels.com/photos/2887710/pexels-photo-2887710.jpeg', alt: 'Image 1' },
    { id: 2, src: 'https://images.pexels.com/photos/2887720/pexels-photo-2887720.jpeg', alt: 'Image 2' },
    { id: 3, src: 'https://images.pexels.com/photos/2887721/pexels-photo-2887721.jpeg', alt: 'Image 3' },
    { id: 4, src: 'https://images.pexels.com/photos/2887722/pexels-photo-2887722.jpeg', alt: 'Image 4' },
    { id: 5, src: 'https://images.pexels.com/photos/2887723/pexels-photo-2887723.jpeg', alt: 'Image 5' },
    { id: 6, src: 'https://images.pexels.com/photos/2887724/pexels-photo-2887724.jpeg', alt: 'Image 6' }
  ];
  <div
    style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center", 
      alignItems: "center", 
      overflow: "hidden",
      position: "relative",
    }}
  >
    <InfiniteScroller type="type-1" items={customScrollImages} />
  </div>
`;

  const type2JsxCode = `
  const customTagRows = [
    [
      { id: 1, text: 'JavaScript' },
      { id: 2, text: 'webdev' },
      { id: 3, text: 'TypeScript' },
      { id: 4, text: 'Next.js' },
      { id: 5, text: 'UI/UX' }
    ],
    [
      { id: 6, text: 'webdev' },
      { id: 7, text: 'Gatsby' },
      { id: 8, text: 'JavaScript' },
      { id: 9, text: 'Tailwind' },
      { id: 10, text: 'TypeScript' }
    ],
    [
      { id: 11, text: 'animation' },
      { id: 12, text: 'Tailwind' },
      { id: 13, text: 'React' },
      { id: 14, text: 'SVG' },
      { id: 15, text: 'HTML' }
    ],
    [
      { id: 16, text: 'Gatsby' },
      { id: 17, text: 'HTML' },
      { id: 18, text: 'CSS' },
      { id: 19, text: 'React' },
      { id: 20, text: 'Next.js' }
    ],
    [
      { id: 21, text: 'Next.js' },
      { id: 22, text: 'React' },
      { id: 23, text: 'webdev' },
      { id: 24, text: 'TypeScript' },
      { id: 25, text: 'Gatsby' }
    ]
  ];
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
      background: isDarkMode ? "#1e293b" : "#f8fafc",
      padding: "2rem",
      borderRadius: "1rem",
      "--btn-color": isDarkMode ? "#364a71" : "#f8fafc",
      "--btn-text-color": isDarkMode ? "#ffffff" : "#000000",
      "--btn-hover-color": isDarkMode ? "#475569" : "#e7e7e7ff"
      }}
    >
      <InfiniteScroller
        type="type-2"
        items= {customTagRows}
        backgroundColor= {isDarkMode ? "#1e293b" : "#f8fafc"}
        onSlideClick={handleTagClick}
        rows={5}
        tagPrefix="#"
      />
    </div>
  </div>`;

  const type3JsxCode = `
  const customScrollText = [
    { id: 1, text: "Welcome" },
    { id: 2, text: "to" },
    { id: 3, text: "our" },
    { id: 4, text: "amazing" },
    { id: 5, text: "website" },
    { id: 6, text: "!" },
  ];
  <div
    style={{
      background: isDarkMode ? "#1e293b" : "#f8fafc",
      padding: "2rem",
      borderRadius: "1rem",
      "--btn-color": isDarkMode ? "#364a71" : "#f8fafc",
      "--btn-text-color": isDarkMode ? "#ffffff" : "#000000"            
    }}
  >
    <InfiniteScroller
      type="type-3"
      direction="left"
      speed="fast"
      items={customScrollText}
      backgroundColor="transparent"
      onSlideClick={handleScrollClick}
    />
  </div>`;

  const multipleType3JsxCode = `
  const customScrollText = [
    { id: 1, text: "Welcome" },
    { id: 2, text: "to" },
    { id: 3, text: "our" },
    { id: 4, text: "amazing" },
    { id: 5, text: "website" },
    { id: 6, text: "!" },
  ];
  const customScrollImages = [
    { id: 1, src: 'https://images.pexels.com/photos/2887710/pexels-photo-2887710.jpeg', alt: 'Image 1' },
    { id: 2, src: 'https://images.pexels.com/photos/2887720/pexels-photo-2887720.jpeg', alt: 'Image 2' },
    { id: 3, src: 'https://images.pexels.com/photos/2887721/pexels-photo-2887721.jpeg', alt: 'Image 3' },
    { id: 4, src: 'https://images.pexels.com/photos/2887722/pexels-photo-2887722.jpeg', alt: 'Image 4' },
    { id: 5, src: 'https://images.pexels.com/photos/2887723/pexels-photo-2887723.jpeg', alt: 'Image 5' },
    { id: 6, src: 'https://images.pexels.com/photos/2887724/pexels-photo-2887724.jpeg', alt: 'Image 6' }
  ];
  <div
    style={{
      background: isDarkMode ? "#1e293b" : "#f8fafc",
      padding: "2rem",
      borderRadius: "1rem",
      "--btn-color": isDarkMode ? "#364a71" : "#f8fafc",
      "--btn-text-color": isDarkMode ? "#ffffff" : "#000000"
    }}
  >
    <InfiniteScroller
      type="type-3"
      items={customScrollText}
      direction="left"
      speed="fast"
      backgroundColor="transparent"
      onSlideClick={handleScrollClick}
    />
    <InfiniteScroller
      type="type-3"
      items={customScrollImages}
      direction="right"
      speed="slow"
      backgroundColor="transparent"
      onSlideClick={handleScrollClick}
    />
    <InfiniteScroller
      type="type-3"
      items={customScrollText}
      direction="left"
      speed="medium"
      backgroundColor="transparent"
      onSlideClick={handleScrollClick}
    />
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
              { prop: "items", type: "array", default: "[]", desc: "Items to render inside the scroller" },
              { prop: "type", type: "string", default: "'type-1'", desc: "Layout type of the scroller ('type-1', 'type-2', 'type-3')" },
              { prop: "slideWidth", type: "string", default: "'clamp(150px, 20vw, 300px)'", desc: "Width of each slide (CSS unit)" },
              { prop: "animationDuration", type: "string", default: "'8s'", desc: "Duration of the slide animation" },
              { prop: "backgroundColor", type: "string", default: "'#120020'", desc: "Background color of the scroller" },
              { prop: "className", type: "string", default: "''", desc: "Additional custom class names" },
              { prop: "onSlideClick", type: "function", default: "null", desc: "Callback when a slide is clicked" },
              { prop: "rows", type: "number", default: "5", desc: "Number of rows to display" },
              { prop: "tagPrefix", type: "string", default: "'#'", desc: "Prefix before tag labels" },
              { prop: "direction", type: "string", default: "'left'", desc: "Scrolling direction ('left' or 'right')" },
              { prop: "speed", type: "string", default: "'medium'", desc: "Scroll speed ('slow', 'medium', 'fast')" },
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

      {/* Type-1: Image Scroller */}
      <ButtonSectionWithPreview
        title="Image Scroller"
        jsxCode={type1JsxCode}
        isDarkMode={isDarkMode}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <InfiniteScroller type="type-1" items={customScrollImages} onSlideClick={handleSlideClick} />
        </div>
      </ButtonSectionWithPreview>

      {/* Type-2: Tag Scroller */}
      <ButtonSectionWithPreview
        title="Tag Scroller"
        jsxCode={type2JsxCode}
        isDarkMode={isDarkMode}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
            background: isDarkMode ? "#1e293b" : "#f8fafc",
            padding: "2rem",
            borderRadius: "1rem",
            "--btn-color": isDarkMode ? "#364a71" : "#f8fafc",
            "--btn-text-color": isDarkMode ? "#ffffff" : "#000000",
            "--btn-hover-color": isDarkMode ? "#475569" : "#e7e7e7ff"
            }}
          >
            <InfiniteScroller
              type="type-2"
              items= {customTagRows}
              backgroundColor= {isDarkMode ? "#1e293b" : "#f8fafc"}
              onSlideClick={handleTagClick}
              rows={5}
              tagPrefix="#"
            />
          </div>
        </div>
      </ButtonSectionWithPreview>

      {/* Type-3: Horizontal Scroller (Single) */}
      <ButtonSectionWithPreview
        title="Horizontal Text Scroller"
        jsxCode={type3JsxCode}
        isDarkMode={isDarkMode}
      >
        <div
          style={{
            background: isDarkMode ? "#1e293b" : "#f8fafc",
            padding: "2rem",
            borderRadius: "1rem",
            "--btn-color": isDarkMode ? "#364a71" : "#f8fafc",
            "--btn-text-color": isDarkMode ? "#ffffff" : "#000000"            
          }}
        >
          <InfiniteScroller
            type="type-3"
            direction="left"
            speed="fast"
            items={customScrollText}
            backgroundColor="transparent"
            onSlideClick={handleScrollClick}
          />
        </div>
      </ButtonSectionWithPreview>

      {/* Type-3: Multiple Horizontal Scrollers */}
      <ButtonSectionWithPreview
        title="Multiple Horizontal Scrollers"
        jsxCode={multipleType3JsxCode}
        isDarkMode={isDarkMode}
      >
        <div
          style={{
            background: isDarkMode ? "#1e293b" : "#f8fafc",
            padding: "2rem",
            borderRadius: "1rem",
            "--btn-color": isDarkMode ? "#364a71" : "#f8fafc",
            "--btn-text-color": isDarkMode ? "#ffffff" : "#000000"
          }}
        >
          <InfiniteScroller
            type="type-3"
            items={customScrollText}
            direction="left"
            speed="fast"
            backgroundColor="transparent"
            onSlideClick={handleScrollClick}
            

          />
          <InfiniteScroller
            type="type-3"
            items={customScrollImages}
            direction="right"
            speed="slow"
            backgroundColor="transparent"
            onSlideClick={handleScrollClick}
          />
          <InfiniteScroller
            type="type-3"
            items={customScrollText}
            direction="left"
            speed="medium"
            backgroundColor="transparent"
            onSlideClick={handleScrollClick}
          />
        </div>
      </ButtonSectionWithPreview>
    </div>
  );
};

export default InfiniteScrollerSection;
