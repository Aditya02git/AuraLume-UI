import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Home";
import DocsLayout from "./DocsLayout";
// import ThemeGenerator from "./playground/ThemeGenerator";

function App() {
  return (
    <Routes>
      {/* Standalone pages - no sidebar */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path="/themeGenerator" element={<ThemeGenerator />} /> */}
      
      {/* Documentation/Component pages - with sidebar */}
      <Route path="/*" element={<DocsLayout />} />
    </Routes>
  );
}

export default App;