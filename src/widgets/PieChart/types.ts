/**
 * PieChart Widget types
 */
import { BaseWidgetProps } from '../../core/types';

export interface PieSegment {
  value: number;
  label: string;
  color: string;
}

export interface PieChartData {
  segments: PieSegment[];
  title?: string;
}

export type PieChartVariant = 'pie' | 'donut';

export interface PieChartWidgetProps extends BaseWidgetProps<PieChartData> {
  variant?: PieChartVariant;
  innerRadius?: number; // For donut chart (0-1, percentage of outer radius)
  showLabels?: boolean;
  showValues?: boolean;
  showPercentages?: boolean;
  size?: number;
}
