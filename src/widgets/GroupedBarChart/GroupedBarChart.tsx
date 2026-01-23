/**
 * GroupedBarChart Widget - Multiple bars side by side
 */
import React, { memo, useMemo } from 'react';
import { View, Text as RNText, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { useWidgetDimensions, useWidgetTheme, normalize } from '../../core';
import { Text } from '../../renderer-svg/primitives';
import { GroupedBarChartData, GroupedBarChartLegacyProps, GroupedBarChartSimpleProps, GroupedBarChartWidgetProps } from './types';
import { isSimpleDataFormat, transformToGroupedBarData } from '../../core/utils/dataTransform';

export const GroupedBarChart = memo<GroupedBarChartWidgetProps>((props) => {
  const {
    width,
    height,
    loading = false,
    theme: themeOverride,
    barWidth = 20,
    groupSpacing = 32,
    barSpacing = 4,
    showValues = false,
    showLabels = true,
    showLegend = true,
    maxGroups = 10,
    testID,
  } = props;

  const theme = useWidgetTheme(themeOverride);
  const dimensions = useWidgetDimensions(width, height, 350, 250);

  // Transform data if using simple API
  const widgetData: GroupedBarChartData | null = useMemo(() => {
    if (isSimpleDataFormat(props) && 'categoryKey' in props && 'dataKeys' in props) {
      const simpleProps = props as GroupedBarChartSimpleProps;
      const transformed = transformToGroupedBarData(simpleProps.data, simpleProps.categoryKey, simpleProps.dataKeys, simpleProps.colors, simpleProps.labels);
      return { data: transformed.groups.map(g => ({ groupLabel: g.category, values: g.values })) };
    }
    return (props as GroupedBarChartLegacyProps).data || null;
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

  const { data, title } = widgetData;
  const displayData = data.slice(0, maxGroups);
  const padding = theme.spacing.md;
  const titleHeight = title ? theme.fontScale.md + theme.spacing.sm : 0;
  const legendHeight = showLegend ? 40 : 0;
  const labelHeight = showLabels ? theme.fontScale.sm + theme.spacing.xs : 0;

  const chartHeight = dimensions.height - padding * 2 - titleHeight - legendHeight - labelHeight;
  const chartWidth = dimensions.width - padding * 2;

  const maxValue = useMemo(() => {
    return Math.max(...displayData.flatMap(group => group.values.map(v => v.value)));
  }, [displayData]);

  // Get all unique value labels for legend
  const allValueLabels = useMemo(() => {
    const labels = new Map<string, string>();
    displayData.forEach(group => {
      group.values.forEach(val => {
        labels.set(val.label, val.color);
      });
    });
    return Array.from(labels.entries()).map(([label, color]) => ({ label, color }));
  }, [displayData]);

  const groups = useMemo(() => {
    return displayData.map((group, groupIndex) => {
      const barsInGroup = group.values.length;
      const groupWidth = barsInGroup * barWidth + (barsInGroup - 1) * barSpacing;
      const groupX = groupIndex * (groupWidth + groupSpacing);

      const bars = group.values.map((val, barIndex) => {
        const barX = groupX + barIndex * (barWidth + barSpacing);
        const normalizedValue = normalize(val.value, 0, maxValue);
        const barHeight = normalizedValue * chartHeight;
        const barY = chartHeight - barHeight;

        return {
          x: barX,
          y: barY,
          width: barWidth,
          height: barHeight,
          color: val.color,
          value: val.value,
          label: val.label,
        };
      });

      return {
        groupLabel: group.groupLabel,
        bars,
        groupX,
        groupWidth,
      };
    });
  }, [displayData, barWidth, barSpacing, groupSpacing, chartHeight, maxValue]);

  return (
    <View style={[styles.wrapper, { width: dimensions.width, height: dimensions.height, backgroundColor: theme.colors.surface, borderRadius: theme.radius.md, padding }]} testID={testID}>
      {title && (
        <RNText style={[styles.title, { color: theme.colors.text, fontSize: theme.fontScale.md, fontWeight: 'bold', marginBottom: theme.spacing.sm }]}>
          {title}
        </RNText>
      )}

      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight + (showValues ? 20 : 0)}>
          {groups.map((group, groupIndex) => (
            group.bars.map((bar, barIndex) => (
              <React.Fragment key={`group-${groupIndex}-bar-${barIndex}`}>
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
                    text={bar.value.toString()}
                    fontSize={theme.fontScale.xs}
                    fill={theme.colors.textSecondary}
                    textAnchor="middle"
                  />
                )}
              </React.Fragment>
            ))
          ))}
        </Svg>

        {showLabels && (
          <View style={styles.labelsContainer}>
            {groups.map((group, index) => (
              <View
                key={`label-${index}`}
                style={[styles.labelItem, { left: group.groupX + group.groupWidth / 2 - 30, width: 60 }]}
              >
                <RNText
                  style={[styles.labelText, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs }]}
                  numberOfLines={1}
                >
                  {group.groupLabel}
                </RNText>
              </View>
            ))}
          </View>
        )}
      </View>

      {showLegend && (
        <View style={styles.legend}>
          {allValueLabels.map((item, index) => (
            <View key={`legend-${index}`} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <RNText style={[styles.legendText, { color: theme.colors.textSecondary, fontSize: theme.fontScale.xs }]}>
                {item.label}
              </RNText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
});

GroupedBarChart.displayName = 'GroupedBarChart';

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-start', alignItems: 'flex-start' },
  container: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 16 },
  emptyText: { fontSize: 16 },
  title: { textAlign: 'center', width: '100%' },
  chartContainer: { flex: 1, width: '100%' },
  labelsContainer: { position: 'relative', height: 30, marginTop: 4 },
  labelItem: { position: 'absolute', alignItems: 'center' },
  labelText: { textAlign: 'center' },
  legend: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 12, gap: 12 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendColor: { width: 12, height: 12, borderRadius: 2 },
  legendText: { textTransform: 'uppercase', letterSpacing: 0.5 },
});
