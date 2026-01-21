# API Reference - Quick Guide

This guide shows the correct `data` prop structure for each widget.

## Core Widgets

### KPI
```tsx
<KPI
  data={{
    value: 1234,
    label: "Revenue",
    delta: 15.3,        // Optional: percentage change
    trend: "up",        // Optional: "up" | "down" | "neutral"
    format: "currency", // Optional: "number" | "currency" | "percent"
    currency: "USD",    // Optional: for currency format
  }}
  width={300}
  height={120}
/>
```

### Gauge
```tsx
<Gauge
  data={{
    value: 75,
    max: 100,
    label: "Score",  // Optional
    unit: "%",       // Optional
  }}
  width={250}
  height={250}
  startAngle={-120}  // Optional: start angle in degrees (default: -120)
  endAngle={120}     // Optional: end angle in degrees (default: 120)
  thickness={12}     // Optional: arc thickness (default: 12)
/>
```

### Progress
```tsx
<Progress
  data={{
    value: 65,
    max: 100,
    label: "Progress",       // Optional
    showPercentage: true,    // Optional
  }}
  width={300}
  height={30}
  variant="bar"              // Optional: "bar" | "circle"
/>
```

### Sparkline
```tsx
<Sparkline
  data={{
    data: [15, 25, 18, 32, 28, 35, 42],
    label: "Trend",  // Optional
  }}
  width={150}
  height={50}
  style="line"       // Optional: "line" | "area"
/>
```

## Charts

### LineChart
```tsx
<LineChart
  data={{
    series: [{
      data: [
        { x: 0, y: 30 },
        { x: 1, y: 45 },
        { x: 2, y: 38 },
      ],
      color: "#007AFF",  // Optional
      label: "Sales",    // Optional
    }],
    title: "Weekly Sales",  // Optional
  }}
  width={350}
  height={200}
/>
```

### BarChart
```tsx
<BarChart
  data={{
    data: [
      { value: 65, label: "Jan" },
      { value: 78, label: "Feb" },
      { value: 85, label: "Mar" },
    ],
    title: "Monthly Sales",  // Optional
  }}
  width={350}
  height={200}
  orientation="vertical"     // Optional: "vertical" | "horizontal"
/>
```

### AreaChart
```tsx
<AreaChart
  data={{
    series: [{
      data: [
        { x: 0, y: 30 },
        { x: 1, y: 45 },
      ],
      color: "#34C759",
      fillOpacity: 0.3,  // Optional
    }],
  }}
  width={350}
  height={200}
/>
```

### PieChart
```tsx
<PieChart
  data={{
    data: [
      { value: 35, label: "Product A", color: "#007AFF" },
      { value: 25, label: "Product B", color: "#34C759" },
      { value: 20, label: "Product C", color: "#FF9500" },
    ],
  }}
  width={300}
  height={300}
/>
```

## Common Patterns

### All widgets accept:
```tsx
<Widget
  data={{...}}           // Required: widget-specific data
  width={300}            // Optional: default fills container
  height={200}           // Required for most charts
  loading={false}        // Optional: show loading state
  theme={customTheme}    // Optional: override theme
  testID="my-widget"     // Optional: for testing
  fontSize={{            // Optional: font customization
    labelSize: 14,
    valueSize: 32,
    responsive: true,
  }}
/>
```

## Tips

1. **Always wrap data in a `data` prop object**
   ```tsx
   ✅ data={{ value: 100, label: "Score" }}
   ❌ value={100} label="Score"
   ```

2. **Use proper data structures**
   ```tsx
   ✅ data={{ data: [1, 2, 3] }}        // For arrays
   ❌ data={[1, 2, 3]}                  // Wrong!
   ```

3. **Optional properties can be omitted**
   ```tsx
   // Minimal
   <KPI data={{ value: 1234, label: "Sales" }} />
   
   // Full featured
   <KPI 
     data={{ 
       value: 1234, 
       label: "Sales",
       delta: 15.3,
       trend: "up",
       format: "currency",
     }} 
   />
   ```

4. **TypeScript will guide you!**
   - Hover over props to see available options
   - Auto-complete shows all valid properties
   - Type errors indicate incorrect usage

## Need More Examples?

See the example files in this directory:
- `KPIExample.tsx`
- `GaugeExample.tsx`
- `LineChartExample.tsx`
- `DashboardExample.tsx`
