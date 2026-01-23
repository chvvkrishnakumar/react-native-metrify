/**
 * Treemap Widget - Hierarchical data visualization
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { useWidgetDimensions, useWidgetTheme } from '../../core';
import { Text } from '../../renderer-svg/primitives';
import { TreemapWidgetProps, TreemapNode, TreemapData, TreemapLegacyProps, TreemapSimpleProps } from './types';
import { isSimpleDataFormat, transformToTreemapData } from '../../core/utils/dataTransform';

interface LayoutRect {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  value: number;
  color: string;
}

// Simple squarified treemap algorithm
function squarify(
  data: TreemapNode[],
  x: number,
  y: number,
  width: number,
  height: number,
  colors: string[]
): LayoutRect[] {
  const rects: LayoutRect[] = [];
  const totalValue = data.reduce((sum, node) => sum + node.value, 0);
  
  if (totalValue === 0) return rects;

  let currentX = x;
  let currentY = y;
  let remainingWidth = width;
  let remainingHeight = height;

  // Sort by value descending for better layout
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  sortedData.forEach((node, index) => {
    const ratio = node.value / totalValue;
    const color = node.color || colors[index % colors.length];

    // Simple layout: horizontal strip
    if (remainingWidth >= remainingHeight) {
      // Lay out vertically
      const rectWidth = width * ratio;
      rects.push({
        x: currentX,
        y: currentY,
        width: rectWidth,
        height: remainingHeight,
        label: node.label,
        value: node.value,
        color,
      });
      currentX += rectWidth;
      remainingWidth -= rectWidth;
    } else {
      // Lay out horizontally
      const rectHeight = height * ratio;
      rects.push({
        x: currentX,
        y: currentY,
        width: remainingWidth,
        height: rectHeight,
        label: node.label,
        value: node.value,
        color,
      });
      currentY += rectHeight;
      remainingHeight -= rectHeight;
    }
  });

  return rects;
}

export const Treemap = memo<TreemapWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    theme: themeOverride,
    showLabels = true,
    showValues = true,
    colorScheme = 'categorical',
    padding = 2,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 350, 300);

  // Transform data if using simple API
  const widgetData: TreemapData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'labelKey' in props && 'valueKey' in props) {
      const simpleProps = props as TreemapSimpleProps;
      return transformToTreemapData(
        simpleProps.data,
        simpleProps.labelKey,
        simpleProps.valueKey,
        simpleProps.parentKey,
        simpleProps.colors
      );
    }
    return (props as TreemapLegacyProps).data || null;
  }, [props]);

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
  const chartPadding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;

  const chartWidth = dimensions.width - chartPadding * 2;
  const chartHeight = dimensions.height - chartPadding * 2 - titleHeight;

  const colors = [
    theme.colors.chartPrimary,
    theme.colors.chartSecondary,
    theme.colors.chartTertiary,
    theme.colors.chartQuaternary,
    theme.colors.chartPositive,
    theme.colors.chartNegative,
  ];

  const rectangles = useMemo(() => {
    return squarify(data, 0, 0, chartWidth, chartHeight, colors);
  }, [data, chartWidth, chartHeight, colors]);

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding: chartPadding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <Svg width={chartWidth} height={chartHeight}>
        {rectangles.map((rect, index) => (
          <React.Fragment key={`rect-${index}`}>
            <Rect
              x={rect.x + padding}
              y={rect.y + padding}
              width={Math.max(0, rect.width - padding * 2)}
              height={Math.max(0, rect.height - padding * 2)}
              fill={rect.color}
              opacity={0.8}
              rx={theme.radius.sm}
              ry={theme.radius.sm}
            />
            {showLabels && rect.width > 40 && rect.height > 30 && (
              <Text
                x={rect.x + rect.width / 2}
                y={rect.y + rect.height / 2 - (showValues ? 6 : 0)}
                text={rect.label}
                fontSize={theme.fontScale.xs}
                fill="#FFFFFF"
                textAnchor="middle"
                fontWeight="600"
              />
            )}
            {showValues && rect.width > 40 && rect.height > 30 && (
              <Text
                x={rect.x + rect.width / 2}
                y={rect.y + rect.height / 2 + (showLabels ? 10 : 0)}
                text={rect.value.toString()}
                fontSize={theme.fontScale.xs}
                fill="#FFFFFF"
                textAnchor="middle"
                opacity={0.9}
              />
            )}
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
});

Treemap.displayName = 'Treemap';

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'center' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
});
