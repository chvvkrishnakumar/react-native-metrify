/**
 * ScatterPlot Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface ScatterDataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface ScatterSeries {
  data: ScatterDataPoint[];
  color: string;
  label?: string;
  pointSize?: number;
}

export interface ScatterPlotData {
  series: ScatterSeries[];
  title?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
}

export interface ScatterPlotWidgetProps extends BaseWidgetProps<ScatterPlotData> {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  defaultPointSize?: number;
}
