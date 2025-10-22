import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Installation = ({isDarkMode, setIsDarkMode}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  const Icon = ({ src, alt, name, path }) => {
    const [hover, setHover] = useState(false);
    const navigate = useNavigate();

    return (
      <div
        style={{
          padding: '20px',
          width: isMobile ? '100%' : '300px',
          height: '180px',
          boxShadow: hover
            ? '0 0 12px 4px #00f5ff, 0 0 16px 6px #ff006e'
            : '0 0 8px 2px #00f5ff, 0 0 12px 4px #ff006e',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onClick={() => navigate(path)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={src}
          height="50px"
          width="50px"
          alt={alt}
          style={{
            filter: isDarkMode
              ? 'brightness(0) invert(1)'
              : 'brightness(0)',
          }}
        />
        <span
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: isDarkMode ? '#fff' : '#1f2937',
          }}
        >
          {name}
        </span>
      </div>
    );
  };

  const frameworks = [
    {
      name: 'Next.js',
      src: 'https://static.cdnlogo.com/logos/n/80/next-js.svg',
      path: '/docs/nextjs',
    },
    {
      name: 'Vite',
      src: 'https://static.cdnlogo.com/logos/v/71/vite.svg',
      path: '/docs/vite',
    },
    // {
    //   name: 'Laravel',
    //   src: 'https://static.cdnlogo.com/logos/l/57/laravel.svg',
    //   path: '/docs/laravel',
    // },
    // {
    //   name: 'React Router',
    //   src: 'https://static.cdnlogo.com/logos/r/97/react-router.svg',
    //   path: '/docs/react-router',
    // },
    // {
    //   name: 'Astro',
    //   src: 'https://astro.build/assets/press/astro-icon-light.svg',
    //   path: '/docs/astro',
    // },
    // {
    //   name: 'Manual',
    //   src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    //   path: '/docs/manual',
    // },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'transparent',
        fontFamily:
          'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>

        {/* How it works */}
        <section style={{ marginBottom: '4rem' }}>
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: isDarkMode ? '#ffffff' : '#1f2937',
              marginBottom: '1.5rem',
              position: 'relative',
              paddingLeft: '1rem',
            }}
          > <div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
            Pick your Framework
          </h2>

          <p
            style={{
              fontSize: '1rem',
              color: '#6b7280',
              lineHeight: '1.75',
              marginBottom: '1.5rem',
            }}
          >
            Start by selecting your framework of choice. Then follow the instructions
            to install the dependencies and structure your app. AuraLume is built
            to work with all React frameworks.
          </p>
        </section>

        {/* Framework Support */}
        <section style={{ marginBottom: '4rem' }}>
          <div
            style={{
              marginBottom: '2rem',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 0.3fr)',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? '20px' : '35px',
            }}
          >
            {frameworks.map((fw, i) => (
              <Icon
                key={i}
                src={fw.src}
                alt={fw.name}
                name={fw.name}
                path={fw.path}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Installation;
