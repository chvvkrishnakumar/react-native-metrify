/**
 * Sparkline Widget types
 */
import { BaseWidgetProps } from '../../core/types';

export interface SparklineData {
  data: number[];
  label?: string;
}

export type SparklineStyle = 'line' | 'area';

export interface SparklineWidgetProps extends BaseWidgetProps<SparklineData> {
  style?: SparklineStyle;
  strokeWidth?: number;
  showGradient?: boolean;
  maxDataPoints?: number;
}
