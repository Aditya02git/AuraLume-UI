import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Tube from './components/Tube';
import { useNavigate } from 'react-router-dom';
import GradientText from '../src/components/GradientText/GradientText';
import FluidButton from '../src/components/FluidButton';
import Chart from '../src/components/Chart';
import { Button, Tab } from '../src';
import RadarChart from '../src/components/RadarChart';
import Avatar from '../src/components/Avatar';
import Calendar from '../src/components/Calendar';
import ReactHookForm from '../src/components/ReactHookForm';
import Checkbox from '../src/components/Checkbox/Checkbox';
import NavbarMain from './layout/NavbarMain';
import Update from './layout/Update';
import ScrollVideoAnimation from './components/ScrollVideoAnimation';
import ScrollTextFill from './components/ScrollTextFill';
import { TabPanel } from '../src/components/Tab';
import ScrollScaleText from './components/ScrollScaleText';
import FooterMain from './layout/FooterMain';
import WaterDropScroller from './components/WaterDropScroller';
import ScrollFadeText from './components/ScrollFadeText';

const Home = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const tunnelRef = useRef(null);
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [hueValue, setHueValue] = useState(210);
  const [brightnessValue, setBrightnessValue] = useState(55);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [webglContextLost, setWebglContextLost] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isCanvasVisible, setIsCanvasVisible] = useState(true);

  const copy = useCallback(() => {
    navigator.clipboard.writeText("npm install auralume-ui@latest");
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }, []);

  const scrollToSection = useCallback(() => {
    const section = document.getElementById("preview");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Optimized resize handler with debounce
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 150);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoized color conversion function
  const hslToHex = useCallback((h, s, l) => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }, []);

  // Memoized color calculator
  const getColorFromHue = useCallback((index) => {
    const hueShift = index * 30;
    const finalHue = (hueValue + hueShift) % 360;
    return hslToHex(finalHue, 70, brightnessValue);
  }, [hueValue, brightnessValue, hslToHex]);

  // Memoized primary color
  const primaryColor = useMemo(() => getColorFromHue(0), [getColorFromHue]);
  const secondaryColor = useMemo(() => getColorFromHue(1), [getColorFromHue]);

  // Observer to pause canvas when not visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCanvasVisible(entry.isIntersecting);
        
        // Pause/resume WebGL rendering
        if (tunnelRef.current) {
          if (entry.isIntersecting) {
            tunnelRef.current.resume?.();
          } else {
            tunnelRef.current.pause?.();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // WebGL Context Management - Optimized
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    let animationFrameId;

    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn('WebGL context lost. Attempting to restore...');
      setWebglContextLost(true);
      
      if (tunnelRef.current) {
        tunnelRef.current.cleanup();
        tunnelRef.current = null;
      }
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored.');
      setWebglContextLost(false);
      
      try {
        tunnelRef.current = new Tube(canvas);
      } catch (error) {
        console.error('Failed to restore WebGL context:', error);
      }
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    try {
      tunnelRef.current = new Tube(canvas);
    } catch (error) {
      console.error('Failed to initialize WebGL:', error);
      setWebglContextLost(true);
    }

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      if (tunnelRef.current) {
        try {
          tunnelRef.current.cleanup();
        } catch (error) {
          console.error('Error during cleanup:', error);
        }
      }
    };
  }, []);

  // Memoized sample data
  const sampleData = useMemo(() => ({
    sales: [65, 78, 90, 81, 56, 72, 88],
    revenue: [45, 52, 48, 65, 72, 68, 85],
    users: [120, 140, 135, 160, 180, 175, 195],
    growth: [30, 42, 38, 55, 62, 58, 75],
    expenses: [25, 35, 32, 45, 50, 48, 60],
    profit: [40, 45, 50, 60, 70, 75, 85],
    active: [80, 90, 85, 95, 110, 105, 125],
    total: [55, 65, 60, 75, 85, 80, 95],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  }), []);

  const customData = useMemo(() => ({
    labels: [
      "React", "Vue.js", "Angular", "Node.js", 
      "Python", "GraphQL", "TypeScript", "Docker"
    ],
    datasets: [
      {
        label: "Interest Level",
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
        pointBackgroundColor: "rgba(255,99,132,1)",
        pointBorderColor: "rgba(255,99,132,1)",
        pointHoverBackgroundColor: "rgba(255,99,132,1)",
        pointHoverBorderColor: "rgba(255,99,132,1)",
        data: [95, 80, 70, 90, 85, 75, 88, 65]
      },
      {
        label: "Current Skill",
        backgroundColor: "rgba(54,162,235,0.4)",
        borderColor: "rgba(54,162,235,1)",
        pointBackgroundColor: "rgba(54,162,235,1)",
        pointBorderColor: "rgba(54,162,235,1)",
        pointHoverBackgroundColor: "rgba(54,162,235,1)",
        pointHoverBorderColor: "rgba(54,162,235,1)",
        data: [90, 70, 60, 85, 80, 65, 82, 55]
      }
    ]
  }), []);

  const [messages, setMessages] = useState([
    { text: "Hey! 👋", sender: "bot" },
    { text: "Hi there! How are you?", sender: "user" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setInput("");
  }, [input]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const userFields = useMemo(() => [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      placeholder: 'Enter your full name',
      validation: { required: true, minLength: 2 }
    },
    {
      name: 'country',
      type: 'select',
      label: 'Country',
      placeholder: 'Select your country',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'ca', label: 'Canada' },
        { value: 'au', label: 'Australia' }
      ],
      validation: { required: true }
    },
  ], []);

  const handleFormSubmit = useCallback((data) => {
    console.log('Form submitted:', data);
  }, []);

  const [checkboxStates, setCheckboxStates] = useState({
    easy: false,
    medium: false,
    hard: false
  });

  const Icon = useMemo(() => {
    return ({ src, alt }) => {
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
  }, []);

  const icons = useMemo(() => [
    "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/react.png",
    "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/vue.png",
    "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/angular.png",
    "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/svelte.png",
    "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/vanilla.png",
    "https://cdn.jsdelivr.net/gh/Aditya02git/Icons/three.png",
  ], []);

  const gridContainerRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);

  // Optimized intersection observer for grid animation
  useEffect(() => {
    if (isMobile) {
      setIsAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true);
          observer.disconnect(); // Stop observing after animation
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = gridContainerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => observer.disconnect();
  }, [isAnimated, isMobile]);

  const handleExploreClick = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  }, []);

  // Memoized grid item styles
  const getGridItemStyle = useCallback((index) => {
    const positions = [
      { top: '0px', left: '0px' },
      { top: '0px', left: '480px' },
      { top: '0px', left: '960px' },
      { top: '480px', left: '0px' },
      { top: '480px', left: '480px' },
      { top: '480px', left: '960px' },
      { top: '960px', left: '0px' },
      { top: '960px', left: '480px' },
      { top: '960px', left: '960px' },
    ];

    const shouldAllowOverflow = index === 6 || index === 8;
    const background = index === 4 ? 'transparent' : 'white';
    const boxShadow = index === 4 ? 'none' : '0 10px 40px rgba(102, 126, 234, 0.3)';

    if (isMobile) {
      return {
        position: 'relative',
        width: '100%',
        maxWidth: '400px',
        minHeight: '400px',
        background,
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxShadow,
        transition: `all 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
        opacity: isAnimated ? 1 : 0,
        transform: isAnimated ? 'translateY(0)' : 'translateY(30px)',
        overflow: shouldAllowOverflow ? 'visible' : 'hidden',
        zIndex: shouldAllowOverflow ? 10 : 1,
        marginBottom: '20px',
      };
    }

    if (!isAnimated) {
      return {
        position: 'absolute',
        width: '460px',
        height: '460px',
        background,
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxShadow,
        transition: `all 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
        top: '480px',
        left: '480px',
        opacity: 0,
        overflow: shouldAllowOverflow ? 'visible' : 'hidden',
        zIndex: shouldAllowOverflow ? 10 : 1,
      };
    }

    return {
      position: 'absolute',
      width: '460px',
      height: '460px',
      background,
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0px',
      boxShadow,
      transition: `all 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
      top: positions[index].top,
      left: positions[index].left,
      opacity: 1,
      overflow: shouldAllowOverflow ? 'visible' : 'hidden',
      zIndex: shouldAllowOverflow ? 10 : 1,
    };
  }, [isMobile, isAnimated]);

  // Memoized grid content with lazy loading
  const getGridItemContent = useCallback((index) => {
    const chartWidth = isMobile ? 250 : 280;
    const chartHeight = isMobile ? 240 : 270;

    switch (index) {
      case 0:
        return (
          <Chart
            type="line"
            data={sampleData.sales}
            labels={sampleData.months}
            color={primaryColor}
            title="Sales"
            width={chartWidth}
            height={chartHeight}
            showLegend={false}
            showValues={false}
            animated={true}
          />
        );
      case 1:
        return (
          <Chart
            type="pie"
            data={sampleData.revenue}
            labels={sampleData.months}
            color={primaryColor}
            title="Revenue"
            width={chartWidth}
            height={chartHeight}
            showLegend={false}
            showValues={false}
            animated={true}
          />
        );
      case 2:
        return (
          <Chart
            type="bar"
            data={sampleData.users}
            labels={sampleData.months}
            color={primaryColor}
            title="Users"
            width={chartWidth}
            height={chartHeight}
            showLegend={false}
            showValues={false}
            animated={true}
          />
        );
      case 3:
        return (
          <RadarChart 
            data={customData}
            color={primaryColor}
            animationDuration={3000}
            scaleMax={100}
          />
        );
      case 4:
        return (
          <img
            src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/aura-logo-extralarge.png"
            height="80px"
            width="80px"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
              backgroundColor: 'transparent'
            }}
            alt="logo"
            loading="lazy"
          />
        );
      case 5:
        return (
          <div
            style={{
              width: "100%",
              maxWidth: isMobile ? "100%" : "300px",
              margin: isMobile ? "0" : "20px auto",
              borderRadius: "12px",
              boxShadow: "0 5px 12px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              fontFamily: "Arial, sans-serif",
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', background: "#e3e9f1", paddingLeft: '12px'}}>
              <Avatar 
                src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/man.png" 
                alt="John Doe" 
                size="small" 
                variant="circle" 
              />
              <div style={{display: 'flex', flexDirection: 'column', padding: "12px"}}>
                <div style={{color: "#000", fontWeight: "bold", textAlign: "left"}}>   
                  User
                </div>
                <div style={{color: 'green', fontSize: '10px'}}>Online</div>
              </div>
            </div>

            <div
              style={{
                flex: 1,
                padding: "12px",
                overflowY: "auto",
                background: "#f9f9f9",
                minHeight: "200px",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    marginBottom: "12px",
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {msg.sender === "bot" && (
                    <div style={{marginRight: "8px", flexShrink: 0}}>
                      <Avatar 
                        src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/man.png" 
                        alt="John Doe" 
                        size="small" 
                        variant="circle" 
                      />
                    </div>
                  )}

                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 12px",
                      borderRadius: "16px",
                      background: msg.sender === "user" ? primaryColor : "#e5e5ea",
                      color: msg.sender === "user" ? "#fff" : "#000",
                      maxWidth: "70%",
                      wordBreak: "break-word",
                    }}
                  >
                    {msg.text}
                  </span>

                  {msg.sender === "user" && (
                    <div style={{marginLeft: "8px", flexShrink: 0}}>
                      <Avatar 
                        src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/man.png" 
                        alt="John Doe" 
                        size="small" 
                        variant="circle" 
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                borderTop: "1px solid #ddd",
                padding: "8px",
                background: "#fff",
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  marginRight: "8px",
                  outline: "none",
                  fontSize: "14px",
                }}
                placeholder="Type a message..."
              />
              <div style={{"--btn-bgcolor": primaryColor}}>
                <Button onClick={handleSend} variant='primary' size='small' btnColor={primaryColor}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              console.log('Selected date:', date);
              setSelectedDate(date);
            }}
            showToday={true}
            color={primaryColor}
          />
        );
      case 7:
        return (
          <div>
            <Checkbox 
              size='small' 
              label="Easy" 
              color={primaryColor}
              checked={checkboxStates.easy} 
              onChange={(e) => setCheckboxStates({...checkboxStates, easy: e.target.checked})} 
            />
            <Checkbox 
              size='small' 
              label="Medium" 
              color={primaryColor}
              checked={checkboxStates.medium} 
              onChange={(e) => setCheckboxStates({...checkboxStates, medium: e.target.checked})} 
            />
            <Checkbox 
              size='small' 
              label="Hard" 
              color={primaryColor}
              checked={checkboxStates.hard} 
              onChange={(e) => setCheckboxStates({...checkboxStates, hard: e.target.checked})} 
            />
          </div>
        );
      case 8:
        return (
          <ReactHookForm
            title=""
            fields={userFields}
            onSubmit={handleFormSubmit}
            submitButtonText="Register User"
            showDataTable={false}
            tableTitle="Registered Users"
            color={primaryColor}
          />
        );
      default:
        return <div>{index + 1}</div>;
    }
  }, [isMobile, sampleData, customData, primaryColor, messages, input, handleSend, selectedDate, checkboxStates, userFields, handleFormSubmit]);

  return (
    <div className="demo">
      <NavbarMain/>
      <Update/>
      <main>
        <section
          style={{
            position: 'relative',
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <header
            style={{
              position: 'absolute',
              top: isMobile ? '15%' : '20%',
              left: isMobile ? '50%' : '5%',
              transform: isMobile ? 'translateX(-50%)' : 'none',
              zIndex: '10',
              maxWidth: isMobile ? '90vw' : '50vw',
              color: '#5f5c58',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            <GradientText
              colors={["#00f5ff", "#ff006e"]}
              animationSpeed="7000"
              style={{ 
                fontWeight: "700", 
                fontSize: isMobile ? "48px" : "80px",
                lineHeight: isMobile ? "1.2" : "normal",
              }}
            >
              Aura Lume
            </GradientText>
            <p style={{
              maxWidth: isMobile ? '100%' : '80vh',
              fontSize: isMobile ? '14px' : '16px',
              padding: isMobile ? '0 10px' : '0',
            }}>
              A library of luminous components that adapt to your vision. Customize, extend, and create your own design language. Aura Lume is open, flexible, and built for the future.
            </p>
              <div style={{ alignItems: 'center', display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', marginTop: '2rem' }}>
                <p
                  title="copy"
                  style={{
                    backgroundColor: 'gray',
                    padding: '3px 6px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: 'white',
                    fontFamily: 'monospace',
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center'
                  }}
                  onClick={copy}
                >
                  npm install auralume-ui@latest
                  {copied && <div
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: "#24fc03",
                      maskImage: "url(https://cdn.jsdelivr.net/gh/Aditya02git/Icons/check.png)",
                      WebkitMaskImage: "url(https://cdn.jsdelivr.net/gh/Aditya02git/Icons/check.png)",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                    }}
                  ></div>
                  }</p>         
              </div>
            <div style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? '15px' : '10px',
              alignItems: 'center',
              marginTop: '20px',
            }}>
              <FluidButton 
                hueAnimation={false}
                hue={200}
                onClick={() => navigate('/docs/introduction')}
              >
                Get Started
              </FluidButton>
              <Button
                variant="secondary"
                size={isMobile ? "medium" : "large"}
                btnColor="transparent"
                style={{
                  borderRadius: '26px',
                  padding: isMobile ? '0.7rem 1.5rem' : '0.9rem 2rem',
                  "--btn-bordercolor": '#70bbe2',
                  "--btn-textcolor": '#70bbe2',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  overflow: 'hidden',
                }}
                onClick={scrollToSection}
              >
                Explore
                <span
                  style={{
                    fontSize: '20px',
                    display: 'inline-block',
                    transition: 'transform 0.3s ease',
                  }}
                  className="arrow"
                >
                  &#8594;
                </span>
              </Button>
            </div>
          </header>
          
          {webglContextLost && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              zIndex: 100,
            }}>
              WebGL context lost. Refresh the page if the animation doesn't restore.
            </div>
          )}
          
          <canvas
            ref={canvasRef}
            id="scene"
            className="clickable"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              willChange: isCanvasVisible ? 'transform' : 'auto',
            }}
          ></canvas>
        </section>

<div style={{background: 'white'}}>
        <section
        id='preview'
          style={{
            minHeight: '100vh',
            padding: isMobile ? '60px 20px' : '100px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '30px' : '40px',
          }}
        >
          <h2 style={{
            fontSize: isMobile ? '36px' : '60px', 
            fontWeight: 'bold', 
            color: primaryColor,
            textAlign: 'center',
          }}>
            Some Examples
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '20px' : '30px',
            alignItems: 'center',
            background: 'white',
            padding: isMobile ? '20px' : '20px 40px',
            borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            width: isMobile ? '90%' : 'auto',
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center', 
              gap: '15px',
              width: isMobile ? '100%' : 'auto',
            }}>
              <label style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#333',
              }}>
                Hue:
              </label>
              <div style={{ position: 'relative', width: isMobile ? '100%' : '200px' }}>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hueValue}
                  onChange={(e) => setHueValue(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    outline: 'none',
                    cursor: 'pointer',
                    background: 'linear-gradient(to right,#ff0000,#ff7f00, #ffff00,  #00ff00,#0000ff, #4b0082,#9400d3,#ff0000)',
                    WebkitAppearance: 'none',
                    appearance: 'none',
                  }}
                />
              </div>
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: secondaryColor,
                minWidth: '45px',
                textAlign: 'center',
              }}>
                {hueValue}°
              </span>
            </div>

            <div style={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center', 
              gap: '15px',
              width: isMobile ? '100%' : 'auto',
            }}>
              <label style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#333',
              }}>
                Brightness:
              </label>
              <div style={{ position: 'relative', width: isMobile ? '100%' : '200px' }}>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={brightnessValue}
                  onChange={(e) => setBrightnessValue(Number(e.target.value))}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    outline: 'none',
                    cursor: 'pointer',
                    background: 'linear-gradient(to right, #000000, #808080, #ffffff)',
                    WebkitAppearance: 'none',
                    appearance: 'none',
                  }}
                />
              </div>
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: secondaryColor,
                minWidth: '45px',
                textAlign: 'center',
              }}>
                {brightnessValue}%
              </span>
            </div>
          </div>

          <style>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              border: 2px solid ${primaryColor};
            }
            
            input[type="range"]::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              border: 2px solid ${secondaryColor};
            }
          `}</style>

          <div
            ref={gridContainerRef}
            style={{
              position: 'relative',
              width: isMobile ? '100%' : '1440px',
              height: isMobile ? 'auto' : '1440px',
              display: isMobile ? 'flex' : 'block',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'center' : 'flex-start',
              padding: isMobile ? '10 10px' : '0',
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div
                key={index}
                className="grid-item"
                style={getGridItemStyle(index)}
              >
                {getGridItemContent(index)}
              </div>
            ))}
          </div>
          <button className='shake-button' style={{
            width: isMobile ? '100px' : '120px',
            height: isMobile ? '50px' : '60px',
            borderRadius: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px',
            boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)',
            cursor: 'pointer',
            color: primaryColor,
            fontSize: isMobile ? '14px' : '16px',
          }}
          onClick={() => navigate('/components/accordions')}>
            show more
          </button>
        </section>

        <ScrollScaleText/>
        <section style={{padding: '10rem'}}></section>

<ScrollVideoAnimation/>

<ScrollFadeText/>
<WaterDropScroller/>
     <section style={{padding: '10rem' }}></section>

<ScrollTextFill/>

<section style={{margin: isMobile ? '2rem 1rem' : '4rem'}}>
<h1
  style={{
    fontSize: isMobile ? "36px" : "60px",
    textAlign: "center",
    marginBottom: "2rem",
    lineHeight: "1.1",
  }}
>
  <span style={{ display: "inline-block", textAlign: "center" }}>
    <div style={{display: 'flex' , flexDirection: isMobile ? 'column' : 'row', gap: '12px', alignItems: 'center'}}><b>Start Building</b>
    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
      <b>Now</b>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={isMobile ? "30" : "55"}
        height={isMobile ? "30" : "55"}
        viewBox="0 0 510.842 510.843"
        xmlSpace="preserve"
        style={{
          display: "inline-block",
          verticalAlign: "middle",
          marginTop: "2px", // tweak vertical alignment
        }}
      >
        <defs>
          <pattern
            id="textureFill"
            patternUnits="objectBoundingBox"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <image
              href="https://cdn.jsdelivr.net/gh/Aditya02git/Textures-v1/inkpaint.jpg"
              x="0"
              y="0"
              width="1"
              height="1"
              preserveAspectRatio="none"
            />
          </pattern>
        </defs>
        <g>
          <g>
            <path
              d="M214.646,412.929c-4.425,0-8.011,3.586-8.011,8.011v81.892c0,4.425,3.586,8.012,8.011,8.012h81.891
              c4.426,0,8.012-3.587,8.012-8.012v-81.886c0-4.425-3.586-8.011-8.012-8.011h-81.891V412.929z"
              fill="url(#textureFill)"
            />
            <path
              d="M235.901,379.128h39.382c4.424,0,8.359-3.568,8.781-7.975l24.322-251.281V8.011c0-4.425-3.588-8.011-8.012-8.011h-89.909
              c-4.425,0-8.011,3.586-8.011,8.011v111.861l24.657,251.287C227.542,375.56,231.477,379.128,235.901,379.128z"
              fill="url(#textureFill)"
            />
          </g>
        </g>
      </svg>
    </div>
    </div>
  </span>
</h1>

          <p style={{ 
          fontSize: '18px', 
          textAlign: 'center', 
          justifyContent: 'center', 
          display: 'flex',
          fontWeight: '600',
          color: 'gray'
        }}>
          Start With Aura Lume<br />
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Tab 
            defaultTab={0}
            onTabChange={(index) => console.log(`Switched to tab ${index}`)}
            maxWidth='600px'
            showCopy={true}
          >
            <TabPanel label={
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <svg className="max-lg:hidden" width="14" height="14" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                    <path d="m0 256v-256h256v256z" fill="#c12127"></path>
                    <path d="m48 48h160v160h-32v-128h-48v128h-80z" fill="#fff"></path>
                  </svg>
                  NPM
                </div>
              </>
            }>
              npm i -D auralume-ui@latest
            </TabPanel>

            <TabPanel label={
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <svg className="max-lg:hidden" width="14" height="14" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30,10.75H21.251V2H30Z" style={{fill: '#f9ad00'}}></path>
                    <path d="M20.374,10.75h-8.75V2h8.75Z" style={{fill: '#f9ad00'}}></path>
                    <path d="M10.749,10.75H2V2h8.749Z" style={{fill: '#f9ad00'}}></path>
                    <path d="M30,20.375H21.251v-8.75H30Z" style={{fill: '#f9ad00'}}></path>
                    <path d="M20.374,20.375h-8.75v-8.75h8.75Z" fill="currentColor"></path>
                    <path d="M20.374,30h-8.75V21.25h8.75Z" fill="currentColor"></path>
                    <path d="M30,30H21.251V21.25H30Z" fill="currentColor"></path>
                    <path d="M10.749,30H2V21.25h8.749Z" fill="currentColor"></path>
                  </svg>
                  PNPM
                </div>
              </>
            }>
              pnpm add -D auralume-ui@latest
            </TabPanel>

            <TabPanel label={
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <svg className="max-lg:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="#117cad" stroke="none">
                      <path d="M17.845 19.308c-1.268 .814 -2.41 1.254 -3.845 1.692c-.176 .21 -.645 .544 -.912 .588a42.469 42.469 0 0 1 -4.498 .412c-.812 .006 -1.31 -.214 -1.447 -.554c-.115 -.279 .336 -2.054 .298 -1.964c-.157 .392 -.575 1.287 -.997 1.72c-.579 .6 -1.674 .4 -2.322 .051c-.71 -.386 -.07 -1.28 -.346 -1.267c-.276 .014 -.776 -1.486 -.776 -2.236c0 -.828 .622 -1.674 1.235 -2.211a6.811 6.811 0 0 1 .46 -3.143a7.414 7.414 0 0 1 2.208 -2.615s-1.353 -1.534 -.849 -2.912c.328 -.902 .46 -.895 .567 -.935c.38 -.12 .727 -.33 1.013 -.612c.78 -.88 1.96 -1.438 3.116 -1.322c0 0 .781 -2.43 1.533 -1.936c.415 .653 .671 1.218 .967 1.936c0 0 1.15 -.7 1.25 -.5c.514 1.398 .487 3.204 .211 4.67c-.324 1.408 -.84 2.691 -1.711 3.83c-.094 .16 .98 .705 1.722 2.812c.686 1.928 .278 2.438 .278 2.688s.716 .144 2.296 -.855a5.848 5.848 0 0 1 2.984 -1.145c.735 -.066 .988 -.035 1.22 1c.232 1.035 -.346 1.406 -.744 1.506c0 0 -2.09 .675 -2.911 1.302z"></path>
                    </g>
                  </svg>
                  Yarn
                </div>
              </>
            }>
              yarn add -D auralume-ui@latest
            </TabPanel>

            <TabPanel label={
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <svg className="max-lg:hidden" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 70">
                    <g id="Body">
                      <path id="Background" d="M73,35.7c0,15.21-15.67,27.54-35,27.54S3,50.91,3,35.7C3,26.27,9,17.94,18.22,13S33.18,3,38,3s8.94,4.13,19.78,10C67,17.94,73,26.27,73,35.7Z" style={{fill: '#fbf0df'}}></path>
                      <path id="Outline" d="M38,65.75C17.32,65.75.5,52.27.5,35.7c0-10,6.18-19.33,16.53-24.92,3-1.6,5.57-3.21,7.86-4.62,1.26-.78,2.45-1.51,3.6-2.19C32,1.89,35,.5,38,.5s5.62,1.2,8.9,3.14c1,.57,2,1.19,3.07,1.87,2.49,1.54,5.3,3.28,9,5.27C69.32,16.37,75.5,25.69,75.5,35.7,75.5,52.27,58.68,65.75,38,65.75ZM38,3c-2.42,0-5,1.25-8.25,3.13-1.13.66-2.3,1.39-3.54,2.15-2.33,1.44-5,3.07-8,4.7C8.69,18.13,3,26.62,3,35.7,3,50.89,18.7,63.25,38,63.25S73,50.89,73,35.7C73,26.62,67.31,18.13,57.78,13,54,11,51.05,9.12,48.66,7.64c-1.09-.67-2.09-1.29-3-1.84C42.63,4,40.42,3,38,3Z"></path>
                    </g>
                    <g id="Mouth">
                      <g id="Background-2" data-name="Background">
                        <path d="M45.05,43a8.93,8.93,0,0,1-2.92,4.71,6.81,6.81,0,0,1-4,1.88A6.84,6.84,0,0,1,34,47.71,8.93,8.93,0,0,1,31.12,43a.72.72,0,0,1,.8-.81H44.26A.72.72,0,0,1,45.05,43Z" style={{fill: '#b71422'}}></path>
                      </g>
                    </g>
                    <g id="Face">
                      <path id="Eyes" d="M25.7,38.8a5.51,5.51,0,1,0-5.5-5.51A5.51,5.51,0,0,0,25.7,38.8Zm24.77,0A5.51,5.51,0,1,0,45,33.29,5.5,5.5,0,0,0,50.47,38.8Z" style={{fillRule: 'evenodd'}}></path>
                      <path id="Iris" d="M24,33.64a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,24,33.64Zm24.77,0a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,48.75,33.64Z" style={{fill: '#fff', fillRule: 'evenodd'}}></path>
                    </g>
                  </svg>
                  Bun
                </div>
              </>
            }>
              bun add -D auralume-ui@latest
            </TabPanel>

            <TabPanel label={
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <svg className="peer-checked:text-neutral-content! text-base-content max-lg:hidden" width="14" height="14" viewBox="0 0 401 401" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(7.12289,0.543899,-0.543899,7.12289,-4887.56,-1060.49)">
                      <path fill="currentColor" d="M732.64,127.358C737.384,127.229 742.158,124.731 743.368,120.393C744.578,116.055 743.665,111.926 737.977,109.842C732.289,107.757 729.523,104.974 724.945,103.517C721.954,102.565 718.779,103.508 715.604,105.593C707.053,111.209 700.244,127.409 705.034,141.571C705.102,141.765 705.029,141.979 704.857,142.092C704.686,142.204 704.459,142.184 704.309,142.044C698.919,136.94 695.554,129.718 695.554,121.716C695.554,106.264 708.099,93.719 723.551,93.719C739.002,93.719 751.547,106.264 751.547,121.716C751.547,128.205 749.335,134.181 745.623,138.931C742.768,142.35 738.929,144.066 735.631,144.259C733.24,144.399 730.832,143.627 729.111,142.361C726.654,140.551 725.549,138.353 725.037,135.844C724.909,135.221 724.825,133.502 725.062,132.289C725.238,131.385 725.727,129.627 726.576,128.81C725.481,128.435 724.042,127.545 723.575,127.101C723.461,126.992 723.461,126.807 723.546,126.674C723.63,126.54 723.793,126.478 723.945,126.52C724.88,126.763 726.013,126.986 727.198,127.093C728.756,127.233 730.694,127.41 732.64,127.358ZM721.316,105.751C722.813,105.518 724.225,106.703 724.582,108.395C725.058,110.649 724.402,113.065 721.658,113.329C719.314,113.555 718.422,111.242 718.468,109.796C718.513,108.35 719.525,106.03 721.316,105.751Z"></path>
                    </g>
                  </svg>
                  Deno
                </div>
              </>
            }>
              deno i -D npm:auralume-ui@latest
            </TabPanel>
          </Tab>
        </div>

        <p style={{ 
          fontSize: '18px', 
          textAlign: 'center', 
          justifyContent: 'center', 
          display: 'flex',
          fontWeight: '600',
          color: 'gray'
        }}>
          Start With Aura Lume Three<br />
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Tab 
            defaultTab={0}
            onTabChange={(index) => console.log(`Switched to tab ${index}`)}
            maxWidth='600px'
            showCopy={true}
          >
            <TabPanel label={
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <svg className="max-lg:hidden" width="14" height="14" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                    <path d="m0 256v-256h256v256z" fill="#c12127"></path>
                    <path d="m48 48h160v160h-32v-128h-48v128h-80z" fill="#fff"></path>
                  </svg>
                  NPM
                </div>
              </>
            }>
              npm i -D auralume-three-ui@latest
            </TabPanel>

            <TabPanel label={
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <svg className="max-lg:hidden" width="14" height="14" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30,10.75H21.251V2H30Z" style={{fill: '#f9ad00'}}></path>
                    <path d="M20.374,10.75h-8.75V2h8.75Z" style={{fill: '#f9ad00'}}></path>
                    <path d="M10.749,10.75H2V2h8.749Z" style={{fill: '#f9ad00'}}></path>
                    <path d="M30,20.375H21.251v-8.75H30Z" style={{fill: '#f9ad00'}}></path>
                    <path d="M20.374,20.375h-8.75v-8.75h8.75Z" fill="currentColor"></path>
                    <path d="M20.374,30h-8.75V21.25h8.75Z" fill="currentColor"></path>
                    <path d="M30,30H21.251V21.25H30Z" fill="currentColor"></path>
                    <path d="M10.749,30H2V21.25h8.749Z" fill="currentColor"></path>
                  </svg>
                  PNPM
                </div>
              </>
            }>
              pnpm add -D auralume-three-ui@latest
            </TabPanel>

            <TabPanel label={
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <svg className="max-lg:hidden" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="#117cad" stroke="none">
                      <path d="M17.845 19.308c-1.268 .814 -2.41 1.254 -3.845 1.692c-.176 .21 -.645 .544 -.912 .588a42.469 42.469 0 0 1 -4.498 .412c-.812 .006 -1.31 -.214 -1.447 -.554c-.115 -.279 .336 -2.054 .298 -1.964c-.157 .392 -.575 1.287 -.997 1.72c-.579 .6 -1.674 .4 -2.322 .051c-.71 -.386 -.07 -1.28 -.346 -1.267c-.276 .014 -.776 -1.486 -.776 -2.236c0 -.828 .622 -1.674 1.235 -2.211a6.811 6.811 0 0 1 .46 -3.143a7.414 7.414 0 0 1 2.208 -2.615s-1.353 -1.534 -.849 -2.912c.328 -.902 .46 -.895 .567 -.935c.38 -.12 .727 -.33 1.013 -.612c.78 -.88 1.96 -1.438 3.116 -1.322c0 0 .781 -2.43 1.533 -1.936c.415 .653 .671 1.218 .967 1.936c0 0 1.15 -.7 1.25 -.5c.514 1.398 .487 3.204 .211 4.67c-.324 1.408 -.84 2.691 -1.711 3.83c-.094 .16 .98 .705 1.722 2.812c.686 1.928 .278 2.438 .278 2.688s.716 .144 2.296 -.855a5.848 5.848 0 0 1 2.984 -1.145c.735 -.066 .988 -.035 1.22 1c.232 1.035 -.346 1.406 -.744 1.506c0 0 -2.09 .675 -2.911 1.302z"></path>
                    </g>
                  </svg>
                  Yarn
                </div>
              </>
            }>
              yarn add -D auralume-three-ui@latest
            </TabPanel>

            <TabPanel label={
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <svg className="max-lg:hidden" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 70">
                    <g id="Body">
                      <path id="Background" d="M73,35.7c0,15.21-15.67,27.54-35,27.54S3,50.91,3,35.7C3,26.27,9,17.94,18.22,13S33.18,3,38,3s8.94,4.13,19.78,10C67,17.94,73,26.27,73,35.7Z" style={{fill: '#fbf0df'}}></path>
                      <path id="Outline" d="M38,65.75C17.32,65.75.5,52.27.5,35.7c0-10,6.18-19.33,16.53-24.92,3-1.6,5.57-3.21,7.86-4.62,1.26-.78,2.45-1.51,3.6-2.19C32,1.89,35,.5,38,.5s5.62,1.2,8.9,3.14c1,.57,2,1.19,3.07,1.87,2.49,1.54,5.3,3.28,9,5.27C69.32,16.37,75.5,25.69,75.5,35.7,75.5,52.27,58.68,65.75,38,65.75ZM38,3c-2.42,0-5,1.25-8.25,3.13-1.13.66-2.3,1.39-3.54,2.15-2.33,1.44-5,3.07-8,4.7C8.69,18.13,3,26.62,3,35.7,3,50.89,18.7,63.25,38,63.25S73,50.89,73,35.7C73,26.62,67.31,18.13,57.78,13,54,11,51.05,9.12,48.66,7.64c-1.09-.67-2.09-1.29-3-1.84C42.63,4,40.42,3,38,3Z"></path>
                    </g>
                    <g id="Mouth">
                      <g id="Background-2" data-name="Background">
                        <path d="M45.05,43a8.93,8.93,0,0,1-2.92,4.71,6.81,6.81,0,0,1-4,1.88A6.84,6.84,0,0,1,34,47.71,8.93,8.93,0,0,1,31.12,43a.72.72,0,0,1,.8-.81H44.26A.72.72,0,0,1,45.05,43Z" style={{fill: '#b71422'}}></path>
                      </g>
                    </g>
                    <g id="Face">
                      <path id="Eyes" d="M25.7,38.8a5.51,5.51,0,1,0-5.5-5.51A5.51,5.51,0,0,0,25.7,38.8Zm24.77,0A5.51,5.51,0,1,0,45,33.29,5.5,5.5,0,0,0,50.47,38.8Z" style={{fillRule: 'evenodd'}}></path>
                      <path id="Iris" d="M24,33.64a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,24,33.64Zm24.77,0a2.07,2.07,0,1,0-2.06-2.07A2.07,2.07,0,0,0,48.75,33.64Z" style={{fill: '#fff', fillRule: 'evenodd'}}></path>
                    </g>
                  </svg>
                  Bun
                </div>
              </>
            }>
              bun add -D auralume-three-ui@latest
            </TabPanel>

            <TabPanel label={
              <>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <svg className="peer-checked:text-neutral-content! text-base-content max-lg:hidden" width="14" height="14" viewBox="0 0 401 401" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g transform="matrix(7.12289,0.543899,-0.543899,7.12289,-4887.56,-1060.49)">
                      <path fill="currentColor" d="M732.64,127.358C737.384,127.229 742.158,124.731 743.368,120.393C744.578,116.055 743.665,111.926 737.977,109.842C732.289,107.757 729.523,104.974 724.945,103.517C721.954,102.565 718.779,103.508 715.604,105.593C707.053,111.209 700.244,127.409 705.034,141.571C705.102,141.765 705.029,141.979 704.857,142.092C704.686,142.204 704.459,142.184 704.309,142.044C698.919,136.94 695.554,129.718 695.554,121.716C695.554,106.264 708.099,93.719 723.551,93.719C739.002,93.719 751.547,106.264 751.547,121.716C751.547,128.205 749.335,134.181 745.623,138.931C742.768,142.35 738.929,144.066 735.631,144.259C733.24,144.399 730.832,143.627 729.111,142.361C726.654,140.551 725.549,138.353 725.037,135.844C724.909,135.221 724.825,133.502 725.062,132.289C725.238,131.385 725.727,129.627 726.576,128.81C725.481,128.435 724.042,127.545 723.575,127.101C723.461,126.992 723.461,126.807 723.546,126.674C723.63,126.54 723.793,126.478 723.945,126.52C724.88,126.763 726.013,126.986 727.198,127.093C728.756,127.233 730.694,127.41 732.64,127.358ZM721.316,105.751C722.813,105.518 724.225,106.703 724.582,108.395C725.058,110.649 724.402,113.065 721.658,113.329C719.314,113.555 718.422,111.242 718.468,109.796C718.513,108.35 719.525,106.03 721.316,105.751Z"></path>
                    </g>
                  </svg>
                  Deno
                </div>
              </>
            }>
              deno i -D npm:auralume-three-ui@latest
            </TabPanel>
          </Tab>
        </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Button variant='primary'  onClick={() => navigate('/docs/installation')}>Install guide</Button>
        </div>
</section>


{/* Footer */}

<section style={{
  // margin: isMobile ? '2rem 1rem' : '8rem',
  // padding: isMobile ? '1rem' : '2rem',
  backgroundColor: "#eaeff5"
}}>
  <div style={{margin: isMobile ? '2rem 1rem' : '8rem',padding: isMobile ? '1rem' : '2rem',}}><FooterMain/></div>

</section>
</div>
      </main>
    </div>
  );
};

export default Home;