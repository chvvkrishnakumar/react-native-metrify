/**
 * SunburstChart Widget types - Circular hierarchical visualization
 */
import { BaseWidgetProps } from '../../core';

export interface SunburstNode {
  label: string;
  value: number;
  color?: string;
  children?: SunburstNode[];
}

export interface SunburstChartData {
  data: SunburstNode[];
  title?: string;
}

export interface SunburstChartWidgetProps extends BaseWidgetProps<SunburstChartData> {
  showLabels?: boolean;
  size?: number;
  innerRadius?: number;
}
