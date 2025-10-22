// All Components

export { default as Accordion } from "./Accordion";
export { default as ActivityGrid } from "./ActivityGrid";
export { default as AlertDialog } from "./AlertDialog";
export { default as AnimatedCard } from "./AnimatedCard";
export const ANIMATION_TYPES = {
  ALPHABETICAL: "alphabetical",
  ASCII: "ascii",
  PIXELS: "pixels",
};
export const COLOR_VARIANTS = {
  DEFAULT: "",
  PURPLE: "purple",
  BLUE: "blue",
  GREEN: "green",
  RED: "red",
  ORANGE: "orange",
};
export const SIZE_VARIANTS = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};
export { default as AnimatedBorderButton } from "./AnimatedBorderButton";
export { default as Avatar, AvatarGroup } from "./Avatar";
export { default as Auth } from "./Auth";
export { default as Badge } from "./Badge";
export { default as Breadcrumb } from "./Breadcrumb";
export { default as Button } from "./Button";
export { confettiVariations, triggerConfetti } from "./Confetti";
export { default as ThreeDCard } from "./ThreeDCard";
export { default as ThreeDCardDefault } from "./ThreeDCard";
export {
  Calendar,
  DatePicker,
  DateTimePicker,
  DatePickerWithSubmit,
} from "./Calendar";
export { default as CardScape } from './CardScape';
export { default as Carousel } from "./Carousel";
export { default as Chart } from "./Chart";
export { default as ChatBox } from "./ChatBox";
export { default as Checkbox } from "./Checkbox";
export { default as CodeBlock } from "./CodeBlock";
export { default as ComboBox } from "./ComboBox";
export { default as CosmicCard } from "./CosmicCard";
export { default as ContextMenu } from "./ContextMenu";
export { default as Counter } from "./Counter";
export { default as DataTable } from "./DataTable";
export { default as Dialog } from "./Dialog";
export { default as Dropdown } from "./Dropdown";
export { default as EndlessReview } from "./EndlessReview";
export { default as FabIcon } from "./FabIcon";
export { default as FluidButton } from "./FluidButton";
export { default as FocusCard } from "./FocusCard";
export { default as Footer } from "./Footer";
export { default as GlowTrackButton } from "./GlowTrackButton";
export { default as GradientText } from "./GradientText";
export { default as InfiniteGallery } from "./InfiniteGallery";
export { default as InfiniteScroller } from "./InfiniteScroller";
export { default as Input } from "./Input";
export { default as InputOTP } from "./InputOTP";
export { default as LinkPreview } from "./LinkPreview";
export { default as LumeButton } from "./LumeButton";
export { default as Navbar } from "./Navbar";
export { default as Pagination } from "./Pagination";
export { default as PricingCard } from "./PricingCard";
export { default as ProgressBar } from "./ProgressBar";
export { default as RadarChart } from "./RadarChart";
export { default as RadioGroup } from "./RadioGroup";
export { default as ReactHookForm } from "./ReactHookForm";
export { default as Resizable } from "./Resizable";
export { default as Roadmap } from "./Roadmap";
export { default as SearchBar } from "./SearchBar";
export { default as ShaderCard } from "./ShaderCard";
// export { default as ShaderWaveText } from "./ShaderWaveText";
export { default as ShineText } from "./ShineText";
export { default as Sidebar } from "./Sidebar";
export { default as SkeletonLoader } from "./SkeletonLoader";
export { default as Skillbar } from "./Skillbar";
export { default as Slider } from "./Slider";
export { default as SpotLightCard } from "./SpotLightCard";
export { default as Switch } from "./Switch";
export { default as Tab } from "./Tab";
export { default as Testimonial } from "./Testimonial";
export { default as TextArea } from "./TextArea";
export { default as Timeline } from "./Timeline";
export { default as Toast } from "./Toast";
export { useToast, ToastContainer } from "./Toast";
export { default as ThemeButton } from "./ThemeButton";
export { default as ToggleGroup } from "./ToggleGroup";
export { default as Tooltip } from "./Tooltip";
export { default as Tree } from "./Tree";
export { default as TrieSearch } from "./TrieSearch";
export {
  Typography,
  Typography1,
  Typography2,
  Typography3,
  Typography4,
  Typography5,
  Typography6,
} from "./Typography";

// Background Components------------------------------

export { default as GradientBackground } from "./GradientBackground";
export { default as SpotlightBackground } from "./SpotlightBackground";
export { default as AuroraBackground } from "./AuroraBackground";
export { default as CosmicBackground } from "./CosmicBackground";
export { default as HaloBackground } from "./HaloBackground";
export { default as MatrixBackground } from "./MatrixBackground";
export { default as NoiseBackground } from "./NoiseBackground";
export { default as SolarBackground } from "./SolarBackground";
export { default as StellarBackground } from "./StellarBackground";
export { default as GlassmorphicBackground } from "./GlassmorphicBackground";
export { default as TileBackground } from "./TileBackground";
export { default as WaveBackground } from "./WaveBackground";

// Shader Components--------------------------------

export { default as FakeShader } from "./FakeShader";
export { default as GlitchText } from "./GlitchText";
export { default as VHS } from "./VHS";
export { default as CRT } from "./CRT";
export { default as ChromaticSplit } from "./ChromaticSplit";

// Three JS Components------------------------------

// export { default as Blob } from "./ThreeJs/Blob";
// export { default as SmoothBlob } from "./ThreeJs/SmoothBlob";
// export { default as Cloud } from "./ThreeJs/Cloud";
// export { default as FireEffect } from "./ThreeJs/FireEffect";
// export { default as FireFlies } from "./ThreeJs/FireFlies";
// export { default as MistEffect } from "./ThreeJs/MistEffect";
// export { default as Leaf } from "./ThreeJs/Leaf";
// export { default as Polyhedra } from "./ThreeJs/Polyhedra";
// export { default as RainEffect } from "./ThreeJs/RainEffect";
// export { default as SmokeEffect } from "./ThreeJs/SmokeEffect";
// export { default as ThreeBar } from "./ThreeJs/ThreeBar";
// export { default as WaterEffect } from "./ThreeJs/WaterEffect";
// export { default as WindEffect } from "./ThreeJs/WindEffect";
// export { default as WispSmokeEffect } from "./ThreeJs/WispSmokeEffect";

// Theme exports

export { ThemeProvider } from "../Context/ThemeProvider";
export { ThemeContext, useTheme } from "../Context/ThemeContext";
export { themes } from "../themes/themes";
