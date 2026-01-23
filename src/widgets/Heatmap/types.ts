/**
 * Heatmap Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface HeatmapDataPoint {
  x: number | string;
  y: number | string;
  value: number;
}

export interface HeatmapData {
  data: HeatmapDataPoint[];
  xLabels: string[];
  yLabels: string[];
  title?: string;
}

// Simple API
export interface HeatmapSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for X-axis values */
  xKey: string;
  /** Key for Y-axis values */
  yKey: string;
  /** Key for cell values */
  valueKey: string;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  testID?: string;
  cellSize?: number;
  cellSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  colorScheme?: 'blue' | 'green' | 'red' | 'purple' | 'gradient';
  minColor?: string;
  maxColor?: string;
}

// Legacy API
export interface HeatmapLegacyProps {
  data: HeatmapData;
  xKey?: never;
  yKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  cellSize?: number;
  cellSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  colorScheme?: 'blue' | 'green' | 'red' | 'purple' | 'gradient';
  minColor?: string;
  maxColor?: string;
  testID?: string;
}

export type HeatmapWidgetProps = HeatmapSimpleProps | HeatmapLegacyProps;
