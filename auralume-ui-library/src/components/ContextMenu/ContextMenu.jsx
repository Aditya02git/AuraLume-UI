import React, { useState, useRef, useEffect } from "react";
import "./ContextMenu.css"; // ✅ import the styles

export default function ContextMenu({ options = [], children, className = "" }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
    setVisible(true);
  };

  useEffect(() => {
    if (!visible) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setVisible(false);
      }
    };
    const handleKey = (e) => e.key === "Escape" && setVisible(false);
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [visible]);

  const MenuItem = ({ opt }) => {
    const [open, setOpen] = useState(false);
    const timerRef = useRef(null);

    const showSub = () => !opt.disabled && setOpen(true);
    const hideSub = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setOpen(false);
    };

    const onClick = () => {
      if (opt.submenu) {
        const delay = opt.stayOpenFor ?? 5000;
        setOpen(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setOpen(false), delay);
      } else {
        if (!opt.disabled && opt.onClick) opt.onClick();
        setVisible(false);
      }
    };

    return (
      <div
        className={`context-item ${opt.disabled ? "disabled" : ""}`}
        onMouseEnter={showSub}
        onMouseLeave={hideSub}
        onClick={onClick}
        role="menuitem"
      >
        <span>{opt.label}</span>
        {opt.submenu && <span className="arrow"><img src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/left-arrow.png" alt=">" height="25px" width="25px" style={{ filter: "brightness(0) invert(0.5)" }}/></span>}

        {open && opt.submenu && (
          <div className={`context-menu submenu ${className}`}>
            {opt.submenu.map((sub, i) =>
              sub.separator ? (
                <div key={i} className="context-separator" />
              ) : (
                <MenuItem key={i} opt={sub} />
              )
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div onContextMenu={handleContextMenu} style={{ display: "inline-block" }}>
      {children}
      {visible && (
        <div
          ref={menuRef}
          className={`context-menu ${className}`}
          style={{ top: pos.y, left: pos.x }}
        >
          {options.map((opt, i) =>
            opt.separator ? (
              <div key={i} className="context-separator" />
            ) : (
              <MenuItem key={i} opt={opt} />
            )
          )}
        </div>
      )}
    </div>
  );
}