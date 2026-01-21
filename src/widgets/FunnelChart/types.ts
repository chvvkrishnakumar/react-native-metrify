/**
 * FunnelChart Widget types
 */
import { BaseWidgetProps } from '../../core';

export interface FunnelStage {
  label: string;
  value: number;
  color?: string;
}

export interface FunnelChartData {
  stages: FunnelStage[];
  title?: string;
}

export interface FunnelChartWidgetProps extends BaseWidgetProps<FunnelChartData> {
  showLabels?: boolean;
  showValues?: boolean;
  showPercentages?: boolean;
  stageSpacing?: number;
}
