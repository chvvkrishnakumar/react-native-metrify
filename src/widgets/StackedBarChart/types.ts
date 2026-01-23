/**
 * StackedBarChart Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface StackedBarSegment {
  value: number;
  color: string;
  label: string;
}

export interface StackedBarDataPoint {
  label: string;
  segments: StackedBarSegment[];
}

export interface StackedBarChartData {
  data: StackedBarDataPoint[];
  title?: string;
}

// Simple API
export interface StackedBarChartSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for category labels */
  categoryKey: string;
  /** Keys for values to stack */
  dataKeys: string[];
  /** Colors for each segment (optional) */
  colors?: string[];
  /** Labels for each dataKey (optional) */
  labels?: string[];
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  barWidth?: number;
  barSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  showLegend?: boolean;
  maxBars?: number;
  testID?: string;
}

// Legacy API
export interface StackedBarChartLegacyProps {
  data: StackedBarChartData;
  categoryKey?: never;
  dataKeys?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  barWidth?: number;
  barSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  showLegend?: boolean;
  maxBars?: number;
  testID?: string;
}

export type StackedBarChartWidgetProps = StackedBarChartSimpleProps | StackedBarChartLegacyProps;
