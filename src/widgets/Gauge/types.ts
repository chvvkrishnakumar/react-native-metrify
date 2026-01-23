/**
 * Gauge Widget types
 */
import { BaseWidgetProps } from '../../core/types';

export interface GaugeData {
  value: number;
  max: number;
  label?: string;
  unit?: string;
}

// Note: Gauge uses single value, Simple API not applicable
export type GaugeWidgetProps = BaseWidgetProps<GaugeData> & {
  startAngle?: number;
  endAngle?: number;
  thickness?: number;
  showValue?: boolean;
  showLabel?: boolean;
};
