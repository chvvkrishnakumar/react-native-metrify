/**
 * LineChart Widget types - Full line chart with axes
 */
import { BaseWidgetProps, TimeInterval } from '../../core';

export interface LineChartDataPoint {
  x: number | Date;
  y: number;
}

export interface LineChartSeries {
  data: LineChartDataPoint[];
  color: string;
  label?: string;
  strokeWidth?: number;
}

export interface LineChartData {
  series: LineChartSeries[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  timeInterval?: TimeInterval;
}

// New data-driven API types
export interface LineChartSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key to use for X-axis values */
  xKey: string;
  /** Array of keys to plot as lines */
  dataKeys: string[];
  /** Colors for each dataKey (optional, will use defaults if not provided) */
  colors?: string[];
  /** Labels for each dataKey (optional, uses dataKey if not provided) */
  labels?: string[];
  /** Fill area under the line (makes it an area chart) */
  filled?: boolean;
  /** Show gradient fill when filled is true */
  showGradient?: boolean;
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  maxXLabels?: number;
  maxYLabels?: number;
  curveType?: 'linear' | 'smooth';
  testID?: string;
}

// Legacy API props
export interface LineChartLegacyProps {
  data: LineChartData;
  xKey?: never;
  dataKeys?: never;
  filled?: boolean;
  showGradient?: boolean;
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  maxXLabels?: number;
  maxYLabels?: number;
  curveType?: 'linear' | 'smooth';
  testID?: string;
}

export type LineChartWidgetProps = LineChartSimpleProps | LineChartLegacyProps;
