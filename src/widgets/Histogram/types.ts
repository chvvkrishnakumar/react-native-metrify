/**
 * Histogram Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface HistogramData {
  data: number[];
  title?: string;
  binCount?: number;
}

// Simple API
export interface HistogramSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for values to create histogram from */
  valueKey: string;
  /** Number of bins (optional) */
  bins?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  color?: string;
  barSpacing?: number;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  testID?: string;
}

// Legacy API
export interface HistogramLegacyProps {
  data: HistogramData;
  valueKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  color?: string;
  barSpacing?: number;
  testID?: string;
}

export type HistogramWidgetProps = HistogramSimpleProps | HistogramLegacyProps;
