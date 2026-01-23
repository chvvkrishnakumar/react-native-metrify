/**
 * SunburstChart Widget types - Circular hierarchical visualization
 */
import { BaseWidgetProps } from '../../core';

export interface SunburstNode {
  label: string;
  value: number;
  color?: string;
  children?: SunburstNode[];
}

export interface SunburstChartData {
  data: SunburstNode[];
  title?: string;
}

// Simple API
export interface SunburstChartSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for label values */
  labelKey: string;
  /** Key for value */
  valueKey: string;
  /** Optional key for parent (enables hierarchical structure) */
  parentKey?: string;
  /** Optional colors for nodes */
  colors?: string[];
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  testID?: string;
  showLabels?: boolean;
  size?: number;
  innerRadius?: number;
}

// Legacy API
export interface SunburstChartLegacyProps {
  data: SunburstChartData;
  labelKey?: never;
  valueKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  testID?: string;
  showLabels?: boolean;
  size?: number;
  innerRadius?: number;
}

export type SunburstChartWidgetProps = SunburstChartSimpleProps | SunburstChartLegacyProps;
