/**
 * Data transformation utilities for converting simple data arrays
 * into the internal format used by widgets
 */

export interface DataTransformOptions {
  xKey: string;
  dataKeys: string[];
  colors?: string[];
  labels?: string[];
}

/**
 * Default color palette for charts
 */
export const DEFAULT_COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7c7c',
  '#8dd1e1',
  '#a4de6c',
  '#d0ed57',
  '#ffa07a',
  '#ba68c8',
  '#4db6ac',
];

/**
 * Check if props use the new simple API format
 */
export function isSimpleDataFormat(props: any): boolean {
  return (
    props.data &&
    Array.isArray(props.data) &&
    props.data.length > 0 &&
    typeof props.data[0] === 'object'
  );
}

/**
 * Transform simple data format to series format for LineChart/AreaChart
 */
export function transformToSeriesData(
  data: Record<string, any>[],
  options: DataTransformOptions
) {
  const { xKey, dataKeys, colors, labels } = options;

  const series = dataKeys.map((key, index) => {
    const seriesData = data.map((item) => ({
      x: item[xKey],
      y: typeof item[key] === 'number' ? item[key] : 0,
    }));

    return {
      data: seriesData,
      color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      label: labels?.[index] || key,
    };
  });

  return { series };
}

/**
 * Transform simple data format to bar chart format
 */
export function transformToBarData(
  data: Record<string, any>[],
  xKey: string,
  dataKey: string,
  colors?: string[]
) {
  return {
    data: data.map((item, index) => ({
      value: typeof item[dataKey] === 'number' ? item[dataKey] : 0,
      label: String(item[xKey] ?? ''),
      color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    })),
  };
}

/**
 * Transform simple data format to pie chart format
 */
export function transformToPieData(
  data: Record<string, any>[],
  labelKey: string,
  valueKey: string,
  colors?: string[]
) {
  return {
    data: data.map((item, index) => ({
      value: typeof item[valueKey] === 'number' ? item[valueKey] : 0,
      label: String(item[labelKey] ?? ''),
      color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    })),
  };
}

/**
 * Transform simple data format to scatter/bubble chart format
 */
export function transformToScatterData(
  data: Record<string, any>[],
  xKey: string,
  yKey: string,
  sizeKey?: string,
  colors?: string[],
  labels?: string[]
) {
  return {
    data: data.map((item, index) => ({
      x: typeof item[xKey] === 'number' ? item[xKey] : 0,
      y: typeof item[yKey] === 'number' ? item[yKey] : 0,
      size: sizeKey && typeof item[sizeKey] === 'number' ? item[sizeKey] : 10,
      label: labels?.[index] || String(item[xKey] ?? ''),
      color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    })),
  };
}

/**
 * Transform simple data format to grouped bar chart format
 */
export function transformToGroupedBarData(
  data: Record<string, any>[],
  categoryKey: string,
  dataKeys: string[],
  colors?: string[],
  labels?: string[]
) {
  const groups = data.map((item) => ({
    category: String(item[categoryKey] ?? ''),
    values: dataKeys.map((key, index) => ({
      value: typeof item[key] === 'number' ? item[key] : 0,
      label: labels?.[index] || key,
      color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    })),
  }));

  return { groups };
}

/**
 * Transform simple data format to stacked bar chart format
 */
export function transformToStackedBarData(
  data: Record<string, any>[],
  categoryKey: string,
  dataKeys: string[],
  colors?: string[],
  labels?: string[]
) {
  const stacks = data.map((item) => ({
    category: String(item[categoryKey] ?? ''),
    segments: dataKeys.map((key, index) => ({
      value: typeof item[key] === 'number' ? item[key] : 0,
      label: labels?.[index] || key,
      color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    })),
  }));

  return { stacks };
}

/**
 * Transform simple data format to radar chart format
 */
export function transformToRadarData(
  data: Record<string, any>[],
  categoryKey: string,
  dataKeys: string[],
  colors?: string[],
  labels?: string[]
) {
  const series = dataKeys.map((key, index) => ({
    data: data.map((item) => ({
      category: String(item[categoryKey] ?? ''),
      value: typeof item[key] === 'number' ? item[key] : 0,
    })),
    color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    label: labels?.[index] || key,
  }));

  return { series };
}

/**
 * Transform simple data format to heatmap format
 */
export function transformToHeatmapData(
  data: Record<string, any>[],
  xKey: string,
  yKey: string,
  valueKey: string
) {
  return {
    data: data.map((item) => ({
      x: String(item[xKey] ?? ''),
      y: String(item[yKey] ?? ''),
      value: typeof item[valueKey] === 'number' ? item[valueKey] : 0,
    })),
  };
}

/**
 * Transform simple data format to box plot format
 */
export function transformToBoxPlotData(
  data: Record<string, any>[],
  labelKey: string,
  minKey: string,
  q1Key: string,
  medianKey: string,
  q3Key: string,
  maxKey: string,
  colors?: string[]
) {
  return {
    data: data.map((item, index) => ({
      label: String(item[labelKey] ?? ''),
      min: typeof item[minKey] === 'number' ? item[minKey] : 0,
      q1: typeof item[q1Key] === 'number' ? item[q1Key] : 0,
      median: typeof item[medianKey] === 'number' ? item[medianKey] : 0,
      q3: typeof item[q3Key] === 'number' ? item[q3Key] : 0,
      max: typeof item[maxKey] === 'number' ? item[maxKey] : 0,
      color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    })),
  };
}

/**
 * Transform simple data format to histogram format
 */
export function transformToHistogramData(
  data: Record<string, any>[],
  valueKey: string,
  bins?: number
) {
  const values = data
    .map((item) => (typeof item[valueKey] === 'number' ? item[valueKey] : 0))
    .filter((v) => !isNaN(v));

  return { values, bins };
}

/**
 * Transform simple data format to waterfall chart format
 */
export function transformToWaterfallData(
  data: Record<string, any>[],
  labelKey: string,
  valueKey: string,
  colors?: string[]
) {
  return {
    data: data.map((item, index) => ({
      label: String(item[labelKey] ?? ''),
      value: typeof item[valueKey] === 'number' ? item[valueKey] : 0,
      color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    })),
  };
}

/**
 * Transform simple data format to candlestick chart format
 */
export function transformToCandlestickData(
  data: Record<string, any>[],
  dateKey: string,
  openKey: string,
  highKey: string,
  lowKey: string,
  closeKey: string
) {
  return {
    data: data.map((item) => ({
      date: item[dateKey],
      open: typeof item[openKey] === 'number' ? item[openKey] : 0,
      high: typeof item[highKey] === 'number' ? item[highKey] : 0,
      low: typeof item[lowKey] === 'number' ? item[lowKey] : 0,
      close: typeof item[closeKey] === 'number' ? item[closeKey] : 0,
    })),
  };
}

/**
 * Transform simple data format to funnel chart format
 */
export function transformToFunnelData(
  data: Record<string, any>[],
  labelKey: string,
  valueKey: string,
  colors?: string[]
) {
  return {
    stages: data.map((item, index) => ({
      label: String(item[labelKey] ?? ''),
      value: typeof item[valueKey] === 'number' ? item[valueKey] : 0,
      color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    })),
  };
}

/**
 * Transform simple data format to sparkline format
 */
export function transformToSparklineData(
  data: Record<string, any>[],
  valueKey: string
) {
  const values = data
    .map((item) => (typeof item[valueKey] === 'number' ? item[valueKey] : 0))
    .filter((v) => !isNaN(v));

  return { data: values };
}

/**
 * Transform simple data format to multi-line sparkline format
 */
export function transformToMultiSparklineData(
  data: Record<string, any>[],
  dataKeys: string[],
  colors?: string[],
  labels?: string[]
) {
  const series = dataKeys.map((key, index) => ({
    data: data.map((item) => (typeof item[key] === 'number' ? item[key] : 0)),
    color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    label: labels?.[index] || key,
  }));

  return { series };
}

/**
 * Transform simple data format to treemap format
 */
export function transformToTreemapData(
  data: Record<string, any>[],
  labelKey: string,
  valueKey: string,
  parentKey?: string,
  colors?: string[]
) {
  // If no parentKey, all items are at root level
  if (!parentKey) {
    const nodes = data.map((item, index) => ({
      label: String(item[labelKey] ?? ''),
      value: typeof item[valueKey] === 'number' ? item[valueKey] : 0,
      color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    }));
    return { data: nodes };
  }

  // Build hierarchical structure if parentKey is provided
  const nodeMap = new Map<string, any>();
  const rootNodes: any[] = [];

  // First pass: create all nodes
  data.forEach((item, index) => {
    const label = String(item[labelKey] ?? '');
    const node = {
      label,
      value: typeof item[valueKey] === 'number' ? item[valueKey] : 0,
      color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      children: [] as any[],
    };
    nodeMap.set(label, node);
  });

  // Second pass: build hierarchy
  data.forEach((item) => {
    const label = String(item[labelKey] ?? '');
    const parent = item[parentKey];
    const node = nodeMap.get(label);

    if (parent && nodeMap.has(String(parent))) {
      const parentNode = nodeMap.get(String(parent));
      parentNode.children.push(node);
    } else {
      rootNodes.push(node);
    }
  });

  // Clean up empty children arrays
  const cleanNode = (node: any): any => {
    if (node.children && node.children.length === 0) {
      delete node.children;
    } else if (node.children) {
      node.children.forEach(cleanNode);
    }
    return node;
  };

  rootNodes.forEach(cleanNode);

  return { data: rootNodes };
}

/**
 * Transform simple data format to sunburst chart format
 */
export function transformToSunburstData(
  data: Record<string, any>[],
  labelKey: string,
  valueKey: string,
  parentKey?: string,
  colors?: string[]
) {
  // Reuse treemap transformation as the data structure is the same
  return transformToTreemapData(data, labelKey, valueKey, parentKey, colors);
}

/**
 * Transform simple data format to sankey diagram format
 */
export function transformToSankeyData(
  data: Record<string, any>[],
  sourceKey: string,
  targetKey: string,
  valueKey: string,
  colors?: string[]
) {
  // Extract unique nodes
  const nodeSet = new Set<string>();
  data.forEach((item) => {
    const source = String(item[sourceKey] ?? '');
    const target = String(item[targetKey] ?? '');
    if (source) nodeSet.add(source);
    if (target) nodeSet.add(target);
  });

  const nodes = Array.from(nodeSet).map((id) => ({
    id,
    label: id,
  }));

  // Create links
  const links = data.map((item, index) => ({
    source: String(item[sourceKey] ?? ''),
    target: String(item[targetKey] ?? ''),
    value: typeof item[valueKey] === 'number' ? item[valueKey] : 0,
    color: colors?.[index] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
  }));

  return { nodes, links };
}
