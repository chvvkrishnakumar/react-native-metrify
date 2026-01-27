/**
 * ScatterPlot Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface ScatterDataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface ScatterSeries {
  data: ScatterDataPoint[];
  color: string;
  label?: string;
  pointSize?: number;
}

export interface ScatterPlotData {
  series: ScatterSeries[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

// Simple API
export interface ScatterPlotSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for X-axis values */
  xKey: string;
  /** Key for Y-axis values */
  yKey: string;
  /** Optional key for point labels */
  labelKey?: string;
  /** Colors for each point (optional) */
  colors?: string[];
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  defaultPointSize?: number;
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  testID?: string;
}

// Legacy API
export interface ScatterPlotLegacyProps {
  data: ScatterPlotData;
  xKey?: never;
  yKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  defaultPointSize?: number;
  testID?: string;
}

export type ScatterPlotWidgetProps = ScatterPlotSimpleProps | ScatterPlotLegacyProps;
