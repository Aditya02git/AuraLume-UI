import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavbarMain = ({ isDarkMode, setIsDarkMode, sidebarOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (name) => {
    console.log(`Navigated to ${name}`);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        marginTop: '2rem',
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60px",
        color: isDarkMode ? "#ffffff" : "#000",
        transition:
          "left 0.3s ease, width 0.3s ease, color 0.3s ease, background-color 0.3s ease",
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
        title="menu"
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
            padding: "5px 10px",
            borderRadius: "8px",
          }}
          onClick={toggleExpand}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDarkMode
              ? "#334155"
              : "#d0d7e2";
            e.currentTarget.style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 -0.5 21 21"
  width="28"
  height="28"
  style={{ transition: "all 0.3s ease" }}
>
  <defs>
    <linearGradient id="menuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#7F59AB" />  {/* Purple */}
      <stop offset="100%" stopColor="#F861B4" /> {/* Pink */}
    </linearGradient>
  </defs>
  <g fill="url(#menuGradient)" fillRule="evenodd">
    <path d="M60.85,51 L57.7,51 C55.96015,51 54.55,52.343 54.55,54 L54.55,57 C54.55,58.657 55.96015,60 57.7,60 L60.85,60 C62.58985,60 64,58.657 64,57 L64,54 C64,52.343 62.58985,51 60.85,51 M49.3,51 L46.15,51 C44.41015,51 43,52.343 43,54 L43,57 C43,58.657 44.41015,60 46.15,60 L49.3,60 C51.03985,60 52.45,58.657 52.45,57 L52.45,54 C52.45,52.343 51.03985,51 49.3,51 M60.85,40 L57.7,40 C55.96015,40 54.55,41.343 54.55,43 L54.55,46 C54.55,47.657 55.96015,49 57.7,49 L60.85,49 C62.58985,49 64,47.657 64,46 L64,43 C64,41.343 62.58985,40 60.85,40 M52.45,43 L52.45,46 C52.45,47.657 51.03985,49 49.3,49 L46.15,49 C44.41015,49 43,47.657 43,46 L43,43 C43,41.343 44.41015,40 46.15,40 L49.3,40 C51.03985,40 52.45,41.343 52.45,43" transform="translate(-99 -200) translate(56 160)" />
  </g>
</svg>
</div>

<div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  }}
>
  {["Docs", "Components", "Github", "Blog"].map((item, index) => {
    const icons = {
      Docs: (   
    <svg
      height="18"
      width="18"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fileGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
          <stop offset="100%" style={{ stopColor: "#ff006e" }} />
        </linearGradient>
      </defs>
      <g fill="url(#fileGradient)">
        <path d="M463.996,126.864L340.192,3.061C338.231,1.101,335.574,0,332.803,0H95.726C67.724,0,44.944,22.782,44.944,50.784v410.434
          c0,28.001,22.781,50.783,50.783,50.783h320.547c28.002,0,50.783-22.781,50.783-50.783V134.253
          C467.056,131.482,465.955,128.824,463.996,126.864z M343.255,35.679l88.127,88.126H373.14c-7.984,0-15.49-3.109-21.134-8.753
          c-5.643-5.643-8.752-13.148-8.751-21.131V35.679z M446.158,461.217c0,16.479-13.406,29.885-29.884,29.885H95.726
          c-16.479,0-29.885-13.406-29.885-29.885V50.784c0.001-16.479,13.407-29.886,29.885-29.886h226.631v73.021
          c-0.002,13.565,5.28,26.318,14.871,35.909c9.592,9.592,22.345,14.874,35.911,14.874h73.018V461.217z"/>
        <path d="M275.092,351.492h-4.678c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449h4.678
          c5.77,0,10.449-4.678,10.449-10.449S280.862,351.492,275.092,351.492z"/>
        <path d="M236.61,351.492H135.118c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449H236.61
          c5.77,0,10.449-4.678,10.449-10.449S242.381,351.492,236.61,351.492z"/>
        <path d="M376.882,303.747H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763
          c5.77,0,10.449-4.678,10.449-10.449C387.331,308.425,382.652,303.747,376.882,303.747z"/>
        <path d="M376.882,256H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763
          c5.77,0,10.449-4.678,10.449-10.449C387.331,260.678,382.652,256,376.882,256z"/>
        <path d="M376.882,208.255H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763
          c5.77,0,10.449-4.678,10.449-10.449S382.652,208.255,376.882,208.255z"/>
      </g>
    </svg>
  ),
      Components: (          
          <svg
            height="18"
            width="18"
            viewBox="0 0 32 32" // Using the original viewBox of 32x32
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="shapesGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* Applies the gradient to all paths in the group */}
            <g fill="url(#shapesGradient)">
              {/* The original 'shapes' icon path */}
              <path d="M9.072 15.25h13.855c0.69-0 1.249-0.56 1.249-1.25 0-0.23-0.062-0.446-0.171-0.631l0.003 0.006-6.927-12c-0.237-0.352-0.633-0.58-1.083-0.58s-0.846 0.228-1.080 0.575l-0.003 0.005-6.928 12c-0.105 0.179-0.167 0.395-0.167 0.625 0 0.69 0.56 1.25 1.25 1.25 0 0 0 0 0.001 0h-0zM16 4.5l4.764 8.25h-9.526zM7.838 16.75c-0.048-0.001-0.104-0.002-0.161-0.002-4.005 0-7.252 3.247-7.252 7.252s3.247 7.252 7.252 7.252c0.056 0 0.113-0.001 0.169-0.002l-0.008 0c0.048 0.001 0.104 0.002 0.161 0.002 4.005 0 7.252-3.247 7.252-7.252s-3.247-7.252-7.252-7.252c-0.056 0-0.113 0.001-0.169 0.002l0.008-0zM7.838 28.75c-0.048 0.002-0.103 0.003-0.16 0.003-2.625 0-4.753-2.128-4.753-4.753s2.128-4.753 4.753-4.753c0.056 0 0.112 0.001 0.168 0.003l-0.008-0c0.048-0.002 0.103-0.003 0.16-0.003 2.625 0 4.753 2.128 4.753 4.753s-2.128 4.753-4.753 4.753c-0.056 0-0.112-0.001-0.168-0.003l0.008 0zM28 16.75h-8c-1.794 0.001-3.249 1.456-3.25 3.25v8c0.001 1.794 1.456 3.249 3.25 3.25h8c1.794-0.001 3.249-1.456 3.25-3.25v-8c-0.001-1.794-1.456-3.249-3.25-3.25h-0zM28.75 28c-0 0.414-0.336 0.75-0.75 0.75h-8c-0.414-0-0.75-0.336-0.75-0.75v0-8c0-0.414 0.336-0.75 0.75-0.75h8c0.414 0 0.75 0.336 0.75 0.75v0z"/>
            </g>
          </svg>),
      Github: (          
          <svg
            height="18"
            width="18"
            viewBox="0 0 20 20" // Keeping the original viewBox of 20x20
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="githubGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* The SVG's core path, transformed and filled with the gradient */}
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-140.000000, -7559.000000)"
              fill="url(#githubGradient)"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                  id="github-[#142]"
                />
              </g>
            </g>
          </svg>),
      Blog: (          
          <svg
            height="18"
            width="18"
            viewBox="0 0 24 24" // Using the original viewBox of 24x24
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="signalGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* The path now uses the gradient for the stroke (outline) */}
            <path
              stroke="url(#signalGradient)"
              fill="none" // Ensure the inside is transparent
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 11C9.41828 11 13 14.5817 13 19M5 5C12.732 5 19 11.268 19 19M7 18C7 18.5523 6.55228 19 6 19C5.44772 19 5 18.5523 5 18C5 17.4477 5.44772 17 6 17C6.55228 17 7 17.4477 7 18Z"
            />
          </svg>),
    };

    return (
      <button
        key={item}
        style={{
          width: isMobile ? "" : "120px",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          justifyContent: "center",
          backgroundColor: isDarkMode ? "#334155" : "#e2e8f0",
          color: isDarkMode ? "#fff" : "#000",
          border: `1px solid ${isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)"}`,
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "600",
          transition: "all 0.3s ease-out",
          opacity: isExpanded ? 1 : 0,
          transform: isExpanded ? "translate(0, 0) scale(1)" : "translate(0, -50px) scale(0)",
          transitionDelay: isExpanded ? `${index * 0.1}s` : "0s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        onClick={() => {
          if (item === "Docs") {
            navigate("/docs/introduction");
          } else if (item === "Components") {
            navigate("/components/accordions");
          } else if (item === "Github") {
            window.open("https://github.com/Aditya02git/auralume", "_blank");
          } else if (item === "Blog") {
            navigate("/blog");
          }
        }}
      >{!isMobile ? (
          <>
            {/* Render SVG or icon JSX directly */}
            <span style={{ display: "flex", alignItems: "center" }}>
              {icons[item]}
            </span>
            <span>{item}</span>
          </>
        ) : (
          <span style={{ display: "flex", alignItems: "center" }}>
            {icons[item]}
          </span>
        )}
      </button>
    );
  })}
</div>

      </div>
    </nav>
  );
};

export default NavbarMain;