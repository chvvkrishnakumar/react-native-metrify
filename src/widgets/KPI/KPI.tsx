/**
 * KPI Widget - Show one metric + trend
 * First widget implementation following the widget contract
 */
import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  useWidgetDimensions,
  useWidgetTheme,
  createFontSizeCalculator,
} from '../../core';
import { formatNumber, getTrendColor } from '../../renderer-svg/adapters';
import { KPIWidgetProps } from './types';

/**
 * KPI Widget Component
 */
export const KPI = memo<KPIWidgetProps>(({
  data,
  width,
  height,
  loading = false,
  theme: themeOverride,
  animated = true,
  showTrend = true,
  showDelta = true,
  fontSize: fontConfig,
  testID,
}) => {
  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 300, 120);
  
  // Create responsive font size calculator
  const fontSizes = useMemo(
    () => createFontSizeCalculator(dimensions.width, dimensions.height, fontConfig),
    [dimensions.width, dimensions.height, fontConfig]
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
        <Text style={[styles.loadingText, { color: theme.colors.textSecondary }]}>
          Loading...
        </Text>
      </View>
    );
  }

  if (!data) {
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
        <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          No data
        </Text>
      </View>
    );
  }

  const { value, label, delta, trend = 'neutral', format = 'number' } = data;

  // Format the value (no animation for now - Expo Go limitation)
  const displayValue = useMemo(
    () => formatNumber(value, format),
    [value, format]
  );

  // Get trend color
  const trendColor = useMemo(
    () =>
      getTrendColor(trend, {
        positive: theme.colors.chartPositive,
        negative: theme.colors.chartNegative,
        neutral: theme.colors.chartNeutral,
      }),
    [trend, theme.colors]
  );

  // Format delta
  const formattedDelta = useMemo(() => {
    if (delta === undefined) return null;
    const sign = delta >= 0 ? '+' : '';
    return `${sign}${delta.toFixed(1)}%`;
  }, [delta]);

  // Trend icon
  const trendIcon = useMemo(() => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  }, [trend]);

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
      {/* Label */}
      <Text
        style={[
          styles.label,
          {
            color: theme.colors.textSecondary,
            fontSize: fontSizes.label(theme.fontScale.sm),
            marginBottom: theme.spacing.xs,
          },
        ]}
      >
        {label}
      </Text>

      {/* Value */}
      <Text
        style={[
          styles.value,
          {
            color: theme.colors.text,
            fontSize: fontSizes.value(theme.fontScale.xxl),
            fontWeight: 'bold',
          },
        ]}
      >
        {displayValue}
      </Text>

      {/* Trend and Delta */}
      {(showTrend || showDelta) && (delta !== undefined || trend !== 'neutral') && (
        <View style={styles.trendContainer}>
          {showTrend && (
            <Text
              style={[
                styles.trendIcon,
                {
                  color: trendColor,
                  fontSize: fontSizes.secondary(theme.fontScale.md),
                  marginRight: theme.spacing.xs,
                },
              ]}
            >
              {trendIcon}
            </Text>
          )}
          {showDelta && formattedDelta && (
            <Text
              style={[
                styles.delta,
                {
                  color: trendColor,
                  fontSize: fontSizes.secondary(theme.fontScale.md),
                  fontWeight: '600',
                },
              ]}
            >
              {formattedDelta}
            </Text>
          )}
        </View>
      )}
    </View>
  );
});

KPI.displayName = 'KPI';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  loadingText: {
    fontSize: 16,
  },
  emptyText: {
    fontSize: 16,
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    marginBottom: 4,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIcon: {
    fontWeight: 'bold',
  },
  delta: {},
});
