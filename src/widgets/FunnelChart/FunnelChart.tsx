/**
 * FunnelChart Widget - Conversion funnel visualization
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';
import { useWidgetDimensions, useWidgetTheme, normalize } from '../../core';
import { FunnelChartData, FunnelChartLegacyProps, FunnelChartSimpleProps, FunnelChartWidgetProps } from './types';
import { isSimpleDataFormat, transformToFunnelData } from '../../core/utils/dataTransform';

export const FunnelChart = memo<FunnelChartWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    theme: themeOverride,
    showLabels = true,
    showValues = true,
    showPercentages = true,
    stageSpacing = 8,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 300, 400);

  // Transform data if using simple API
  const widgetData: FunnelChartData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'xKey' in props || 'dataKeys' in props || 'labelKey' in props || 'valueKey' in props || 'categoryKey' in props || 'dateKey' in props) {
      const simpleProps = props as FunnelChartSimpleProps;
      return transformToFunnelData(simpleProps.data, simpleProps.labelKey, simpleProps.valueKey, simpleProps.colors);
    }
    return (props as FunnelChartLegacyProps).data || null;
  }, [props]);

  if (loading) {
    return (
      <View style={[styles.container, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md }]} testID={`${testID}-loading`}>
        <RNText style={[styles.loadingText, { color: theme.colors.textSecondary }]}>Loading...</RNText>
      </View>
    );
  }

  if (!widgetData || !widgetData.stages || widgetData.stages.length === 0) {
    return (
      <View style={[styles.container, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md }]} testID={`${testID}-empty`}>
        <RNText style={[styles.emptyText, { color: theme.colors.textSecondary }]}>No data</RNText>
      </View>
    );
  }

  const { stages, title } = widgetData;
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const labelWidth = showLabels ? 100 : 0;

  const chartWidth = dimensions.width - padding * 2 - labelWidth;
  const chartHeight = dimensions.height - padding * 2 - titleHeight;

  const maxValue = stages[0].value;
  const totalSpacing = (stages.length - 1) * stageSpacing;
  const stageHeight = (chartHeight - totalSpacing) / stages.length;

  const funnelStages = useMemo(() => {
    return stages.map((stage, index) => {
      const normalizedValue = normalize(stage.value, 0, maxValue);
      const topWidth = normalizedValue * chartWidth;
      const bottomWidth = index < stages.length - 1
        ? normalize(stages[index + 1].value, 0, maxValue) * chartWidth
        : topWidth * 0.7; // Last stage tapers to 70%

      const y = index * (stageHeight + stageSpacing);
      const centerX = chartWidth / 2;

      // Create trapezoid points (top-left, top-right, bottom-right, bottom-left)
      const points = `
        ${centerX - topWidth / 2},${y}
        ${centerX + topWidth / 2},${y}
        ${centerX + bottomWidth / 2},${y + stageHeight}
        ${centerX - bottomWidth / 2},${y + stageHeight}
      `;

      const percentage = ((stage.value / maxValue) * 100).toFixed(1);
      const conversionRate = index > 0
        ? ((stage.value / stages[index - 1].value) * 100).toFixed(1)
        : '100.0';

      return {
        points,
        color: stage.color || getDefaultColor(index, theme),
        label: stage.label,
        value: stage.value,
        percentage,
        conversionRate,
        y: y + stageHeight / 2,
      };
    });
  }, [stages, chartWidth, chartHeight, stageHeight, stageSpacing, maxValue, theme]);

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <View style={styles.chartRow}>
        <View>
          <Svg width={chartWidth} height={chartHeight}>
            {funnelStages.map((stage, index) => (
              <Polygon
                key={`stage-${index}`}
                points={stage.points}
                fill={stage.color}
                opacity={0.9}
              />
            ))}
          </Svg>
        </View>

        {showLabels && (
          <View style={[styles.labelsContainer, { width: labelWidth, height: chartHeight }]}>
            {funnelStages.map((stage, index) => (
              <View
                key={`label-${index}`}
                style={[styles.labelItem, { top: stage.y - 20, height: 40 }]}
              >
                <RNText
                  style={[styles.label, { color: theme.colors.text, fontSize: theme.fontScale.sm }]}
                  numberOfLines={1}
                >
                  {stage.label}
                </RNText>
                {showValues && (
                  <RNText
                    style={[styles.value, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs }]}
                  >
                    {stage.value.toLocaleString()}
                  </RNText>
                )}
                {showPercentages && (
                  <RNText
                    style={[styles.percentage, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs }]}
                  >
                    {index > 0 ? `${stage.conversionRate}%` : '100%'}
                  </RNText>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
});

FunnelChart.displayName = 'FunnelChart';

function getDefaultColor(index: number, theme: any): string {
  const colors = [
    theme.colors.chartPrimary,
    theme.colors.chartSecondary,
    theme.colors.chartTertiary,
    theme.colors.chartQuaternary,
    theme.colors.chartPositive,
  ];
  return colors[index % colors.length];
}

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'flex-start' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
  chartRow: { flexDirection: 'row', flex: 1 },
  labelsContainer: { position: 'relative', marginLeft: 12 },
  labelItem: { position: 'absolute', justifyContent: 'center' },
  label: { fontWeight: '600', marginBottom: 2 },
  value: { marginBottom: 1 },
  percentage: { fontWeight: '500' },
});
