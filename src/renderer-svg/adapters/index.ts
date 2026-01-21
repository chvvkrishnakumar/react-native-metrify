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
 * Formats numbers for display
 */
export function formatNumber(
  value: number,
  format?: 'number' | 'currency' | 'percent' | 'compact'
): string {
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    
    case 'percent':
      return `${value.toFixed(1)}%`;
    
    case 'compact':
      if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(1)}M`;
      }
      if (value >= 1_000) {
        return `${(value / 1_000).toFixed(1)}K`;
      }
      return value.toString();
    
    case 'number':
    default:
      return new Intl.NumberFormat('en-US').format(value);
  }
}

/**
 * Gets color for trend direction
 */
export function getTrendColor(
  trend: 'up' | 'down' | 'neutral',
  colors: { positive: string; negative: string; neutral: string }
): string {
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
