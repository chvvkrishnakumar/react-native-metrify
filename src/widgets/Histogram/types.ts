/**
 * Histogram Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface HistogramData {
  data: number[];
  title?: string;
  binCount?: number;
}

export interface HistogramWidgetProps extends BaseWidgetProps<HistogramData> {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  color?: string;
  barSpacing?: number;
}
