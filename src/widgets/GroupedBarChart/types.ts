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

export interface GroupedBarChartWidgetProps extends BaseWidgetProps<GroupedBarChartData> {
  barWidth?: number;
  groupSpacing?: number;
  barSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  showLegend?: boolean;
  maxGroups?: number;
}
