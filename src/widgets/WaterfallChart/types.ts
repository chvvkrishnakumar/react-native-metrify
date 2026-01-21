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

export interface WaterfallChartWidgetProps extends BaseWidgetProps<WaterfallChartData> {
  showValues?: boolean;
  showLabels?: boolean;
  positiveColor?: string;
  negativeColor?: string;
  totalColor?: string;
  barWidth?: number;
  barSpacing?: number;
}
