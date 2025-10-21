import React, { useEffect, useState } from "react";

const Resource = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved) setIsDarkMode(JSON.parse(saved));

    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("darkMode");
      if (saved) setIsDarkMode(JSON.parse(saved));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

const items = ["video 1", "video 2", "video 3", "video 4", "video 5", "video 6", "video 7"];
const descriptions = [
  "description 1",
  "description 2",
  "description 3",
  "description 4",
  "description 5",
  "description 6",
  "description 7",
];

return (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: isMobile ? "repeat(1, 1fr)" : "repeat(4, 1fr)",
      gap: "0",
      padding: isMobile ? "5px" : "10px",
      overflow: "hidden",
    }}
  >
    {items.map((name, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: isMobile ? "5px" : "10px",
        }}
      >
        <div
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            width: isMobile ? "250px" : "250px",
            height: isMobile ? "175px" : "175px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            cursor: "pointer",
          }}
        >
          <img
            src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/aura-page-default.jpg"
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <p
          style={{
            marginTop: "10px",
            fontWeight: "600",
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
          {descriptions[i]}
        </p>
      </div>
    ))}
  </div>
);
};

export default Resource;
