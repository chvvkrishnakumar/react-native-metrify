/**
 * RadarChart Widget - Multi-axis circular chart
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Polygon, Line as SvgLine, Circle } from 'react-native-svg';
import { useWidgetDimensions, useWidgetTheme, polarToCartesian, normalize } from '../../core';
import { Text } from '../../renderer-svg/primitives';
import { RadarChartData, RadarChartLegacyProps, RadarChartSimpleProps, RadarChartWidgetProps } from './types';
import { isSimpleDataFormat, transformToRadarData } from '../../core/utils/dataTransform';

export const RadarChart = memo<RadarChartWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    theme: themeOverride,
    showLabels = true,
    showLegend = true,
    showGrid = true,
    gridLevels = 5,
    size: customSize,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 350, 350);

  // Transform data if using simple API
  const widgetData: RadarChartData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'categoryKey' in props && 'dataKeys' in props) {
      const simpleProps = props as RadarChartSimpleProps;
      const transformed = transformToRadarData(simpleProps.data, simpleProps.categoryKey, simpleProps.dataKeys, simpleProps.colors, simpleProps.labels);
      return { 
        series: transformed.series.map(s => ({
          data: s.data.map(d => ({ axis: d.category, value: d.value })),
          color: s.color,
          label: s.label
        }))
      };
    }
    return (props as RadarChartLegacyProps).data || null;
  }, [props]);

  if (loading) {
    return (
      <View style={[styles.container, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md }]} testID={`${testID}-loading`}>
        <RNText style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Loading...</RNText>
      </View>
    );
  }

  if (!widgetData || !widgetData.series || widgetData.series.length === 0) {
    return (
      <View style={[styles.container, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md }]} testID={`${testID}-empty`}>
        <RNText style={[styles.emptyText, { color: theme.colors.textSecondary }]}>No data</RNText>
      </View>
    );
  }

  const { series, title, maxValue: customMaxValue } = widgetData;
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const legendHeight = showLegend ? 30 : 0;
  const labelPadding = showLabels ? 40 : 10;

  const availableSize = Math.min(
    dimensions.width - padding * 2 - labelPadding * 2,
    dimensions.height - padding * 2 - titleHeight - legendHeight - labelPadding * 2
  );
  
  const chartSize = customSize || availableSize;
  const center = chartSize / 2 + labelPadding;
  const radius = chartSize / 2;

  // Get all axis names
  const axes = series[0].data.map(d => d.axis);
  const axisCount = axes.length;

  // Find max value
  const maxValue = customMaxValue || Math.max(...series.flatMap(s => s.data.map(d => d.value)));

  // Calculate angle for each axis
  const angleStep = (2 * Math.PI) / axisCount;

  // Grid circles
  const gridCircles = useMemo(() => {
    return Array.from({ length: gridLevels }, (_, i) => {
      const r = ((i + 1) / gridLevels) * radius;
      return { radius: r, value: ((i + 1) / gridLevels) * maxValue };
    });
  }, [gridLevels, radius, maxValue]);

  // Axis lines
  const axisLines = useMemo(() => {
    return axes.map((axis, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const point = polarToCartesian(center, center, radius, (angle * 180) / Math.PI + 90);
      
      // Calculate label position (outside the circle)
      const labelDistance = radius + 20;
      const labelPoint = polarToCartesian(center, center, labelDistance, (angle * 180) / Math.PI + 90);
      
      return {
        x1: center,
        y1: center,
        x2: point.x,
        y2: point.y,
        labelX: labelPoint.x,
        labelY: labelPoint.y,
        label: axis,
      };
    });
  }, [axes, center, radius, angleStep]);

  // Data polygons for each series
  const dataPolygons = useMemo(() => {
    return series.map(s => {
      const points = s.data.map((point, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const normalizedValue = normalize(point.value, 0, maxValue);
        const r = normalizedValue * radius;
        const coord = polarToCartesian(center, center, r, (angle * 180) / Math.PI + 90);
        return `${coord.x},${coord.y}`;
      }).join(' ');

      return {
        points,
        color: s.color,
        label: s.label,
      };
    });
  }, [series, center, radius, maxValue, angleStep]);

  const svgSize = chartSize + labelPadding * 2;

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <View style={styles.chartContainer}>
        <Svg width={svgSize} height={svgSize}>
          {/* Grid circles */}
          {showGrid && gridCircles.map((circle, index) => (
            <Circle
              key={`grid-${index}`}
              cx={center}
              cy={center}
              r={circle.radius}
              stroke={theme.colors.borderLight}
              strokeWidth={1}
              fill="transparent"
            />
          ))}

          {/* Axis lines */}
          {axisLines.map((line, index) => (
            <SvgLine
              key={`axis-${index}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={theme.colors.border}
              strokeWidth={1}
            />
          ))}

          {/* Data polygons */}
          {dataPolygons.map((polygon, index) => (
            <Polygon
              key={`polygon-${index}`}
              points={polygon.points}
              fill={polygon.color}
              fillOpacity={0.2}
              stroke={polygon.color}
              strokeWidth={2}
            />
          ))}

          {/* Axis labels */}
          {showLabels && axisLines.map((line, index) => (
            <Text
              key={`label-${index}`}
              x={line.labelX}
              y={line.labelY}
              text={line.label}
              fontSize={theme.fontScale.xs}
              fill={theme.colors.text}
              textAnchor="middle"
            />
          ))}
        </Svg>
      </View>

      {showLegend && (
        <View style={styles.legend}>
          {dataPolygons.map((polygon, index) => (
            polygon.label && (
              <View key={`legend-${index}`} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: polygon.color }]} />
                <RNText style={[styles.legendText, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs }]}>
                  {polygon.label}
                </RNText>
              </View>
            )
          ))}
        </View>
      )}
    </View>
  );
});

RadarChart.displayName = 'RadarChart';

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'center' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
  chartContainer: { alignItems: 'center', justifyContent: 'center' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 12, gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendColor: { width: 12, height: 12, borderRadius: 2 },
  legendText: { textTransform: 'uppercase', letterSpacing: 0.5 },
});
