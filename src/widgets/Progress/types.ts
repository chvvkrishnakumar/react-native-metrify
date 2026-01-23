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

// Note: Progress uses single value, Simple API not applicable
export type ProgressWidgetProps = BaseWidgetProps<ProgressData> & {
  variant?: ProgressVariant;
  barHeight?: number;
  showValue?: boolean;
};
