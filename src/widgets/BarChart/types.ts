/**
 * BarChart Widget types
 */
import { BaseWidgetProps } from '../../core/types';

export interface BarDataPoint {
  value: number;
  label: string;
  color?: string;
}

export interface BarChartData {
  data: BarDataPoint[];
  title?: string;
}

export type BarOrientation = 'vertical' | 'horizontal';

export interface BarChartWidgetProps extends BaseWidgetProps<BarChartData> {
  orientation?: BarOrientation;
  barWidth?: number;
  barSpacing?: number;
  showValues?: boolean;
  showLabels?: boolean;
  minBarHeight?: number;
  maxBars?: number;
}
