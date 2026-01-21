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

export interface KPIWidgetProps extends BaseWidgetProps<KPIData> {
  showTrend?: boolean;
  showDelta?: boolean;
}
