import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "../../src";

const Update = ({ isDarkMode, setIsDarkMode, sidebarOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const navigate = useNavigate();


  return (
    <nav
      style={{
        position: "fixed",
        marginTop: '2rem',
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
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
        <Dialog
        variant="cross"
        trigger={
        <div
        title="updates"
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
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-10px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
          }}
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="30"
          height="30"
          className="w-8 h-8"
        >
          <defs>
            <linearGradient id="infoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7F59AB" /> {/* Purple */}
              <stop offset="100%" stopColor="#F861B4" /> {/* Pink */}
            </linearGradient>
          </defs>
          <path
            fill="url(#infoGradient)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
          />
        </svg>

        </div>
        }
        title="Updates"
        className={isDarkMode ? 'dialog-dark' : 'dialog-light'}
        // onClose={() => console.log('Dialog closed!')}
        >
        <p>Aura Lume is an UI library , the new version <span style={{ color: 'red'}}>1.0.1</span> is released.</p>
        <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><b>More updates soon!</b></p>
        </Dialog>
      </div>
    </nav>
  );
};

export default Update;