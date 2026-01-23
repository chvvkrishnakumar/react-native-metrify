/**
 * AreaChart Widget types
 * @deprecated AreaChart is now a wrapper around LineChart. Use LineChart types instead.
 */
import { LineChartWidgetProps } from '../LineChart/types';

// Re-export LineChart types for backward compatibility
export type AreaChartWidgetProps = LineChartWidgetProps;

// Legacy type aliases (for backward compatibility)
export type { LineChartDataPoint as AreaChartDataPoint } from '../LineChart/types';
export type { LineChartSeries as AreaChartSeries } from '../LineChart/types';
export type { LineChartData as AreaChartData } from '../LineChart/types';
export type { LineChartSimpleProps as AreaChartSimpleProps } from '../LineChart/types';
export type { LineChartLegacyProps as AreaChartLegacyProps } from '../LineChart/types';
