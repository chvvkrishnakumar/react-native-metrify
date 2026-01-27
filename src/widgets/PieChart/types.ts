/**
 * PieChart Widget types
 */
import { BaseWidgetProps } from '../../core/types';

export interface PieSegment {
  value: number;
  label: string;
  color: string;
}

export interface PieChartData {
  segments: PieSegment[];
  title?: string;
}

export type PieChartVariant = 'pie' | 'donut';

// Simple API
export interface PieChartSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for labels */
  labelKey: string;
  /** Key for values */
  valueKey: string;
  /** Colors for each segment (optional) */
  colors?: string[];
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  variant?: PieChartVariant;
  innerRadius?: number;
  showLabels?: boolean;
  showValues?: boolean;
  showPercentages?: boolean;
  size?: number;
  testID?: string;
}

// Legacy API
export interface PieChartLegacyProps {
  data: PieChartData;
  labelKey?: never;
  valueKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  variant?: PieChartVariant;
  innerRadius?: number;
  showLabels?: boolean;
  showValues?: boolean;
  showPercentages?: boolean;
  size?: number;
  testID?: string;
}

export type PieChartWidgetProps = PieChartSimpleProps | PieChartLegacyProps;
