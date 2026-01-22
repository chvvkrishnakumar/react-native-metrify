# 📸 How to Capture Widget Screenshots

This guide will help you create consistent, high-quality screenshots of all widgets for the README.

## Setup

1. **Create a demo app** (or use your technician app)
2. **Install the package:**
   ```bash
   npm install react-native-metrify@alpha
   ```

## Screenshot Requirements

### Dimensions
- **Width:** 400-600px (for GitHub display)
- **Background:** White (#FFFFFF) or light gray (#F5F5F5)
- **Widget size:** Consistent across similar types
  - KPI/Gauge: 300x200px
  - Charts: 400x300px

### Naming Convention
Save images as:
```
docs/images/widgets/
├── kpi.png
├── gauge.png
├── sparkline.png
├── progress.png
├── line-chart.png
├── bar-chart.png
├── area-chart.png
├── pie-chart.png
└── ... (etc)
```

## Widget Configuration for Screenshots

### KPI Widget
```tsx
<KPI
  data={{
    value: 12450,
    label: "Total Revenue",
    delta: 15.3,
    trend: "up",
    format: "currency",
    currency: "USD"
  }}
  width={300}
  height={120}
/>
```

### Gauge Widget
```tsx
<Gauge
  data={{
    value: 75,
    max: 100,
    label: "Completion",
    unit: "%"
  }}
  width={250}
  height={250}
  variant="semi"
/>
```

### LineChart
```tsx
<LineChart
  data={{
    series: [{
      data: [
        { x: 0, y: 45 },
        { x: 1, y: 62 },
        { x: 2, y: 58 },
        { x: 3, y: 78 },
        { x: 4, y: 72 },
        { x: 5, y: 85 },
        { x: 6, y: 92 },
        { x: 7, y: 88 },
        { x: 8, y: 95 },
      ],
      color: "#007AFF",
      label: "Sales",
    }],
  }}
  width={400}
  height={250}
/>
```

### BarChart
```tsx
<BarChart
  data={{
    data: [
      { label: "Mon", value: 65 },
      { label: "Tue", value: 78 },
      { label: "Wed", value: 85 },
      { label: "Thu", value: 92 },
      { label: "Fri", value: 58 },
      { label: "Sat", value: 73 },
      { label: "Sun", value: 88 },
    ],
  }}
  width={400}
  height={250}
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
        { x: 2, y: 42 },
        { x: 3, y: 58 },
        { x: 4, y: 65 },
        { x: 5, y: 72 },
        { x: 6, y: 68 },
        { x: 7, y: 75 },
      ],
      color: "#34C759",
      label: "Revenue",
    }],
  }}
  width={400}
  height={250}
/>
```

### PieChart
```tsx
<PieChart
  data={{
    segments: [
      { value: 35, label: 'Product A', color: '#007AFF' },
      { value: 25, label: 'Product B', color: '#34C759' },
      { value: 20, label: 'Product C', color: '#FF9500' },
      { value: 20, label: 'Product D', color: '#FF3B30' },
    ],
  }}
  width={300}
  height={300}
/>
```

### Sparkline
```tsx
<Sparkline
  data={{
    data: [15, 25, 18, 32, 28, 35, 42, 38, 45, 52, 48, 55],
    label: "Trend",
  }}
  width={200}
  height={60}
/>
```

### Progress
```tsx
<Progress
  data={{
    value: 65,
    max: 100,
  }}
  width={300}
  height={30}
/>
```

## Capturing Screenshots

### Method 1: iOS Simulator / Android Emulator
1. Run your app on simulator/emulator
2. Use built-in screenshot tools:
   - **iOS Simulator:** CMD + S
   - **Android Emulator:** Camera icon in toolbar

### Method 2: Physical Device
1. Run on your device
2. Take screenshot:
   - **iOS:** Power + Volume Up
   - **Android:** Power + Volume Down

### Method 3: Expo Snack (for web)
1. Create a Snack: https://snack.expo.dev/
2. Add your widgets
3. Use browser screenshot tools
4. Crop to widget only

## Post-Processing

1. **Crop** to show only the widget (no extra UI)
2. **Optimize** file size:
   ```bash
   # Using ImageOptim (Mac)
   # or
   npm install -g imagemin-cli
   imagemin docs/images/widgets/*.png --out-dir=docs/images/widgets/
   ```
3. **Ensure consistency** - similar padding/spacing for all

## Tips

- Use sample data that looks realistic
- Keep colors consistent (use default theme)
- Ensure text is readable
- Remove any debug info or labels
- Use high resolution (2x or 3x) then downscale

## Commit and Push

```bash
git add docs/images/
git commit -m "Add widget screenshots"
git push origin main
```

The images will then be visible in your README via GitHub's CDN!
