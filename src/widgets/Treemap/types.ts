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

// Simple API
export interface TreemapSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for label values */
  labelKey: string;
  /** Key for value */
  valueKey: string;
  /** Optional key for parent (enables hierarchical structure) */
  parentKey?: string;
  /** Optional colors for nodes */
  colors?: string[];
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  testID?: string;
  showLabels?: boolean;
  showValues?: boolean;
  colorScheme?: 'categorical' | 'sequential';
  padding?: number;
}

// Legacy API
export interface TreemapLegacyProps {
  data: TreemapData;
  labelKey?: never;
  valueKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  testID?: string;
  showLabels?: boolean;
  showValues?: boolean;
  colorScheme?: 'categorical' | 'sequential';
  padding?: number;
}

export type TreemapWidgetProps = TreemapSimpleProps | TreemapLegacyProps;
