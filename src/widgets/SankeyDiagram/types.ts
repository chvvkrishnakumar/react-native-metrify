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

export interface SankeyDiagramWidgetProps extends BaseWidgetProps<SankeyDiagramData> {
  nodeWidth?: number;
  nodePadding?: number;
  showLabels?: boolean;
  showValues?: boolean;
}
