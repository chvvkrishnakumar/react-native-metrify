/**
 * Histogram Widget - Frequency distribution
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect, Line as SvgLine } from 'react-native-svg';
import { useWidgetDimensions, useWidgetTheme, normalize } from '../../core';
import { HistogramData, HistogramLegacyProps, HistogramSimpleProps, HistogramWidgetProps } from './types';
import { isSimpleDataFormat, transformToHistogramData } from '../../core/utils/dataTransform';

export const Histogram = memo<HistogramWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    theme: themeOverride,
    showXAxis = true,
    showYAxis = true,
    showGrid = false,
    color,
    barSpacing = 2,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 350, 250);

  // Transform data if using simple API
  const widgetData: HistogramData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'valueKey' in props) {
      const simpleProps = props as HistogramSimpleProps;
      const transformed = transformToHistogramData(simpleProps.data, simpleProps.valueKey, simpleProps.bins);
      return { data: transformed.values, binCount: transformed.bins };
    }
    return (props as HistogramLegacyProps).data || null;
  }, [props]);

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

  const { data, title, binCount = 10 } = widgetData;
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const xAxisHeight = showXAxis ? 30 : 0;
  const yAxisWidth = showYAxis ? 40 : 0;

  const chartWidth = dimensions.width - padding * 2 - yAxisWidth;
  const chartHeight = dimensions.height - padding * 2 - titleHeight - xAxisHeight;

  const barColor = color || theme.colors.chartPrimary;

  // Calculate bins
  const { bins, maxFrequency, minValue, maxValue } = useMemo(() => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const binWidth = (max - min) / binCount;
    
    const binArray: { start: number; end: number; count: number }[] = [];
    
    for (let i = 0; i < binCount; i++) {
      const start = min + i * binWidth;
      const end = start + binWidth;
      const count = data.filter(val => val >= start && (i === binCount - 1 ? val <= end : val < end)).length;
      binArray.push({ start, end, count });
    }

    const maxFreq = Math.max(...binArray.map(b => b.count));
    
    return {
      bins: binArray,
      maxFrequency: maxFreq,
      minValue: min,
      maxValue: max,
    };
  }, [data, binCount]);

  const yAxisLabels = useMemo(() => {
    const step = Math.ceil(maxFrequency / 4);
    return Array.from({ length: 5 }, (_, i) => ({
      value: i * step,
      y: chartHeight - (i * chartHeight) / 4,
    }));
  }, [maxFrequency, chartHeight]);

  const barWidth = (chartWidth - (bins.length - 1) * barSpacing) / bins.length;

  const bars = useMemo(() => {
    return bins.map((bin, index) => {
      const barHeight = (bin.count / maxFrequency) * chartHeight;
      const barY = chartHeight - barHeight;
      const barX = index * (barWidth + barSpacing);

      return {
        x: barX,
        y: barY,
        width: barWidth,
        height: barHeight,
        count: bin.count,
        rangeLabel: `${bin.start.toFixed(0)}-${bin.end.toFixed(0)}`,
      };
    });
  }, [bins, maxFrequency, chartHeight, barWidth, barSpacing]);

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <View style={styles.chartRow}>
        {showYAxis && (
          <View style={[styles.yAxis, { width: yAxisWidth }]}>
            {yAxisLabels.map((label, index) => (
              <RNText key={`y-${index}`} style={[styles.yAxisLabel, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs, top: label.y - 6 }]}>
                {label.value}
              </RNText>
            ))}
          </View>
        )}

        <View>
          <Svg width={chartWidth} height={chartHeight}>
            {showGrid && yAxisLabels.map((label, index) => (
              <SvgLine key={`grid-${index}`} x1={0} y1={label.y} x2={chartWidth} y2={label.y} stroke={theme.colors.borderLight} strokeWidth={1} />
            ))}

            {bars.map((bar, index) => (
              <Rect
                key={`bar-${index}`}
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                fill={barColor}
                rx={theme.radius.sm}
                ry={theme.radius.sm}
              />
            ))}
          </Svg>

          {showXAxis && (
            <View style={[styles.xAxis, { width: chartWidth }]}>
              <RNText style={[styles.xAxisLabel, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs, left: 0 }]}>
                {minValue.toFixed(0)}
              </RNText>
              <RNText style={[styles.xAxisLabel, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs, right: 0 }]}>
                {maxValue.toFixed(0)}
              </RNText>
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

Histogram.displayName = 'Histogram';

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'flex-start' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
  chartRow: { flexDirection: 'row', alignItems: 'flex-start' },
  yAxis: { position: 'relative', marginRight: 8 },
  yAxisLabel: { position: 'absolute', right: 0, textAlign: 'right' },
  xAxis: { position: 'relative', height: 30, marginTop: 4 },
  xAxisLabel: { position: 'absolute' },
});
