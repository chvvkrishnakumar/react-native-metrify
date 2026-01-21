/**
 * Progress Widget - Simple linear progress with meaning
 * SVG rects + animation
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import {
  useWidgetDimensions,
  useWidgetTheme,
  clamp,
  normalize,
} from '../../core';
import { createRoundedRectPath, AnimatedPath } from '../../renderer-svg';
import { ProgressWidgetProps } from './types';

// AnimatedRect removed for Expo Go compatibility

/**
 * Progress Widget Component
 */
export const Progress = memo<ProgressWidgetProps>(({
  data,
  width,
  height,
  loading = false,
  theme: themeOverride,
  animated = true,
  variant = 'bar',
  barHeight = 12,
  showValue = true,
  testID,
}) => {
  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(
    width,
    height,
    300,
    variant === 'bar' ? 80 : 200
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
        <RNText style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
          No data
        </RNText>
      </View>
    );
  }

  const { value, max, label, showPercentage = true } = data;
  const normalizedValue = clamp(value, 0, max);
  const percentage = max > 0 ? (normalizedValue / max) * 100 : 0;

  // Calculate progress (no animation for Expo Go)
  const progressValue = normalize(normalizedValue, 0, max);

  // Calculate bar dimensions
  const barWidth = dimensions.width - theme.spacing.md * 2;
  const barY = label
    ? theme.spacing.md + theme.fontScale.sm + theme.spacing.xs
    : theme.spacing.md;

  // Calculate bar width
  const currentBarWidth = progressValue * barWidth;

  // Display text
  const displayValue = useMemo(() => {
    if (!showValue) return null;
    if (showPercentage) return `${percentage.toFixed(0)}%`;
    return `${normalizedValue} / ${max}`;
  }, [showValue, showPercentage, percentage, normalizedValue, max]);

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
      {label && (
        <RNText
          style={[
            styles.label,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.fontScale.sm,
              marginBottom: theme.spacing.xs,
            },
          ]}
        >
          {label}
        </RNText>
      )}

      {/* Progress Bar */}
      <Svg width={barWidth} height={barHeight}>
        {/* Background */}
        <Rect
          x={0}
          y={0}
          width={barWidth}
          height={barHeight}
          fill={theme.colors.borderLight}
          rx={theme.radius.sm}
          ry={theme.radius.sm}
        />

        {/* Foreground */}
        <Rect
          x={0}
          y={0}
          width={currentBarWidth}
          height={barHeight}
          fill={theme.colors.chartPrimary}
          rx={theme.radius.sm}
          ry={theme.radius.sm}
        />
      </Svg>

      {/* Value Display */}
      {displayValue && (
        <RNText
          style={[
            styles.value,
            {
              color: theme.colors.text,
              fontSize: theme.fontScale.md,
              fontWeight: '600',
              marginTop: theme.spacing.xs,
            },
          ]}
        >
          {displayValue}
        </RNText>
      )}
    </View>
  );
});

Progress.displayName = 'Progress';

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
  value: {},
});
