/**
 * StackedBarChart Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface StackedBarSegment {
  value: number;
  color: string;
  label: string;
}

export interface StackedBarDataPoint {
  label: string;
  segments: StackedBarSegment[];
}

export interface StackedBarChartData {
  data: StackedBarDataPoint[];
  title?: string;
}

export interface StackedBarChartWidgetProps extends BaseWidgetProps<StackedBarChartData> {
  barWidth?: number;
  barSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  showLegend?: boolean;
  maxBars?: number;
}
