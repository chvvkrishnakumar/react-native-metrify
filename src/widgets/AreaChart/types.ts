/**
 * AreaChart Widget types
 */
import { BaseWidgetProps, TimeInterval } from '../../core';

export interface AreaChartDataPoint {
  x: number | Date;
  y: number;
}

export interface AreaChartSeries {
  data: AreaChartDataPoint[];
  color: string;
  label?: string;
}

export interface AreaChartData {
  series: AreaChartSeries[];
  title?: string;
  timeInterval?: TimeInterval;
}

export type AreaChartStyle = 'smooth' | 'linear';

export interface AreaChartWidgetProps extends BaseWidgetProps<AreaChartData> {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showGradient?: boolean;
  stacked?: boolean;
  curveStyle?: AreaChartStyle;
  maxXLabels?: number;
}
