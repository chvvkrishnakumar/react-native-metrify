/**
 * Core type definitions for dashboard widgets
 */

/**
 * Theme color palette
 */
export interface ThemeColors {
  // Primary colors
  primary: string;
  secondary: string;
  accent: string;
  
  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;
  
  // Background colors
  background: string;
  surface: string;
  overlay: string;
  
  // Text colors
  text: string;
  textSecondary: string;
  textDisabled: string;
  
  // Border colors
  border: string;
  borderLight: string;
  
  // Chart colors
  chartPrimary: string;
  chartSecondary: string;
  chartTertiary: string;
  chartQuaternary: string;
  chartPositive: string;
  chartNegative: string;
  chartNeutral: string;
}

/**
 * Theme spacing scale
 */
export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

/**
 * Theme border radius scale
 */
export interface ThemeRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  full: number;
}

/**
 * Theme font scale
 */
export interface ThemeFontScale {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

/**
 * Complete theme definition
 */
export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  fontScale: ThemeFontScale;
}

/**
 * Widget loading states
 */
export type WidgetState = 'idle' | 'loading' | 'error' | 'empty';

/**
 * Trend direction
 */
export type TrendDirection = 'up' | 'down' | 'neutral';

/**
 * Font size configuration for widgets
 */
export interface FontSizeConfig {
  /**
   * Custom font size for labels
   */
  labelSize?: number;
  
  /**
   * Custom font size for values
   */
  valueSize?: number;
  
  /**
   * Custom font size for secondary text
   */
  secondarySize?: number;
  
  /**
   * Enable/disable responsive font scaling (default: true)
   */
  responsive?: boolean;
  
  /**
   * Minimum font size when responsive scaling is enabled
   */
  minSize?: number;
  
  /**
   * Maximum font size when responsive scaling is enabled
   */
  maxSize?: number;
}

/**
 * Base props shared by all widgets
 */
export interface BaseWidgetProps<T = unknown> {
  data: T;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: Theme;
  animated?: boolean;
  testID?: string;
  /**
   * Font size configuration
   */
  fontSize?: FontSizeConfig;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  delay?: number;
}

/**
 * Time interval types
 * Note: Also exported from utils/time.ts - using that as the main export
 */
// export type TimeInterval = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
