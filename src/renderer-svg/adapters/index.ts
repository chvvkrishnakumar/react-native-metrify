/**
 * Adapters for bridging core utilities with SVG rendering
 */
import { Point } from '../../core/layout';

/**
 * Converts data array to SVG points
 */
export function dataToPoints(
  data: number[],
  width: number,
  height: number,
  padding: number = 0
): Point[] {
  if (data.length === 0) return [];
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const stepX = data.length > 1 ? innerWidth / (data.length - 1) : 0;
  
  return data.map((value, index) => {
    const normalizedY = (value - min) / range;
    return {
      x: padding + index * stepX,
      y: padding + innerHeight - normalizedY * innerHeight,
    };
  });
}

/**
 * Formats numbers for display (worklet-compatible)
 */
export function formatNumber(
  value: number,
  format?: 'number' | 'currency' | 'percent' | 'compact'
): string {
  'worklet';
  
  // Helper to format number with commas (worklet-compatible)
  const addCommas = (num: number): string => {
    'worklet';
    const parts = num.toFixed(0).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  };
  
  switch (format) {
    case 'currency':
      // Worklet-compatible currency formatting
      const currencyValue = Math.round(value);
      return `$${addCommas(currencyValue)}`;
    
    case 'percent':
      return `${value.toFixed(1)}%`;
    
    case 'compact':
      if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M`;
      }
      if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}K`;
      }
      return Math.round(value).toString();
    
    case 'number':
    default:
      // Worklet-compatible number formatting with commas
      return addCommas(value);
  }
}

/**
 * Gets color for trend direction (worklet-compatible)
 */
export function getTrendColor(
  trend: 'up' | 'down' | 'neutral',
  colors: { positive: string; negative: string; neutral: string }
): string {
  'worklet';
  
  switch (trend) {
    case 'up':
      return colors.positive;
    case 'down':
      return colors.negative;
    case 'neutral':
    default:
      return colors.neutral;
  }
}
