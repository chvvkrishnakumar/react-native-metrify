# react-native-metrify

> Mobile-first SVG chart library for React Native, Expo, and React Native Web

[![npm version](https://img.shields.io/npm/v/react-native-metrify.svg)](https://www.npmjs.com/package/react-native-metrify)
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
npm install react-native-metrify
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
        value={1234}
        label="Total Sales"
        trend={12.5}
        format="currency"
      />

      <LineChart
        data={[10, 25, 15, 40, 30, 55, 45]}
        width={300}
        height={200}
      />

      <Gauge
        value={75}
        min={0}
        max={100}
        width={200}
        height={200}
      />
    </View>
  );
}
```

## 📊 Available Charts

### Core Widgets
- **KPI** - Display key metrics with trends and formatting
- **Gauge** - Circular or semi-circular gauge charts
- **Progress** - Linear progress bars with variants
- **Sparkline** - Minimal inline charts

### Line & Area Charts
- **LineChart** - Single or multi-line charts
- **AreaChart** - Filled area charts
- **MultiLineSparkline** - Compact multi-line visualization

### Bar Charts
- **BarChart** - Vertical bar charts
- **HorizontalBarChart** - Horizontal bar charts
- **StackedBarChart** - Stacked bar visualization
- **GroupedBarChart** - Side-by-side bars
- **WaterfallChart** - Cumulative change visualization

### Distribution & Comparison
- **PieChart** - Pie and donut charts
- **FunnelChart** - Conversion funnel visualization
- **Histogram** - Distribution frequency charts
- **BoxPlot** - Statistical box and whisker plots

### Scientific & Advanced
- **ScatterPlot** - X-Y scatter charts with optional bubbles
- **BubbleChart** - Multi-dimensional bubble visualization
- **Heatmap** - Grid-based heat intensity maps
- **RadarChart** - Multi-axis spider charts
- **CandlestickChart** - Financial OHLC charts

### Hierarchical & Flow
- **Treemap** - Hierarchical rectangle visualization
- **SunburstChart** - Radial hierarchical charts
- **SankeyDiagram** - Flow and relationship visualization

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
- [Examples](./examples/)
- [Changelog](./CHANGELOG.md)
- [Issues](https://github.com/chvvkrishnakumar/react-native-metrify/issues)

## 💡 Examples

Check out the [examples directory](./examples/expo-template/) for a full-featured demo app showcasing all chart types.

To run the example:

```bash
cd examples/expo-template
npm install
npm start
```

---

Made with ❤️ for the React Native community
