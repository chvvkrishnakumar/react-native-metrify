/**
 * RadarChart Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface RadarDataPoint {
  axis: string;
  value: number;
}

export interface RadarSeries {
  data: RadarDataPoint[];
  color: string;
  label?: string;
}

export interface RadarChartData {
  series: RadarSeries[];
  title?: string;
  maxValue?: number;
}

// Simple API
export interface RadarChartSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for category/axis labels */
  categoryKey: string;
  /** Keys for values to plot */
  dataKeys: string[];
  /** Colors for each series (optional) */
  colors?: string[];
  /** Labels for each dataKey (optional) */
  labels?: string[];
  showLabels?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  gridLevels?: number;
  size?: number;
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  testID?: string;
}

// Legacy API
export interface RadarChartLegacyProps {
  data: RadarChartData;
  categoryKey?: never;
  dataKeys?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  showLabels?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  gridLevels?: number;
  size?: number;
  testID?: string;
}

export type RadarChartWidgetProps = RadarChartSimpleProps | RadarChartLegacyProps;
