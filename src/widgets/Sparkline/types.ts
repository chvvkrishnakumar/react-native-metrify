/**
 * Sparkline Widget types
 */
import { BaseWidgetProps } from '../../core/types';

export interface SparklineData {
  data: number[];
  label?: string;
}

export type SparklineStyle = 'line' | 'area';

// Simple API
export interface SparklineSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for values to plot */
  valueKey: string;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  testID?: string;
  style?: SparklineStyle;
  strokeWidth?: number;
  showGradient?: boolean;
  maxDataPoints?: number;
}

// Legacy API
export interface SparklineLegacyProps {
  data: SparklineData;
  valueKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  style?: SparklineStyle;
  strokeWidth?: number;
  showGradient?: boolean;
  maxDataPoints?: number;
  testID?: string;
}

export type SparklineWidgetProps = SparklineSimpleProps | SparklineLegacyProps;
