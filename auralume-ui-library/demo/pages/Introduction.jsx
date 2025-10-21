import React, { useEffect, useState } from 'react';
import Aura from '../../src/components/Aura';

const Introduction = () => {

  const prosData = [
    'Want to build beautiful 2D and 3D interfaces without sacrificing development speed',
    'Need seamless integration between traditional UI and WebGL/Three.js content',
    'Want to create immersive experiences with interactive 3D components',
    'Need components that are accessible by default and WCAG 2.1 AA compliant',
    'Value consistent design systems across multiple projects',
    'Want components that feel native to your brand, not like a third-party library',
    'Need advanced theming capabilities with light/dark mode support',
    'Want to focus on building features, not wrestling with component styling',
    'Need components optimized for performance with minimal bundle impact',
    'Want comprehensive TypeScript support and excellent developer experience'
  ];

  const consData = [
    'Prefer building every single component from scratch for each project',
    'Don\'t care about accessibility or inclusive design practices',
    'Want to spend time debugging cross-browser compatibility issues',
    'Enjoy writing repetitive styling code instead of shipping features',
    'Don\'t value consistent user experiences across your applications',
    'Prefer inconsistent component APIs that differ across projects'
  ];


  const [isDarkMode, setIsDarkMode] = useState(false);
    // Get theme from localStorage
    useEffect(() => {
      const saved = localStorage.getItem('darkMode');
      if (saved) {
        setIsDarkMode(JSON.parse(saved));
      }
    }, []);
  
    // Listen for storage changes to sync theme across components
    useEffect(() => {
      const handleStorageChange = () => {
        const saved = localStorage.getItem('darkMode');
        if (saved) {
          setIsDarkMode(JSON.parse(saved));
        }
      };
  
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 640);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);



    const Icon = ({ src, alt }) => {
      const [hover, setHover] = useState(false);

      return (
        <img
          src={src}
          height="50px"
          width="50px"
          alt={alt}
          style={{
            borderRadius: "8px",
            background: "transparent",
            boxShadow: "0 0 8px 2px #00f5ff, 0 0 12px 4px #ff006e",
            transform: hover ? "scale(1.1)" : "none",
            transition: "0.3s all ease-in-out",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      );
    };


      const icons = [
        "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/react.png",
        "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/vue.png",
        "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/angular.png",
        "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/svelte.png",
        "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/vanilla.png",
        "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/three.png",
      ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'transparent',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: isDarkMode ? '#ffffff' : '#1f2937',
            marginBottom: '1.5rem',
            position: 'relative',
            paddingLeft: '1rem'
          }}>
            <div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
            What is Aura Lume?
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '1.5rem'
          }}>
            Aura Lume is a modern, comprehensive UI component library that brings elegance and sophistication to web development. Built with accessibility, performance, and developer experience at its core, Aura Lume provides a collection of beautifully crafted 2D and 3D components that adapt to any design system while maintaining consistency and quality.
          </p>
          
          <div style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            padding: '1.5rem',
            borderRadius: '16px',
            borderLeft: '4px solid #667eea',
            margin: '1.5rem 0'
          }}>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              lineHeight: '1.75',
              marginBottom: 0,
              fontWeight: '500'
            }}>
              <strong>Think of it as your design system's best friend</strong> — Aura Lume doesn't impose its own aesthetic, but rather enhances and elevates whatever vision you have for your application.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: isDarkMode ? '#ffffff' : '#1f2937',
            marginBottom: '1.5rem',
            position: 'relative',
            paddingLeft: '1rem'
          }}>
            <div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
            How does Aura Lume work?
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '1.5rem'
          }}>
            Aura Lume is framework-agnostic and can be integrated into any modern web development workflow. Whether you're using React, Next, Vue, Angular, or vanilla JavaScript, Aura Lume components seamlessly integrate with your existing codebase.
          </p>

          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '1.5rem'
          }}>
            <strong>Revolutionary 3D Integration:</strong> Aura Lume is the first UI library to provide native Three.js components that work seamlessly alongside traditional UI elements. Create product configurators, data visualizations, interactive demos, and immersive experiences without the complexity of managing separate 3D and UI frameworks.
          </p>

        </section>

    <section style={{ marginBottom: "4rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "2rem",
          margin: "2rem 0",
        }}
      >
        {/* Pros */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))",
            padding: "2rem",
            borderRadius: "16px",
            borderLeft: "4px solid #22c55e",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#15803d",
              marginBottom: "1.5rem",
            }}
          >
            Aura Lume is perfect for you if you:
          </h3>
          <div>
            {prosData.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "0.75rem",
                  color: "#6b7280",
                }}
              >
                <span
                  style={{
                    color: "#22c55e",
                    marginRight: "0.75rem",
                    marginTop: "0.125rem",
                    fontWeight: "600",
                  }}
                >
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cons */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(236, 72, 153, 0.1))",
            padding: "2rem",
            borderRadius: "16px",
            borderLeft: "4px solid #ef4444",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#dc2626",
              marginBottom: "1.5rem",
            }}
          >
            Aura Lume might not be for you if you:
          </h3>
          <div>
            {consData.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "0.75rem",
                  color: "#6b7280",
                }}
              >
                <span
                  style={{
                    color: "#ef4444",
                    marginRight: "0.75rem",
                    marginTop: "0.125rem",
                    fontWeight: "600",
                  }}
                >
                  ✗
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

{/* What makes Aura Lume different */}
<section style={{ marginBottom: '4rem' }}>
  <h2 style={{
    fontSize: '1.5rem',
    fontWeight: '700',
    color: isDarkMode ? '#ffffff' : '#1f2937',
    marginBottom: '1.5rem',
    position: 'relative',
    paddingLeft: '1rem'
  }}>
    <div style={{
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '4px',
      height: '2rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '2px'
    }}></div>
    What makes Aura Lume different?
  </h2>

  <p style={{
    fontSize: '1rem',
    color: '#6b7280',
    lineHeight: '1.75',
    marginBottom: '2rem'
  }}>
    Aura Lume isn’t just a UI library—it’s designed with a holistic approach. Every component follows four key principles:
  </p>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    
    <div>
      <h3 style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Aura width={15} height={15} /> Fully Customizable
      </h3>
      <p style={{ color: '#6b7280', lineHeight: '1.75' }}>
        Every component is built on plain CSS and easy to restyle, extend, or theme—no locked-in designs.
      </p>
    </div>

    <div>
      <h3 style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Aura width={15} height={15} /> Simple & Lightweight
      </h3>
      <p style={{ color: '#6b7280', lineHeight: '1.75' }}>
        Minimal core, zero unnecessary complexity. Use only what you need to keep projects fast and clean.
      </p>
    </div>

    <div>
      <h3 style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Aura width={15} height={15} /> 3D Environment Ready
      </h3>
      <p style={{ color: '#6b7280', lineHeight: '1.75' }}>
        Includes WebGL & Three.js integration for immersive visuals, motion, and depth.
      </p>
    </div>

    <div>
      <h3 style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Aura width={15} height={15} /> Rich Component Library
      </h3>
      <p style={{ color: '#6b7280', lineHeight: '1.75' }}>
        A wide range of ready-to-use components: buttons, forms, 3D cards, and interactive elements.
      </p>
    </div>

    <div>
      <h3 style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Aura width={15} height={15} /> Easy to Use
      </h3>
      <p style={{ color: '#6b7280', lineHeight: '1.75' }}>
        Straightforward setup, clean APIs, and clear documentation let you focus on building, not configuring.
      </p>
    </div>

  </div>
</section>


{/* 3D Features */}
<section style={{ marginBottom: '4rem' }}>
  <h2 style={{
    fontSize: '1.5rem',
    fontWeight: '700',
    color: isDarkMode ? '#ffffff' : '#1f2937',
    marginBottom: '1.5rem',
    position: 'relative',
    paddingLeft: '1rem'
  }}>
    <div style={{
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '4px',
      height: '2rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '2px'
    }}></div>
    3D Web Development Made Simple
  </h2>

  <p style={{
    fontSize: '1rem',
    color: '#6b7280',
    lineHeight: '1.75',
    marginBottom: '2rem'
  }}>
    Aura Lume makes 3D web development easy by combining traditional UI components with ready-to-use Three.js elements. You can quickly create stunning 3D experiences like:
  </p>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

    <div>
      <h3 style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Aura width={15} height={15} /> Polyhedra Elements
      </h3>
      <p style={{ color: '#6b7280', lineHeight: '1.75' }}>
        Use prebuilt shapes—cubes, tetrahedra, dodecahedra—to design unique 3D compositions with ease.
      </p>
    </div>

    <div>
      <h3 style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Aura width={15} height={15} /> Organic Blobs
      </h3>
      <p style={{ color: '#6b7280', lineHeight: '1.75' }}>
        Animate smooth, customizable blobs to add fluid, dynamic elements to your 3D scenes.
      </p>
    </div>

    <div>
      <h3 style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Aura width={15} height={15} /> Environment Effects
      </h3>
      <p style={{ color: '#6b7280', lineHeight: '1.75' }}>
        Instantly enhance scenes with fog, smoke, fire and other atmospheric effects.
      </p>
    </div>

    <div>
      <h3 style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Aura width={15} height={15} /> 3D Data Visualization
      </h3>
      <p style={{ color: '#6b7280', lineHeight: '1.75' }}>
        Transform complex data into interactive 3D charts for intuitive exploration.
      </p>
    </div>

  </div>
</section>


        {/* Modern Development */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: isDarkMode ? '#ffffff' : '#1f2937',
            marginBottom: '1.5rem',
            position: 'relative',
            paddingLeft: '1rem'
          }}>
            <div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
            How does Aura Lume fit into modern development?
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '1.5rem'
          }}>
            Aura Lume embraces the component-driven development philosophy that has become the standard in modern web development. Instead of fighting against your framework's conventions, Aura Lume enhances them.
          </p>
          
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '1.5rem'
          }}>
            Whether you're building a design system from scratch or enhancing an existing one, Aura Lume provides the foundational components that every application needs, while giving you the flexibility to customize and extend them as your needs evolve.
          </p>

          <div style={{
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            padding: '1.5rem',
            borderRadius: '16px',
            borderLeft: '4px solid #667eea',
            margin: '1.5rem 0'
          }}>
            <p style={{
              fontSize: '1rem',
              color: '#6b7280',
              lineHeight: '1.75',
              marginBottom: 0,
              fontWeight: '500'
            }}>
              <strong>Design System Integration:</strong> Aura Lume components serve as the atoms and molecules in your design system, providing consistent building blocks that your team can confidently use and extend.
            </p>
          </div>
        </section>

        {/* Free and Open Source */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: isDarkMode ? '#ffffff' : '#1f2937',
            marginBottom: '1.5rem',
            position: 'relative',
            paddingLeft: '1rem'
          }}>
            <div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
            Is Aura Lume free?
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '1.5rem'
          }}>
            Yes! Aura Lume is completely free and open-source under the MIT license. Use it in any project — personal, commercial, or enterprise — without any restrictions or licensing fees.
          </p>
          
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '1.5rem'
          }}>
            We believe that great tools should be accessible to everyone. Our mission is to elevate the quality of web interfaces across the internet by providing developers with components they can trust and users with experiences they can enjoy.
          </p>
        </section>

        {/* Support */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: isDarkMode ? '#ffffff' : '#1f2937',
            marginBottom: '1.5rem',
            position: 'relative',
            paddingLeft: '1rem'
          }}>
            <div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
            How can I support Aura Lume?
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '1.5rem'
          }}>
            The best way to support Aura Lume is to use it in your projects and share your experience with the community. Contribute to our documentation, report bugs, suggest features, or help other developers in our community forums.
          </p>
          
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '1.5rem'
          }}>
            If Aura Lume has helped you ship better products faster, consider becoming a sponsor to help us maintain and improve the library for everyone.
          </p>
        </section>

        {/* Framework Support */}
        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: isDarkMode ? '#ffffff' : '#1f2937',
            marginBottom: '1.5rem',
            position: 'relative',
            paddingLeft: '1rem'
          }}>
            <div style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '4px',
              height: '2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '2px'
            }}></div>
            Which frameworks can I use Aura Lume with?
          </h2>
          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '1.5rem'
          }}>
            <strong>All of them!</strong> Aura Lume is framework-agnostic and provides adapters for the most popular frameworks:
          </p>
          
    <div
      style={{
        marginBottom: "2rem",
        display: "flex",
        flexWrap: "wrap", // allows icons to go to the next line on small screens
        alignItems: "center",
        justifyContent: isMobile ? "center" : "flex-start",
        gap: isMobile ? "20px" : "55px", // smaller gap on mobile
      }}
    >
      {icons.map((src, i) => (
        <Icon key={i} src={src} alt={`icon-${i}`} />
      ))}
    </div>

          <p style={{
            fontSize: '1rem',
            color: '#6b7280',
            lineHeight: '1.75',
            marginBottom: '1.5rem'
          }}>
            No matter what stack you're using, Aura Lume integrates seamlessly and feels native to your development workflow.
          </p>
        </section>

      </div>
    </div>
  );
};

export default Introduction;