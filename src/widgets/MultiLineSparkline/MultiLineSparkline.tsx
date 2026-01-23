/**
 * MultiLineSparkline Widget - Multiple trends on same chart
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg from 'react-native-svg';
import {
  useWidgetDimensions,
  useWidgetTheme,
  useWidgetPadding,
  useInnerDimensions,
} from '../../core';
import {
  createLinePath,
  AnimatedPath,
  dataToPoints,
} from '../../renderer-svg';
import { MultiLineSparklineData, MultiLineSparklineLegacyProps, MultiLineSparklineSimpleProps, MultiLineSparklineWidgetProps } from './types';
import { isSimpleDataFormat, transformToMultiSparklineData } from '../../core/utils/dataTransform';

const MAX_DATA_POINTS = 100;

/**
 * MultiLineSparkline Widget Component
 */
export const MultiLineSparkline = memo<MultiLineSparklineWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    theme: themeOverride,
    style = 'line',
    showLegend = true,
    maxDataPoints = MAX_DATA_POINTS,
    minHeight = 120,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 300, minHeight);
  const padding = useWidgetPadding(theme);

  // Transform data if using simple API
  const widgetData: MultiLineSparklineData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'xKey' in props || 'dataKeys' in props || 'labelKey' in props || 'valueKey' in props || 'categoryKey' in props || 'dateKey' in props) {
      const simpleProps = props as MultiLineSparklineSimpleProps;
      return transformToMultiSparklineData(simpleProps.data, simpleProps.dataKeys, simpleProps.colors, simpleProps.labels);
    }
    return (props as MultiLineSparklineLegacyProps).data || null;
  }, [props]);
  
  // Calculate inner dimensions
  const legendHeight = showLegend ? 30 : 0;
  const svgHeight = dimensions.height - legendHeight - padding.vertical;
  
  const innerDimensions = useInnerDimensions(
    dimensions.width,
    svgHeight,
    padding
  );

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

  if (!widgetData || !widgetData.series || widgetData.series.length === 0) {
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

  const { series } = widgetData;

  // Find global min/max across all series for consistent scaling
  const { globalMin, globalMax } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    
    series.forEach(s => {
      const seriesMin = Math.min(...s.data);
      const seriesMax = Math.max(...s.data);
      if (seriesMin < min) min = seriesMin;
      if (seriesMax > max) max = seriesMax;
    });
    
    return { globalMin: min, globalMax: max };
  }, [series]);

  // Generate paths for each series
  const seriesPaths = useMemo(() => {
    return series.map(s => {
      // Cap data points if needed
      const cappedData = s.data.length > maxDataPoints
        ? s.data.filter((_, idx) => idx % Math.ceil(s.data.length / maxDataPoints) === 0)
        : s.data;
      
      // Normalize all series to same scale
      const normalizedData = cappedData.map(val => 
        ((val - globalMin) / (globalMax - globalMin || 1)) * 100
      );
      
      const points = dataToPoints(
        normalizedData,
        innerDimensions.width,
        innerDimensions.height,
        theme.spacing.xs
      );
      
      return {
        path: createLinePath(points),
        color: s.color,
        strokeWidth: s.strokeWidth || 2,
        label: s.label,
      };
    });
  }, [series, maxDataPoints, innerDimensions, theme.spacing.xs, globalMin, globalMax]);

  return (
    <View
      style={[
        styles.container,
        {
          width: dimensions.width,
          height: dimensions.height,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.md,
          padding: theme.spacing.md,
        },
      ]}
      testID={testID}
    >
      <Svg width={dimensions.width - theme.spacing.md * 2} height={svgHeight - theme.spacing.md}>
        {seriesPaths.map((series, index) => (
          <AnimatedPath
            key={`series-${index}`}
            d={series.path}
            stroke={series.color}
            strokeWidth={series.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="transparent"
          />
        ))}
      </Svg>

      {/* Legend */}
      {showLegend && (
        <View style={styles.legend}>
          {seriesPaths.map((series, index) => (
            series.label && (
              <View key={`legend-${index}`} style={styles.legendItem}>
                <View
                  style={[
                    styles.legendColor,
                    { backgroundColor: series.color },
                  ]}
                />
                <RNText
                  style={[
                    styles.legendText,
                    {
                      color: theme.colors.textSecondary,
                      fontSize: theme.fontScale.xs,
                    },
                  ]}
                >
                  {series.label}
                </RNText>
              </View>
            )
          ))}
        </View>
      )}
    </View>
  );
});

MultiLineSparkline.displayName = 'MultiLineSparkline';

const styles = StyleSheet.create({
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
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 8,
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legendText: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
