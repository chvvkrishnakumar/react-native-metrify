/**
 * SunburstChart Widget - Hierarchical data in concentric rings
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useWidgetDimensions, useWidgetTheme, polarToCartesian } from '../../core';
import { createDonutArcPath } from '../../renderer-svg';
import { SunburstChartWidgetProps, SunburstNode } from './types';

interface SunburstSegment {
  path: string;
  color: string;
  label: string;
  level: number;
}

function calculateSunburst(
  nodes: SunburstNode[],
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
  level: number,
  colors: string[]
): SunburstSegment[] {
  const segments: SunburstSegment[] = [];
  const totalValue = nodes.reduce((sum, node) => sum + node.value, 0);
  
  if (totalValue === 0) return segments;

  let currentAngle = startAngle;
  const radiusStep = (outerRadius - innerRadius) / 3; // Support 3 levels

  nodes.forEach((node, index) => {
    const angleSpan = ((endAngle - startAngle) * node.value) / totalValue;
    const nodeEndAngle = currentAngle + angleSpan;
    
    const levelInnerRadius = innerRadius + level * radiusStep;
    const levelOuterRadius = innerRadius + (level + 1) * radiusStep;
    
    const color = node.color || colors[index % colors.length];

    // Create arc for this node
    const path = createDonutArcPath({
      cx,
      cy,
      radius: levelOuterRadius,
      innerRadius: levelInnerRadius,
      startAngle: currentAngle,
      endAngle: nodeEndAngle,
    });

    segments.push({
      path,
      color,
      label: node.label,
      level,
    });

    // Recursively process children
    if (node.children && node.children.length > 0) {
      const childSegments = calculateSunburst(
        node.children,
        cx,
        cy,
        innerRadius,
        outerRadius,
        currentAngle,
        nodeEndAngle,
        level + 1,
        colors
      );
      segments.push(...childSegments);
    }

    currentAngle = nodeEndAngle;
  });

  return segments;
}

export const SunburstChart = memo<SunburstChartWidgetProps>(({
  data: widgetData,
  width,
  height,
  loading = false,
  theme: themeOverride,
  showLabels = false,
  size: customSize,
  innerRadius = 30,
  testID,
}) => {
  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 350, 350);

  if (loading) {
    return (
      <View style={[styles.container, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md }]} testID={`${testID}-loading`}>
        <RNText style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Loading...</RNText>
      </View>
    );
  }

  if (!widgetData || !widgetData.data || widgetData.data.length === 0) {
    return (
      <View style={[styles.container, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md }]} testID={`${testID}-empty`}>
        <RNText style={[styles.emptyText, { color: theme.colors.textSecondary }]}>No data</RNText>
      </View>
    );
  }

  const { data, title } = widgetData;
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;

  const availableSize = Math.min(
    dimensions.width - padding * 2,
    dimensions.height - padding * 2 - titleHeight
  );
  
  const chartSize = customSize || availableSize;
  const center = chartSize / 2;
  const outerRadius = chartSize / 2 - 10;

  const colors = [
    theme.colors.chartPrimary,
    theme.colors.chartSecondary,
    theme.colors.chartTertiary,
    theme.colors.chartQuaternary,
    theme.colors.chartPositive,
    theme.colors.chartNegative,
  ];

  const segments = useMemo(() => {
    return calculateSunburst(data, center, center, innerRadius, outerRadius, 0, 360, 0, colors);
  }, [data, center, innerRadius, outerRadius, colors]);

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <View style={styles.chartContainer}>
        <Svg width={chartSize} height={chartSize}>
          {segments.map((segment, index) => (
            <Path
              key={`segment-${index}`}
              d={segment.path}
              fill={segment.color}
              opacity={0.8 - segment.level * 0.1}
              stroke={theme.colors.background}
              strokeWidth={2}
            />
          ))}
        </Svg>
      </View>
    </View>
  );
});

SunburstChart.displayName = 'SunburstChart';

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'center' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
  chartContainer: { alignItems: 'center', justifyContent: 'center' },
});
