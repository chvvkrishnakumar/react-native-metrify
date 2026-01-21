/**
 * RadarChart Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface RadarDataPoint {
  axis: string;
  value: number;
}

export interface RadarSeries {
  data: RadarDataPoint[];
  color: string;
  label?: string;
}

export interface RadarChartData {
  series: RadarSeries[];
  title?: string;
  maxValue?: number;
}

export interface RadarChartWidgetProps extends BaseWidgetProps<RadarChartData> {
  showLabels?: boolean;
  showLegend?: boolean;
  showGrid?: boolean;
  gridLevels?: number;
  size?: number;
}
