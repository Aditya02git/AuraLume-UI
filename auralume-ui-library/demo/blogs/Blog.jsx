import React, { useEffect, useState } from "react";

const Blog = ({isDarkMode, setIsDarkMode}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const items = [
    "Why to use AuraLume ? ",
  ];

  const descriptions = [
    "The one of the best UI library",
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: isMobile ? "15px" : "20px",
        padding: isMobile ? "10px" : "20px",
      }}
    >
      {items.map((name, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: "16px",
            padding: "12px",
            gap: "16px",
            backgroundColor: isDarkMode ? "#1e293b" : "#fff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          {/* Image */}
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              width: isMobile ? "100%" : "200px",
              height: "150px",
              flexShrink: 0,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/aura-page-default.jpg"
              alt={name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: isMobile ? "center" : "flex-start",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <p
              style={{
                margin: "5px 0",
                fontWeight: "600",
                fontSize: "18px",
                color: isDarkMode ? "#fff" : "#000",
              }}
            >
              {name}
            </p>

            <p
              style={{
                marginTop: "5px",
                fontSize: "14px",
                color: isDarkMode ? "#ccc" : "#555",
              }}
            >
              {descriptions[i % descriptions.length]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
