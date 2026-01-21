/**
 * Gauge Widget - Show progress toward a goal
 * Demonstrates SVG + math separation
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg from 'react-native-svg';
import {
  useWidgetDimensions,
  useWidgetTheme,
  clamp,
  interpolate,
  normalize,
  createFontSizeCalculator,
} from '../../core';
import {
  createArcPath,
  AnimatedPath,
  Text,
  formatNumber,
} from '../../renderer-svg';
import { GaugeWidgetProps } from './types';

/**
 * Gauge Widget Component
 */
export const Gauge = memo<GaugeWidgetProps>(({
  data,
  width,
  height,
  loading = false,
  theme: themeOverride,
  animated = true,
  startAngle = -120,
  endAngle = 120,
  thickness = 12,
  showValue = true,
  showLabel = true,
  fontSize: fontConfig,
  testID,
}) => {
  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 200, 200);
  
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

  const { value, max, label, unit = '' } = data;
  const normalizedValue = clamp(value, 0, max);

  // Calculate dimensions
  const size = Math.min(dimensions.width, dimensions.height);
  const center = size / 2;
  const radius = (size - thickness - theme.spacing.md * 2) / 2;

  // Calculate progress (no animation for Expo Go)
  const progressValue = normalize(normalizedValue, 0, max);
  const currentAngle = interpolate(progressValue, [0, 1], [startAngle, endAngle]);

  // Background arc path (full gauge)
  const backgroundArcPath = useMemo(
    () =>
      createArcPath({
        cx: center,
        cy: center,
        radius,
        startAngle,
        endAngle,
      }),
    [center, radius, startAngle, endAngle]
  );

  // Foreground arc path
  const foregroundArcPath = useMemo(
    () =>
      createArcPath({
        cx: center,
        cy: center,
        radius,
        startAngle,
        endAngle: currentAngle,
      }),
    [center, radius, startAngle, currentAngle]
  );

  // Display value
  const displayValue = useMemo(
    () => `${formatNumber(normalizedValue, 'compact')}${unit}`,
    [normalizedValue, unit]
  );

  const displayMax = useMemo(
    () => `/ ${formatNumber(max, 'compact')}${unit}`,
    [max, unit]
  );

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
      <Svg width={size} height={size}>
        {/* Background arc */}
        <AnimatedPath
          d={backgroundArcPath}
          stroke={theme.colors.borderLight}
          strokeWidth={thickness}
          strokeLinecap="round"
          fill="transparent"
        />

        {/* Foreground arc */}
        <AnimatedPath
          d={foregroundArcPath}
          stroke={theme.colors.chartPrimary}
          strokeWidth={thickness}
          strokeLinecap="round"
          fill="transparent"
        />

        {/* Center value text */}
        {showValue && (
          <>
            <Text
              x={center}
              y={center - 8}
              text={displayValue}
              fontSize={fontSizes.value(theme.fontScale.xl)}
              fontWeight="bold"
              fill={theme.colors.text}
            />
            <Text
              x={center}
              y={center + 16}
              text={displayMax}
              fontSize={fontSizes.secondary(theme.fontScale.sm)}
              fill={theme.colors.textSecondary}
            />
          </>
        )}
      </Svg>

      {/* Label */}
      {showLabel && label && (
        <RNText
          style={[
            styles.label,
            {
              color: theme.colors.textSecondary,
              fontSize: fontSizes.label(theme.fontScale.sm),
              marginTop: theme.spacing.sm,
            },
          ]}
        >
          {label}
        </RNText>
      )}
    </View>
  );
});

Gauge.displayName = 'Gauge';

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
