import React, { useEffect, useState } from 'react'

const Footer = ({isDarkMode, setIsDarkMode,}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640)

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved) setIsDarkMode(JSON.parse(saved))

    const handleResize = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const darkTheme = {
    background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
    color: "white",
    sidebarBg: "rgba(0, 0, 0, 0.4)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    footerBg: "rgba(0, 0, 0, 0.3)",
  }

  const lightTheme = {
    background: "linear-gradient(135deg, #f8fafc, #e2e8f0, #cbd5e1)",
    color: "#1a202c",
    sidebarBg: "rgba(255, 255, 255, 0.8)",
    borderColor: "rgba(0, 0, 0, 0.1)",
    footerBg: "rgba(255, 255, 255, 0.5)",
  }

  const currentTheme = isDarkMode ? darkTheme : lightTheme

  const linkStyle = {
    textDecoration: "underline",
    color: "inherit"
  }

  const itemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: isMobile ? "center" : "flex-start",
    marginBottom: "0.75rem",
    fontSize: isMobile ? "0.9rem" : "1rem",
    lineHeight: "1.5"
  }

  return (
    <footer
      style={{
        marginTop: "4rem",
        padding: isMobile ? "1.5rem" : "2rem",
        borderTop: `1px solid ${currentTheme.borderColor}`,
        background: currentTheme.footerBg,
        borderRadius: "12px",
        transition: "all 0.5s ease-in-out",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        gap: isMobile ? "2rem" : "3rem",
        textAlign: isMobile ? "center" : "left",
        color: currentTheme.color
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={itemStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="questionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="100%" stopColor="#ff006e" />
              </linearGradient>
            </defs>
            <path fill="url(#questionGradient)" fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z" clip-rule="evenodd"/>
          </svg>
          <span>Do you have a question? Ask on <a style={linkStyle} href="https://github.com/Aditya02git">GitHub</a> or <a style={linkStyle} href="#">Discord</a> server</span>
        </div>
        <div style={itemStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="bugGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="100%" stopColor="#ff006e" />
              </linearGradient>
            </defs>
            <path fill="url(#bugGradient)" d="M18 17h-.09c.058-.33.088-.665.09-1v-1h1a1 1 0 0 0 0-2h-1.09a5.97 5.97 0 0 0-.26-1H17a2 2 0 0 0 2-2V8a1 1 0 1 0-2 0v2h-.54a6.239 6.239 0 0 0-.46-.46V8a3.963 3.963 0 0 0-.986-2.6l.693-.693A1 1 0 0 0 16 4V3a1 1 0 1 0-2 0v.586l-.661.661a3.753 3.753 0 0 0-2.678 0L10 3.586V3a1 1 0 1 0-2 0v1a1 1 0 0 0 .293.707l.693.693A3.963 3.963 0 0 0 8 8v1.54a6.239 6.239 0 0 0-.46.46H7V8a1 1 0 0 0-2 0v2a2 2 0 0 0 2 2h-.65a5.97 5.97 0 0 0-.26 1H5a1 1 0 0 0 0 2h1v1a6 6 0 0 0 .09 1H6a2 2 0 0 0-2 2v2a1 1 0 1 0 2 0v-2h.812A6.012 6.012 0 0 0 11 21.907V12a1 1 0 0 1 2 0v9.907A6.011 6.011 0 0 0 17.188 19H18v2a1 1 0 0 0 2 0v-2a2 2 0 0 0-2-2Zm-4-8.65a5.922 5.922 0 0 0-.941-.251l-.111-.017a5.52 5.52 0 0 0-1.9 0l-.111.017A5.925 5.925 0 0 0 10 8.35V8a2 2 0 1 1 4 0v.35Z"/>
          </svg>
          <span>Do you see a bug? <a style={linkStyle} href="#">open an issue on GitHub</a></span>
        </div>
        <div style={itemStyle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="xGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f5ff" />
                <stop offset="100%" stopColor="#ff006e" />
              </linearGradient>
            </defs>
            <path
            fill="url(#xGradient)" d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"/>
          </svg>
          <span>Do you like Aura Lume UI? <a style={linkStyle} href="#">Post about it!</a></span>
        </div>
        <div style={itemStyle}>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="15"
  height="15"
>
  <defs>
    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#00f5ff" />
      <stop offset="100%" stopColor="#ff006e" />
    </linearGradient>
  </defs>

  <path
    fill="url(#heartGradient)" // ✅ Use gradient reference here
    d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"
  />
</svg>

          <span>Support daisyUI's development: <a style={linkStyle} href="#">Open Collective</a></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer