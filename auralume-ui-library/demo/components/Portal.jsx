export default function Portal() {
  return (
    <div style={{ marginTop: '20px' }}>
      <style>{`
        @keyframes portal-spin {
          0% { transform: rotate(359deg); }
        }
        
        .portal-frame {
          --portal-color: linear-gradient(45deg, #00f5ff, #ff006e);
          width: 300px;
          aspect-ratio: 1;
          --portal-browserbugfix: perspective(2077px) translateZ(-0.1px);
          transform: var(--portal-browserbugfix);
          filter: contrast(1.75);
          overflow: hidden;
          margin: 0 auto;
        }
        
        .portal-inner, .portal-inner::before {
          position: absolute;
          inset: 0;
          animation: portal-spin 7s infinite linear;
        }
        
        .portal-inner {
          --portal-img: url(https://cdn.jsdelivr.net/gh/Aditya02git/Textures-v1/portal.png);
          --portal-mask: var(--portal-img) top left / 100% 100% no-repeat;
          -webkit-mask: var(--portal-mask);
          mask: var(--portal-mask);
        }
        
        .portal-inner::before {
          content: "";
          animation-direction: reverse;
          background: linear-gradient(
            black -25%, transparent 50%, white 125%
          ), var(--portal-color);
        }
      `}</style>
      
      <div className="portal-frame">
        <div className="portal-inner"></div>
      </div>
    </div>
  );
}