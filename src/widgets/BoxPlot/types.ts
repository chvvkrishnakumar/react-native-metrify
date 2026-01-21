/**
 * BoxPlot Widget types - Statistical distribution (quartiles, outliers)
 */
import { BaseWidgetProps } from '../../core';

export interface BoxPlotDataPoint {
  label: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
}

export interface BoxPlotData {
  data: BoxPlotDataPoint[];
  title?: string;
}

export interface BoxPlotWidgetProps extends BaseWidgetProps<BoxPlotData> {
  showLabels?: boolean;
  showOutliers?: boolean;
  boxWidth?: number;
  boxSpacing?: number;
  color?: string;
}
