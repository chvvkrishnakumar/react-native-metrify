# react-native-metrify

> Mobile-first SVG chart library for React Native, Expo, and React Native Web

[![npm version](https://img.shields.io/npm/v/react-native-metrify.svg)](https://www.npmjs.com/package/react-native-metrify)

## ⚠️ Alpha Release

**This package is in early alpha.** The core functionality works, but the library is under active development.

- ✅ 24 chart types implemented and working
- ✅ TypeScript support with full type definitions
- ✅ Responsive font sizing
- ⚠️ Limited testing coverage
- ⚠️ APIs may change in future versions
- 🚧 Examples and demos coming soon

**Installation:**
```bash
npm install react-native-metrify@alpha
# or
yarn add react-native-metrify@alpha
```

Feedback and contributions welcome!
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A comprehensive, performance-focused chart library built specifically for React Native. Features 24+ chart types, SVG-based rendering, theme support, and smooth animations.

## ✨ Features

- 🎨 **24+ Chart Types** - KPI, Gauge, Line, Bar, Pie, Area, Scatter, Heatmap, and more
- 📱 **Mobile-First** - Optimized for small screens and touch interactions
- ⚡ **High Performance** - UI thread animations with react-native-reanimated
- 🎭 **Theme Support** - Built-in light/dark themes with customization
- 📦 **Zero Config** - Sensible defaults, minimal API surface
- 🔧 **TypeScript** - Full type definitions included
- 🌐 **Cross-Platform** - Works on iOS, Android, and Web (React Native Web)
- 🎯 **Expo Compatible** - Works in Expo Go and managed workflow

## 📦 Installation

```bash
npm install react-native-metrify@alpha
```

### Peer Dependencies

This library requires the following peer dependencies:

```bash
npm install react-native-svg react-native-reanimated
```

For Expo projects, these are typically already installed. For bare React Native:

```bash
# Install peer dependencies
npm install react-native-svg react-native-reanimated

# iOS only - install pods
cd ios && pod install
```

## 🚀 Quick Start

### 1. Wrap your app with ThemeProvider

```tsx
import { ThemeProvider } from 'react-native-metrify';

export default function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### 2. Use any chart component

```tsx
import { KPI, LineChart, Gauge } from 'react-native-metrify';
import { View } from 'react-native';

export default function Dashboard() {
  return (
    <View>
      <KPI
        data={{
          value: 1234,
          label: 'Total Sales',
          delta: 12.5,
          trend: 'up',
          format: 'currency',
          currency: 'USD',
        }}
        width={300}
        height={120}
      />

      <LineChart
        data={{
          series: [{
            data: [
              { x: 0, y: 10 },
              { x: 1, y: 25 },
              { x: 2, y: 15 },
              { x: 3, y: 40 },
              { x: 4, y: 30 },
              { x: 5, y: 55 },
              { x: 6, y: 45 },
            ],
            color: '#007AFF',
          }],
        }}
        width={300}
        height={200}
      />

      <Gauge
        data={{
          value: 75,
          max: 100,
          label: 'Progress',
          unit: '%',
        }}
        width={200}
        height={200}
        startAngle={-120}
        endAngle={120}
      />
    </View>
  );
}
```

## 📊 Available Charts

### Widget Showcase

<table>
  <tr>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/chvvkrishnakumar/react-native-metrify/main/docs/images/widgets/core-widgets.png" width="400" alt="Core Widgets"/><br/>
      <b>Core Widgets</b><br/>
      <sub>KPI • Gauge • Progress • Sparkline</sub>
    </td>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/chvvkrishnakumar/react-native-metrify/main/docs/images/widgets/line-area-charts.png" width="400" alt="Line & Area Charts"/><br/>
      <b>Line & Area Charts</b><br/>
      <sub>LineChart • AreaChart • MultiLineSparkline</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/chvvkrishnakumar/react-native-metrify/main/docs/images/widgets/bar-charts.png" width="400" alt="Bar Charts"/><br/>
      <b>Bar Charts</b><br/>
      <sub>BarChart • HorizontalBarChart • StackedBarChart</sub>
    </td>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/chvvkrishnakumar/react-native-metrify/main/docs/images/widgets/bar-charts-2.png" width="400" alt="More Bar Charts"/><br/>
      <b>More Bar Charts</b><br/>
      <sub>GroupedBarChart • Histogram • WaterfallChart</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/chvvkrishnakumar/react-native-metrify/main/docs/images/widgets/distribution-charts.png" width="400" alt="Distribution Charts"/><br/>
      <b>Distribution Charts</b><br/>
      <sub>PieChart • FunnelChart</sub>
    </td>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/chvvkrishnakumar/react-native-metrify/main/docs/images/widgets/scientific-charts.png" width="400" alt="Scientific Charts"/><br/>
      <b>Scientific Charts</b><br/>
      <sub>ScatterPlot • BubbleChart • Heatmap</sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/chvvkrishnakumar/react-native-metrify/main/docs/images/widgets/advanced-charts.png" width="400" alt="Advanced Charts"/><br/>
      <b>Advanced Charts</b><br/>
      <sub>RadarChart • CandlestickChart</sub>
    </td>
    <td align="center" width="50%">
      <img src="https://raw.githubusercontent.com/chvvkrishnakumar/react-native-metrify/main/docs/images/widgets/treemap-sunburst-chart.png" width="400" alt="Hierarchical Charts"/><br/>
      <b>Hierarchical Charts</b><br/>
      <sub>Treemap • SunburstChart</sub>
    </td>
  </tr>
  <tr>
    <td align="center" colspan="2">
      <img src="https://raw.githubusercontent.com/chvvkrishnakumar/react-native-metrify/main/docs/images/widgets/sankey-diagram.png" width="400" alt="Flow Diagram"/><br/>
      <b>Flow Diagram</b><br/>
      <sub>SankeyDiagram</sub>
    </td>
  </tr>
</table>

### All Chart Types

**Bar Charts:** BarChart, HorizontalBarChart, StackedBarChart, GroupedBarChart, WaterfallChart, Histogram

**Line & Area:** LineChart, AreaChart, MultiLineSparkline

**Distribution:** PieChart, FunnelChart, BoxPlot

**Scientific:** ScatterPlot, BubbleChart, Heatmap, RadarChart, CandlestickChart

**Hierarchical:** Treemap, SunburstChart, SankeyDiagram

## 🎨 Theming

### Using Built-in Themes

```tsx
import { ThemeProvider, DefaultTheme, DarkTheme } from 'react-native-metrify';

function App() {
  const [isDark, setIsDark] = useState(false);
  
  return (
    <ThemeProvider theme={isDark ? DarkTheme : DefaultTheme}>
      {/* Your content */}
    </ThemeProvider>
  );
}
```

### Custom Theme

```tsx
import { ThemeProvider, Theme } from 'react-native-metrify';

const customTheme: Theme = {
  background: '#ffffff',
  text: '#000000',
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  grid: '#E5E5EA',
  // ... more colors
};

<ThemeProvider theme={customTheme}>
  {/* Your content */}
</ThemeProvider>
```

## 📖 API Reference

### Common Props

All chart components support these common props:

```tsx
interface BaseWidgetProps {
  width?: number;          // Chart width (default: container width)
  height?: number;         // Chart height (required for most charts)
  style?: ViewStyle;       // Container style
  testID?: string;         // Test identifier
}
```

### KPI Component

```tsx
<KPI
  value={1234}
  label="Revenue"
  trend={12.5}            // Percentage change
  format="currency"       // 'number' | 'currency' | 'percentage'
  currency="USD"          // Currency code for formatting
  precision={2}           // Decimal places
  width={200}
/>
```

### LineChart Component

```tsx
<LineChart
  data={[10, 25, 15, 40, 30]}
  labels={['Jan', 'Feb', 'Mar', 'Apr', 'May']}
  width={300}
  height={200}
  curved={true}           // Use curved lines
  showGrid={true}         // Show background grid
  showPoints={true}       // Show data points
/>
```

### Gauge Component

```tsx
<Gauge
  value={75}
  min={0}
  max={100}
  width={200}
  height={200}
  variant="semi"          // 'full' | 'semi'
  showValue={true}
  unit="%"
/>
```

## 📐 Responsive Font Sizing

Text automatically scales based on widget dimensions:

```tsx
// Small widget - fonts scale down
<KPI
  data={{ value: 1234, label: "Revenue" }}
  width={150}
  height={80}
/>

// Large widget - fonts scale up
<KPI
  data={{ value: 1234, label: "Revenue" }}
  width={600}
  height={200}
/>

// Custom font sizes (disable responsive)
<KPI
  data={{ value: 1234, label: "Revenue" }}
  width={300}
  height={120}
  fontSize={{
    labelSize: 14,
    valueSize: 36,
    secondarySize: 16,
    responsive: false
  }}
/>
```

## 🎯 Design Philosophy

- **Mobile-First**: Optimized for small screens and touch interactions
- **Performance**: UI thread animations with react-native-reanimated
- **Type-Safe**: Full TypeScript support with inference
- **Zero Config**: Sensible defaults, minimal API surface

## 📱 Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| iOS | ✅ Fully Supported | Requires iOS 13+ |
| Android | ✅ Fully Supported | Requires Android 6.0+ |
| Web | ✅ Supported | Via React Native Web |
| Expo Go | ✅ Supported | Works out of the box |

## 🤝 Contributing

Contributions are welcome! Please:
1. Open an issue to discuss changes
2. Fork the repo and create a feature branch
3. Submit a PR with clear description

## 📄 License

MIT © [Krishna Kumar](https://github.com/chvvkrishnakumar)

## 🔗 Links

- [Documentation](https://github.com/chvvkrishnakumar/react-native-metrify#readme)
- [Examples](https://github.com/chvvkrishnakumar/react-native-metrify/tree/main/examples/basic-demo)
- [Changelog](./CHANGELOG.md)
- [Issues](https://github.com/chvvkrishnakumar/react-native-metrify/issues)

## 💡 Examples

Check out the [examples directory](https://github.com/chvvkrishnakumar/react-native-metrify/tree/main/examples/basic-demo) for complete working examples:

- **AllWidgetsDashboard.tsx** - All 24 widgets in one scrollable file
- **KPIExample.tsx** - 7 KPI variations
- **GaugeExample.tsx** - 6 Gauge variations  
- **DashboardExample.tsx** - Real-world dashboard
- **API_REFERENCE.md** - Complete type reference

Copy any example directly into your app and start using it!

---

Made with ❤️ for the React Native community
