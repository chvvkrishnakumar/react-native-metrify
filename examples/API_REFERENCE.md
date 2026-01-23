# API Reference - Quick Guide

This guide shows both the **new Simple API** (Recharts-like, recommended) and the **Legacy API** (still supported) for all widgets.

## 🆕 What's New in v0.1.0-beta.1

**Simple API** - Just pass your raw data array and specify keys. No manual transformation!

```tsx
// Old way (Legacy API) - Manual data structure
<BarChart data={{ data: [{ value: 10, label: "A" }] }} />

// New way (Simple API) - Pass raw data
<BarChart data={[{ month: "Jan", sales: 10 }]} xKey="month" dataKey="sales" />
```

---

## Core Widgets

> **Note:** KPI, Gauge, and Progress currently only support **Legacy API**. Simple API coming in future release.

### KPI
**Legacy API Only:**
```tsx
<KPI
  data={{
    value: 1234,
    label: "Revenue",
    delta: 15.3,
    trend: "up",
    format: "currency",
    currency: "USD",
  }}
  width={300}
  height={120}
/>
```

### Gauge
**Legacy API Only:**
```tsx
<Gauge
  data={{
    value: 75,
    max: 100,
    label: "Score",
    unit: "%",
  }}
  width={250}
  height={250}
/>
```

### Progress
**Legacy API Only:**
```tsx
<Progress
  data={{
    value: 65,
    max: 100,
    label: "Progress",
    showPercentage: true,
  }}
  width={300}
  height={30}
/>
```

---

## Line & Area Charts

### LineChart
**Simple API (Recommended):**
```tsx
// Multiple Series Line Chart
<LineChart
  data={[
    { month: 'Jan', sales: 30, expenses: 20 },
    { month: 'Feb', sales: 45, expenses: 35 },
    { month: 'Mar', sales: 38, expenses: 28 },
  ]}
  xKey="month"
  dataKeys={['sales', 'expenses']}
  colors={['#007AFF', '#FF3B30']}
  labels={['Sales', 'Expenses']}
  width={350}
  height={200}
  showGrid
  showLegend
/>

// Area Chart (filled line)
<LineChart
  data={data}
  xKey="month"
  dataKeys={['revenue']}
  colors={['#34C759']}
  width={350}
  height={200}
  filled={true}        // Makes it an area chart
  showGradient={true}  // Beautiful gradient fill
/>
```

**Legacy API (Still Supported):**
```tsx
<LineChart
  data={{
    series: [{
      data: [
        { x: 0, y: 30 },
        { x: 1, y: 45 },
        { x: 2, y: 38 },
      ],
      color: "#007AFF",
      label: "Sales",
    }],
  }}
  width={350}
  height={200}
/>
```

### MultiLineSparkline
**Simple API:**
```tsx
<MultiLineSparkline
  data={[
    { time: 0, cpu: 20, memory: 30, disk: 15 },
    { time: 1, cpu: 35, memory: 45, disk: 25 },
    { time: 2, cpu: 28, memory: 38, disk: 20 },
  ]}
  dataKeys={['cpu', 'memory', 'disk']}
  colors={['#007AFF', '#FF3B30', '#34C759']}
  labels={['CPU', 'Memory', 'Disk']}
  width={300}
  height={100}
/>
```

**Legacy API (Still Supported):**
```tsx
<MultiLineSparkline
  data={{
    series: [{
      data: [20, 35, 28, 42, 38],
      color: "#007AFF",
      label: "CPU",
    }],
  }}
  width={300}
  height={100}
/>
```

### Sparkline
**Simple API:**
```tsx
<Sparkline
  data={[
    { time: 0, value: 20 },
    { time: 1, value: 35 },
    { time: 2, value: 28 },
  ]}
  valueKey="value"
  color="#007AFF"
  width={150}
  height={40}
/>
```

**Legacy API (Still Supported):**
```tsx
<Sparkline
  data={{
    values: [20, 35, 28, 42, 38, 45],
  }}
  width={150}
  height={40}
/>
```

---

## Bar Charts

### BarChart
**Simple API:**
```tsx
<BarChart
  data={[
    { month: 'Jan', sales: 65 },
    { month: 'Feb', sales: 78 },
    { month: 'Mar', sales: 85 },
  ]}
  xKey="month"
  dataKey="sales"
  colors={['#007AFF']}
  width={350}
  height={200}
/>
```

**Legacy API (Still Supported):**
```tsx
<BarChart
  data={{
    data: [
      { value: 65, label: "Jan" },
      { value: 78, label: "Feb" },
      { value: 85, label: "Mar" },
    ],
  }}
  width={350}
  height={200}
/>
```

### HorizontalBarChart
**Simple API:**
```tsx
<HorizontalBarChart
  data={[
    { category: 'Product A', value: 65 },
    { category: 'Product B', value: 78 },
    { category: 'Product C', value: 85 },
  ]}
  labelKey="category"
  dataKey="value"
  colors={['#007AFF']}
  width={350}
  height={200}
/>
```

**Legacy API (Still Supported):**
```tsx
<HorizontalBarChart
  data={{
    data: [
      { value: 65, label: "Product A" },
      { value: 78, label: "Product B" },
    ],
  }}
  width={350}
  height={200}
/>
```

### GroupedBarChart
**Simple API:**
```tsx
<GroupedBarChart
  data={[
    { quarter: 'Q1', sales: 100, expenses: 60, profit: 40 },
    { quarter: 'Q2', sales: 120, expenses: 70, profit: 50 },
    { quarter: 'Q3', sales: 150, expenses: 80, profit: 70 },
  ]}
  categoryKey="quarter"
  dataKeys={['sales', 'expenses', 'profit']}
  colors={['#007AFF', '#FF3B30', '#34C759']}
  labels={['Sales', 'Expenses', 'Profit']}
  width={350}
  height={250}
/>
```

**Legacy API (Still Supported):**
```tsx
<GroupedBarChart
  data={{
    categories: ['Q1', 'Q2', 'Q3'],
    groups: [
      { values: [100, 120, 150], label: 'Sales', color: '#007AFF' },
      { values: [60, 70, 80], label: 'Expenses', color: '#FF3B30' },
    ],
  }}
  width={350}
  height={250}
/>
```

### StackedBarChart
**Simple API:**
```tsx
<StackedBarChart
  data={[
    { quarter: 'Q1', sales: 100, expenses: 60, profit: 40 },
    { quarter: 'Q2', sales: 120, expenses: 70, profit: 50 },
  ]}
  categoryKey="quarter"
  dataKeys={['sales', 'expenses', 'profit']}
  colors={['#007AFF', '#FF3B30', '#34C759']}
  labels={['Sales', 'Expenses', 'Profit']}
  width={350}
  height={250}
/>
```

**Legacy API (Still Supported):**
```tsx
<StackedBarChart
  data={{
    data: [
      { 
        label: 'Q1',
        segments: [
          { value: 100, color: '#007AFF', label: 'Sales' },
          { value: 60, color: '#FF3B30', label: 'Expenses' },
        ]
      },
    ],
  }}
  width={350}
  height={250}
/>
```

### WaterfallChart
**Simple API:**
```tsx
<WaterfallChart
  data={[
    { category: 'Starting', value: 100 },
    { category: 'Sales', value: 50 },
    { category: 'Expenses', value: -30 },
    { category: 'Ending', value: 120 },
  ]}
  labelKey="category"
  valueKey="value"
  colors={['#34C759', '#FF3B30']}
  width={350}
  height={250}
/>
```

**Legacy API (Still Supported):**
```tsx
<WaterfallChart
  data={{
    data: [
      { value: 100, label: 'Starting', isTotal: true },
      { value: 50, label: 'Sales' },
      { value: -30, label: 'Expenses' },
    ],
  }}
  width={350}
  height={250}
/>
```

---

## Circular Charts

### PieChart
**Simple API:**
```tsx
<PieChart
  data={[
    { product: 'A', sales: 35 },
    { product: 'B', sales: 25 },
    { product: 'C', sales: 40 },
  ]}
  labelKey="product"
  valueKey="sales"
  colors={['#007AFF', '#FF3B30', '#34C759']}
  width={300}
  height={300}
  showLabels
/>
```

**Legacy API (Still Supported):**
```tsx
<PieChart
  data={{
    data: [
      { value: 35, label: "Product A", color: "#007AFF" },
      { value: 25, label: "Product B", color: "#FF3B30" },
      { value: 40, label: "Product C", color: "#34C759" },
    ],
  }}
  width={300}
  height={300}
  showLegend
/>
```

### RadarChart
**Simple API:**
```tsx
<RadarChart
  data={[
    { skill: 'Speed', player1: 85, player2: 70 },
    { skill: 'Strength', player1: 75, player2: 90 },
    { skill: 'Stamina', player1: 80, player2: 75 },
  ]}
  categoryKey="skill"
  dataKeys={['player1', 'player2']}
  colors={['#007AFF', '#FF3B30']}
  labels={['Player 1', 'Player 2']}
  width={300}
  height={300}
/>
```

**Legacy API (Still Supported):**
```tsx
<RadarChart
  data={{
    categories: ['Speed', 'Strength', 'Stamina'],
    series: [
      { values: [85, 75, 80], color: '#007AFF', label: 'Player 1' },
      { values: [70, 90, 75], color: '#FF3B30', label: 'Player 2' },
    ],
  }}
  width={300}
  height={300}
/>
```

---

## Scatter & Bubble Charts

### ScatterPlot
**Simple API:**
```tsx
<ScatterPlot
  data={[
    { hours: 2, score: 65, student: 'Alice' },
    { hours: 4, score: 75, student: 'Bob' },
    { hours: 6, score: 85, student: 'Carol' },
  ]}
  xKey="hours"
  yKey="score"
  labelKey="student"      // Optional: for point labels
  colors={['#007AFF']}
  width={350}
  height={300}
  showGrid
  showXAxis
  showYAxis
/>
```

**Legacy API (Still Supported):**
```tsx
<ScatterPlot
  data={{
    series: [{
      data: [
        { x: 2, y: 65 },
        { x: 4, y: 75 },
        { x: 6, y: 85 },
      ],
      color: "#007AFF",
    }],
  }}
  width={350}
  height={300}
/>
```

### BubbleChart
**Simple API:**
```tsx
<BubbleChart
  data={[
    { country: 'USA', gdp: 20000, population: 330, area: 9800 },
    { country: 'China', gdp: 15000, population: 1400, area: 9600 },
    { country: 'India', gdp: 3000, population: 1380, area: 3200 },
  ]}
  xKey="gdp"
  yKey="population"
  sizeKey="area"          // Size of bubble
  labelKey="country"      // Optional: for bubble labels
  colors={['#007AFF', '#FF3B30', '#34C759']}
  width={350}
  height={300}
  showGrid
  showXAxis
  showYAxis
/>
```

**Legacy API (Still Supported):**
```tsx
<BubbleChart
  data={{
    series: [{
      data: [
        { x: 20000, y: 330, size: 9800 },
        { x: 15000, y: 1400, size: 9600 },
      ],
      color: "#007AFF",
    }],
  }}
  width={350}
  height={300}
/>
```

---

## Distribution Charts

### Histogram
**Simple API:**
```tsx
<Histogram
  data={[
    { score: 45 },
    { score: 67 },
    { score: 72 },
    { score: 85 },
    { score: 90 },
  ]}
  valueKey="score"
  bins={5}                // Optional: number of bins
  width={350}
  height={250}
/>
```

**Legacy API (Still Supported):**
```tsx
<Histogram
  data={{
    data: [65, 70, 75, 80, 85, 90],
    binCount: 5,
  }}
  width={350}
  height={250}
/>
```

### BoxPlot
**Simple API:**
```tsx
<BoxPlot
  data={[
    { group: 'Group A', min: 12, q1: 15, median: 20, q3: 25, max: 30 },
    { group: 'Group B', min: 18, q1: 22, median: 28, q3: 32, max: 38 },
    { group: 'Group C', min: 10, q1: 18, median: 25, q3: 30, max: 35 },
  ]}
  labelKey="group"
  minKey="min"
  q1Key="q1"
  medianKey="median"
  q3Key="q3"
  maxKey="max"
  width={350}
  height={250}
/>
```

**Legacy API (Still Supported):**
```tsx
<BoxPlot
  data={{
    data: [
      {
        label: "Group A",
        min: 12,
        q1: 15,
        median: 20,
        q3: 25,
        max: 30,
      },
    ],
  }}
  width={350}
  height={250}
/>
```

---

## Specialized Charts

### Heatmap
**Simple API:**
```tsx
<Heatmap
  data={[
    { day: 'Mon', hour: 8, value: 20 },
    { day: 'Mon', hour: 12, value: 45 },
    { day: 'Tue', hour: 8, value: 30 },
    { day: 'Tue', hour: 12, value: 55 },
  ]}
  xKey="day"
  yKey="hour"
  valueKey="value"
  width={350}
  height={250}
/>
```

**Legacy API (Still Supported):**
```tsx
<Heatmap
  data={{
    xLabels: ['Mon', 'Tue', 'Wed'],
    yLabels: ['8AM', '12PM', '4PM'],
    values: [
      [20, 30, 25],
      [45, 55, 50],
      [30, 40, 35],
    ],
  }}
  width={350}
  height={250}
/>
```

### CandlestickChart
**Simple API:**
```tsx
<CandlestickChart
  data={[
    { date: '2024-01-01', open: 100, high: 110, low: 95, close: 105 },
    { date: '2024-01-02', open: 105, high: 115, low: 100, close: 110 },
    { date: '2024-01-03', open: 110, high: 120, low: 108, close: 115 },
  ]}
  dateKey="date"
  openKey="open"
  highKey="high"
  lowKey="low"
  closeKey="close"
  width={350}
  height={300}
/>
```

**Legacy API (Still Supported):**
```tsx
<CandlestickChart
  data={{
    data: [
      { date: '2024-01-01', open: 100, high: 110, low: 95, close: 105 },
      { date: '2024-01-02', open: 105, high: 115, low: 100, close: 110 },
    ],
  }}
  width={350}
  height={300}
/>
```

### FunnelChart
**Simple API:**
```tsx
<FunnelChart
  data={[
    { stage: 'Visitors', count: 10000 },
    { stage: 'Sign ups', count: 5000 },
    { stage: 'Trials', count: 2000 },
    { stage: 'Customers', count: 500 },
  ]}
  labelKey="stage"
  valueKey="count"
  colors={['#007AFF', '#34C759', '#FF9500', '#FF3B30']}
  width={350}
  height={300}
/>
```

**Legacy API (Still Supported):**
```tsx
<FunnelChart
  data={{
    data: [
      { value: 10000, label: 'Visitors', color: '#007AFF' },
      { value: 5000, label: 'Sign ups', color: '#34C759' },
      { value: 2000, label: 'Trials', color: '#FF9500' },
      { value: 500, label: 'Customers', color: '#FF3B30' },
    ],
  }}
  width={350}
  height={300}
/>
```

### SankeyDiagram
**Simple API:**
```tsx
<SankeyDiagram
  data={[
    { from: 'Source', to: 'Middle', amount: 100 },
    { from: 'Middle', to: 'Target A', amount: 60 },
    { from: 'Middle', to: 'Target B', amount: 40 },
  ]}
  sourceKey="from"
  targetKey="to"
  valueKey="amount"
  width={400}
  height={300}
/>
```

**Legacy API (Still Supported):**
```tsx
<SankeyDiagram
  data={{
    nodes: [
      { id: 'source', label: 'Source' },
      { id: 'middle', label: 'Middle' },
      { id: 'target', label: 'Target' },
    ],
    links: [
      { source: 'source', target: 'middle', value: 100 },
      { source: 'middle', target: 'target', value: 80 },
    ],
  }}
  width={400}
  height={300}
/>
```

### Treemap
**Simple API:**
```tsx
<Treemap
  data={[
    { category: 'Category A', value: 100 },
    { category: 'Category B', value: 80 },
    { category: 'Category C', value: 60 },
    { category: 'Category D', value: 40 },
  ]}
  labelKey="category"
  valueKey="value"
  colors={['#007AFF', '#34C759', '#FF3B30', '#FF9500']}
  width={350}
  height={300}
/>
```

**Legacy API (Still Supported):**
```tsx
<Treemap
  data={{
    data: [
      { label: 'Category A', value: 100, color: '#007AFF' },
      { label: 'Category B', value: 80, color: '#34C759' },
      { label: 'Category C', value: 60, color: '#FF3B30' },
    ],
  }}
  width={350}
  height={300}
/>
```

### SunburstChart
**Simple API:**
```tsx
<SunburstChart
  data={[
    { category: 'Category A', value: 100 },
    { category: 'Category B', value: 80 },
    { category: 'Category C', value: 60 },
    { category: 'Category D', value: 40 },
  ]}
  labelKey="category"
  valueKey="value"
  colors={['#007AFF', '#34C759', '#FF3B30', '#FF9500']}
  width={350}
  height={350}
/>
```

**Legacy API (Still Supported):**
```tsx
<SunburstChart
  data={{
    data: [
      {
        label: 'Category A',
        value: 100,
        color: '#007AFF',
        children: [
          { label: 'Sub A1', value: 60, color: '#007AFF' },
          { label: 'Sub A2', value: 40, color: '#0051D5' },
        ],
      },
    ],
  }}
  width={350}
  height={350}
/>
```

---

## Key Differences

### Simple API (New, Recommended)
✅ Pass raw data arrays  
✅ Specify data keys (xKey, dataKeys, etc.)  
✅ No manual data transformation  
✅ Recharts-like syntax  
✅ More concise code  

### Legacy API (Still Supported)
✅ Structured data objects  
✅ Explicit data shapes  
✅ Full backward compatibility  
✅ Fine-grained control  

---

## Migration Tips

1. **Both APIs work** - No rush to migrate
2. **New projects** - Use Simple API
3. **Existing projects** - Migrate gradually or stick with Legacy API
4. **Mixed usage** - You can use both APIs in the same app

---

## Examples

For complete working examples, see:
- `examples/basic-demo/AllWidgetsDashboard.tsx` - All widgets
- `examples/basic-demo/DashboardExample.tsx` - Real-world dashboard
- `examples/basic-demo/KPIExample.tsx` - KPI variations
- `examples/basic-demo/GaugeExample.tsx` - Gauge variations

