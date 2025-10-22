import React, { useState, useEffect } from "react";
import "./index.css";
import { Button } from "../src";
import CardSection from "../demo/Sections/CardSection";
import InfiniteScrollerSection from "./Sections/InfiniteScrollerSection";
import AccordionSection from "./Sections/AccordionSection";
import AlertDialogSection from "./Sections/AlertDialogSection";
import DialogSection from "./Sections/DialogSection";
import ToastSection from "./Sections/ToastSection";
import AvatarSection from "./Sections/AvatarSection";
import BadgeSection from "./Sections/BadgeSection";
import BreadcrumbSection from "./Sections/BreadcrumbSection";
import CalendarSection from "./Sections/CalendarSection";
import CarouselSection from "./Sections/CarouselSection";
import SwitchSection from "./Sections/SwitchSection";
import ChartSection from "./Sections/ChartSection";
import CheckboxSection from "./Sections/CheckboxSection";
import SkeletonLoaderSection from "./Sections/SkeletonLoaderSection";
import TooltipSection from "./Sections/TooltipSection";
import AnimatedCardSection from "./Sections/AnimatedCardSection";
import DropdownSection from "./Sections/DropdownSection";
import SidebarSection from "./Sections/SidebarSection";
import ContextMenuSection from "./Sections/ContextMenuSection";
import ReactHookFormSection from "./Sections/ReactHookFormSection";
import InputSection from "./Sections/InputSection";
import InputOTPSection from "./Sections/InputOTPSection";
import PaginationSection from "./Sections/PaginationSection";
import SearchBarSection from "./Sections/SearchBarSection";
import ProgressBarSection from "./Sections/ProgressBarSection";
import RadioGroupSection from "./Sections/RadioGroupSection";
import ResizableSection from "./Sections/ResizableSection";
import TabSection from "./Sections/TabSection";
import TextAreaSection from "./Sections/TextAreaSection";
import ToggleGroupSection from "./Sections/ToggleGroupSection";
import NavbarSection from "./Sections/NavbarSection";
import TimelineSection from "./Sections/TimelineSection";
import TreeSection from "./Sections/TreeSection";
import TrieSearchSection from "./Sections/TrieSearchSection";
import FooterSection from "./Sections/FooterSection";
import DataTableSection from "./Sections/DataTableSection";
import ActivityGridSection from "./Sections/ActivityGridSection";
import TypographySection from "./Sections/TypographySection";
import MatrixSection from "./Sections/MatrixSection";
import CodeBlockSection from "./Sections/CodeBlockSection";
import PricingCardSection from "./Sections/PricingCardSection";
import SliderSection from "./Sections/SliderSection";
import RadarChartSection from "./Sections/RadarChartSection";
import SkillbarSection from "./Sections/SkillbarSection";
import ConfettiButtonSection from "./Sections/ConfettiButtonSection";
import AuthSection from "./Sections/AuthSection";
import CardScapeSection from "./Sections/CardScapeSection";
import ChatBoxSection from "./Sections/ChatBoxSection";
import InfiniteGallerySection from "./Sections/InfiniteGallerySection";
import RoadmapSection from "./Sections/RoadmapSection";
import ButtonSection from "./Sections/ButtonSection";
import GlowTrackButtonSection from "./Sections/GlowTrackButtonSection";
import AnimatedBorderButtonSection from "./Sections/AnimatedBorderButtonSection";
import CounterSection from "./Sections/CounterSection";
import ShineTextSection from "./Sections/ShineTextSection";
import TestimonialSection from "./Sections/TestimonialSection";
import GradientTextSection from "./Sections/GradientTextSection";
import EndlessReviewSection from "./Sections/EndlessReviewSection";
import ThreeDCardSection from "./Sections/ThreeDCardSection";
import PolyhedraSection from "./Sections/PolyhedraSection";
import BlobSection from "./Sections/BlobSection";
import FireEffectSection from "./Sections/FireEffectSection";
import WaterEffectSection from "./Sections/WaterEffectSection";
import FireFliesSection from "./Sections/FireFliesSection";
import CloudSection from "./Sections/CloudSection";
import RainEffectSection from "./Sections/RainEffectSection";
import SmokeEffectSection from "./Sections/SmokeEffectSection";
import GradientText from "../src/components/GradientText/GradientText";
import Introduction from "./pages/Introduction";
import Installation from "./pages/Installation";
// import CDN from "./pages/CDN";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import FabIconSection from "./Sections/FabIconSection";
import VHSSection from "./Sections/VHSSection";
import CRTSection from "./Sections/CRTSection";
import ChromaticSplitSection from "./Sections/ChromaticSplitSection";
import FluidButtonSection from "./Sections/FluidButtonSection";
import Astro from "./installations/Astro";
import Manual from "./installations/Manual";
import Nextjs from "./installations/Nextjs";
import ReactRouter from "./installations/ReactRouter";
import Vite from "./installations/Vite";
import Laravel from "./installations/Laravel";
import ThemeGenerator from "./playground/ThemeGenerator";
import Store from "./store/Store";
import Blog from "./blogs/Blog";
import Resource from "./resources/Resource";
import ThreeBarSection from "./Sections/ThreeBarSection";
import GradientBackgroundSection from "./Sections/GradientBackgroundSection";
import LinkPreviewSection from "./Sections/LinkPreviewSection";
import FocusCardSection from "./Sections/FocusCardSection";
import SpotLightCardSection from "./Sections/SpotLightCardSection";
import CosmicCardSection from "./Sections/CosmicCardSection";
import LumeButtonSection from "./Sections/LumeButtonSection";
import FakeShaderSection from "./Sections/FakeShaderSection";
import NormalTheming from "./theming/NormalTheming";
import MultiTheming from "./theming/MultiTheming";
import CustomTheming from "./theming/CustomTheming";
import SmoothBlobSection from "./Sections/SmoothBlobSection";
import ThemeButtonSection from "./Sections/ThemeButtonSection";
import WindEffectSection from "./Sections/WindEffectSection";
import AuroraBackgroundSection from "./Sections/AuroraBackgroundSection";
import SpotlightBackgroundSection from "./Sections/SpotlightBackgroundSection";
import WaveBackgroundSection from "./Sections/WaveBackgroundSection";
import TileBackgroundSection from "./Sections/TileBackgroundSection";
import GlassmorphicBackgroundSection from "./Sections/GlassmorphicBackgroundSection";
import CosmicBackgroundSection from "./Sections/CosmicBackgroundSection";
import StellarBackgroundSection from "./Sections/StellarBackgroundSection";
import NoiseBackgroundSection from "./Sections/NoiseBackgroundSection";
import WispSmokeEffectSection from "./Sections/WispSmokeEffectSection";
import LeafSection from "./Sections/LeafSection";
import SolarBackgroundSection from "./Sections/SolarBackgroundSection";
import HaloBackgroundSection from "./Sections/HaloBackgroundSection";
import Initialization from "./threejs/Initialization";
import GlitchTextSection from "./Sections/GlitchTextSection";
import ThemeLib from "./theming/ThemeLib";
import TextMaskSection from "./Sections/TextMaskSection";

function DocsLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({
    docs: true,
    components: false,
    background: false,
    shader: false,
    threejs: false,
    theming: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get active section from URL path
  const getActiveSectionFromPath = () => {
    const path = location.pathname;
    
    // Handle root docs path
    if (path === "/docs" || path === "/docs/") return "introduction";
    
    // Extract the last segment for section identification
    const segments = path.split('/').filter(Boolean);
    return segments[segments.length - 1] || "introduction";
  };

  const activeSection = getActiveSectionFromPath();

  // Enhanced navigation helper that creates proper nested routes
  const navigateToSection = (sectionId, parentSection = null) => {
    // Map sections to their parent categories
      if (['store', 'blog', 'resource'].includes(sectionId)) {
    navigate(`/${sectionId}`);
    return;
  }
    const sectionParentMap = {
      // Docs section items
      introduction: 'docs',
      installation: 'docs', 
      // cdn: 'docs',
      astro: 'docs',
      laravel: 'docs',
      manual: 'docs',
      nextjs: 'docs',
      reactrouter: 'docs',
      vite: 'docs',
      // Components
      accordions: 'components',
      activityGrids: 'components',
      alertDialogs: 'components',
      avatars: 'components',
      animatedCards: 'components',
      animatedBorderButtons: 'components',
      auths: 'components',
      badges: 'components',
      breadcrumbs: 'components',
      buttons: 'components',
      calendars: 'components',
      cards: 'components',
      cardscapes: 'components',
      carousels: 'components',
      chatBoxes: 'components',
      charts: 'components',
      checkboxes: 'components',
      codeblocks: 'components',
      contextMenus: 'components',
      confettiButtons: 'components',
      cosmicCards: 'components',
      counters: 'components',
      dataTables: 'components',
      drawers: 'components',
      dialogs: 'components',
      endlessReviews: 'components',
      fabIcons: 'components',
      focusCards: 'components',
      fluidButtons: 'components',
      footers: 'components',
      glowButtons: 'components',
      gradientTexts: 'components',
      reactHookForms: 'components',
      inputs: 'components',
      inputotps: 'components',
      infiniteScrollers: 'components',
      infiniteGallery: 'components',
      linkPreviews: 'components',
      lumeButtons: 'components',
      navigationMenus: 'components',
      paginations: 'components',
      pricingCards: 'components',
      progressbars: 'components',
      radioGroups: 'components',
      radarCharts: 'components',
      resizables: 'components',
      roadmaps: 'components',
      searchbars: 'components',
      shinetexts: 'components',
      sidebars: 'components',
      skillbars: 'components',
      skeletons: 'components',
      sliders: 'components',
      spotlightCards: 'components',
      switches: 'components',
      tabs: 'components',
      testimonials: 'components',
      textAreas: 'components',
      textMasks: 'components',
      threeDCards: 'components',
      timelines: 'components',
      trees: 'components',
      trieSearches: 'components',
      toasts: 'components',
      themeButtons: 'components',
      toggleGroups: 'components',
      tooltips: 'components',
      typographies: 'components',
      // Background effects
      gradientBackgrounds: 'background',
      spotlightBackgrounds: 'background',
      auroraBackgrounds: 'background',
      cosmicBackgrounds: 'background',
      haloBackgrounds: 'background',
      glassmorphicBackgrounds: 'background',
      matrixBackgrounds: 'background',
      noiseBackgrounds: 'background',
      solarBackgrounds: 'background',
      stellarBackgrounds: 'background',
      tileBackgrounds: 'background',
      waveBackgrounds: 'background',
      // Shader effects
      fakeShaders: 'shader',
      glitchTexts: 'shader',
      vhs: 'shader',
      crts: 'shader',
      chromaticSplits: 'shader',
      // Three.js effects
      initializations: 'threejs',
      polyhedras: 'threejs',
      blobs: 'threejs',
      smoothBlobs: 'threejs',
      threeBars: 'threejs',
      smokeEffects: 'threejs',
      fireEffects: 'threejs',
      leafs: 'threejs',
      waterEffects: 'threejs',
      windEffects: 'threejs',
      fireFlies: 'threejs',
      clouds: 'threejs',
      rainEffects: 'threejs',
      wispSmokeEffects: 'threejs',

      themeLibraries: 'theming',
      normalThemes: 'theming',
      multiThemes: 'theming',
      customThemes: 'theming',

      store : 'store',
      blog: 'blog',
      resource: 'resource'
    };

    const parent = parentSection || sectionParentMap[sectionId];
    
    if (parent && parent !== 'docs') {
      // Navigate to nested route structure
      navigate(`/${parent}/${sectionId}`);
    } else {
      // Navigate to docs route
      navigate(`/docs/${sectionId}`);
    }
  };

  // Auto-expand sections based on active route
  useEffect(() => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    // Determine which section should be expanded based on URL structure
    if (segments.length >= 2) {
      const parentSection = segments[0]; // e.g., 'components', 'background', etc.
      
      setExpandedSections(prev => ({
        ...prev,
        [parentSection]: true
      }));
    } else if (path.startsWith('/docs')) {
      setExpandedSections(prev => ({
        ...prev,
        docs: true
      }));
    }
  }, [location.pathname]);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const navigationStructure = {
    main: [
      {
        id: "docs",
        name: "Docs",
        icon: (
          <svg
            height="20"
            width="20"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="fileGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>
            
            {/* All paths go here, the gradient is applied via the parent <g> */}
            <g fill="url(#fileGradient)">
              {/* Main file body path */}
              <path d="M463.996,126.864L340.192,3.061C338.231,1.101,335.574,0,332.803,0H95.726C67.724,0,44.944,22.782,44.944,50.784v410.434
                c0,28.001,22.781,50.783,50.783,50.783h320.547c28.002,0,50.783-22.781,50.783-50.783V134.253
                C467.056,131.482,465.955,128.824,463.996,126.864z M343.255,35.679l88.127,88.126H373.14c-7.984,0-15.49-3.109-21.134-8.753
                c-5.643-5.643-8.752-13.148-8.751-21.131V35.679z M446.158,461.217c0,16.479-13.406,29.885-29.884,29.885H95.726
                c-16.479,0-29.885-13.406-29.885-29.885V50.784c0.001-16.479,13.407-29.886,29.885-29.886h226.631v73.021
                c-0.002,13.565,5.28,26.318,14.871,35.909c9.592,9.592,22.345,14.874,35.911,14.874h73.018V461.217z"/>
                
              {/* Content line 1 part 1 */}
              <path d="M275.092,351.492h-4.678c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449h4.678
                c5.77,0,10.449-4.678,10.449-10.449S280.862,351.492,275.092,351.492z"/>

              {/* Content line 1 part 2 */}
              <path d="M236.61,351.492H135.118c-5.77,0-10.449,4.678-10.449,10.449s4.679,10.449,10.449,10.449H236.61
                c5.77,0,10.449-4.678,10.449-10.449S242.381,351.492,236.61,351.492z"/>

              {/* Content line 2 */}
              <path d="M376.882,303.747H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763
                c5.77,0,10.449-4.678,10.449-10.449C387.331,308.425,382.652,303.747,376.882,303.747z"/>

              {/* Content line 3 */}
              <path d="M376.882,256H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763
                c5.77,0,10.449-4.678,10.449-10.449C387.331,260.678,382.652,256,376.882,256z"/>

              {/* Content line 4 */}
              <path d="M376.882,208.255H135.119c-5.77,0-10.449,4.678-10.449,10.449c0,5.771,4.679,10.449,10.449,10.449h241.763
                c5.77,0,10.449-4.678,10.449-10.449S382.652,208.255,376.882,208.255z"/>
            </g>
          </svg>
        ),
        type: "dropdown",
        children: [
          { id: "introduction", name: "Introduction" },
          { id: "installation", name: "Installation" },
          // { id: "cdn", name: "CDN" },
          { id: "astro", name: "Astro Installation", hidden: "true" },
          { id: "laravel", name: "Laravel Installation", hidden: "true" },
          { id: "manual", name: "Manual Installation", hidden: "true" },
          { id: "nextjs", name: "Next Js Installation", hidden: "true" },
          { id: "reactrouter", name: "React Router", hidden: "true" },
          { id: "vite", name: "Vite Installation", hidden: "true" },
        ],
      },
      {
        id: "components",
        name: "Components",
        icon: (
          <svg
            height="24"
            width="24"
            viewBox="0 0 32 32" // Using the original viewBox of 32x32
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="shapesGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* Applies the gradient to all paths in the group */}
            <g fill="url(#shapesGradient)">
              {/* The original 'shapes' icon path */}
              <path d="M9.072 15.25h13.855c0.69-0 1.249-0.56 1.249-1.25 0-0.23-0.062-0.446-0.171-0.631l0.003 0.006-6.927-12c-0.237-0.352-0.633-0.58-1.083-0.58s-0.846 0.228-1.080 0.575l-0.003 0.005-6.928 12c-0.105 0.179-0.167 0.395-0.167 0.625 0 0.69 0.56 1.25 1.25 1.25 0 0 0 0 0.001 0h-0zM16 4.5l4.764 8.25h-9.526zM7.838 16.75c-0.048-0.001-0.104-0.002-0.161-0.002-4.005 0-7.252 3.247-7.252 7.252s3.247 7.252 7.252 7.252c0.056 0 0.113-0.001 0.169-0.002l-0.008 0c0.048 0.001 0.104 0.002 0.161 0.002 4.005 0 7.252-3.247 7.252-7.252s-3.247-7.252-7.252-7.252c-0.056 0-0.113 0.001-0.169 0.002l0.008-0zM7.838 28.75c-0.048 0.002-0.103 0.003-0.16 0.003-2.625 0-4.753-2.128-4.753-4.753s2.128-4.753 4.753-4.753c0.056 0 0.112 0.001 0.168 0.003l-0.008-0c0.048-0.002 0.103-0.003 0.16-0.003 2.625 0 4.753 2.128 4.753 4.753s-2.128 4.753-4.753 4.753c-0.056 0-0.112-0.001-0.168-0.003l0.008 0zM28 16.75h-8c-1.794 0.001-3.249 1.456-3.25 3.25v8c0.001 1.794 1.456 3.249 3.25 3.25h8c1.794-0.001 3.249-1.456 3.25-3.25v-8c-0.001-1.794-1.456-3.249-3.25-3.25h-0zM28.75 28c-0 0.414-0.336 0.75-0.75 0.75h-8c-0.414-0-0.75-0.336-0.75-0.75v0-8c0-0.414 0.336-0.75 0.75-0.75h8c0.414 0 0.75 0.336 0.75 0.75v0z"/>
            </g>
          </svg>
        ),
        type: "dropdown",
        children: [
          { id: "accordions", name: "Accordion" },
          { id: "activityGrids", name: "Activity Grid" },
          { id: "alertDialogs", name: "Alert Dialog" },
          { id: "avatars", name: "Avatar" },
          { id: "animatedCards", name: "Animated Card" },
          { id: "animatedBorderButtons", name: "Animated Border Button" },
          { id: "auths", name: "Authentication" },
          { id: "badges", name: "Badge" },
          { id: "breadcrumbs", name: "Breadcrumb" },
          { id: "buttons", name: "Button" },
          { id: "calendars", name: "Calendar" },
          { id: "cards", name: "Card" },
          { id: "cardscapes", name: "Cardscape" },
          { id: "carousels", name: "Carousel" },
          { id: "chatBoxes", name: "Chat Box" },
          { id: "charts", name: "Chart" },
          { id: "checkboxes", name: "Checkbox" },
          { id: "codeblocks", name: "Code Block" },
          { id: "contextMenus", name: "Context Menu" },
          { id: "confettiButtons", name: "Confetti Button" },
          { id: "cosmicCards", name: "Cosmic Card" },
          { id: "counters", name: "Counter Animation" },
          { id: "dataTables", name: "Data Table" },
          { id: "drawers", name: "Dropdown Menu" },
          { id: "dialogs", name: "Dialog" },
          { id: "endlessReviews", name: "Endless Reviews Scroller" },
          { id: "fabIcons", name: "Fab Icon" },
          { id: "focusCards", name: "Focus Card" },
          { id: "fluidButtons", name: "Fluid Button" },
          { id: "footers", name: "Footer" },
          { id: "glowButtons", name: "Glow Button" },
          { id: "gradientTexts", name: "Gradient Text" },
          { id: "reactHookForms", name: "React Hook Form" },
          { id: "inputs", name: "Input" },
          { id: "inputotps", name: "Input OTP" },
          { id: "infiniteScrollers", name: "Infinite Scroller" },
          { id: "infiniteGallery", name: "Infinite Gallery" },
          { id: "linkPreviews", name: "Link Preview" },
          { id: "lumeButtons", name: "Lume Button" },
          { id: "navigationMenus", name: "Navigation Menu" },
          { id: "paginations", name: "Pagination" },
          { id: "pricingCards", name: "Pricing Card" },
          { id: "progressbars", name: "Progress Bar" },
          { id: "radioGroups", name: "Radio Group" },
          { id: "radarCharts", name: "Radar Chart" },
          { id: "resizables", name: "Resizable" },
          { id: "roadmaps", name: "Road Map" },
          { id: "searchbars", name: "Search Bar" },
          { id: "shinetexts", name: "Text Shine Animation" },
          { id: "sidebars", name: "Sidebar" },
          { id: "skillbars", name: "Skillbar" },
          { id: "skeletons", name: "Skeleton" },
          { id: "sliders", name: "Slider" },
          { id: "spotlightCards", name: "SpotLight Card" },
          { id: "switches", name: "Switch" },
          { id: "tabs", name: "Tabs" },
          { id: "testimonials", name: "Testimonial" },
          { id: "textAreas", name: "Text Area" },
          { id: "textMasks", name: "Text Mask" },
          { id: "threeDCards", name: "3D Card" },
          { id: "timelines", name: "Collapsible Timeline" },
          { id: "trees", name: "Tree" },
          { id: "trieSearches", name: "Trie Search" },
          { id: "toasts", name: "Toast" },
          { id: "themeButtons", name: "Theme Button" },
          { id: "toggleGroups", name: "Toggle Group" },
          { id: "tooltips", name: "Tooltip" },
          { id: "typographies", name: "Typography" },
        ],
      },
      {
        id: "background",
        name: "Backgrounds",
        icon: (
          <svg
            height="24"
            width="24"
            viewBox="0 0 512 512" // Using the original viewBox of 512x512
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="celestialGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* Applies the gradient to all paths in the group */}
            <g fill="url(#celestialGradient)">
              {/* The original icon path */}
              <path d="M423.633,185.47l0.07-0.78l-0.442-0.203c0.053-1.726,0.23-3.391,0.23-5.126
            c0-92.494-74.98-167.5-167.491-167.5c-92.494,0-167.508,75.006-167.508,167.5c0,1.762,0.177,3.4,0.23,5.126l-0.425,0.203
            l0.089,0.78C35.914,213.777,0,268.853,0,332.63c0,92.503,75.016,167.509,167.509,167.509c32.283,0,62.228-9.59,87.818-25.422
            l0.673,0.488l0.673-0.488c25.59,15.832,55.535,25.422,87.819,25.422C437.021,500.139,512,425.133,512,332.63
            C512,268.853,476.087,213.777,423.633,185.47z M353.966,81.412c23.589,23.606,38.198,55.739,39.916,91.342
            c-5.702-1.762-11.528-3.241-17.443-4.418l-66.886-116.79C326.269,58.568,341.304,68.759,353.966,81.412z M392.253,202.718
            c-6.659,39.048-29.415,72.526-61.432,93.131c-7.615-33.753-25.359-63.584-49.886-86.198c19.072-9.89,40.571-15.549,63.558-15.549
            C361.316,194.103,377.341,197.237,392.253,202.718z M256,40.806c10.466,0,20.631,1.204,30.424,3.391l69.489,121.376
            c-3.772-0.266-7.579-0.424-11.422-0.424c-7.526,0-14.929,0.567-22.19,1.567l-72.004-125.76
            C252.175,40.877,254.088,40.806,256,40.806z M232.43,42.842l72.837,127.212c-8.943,2.222-17.62,5.162-25.962,8.748L205.706,50.254
            C214.242,46.933,223.168,44.436,232.43,42.842z M190.725,57.143l73.793,128.885c-2.638,1.46-5.278,2.93-7.846,4.507L256,190.056
            l-0.673,0.479c-9.74-6.012-20.118-11.113-31.008-15.141l-58.103-101.49C173.743,67.493,181.941,61.853,190.725,57.143z
            M153.997,85.645l47.62,83.161c-10.945-2.356-22.278-3.64-33.913-3.648l-31.521-55.056
            C141.212,101.281,147.161,93.082,153.997,85.645z M127.558,128.12l21.818,38.065c-10.767,1.213-21.198,3.463-31.256,6.57
            C118.862,157.056,122.138,142.038,127.558,128.12z M119.766,202.718c14.858-5.481,30.902-8.616,47.744-8.616
            c22.986,0,44.502,5.659,63.557,15.549c-24.527,22.614-42.288,52.462-49.868,86.198
            C149.127,275.245,126.371,241.767,119.766,202.718z M256,438.929c-28.954-24.172-47.778-59.652-49.673-99.772
            c15.726,4.922,32.336,7.72,49.673,7.72c17.284,0,33.93-2.798,49.656-7.72C303.761,379.311,284.954,414.782,256,438.929z
            M442.475,430.588c-25.129,25.102-59.679,40.597-97.983,40.597c-22.951,0-44.467-5.658-63.504-15.512
            C314.138,425.115,335,381.286,335,332.63c0-1.726-0.177-3.426-0.23-5.144l0.442-0.221l-0.035-0.718
            c42.059-22.64,73.403-62.503,84.188-110.476c38.304,24.678,63.681,67.621,63.681,116.559
            C483.046,370.935,467.55,405.485,442.475,430.588z"/>
            </g>
          </svg>
        ),
        type: "dropdown",
        children: [
          { id: "gradientBackgrounds", name: "Gradient Background" },
          { id: "spotlightBackgrounds", name: "Spotlight Background" },
          { id: "auroraBackgrounds", name: "Aurora Background" },
          { id: "cosmicBackgrounds", name: "Cosmic Background" },
          { id: "haloBackgrounds", name: "Halo Background" },
          { id: "matrixBackgrounds", name: "Matrix Background" },
          { id: "noiseBackgrounds", name: "Noise Background" },
          { id: "solarBackgrounds", name: "Solar Background" },
          { id: "stellarBackgrounds", name: "Stellar Background" },
          { id: "glassmorphicBackgrounds", name: "Glassmorphic Background" },
          { id: "tileBackgrounds", name: "Tile Background" },
          { id: "waveBackgrounds", name: "Wave Background" },
        ],
      },
      {
        id: "shader",
        name: "Shaders",
        icon: (
          <svg
            height="24"
            width="24"
            viewBox="0 0 16 16" // Using the original viewBox of 16x16
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="circleGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* Applies the gradient to the path */}
            {/* For a single path, you can apply fill directly or use a <g> tag */}
            <path fill="url(#circleGradient)" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13V2a6 6 0 1 1 0 12z"/>
          </svg>
        ),
        type: "dropdown",
        children: [
          { id: "fakeShaders", name: "Fake Shader" },
          { id: "glitchTexts", name: "Glitch Text" },
          { id: "vhs", name: "VHS Effect" },
          { id: "crts", name: "CRT Effect" },
          { id: "chromaticSplits", name: "Chromatic Image" },
        ],
      },
      {
        id: "threejs",
        name: "Three.js",
        icon: (
          <svg
            height="24"
            width="24"
            viewBox="0 0 56 56" // Using the original viewBox of 56x56
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="houseGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* Applies the gradient to the path */}
            <path fill="url(#houseGradient)" d="M 28.0000 26.6406 L 50.0783 14.1016 C 49.7264 13.75 49.3045 13.4688 48.7890 13.1875 L 32.2657 3.7657 C 30.8126 2.9453 29.4063 2.5000 28.0000 2.5000 C 26.5938 2.5000 25.1875 2.9453 23.7344 3.7657 L 7.2110 13.1875 C 6.6954 13.4688 6.2735 13.75 5.9219 14.1016 Z M 26.4063 53.5 L 26.4063 29.4532 L 4.3985 16.8906 C 4.2813 17.4063 4.2110 17.9688 4.2110 18.6719 L 4.2110 36.9297 C 4.2110 40.3281 5.4063 41.5938 7.5860 42.8360 L 25.9375 53.2891 C 26.1016 53.3828 26.2422 53.4532 26.4063 53.5 Z M 29.5938 53.5 C 29.7579 53.4532 29.8985 53.3828 30.0626 53.2891 L 48.4141 42.8360 C 50.5938 41.5938 51.7890 40.3281 51.7890 36.9297 L 51.7890 18.6719 C 51.7890 17.9688 51.7189 17.4063 51.6018 16.8906 L 29.5938 29.4532 Z"/>
          </svg>
        ),
        type: "dropdown",
        children: [
          { id: "initializations", name: "Initialization" },
          { id: "polyhedras", name: "Polyhedra" },
          { id: "blobs", name: "Blob" },
          { id: "smoothBlobs", name: "Smooth Blob" },
          { id: "threeBars", name: "3d Bar Chart" },
          { id: "smokeEffects", name: "Smoke" },
          { id: "fireEffects", name: "Fire" },
          { id: "leafs", name: "Leaves" },
          { id: "waterEffects", name: "Water" },
          { id: "windEffects", name: "Wind" },
          { id: "fireFlies", name: "Fireflies" },
          { id: "clouds", name: "Cloud" },
          { id: "rainEffects", name: "Rain" },
          { id: "wispSmokeEffects", name: "Wisp Smoke " },
        ],
      },
      {
        id: "theming",
        name: "Themes",
        icon: (
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24" // Using the original viewBox of 24x24
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="paletteGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* Applies the gradient to the path */}
            <g data-name="Layer 2">
              <g data-name="color-palette">
                {/* The rect with opacity="0" means it's an invisible bounding box,
                    it doesn't need a fill. */}
                <rect width="24" height="24" opacity="0"/>
                <path fill="url(#paletteGradient)" d="M19.54 5.08A10.61 10.61 0 0 0 11.91 2a10 10 0 0 0-.05 20 2.58 2.58 0 0 0 2.53-1.89 2.52 2.52 0 0 0-.57-2.28.5.5 0 0 1 .37-.83h1.65A6.15 6.15 0 0 0 22 11.33a8.48 8.48 0 0 0-2.46-6.25zm-12.7 9.66a1.5 1.5 0 1 1 .4-2.08 1.49 1.49 0 0 1-.4 2.08zM8.3 9.25a1.5 1.5 0 1 1-.55-2 1.5 1.5 0 0 1 .55 2zM11 7a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 11 7zm5.75.8a1.5 1.5 0 1 1 .55-2 1.5 1.5 0 0 1-.55 2z"/>
              </g>
            </g>
          </svg>
        ),
        type: "dropdown",
        children: [
          { id: "themeLibraries", name: "Built-in Theme Library" },
          { id: "normalThemes", name: "Simple Light & Dark Mode Toggle" },
          { id: "multiThemes", name: "All Themes Toggle" },
          { id: "customThemes", name: "Craft Beautiful Custom Themes" },
        ],
      },
    ],
    secondary: [
      { id: "store", 
        name: "Store",
        icon: (
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24" // Using the original viewBox of 24x24
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="cartGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* The path now uses the gradient for the stroke (outline) */}
            <path
              stroke="url(#cartGradient)"
              fill="none" // Ensure the inside is transparent
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
            />
          </svg>
        ), 
        type: "link" },
      { id: "blog", 
        name: "Blog", 
        icon: (
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24" // Using the original viewBox of 24x24
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="signalGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* The path now uses the gradient for the stroke (outline) */}
            <path
              stroke="url(#signalGradient)"
              fill="none" // Ensure the inside is transparent
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 11C9.41828 11 13 14.5817 13 19M5 5C12.732 5 19 11.268 19 19M7 18C7 18.5523 6.55228 19 6 19C5.44772 19 5 18.5523 5 18C5 17.4477 5.44772 17 6 17C6.55228 17 7 17.4477 7 18Z"
            />
          </svg>
        ), 
        type: "link" },
      { id: "resource", 
        name: "Resources", 
        icon: (
          <svg
            height="24"
            width="24"
            viewBox="0 0 512 512" // Using the original viewBox of 512x512
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="gearGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* Applies the gradient to all paths in the group */}
            <g fill="url(#gearGradient)">
              {/* Path 1: Top-right quadrant circles/shapes */}
              <path d="M512,19.25c0-10.1-8.195-18.279-18.287-18.279H308.866v73.652c4.586-2.558,9.865-4.008,15.481-4.008
            c17.623,0,31.919,14.287,31.919,31.923c0,17.619-14.288,31.914-31.919,31.914c-5.616,0-10.895-1.458-15.481-3.999v73.644h73.652
            c-2.549,4.586-4.008,9.864-4.008,15.476c0,17.635,14.288,31.923,31.923,31.923c17.627,0,31.914-14.288,31.914-31.923
            c0-5.612-1.458-10.89-3.999-15.476H512V19.25z"/>
              
              {/* Path 2: Main body with spiral/maze pattern */}
              <path d="M429.616,275.37h-92.794c-3.25,0-6.256,1.718-7.901,4.504l0.09-0.154l-0.106,0.171
            c-0.839,1.426-1.263,3.038-1.263,4.643c0,1.531,0.391,3.078,1.157,4.464l5.849,10.532c1.311,2.37,1.954,4.863,1.963,7.583
            c-0.008,4.203-1.621,8.08-4.586,11.062c-2.981,2.965-6.866,4.578-11.062,4.594c-4.203-0.017-8.088-1.629-11.078-4.594l0.012,0.017
            c-2.974-2.998-4.582-6.883-4.59-11.078c0.008-2.713,0.651-5.213,1.958-7.591l5.853-10.524c0.77-1.386,1.157-2.924,1.157-4.464
            c0-1.605-0.424-3.217-1.276-4.66c-1.649-2.793-4.655-4.504-7.9-4.504h-69.432v-37.184c12.548-0.196,24.4-5.14,33.278-14.035
            c9.09-9.066,14.125-21.227,14.116-34.072c0.008-12.862-5.03-25.023-14.116-34.081c-8.871-8.896-20.726-13.832-33.278-14.027V81.416
            c-0.004-5.066-4.11-9.172-9.176-9.172H34.548c-9.204-0.007-17.94,3.601-24.432,10.109C3.669,88.805,0.008,97.659,0,106.798v369.686
            c-0.008,9.196,3.608,17.928,10.116,24.428c6.452,6.443,15.293,10.108,24.432,10.117h369.726
            c9.115-0.008,17.961-3.674,24.404-10.117c6.509-6.5,10.117-15.224,10.109-24.428V284.542
            C438.788,279.476,434.682,275.37,429.616,275.37z M28.37,106.798c0-2.118,0.986-3.559,1.792-4.366
            c0.835-0.831,2.272-1.825,4.386-1.825h172.747v73.603c0,1.776,0.941,3.413,2.468,4.317c0.782,0.456,1.657,0.685,2.537,0.685
            c0.839,0,1.674-0.204,2.432-0.627l10.528-5.849c2.969-1.646,6.203-2.485,9.608-2.485c5.29,0,10.271,2.061,14.014,5.8
            c3.747,3.755,5.808,8.74,5.808,14.027c0,5.286-2.061,10.264-5.8,14.01c-3.751,3.747-8.732,5.808-14.022,5.808
            c-3.409,0-6.639-0.839-9.604-2.485l-10.536-5.849c-0.753-0.423-1.592-0.627-2.427-0.627c-0.88,0-1.756,0.228-2.537,0.693
            c-1.527,0.896-2.468,2.533-2.468,4.309v73.603h-45.575c0.09-1.133,0.134-2.264,0.134-3.38c0-11.77-4.582-22.824-12.894-31.124
            c-8.304-8.317-19.358-12.894-31.128-12.894c-11.766,0-22.819,4.578-31.12,12.886c-8.32,8.3-12.902,19.362-12.898,31.124
            c0,1.124,0.044,2.249,0.134,3.389H28.37V106.798z M207.296,482.666H34.548c-2.114,0-3.551-0.994-4.366-1.8
            c-0.826-0.831-1.812-2.273-1.812-4.382V303.725h73.599c1.772,0,3.413-0.937,4.313-2.46c0.9-1.532,0.925-3.422,0.062-4.969
            l-5.844-10.532c-1.65-2.974-2.485-6.207-2.489-9.604c0.004-5.287,2.07-10.271,5.8-14.019c3.758-3.738,8.74-5.808,14.022-5.808
            c5.282,0,10.264,2.07,14.01,5.8c3.743,3.755,5.808,8.74,5.812,14.018c-0.004,3.413-0.844,6.647-2.477,9.604l-5.857,10.532
            c-0.864,1.556-0.838,3.446,0.062,4.969c0.9,1.531,2.542,2.468,4.313,2.468h73.599v45.59c-1.133-0.089-2.26-0.13-3.376-0.13
            c-11.774,0-22.828,4.578-31.12,12.886c-8.324,8.308-12.902,19.362-12.894,31.124c-0.008,11.762,4.57,22.824,12.887,31.124
            c8.3,8.317,19.354,12.894,31.128,12.894c1.124,0,2.252-0.041,3.376-0.13V482.666z M410.424,476.484
            c0,2.109-0.993,3.543-1.808,4.366c-0.831,0.823-2.265,1.817-4.374,1.817H231.496v-73.603c0-1.776-0.936-3.413-2.468-4.309
            c-0.782-0.465-1.658-0.692-2.537-0.692c-0.835,0-1.674,0.204-2.428,0.627l-10.544,5.849c-2.961,1.645-6.191,2.484-9.6,2.484
            c-5.282,0-10.264-2.068-14.01-5.8c-3.743-3.747-5.808-8.732-5.812-14.019c0.004-5.294,2.07-10.271,5.808-14.018
            c3.744-3.739,8.724-5.808,14.015-5.816c3.385,0,6.618,0.839,9.6,2.484l10.54,5.857c0.758,0.424,1.592,0.628,2.432,0.628
            c0.879,0,1.755-0.229,2.537-0.684c1.527-0.904,2.468-2.542,2.468-4.318v-73.611h45.578c-0.089,1.132-0.134,2.265-0.134,3.388
            c-0.004,11.754,4.574,22.808,12.886,31.116c8.308,8.325,19.366,12.903,31.132,12.903c11.766,0,22.82-4.578,31.129-12.894
            c8.316-8.3,12.886-19.354,12.886-31.124c0-1.124-0.041-2.248-0.13-3.388h45.582V476.484z"/>
            </g>
          </svg>
        ), 
        type: "link" },
    ],
    tertiary: [
      { id: "github", 
        name: "GitHub", 
        icon: (
          <svg
            height="24"
            width="24"
            viewBox="0 0 20 20" // Keeping the original viewBox of 20x20
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="githubGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* The SVG's core path, transformed and filled with the gradient */}
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-140.000000, -7559.000000)"
              fill="url(#githubGradient)"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"
                  id="github-[#142]"
                />
              </g>
            </g>
          </svg>
        ), 
        type: "link", 
        url: "https://github.com/Aditya02git/auralume"},
      { id: "discord", 
        name: "Discord", 
        icon: (
          <svg
            height="24"
            width="24"
            viewBox="0 0 32 32" // Using the original viewBox of 32x32
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="discordGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* The path now uses the gradient for the fill */}
            <path
              fill="url(#discordGradient)"
              d="M20.992 20.163c-1.511-0.099-2.699-1.349-2.699-2.877 0-0.051 0.001-0.102 0.004-0.153l-0 0.007c-0.003-0.048-0.005-0.104-0.005-0.161 0-1.525 1.19-2.771 2.692-2.862l0.008-0c1.509 0.082 2.701 1.325 2.701 2.847 0 0.062-0.002 0.123-0.006 0.184l0-0.008c0.003 0.050 0.005 0.109 0.005 0.168 0 1.523-1.191 2.768-2.693 2.854l-0.008 0zM11.026 20.163c-1.511-0.099-2.699-1.349-2.699-2.877 0-0.051 0.001-0.102 0.004-0.153l-0 0.007c-0.003-0.048-0.005-0.104-0.005-0.161 0-1.525 1.19-2.771 2.692-2.862l0.008-0c1.509 0.082 2.701 1.325 2.701 2.847 0 0.062-0.002 0.123-0.006 0.184l0-0.008c0.003 0.048 0.005 0.104 0.005 0.161 0 1.525-1.19 2.771-2.692 2.862l-0.008 0zM26.393 6.465c-1.763-0.832-3.811-1.49-5.955-1.871l-0.149-0.022c-0.005-0.001-0.011-0.002-0.017-0.002-0.035 0-0.065 0.019-0.081 0.047l-0 0c-0.234 0.411-0.488 0.924-0.717 1.45l-0.043 0.111c-1.030-0.165-2.218-0.259-3.428-0.259s-2.398 0.094-3.557 0.275l0.129-0.017c-0.27-0.63-0.528-1.142-0.813-1.638l0.041 0.077c-0.017-0.029-0.048-0.047-0.083-0.047-0.005 0-0.011 0-0.016 0.001l0.001-0c-2.293 0.403-4.342 1.060-6.256 1.957l0.151-0.064c-0.017 0.007-0.031 0.019-0.040 0.034l-0 0c-2.854 4.041-4.562 9.069-4.562 14.496 0 0.907 0.048 1.802 0.141 2.684l-0.009-0.11c0.003 0.029 0.018 0.053 0.039 0.070l0 0c2.14 1.601 4.628 2.891 7.313 3.738l0.176 0.048c0.008 0.003 0.018 0.004 0.028 0.004 0.032 0 0.060-0.015 0.077-0.038l0-0c0.535-0.72 1.044-1.536 1.485-2.392l0.047-0.1c0.006-0.012 0.010-0.027 0.010-0.043 0-0.041-0.026-0.075-0.062-0.089l-0.001-0c-0.912-0.352-1.683-0.727-2.417-1.157l0.077 0.042c-0.029-0.017-0.048-0.048-0.048-0.083 0-0.031 0.015-0.059 0.038-0.076l0-0c0.157-0.118 0.315-0.24 0.465-0.364 0.016-0.013 0.037-0.021 0.059-0.021 0.014 0 0.027 0.003 0.038 0.008l-0.001-0c2.208 1.061 4.8 1.681 7.536 1.681s5.329-0.62 7.643-1.727l-0.107 0.046c0.012-0.006 0.025-0.009 0.040-0.009 0.022 0 0.043 0.008 0.059 0.021l-0-0c0.15 0.124 0.307 0.248 0.466 0.365 0.023 0.018 0.038 0.046 0.038 0.077 0 0.035-0.019 0.065-0.046 0.082l-0 0c-0.661 0.395-1.432 0.769-2.235 1.078l-0.105 0.036c-0.036 0.014-0.062 0.049-0.062 0.089 0 0.016 0.004 0.031 0.011 0.044l-0-0.001c0.501 0.96 1.009 1.775 1.571 2.548l-0.040-0.057c0.017 0.024 0.046 0.040 0.077 0.040 0.010 0 0.020-0.002 0.029-0.004l-0.001 0c2.865-0.892 5.358-2.182 7.566-3.832l-0.065 0.047c0.022-0.016 0.036-0.041 0.039-0.069l0-0c0.087-0.784 0.136-1.694 0.136-2.615 0-5.415-1.712-10.43-4.623-14.534l0.052 0.078c-0.008-0.016-0.022-0.029-0.038-0.036l-0-0z"
            />
          </svg>
        ), 
        type: "link", 
        url: "https://github.com/Aditya02git/auralume" },
      { id: "support", 
        name: "Support", 
        icon: (
          <svg
            height="24"
            width="24"
            viewBox="0 0 16 16" // Using the original viewBox of 16x16
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Defines the linear gradient: Cyan to Pink/Magenta */}
              <linearGradient id="heartGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                {/* CORRECT: Use style={{ stopColor: "..." }} in JSX */}
                <stop offset="0%" style={{ stopColor: "#00f5ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff006e" }} />
              </linearGradient>
            </defs>

            {/* The path now uses the gradient for the fill */}
            <path
              fill="url(#heartGradient)"
              d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z"
            />
          </svg>
        ), 
        type: "link", 
        url: "https://github.com/Aditya02git/auralume" },
    ],
  };

const renderNavigationItem = (item, isChild = false) => {
  const isActive = activeSection === item.id;
  const isExpanded = expandedSections[item.id];

  // Handle external links
  if (item.type === "link" && item.url) {
    return (
<button
  key={item.id}
  onClick={() => window.open(item.url, "_blank", "noopener,noreferrer")}
  className={`sidebar-linkbutton ${sidebarOpen ? "" : "compact"} ${
    isDarkMode ? "dark" : "light"
  }`}
>
  <span className="icon">{item.icon}</span>
  {sidebarOpen && <span>{item.name}</span>}
</button>

    );
  }

  if (item.type === "dropdown") {
      return (
        <div key={item.id} style={{ marginBottom: "0.5rem" }}>
          {/* Dropdown Header */}
            <button
              className={`sidebar-main-button 
                ${isDarkMode ? "dark" : "light"} 
                ${sidebarOpen ? "open" : "closed"} 
                ${isExpanded ? "expanded" : ""}`}
              onClick={() => toggleSection(item.id)}
            >
              <span className="icon">{item.icon}</span>

              {sidebarOpen && (
                <>
                  <span className="label">{item.name}</span>
                  <img
                    src="/drop-down.png"
                    alt="arrow"
                    className={`dropdown-icon ${isDarkMode ? "dark" : "light"} ${
                      isExpanded ? "rotated" : ""
                    }`}
                  />
                </>
              )}
            </button>

          {/* Dropdown Children */}
          {sidebarOpen && isExpanded && (
            <div
              style={{
                marginLeft: "1rem",
                borderLeft: `2px solid ${
                  isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
                }`,
                paddingLeft: "0.5rem",
              }}
            >
              {item.children
                .filter((child) => !child.hidden)
                .map((child) => (
                  <button
                    key={child.id}
                    onClick={() => navigateToSection(child.id, item.id)}
                    className={`sidebar-expandedbutton ${
                      activeSection === child.id ? "active" : ""
                    } ${isDarkMode ? "dark" : "light"}`}
                  >
                    <span className="icon">{child.icon}</span>
                    <span>{child.name}</span>
                  </button>
                ))}
            </div>
          )}
        </div>
      );
    }

    // Regular navigation item
    return (
<button
  key={item.id}
  onClick={() => navigateToSection(item.id)}
  className={`sidebar-nav-button
    ${sidebarOpen ? "" : "compact"}
    ${isDarkMode ? "dark" : "light"}
    ${activeSection === item.id ? "active" : ""}
  `}
>
  <span className="icon">{item.icon}</span>
  {sidebarOpen && <span>{item.name}</span>}
</button>

    );
  };

    const ComponentWrapper = ({ children }) => {
    return React.cloneElement(children, {
      count,
      setCount,
      loading,
      handleLoadingDemo,
      isDarkMode,
      setIsDarkMode,
    });
  };



  // Navigation buttons component
const NavigationButtons = () => {
  const { previous, next } = getNextPrevious();
  
  if (!previous && !next) return null;
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '4rem',
      marginBottom: '2rem',
      padding: '2rem 0',
      borderTop: `1px solid ${currentTheme.borderColor}`,
      gap: '1rem'
    }}>
      {/* Previous Button */}
      {previous ? (
        <button
          onClick={() => navigateToSection(previous.id, previous.parent)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 1.5rem',
            border: `1px solid ${currentTheme.borderColor}`,
            background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            color: currentTheme.color,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '0.9rem',
            fontWeight: '500',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
          }}
        >
          <span>←</span>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Previous</div>
            <div>{previous.name}</div>
          </div>
        </button>
      ) : <div />}
      
      {/* Next Button */}
      {next ? (
        <button
          onClick={() => navigateToSection(next.id, next.parent)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 1.5rem',
            border: `1px solid ${currentTheme.borderColor}`,
            background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
            color: currentTheme.color,
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '0.9rem',
            fontWeight: '500',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
          }}
        >
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Next</div>
            <div>{next.name}</div>
          </div>
          <span>→</span>
        </button>
      ) : <div />}
    </div>
  );
};

  // Theme styles
  const darkTheme = {
    background: "#171f39",
    color: "white",
    sidebarBg: "rgba(0, 0, 0, 0.4)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    footerBg: "rgba(0, 0, 0, 0.3)",
  };

  const lightTheme = {
    background: "#eaeff5",
    color: "#1a202c",
    sidebarBg: "rgba(255, 255, 255, 0.8)",
    borderColor: "rgba(0, 0, 0, 0.1)",
    footerBg: "rgba(255, 255, 255, 0.5)",
  };

  const currentTheme = isDarkMode ? darkTheme : lightTheme;

  // Enhanced function to find current section info
  const getCurrentSectionInfo = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    const currentSectionId = segments[segments.length - 1] || "introduction";

      if (currentSectionId === "themeGenerator") {
    return { name: "Playground"};
  }
      if (currentSectionId === "store") {
    return { name: "AuraLume UI Store"};
  }
      if (currentSectionId === "blog") {
    return { name: "AuraLume UI Blog"};
  }
      if (currentSectionId === "resource") {
    return { name: "AuraLume UI Community Videos"};
  }

    // Search through all navigation structure
    for (const section of navigationStructure.main) {
      if (section.children) {
        const child = section.children.find((c) => c.id === currentSectionId);
        if (child) return child;
      }
      if (section.id === currentSectionId) return section;
    }
    
    for (const section of [
      ...navigationStructure.secondary,
      ...navigationStructure.tertiary,
    ]) {
      if (section.id === currentSectionId) return section;
    }
    
    return { name: "Unknown", icon: "❓" };
  };

  const currentSectionInfo = getCurrentSectionInfo();



  // this is for next and previous buttons
  // Function to get navigation order and find next/previous pages
const getNavigationOrder = () => {
  const order = [];
  
  // Add all navigation items in order
  navigationStructure.main.forEach(section => {
    if (section.children) {
      section.children
        .filter(child => !child.hidden)
        .forEach(child => {
          order.push({
            id: child.id,
            name: child.name,
            parent: section.id
          });
        });
    }
  });
  
  return order;
};

const getNextPrevious = () => {
  const order = getNavigationOrder();
  
  // Filter out standalone pages from navigation sequence
  const navigableOrder = order.filter(
    item => !['store', 'blog', 'resource'].includes(item.id)
  );
  
  const currentIndex = navigableOrder.findIndex(item => item.id === activeSection);
  
  // If current section is not in navigable order (e.g., store/blog/resource), return null
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }
  
  return {
    previous: currentIndex > 0 ? navigableOrder[currentIndex - 1] : null,
    next: currentIndex < navigableOrder.length - 1 ? navigableOrder[currentIndex + 1] : null
  };
};

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: currentTheme.background,
        color: currentTheme.color,
        overflow: "hidden",
        transition: "all 0.5s ease-in-out",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: sidebarOpen
          ? isMobile
            ? "100%" // full width on mobile
            : "320px" // fixed width on desktop
          : "60px", // collapsed state
          background: currentTheme.sidebarBg,
          backdropFilter: "blur(20px)",
          borderRight: `1px solid ${currentTheme.borderColor}`,
          transition: "width 0.3s ease, background 0.5s ease-in-out",
          position: "relative",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            padding: sidebarOpen ? "2rem 1.5rem 1.5rem" : "2rem 0 1.5rem",
            borderBottom: `1px solid ${currentTheme.borderColor}`,
            flexShrink: 0,
            display: sidebarOpen ? "block" : "flex",
            justifyContent: sidebarOpen ? "unset" : "center",
          }}
        >
          {sidebarOpen ? (
            <>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 0.5rem 0",
                      background: "linear-gradient(45deg, #00f5ff, #ff006e)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: "1.5rem",
                      cursor: 'pointer'
                    }}
                    onClick={() => navigate('/')}
                  >
                    <GradientText
                      colors={["#00f5ff", "#ff006e"]}
                      animationSpeed="7000"
                      style={{ fontWeight: "600" }}
                    >
                      Aura Lume | UI
                    </GradientText>
                  </h2>
                  <Button
                    variant="glass-light"
                    style={{
                      width: "50px",
                      height: "50px",
                      padding: "0",
                      fontSize: "12px",
                      color: isDarkMode
                        ? "rgba(255, 255, 255, 0.8)"
                        : "rgba(255, 0, 0, 0.8)",
                      background: "transparent",
                    }}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    {sidebarOpen ? (
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                    >
                      <title>chevrons</title>

                      <defs>
                        <linearGradient id="iconGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stop-color="#00f5ff" />
                          <stop offset="100%" stop-color="#ff006e" />
                        </linearGradient>
                      </defs>

                      <path
                        stroke="url(#iconGradient)"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m17 16-4-4 4-4m-6 8-4-4 4-4"
                        fill="none"
                      />
                    </svg>
                    ) : (
                      "→"
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div
              style={{
                width: "30px",
                height: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <img
                src="https://cdn.jsdelivr.net/gh/Aditya02git/Icons/aura-logo-extralarge.png"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
                alt="logo"
              />
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: "1rem 0", flex: 1, overflowY: "auto" }} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {/* Main Navigation */}
          <div style={{ marginBottom: "1.5rem" }}>
            {navigationStructure.main.map((item) => renderNavigationItem(item))}
          </div>

          {/* Horizontal Rule */}
          {sidebarOpen && (
            <hr
              style={{
                border: "none",
                height: "1px",
                background: currentTheme.borderColor,
                margin: "1.5rem 1rem",
              }}
            />
          )}

          {/* Secondary Navigation */}
          <div style={{ marginBottom: "1.5rem" }}>
            {navigationStructure.secondary.map((item) =>
              renderNavigationItem(item)
            )}
          </div>

          {/* Horizontal Rule */}
          {sidebarOpen && (
            <hr
              style={{
                border: "none",
                height: "1px",
                background: currentTheme.borderColor,
                margin: "1.5rem 1rem",
              }}
            />
          )}

          {/* Tertiary Navigation */}
          <div>
            {navigationStructure.tertiary.map((item) =>
              renderNavigationItem(item)
            )}
          </div>
          <p style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'gray', fontWeight: '300px', padding: '5px', fontSize: isMobile ? '8px' : '12px'}}>{sidebarOpen ? <p>version 1.0.1</p> : <p>v 1.0.1</p>}
</p>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="main-content-wrapper"
        style={{
          flex: 1,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          paddingTop: "70px"
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {/* Main Header */}
<Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} sidebarOpen={sidebarOpen}/>
            <div
              style={{
                marginTop: "1.5rem",
              }}
            />
          <header style={{ margin: "1rem", textAlign: "center" }}>
            <h1
              style={{
                fontSize: "2.5rem",
                background: "linear-gradient(45deg, #00f5ff, #ff006e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "0.5rem",
                fontWeight: "bold"
              }}
            >
              {currentSectionInfo.icon} {currentSectionInfo.name === "Built-in Theme Library" ? '' : currentSectionInfo.name}
            </h1>
          </header>

          {/* Routes with proper nested structure */}
          <Routes>
            {/* Home route */}
            {/* <Route path="/home" element={<Home />} /> */}
            
            {/* Docs routes */}
            <Route index element={
              <ComponentWrapper>
                <Introduction isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/docs/introduction" element={
              <ComponentWrapper>
                <Introduction isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/docs/installation" element={
              <ComponentWrapper>
                <Installation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            {/* <Route path="/docs/cdn" element={
              <ComponentWrapper>
                <CDN isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } /> */}
            <Route path="/docs/astro" element={
              <ComponentWrapper>
                <Astro isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/docs/laravel" element={
              <ComponentWrapper>
                <Laravel isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/docs/manual" element={
              <ComponentWrapper>
                <Manual isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/docs/nextjs" element={
              <ComponentWrapper>
                <Nextjs isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/docs/reactrouter" element={
              <ComponentWrapper>
                <ReactRouter isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/docs/vite" element={
              <ComponentWrapper>
                <Vite isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            
            {/* Component routes */}
            <Route path="/components/accordions" element={
              <ComponentWrapper>
                <AccordionSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/activityGrids" element={
              <ComponentWrapper>
                <ActivityGridSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/alertdialogs" element={
              <ComponentWrapper>
                <AlertDialogSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/avatars" element={
              <ComponentWrapper>
                <AvatarSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/animatedcards" element={
              <ComponentWrapper>
                <AnimatedCardSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/animatedborderbuttons" element={
              <ComponentWrapper>
                <AnimatedBorderButtonSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/auths" element={
              <ComponentWrapper>
                <AuthSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/badges" element={
              <ComponentWrapper>
                <BadgeSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/breadcrumbs" element={
              <ComponentWrapper>
                <BreadcrumbSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/buttons" element={
              <ComponentWrapper>
                <ButtonSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/calendars" element={
              <ComponentWrapper>
                <CalendarSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/cards" element={
              <ComponentWrapper>
                <CardSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/cardscapes" element={
              <ComponentWrapper>
                <CardScapeSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/carousels" element={
              <ComponentWrapper>
                <CarouselSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/chatboxes" element={
              <ComponentWrapper>
                <ChatBoxSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/charts" element={
              <ComponentWrapper>
                <ChartSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/checkboxes" element={
              <ComponentWrapper>
                <CheckboxSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/codeblocks" element={
              <ComponentWrapper>
                <CodeBlockSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/contextmenus" element={
              <ComponentWrapper>
                <ContextMenuSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/confettibuttons" element={
              <ComponentWrapper>
                <ConfettiButtonSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/cosmicCards" element={
              <ComponentWrapper>
                <CosmicCardSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/counters" element={
              <ComponentWrapper>
                <CounterSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/datatables" element={
              <ComponentWrapper>
                <DataTableSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/drawers" element={
              <ComponentWrapper>
                <DropdownSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/dialogs" element={
              <ComponentWrapper>
                <DialogSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/endlessreviews" element={
              <ComponentWrapper>
                <EndlessReviewSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/fabIcons" element={
              <ComponentWrapper>
                <FabIconSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/focusCards" element={
              <ComponentWrapper>
                <FocusCardSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/fluidbuttons" element={
              <ComponentWrapper>
                <FluidButtonSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/footers" element={
              <ComponentWrapper>
                <FooterSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/glowbuttons" element={
              <ComponentWrapper>
                <GlowTrackButtonSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/gradienttexts" element={
              <ComponentWrapper>
                <GradientTextSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/infinitegallery" element={
              <ComponentWrapper>
                <InfiniteGallerySection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/infinitescrollers" element={
              <ComponentWrapper>
                <InfiniteScrollerSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/inputotps" element={
              <ComponentWrapper>
                <InputOTPSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/inputs" element={
              <ComponentWrapper>
                <InputSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/linkPreviews" element={
              <ComponentWrapper>
                <LinkPreviewSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/lumeButtons" element={
              <ComponentWrapper>
                <LumeButtonSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/navigationmenus" element={
              <ComponentWrapper>
                <NavbarSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/paginations" element={
              <ComponentWrapper>
                <PaginationSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/pricingcards" element={
              <ComponentWrapper>
                <PricingCardSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/progressbars" element={
              <ComponentWrapper>
                <ProgressBarSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/radarcharts" element={
              <ComponentWrapper>
                <RadarChartSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/radiogroups" element={
              <ComponentWrapper>
                <RadioGroupSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/reacthookforms" element={
              <ComponentWrapper>
                <ReactHookFormSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/resizables" element={
              <ComponentWrapper>
                <ResizableSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/roadmaps" element={
              <ComponentWrapper>
                <RoadmapSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/searchbars" element={
              <ComponentWrapper>
                <SearchBarSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/shinetexts" element={
              <ComponentWrapper>
                <ShineTextSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/sidebars" element={
              <ComponentWrapper>
                <SidebarSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/skeletons" element={
              <ComponentWrapper>
                <SkeletonLoaderSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/skillbars" element={
              <ComponentWrapper>
                <SkillbarSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/sliders" element={
              <ComponentWrapper>
                <SliderSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/spotlightCards" element={
              <ComponentWrapper>
                <SpotLightCardSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/switches" element={
              <ComponentWrapper>
                <SwitchSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/tabs" element={
              <ComponentWrapper>
                <TabSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/testimonials" element={
              <ComponentWrapper>
                <TestimonialSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/textareas" element={
              <ComponentWrapper>
                <TextAreaSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/textMasks" element={
              <ComponentWrapper>
                <TextMaskSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/threedcards" element={
              <ComponentWrapper>
                <ThreeDCardSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/timelines" element={
              <ComponentWrapper>
                <TimelineSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/toasts" element={
              <ComponentWrapper>
                <ToastSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/themeButtons" element={
              <ComponentWrapper>
                <ThemeButtonSection isOn={isDarkMode}
                  onChange={setIsDarkMode}
                  applyBodyTheme={true} />
              </ComponentWrapper>
            } />
            <Route path="/components/togglegroups" element={
              <ComponentWrapper>
                <ToggleGroupSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/tooltips" element={
              <ComponentWrapper>
                <TooltipSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/trees" element={
              <ComponentWrapper>
                <TreeSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/triesearches" element={
              <ComponentWrapper>
                <TrieSearchSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/components/typographies" element={
              <ComponentWrapper>
                <TypographySection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />

            {/* Background routes */}
            <Route path="/background/gradientBackgrounds" element={
              <ComponentWrapper>
                <GradientBackgroundSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/background/spotlightBackgrounds" element={
              <ComponentWrapper>
                <SpotlightBackgroundSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/background/auroraBackgrounds" element={
              <ComponentWrapper>
                <AuroraBackgroundSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/background/cosmicBackgrounds" element={
              <ComponentWrapper>
                <CosmicBackgroundSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/background/haloBackgrounds" element={
              <ComponentWrapper>
                <HaloBackgroundSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/background/glassmorphicBackgrounds" element={
              <ComponentWrapper>
                <GlassmorphicBackgroundSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/background/matrixBackgrounds" element={
              <ComponentWrapper>
                <MatrixSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/background/noiseBackgrounds" element={
              <ComponentWrapper>
                <NoiseBackgroundSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/background/solarBackgrounds" element={
              <ComponentWrapper>
                <SolarBackgroundSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/background/stellarBackgrounds" element={
              <ComponentWrapper>
                <StellarBackgroundSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/background/tileBackgrounds" element={
              <ComponentWrapper>
                <TileBackgroundSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/background/waveBackgrounds" element={
              <ComponentWrapper>
                <WaveBackgroundSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />

            {/* Shader routes */}
            <Route path="/shader/fakeShaders" element={
              <ComponentWrapper>
                <FakeShaderSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/shader/glitchTexts" element={
              <ComponentWrapper>
                <GlitchTextSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/shader/vhs" element={
              <ComponentWrapper>
                <VHSSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/shader/crts" element={
              <ComponentWrapper>
                <CRTSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/shader/chromaticsplits" element={
              <ComponentWrapper>
                <ChromaticSplitSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />

            {/* Three.js routes */}
            <Route path="/threejs/initializations" element={
              <ComponentWrapper>
                <Initialization isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/polyhedras" element={
              <ComponentWrapper>
                <PolyhedraSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/blobs" element={
              <ComponentWrapper>
                <BlobSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/smoothBlobs" element={
              <ComponentWrapper>
                <SmoothBlobSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/threeBars" element={
              <ComponentWrapper>
                <ThreeBarSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/smokeeffects" element={
              <ComponentWrapper>
                <SmokeEffectSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/fireeffects" element={
              <ComponentWrapper>
                <FireEffectSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/leafs" element={
              <ComponentWrapper>
                <LeafSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/watereffects" element={
              <ComponentWrapper>
                <WaterEffectSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/windeffects" element={
              <ComponentWrapper>
                <WindEffectSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/fireflies" element={
              <ComponentWrapper>
                <FireFliesSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/clouds" element={
              <ComponentWrapper>
                <CloudSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/raineffects" element={
              <ComponentWrapper>
                <RainEffectSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/threejs/wispSmokeEffects" element={
              <ComponentWrapper>
                <WispSmokeEffectSection isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />


            <Route path="/themeGenerator" element={
              <ComponentWrapper>
                <ThemeGenerator isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/store" element={
              <ComponentWrapper>
                <Store isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/blog" element={
              <ComponentWrapper>
                <Blog isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/resource" element={
              <ComponentWrapper>
                <Resource isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />

            {/* Theming */}
            <Route path="/theming/themeLibraries" element={
              <ComponentWrapper>
                <ThemeLib isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              </ComponentWrapper>
            } />
            <Route path="/theming/normalThemes" element={
              <ComponentWrapper>
                <NormalTheming isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/theming/multiThemes" element={
              <ComponentWrapper>
                <MultiTheming isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            <Route path="/theming/customThemes" element={
              <ComponentWrapper>
                <CustomTheming isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
              </ComponentWrapper>
            } />
            
            {/* Catch-all route for unknown sections */}
            <Route path="*" element={
              <div style={{ padding: "2rem", textAlign: "center", opacity: 0.7 }}>
                <h3>Section Coming Soon</h3>
                <p>This section is under development.</p>
              </div>
            } />
          </Routes>

          <NavigationButtons />

          {/* Footer */}
          <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
        </div>
      </div>
    </div>
  );
}

export default DocsLayout;