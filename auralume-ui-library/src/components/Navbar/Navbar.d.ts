import { ReactNode, ReactElement } from 'react';

export interface DropdownItem {
  label: string;
  icon?: string | ReactElement;
  onClick?: () => void;
}

export interface MenuItem {
  label: string;
  icon?: string | ReactElement;
  badge?: string;
  dropdown?: DropdownItem[];
  onClick?: () => void;
}

export interface NavbarProps {
  /** Title text for the navbar */
  title?: string;
  
  /** Logo image URL or React element */
  logo?: string | ReactElement;
  
  /** Icon at the start/left of navbar */
  startIcon?: string | ReactElement;
  
  /** Icon at the end/right of navbar */
  endIcon?: string | ReactElement;
  
  /** Array of menu items with optional dropdowns */
  menuItems?: MenuItem[];
  
  /** Enable search functionality */
  searchable?: boolean;
  
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Theme variant (legacy support) */
  variant?: 'default' | 'dark' | 'light';
  
  /** Enable responsive behavior */
  responsive?: boolean;
  
  /** Center the logo in the navbar */
  centerLogo?: boolean;
  
  /** Show notification indicator on icons */
  showIndicator?: boolean;
  
  /** Number to display in indicator badge */
  indicatorCount?: number;
  
  /** Callback when menu items are clicked */
  onMenuClick?: (item: MenuItem | DropdownItem, index: string | number) => void;
  
  /** Callback when icons are clicked */
  onIconClick?: (position: 'start' | 'end') => void;
  
  /** Callback when search is submitted */
  onSearch?: (query: string) => void;
}

declare const Navbar: React.FC<NavbarProps>;

export default Navbar;