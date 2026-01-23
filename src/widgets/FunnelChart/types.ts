/**
 * FunnelChart Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface FunnelStage {
  label: string;
  value: number;
  color?: string;
}

export interface FunnelChartData {
  stages: FunnelStage[];
  title?: string;
}

// Simple API
export interface FunnelChartSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for labels */
  labelKey: string;
  /** Key for values */
  valueKey: string;
  /** Colors for each stage (optional) */
  colors?: string[];
  showLabels?: boolean;
  showValues?: boolean;
  showPercentages?: boolean;
  stageSpacing?: number;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  testID?: string;
}

// Legacy API
export interface FunnelChartLegacyProps {
  data: FunnelChartData;
  labelKey?: never;
  valueKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  showLabels?: boolean;
  showValues?: boolean;
  showPercentages?: boolean;
  stageSpacing?: number;
  testID?: string;
}

export type FunnelChartWidgetProps = FunnelChartSimpleProps | FunnelChartLegacyProps;
