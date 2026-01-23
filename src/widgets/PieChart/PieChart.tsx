/**
 * PieChart Widget - Pie and Donut charts for proportions
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  useWidgetDimensions,
  useWidgetTheme,
} from '../../core';
import { createDonutArcPath, createFilledArcPath } from '../../renderer-svg';
import { PieChartData, PieChartLegacyProps, PieChartSimpleProps, PieChartWidgetProps } from './types';
import { isSimpleDataFormat, transformToPieData } from '../../core/utils/dataTransform';

/**
 * PieChart Widget Component
 */
export const PieChart = memo<PieChartWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    theme: themeOverride,
    variant = 'pie',
    innerRadius = 0.5,
    showLabels = true,
    showValues = false,
    showPercentages = true,
    size: customSize,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 300, 300);

  // Transform data if using simple API
  const widgetData: PieChartData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'labelKey' in props && 'valueKey' in props) {
      const simpleProps = props as PieChartSimpleProps;
      const transformed = transformToPieData(simpleProps.data, simpleProps.labelKey, simpleProps.valueKey, simpleProps.colors);
      return { segments: transformed.data };
    }
    return (props as PieChartLegacyProps).data || null;
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

  if (!widgetData || !widgetData.segments || widgetData.segments.length === 0) {
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

  const { segments, title } = widgetData;

  // Calculate total
  const total = useMemo(
    () => segments.reduce((sum, seg) => sum + seg.value, 0),
    [segments]
  );

  // Calculate chart size
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const legendHeight = showLabels ? segments.length * 24 + theme.spacing.md : 0;
  
  const availableHeight = dimensions.height - padding * 2 - titleHeight - legendHeight;
  const availableWidth = dimensions.width - padding * 2;
  
  const chartSize = customSize || Math.min(availableHeight, availableWidth);
  const center = chartSize / 2;
  const radius = (chartSize - padding) / 2;
  const innerR = variant === 'donut' ? radius * innerRadius : 0;

  // Generate segments
  const pieSegments = useMemo(() => {
    let currentAngle = 0;
    
    return segments.map(segment => {
      const percentage = (segment.value / total) * 100;
      const angle = (segment.value / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      currentAngle = endAngle;
      
      const path = variant === 'donut'
        ? createDonutArcPath({
            cx: center,
            cy: center,
            radius,
            innerRadius: innerR,
            startAngle,
            endAngle,
          })
        : createFilledArcPath({
            cx: center,
            cy: center,
            radius,
            startAngle,
            endAngle,
          });
      
      return {
        path,
        color: segment.color,
        label: segment.label,
        value: segment.value,
        percentage,
      };
    });
  }, [segments, total, center, radius, innerR, variant]);

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
              fontWeight: 'bold',
              marginBottom: theme.spacing.sm,
            },
          ]}
        >
          {title}
        </RNText>
      )}

      {/* Chart */}
      <View style={styles.chartContainer}>
        <Svg width={chartSize} height={chartSize}>
          {pieSegments.map((segment, index) => (
            <Path
              key={`segment-${index}`}
              d={segment.path}
              fill={segment.color}
            />
          ))}
        </Svg>
      </View>

      {/* Legend */}
      {showLabels && (
        <View style={styles.legend}>
          {pieSegments.map((segment, index) => (
            <View key={`legend-${index}`} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: segment.color },
                ]}
              />
              <View style={styles.legendTextContainer}>
                <RNText
                  style={[
                    styles.legendLabel,
                    {
                      color: theme.colors.text,
                      fontSize: theme.fontScale.sm,
                    },
                  ]}
                >
                  {segment.label}
                </RNText>
                <RNText
                  style={[
                    styles.legendValue,
                    {
                      color: theme.colors.textSecondary,
                      fontSize: theme.fontScale.xs,
                    },
                  ]}
                >
                  {showValues && `${segment.value} `}
                  {showPercentages && `(${segment.percentage.toFixed(1)}%)`}
                </RNText>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
});

PieChart.displayName = 'PieChart';

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    textAlign: 'center',
    width: '100%',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    width: '100%',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 8,
  },
  legendTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  legendLabel: {
    fontWeight: '600',
  },
  legendValue: {},
});
