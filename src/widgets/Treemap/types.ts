/**
 * Treemap Widget types - Hierarchical data as nested rectangles
 */
import { BaseWidgetProps } from '../../core';

export interface TreemapNode {
  label: string;
  value: number;
  color?: string;
  children?: TreemapNode[];
}

export interface TreemapData {
  data: TreemapNode[];
  title?: string;
}

export interface TreemapWidgetProps extends BaseWidgetProps<TreemapData> {
  showLabels?: boolean;
  showValues?: boolean;
  colorScheme?: 'categorical' | 'sequential';
  padding?: number;
}
