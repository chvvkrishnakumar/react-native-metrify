/**
 * HorizontalBarChart Widget - Bars go left to right
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { useWidgetDimensions, useWidgetTheme, normalize, useStaggeredAnimation } from '../../core';
import { HorizontalBarChartData, HorizontalBarChartLegacyProps, HorizontalBarChartSimpleProps, HorizontalBarChartWidgetProps } from './types';
import { isSimpleDataFormat, transformToBarData } from '../../core/utils/dataTransform';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export const HorizontalBarChart = memo<HorizontalBarChartWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    animated = true,
    theme: themeOverride,
    barHeight = 24,
    barSpacing = 12,
    showValues = true,
    showLabels = true,
    maxBars = 15,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 350, 300);

  // Transform data if using simple API
  const widgetData: HorizontalBarChartData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'xKey' in props || 'dataKeys' in props || 'labelKey' in props || 'valueKey' in props || 'categoryKey' in props || 'dateKey' in props) {
      const simpleProps = props as HorizontalBarChartSimpleProps;
      return transformToBarData(simpleProps.data, simpleProps.labelKey, simpleProps.dataKey, simpleProps.colors);
    }
    return (props as HorizontalBarChartLegacyProps).data || null;
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
  const labelWidth = showLabels ? 80 : 0;
  const valueWidth = showValues ? 50 : 0;
  
  const chartWidth = dimensions.width - padding * 2 - labelWidth - valueWidth;
  const maxValue = useMemo(() => Math.max(...displayData.map(d => d.value)), [displayData]);

  const bars = useMemo(() => {
    return displayData.map((item, index) => {
      const normalizedValue = normalize(item.value, 0, maxValue);
      const barWidth = normalizedValue * chartWidth;
      const barY = index * (barHeight + barSpacing);
      
      return {
        x: 0,
        y: barY,
        width: barWidth,
        height: barHeight,
        color: item.color || theme.colors.chartPrimary,
        value: item.value,
        label: item.label,
      };
    });
  }, [displayData, maxValue, chartWidth, barHeight, barSpacing, theme.colors.chartPrimary]);

  // Staggered animation for bars
  const barAnimations = useStaggeredAnimation(bars.length, {
    enabled: animated,
    duration: 600,
    easing: 'ease-in-out',
  });

  const totalHeight = bars.length * (barHeight + barSpacing);

  // Create AnimatedBarRow component to properly handle hooks
  const AnimatedBarRow = memo<{
    bar: typeof bars[0];
    index: number;
    progress: Animated.SharedValue<number>;
    theme: ReturnType<typeof useWidgetTheme>;
    showLabels: boolean;
    showValues: boolean;
    labelWidth: number;
    chartWidth: number;
    valueWidth: number;
    barHeight: number;
  }>(({ bar, index, progress, theme, showLabels, showValues, labelWidth, chartWidth, valueWidth, barHeight }) => {
    const animatedProps = useAnimatedProps(() => {
      'worklet';
      const animationProgress = progress.value;
      return {
        width: bar.width * animationProgress,
      };
    });

    return (
      <View key={`row-${index}`} style={styles.barRow}>
        {showLabels && (
          <View style={[styles.labelContainer, { width: labelWidth }]}>
            <RNText style={[styles.label, { color: theme.colors.text, fontSize: theme.fontScale.sm }]} numberOfLines={1}>
              {bar.label}
            </RNText>
          </View>
        )}
        
        <View style={{ width: chartWidth, height: barHeight }}>
          <Svg width={chartWidth} height={barHeight}>
            <AnimatedRect x={bar.x} y={0} height={bar.height} fill={bar.color} rx={theme.radius.sm} ry={theme.radius.sm} animatedProps={animatedProps} />
          </Svg>
        </View>

        {showValues && (
          <View style={[styles.valueContainer, { width: valueWidth }]}>
            <RNText style={[styles.value, { color: theme.colors.textSecondary, fontSize: theme.fontScale.sm }]}>
              {Number(bar.value.toFixed(2))}
            </RNText>
          </View>
        )}
      </View>
    );
  });

  AnimatedBarRow.displayName = 'AnimatedBarRow';

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <View style={styles.chartContainer}>
        {bars.map((bar, index) => (
          <AnimatedBarRow
            key={`row-${index}`}
            bar={bar}
            index={index}
            progress={barAnimations[index]}
            theme={theme}
            showLabels={showLabels}
            showValues={showValues}
            labelWidth={labelWidth}
            chartWidth={chartWidth}
            valueWidth={valueWidth}
            barHeight={barHeight}
          />
        ))}
      </View>
    </View>
  );
});

HorizontalBarChart.displayName = 'HorizontalBarChart';

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'flex-start' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
  chartContainer: { flex: 1, width: '100%' },
  barRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  labelContainer: { justifyContent: 'center', paddingRight: 8 },
  label: { textAlign: 'right' },
  valueContainer: { justifyContent: 'center', paddingLeft: 8 },
  value: { textAlign: 'left', fontWeight: '600' },
});
