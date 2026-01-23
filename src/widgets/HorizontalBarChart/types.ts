/**
 * HorizontalBarChart Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface HorizontalBarDataPoint {
  value: number;
  label: string;
  color?: string;
}

export interface HorizontalBarChartData {
  data: HorizontalBarDataPoint[];
  title?: string;
}

// Simple API
export interface HorizontalBarChartSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for labels (Y-axis) */
  labelKey: string;
  /** Key for values (X-axis) */
  dataKey: string;
  /** Colors for each bar (optional) */
  colors?: string[];
  barHeight?: number;
  barSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  maxBars?: number;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  testID?: string;
}

// Legacy API
export interface HorizontalBarChartLegacyProps {
  data: HorizontalBarChartData;
  labelKey?: never;
  dataKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  barHeight?: number;
  barSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  maxBars?: number;
  testID?: string;
}

export type HorizontalBarChartWidgetProps = HorizontalBarChartSimpleProps | HorizontalBarChartLegacyProps;
