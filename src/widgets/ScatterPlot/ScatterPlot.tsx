/**
 * ScatterPlot Widget - Points without connecting lines
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Circle, Line as SvgLine } from 'react-native-svg';
import Animated, { useAnimatedStyle, useAnimatedProps } from 'react-native-reanimated';
import { useWidgetDimensions, useWidgetTheme, normalize, useStaggeredAnimation } from '../../core';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
import { ScatterPlotData, ScatterPlotLegacyProps, ScatterPlotSimpleProps, ScatterPlotWidgetProps } from './types';
import { isSimpleDataFormat, transformToScatterData } from '../../core/utils/dataTransform';

export const ScatterPlot = memo<ScatterPlotWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    animated = true,
    theme: themeOverride,
    showXAxis = true,
    showYAxis = true,
    showGrid = true,
    showLegend = true,
    defaultPointSize = 6,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 350, 250);

  // Transform data if using simple API
  const widgetData: ScatterPlotData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'xKey' in props && 'yKey' in props) {
      const simpleProps = props as ScatterPlotSimpleProps;
      const labels = simpleProps.labelKey ? simpleProps.data.map((item: any) => String(item[simpleProps.labelKey!])) : undefined;
      const transformed = transformToScatterData(simpleProps.data, simpleProps.xKey, simpleProps.yKey, undefined, simpleProps.colors, labels);
      return { series: [{ data: transformed.data, color: transformed.data[0]?.color || '#8884d8' }] };
    }
    return (props as ScatterPlotLegacyProps).data || null;
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

  const { series, title } = widgetData;
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const legendHeight = showLegend ? 30 : 0;
  const xAxisHeight = showXAxis ? 30 : 0;
  const yAxisWidth = showYAxis ? 40 : 0;

  const chartWidth = dimensions.width - padding * 2 - yAxisWidth;
  const chartHeight = dimensions.height - padding * 2 - titleHeight - legendHeight - xAxisHeight;

  const { globalMinX, globalMaxX, globalMinY, globalMaxY } = useMemo(() => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    series.forEach(s => {
      s.data.forEach(point => {
        if (point.x < minX) minX = point.x;
        if (point.x > maxX) maxX = point.x;
        if (point.y < minY) minY = point.y;
        if (point.y > maxY) maxY = point.y;
      });
    });
    return { globalMinX: minX, globalMaxX: maxX, globalMinY: minY, globalMaxY: maxY };
  }, [series]);

  const yAxisLabels = useMemo(() => {
    const range = globalMaxY - globalMinY;
    const step = range / 4;
    return Array.from({ length: 5 }, (_, i) => ({
      value: globalMinY + i * step,
      y: chartHeight - (i * chartHeight) / 4,
    }));
  }, [globalMinY, globalMaxY, chartHeight]);

  const xAxisLabels = useMemo(() => {
    const range = globalMaxX - globalMinX;
    const step = range / 4;
    return Array.from({ length: 5 }, (_, i) => ({
      value: globalMinX + i * step,
      x: (i * chartWidth) / 4,
    }));
  }, [globalMinX, globalMaxX, chartWidth]);

  const seriesPoints = useMemo(() => {
    return series.map(s => {
      const points = s.data.map(point => {
        const normalizedX = normalize(point.x, globalMinX, globalMaxX);
        const normalizedY = normalize(point.y, globalMinY, globalMaxY);
        return {
          cx: normalizedX * chartWidth,
          cy: chartHeight - normalizedY * chartHeight,
          label: point.label,
        };
      });

      return {
        points,
        color: s.color,
        label: s.label,
        pointSize: s.pointSize || defaultPointSize,
      };
    });
  }, [series, chartWidth, chartHeight, globalMinX, globalMaxX, globalMinY, globalMaxY, defaultPointSize]);

  // Calculate total points for staggered animation
  const totalPoints = useMemo(() => {
    return seriesPoints.reduce((sum, s) => sum + s.points.length, 0);
  }, [seriesPoints]);

  // Staggered scale animation for points (Recharts style)
  const pointAnimations = useStaggeredAnimation(totalPoints, {
    enabled: animated,
    duration: 800,
    easing: 'ease-in-out',
  });

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <View style={styles.chartRow}>
        {showYAxis && (
          <View style={[styles.yAxis, { width: yAxisWidth }]}>
            {yAxisLabels.map((label, index) => (
              <RNText key={`y-${index}`} style={[styles.yAxisLabel, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs, top: label.y - 6 }]}>
                {label.value.toFixed(0)}
              </RNText>
            ))}
          </View>
        )}

        <View>
          <Svg width={chartWidth} height={chartHeight}>
            {showGrid && yAxisLabels.map((label, index) => (
              <SvgLine key={`grid-y-${index}`} x1={0} y1={label.y} x2={chartWidth} y2={label.y} stroke={theme.colors.borderLight} strokeWidth={1} />
            ))}
            {showGrid && xAxisLabels.map((label, index) => (
              <SvgLine key={`grid-x-${index}`} x1={label.x} y1={0} x2={label.x} y2={chartHeight} stroke={theme.colors.borderLight} strokeWidth={1} />
            ))}

            {seriesPoints.map((series, seriesIndex) => {
              // Calculate the global point index for staggered animation
              let globalPointIndex = 0;
              for (let i = 0; i < seriesIndex; i++) {
                globalPointIndex += seriesPoints[i].points.length;
              }
              
              return series.points.map((point, pointIndex) => {
                const currentIndex = globalPointIndex + pointIndex;
                const animatedProps = useAnimatedProps(() => {
                  'worklet';
                  const scale = pointAnimations[currentIndex].value;
                  return {
                    r: series.pointSize * scale,
                    opacity: scale,
                  };
                });

                return (
                  <AnimatedCircle
                    key={`series-${seriesIndex}-point-${pointIndex}`}
                    cx={point.cx}
                    cy={point.cy}
                    fill={series.color}
                    animatedProps={animatedProps}
                  />
                );
              });
            })}
          </Svg>
        </View>
      </View>

      {showXAxis && (
        <View style={[styles.xAxis, { marginLeft: yAxisWidth }]}>
          {xAxisLabels.map((label, index) => (
            <RNText key={`x-${index}`} style={[styles.xAxisLabel, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs, left: label.x - 15 }]}>
              {label.value.toFixed(0)}
            </RNText>
          ))}
        </View>
      )}

      {showLegend && (
        <View style={styles.legend}>
          {seriesPoints.map((series, index) => (
            series.label && (
              <View key={`legend-${index}`} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: series.color }]} />
                <RNText style={[styles.legendText, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs }]}>{series.label}</RNText>
              </View>
            )
          ))}
        </View>
      )}
    </View>
  );
});

ScatterPlot.displayName = 'ScatterPlot';

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'flex-start' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
  chartRow: { flexDirection: 'row', alignItems: 'flex-start' },
  yAxis: { position: 'relative', marginRight: 8 },
  yAxisLabel: { position: 'absolute', right: 0, textAlign: 'right' },
  xAxis: { position: 'relative', height: 30, flexDirection: 'row', marginTop: 4 },
  xAxisLabel: { position: 'absolute', textAlign: 'center', width: 30 },
  legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 12, gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendColor: { width: 12, height: 12, borderRadius: 6 },
  legendText: { textTransform: 'uppercase', letterSpacing: 0.5 },
});
