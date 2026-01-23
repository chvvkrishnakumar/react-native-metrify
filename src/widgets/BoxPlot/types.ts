/**
 * BoxPlot Widget types - Statistical distribution (quartiles, outliers)
 */
import { BaseWidgetProps } from '../../core';

export interface BoxPlotDataPoint {
  label: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
}

export interface BoxPlotData {
  data: BoxPlotDataPoint[];
  title?: string;
}

// Simple API
export interface BoxPlotSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for labels */
  labelKey: string;
  /** Key for min values */
  minKey: string;
  /** Key for Q1 values */
  q1Key: string;
  /** Key for median values */
  medianKey: string;
  /** Key for Q3 values */
  q3Key: string;
  /** Key for max values */
  maxKey: string;
  /** Colors for each box (optional) */
  colors?: string[];
  showLabels?: boolean;
  showOutliers?: boolean;
  boxWidth?: number;
  boxSpacing?: number;
  color?: string;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  testID?: string;
}

// Legacy API
export interface BoxPlotLegacyProps {
  data: BoxPlotData;
  labelKey?: never;
  minKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  showLabels?: boolean;
  showOutliers?: boolean;
  boxWidth?: number;
  boxSpacing?: number;
  color?: string;
  testID?: string;
}

export type BoxPlotWidgetProps = BoxPlotSimpleProps | BoxPlotLegacyProps;
