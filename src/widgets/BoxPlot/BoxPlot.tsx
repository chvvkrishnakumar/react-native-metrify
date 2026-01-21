/**
 * BoxPlot Widget - Shows statistical distribution with quartiles
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect, Line as SvgLine, Circle } from 'react-native-svg';
import { useWidgetDimensions, useWidgetTheme, normalize } from '../../core';
import { BoxPlotWidgetProps } from './types';

export const BoxPlot = memo<BoxPlotWidgetProps>(({
  data: widgetData,
  width,
  height,
  loading = false,
  theme: themeOverride,
  showLabels = true,
  showOutliers = true,
  boxWidth = 50,
  boxSpacing = 30,
  color,
  testID,
}) => {
  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 350, 300);

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
  const labelHeight = showLabels ? 30 : 0;
  const yAxisWidth = 40;

  const chartHeight = dimensions.height - padding * 2 - titleHeight - labelHeight;
  const chartWidth = dimensions.width - padding * 2 - yAxisWidth;

  const boxColor = color || theme.colors.chartPrimary;

  // Find global min/max for Y-axis
  const { globalMin, globalMax } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    
    data.forEach(point => {
      if (point.min < min) min = point.min;
      if (point.max > max) max = point.max;
      if (point.outliers) {
        point.outliers.forEach(val => {
          if (val < min) min = val;
          if (val > max) max = val;
        });
      }
    });
    
    return { globalMin: min, globalMax: max };
  }, [data]);

  const yAxisLabels = useMemo(() => {
    const range = globalMax - globalMin;
    const step = range / 4;
    return Array.from({ length: 5 }, (_, i) => ({
      value: globalMin + i * step,
      y: chartHeight - (i * chartHeight) / 4,
    }));
  }, [globalMin, globalMax, chartHeight]);

  const boxes = useMemo(() => {
    return data.map((point, index) => {
      const centerX = index * (boxWidth + boxSpacing) + boxWidth / 2;
      
      // Normalize values to chart height
      const minY = chartHeight - normalize(point.min, globalMin, globalMax) * chartHeight;
      const maxY = chartHeight - normalize(point.max, globalMin, globalMax) * chartHeight;
      const q1Y = chartHeight - normalize(point.q1, globalMin, globalMax) * chartHeight;
      const q3Y = chartHeight - normalize(point.q3, globalMin, globalMax) * chartHeight;
      const medianY = chartHeight - normalize(point.median, globalMin, globalMax) * chartHeight;

      const outlierPoints = point.outliers?.map(val => ({
        x: centerX,
        y: chartHeight - normalize(val, globalMin, globalMax) * chartHeight,
      })) || [];

      return {
        label: point.label,
        centerX,
        boxX: centerX - boxWidth / 2,
        boxWidth,
        // Whiskers
        minY,
        maxY,
        // Box (IQR)
        q1Y,
        q3Y,
        boxHeight: Math.abs(q3Y - q1Y),
        boxY: Math.min(q1Y, q3Y),
        // Median line
        medianY,
        // Outliers
        outliers: outlierPoints,
      };
    });
  }, [data, chartHeight, globalMin, globalMax, boxWidth, boxSpacing]);

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <View style={styles.chartRow}>
        {/* Y-Axis */}
        <View style={[styles.yAxis, { width: yAxisWidth }]}>
          {yAxisLabels.map((label, index) => (
            <RNText key={`y-${index}`} style={[styles.yAxisLabel, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs, top: label.y - 6 }]}>
              {label.value.toFixed(0)}
            </RNText>
          ))}
        </View>

        <View>
          <Svg width={chartWidth} height={chartHeight}>
            {boxes.map((box, index) => (
              <React.Fragment key={`box-${index}`}>
                {/* Whisker lines (min to Q1, Q3 to max) */}
                <SvgLine
                  x1={box.centerX}
                  y1={box.minY}
                  x2={box.centerX}
                  y2={box.q1Y}
                  stroke={boxColor}
                  strokeWidth={1}
                />
                <SvgLine
                  x1={box.centerX}
                  y1={box.q3Y}
                  x2={box.centerX}
                  y2={box.maxY}
                  stroke={boxColor}
                  strokeWidth={1}
                />
                
                {/* Min/Max caps */}
                <SvgLine
                  x1={box.centerX - boxWidth / 4}
                  y1={box.minY}
                  x2={box.centerX + boxWidth / 4}
                  y2={box.minY}
                  stroke={boxColor}
                  strokeWidth={2}
                />
                <SvgLine
                  x1={box.centerX - boxWidth / 4}
                  y1={box.maxY}
                  x2={box.centerX + boxWidth / 4}
                  y2={box.maxY}
                  stroke={boxColor}
                  strokeWidth={2}
                />
                
                {/* IQR Box (Q1 to Q3) */}
                <Rect
                  x={box.boxX}
                  y={box.boxY}
                  width={box.boxWidth}
                  height={box.boxHeight}
                  fill={boxColor}
                  fillOpacity={0.3}
                  stroke={boxColor}
                  strokeWidth={2}
                  rx={theme.radius.sm}
                  ry={theme.radius.sm}
                />
                
                {/* Median line */}
                <SvgLine
                  x1={box.boxX}
                  y1={box.medianY}
                  x2={box.boxX + box.boxWidth}
                  y2={box.medianY}
                  stroke={boxColor}
                  strokeWidth={3}
                />
                
                {/* Outliers */}
                {showOutliers && box.outliers.map((outlier, oIndex) => (
                  <Circle
                    key={`outlier-${index}-${oIndex}`}
                    cx={outlier.x}
                    cy={outlier.y}
                    r={3}
                    fill={theme.colors.chartNegative}
                    opacity={0.8}
                  />
                ))}
              </React.Fragment>
            ))}
          </Svg>

          {showLabels && (
            <View style={styles.labelsContainer}>
              {boxes.map((box, index) => (
                <View
                  key={`label-${index}`}
                  style={[styles.labelItem, { left: box.boxX, width: box.boxWidth }]}
                >
                  <RNText
                    style={[styles.labelText, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs }]}
                    numberOfLines={1}
                  >
                    {box.label}
                  </RNText>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

BoxPlot.displayName = 'BoxPlot';

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'flex-start' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
  chartRow: { flexDirection: 'row', alignItems: 'flex-start' },
  yAxis: { position: 'relative', marginRight: 8 },
  yAxisLabel: { position: 'absolute', right: 0, textAlign: 'right' },
  labelsContainer: { position: 'relative', height: 30, marginTop: 4 },
  labelItem: { position: 'absolute', alignItems: 'center' },
  labelText: { textAlign: 'center' },
});
