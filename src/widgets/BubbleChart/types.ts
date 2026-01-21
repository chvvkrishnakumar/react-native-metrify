/**
 * BubbleChart Widget types - 3D scatter plot with size dimension
 */
import { BaseWidgetProps } from '../../core';

export interface BubbleDataPoint {
  x: number;
  y: number;
  size: number;
  label?: string;
}

export interface BubbleSeries {
  data: BubbleDataPoint[];
  color: string;
  label?: string;
}

export interface BubbleChartData {
  series: BubbleSeries[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export interface BubbleChartWidgetProps extends BaseWidgetProps<BubbleChartData> {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  minBubbleSize?: number;
  maxBubbleSize?: number;
}
