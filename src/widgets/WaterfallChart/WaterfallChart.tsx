/**
 * WaterfallChart Widget - Shows incremental positive/negative changes
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect, Line as SvgLine } from 'react-native-svg';
import { useWidgetDimensions, useWidgetTheme } from '../../core';
import { Text } from '../../renderer-svg/primitives';
import { WaterfallChartWidgetProps } from './types';

export const WaterfallChart = memo<WaterfallChartWidgetProps>(({
  data: widgetData,
  width,
  height,
  loading = false,
  theme: themeOverride,
  showValues = true,
  showLabels = true,
  positiveColor,
  negativeColor,
  totalColor,
  barWidth = 40,
  barSpacing = 20,
  testID,
}) => {
  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 400, 300);

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

  const { data, title, startLabel = 'Start' } = widgetData;
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const labelHeight = showLabels ? 40 : 0;

  const chartHeight = dimensions.height - padding * 2 - titleHeight - labelHeight;
  const chartWidth = dimensions.width - padding * 2;

  const colorPositive = positiveColor || theme.colors.chartPositive;
  const colorNegative = negativeColor || theme.colors.chartNegative;
  const colorTotal = totalColor || theme.colors.chartPrimary;

  // Calculate cumulative values and positions
  const { bars, maxValue, minValue } = useMemo(() => {
    let cumulative = 0;
    const calculatedBars: any[] = [];
    let max = -Infinity;
    let min = Infinity;

    data.forEach((point, index) => {
      const isPositive = point.value >= 0;
      const isTotal = point.isTotal || false;
      
      const startValue = isTotal ? 0 : cumulative;
      const endValue = isTotal ? cumulative + point.value : cumulative + point.value;
      
      if (endValue > max) max = endValue;
      if (startValue < min) min = startValue;
      
      calculatedBars.push({
        label: point.label,
        value: point.value,
        startValue,
        endValue,
        isPositive,
        isTotal,
        x: index * (barWidth + barSpacing),
      });

      if (!isTotal) {
        cumulative += point.value;
      }
    });

    if (0 > min) min = 0;
    if (0 < max) max = max;

    return { bars: calculatedBars, maxValue: max, minValue: min };
  }, [data, barWidth, barSpacing]);

  const valueRange = maxValue - minValue;
  const zeroY = chartHeight - ((0 - minValue) / valueRange) * chartHeight;

  const renderedBars = useMemo(() => {
    return bars.map(bar => {
      const startY = chartHeight - ((bar.startValue - minValue) / valueRange) * chartHeight;
      const endY = chartHeight - ((bar.endValue - minValue) / valueRange) * chartHeight;
      const barHeight = Math.abs(startY - endY);
      const barY = Math.min(startY, endY);

      let color = colorTotal;
      if (!bar.isTotal) {
        color = bar.isPositive ? colorPositive : colorNegative;
      }

      return {
        x: bar.x,
        y: barY,
        width: barWidth,
        height: barHeight,
        color,
        label: bar.label,
        value: bar.value,
        startY,
        endY,
        isTotal: bar.isTotal,
      };
    });
  }, [bars, chartHeight, minValue, valueRange, barWidth, colorPositive, colorNegative, colorTotal]);

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          {/* Zero line */}
          <SvgLine
            x1={0}
            y1={zeroY}
            x2={chartWidth}
            y2={zeroY}
            stroke={theme.colors.border}
            strokeWidth={1}
            strokeDasharray="4 4"
          />

          {/* Connection lines between bars */}
          {renderedBars.map((bar, index) => {
            if (index < renderedBars.length - 1) {
              const nextBar = renderedBars[index + 1];
              return (
                <SvgLine
                  key={`connector-${index}`}
                  x1={bar.x + barWidth}
                  y1={bar.endY}
                  x2={nextBar.x}
                  y2={nextBar.isTotal ? nextBar.y : bar.endY}
                  stroke={theme.colors.borderLight}
                  strokeWidth={2}
                  strokeDasharray="4 2"
                />
              );
            }
            return null;
          })}

          {/* Bars */}
          {renderedBars.map((bar, index) => (
            <React.Fragment key={`bar-${index}`}>
              <Rect
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                fill={bar.color}
                rx={theme.radius.sm}
                ry={theme.radius.sm}
              />
              {showValues && (
                <Text
                  x={bar.x + bar.width / 2}
                  y={bar.y - 4}
                  text={bar.value >= 0 ? `+${bar.value}` : `${bar.value}`}
                  fontSize={theme.fontScale.xs}
                  fill={theme.colors.text}
                  textAnchor="middle"
                />
              )}
            </React.Fragment>
          ))}
        </Svg>

        {showLabels && (
          <View style={styles.labelsContainer}>
            {renderedBars.map((bar, index) => (
              <View
                key={`label-${index}`}
                style={[styles.labelItem, { left: bar.x, width: barWidth }]}
              >
                <RNText
                  style={[styles.labelText, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs }]}
                  numberOfLines={2}
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

WaterfallChart.displayName = 'WaterfallChart';

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'flex-start' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
  chartContainer: { flex: 1, width: '100%' },
  labelsContainer: { position: 'relative', height: 40, marginTop: 4 },
  labelItem: { position: 'absolute', alignItems: 'center' },
  labelText: { textAlign: 'center' },
});
