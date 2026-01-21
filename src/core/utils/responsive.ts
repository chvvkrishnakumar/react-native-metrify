/**
 * Responsive sizing utilities for widgets
 */

import type { FontSizeConfig } from '../types';

/**
 * Scale factor type for responsive sizing
 */
export type ScaleFactor = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Base font sizes - used as reference for scaling
 */
const BASE_FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 18,
  xl: 24,
  xxl: 32,
};

/**
 * Calculate responsive font size based on widget dimensions
 * 
 * @param baseFontSize - Base font size (from theme or custom)
 * @param width - Widget width
 * @param height - Widget height
 * @param referenceSize - Reference dimension (default: 300 for width-based scaling)
 * @returns Scaled font size
 * 
 * @example
 * // For a widget that's 150px wide (half of reference 300px)
 * getResponsiveFontSize(16, 150, 100, 300) // Returns 8 (50% of 16)
 * 
 * // For a widget that's 600px wide (2x reference)
 * getResponsiveFontSize(16, 600, 200, 300) // Returns 32 (200% of 16)
 */
export function getResponsiveFontSize(
  baseFontSize: number,
  width: number,
  height: number,
  referenceSize: number = 300
): number {
  // Use the smaller dimension to ensure text fits in both directions
  const dimension = Math.min(width, height);
  const scaleFactor = dimension / referenceSize;
  
  // Clamp the scale factor to prevent text from becoming too small or too large
  const clampedScale = Math.max(0.5, Math.min(scaleFactor, 2.5));
  
  return Math.round(baseFontSize * clampedScale);
}

/**
 * Get scaled font sizes for all scale factors
 * 
 * @param width - Widget width
 * @param height - Widget height
 * @param referenceSize - Reference dimension for scaling
 * @returns Object with scaled font sizes for each scale factor
 * 
 * @example
 * const fontSizes = getScaledFontSizes(150, 100, 300);
 * // Returns: { xs: 5, sm: 6, md: 7, lg: 9, xl: 12, xxl: 16 }
 */
export function getScaledFontSizes(
  width: number,
  height: number,
  referenceSize: number = 300
): Record<ScaleFactor, number> {
  return {
    xs: getResponsiveFontSize(BASE_FONT_SIZES.xs, width, height, referenceSize),
    sm: getResponsiveFontSize(BASE_FONT_SIZES.sm, width, height, referenceSize),
    md: getResponsiveFontSize(BASE_FONT_SIZES.md, width, height, referenceSize),
    lg: getResponsiveFontSize(BASE_FONT_SIZES.lg, width, height, referenceSize),
    xl: getResponsiveFontSize(BASE_FONT_SIZES.xl, width, height, referenceSize),
    xxl: getResponsiveFontSize(BASE_FONT_SIZES.xxl, width, height, referenceSize),
  };
}

/**
 * Options for responsive font scaling
 */
export interface ResponsiveFontOptions {
  /**
   * Enable/disable responsive scaling (default: true)
   */
  enabled?: boolean;
  
  /**
   * Minimum font size to prevent text from becoming unreadable
   */
  minSize?: number;
  
  /**
   * Maximum font size to prevent text from becoming too large
   */
  maxSize?: number;
  
  /**
   * Reference size for scaling calculations (default: 300)
   */
  referenceSize?: number;
}

/**
 * Calculate font size with options
 * 
 * @param baseFontSize - Base font size
 * @param width - Widget width
 * @param height - Widget height
 * @param options - Responsive font options
 * @returns Calculated font size
 */
export function calculateFontSize(
  baseFontSize: number,
  width: number,
  height: number,
  options: ResponsiveFontOptions = {}
): number {
  const {
    enabled = true,
    minSize = 8,
    maxSize = 48,
    referenceSize = 300,
  } = options;
  
  // If responsive scaling is disabled, return base size
  if (!enabled) {
    return baseFontSize;
  }
  
  // Calculate responsive size
  const responsiveSize = getResponsiveFontSize(
    baseFontSize,
    width,
    height,
    referenceSize
  );
  
  // Apply min/max constraints
  return Math.max(minSize, Math.min(responsiveSize, maxSize));
}

/**
 * Create font size calculator for a widget
 * 
 * @param width - Widget width
 * @param height - Widget height
 * @param fontConfig - Font size configuration from props
 * @returns Function to calculate responsive font sizes
 */
export function createFontSizeCalculator(
  width: number,
  height: number,
  fontConfig: FontSizeConfig = {}
) {
  const {
    responsive = true,
    minSize = 8,
    maxSize = 48,
  } = fontConfig;
  
  return {
    /**
     * Get font size for labels
     */
    label: (baseFontSize: number): number => {
      return fontConfig.labelSize ?? calculateFontSize(
        baseFontSize,
        width,
        height,
        { enabled: responsive, minSize, maxSize }
      );
    },
    
    /**
     * Get font size for values
     */
    value: (baseFontSize: number): number => {
      return fontConfig.valueSize ?? calculateFontSize(
        baseFontSize,
        width,
        height,
        { enabled: responsive, minSize, maxSize }
      );
    },
    
    /**
     * Get font size for secondary text
     */
    secondary: (baseFontSize: number): number => {
      return fontConfig.secondarySize ?? calculateFontSize(
        baseFontSize,
        width,
        height,
        { enabled: responsive, minSize, maxSize }
      );
    },
  };
}
