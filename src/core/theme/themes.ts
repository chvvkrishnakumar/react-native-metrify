/**
 * Default theme definitions
 */
import { Theme } from '../types';

/**
 * Default light theme
 */
export const DefaultTheme: Theme = {
  colors: {
    // Primary colors
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#EC4899',
    
    // Semantic colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Background colors
    background: '#FFFFFF',
    surface: '#F9FAFB',
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    // Text colors
    text: '#111827',
    textSecondary: '#6B7280',
    textDisabled: '#D1D5DB',
    
    // Border colors
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    
    // Chart colors
    chartPrimary: '#3B82F6',
    chartSecondary: '#8B5CF6',
    chartTertiary: '#EC4899',
    chartQuaternary: '#F59E0B',
    chartPositive: '#10B981',
    chartNegative: '#EF4444',
    chartNeutral: '#6B7280',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  fontScale: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
};

/**
 * Dark theme
 */
export const DarkTheme: Theme = {
  colors: {
    // Primary colors
    primary: '#60A5FA',
    secondary: '#A78BFA',
    accent: '#F472B6',
    
    // Semantic colors
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',
    
    // Background colors
    background: '#111827',
    surface: '#1F2937',
    overlay: 'rgba(0, 0, 0, 0.7)',
    
    // Text colors
    text: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textDisabled: '#6B7280',
    
    // Border colors
    border: '#374151',
    borderLight: '#4B5563',
    
    // Chart colors
    chartPrimary: '#60A5FA',
    chartSecondary: '#A78BFA',
    chartTertiary: '#F472B6',
    chartQuaternary: '#FBBF24',
    chartPositive: '#34D399',
    chartNegative: '#F87171',
    chartNeutral: '#9CA3AF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
  fontScale: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
};
