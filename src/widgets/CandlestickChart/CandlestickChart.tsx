/**
 * CandlestickChart Widget - For stock/financial data
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect, Line as SvgLine } from 'react-native-svg';
import { useWidgetDimensions, useWidgetTheme, normalize, formatTimeLabel, reduceLabels } from '../../core';
import { CandlestickChartData, CandlestickChartLegacyProps, CandlestickChartSimpleProps, CandlestickChartWidgetProps } from './types';
import { isSimpleDataFormat, transformToCandlestickData } from '../../core/utils/dataTransform';

export const CandlestickChart = memo<CandlestickChartWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    theme: themeOverride,
    showXAxis = true,
    showYAxis = true,
    showGrid = true,
    candleWidth = 8,
    candleSpacing = 4,
    upColor,
    downColor,
    maxCandles = 30,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 350, 300);

  // Transform data if using simple API
  const widgetData: CandlestickChartData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'dateKey' in props && 'openKey' in props) {
      const simpleProps = props as CandlestickChartSimpleProps;
      return transformToCandlestickData(
        simpleProps.data, simpleProps.dateKey, simpleProps.openKey, simpleProps.highKey, simpleProps.lowKey, simpleProps.closeKey
      );
    }
    return (props as CandlestickChartLegacyProps).data || null;
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

  const { data, title, timeInterval = 'day' } = widgetData;
  const displayData = data.slice(-maxCandles); // Show last N candles
  
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const xAxisHeight = showXAxis ? 30 : 0;
  const yAxisWidth = showYAxis ? 40 : 0;

  const chartWidth = dimensions.width - padding * 2 - yAxisWidth;
  const chartHeight = dimensions.height - padding * 2 - titleHeight - xAxisHeight;

  const colorUp = upColor || theme.colors.chartPositive;
  const colorDown = downColor || theme.colors.chartNegative;

  // Find min/max prices
  const { minPrice, maxPrice } = useMemo(() => {
    const lows = displayData.map(d => d.low);
    const highs = displayData.map(d => d.high);
    return {
      minPrice: Math.min(...lows),
      maxPrice: Math.max(...highs),
    };
  }, [displayData]);

  const yAxisLabels = useMemo(() => {
    const range = maxPrice - minPrice;
    const step = range / 4;
    return Array.from({ length: 5 }, (_, i) => ({
      value: minPrice + i * step,
      y: chartHeight - (i * chartHeight) / 4,
    }));
  }, [minPrice, maxPrice, chartHeight]);

  const xLabels = useMemo(() => {
    return displayData.map(d => formatTimeLabel(d.date, timeInterval));
  }, [displayData, timeInterval]);

  const xAxisLabelsReduced = useMemo(() => {
    return reduceLabels(xLabels, 6);
  }, [xLabels]);

  const totalCandleWidth = candleWidth + candleSpacing;
  const chartStartX = Math.max(0, (chartWidth - displayData.length * totalCandleWidth) / 2);

  const candles = useMemo(() => {
    return displayData.map((point, index) => {
      const isUp = point.close >= point.open;
      const color = isUp ? colorUp : colorDown;

      // Normalize prices to chart height
      const highY = chartHeight - normalize(point.high, minPrice, maxPrice) * chartHeight;
      const lowY = chartHeight - normalize(point.low, minPrice, maxPrice) * chartHeight;
      const openY = chartHeight - normalize(point.open, minPrice, maxPrice) * chartHeight;
      const closeY = chartHeight - normalize(point.close, minPrice, maxPrice) * chartHeight;

      const candleX = chartStartX + index * totalCandleWidth;
      const candleCenterX = candleX + candleWidth / 2;

      // Candle body
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.max(Math.abs(closeY - openY), 1); // Minimum 1px

      return {
        // High-Low line (wick)
        wickX: candleCenterX,
        wickTop: highY,
        wickBottom: lowY,
        
        // Body rectangle
        bodyX: candleX,
        bodyY: bodyTop,
        bodyWidth: candleWidth,
        bodyHeight: bodyHeight,
        
        color,
        isUp,
      };
    });
  }, [displayData, chartHeight, minPrice, maxPrice, colorUp, colorDown, candleWidth, totalCandleWidth, chartStartX]);

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
                {label.value.toFixed(0)}
              </RNText>
            ))}
          </View>
        )}

        <View>
          <Svg width={chartWidth} height={chartHeight}>
            {showGrid && yAxisLabels.map((label, index) => (
              <SvgLine key={`grid-${index}`} x1={0} y1={label.y} x2={chartWidth} y2={label.y} stroke={theme.colors.borderLight} strokeWidth={1} />
            ))}

            {candles.map((candle, index) => (
              <React.Fragment key={`candle-${index}`}>
                {/* Wick (high-low line) */}
                <SvgLine
                  x1={candle.wickX}
                  y1={candle.wickTop}
                  x2={candle.wickX}
                  y2={candle.wickBottom}
                  stroke={candle.color}
                  strokeWidth={1}
                />
                
                {/* Body */}
                <Rect
                  x={candle.bodyX}
                  y={candle.bodyY}
                  width={candle.bodyWidth}
                  height={candle.bodyHeight}
                  fill={candle.color}
                  stroke={candle.color}
                  strokeWidth={1}
                />
              </React.Fragment>
            ))}
          </Svg>

          {showXAxis && (
            <View style={[styles.xAxis, { width: chartWidth }]}>
              {xAxisLabelsReduced.map((item, index) => (
                <RNText key={`x-${index}`} style={[styles.xAxisLabel, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs, left: chartStartX + (item.index * totalCandleWidth) - 20 }]}>
                  {item.label}
                </RNText>
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
});

CandlestickChart.displayName = 'CandlestickChart';

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
  xAxisLabel: { position: 'absolute', width: 40, textAlign: 'center' },
});
