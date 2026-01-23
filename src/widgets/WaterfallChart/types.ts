/**
 * WaterfallChart Widget types - Shows incremental changes
 */
import { BaseWidgetProps } from '../../core';

export interface WaterfallDataPoint {
  label: string;
  value: number;
  isTotal?: boolean;
}

export interface WaterfallChartData {
  data: WaterfallDataPoint[];
  title?: string;
  startLabel?: string;
}

// Simple API
export interface WaterfallChartSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for labels */
  labelKey: string;
  /** Key for values */
  valueKey: string;
  /** Colors for each bar (optional) */
  colors?: string[];
  showValues?: boolean;
  showLabels?: boolean;
  positiveColor?: string;
  negativeColor?: string;
  totalColor?: string;
  barWidth?: number;
  barSpacing?: number;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  testID?: string;
}

// Legacy API
export interface WaterfallChartLegacyProps {
  data: WaterfallChartData;
  labelKey?: never;
  valueKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  showValues?: boolean;
  showLabels?: boolean;
  positiveColor?: string;
  negativeColor?: string;
  totalColor?: string;
  barWidth?: number;
  barSpacing?: number;
  testID?: string;
}

export type WaterfallChartWidgetProps = WaterfallChartSimpleProps | WaterfallChartLegacyProps;
