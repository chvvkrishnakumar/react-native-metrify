/**
 * BarChart Widget types
 */
import { BaseWidgetProps } from '../../core/types';

export interface BarDataPoint {
  value: number;
  label: string;
  color?: string;
}

export interface BarChartData {
  data: BarDataPoint[];
  title?: string;
}

export type BarOrientation = 'vertical' | 'horizontal';

// New data-driven API types
export interface BarChartSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key to use for labels (X-axis) */
  xKey: string;
  /** Key to use for values (Y-axis) */
  dataKey: string;
  /** Colors for each bar (optional, will use defaults if not provided) */
  colors?: string[];
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  orientation?: BarOrientation;
  barWidth?: number;
  barSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  minBarHeight?: number;
  minBarWidth?: number;
  maxBarWidth?: number;
  maxBars?: number;
  testID?: string;
}

// Legacy API props
export interface BarChartLegacyProps {
  data: BarChartData;
  xKey?: never;
  dataKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  orientation?: BarOrientation;
  barWidth?: number;
  barSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  minBarHeight?: number;
  minBarWidth?: number;
  maxBarWidth?: number;
  maxBars?: number;
  testID?: string;
}

export type BarChartWidgetProps = BarChartSimpleProps | BarChartLegacyProps;
