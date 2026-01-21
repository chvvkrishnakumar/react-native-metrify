/**
 * MultiLineSparkline Widget types
 */
import { BaseWidgetProps } from '../../core/types';

export interface SparklineSeries {
  data: number[];
  color: string;
  label?: string;
  strokeWidth?: number;
}

export interface MultiLineSparklineData {
  series: SparklineSeries[];
  labels?: string[];
}

export type SparklineRenderStyle = 'line' | 'area';

export interface MultiLineSparklineWidgetProps extends BaseWidgetProps<MultiLineSparklineData> {
  style?: SparklineRenderStyle;
  showLegend?: boolean;
  maxDataPoints?: number;
  minHeight?: number;
}
