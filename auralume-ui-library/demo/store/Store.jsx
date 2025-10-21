import React, { useEffect, useState } from "react";

const Store = () => {
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

  const items = ["Authentication", "Dashboard", "Documentation Page", "Landing Page"];
  const borderColor = isDarkMode ? "#666" : "#dddddd";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "repeat(1, 1fr)" : "repeat(2, 1fr)",
        gap: "0",
        padding: isMobile ? "5px" : "20px",
        overflow: "hidden",
      }}
    >
      {items.map((name, i) => {
        const isLastInRow = !isMobile && i % 2 === 1;
        const isLastRow = !isMobile && i >= items.length - 2; // ✅ both bottom-left & bottom-right
        const isLastItem = i === items.length - 1;

        return (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              borderRight: isMobile || isLastInRow ? "none" : `2px dashed ${borderColor}`,
              borderBottom: isMobile || isLastRow ? "none" : `2px dashed ${borderColor}`,
              padding: isMobile ? "10px" : "20px",
            }}
          >
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                width: isMobile ? "250px" : "500px",
                height: isMobile ? "175px" : "350px",
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
          </div>
        );
      })}
    </div>
  );
};

export default Store;
