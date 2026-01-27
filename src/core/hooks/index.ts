/**
 * Reusable hooks for widgets
 */
import { useMemo } from 'react';
import { Theme } from '../types';
import { useTheme } from '../theme';

/**
 * Hook to get widget dimensions with defaults
 */
export function useWidgetDimensions(
  width?: number,
  height?: number,
  defaultWidth: number = 300,
  defaultHeight: number = 200
) {
  return useMemo(
    () => ({
      width: width ?? defaultWidth,
      height: height ?? defaultHeight,
    }),
    [width, height, defaultWidth, defaultHeight]
  );
}

/**
 * Hook to merge theme overrides
 */
export function useWidgetTheme(themeOverride?: Theme): Theme {
  const contextTheme = useTheme();
  return themeOverride ?? contextTheme;
}

/**
 * Hook for widget padding calculations
 */
export function useWidgetPadding(theme: Theme) {
  return useMemo(
    () => ({
      top: theme.spacing.md,
      right: theme.spacing.md,
      bottom: theme.spacing.md,
      left: theme.spacing.md,
      horizontal: theme.spacing.md * 2,
      vertical: theme.spacing.md * 2,
    }),
    [theme.spacing.md]
  );
}

/**
 * Hook to calculate inner dimensions after padding
 */
export function useInnerDimensions(
  width: number,
  height: number,
  padding: { horizontal: number; vertical: number }
) {
  return useMemo(
    () => ({
      width: Math.max(0, width - padding.horizontal),
      height: Math.max(0, height - padding.vertical),
    }),
    [width, height, padding.horizontal, padding.vertical]
  );
}

/**
 * Export animation hooks
 */
export * from './useChartAnimation';
