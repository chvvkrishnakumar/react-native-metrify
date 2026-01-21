/**
 * Sparkline Widget - Show trend at a glance
 * Minimal, no axes, capped data points
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop } from 'react-native-svg';
import {
  useWidgetDimensions,
  useWidgetTheme,
  useWidgetPadding,
  useInnerDimensions,
} from '../../core';
import {
  createLinePath,
  createAreaPath,
  AnimatedPath,
  dataToPoints,
} from '../../renderer-svg';
import { SparklineWidgetProps } from './types';

const MAX_DATA_POINTS = 50;

/**
 * Sparkline Widget Component
 */
export const Sparkline = memo<SparklineWidgetProps>(({
  data: widgetData,
  width,
  height,
  loading = false,
  theme: themeOverride,
  animated = true,
  style = 'line',
  strokeWidth = 2,
  showGradient = false,
  maxDataPoints = MAX_DATA_POINTS,
  testID,
}) => {
  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 200, 80);
  const padding = useWidgetPadding(theme);
  const innerDimensions = useInnerDimensions(
    dimensions.width,
    dimensions.height,
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

  const { data: rawData, label } = widgetData;

  // Cap data points for performance
  const data = useMemo(() => {
    if (rawData.length <= maxDataPoints) return rawData;
    
    const step = Math.ceil(rawData.length / maxDataPoints);
    return rawData.filter((_, index) => index % step === 0);
  }, [rawData, maxDataPoints]);

  // Convert data to SVG points
  const points = useMemo(
    () =>
      dataToPoints(
        data,
        innerDimensions.width,
        innerDimensions.height,
        theme.spacing.xs
      ),
    [data, innerDimensions.width, innerDimensions.height, theme.spacing.xs]
  );

  // Generate paths
  const linePath = useMemo(() => createLinePath(points), [points]);
  
  const areaPath = useMemo(
    () => createAreaPath(points, innerDimensions.height - theme.spacing.xs),
    [points, innerDimensions.height, theme.spacing.xs]
  );

  const svgWidth = dimensions.width;
  const svgHeight = dimensions.height - (label ? theme.fontScale.sm + theme.spacing.sm : 0);

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
      <Svg width={svgWidth - theme.spacing.md * 2} height={svgHeight}>
        {showGradient && style === 'area' && (
          <Defs>
            <LinearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={theme.colors.chartPrimary} stopOpacity="0.3" />
              <Stop offset="100%" stopColor={theme.colors.chartPrimary} stopOpacity="0" />
            </LinearGradient>
          </Defs>
        )}

        {style === 'area' && (
          <AnimatedPath
            d={areaPath}
            fill={showGradient ? 'url(#sparklineGradient)' : theme.colors.chartPrimary}
            opacity={showGradient ? 1 : 0.2}
          />
        )}

        <AnimatedPath
          d={linePath}
          stroke={theme.colors.chartPrimary}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="transparent"
        />
      </Svg>

      {label && (
        <RNText
          style={[
            styles.label,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.fontScale.sm,
              marginTop: theme.spacing.xs,
            },
          ]}
        >
          {label}
        </RNText>
      )}
    </View>
  );
});

Sparkline.displayName = 'Sparkline';

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
  label: {
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
