/**
 * Heatmap Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface HeatmapDataPoint {
  x: number | string;
  y: number | string;
  value: number;
}

export interface HeatmapData {
  data: HeatmapDataPoint[];
  xLabels: string[];
  yLabels: string[];
  title?: string;
}

export interface HeatmapWidgetProps extends BaseWidgetProps<HeatmapData> {
  cellSize?: number;
  cellSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  colorScheme?: 'blue' | 'green' | 'red' | 'purple' | 'gradient';
  minColor?: string;
  maxColor?: string;
}
