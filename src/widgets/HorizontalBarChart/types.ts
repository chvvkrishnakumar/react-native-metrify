/**
 * HorizontalBarChart Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface HorizontalBarDataPoint {
  value: number;
  label: string;
  color?: string;
}

export interface HorizontalBarChartData {
  data: HorizontalBarDataPoint[];
  title?: string;
}

export interface HorizontalBarChartWidgetProps extends BaseWidgetProps<HorizontalBarChartData> {
  barHeight?: number;
  barSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  maxBars?: number;
}
