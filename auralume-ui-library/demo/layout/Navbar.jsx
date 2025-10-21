import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../src";
import StarEffect from "../../src/components/StarEffect";
import SearchBar from "../../src/components/SearchBar";
import ToggleButton from "../../src/components/ThemeButton";

const Navbar = ({ isDarkMode, setIsDarkMode, sidebarOpen }) => {
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // Define all searchable components with their routes
  const searchableComponents = [
    // Docs
    { name: "Introduction", route: "/docs/introduction", category: "Docs" },
    { name: "Installation", route: "/docs/installation", category: "Docs" },
    { name: "Next Js Installation", route: "/docs/nextjs", category: "Docs" },
    { name: "Vite Installation", route: "/docs/vite", category: "Docs" },

    // Components
    {
      name: "Accordion",
      route: "/components/accordions",
      category: "Components",
    },
    {
      name: "Activity Grid",
      route: "/components/activityGrids",
      category: "Components",
    },
    {
      name: "Alert Dialog",
      route: "/components/alertDialogs",
      category: "Components",
    },
    { name: "Avatar", route: "/components/avatars", category: "Components" },
    {
      name: "Animated Card",
      route: "/components/animatedCards",
      category: "Components",
    },
    {
      name: "Animated Border Button",
      route: "/components/animatedBorderButtons",
      category: "Components",
    },
    {
      name: "Authentication",
      route: "/components/auths",
      category: "Components",
    },
    { name: "Badge", route: "/components/badges", category: "Components" },
    {
      name: "Breadcrumb",
      route: "/components/breadcrumbs",
      category: "Components",
    },
    { name: "Button", route: "/components/buttons", category: "Components" },
    {
      name: "Calendar",
      route: "/components/calendars",
      category: "Components",
    },
    { name: "Card", route: "/components/cards", category: "Components" },
    {
      name: "Cardscape",
      route: "/components/cardscapes",
      category: "Components",
    },
    {
      name: "Carousel",
      route: "/components/carousels",
      category: "Components",
    },
    {
      name: "Chat Box",
      route: "/components/chatBoxes",
      category: "Components",
    },
    { name: "Chart", route: "/components/charts", category: "Components" },
    {
      name: "Checkbox",
      route: "/components/checkboxes",
      category: "Components",
    },
    {
      name: "Code Block",
      route: "/components/codeblocks",
      category: "Components",
    },
    {
      name: "Context Menu",
      route: "/components/contextMenus",
      category: "Components",
    },
    {
      name: "Confetti Button",
      route: "/components/confettiButtons",
      category: "Components",
    },
    {
      name: "Cosmic Card",
      route: "/components/cosmicCards",
      category: "Components",
    },
    {
      name: "Counter Animation",
      route: "/components/counters",
      category: "Components",
    },
    {
      name: "Data Table",
      route: "/components/dataTables",
      category: "Components",
    },
    {
      name: "Dropdown Menu",
      route: "/components/drawers",
      category: "Components",
    },
    { name: "Dialog", route: "/components/dialogs", category: "Components" },
    {
      name: "Endless Reviews",
      route: "/components/endlessReviews",
      category: "Components",
    },
    { name: "Fab Icon", route: "/components/fabIcons", category: "Components" },
    {
      name: "Fluid Button",
      route: "/components/fluidButtons",
      category: "Components",
    },
    { name: "Footer", route: "/components/footers", category: "Components" },
    { name: "Focus Card", route: "/components/focusCards", category: "Components" },
    {
      name: "Glow Button",
      route: "/components/glowButtons",
      category: "Components",
    },
    {
      name: "Gradient Text",
      route: "/components/gradientTexts",
      category: "Components",
    },
    {
      name: "Infinite Gallery",
      route: "/components/infiniteGallery",
      category: "Components",
    },
    {
      name: "Infinite Scroller",
      route: "/components/infiniteScrollers",
      category: "Components",
    },
    {
      name: "Input OTP",
      route: "/components/inputotps",
      category: "Components",
    },
    { name: "Input", route: "/components/inputs", category: "Components" },
    { name: "Link Preview", route: "/components/linkPreviews", category: "Components" },
    { name: "Lume Button", route: "/components/lumeButtons", category: "Components" },
    {
      name: "Navigation Menu",
      route: "/components/navigationMenus",
      category: "Components",
    },
    {
      name: "Pagination",
      route: "/components/paginations",
      category: "Components",
    },
    {
      name: "Pricing Card",
      route: "/components/pricingCards",
      category: "Components",
    },
    {
      name: "Progress Bar",
      route: "/components/progressBars",
      category: "Components",
    },
    {
      name: "Radar Chart",
      route: "/components/radarCharts",
      category: "Components",
    },
    {
      name: "Radio Group",
      route: "/components/radioGroups",
      category: "Components",
    },
    {
      name: "React Hook Form",
      route: "/components/reactHookForms",
      category: "Components",
    },
    {
      name: "Resizable",
      route: "/components/resizables",
      category: "Components",
    },
    { name: "Road Map", route: "/components/roadmaps", category: "Components" },
    {
      name: "Search Bar",
      route: "/components/searchbars",
      category: "Components",
    },
    {
      name: "Shader Wave Text",
      route: "/components/shaderWaveTexts",
      category: "Components",
    },
    {
      name: "Text Shine Animation",
      route: "/components/shinetexts",
      category: "Components",
    },
    { name: "Sidebar", route: "/components/sidebars", category: "Components" },
    {
      name: "Skillbar",
      route: "/components/skillbars",
      category: "Components",
    },
    {
      name: "Skeleton",
      route: "/components/skeletons",
      category: "Components",
    },
    { name: "Slider", route: "/components/sliders", category: "Components" },
    {
      name: "Spotlight Card",
      route: "/components/spotlightCards",
      category: "Components",
    },
    { name: "Switch", route: "/components/switches", category: "Components" },
    { name: "Tabs", route: "/components/tabs", category: "Components" },
    {
      name: "Testimonial",
      route: "/components/testimonials",
      category: "Components",
    },
    {
      name: "Text Area",
      route: "/components/textAreas",
      category: "Components",
    },
    {
      name: "Text Masks",
      route: "/components/textMasks",
      category: "Components",
    },
    {
      name: "3D Card",
      route: "/components/threeDCards",
      category: "Components",
    },
    {
      name: "Timeline",
      route: "/components/timelines",
      category: "Components",
    },
    { name: "Toast", route: "/components/toasts", category: "Components" },
    {
      name: "Theme Button",
      route: "/components/themeButtons",
      category: "Components",
    },
    {
      name: "Toggle Group",
      route: "/components/toggleGroups",
      category: "Components",
    },
    { name: "Tooltip", route: "/components/tooltips", category: "Components" },
    { name: "Tree", route: "/components/trees", category: "Components" },
    {
      name: "Trie Search",
      route: "/components/trieSearches",
      category: "Components",
    },
    {
      name: "Typography",
      route: "/components/typographies",
      category: "Components",
    },

    // Background
    { name: "Gradient Background", route: "/background/gradientBackgrounds", category: "Background" },
    {
      name: "Spotlight Background",
      route: "/background/spotlightBackgrounds",
      category: "Background",
    },
    {
      name: "Matrix Background",
      route: "/background/matrixBackgrounds",
      category: "Background",
    },
    {
      name: "Aurora Background",
      route: "/background/auroraBackgrounds",
      category: "Background",
    },
    {
      name: "Cosmic Background",
      route: "/background/cosmicBackgrounds",
      category: "Background",
    },
    {
      name: "Halo Background",
      route: "/background/haloBackgrounds",
      category: "Background",
    },
    {
      name: "Glassmorphic Background",
      route: "/background/glassmorphicBackgrounds",
      category: "Background",
    },
    {
      name: "Noise Background",
      route: "/background/noiseBackgrounds",
      category: "Background",
    },
    {
      name: "Solar Background",
      route: "/background/solarBackgrounds",
      category: "Background",
    },
    {
      name: "Stellar Background",
      route: "/background/stellarBackgrounds",
      category: "Background",
    },
    {
      name: "Tile Background",
      route: "/background/tileBackgrounds",
      category: "Background",
    },
    {
      name: "Wave Background",
      route: "/background/waveBackgrounds",
      category: "Background",
    },


    // Shader
    {
      name: "Fake Shader",
      route: "/shader/fakeShaders",
      category: "Shader",
    },
    { name: "Glitch Text", route: "/shader/glitchTexts", category: "Shader" },
    { name: "VHS Effect", route: "/shader/vhs", category: "Shader" },
    { name: "CRT Effect", route: "/shader/crts", category: "Shader" },
    {
      name: "Chromatic Aberration",
      route: "/shader/chromaticSplits",
      category: "Shader",
    },

    // Three.js
    { name: "Initialization", route: "/threejs/initializations", category: "Three.js" },
    { name: "Polyhedra", route: "/threejs/polyhedras", category: "Three.js" },
    { name: "Blob", route: "/threejs/blobs", category: "Three.js" },
    { name: "Smooth Blob", route: "/threejs/smoothBlobs", category: "Three.js" },
    { name: "3d Bar Chart", route: "/threejs/threeBars", category: "Three.js" },
    {
      name: "Smoke Effect",
      route: "/threejs/smokeEffects",
      category: "Three.js",
    },
    {
      name: "Fire Effect",
      route: "/threejs/fireEffects",
      category: "Three.js",
    },
    {
      name: "Leaf",
      route: "/threejs/leafs",
      category: "Three.js",
    },
    {
      name: "Mist Effect",
      route: "/threejs/mistEffects",
      category: "Three.js",
    },
    {
      name: "Water Effect",
      route: "/threejs/waterEffects",
      category: "Three.js",
    },
    {
      name: "Wind Effect",
      route: "/threejs/windEffects",
      category: "Three.js",
    },
    { name: "Fireflies", route: "/threejs/fireFlies", category: "Three.js" },
    { name: "Cloud", route: "/threejs/clouds", category: "Three.js" },
    {
      name: "Rain Effect",
      route: "/threejs/rainEffects",
      category: "Three.js",
    },
    {
      name: "Wisp Smoke Effect",
      route: "/threejs/wispSmookeEffects",
      category: "Three.js",
    },

    {
      name: "Built In Libraries",
      route: "/theming/themeLibraries",
      category: "Theming",
    },
    {
      name: "Simple Light & Dark Mode Toggle",
      route: "/theming/normalThemes",
      category: "Theming",
    },
    {
      name: "All Themes Toggle",
      route: "/theming/multiThemes",
      category: "Theming",
    },
    {
      name: "Craft Beautiful Custom Themes",
      route: "/theming/customThemes",
      category: "Theming",
    },
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim()) {
      const filtered = searchableComponents
        .filter(
          (component) =>
            component.name.toLowerCase().includes(value.toLowerCase()) ||
            component.category.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 8);

      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleResultClick = (component) => {
    navigate(component.route);
    setSearch("");
    setSearchResults([]);
    setShowResults(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleResultClick(searchResults[0]);
    }
  };

  const handleNavClick = (name) => {
    console.log(`Navigated to ${name}`);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 769);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate left position based on sidebar state
  const getLeftPosition = () => {
    if (isMobile) {
      // On mobile, sidebar still takes 100% when open, or 60px when closed
      return sidebarOpen ? "0" : "60px";
    }
    return sidebarOpen ? "320px" : "60px"; // On desktop, adjust based on sidebar
  };

  // Calculate width to account for sidebar
  const getWidth = () => {
    if (isMobile) {
      // On mobile, when closed, account for 60px collapsed sidebar
      return sidebarOpen ? "100%" : "calc(100% - 60px)";
    }
    return sidebarOpen ? "calc(100% - 320px)" : "calc(100% - 60px)";
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        paddingTop: "1.4rem",
        left: getLeftPosition(),
        width: getWidth(),
        display: isMobile && sidebarOpen ? "none" : "flex", // Hide navbar when mobile sidebar is open
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: "0.5rem 1rem",
        backgroundColor: isDarkMode ? "#171f39" : "#eaeff5",
        backdropFilter: "blur(10px)",
        color: isDarkMode ? "#ffffff" : "#000",
        transition:
          "left 0.3s ease, width 0.3s ease, color 0.3s ease, background-color 0.3s ease",
        zIndex: 999,
        // boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Search Bar */}
      <div
        style={{
          flex: 1,
          maxWidth: isMobile ? "100%" : "400px",
          position: "relative",
        }}
        className="search-container"
      >
        <div
          onSubmit={handleSearchSubmit}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <div style={{ position: "relative", flex: 1 }}>
            {!isMobile ? (
              <SearchBar
                key={`search-${isDarkMode ? "dark" : "light"}`}
                type="simple"
                color="#87CEFA"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search a component..."
                theme={isDarkMode ? "dark" : "light"}
              />
            ) : (
              <SearchBar
                key={`search-mobile-${isDarkMode ? "dark" : "light"}`}
                type="animated"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search a component..."
                theme={isDarkMode ? "dark" : "light"}
              />
            )}

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                  border: isDarkMode
                    ? "2px solid #374151"
                    : "2px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                  zIndex: 1000,
                  maxHeight: "300px",
                  overflowY: "auto",
                  marginTop: "0.25rem",
                  transition: "all 0.3s ease",
                }}
              >
                {searchResults.map((component, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "0.75rem 1rem",
                      cursor: "pointer",
                      borderBottom: isDarkMode
                        ? "1px solid #374151"
                        : "1px solid #f1f5f9",
                      transition: "background-color 0.2s ease",
                      color: isDarkMode ? "#ffffff" : "#000000",
                    }}
                    onClick={() => handleResultClick(component)}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = isDarkMode
                        ? "#374151"
                        : "#f0f0f0";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                  >
                    <div style={{ fontWeight: "600" }}>{component.name}</div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: isDarkMode ? "#9ca3af" : "#666666",
                        opacity: 0.8,
                      }}
                    >
                      {component.category}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          gap: isMobile ? "1.5rem" : "2rem",
          marginLeft: isMobile ? "0.5rem" : "1rem",
          alignItems: "center",
        }}
      >
        {!isMobile ? (
          <>
            <h2
              style={{
                color: isDarkMode ? "#ffffff" : "#000000",
                fontWeight: "600",
                cursor: "pointer",
                margin: 0,
                fontSize: "1rem",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                padding: "5px 10px",
                borderRadius: "8px",
              }}
              onClick={() => navigate("/components/accordions")}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode
                  ? "#334155"
                  : "#d0d7e2";
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.opacity = "1";
              }}
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
              >
                <title>shapes</title>

                <defs>
                  <linearGradient
                    id="iconGradient"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stop-color="#00f5ff" />
                    <stop offset="100%" stop-color="#ff006e" />
                  </linearGradient>
                </defs>

                <path
                  fill="url(#iconGradient)"
                  d="M9.072 15.25h13.855c0.69 0 1.249-0.56 1.249-1.25 0-0.23-0.062-0.446-0.171-0.631l0.003 0.006-6.927-12c-0.237-0.352-0.633-0.58-1.083-0.58s-0.846 0.228-1.08 0.575l-0.003 0.005-6.928 12c-0.105 0.179-0.167 0.395-0.167 0.625 0 0.69 0.56 1.25 1.25 1.25h0.002zM16 4.5l4.764 8.25h-9.526zM7.838 16.75c-0.048-0.001-0.104-0.002-0.161-0.002-4.005 0-7.252 3.247-7.252 7.252s3.247 7.252 7.252 7.252c0.056 0 0.113-0.001 0.169-0.002-0.048 0.001 0.104 0.002 0.161 0.002 4.005 0 7.252-3.247 7.252-7.252s-3.247-7.252-7.252-7.252c-0.056 0-0.113 0.001-0.169 0.002zM7.838 28.75c-0.048 0.002-0.103 0.003-0.16 0.003-2.625 0-4.753-2.128-4.753-4.753s2.128-4.753 4.753-4.753c0.056 0 0.112 0.001 0.168 0.003-0.048-0.002 0.103-0.003 0.16-0.003 2.625 0 4.753 2.128 4.753 4.753s-2.128 4.753-4.753 4.753c-0.056 0-0.112-0.001-0.168-0.003zM28 16.75h-8c-1.794 0-3.249 1.456-3.25 3.25v8c0 1.794 1.456 3.249 3.25 3.25h8c1.794 0 3.249-1.456 3.25-3.25v-8c0-1.794-1.456-3.249-3.25-3.25zM28.75 28c0 0.414-0.336 0.75-0.75 0.75h-8c-0.414 0-0.75-0.336-0.75-0.75v-8c0-0.414 0.336-0.75 0.75-0.75h8c0.414 0 0.75 0.336 0.75 0.75v8z"
                />
              </svg>
              Component
            </h2>
            <h2
              style={{
                color: isDarkMode ? "#ffffff" : "#000000",
                fontWeight: "600",
                cursor: "pointer",
                margin: 0,
                fontSize: "1rem",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                borderRadius: "8px",
                padding: "5px 10px",
              }}
              onClick={() => navigate("/store")}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode
                  ? "#334155"
                  : "#d0d7e2";
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.opacity = "1";
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#iconGradient)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <defs>
                  <linearGradient
                    id="iconGradient"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stop-color="#00f5ff" />
                    <stop offset="100%" stop-color="#ff006e" />
                  </linearGradient>
                </defs>

                <rect x="3" y="3" width="7" height="9" />
                <rect x="14" y="3" width="7" height="5" />
                <rect x="14" y="12" width="7" height="9" />
                <rect x="3" y="16" width="7" height="5" />
              </svg>
              Template
            </h2>
            <h2
              style={{
                color: isDarkMode ? "#ffffff" : "#000000",
                fontWeight: "600",
                cursor: "pointer",
                margin: 0,
                fontSize: "1rem",
                transition: "all 0.3s ease",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                gap: "0.75rem",
                borderRadius: "8px",
                padding: "5px 10px",
              }}
              onClick={() => navigate("/themeGenerator")}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode
                  ? "#334155"
                  : "#d0d7e2";
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.opacity = "1";
              }}
            >
              <StarEffect
                svg={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                  <defs>
                    <linearGradient id="iconGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#00f5ff" />
                      <stop offset="100%" stop-color="#ff006e" />
                    </linearGradient>
                  </defs>
                  <g fill="url(#iconGradient)">
                    <path d="M508.053,199.349l-50.258-67.348l26.988-79.582c2.429-7.164,0.58-15.086-4.768-20.435c-5.349-5.349-13.271-7.197-20.435-4.768l-79.582,26.988L312.65,3.947c-6.061-4.524-14.168-5.215-20.908-1.781c-6.74,3.434-10.946,10.398-10.849,17.961l1.074,84.026l-68.611,48.52c-6.177,4.368-9.336,11.863-8.153,19.335c1.184,7.471,6.506,13.624,13.73,15.868l58.806,18.279L5.822,478.073c-7.761,7.761-7.761,20.344,0,28.105C9.702,510.059,14.788,512,19.873,512c5.085,0,10.172-1.94,14.052-5.822l271.917-271.917l18.279,58.806c2.244,7.223,8.397,12.545,15.868,13.73c1.04,0.164,2.08,0.245,3.112,0.245c6.385,0,12.463-3.083,16.223-8.398l48.52-68.611l84.026,1.074c7.585,0.078,14.527-4.11,17.962-10.849C513.267,213.519,512.578,205.413,508.053,199.349z M397.907,190.156c-6.586-0.125-12.704,3.055-16.48,8.396l-31.302,44.263l-16.092-51.77c-1.941-6.245-6.832-11.137-13.078-13.078l-51.77-16.092l44.263-31.302c5.341-3.777,8.481-9.939,8.396-16.48l-0.693-54.209L364.6,92.307c5.241,3.911,12.072,4.993,18.269,2.894l51.341-17.41l-17.41,51.341c-2.1,6.195-1.019,13.026,2.894,18.269l32.424,43.448L397.907,190.156z"/>
                  </g>
                </svg>`}
                width={20}
                height={20}
                starCount={3}
              />
              Playground
            </h2>
          </>
        ) : (
          <>
            <div style={{ padding: "20px" }}></div>
            <div style={{ gap: "15px", display: "flex", alignItems: "center" }}>
              <svg
                width="28px"
                height="28px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                style={{ cursor: "pointer", transition: "all 0.3s ease", borderRadius: "8px", padding: "4px" }}
                onClick={() => navigate("/components/accordions")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "#334155"
                    : "#d0d7e2";
                  e.currentTarget.style.opacity = "0.7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <defs>
                  <linearGradient
                    id="iconGradient"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#00f5ff" />
                    <stop offset="100%" stopColor="#ff006e" />
                  </linearGradient>
                </defs>

                <path
                  fill="url(#iconGradient)"
                  d="M9.072 15.25h13.855c0.69 0 1.249-0.56 1.249-1.25 0-0.23-0.062-0.446-0.171-0.631l0.003 0.006-6.927-12c-0.237-0.352-0.633-0.58-1.083-0.58s-0.846 0.228-1.08 0.575l-0.003 0.005-6.928 12c-0.105 0.179-0.167 0.395-0.167 0.625 0 0.69 0.56 1.25 1.25 1.25h0.002zM16 4.5l4.764 8.25h-9.526zM7.838 16.75c-0.048-0.001-0.104-0.002-0.161-0.002-4.005 0-7.252 3.247-7.252 7.252s3.247 7.252 7.252 7.252c0.056 0 0.113-0.001 0.169-0.002-0.048 0.001 0.104 0.002 0.161 0.002 4.005 0 7.252-3.247 7.252-7.252s-3.247-7.252-7.252-7.252c-0.056 0-0.113 0.001-0.169 0.002zM7.838 28.75c-0.048 0.002-0.103 0.003-0.16 0.003-2.625 0-4.753-2.128-4.753-4.753s2.128-4.753 4.753-4.753c0.056 0 0.112 0.001 0.168 0.003-0.048-0.002 0.103-0.003 0.16-0.003 2.625 0 4.753 2.128 4.753 4.753s-2.128 4.753-4.753 4.753c-0.056 0-0.112-0.001-0.168-0.003zM28 16.75h-8c-1.794 0-3.249 1.456-3.25 3.25v8c0 1.794 1.456 3.249 3.25 3.25h8c1.794 0 3.249-1.456 3.25-3.25v-8c0-1.794-1.456-3.249-3.25-3.25zM28.75 28c0 0.414-0.336 0.75-0.75 0.75h-8c-0.414 0-0.75-0.336-0.75-0.75v-8c0-0.414 0.336-0.75 0.75-0.75h8c0.414 0 0.75 0.336 0.75 0.75v8z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="url(#iconGradient2)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ cursor: "pointer", transition: "all 0.3s ease", borderRadius: "8px", padding: "4px"  }}
                onClick={() => navigate("/template")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "#334155"
                    : "#d0d7e2";
                  e.currentTarget.style.opacity = "0.7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <defs>
                  <linearGradient
                    id="iconGradient2"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#00f5ff" />
                    <stop offset="100%" stopColor="#ff006e" />
                  </linearGradient>
                </defs>

                <rect x="3" y="3" width="7" height="9" />
                <rect x="14" y="3" width="7" height="5" />
                <rect x="14" y="12" width="7" height="9" />
                <rect x="3" y="16" width="7" height="5" />
              </svg>
              <div
                style={{ cursor: "pointer", transition: "all 0.3s ease", borderRadius: "8px", padding: "4px"  }}
                onClick={() => navigate("/themeGenerator")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode
                    ? "#334155"
                    : "#d0d7e2";
                  e.currentTarget.style.opacity = "0.7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <StarEffect
                  svg={`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                  <defs>
                    <linearGradient id="iconGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#00f5ff" />
                      <stop offset="100%" stop-color="#ff006e" />
                    </linearGradient>
                  </defs>
                  <g fill="url(#iconGradient)">
                    <path d="M508.053,199.349l-50.258-67.348l26.988-79.582c2.429-7.164,0.58-15.086-4.768-20.435c-5.349-5.349-13.271-7.197-20.435-4.768l-79.582,26.988L312.65,3.947c-6.061-4.524-14.168-5.215-20.908-1.781c-6.74,3.434-10.946,10.398-10.849,17.961l1.074,84.026l-68.611,48.52c-6.177,4.368-9.336,11.863-8.153,19.335c1.184,7.471,6.506,13.624,13.73,15.868l58.806,18.279L5.822,478.073c-7.761,7.761-7.761,20.344,0,28.105C9.702,510.059,14.788,512,19.873,512c5.085,0,10.172-1.94,14.052-5.822l271.917-271.917l18.279,58.806c2.244,7.223,8.397,12.545,15.868,13.73c1.04,0.164,2.08,0.245,3.112,0.245c6.385,0,12.463-3.083,16.223-8.398l48.52-68.611l84.026,1.074c7.585,0.078,14.527-4.11,17.962-10.849C513.267,213.519,512.578,205.413,508.053,199.349z M397.907,190.156c-6.586-0.125-12.704,3.055-16.48,8.396l-31.302,44.263l-16.092-51.77c-1.941-6.245-6.832-11.137-13.078-13.078l-51.77-16.092l44.263-31.302c5.341-3.777,8.481-9.939,8.396-16.48l-0.693-54.209L364.6,92.307c5.241,3.911,12.072,4.993,18.269,2.894l51.341-17.41l-17.41,51.341c-2.1,6.195-1.019,13.026,2.894,18.269l32.424,43.448L397.907,190.156z"/>
                  </g>
                </svg>`}
                  width={20}
                  height={20}
                  starCount={3}
                />
              </div>
            </div>
          </>
        )}

        <ToggleButton
          lightIcon={`
<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="sunGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#00f5ff" />
            <stop offset="100%" style="stop-color:#ff006e" />
        </linearGradient>
    </defs>

    <path d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" fill="url(#sunGradient)"/>
    
    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM4.39861 4.39861C4.6915 4.10572 5.16638 4.10572 5.45927 4.39861L5.85211 4.79145C6.145 5.08434 6.145 5.55921 5.85211 5.85211C5.55921 6.145 5.08434 6.145 4.79145 5.85211L4.39861 5.45927C4.10572 5.16638 4.10572 4.6915 4.39861 4.39861ZM19.6011 4.39887C19.894 4.69176 19.894 5.16664 19.6011 5.45953L19.2083 5.85237C18.9154 6.14526 18.4405 6.14526 18.1476 5.85237C17.8547 5.55947 17.8547 5.0846 18.1476 4.79171L18.5405 4.39887C18.8334 4.10598 19.3082 4.10598 19.6011 4.39887ZM1.25 12C1.25 11.5858 1.58579 11.25 2 11.25H3C3.41421 11.25 3.75 11.5858 3.75 12C3.75 12.4142 3.41421 12.75 3 12.75H2C1.58579 12.75 1.25 12.4142 1.25 12ZM20.25 12C20.25 11.5858 20.5858 11.25 21 11.25H22C22.4142 11.25 22.75 11.5858 22.75 12C22.75 12.4142 22.4142 12.75 22 12.75H21C20.5858 12.75 20.25 12.4142 20.25 12ZM18.1476 18.1476C18.4405 17.8547 18.9154 17.8547 19.2083 18.1476L19.6011 18.5405C19.894 18.8334 19.894 19.3082 19.6011 19.6011C19.3082 19.894 18.8334 19.894 18.5405 19.6011L18.1476 19.2083C17.8547 18.9154 17.8547 18.4405 18.1476 18.1476ZM5.85211 18.1479C6.145 18.4408 6.145 18.9157 5.85211 19.2086L5.45927 19.6014C5.16638 19.8943 4.6915 19.8943 4.39861 19.6014C4.10572 19.3085 4.10572 18.8336 4.39861 18.5407L4.79145 18.1479C5.08434 17.855 5.55921 17.855 5.85211 18.1479ZM12 20.25C12.4142 20.25 12.75 20.5858 12.75 21V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V21C11.25 20.5858 11.5858 20.25 12 20.25Z" fill="url(#sunGradient)"/>
</svg>`}
          darkIcon={`
<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="moonStarsGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#00f5ff" />
            <stop offset="100%" style="stop-color:#ff006e" />
        </linearGradient>
    </defs>

    <path fill="url(#moonStarsGradient)" d="M19.9001 2.30719C19.7392 1.8976 19.1616 1.8976 19.0007 2.30719L18.5703 3.40247C18.5212 3.52752 18.4226 3.62651 18.298 3.67583L17.2067 4.1078C16.7986 4.26934 16.7986 4.849 17.2067 5.01054L18.298 5.44252C18.4226 5.49184 18.5212 5.59082 18.5703 5.71587L19.0007 6.81115C19.1616 7.22074 19.7392 7.22074 19.9001 6.81116L20.3305 5.71587C20.3796 5.59082 20.4782 5.49184 20.6028 5.44252L21.6941 5.01054C22.1022 4.849 22.1022 4.26934 21.6941 4.1078L20.6028 3.67583C20.4782 3.62651 20.3796 3.52752 20.3305 3.40247L19.9001 2.30719Z"/>
    <path fill="url(#moonStarsGradient)" d="M16.0328 8.12967C15.8718 7.72009 15.2943 7.72009 15.1333 8.12967L14.9764 8.52902C14.9273 8.65407 14.8287 8.75305 14.7041 8.80237L14.3062 8.95987C13.8981 9.12141 13.8981 9.70107 14.3062 9.86261L14.7041 10.0201C14.8287 10.0694 14.9273 10.1684 14.9764 10.2935L15.1333 10.6928C15.2943 11.1024 15.8718 11.1024 16.0328 10.6928L16.1897 10.2935C16.2388 10.1684 16.3374 10.0694 16.462 10.0201L16.8599 9.86261C17.268 9.70107 17.268 9.12141 16.8599 8.95987L16.462 8.80237C16.3374 8.75305 16.2388 8.65407 16.1897 8.52902L16.0328 8.12967Z"/>
    <path fill="url(#moonStarsGradient)" d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 17.8615 15 15.5 15C11.9101 15 9 12.0899 9 8.5C9 6.13845 10.2594 4.07105 12.1432 2.93276C12.5392 2.69347 12.4627 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
</svg>`}
          height={isMobile ? 24 : 24}
          width={isMobile ? 24 : 24}
          isStaticColor={true}
          applyBodyTheme={true}
          isOn={isDarkMode}
          onChange={(value) => setIsDarkMode(value)}
          size="small"
        />
      </div>
    </nav>
  );
};

export default Navbar;
