/**
 * LineChart Widget types - Full line chart with axes
 */
import { BaseWidgetProps, TimeInterval } from '../../core';

export interface LineChartDataPoint {
  x: number | Date;
  y: number;
}

export interface LineChartSeries {
  data: LineChartDataPoint[];
  color: string;
  label?: string;
  strokeWidth?: number;
}

export interface LineChartData {
  series: LineChartSeries[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  timeInterval?: TimeInterval;
}

export interface LineChartWidgetProps extends BaseWidgetProps<LineChartData> {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  maxXLabels?: number;
  maxYLabels?: number;
  curveType?: 'linear' | 'smooth';
}
