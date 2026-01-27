/**
 * StackedBarChart Widget - Multiple values stacked on same bar
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { useWidgetDimensions, useWidgetTheme, normalize, useStaggeredAnimation } from '../../core';

const AnimatedRect = Animated.createAnimatedComponent(Rect);
import { StackedBarChartData, StackedBarChartLegacyProps, StackedBarChartSimpleProps, StackedBarChartWidgetProps } from './types';
import { isSimpleDataFormat, transformToStackedBarData } from '../../core/utils/dataTransform';

export const StackedBarChart = memo<StackedBarChartWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    animated = true,
    theme: themeOverride,
    barWidth: customBarWidth,
    barSpacing = 8,
    showValues = false,
    showLabels = true,
    showLegend = true,
    maxBars = 12,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 350, 250);

  // Transform data if using simple API
  const widgetData: StackedBarChartData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'categoryKey' in props && 'dataKeys' in props) {
      const simpleProps = props as StackedBarChartSimpleProps;
      const transformed = transformToStackedBarData(simpleProps.data, simpleProps.categoryKey, simpleProps.dataKeys, simpleProps.colors, simpleProps.labels);
      return { data: transformed.stacks.map(s => ({ label: s.category, segments: s.segments })) };
    }
    return (props as StackedBarChartLegacyProps).data || null;
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
  const displayData = data.slice(0, maxBars);
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const legendHeight = showLegend ? 40 : 0;
  const labelHeight = showLabels ? theme.fontScale.sm + theme.spacing.xs : 0;

  const chartHeight = dimensions.height - padding * 2 - titleHeight - legendHeight - labelHeight;
  const chartWidth = dimensions.width - padding * 2;

  // Find max total value across all bars
  const maxTotalValue = useMemo(() => {
    return Math.max(...displayData.map(item => 
      item.segments.reduce((sum, seg) => sum + seg.value, 0)
    ));
  }, [displayData]);

  // Get all unique segment labels for legend
  const allSegmentLabels = useMemo(() => {
    const labels = new Map<string, string>();
    displayData.forEach(item => {
      item.segments.forEach(seg => {
        labels.set(seg.label, seg.color);
      });
    });
    return Array.from(labels.entries()).map(([label, color]) => ({ label, color }));
  }, [displayData]);

  const calculatedBarWidth = customBarWidth || 
    (chartWidth - (displayData.length - 1) * barSpacing) / displayData.length;

  const bars = useMemo(() => {
    return displayData.map((item, index) => {
      const barX = index * (calculatedBarWidth + barSpacing);
      const totalValue = item.segments.reduce((sum, seg) => sum + seg.value, 0);
      
      let cumulativeY = 0;
      const segments = item.segments.map(seg => {
        const segmentHeight = (seg.value / maxTotalValue) * chartHeight;
        const segmentY = chartHeight - cumulativeY - segmentHeight;
        cumulativeY += segmentHeight;
        
        return {
          x: barX,
          y: segmentY,
          width: calculatedBarWidth,
          height: segmentHeight,
          color: seg.color,
          value: seg.value,
          label: seg.label,
        };
      });

      return {
        label: item.label,
        segments,
        totalValue,
      };
    });
  }, [displayData, maxTotalValue, chartHeight, calculatedBarWidth, barSpacing]);

  const barAnimations = useStaggeredAnimation(bars.length, {
    enabled: animated,
    duration: 600,
    easing: 'ease-out',
  });

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          {bars.map((bar, barIndex) => (
            bar.segments.map((segment, segmentIndex) => {
              const animatedProps = useAnimatedProps(() => {
                'worklet';
                const progress = barAnimations[barIndex] ? barAnimations[barIndex].value : 1;
                const animatedHeight = segment.height * progress;
                const animatedY = segment.y + (segment.height - animatedHeight);
                
                return {
                  y: animatedY,
                  height: animatedHeight,
                };
              });

              return (
                <AnimatedRect
                  key={`bar-${barIndex}-seg-${segmentIndex}`}
                  x={segment.x}
                  width={segment.width}
                  fill={segment.color}
                  rx={segmentIndex === bar.segments.length - 1 ? theme.radius.sm : 0}
                  ry={segmentIndex === bar.segments.length - 1 ? theme.radius.sm : 0}
                  animatedProps={animatedProps}
                />
              );
            })
          ))}
        </Svg>

        {showLabels && (
          <View style={styles.labelsContainer}>
            {bars.map((bar, index) => (
              <View
                key={`label-${index}`}
                style={[styles.labelItem, { width: calculatedBarWidth + barSpacing }]}
              >
                <RNText
                  style={[styles.labelText, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs }]}
                  numberOfLines={1}
                >
                  {bar.label}
                </RNText>
              </View>
            ))}
          </View>
        )}
      </View>

      {showLegend && (
        <View style={styles.legend}>
          {allSegmentLabels.map((item, index) => (
            <View key={`legend-${index}`} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <RNText style={[styles.legendText, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs }]}>
                {item.label}
              </RNText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
});

StackedBarChart.displayName = 'StackedBarChart';

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'flex-start' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
  chartContainer: { flex: 1, width: '100%' },
  labelsContainer: { flexDirection: 'row', marginTop: 4 },
  labelItem: { alignItems: 'center' },
  labelText: { textAlign: 'center' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 12, gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendColor: { width: 12, height: 12, borderRadius: 2 },
  legendText: { textTransform: 'uppercase', letterSpacing: 0.5 },
});
