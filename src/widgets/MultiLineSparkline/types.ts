/**
 * MultiLineSparkline Widget types
 */
import { BaseWidgetProps } from '../../core/types';

export interface SparklineSeries {
  data: number[];
  color: string;
  label?: string;
  strokeWidth?: number;
}

export interface MultiLineSparklineData {
  series: SparklineSeries[];
  labels?: string[];
}

export type SparklineRenderStyle = 'line' | 'area';

// Simple API
export interface MultiLineSparklineSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Keys for values to plot as sparklines */
  dataKeys: string[];
  /** Colors for each sparkline (optional) */
  colors?: string[];
  /** Labels for each sparkline (optional) */
  labels?: string[];
  style?: SparklineRenderStyle;
  showLegend?: boolean;
  maxDataPoints?: number;
  minHeight?: number;
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  testID?: string;
}

// Legacy API
export interface MultiLineSparklineLegacyProps {
  data: MultiLineSparklineData;
  dataKeys?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  style?: SparklineRenderStyle;
  showLegend?: boolean;
  maxDataPoints?: number;
  minHeight?: number;
  testID?: string;
}

export type MultiLineSparklineWidgetProps = MultiLineSparklineSimpleProps | MultiLineSparklineLegacyProps;
