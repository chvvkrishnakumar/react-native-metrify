/**
 * GroupedBarChart Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface GroupedBarValue {
  value: number;
  color: string;
  label: string;
}

export interface GroupedBarDataPoint {
  groupLabel: string;
  values: GroupedBarValue[];
}

export interface GroupedBarChartData {
  data: GroupedBarDataPoint[];
  title?: string;
}

// Simple API
export interface GroupedBarChartSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for category/group labels */
  categoryKey: string;
  /** Keys for values to group together */
  dataKeys: string[];
  /** Colors for each group (optional) */
  colors?: string[];
  /** Labels for each dataKey (optional) */
  labels?: string[];
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  barWidth?: number;
  groupSpacing?: number;
  barSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  showLegend?: boolean;
  maxGroups?: number;
  testID?: string;
}

// Legacy API
export interface GroupedBarChartLegacyProps {
  data: GroupedBarChartData;
  categoryKey?: never;
  dataKeys?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  barWidth?: number;
  groupSpacing?: number;
  barSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  showLegend?: boolean;
  maxGroups?: number;
  testID?: string;
}

export type GroupedBarChartWidgetProps = GroupedBarChartSimpleProps | GroupedBarChartLegacyProps;
