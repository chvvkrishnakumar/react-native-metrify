/**
 * BubbleChart Widget types - 3D scatter plot with size dimension
 */
import { BaseWidgetProps } from '../../core';

export interface BubbleDataPoint {
  x: number;
  y: number;
  size: number;
  label?: string;
}

export interface BubbleSeries {
  data: BubbleDataPoint[];
  color: string;
  label?: string;
}

export interface BubbleChartData {
  series: BubbleSeries[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

// Simple API
export interface BubbleChartSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for X-axis values */
  xKey: string;
  /** Key for Y-axis values */
  yKey: string;
  /** Key for bubble size */
  sizeKey: string;
  /** Optional key for point labels */
  labelKey?: string;
  /** Colors for each bubble (optional) */
  colors?: string[];
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  minBubbleSize?: number;
  maxBubbleSize?: number;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  testID?: string;
}

// Legacy API
export interface BubbleChartLegacyProps {
  data: BubbleChartData;
  xKey?: never;
  yKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  minBubbleSize?: number;
  maxBubbleSize?: number;
  testID?: string;
}

export type BubbleChartWidgetProps = BubbleChartSimpleProps | BubbleChartLegacyProps;
