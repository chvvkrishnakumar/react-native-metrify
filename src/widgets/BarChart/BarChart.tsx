/**
 * BarChart Widget - Flexible bar chart for comparing values
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet, ScrollView } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import {
  useWidgetDimensions,
  useWidgetTheme,
  normalize,
  useStaggeredAnimation,
} from '../../core';
import { Text } from '../../renderer-svg/primitives';
import { BarChartData, BarChartLegacyProps, BarChartSimpleProps, BarChartWidgetProps } from './types';
import { isSimpleDataFormat, transformToBarData } from '../../core/utils/dataTransform';

// Create AnimatedRect component
const AnimatedRect = Animated.createAnimatedComponent(Rect);

/**
 * BarChart Widget Component
 */
export const BarChart = memo<BarChartWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    theme: themeOverride,
    animated = true,
    orientation = 'vertical',
    barWidth: customBarWidth,
    barSpacing = 8,
    showValues = true,
    showLabels = true,
    minBarHeight = 4,
    minBarWidth: customMinBarWidth = 24,
    maxBarWidth: customMaxBarWidth,
    maxBars = 20,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 300, 200);

  // Transform data if using simple API
  const widgetData: BarChartData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'xKey' in props || 'dataKeys' in props || 'labelKey' in props || 'valueKey' in props || 'categoryKey' in props || 'dateKey' in props) {
      const simpleProps = props as BarChartSimpleProps;
      return transformToBarData(simpleProps.data, simpleProps.xKey, simpleProps.dataKey, simpleProps.colors);
    }
    return (props as BarChartLegacyProps).data || null;
  }, [props]);

  // Handle states
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.md,
          },
        ]}
        testID={`${testID}-loading`}
      >
        <RNText style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
          Loading...
        </RNText>
      </View>
    );
  }

  if (!widgetData || !widgetData.data || widgetData.data.length === 0) {
    return (
      <View
        style={[
          styles.container,
          {
            width: dimensions.width,
            height: dimensions.height,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.md,
          },
        ]}
        testID={`${testID}-empty`}
      >
        <RNText style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          No data
        </RNText>
      </View>
    );
  }

  const { data, title } = widgetData;
  
  // Limit number of bars
  const displayData = data.slice(0, maxBars);

  // Calculate dimensions
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const labelHeight = showLabels ? theme.fontScale.sm + theme.spacing.xs : 0;
  const valueHeight = showValues ? theme.fontScale.sm + theme.spacing.xs : 0;
  
  const chartHeight = dimensions.height - padding * 2 - titleHeight - labelHeight - valueHeight;
  const chartWidth = dimensions.width - padding * 2;

  // Find max value for scaling
  const maxValue = useMemo(() => Math.max(...displayData.map(d => d.value)), [displayData]);

  // Calculate bar width with configurable min/max constraints
  const idealBarWidth = customBarWidth || 
    (chartWidth - (displayData.length - 1) * barSpacing) / displayData.length;
  
  let calculatedBarWidth = idealBarWidth;
  
  // Apply minimum width constraint
  if (customMinBarWidth && calculatedBarWidth < customMinBarWidth) {
    calculatedBarWidth = customMinBarWidth;
  }
  
  // Apply maximum width constraint
  if (customMaxBarWidth && calculatedBarWidth > customMaxBarWidth) {
    calculatedBarWidth = customMaxBarWidth;
  }
  
  // Calculate if we need scrolling
  const totalRequiredWidth = displayData.length * (calculatedBarWidth + barSpacing) - barSpacing;
  const needsScrolling = totalRequiredWidth > chartWidth;
  const effectiveChartWidth = needsScrolling ? totalRequiredWidth : chartWidth;

  // Generate bars
  const bars = useMemo(() => {
    return displayData.map((item, index) => {
      const normalizedValue = normalize(item.value, 0, maxValue);
      const barHeight = Math.max(normalizedValue * chartHeight, minBarHeight);
      const barX = index * (calculatedBarWidth + barSpacing);
      const barY = chartHeight - barHeight;
      
      return {
        x: barX,
        y: barY,
        width: calculatedBarWidth,
        height: barHeight,
        color: item.color || theme.colors.chartPrimary,
        value: item.value,
        label: item.label,
      };
    });
  }, [displayData, maxValue, chartHeight, calculatedBarWidth, barSpacing, minBarHeight, theme.colors.chartPrimary]);
  
  // Determine if labels should show based on available space
  const shouldShowValues = showValues && calculatedBarWidth >= 32; // Only show if bar width is sufficient

  // Staggered animation for bars
  const barAnimations = useStaggeredAnimation(bars.length, {
    enabled: animated,
    duration: 600,
    easing: 'ease-in-out',
  });

  // Create AnimatedBar component to properly handle hooks
  const AnimatedBar = memo<{
    bar: typeof bars[0];
    index: number;
    progress: Animated.SharedValue<number>;
    theme: ReturnType<typeof useWidgetTheme>;
  }>(({ bar, index, progress, theme }) => {
    const animatedProps = useAnimatedProps(() => {
      'worklet';
      const animationProgress = progress.value;
      const animatedHeight = bar.height * animationProgress;
      const animatedY = bar.y + (bar.height - animatedHeight);
      
      return {
        y: animatedY,
        height: animatedHeight,
      };
    });

    return (
      <AnimatedRect
        key={`bar-${index}`}
        x={bar.x}
        width={bar.width}
        fill={bar.color}
        rx={theme.radius.sm}
        ry={theme.radius.sm}
        animatedProps={animatedProps}
      />
    );
  });

  AnimatedBar.displayName = 'AnimatedBar';

  return (
    <View
      style={[
        styles.wrapper,
        {
          width: dimensions.width,
          height: dimensions.height,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.md,
          padding,
        },
      ]}
      testID={testID}
    >
      {/* Title */}
      {title && (
        <RNText
          style={[
            styles.title,
            {
              color: theme.colors.text,
              fontSize: theme.fontScale.md,
              marginBottom: theme.spacing.sm,
            },
          ]}
        >
          {title}
        </RNText>
      )}

      {/* Chart */}
      <View style={styles.chartContainer}>
        <ScrollView 
          horizontal={true}
          scrollEnabled={needsScrolling}
          showsHorizontalScrollIndicator={needsScrolling}
          contentContainerStyle={needsScrolling ? { paddingRight: padding } : undefined}
        >
          <View style={{ width: effectiveChartWidth }}>
            <Svg width={effectiveChartWidth} height={chartHeight + valueHeight}>
              {/* Bars with animation */}
              {bars.map((bar, index) => (
                <AnimatedBar
                  key={`bar-${index}`}
                  bar={bar}
                  index={index}
                  progress={barAnimations[index]}
                  theme={theme}
                />
              ))}
              
              {/* Values */}
              {shouldShowValues && bars.map((bar, index) => (
                <Text
                  key={`value-${index}`}
                  x={bar.x + bar.width / 2}
                  y={bar.y - 4}
                  text={Number(bar.value.toFixed(2)).toString()}
                  fontSize={theme.fontScale.xs}
                  fill={theme.colors.textSecondary}
                  textAnchor="middle"
                />
              ))}
            </Svg>

            {/* Labels */}
            {showLabels && (
              <View style={styles.labelsContainer}>
                {bars.map((bar, index) => (
                  <View
                    key={`label-${index}`}
                    style={[
                      styles.labelItem,
                      { width: calculatedBarWidth },
                    ]}
                  >
                    <RNText
                      style={[
                        styles.labelText,
                        {
                          color: theme.colors.textSecondary,
                          fontSize: theme.fontScale.xs,
                        },
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {bar.label}
                    </RNText>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
});

BarChart.displayName = 'BarChart';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  chartContainer: {
    width: '100%',
    overflow: 'hidden',
  },
  labelsContainer: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 8,
  },
  labelItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    textAlign: 'center',
    width: '100%',
  },
});
