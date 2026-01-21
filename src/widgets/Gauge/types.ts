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

export interface GaugeWidgetProps extends BaseWidgetProps<GaugeData> {
  startAngle?: number;
  endAngle?: number;
  thickness?: number;
  showValue?: boolean;
  showLabel?: boolean;
}
