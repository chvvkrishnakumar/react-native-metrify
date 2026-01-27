/**
 * BoxPlot Widget - Shows statistical distribution with quartiles
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect, Line as SvgLine, Circle } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { useWidgetDimensions, useWidgetTheme, normalize, useStaggeredAnimation } from '../../core';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedLine = Animated.createAnimatedComponent(SvgLine);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
import { BoxPlotData, BoxPlotLegacyProps, BoxPlotSimpleProps, BoxPlotWidgetProps } from './types';
import { isSimpleDataFormat, transformToBoxPlotData } from '../../core/utils/dataTransform';

export const BoxPlot = memo<BoxPlotWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    animated = true,
    theme: themeOverride,
    showLabels = true,
    showOutliers = true,
    boxWidth = 50,
    boxSpacing = 30,
    color,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 350, 300);

  const boxAnimations = useStaggeredAnimation(10, {
    enabled: animated,
    duration: 800,
    easing: 'ease-out',
  });

  // Transform data if using simple API
  const widgetData: BoxPlotData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'labelKey' in props && 'minKey' in props) {
      const simpleProps = props as BoxPlotSimpleProps;
      const transformed = transformToBoxPlotData(
        simpleProps.data, simpleProps.labelKey, simpleProps.minKey, simpleProps.q1Key, simpleProps.medianKey, simpleProps.q3Key, simpleProps.maxKey, simpleProps.colors
      );
      return { data: transformed.data };
    }
    return (props as BoxPlotLegacyProps).data || null;
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
            {boxes.map((box, index) => {
              const medianLineY = (box.q1Y + box.q3Y) / 2;
              
              // Animate whisker lines from center
              const whiskerAnimatedProps = useAnimatedProps(() => {
                'worklet';
                const progress = boxAnimations[index] ? boxAnimations[index].value : 1;
                const lowerWhiskerLength = (box.q1Y - box.minY) * progress;
                const upperWhiskerLength = (box.maxY - box.q3Y) * progress;
                
                return {
                  y1: box.q1Y - lowerWhiskerLength,
                  y2: box.q3Y + upperWhiskerLength,
                };
              });

              // Animate box height from center
              const boxAnimatedProps = useAnimatedProps(() => {
                'worklet';
                const progress = boxAnimations[index] ? boxAnimations[index].value : 1;
                const animatedHeight = box.boxHeight * progress;
                const centerY = box.boxY + box.boxHeight / 2;
                const animatedY = centerY - animatedHeight / 2;
                
                return {
                  y: animatedY,
                  height: animatedHeight,
                  opacity: progress * 0.3,
                };
              });

              // Animate median line
              const medianAnimatedProps = useAnimatedProps(() => {
                'worklet';
                const progress = boxAnimations[index] ? boxAnimations[index].value : 1;
                return {
                  opacity: progress,
                };
              });

              // Animate outliers
              const outlierAnimatedProps = useAnimatedProps(() => {
                'worklet';
                const progress = boxAnimations[index] ? boxAnimations[index].value : 1;
                return {
                  r: 3 * progress,
                  opacity: progress * 0.8,
                };
              });

              return (
                <React.Fragment key={`box-${index}`}>
                  {/* Whisker lines */}
                  <AnimatedLine
                    x1={box.centerX}
                    x2={box.centerX}
                    stroke={boxColor}
                    strokeWidth={1}
                    animatedProps={whiskerAnimatedProps}
                  />
                  
                  {/* Min/Max caps */}
                  <AnimatedLine
                    x1={box.centerX - boxWidth / 4}
                    y1={box.minY}
                    x2={box.centerX + boxWidth / 4}
                    y2={box.minY}
                    stroke={boxColor}
                    strokeWidth={2}
                    animatedProps={medianAnimatedProps}
                  />
                  <AnimatedLine
                    x1={box.centerX - boxWidth / 4}
                    y1={box.maxY}
                    x2={box.centerX + boxWidth / 4}
                    y2={box.maxY}
                    stroke={boxColor}
                    strokeWidth={2}
                    animatedProps={medianAnimatedProps}
                  />
                  
                  {/* IQR Box (Q1 to Q3) */}
                  <AnimatedRect
                    x={box.boxX}
                    width={box.boxWidth}
                    fill={boxColor}
                    stroke={boxColor}
                    strokeWidth={2}
                    rx={theme.radius.sm}
                    ry={theme.radius.sm}
                    animatedProps={boxAnimatedProps}
                  />
                  
                  {/* Median line */}
                  <AnimatedLine
                    x1={box.boxX}
                    y1={box.medianY}
                    x2={box.boxX + box.boxWidth}
                    y2={box.medianY}
                    stroke={boxColor}
                    strokeWidth={3}
                    animatedProps={medianAnimatedProps}
                  />
                  
                  {/* Outliers */}
                  {showOutliers && box.outliers.map((outlier, oIndex) => (
                    <AnimatedCircle
                      key={`outlier-${index}-${oIndex}`}
                      cx={outlier.x}
                      cy={outlier.y}
                      fill={theme.colors.chartNegative}
                      animatedProps={outlierAnimatedProps}
                    />
                  ))}
                </React.Fragment>
              );
            })}
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
