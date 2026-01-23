/**
 * Heatmap Widget - Grid of colored cells
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { useWidgetDimensions, useWidgetTheme, normalize } from '../../core';
import { Text } from '../../renderer-svg/primitives';
import { HeatmapData, HeatmapLegacyProps, HeatmapSimpleProps, HeatmapWidgetProps } from './types';
import { isSimpleDataFormat, transformToHeatmapData } from '../../core/utils/dataTransform';

export const Heatmap = memo<HeatmapWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    theme: themeOverride,
    cellSize = 30,
    cellSpacing = 2,
    showValues = false,
    showLabels = true,
    colorScheme = 'blue',
    minColor,
    maxColor,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 400, 300);

  // Transform data if using simple API
  const widgetData: HeatmapData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'xKey' in props && 'yKey' in props && 'valueKey' in props) {
      const simpleProps = props as HeatmapSimpleProps;
      const transformed = transformToHeatmapData(simpleProps.data, simpleProps.xKey, simpleProps.yKey, simpleProps.valueKey);
      const xLabels = [...new Set(transformed.data.map(d => d.x))];
      const yLabels = [...new Set(transformed.data.map(d => d.y))];
      return { data: transformed.data, xLabels, yLabels };
    }
    return (props as HeatmapLegacyProps).data || null;
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

  const { data, xLabels, yLabels, title } = widgetData;
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const yLabelWidth = showLabels ? 60 : 0;
  const xLabelHeight = showLabels ? 30 : 0;

  // Get min/max values for color scaling
  const { minValue, maxValue } = useMemo(() => {
    const values = data.map(d => d.value);
    return {
      minValue: Math.min(...values),
      maxValue: Math.max(...values),
    };
  }, [data]);

  // Color scheme mapping
  const getColorForValue = (value: number): string => {
    const normalizedValue = normalize(value, minValue, maxValue);
    
    if (minColor && maxColor) {
      // Custom colors - simple interpolation
      return interpolateColor(minColor, maxColor, normalizedValue);
    }

    // Predefined color schemes
    switch (colorScheme) {
      case 'blue':
        return `rgba(59, 130, 246, ${0.2 + normalizedValue * 0.8})`;
      case 'green':
        return `rgba(16, 185, 129, ${0.2 + normalizedValue * 0.8})`;
      case 'red':
        return `rgba(239, 68, 68, ${0.2 + normalizedValue * 0.8})`;
      case 'purple':
        return `rgba(139, 92, 246, ${0.2 + normalizedValue * 0.8})`;
      case 'gradient':
        if (normalizedValue < 0.5) {
          return `rgba(59, 130, 246, ${0.2 + normalizedValue * 1.6})`;
        } else {
          return `rgba(239, 68, 68, ${(normalizedValue - 0.5) * 2 * 0.8 + 0.2})`;
        }
      default:
        return `rgba(59, 130, 246, ${0.2 + normalizedValue * 0.8})`;
    }
  };

  // Create grid cells
  const cells = useMemo(() => {
    return data.map(point => {
      const xIndex = typeof point.x === 'number' ? point.x : xLabels.indexOf(point.x as string);
      const yIndex = typeof point.y === 'number' ? point.y : yLabels.indexOf(point.y as string);
      
      const x = xIndex * (cellSize + cellSpacing);
      const y = yIndex * (cellSize + cellSpacing);
      
      return {
        x,
        y,
        width: cellSize,
        height: cellSize,
        color: getColorForValue(point.value),
        value: point.value,
        xIndex,
        yIndex,
      };
    });
  }, [data, xLabels, yLabels, cellSize, cellSpacing, minValue, maxValue, colorScheme]);

  const chartWidth = xLabels.length * (cellSize + cellSpacing);
  const chartHeight = yLabels.length * (cellSize + cellSpacing);

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <View style={styles.chartRow}>
        {showLabels && (
          <View style={[styles.yLabels, { width: yLabelWidth, height: chartHeight }]}>
            {yLabels.map((label, index) => (
              <RNText
                key={`y-${index}`}
                style={[
                  styles.yLabel,
                  {
                    color: theme.colors.textSecondary,
                    fontSize: theme.fontScale.xs,
                    top: index * (cellSize + cellSpacing) + cellSize / 2 - 6,
                  },
                ]}
              >
                {label}
              </RNText>
            ))}
          </View>
        )}

        <View>
          <Svg width={chartWidth} height={chartHeight}>
            {cells.map((cell, index) => (
              <React.Fragment key={`cell-${index}`}>
                <Rect
                  x={cell.x}
                  y={cell.y}
                  width={cell.width}
                  height={cell.height}
                  fill={cell.color}
                  rx={theme.radius.sm}
                  ry={theme.radius.sm}
                />
                {showValues && (
                  <Text
                    x={cell.x + cell.width / 2}
                    y={cell.y + cell.height / 2}
                    text={cell.value.toFixed(0)}
                    fontSize={theme.fontScale.xs}
                    fill={theme.colors.text}
                    textAnchor="middle"
                  />
                )}
              </React.Fragment>
            ))}
          </Svg>

          {showLabels && (
            <View style={[styles.xLabels, { width: chartWidth }]}>
              {xLabels.map((label, index) => (
                <RNText
                  key={`x-${index}`}
                  style={[
                    styles.xLabel,
                    {
                      color: theme.colors.textSecondary,
                      fontSize: theme.fontScale.xs,
                      left: index * (cellSize + cellSpacing),
                      width: cellSize,
                    },
                  ]}
                >
                  {label}
                </RNText>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

Heatmap.displayName = 'Heatmap';

// Simple color interpolation helper
function interpolateColor(color1: string, color2: string, factor: number): string {
  // Simple implementation - just use opacity for now
  return `${color2.substring(0, 7)}${Math.round((0.2 + factor * 0.8) * 255).toString(16)}`;
}

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'flex-start' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
  chartRow: { flexDirection: 'row' },
  yLabels: { position: 'relative', marginRight: 8 },
  yLabel: { position: 'absolute', right: 0, textAlign: 'right' },
  xLabels: { position: 'relative', height: 30, marginTop: 4 },
  xLabel: { position: 'absolute', textAlign: 'center' },
});
