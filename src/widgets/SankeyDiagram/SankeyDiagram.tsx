/**
 * SankeyDiagram Widget - Flow visualization showing how values flow between nodes
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { useWidgetDimensions, useWidgetTheme, useStaggeredAnimation } from '../../core';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);
import { Text } from '../../renderer-svg/primitives';
import { SankeyDiagramWidgetProps, SankeyDiagramData, SankeyDiagramLegacyProps, SankeyDiagramSimpleProps } from './types';
import { isSimpleDataFormat, transformToSankeyData } from '../../core/utils/dataTransform';

interface LayoutNode {
  id: string;
  label: string;
  x: number;
  y: number;
  height: number;
  totalValue: number;
}

interface LayoutLink {
  source: LayoutNode;
  target: LayoutNode;
  value: number;
  sourceY: number;
  targetY: number;
  color: string;
}

export const SankeyDiagram = memo<SankeyDiagramWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    animated = true,
    theme: themeOverride,
    nodeWidth = 20,
    nodePadding = 20,
    showLabels = true,
    showValues = false,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 400, 300);


  // Transform data if using simple API
  const widgetData: SankeyDiagramData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'sourceKey' in props && 'targetKey' in props && 'valueKey' in props) {
      const simpleProps = props as SankeyDiagramSimpleProps;
      return transformToSankeyData(
        simpleProps.data,
        simpleProps.sourceKey,
        simpleProps.targetKey,
        simpleProps.valueKey,
        simpleProps.colors
      );
    }
    return (props as SankeyDiagramLegacyProps).data || null;
  }, [props]);

  if (loading) {
    return (
      <View style={[styles.container, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md }]} testID={`${testID}-loading`}>
        <RNText style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Loading...</RNText>
      </View>
    );
  }

  if (!widgetData || !widgetData.nodes || widgetData.nodes.length === 0) {
    return (
      <View style={[styles.container, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md }]} testID={`${testID}-empty`}>
        <RNText style={[styles.emptyText, { color: theme.colors.textSecondary }]}>No data</RNText>
      </View>
    );
  }

  const { nodes, links, title } = widgetData;
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const labelWidth = showLabels ? 60 : 0;

  const chartWidth = dimensions.width - padding * 2 - labelWidth * 2;
  const chartHeight = dimensions.height - padding * 2 - titleHeight;

  const defaultColors = [
    theme.colors.chartPrimary,
    theme.colors.chartSecondary,
    theme.colors.chartTertiary,
    theme.colors.chartQuaternary,
  ];

  // Simple Sankey layout algorithm
  const layout = useMemo(() => {
    // Calculate node values (sum of inputs/outputs)
    const nodeValues = new Map<string, number>();
    nodes.forEach(node => nodeValues.set(node.id, 0));
    
    links.forEach(link => {
      const sourceVal = nodeValues.get(link.source) || 0;
      const targetVal = nodeValues.get(link.target) || 0;
      nodeValues.set(link.source, Math.max(sourceVal, link.value));
      nodeValues.set(link.target, targetVal + link.value);
    });

    // Determine node layers (simple left-to-right)
    const layers = new Map<string, number>();
    const sourceNodes = new Set(links.map(l => l.source));
    const targetNodes = new Set(links.map(l => l.target));
    
    // Layer 0: nodes that are only sources
    nodes.forEach(node => {
      if (sourceNodes.has(node.id) && !targetNodes.has(node.id)) {
        layers.set(node.id, 0);
      }
    });
    
    // Layer 1: nodes that receive from layer 0
    nodes.forEach(node => {
      if (!layers.has(node.id)) {
        const hasLayer0Source = links.some(
          l => l.target === node.id && layers.get(l.source) === 0
        );
        if (hasLayer0Source) {
          layers.set(node.id, 1);
        }
      }
    });
    
    // Layer 2: everything else
    nodes.forEach(node => {
      if (!layers.has(node.id)) {
        layers.set(node.id, 2);
      }
    });

    const maxLayer = Math.max(...Array.from(layers.values()));
    const layerWidth = chartWidth / (maxLayer + 1);

    // Position nodes
    const positionedNodes: LayoutNode[] = [];
    const nodesByLayer = new Map<number, string[]>();
    
    layers.forEach((layer, nodeId) => {
      if (!nodesByLayer.has(layer)) {
        nodesByLayer.set(layer, []);
      }
      nodesByLayer.get(layer)!.push(nodeId);
    });

    nodesByLayer.forEach((nodeIds, layer) => {
      const layerHeight = chartHeight - (nodeIds.length - 1) * nodePadding;
      const totalValue = nodeIds.reduce((sum, id) => sum + (nodeValues.get(id) || 0), 0);
      
      let currentY = 0;
      nodeIds.forEach(nodeId => {
        const node = nodes.find(n => n.id === nodeId)!;
        const nodeValue = nodeValues.get(nodeId) || 0;
        const nodeHeight = Math.max((nodeValue / totalValue) * layerHeight, 20);
        
        positionedNodes.push({
          id: nodeId,
          label: node.label,
          x: layer * layerWidth + labelWidth,
          y: currentY,
          height: nodeHeight,
          totalValue: nodeValue,
        });
        
        currentY += nodeHeight + nodePadding;
      });
    });

    // Create link paths
    const positionedLinks: LayoutLink[] = [];
    links.forEach((link, index) => {
      const sourceNode = positionedNodes.find(n => n.id === link.source);
      const targetNode = positionedNodes.find(n => n.id === link.target);
      
      if (sourceNode && targetNode) {
        // Calculate vertical positions within nodes
        const sourceLinks = links.filter(l => l.source === link.source);
        const targetLinks = links.filter(l => l.target === link.target);
        
        const sourceLinkIndex = sourceLinks.findIndex(l => l === link);
        const targetLinkIndex = targetLinks.findIndex(l => l === link);
        
        const sourceTotal = sourceLinks.reduce((sum, l) => sum + l.value, 0);
        const targetTotal = targetLinks.reduce((sum, l) => sum + l.value, 0);
        
        const sourceOffsetBefore = sourceLinks
          .slice(0, sourceLinkIndex)
          .reduce((sum, l) => sum + l.value, 0);
        const targetOffsetBefore = targetLinks
          .slice(0, targetLinkIndex)
          .reduce((sum, l) => sum + l.value, 0);
        
        const sourceY = sourceNode.y + (sourceOffsetBefore / sourceTotal) * sourceNode.height;
        const targetY = targetNode.y + (targetOffsetBefore / targetTotal) * targetNode.height;
        const linkHeight = (link.value / sourceTotal) * sourceNode.height;

        positionedLinks.push({
          source: sourceNode,
          target: targetNode,
          value: link.value,
          sourceY,
          targetY,
          color: link.color || defaultColors[index % defaultColors.length],
        });
      }
    });

    return { layoutNodes: positionedNodes, layoutLinks: positionedLinks };
  }, [nodes, links, chartWidth, chartHeight, nodeWidth, nodePadding, labelWidth, defaultColors]);

  const { layoutNodes, layoutLinks } = layout;

  const linkAnimations = useStaggeredAnimation(layoutLinks.length, {
    enabled: animated,
    duration: 1000,
    easing: 'ease-out',
  });
  
  const nodeAnimations = useStaggeredAnimation(layoutNodes.length, {
    enabled: animated,
    duration: 800,
    easing: 'ease-out',
  });

  // Create curved paths for links
  function createLinkPath(link: LayoutLink, linkHeight: number): string {
    const sourceX = link.source.x + nodeWidth;
    const targetX = link.target.x;
    const midX = (sourceX + targetX) / 2;

    return `
      M ${sourceX} ${link.sourceY}
      C ${midX} ${link.sourceY}, ${midX} ${link.targetY}, ${targetX} ${link.targetY}
      L ${targetX} ${link.targetY + linkHeight}
      C ${midX} ${link.targetY + linkHeight}, ${midX} ${link.sourceY + linkHeight}, ${sourceX} ${link.sourceY + linkHeight}
      Z
    `;
  }

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <Svg width={chartWidth + labelWidth * 2} height={chartHeight}>
        {/* Links */}
        {layoutLinks.map((link, index) => {
          const linkHeight = (link.value / link.source.totalValue) * link.source.height;
          
          const pathAnimatedProps = useAnimatedProps(() => {
            'worklet';
            const progress = linkAnimations[index] ? linkAnimations[index].value : 1;
            return {
              opacity: progress * 0.4,
            };
          });
          
          return (
            <AnimatedPath
              key={`link-${index}`}
              d={createLinkPath(link, linkHeight)}
              fill={link.color}
              animatedProps={pathAnimatedProps}
            />
          );
        })}

        {/* Nodes */}
        {layoutNodes.map((node, index) => {
          const nodeAnimatedProps = useAnimatedProps(() => {
            'worklet';
            const progress = nodeAnimations[index] ? nodeAnimations[index].value : 1;
            const animatedHeight = node.height * progress;
            const centerY = node.y + node.height / 2;
            const animatedY = centerY - animatedHeight / 2;
            
            return {
              y: animatedY,
              height: animatedHeight,
              opacity: progress,
            };
          });
          
          return (
            <React.Fragment key={`node-${index}`}>
              <AnimatedRect
                x={node.x}
                width={nodeWidth}
                fill={theme.colors.chartPrimary}
                rx={theme.radius.sm}
                ry={theme.radius.sm}
                animatedProps={nodeAnimatedProps}
              />
            {showLabels && (
              <Text
                x={node.x < chartWidth / 2 ? node.x - 5 : node.x + nodeWidth + 5}
                y={node.y + node.height / 2}
                text={node.label}
                fontSize={theme.fontScale.xs}
                fill={theme.colors.text}
                textAnchor={node.x < chartWidth / 2 ? 'end' : 'start'}
              />
            )}
          </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
});

SankeyDiagram.displayName = 'SankeyDiagram';

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'center' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
});
