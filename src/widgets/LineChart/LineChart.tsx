/**
 * LineChart Widget - Full line chart with X and Y axes
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Line as SvgLine } from 'react-native-svg';
import {
  useWidgetDimensions,
  useWidgetTheme,
  normalize,
  formatTimeLabel,
  reduceLabels,
} from '../../core';
import {
  createLinePath,
  AnimatedPath,
  Text,
} from '../../renderer-svg';
import { LineChartWidgetProps } from './types';

/**
 * LineChart Widget Component
 */
export const LineChart = memo<LineChartWidgetProps>(({
  data: widgetData,
  width,
  height,
  loading = false,
  theme: themeOverride,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showLegend = true,
  maxXLabels = 6,
  maxYLabels = 5,
  curveType = 'linear',
  testID,
}) => {
  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 350, 250);

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

  const { series, title, xAxisLabel, yAxisLabel, timeInterval } = widgetData;

  // Calculate chart dimensions
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const legendHeight = showLegend ? 30 : 0;
  const xAxisHeight = showXAxis ? 30 : 0;
  const yAxisWidth = showYAxis ? 40 : 0;

  const chartWidth = dimensions.width - padding * 2 - yAxisWidth;
  const chartHeight = dimensions.height - padding * 2 - titleHeight - legendHeight - xAxisHeight;

  // Find global min/max for all series
  const { globalMinY, globalMaxY, xLabels } = useMemo(() => {
    let minY = Infinity;
    let maxY = -Infinity;
    const allXValues: (number | Date)[] = [];

    series.forEach(s => {
      s.data.forEach(point => {
        if (point.y < minY) minY = point.y;
        if (point.y > maxY) maxY = point.y;
        allXValues.push(point.x);
      });
    });

    // Generate X-axis labels
    const labels = allXValues.map((x, idx) => {
      if (x instanceof Date) {
        return timeInterval ? formatTimeLabel(x, timeInterval) : x.toLocaleDateString();
      }
      return x.toString();
    });

    return {
      globalMinY: minY,
      globalMaxY: maxY,
      xLabels: labels,
    };
  }, [series, timeInterval]);

  // Y-axis labels
  const yAxisLabels = useMemo(() => {
    const range = globalMaxY - globalMinY;
    const step = range / (maxYLabels - 1);
    return Array.from({ length: maxYLabels }, (_, i) => ({
      value: globalMinY + i * step,
      y: chartHeight - (i * chartHeight) / (maxYLabels - 1),
    }));
  }, [globalMinY, globalMaxY, maxYLabels, chartHeight]);

  // X-axis labels (reduced to fit)
  const xAxisLabelsReduced = useMemo(() => {
    return reduceLabels(xLabels, maxXLabels);
  }, [xLabels, maxXLabels]);

  // Generate paths for each series
  const seriesPaths = useMemo(() => {
    return series.map(s => {
      const points = s.data.map((point, index) => {
        const x = (index / (s.data.length - 1 || 1)) * chartWidth;
        const normalizedY = normalize(point.y, globalMinY, globalMaxY);
        const y = chartHeight - normalizedY * chartHeight;
        return { x, y };
      });

      return {
        path: createLinePath(points),
        color: s.color,
        strokeWidth: s.strokeWidth || 2,
        label: s.label,
      };
    });
  }, [series, chartWidth, chartHeight, globalMinY, globalMaxY]);

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
      <View style={styles.chartRow}>
        {/* Y-Axis */}
        {showYAxis && (
          <View style={[styles.yAxis, { width: yAxisWidth }]}>
            {yAxisLabels.map((label, index) => (
              <RNText
                key={`y-${index}`}
                style={[
                  styles.yAxisLabel,
                  {
                    color: theme.colors.textSecondary,
                    fontSize: theme.fontScale.xs,
                    top: label.y - 6,
                  },
                ]}
              >
                {label.value.toFixed(0)}
              </RNText>
            ))}
          </View>
        )}

        {/* Chart SVG */}
        <View>
          <Svg width={chartWidth} height={chartHeight}>
            {/* Grid lines */}
            {showGrid && yAxisLabels.map((label, index) => (
              <SvgLine
                key={`grid-${index}`}
                x1={0}
                y1={label.y}
                x2={chartWidth}
                y2={label.y}
                stroke={theme.colors.borderLight}
                strokeWidth={1}
              />
            ))}

            {/* Line series */}
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

          {/* X-Axis */}
          {showXAxis && (
            <View style={[styles.xAxis, { width: chartWidth }]}>
              {xAxisLabelsReduced.map((item, index) => (
                <RNText
                  key={`x-${index}`}
                  style={[
                    styles.xAxisLabel,
                    {
                      color: theme.colors.textSecondary,
                      fontSize: theme.fontScale.xs,
                      left: (item.index / (xLabels.length - 1 || 1)) * chartWidth - 20,
                    },
                  ]}
                >
                  {item.label}
                </RNText>
              ))}
            </View>
          )}
        </View>
      </View>

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

LineChart.displayName = 'LineChart';

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
    textAlign: 'center',
    width: '100%',
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  yAxis: {
    position: 'relative',
    marginRight: 8,
  },
  yAxisLabel: {
    position: 'absolute',
    right: 0,
    textAlign: 'right',
  },
  xAxis: {
    position: 'relative',
    height: 30,
    marginTop: 4,
  },
  xAxisLabel: {
    position: 'absolute',
    width: 40,
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
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
