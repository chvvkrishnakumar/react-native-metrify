/**
 * KPI Widget types
 */
import { BaseWidgetProps, TrendDirection } from '../../core/types';

export type KPIFormat = 'number' | 'currency' | 'percent' | 'compact';

export interface KPIData {
  value: number;
  label: string;
  delta?: number;
  trend?: TrendDirection;
  format?: KPIFormat;
}

// Note: KPI uses single value, Simple API not applicable
export type KPIWidgetProps = BaseWidgetProps<KPIData> & {
  showTrend?: boolean;
  showDelta?: boolean;
};
