/**
 * BarChart Widget - Flexible bar chart for comparing values
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import {
  useWidgetDimensions,
  useWidgetTheme,
  normalize,
} from '../../core';
import { Text } from '../../renderer-svg/primitives';
import { BarChartData, BarChartLegacyProps, BarChartSimpleProps, BarChartWidgetProps } from './types';
import { isSimpleDataFormat, transformToBarData } from '../../core/utils/dataTransform';

/**
 * BarChart Widget Component
 */
export const BarChart = memo<BarChartWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    theme: themeOverride,
    orientation = 'vertical',
    barWidth: customBarWidth,
    barSpacing = 8,
    showValues = true,
    showLabels = true,
    minBarHeight = 4,
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

  // Calculate bar width
  const calculatedBarWidth = customBarWidth || 
    (chartWidth - (displayData.length - 1) * barSpacing) / displayData.length;

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
        <Svg width={chartWidth} height={chartHeight + valueHeight}>
          {/* Bars */}
          {bars.map((bar, index) => (
            <Rect
              key={`bar-${index}`}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={bar.color}
              rx={theme.radius.sm}
              ry={theme.radius.sm}
            />
          ))}
          
          {/* Values */}
          {showValues && bars.map((bar, index) => (
            <Text
              key={`value-${index}`}
              x={bar.x + bar.width / 2}
              y={bar.y - 4}
              text={bar.value.toString()}
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
                  { width: bar.width + barSpacing },
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
                >
                  {bar.label}
                </RNText>
              </View>
            ))}
          </View>
        )}
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
    flex: 1,
    width: '100%',
  },
  labelsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  labelItem: {
    alignItems: 'center',
  },
  labelText: {
    textAlign: 'center',
  },
});
