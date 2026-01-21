/**
 * Progress Widget types
 */
import { BaseWidgetProps } from '../../core/types';

export interface ProgressData {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
}

export type ProgressVariant = 'bar' | 'circle';

export interface ProgressWidgetProps extends BaseWidgetProps<ProgressData> {
  variant?: ProgressVariant;
  barHeight?: number;
  showValue?: boolean;
}
