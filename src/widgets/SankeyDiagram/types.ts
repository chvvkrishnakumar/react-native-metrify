/**
 * SankeyDiagram Widget types - Flow visualization
 */
import { BaseWidgetProps } from '../../core';

export interface SankeyNode {
  id: string;
  label: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color?: string;
}

export interface SankeyDiagramData {
  nodes: SankeyNode[];
  links: SankeyLink[];
  title?: string;
}

// Simple API
export interface SankeyDiagramSimpleProps {
  /** Array of data objects representing flows */
  data: Record<string, any>[];
  /** Key for source node */
  sourceKey: string;
  /** Key for target node */
  targetKey: string;
  /** Key for flow value */
  valueKey: string;
  /** Optional colors for links */
  colors?: string[];
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  testID?: string;
  nodeWidth?: number;
  nodePadding?: number;
  showLabels?: boolean;
  showValues?: boolean;
}

// Legacy API
export interface SankeyDiagramLegacyProps {
  data: SankeyDiagramData;
  sourceKey?: never;
  targetKey?: never;
  valueKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  animated?: boolean;
  theme?: any;
  testID?: string;
  nodeWidth?: number;
  nodePadding?: number;
  showLabels?: boolean;
  showValues?: boolean;
}

export type SankeyDiagramWidgetProps = SankeyDiagramSimpleProps | SankeyDiagramLegacyProps;
