# Basic Demo - react-native-metrify

Simple examples showcasing all widgets with **Simple API** and **element-level animations**.

## Quick Start

```bash
npm install react-native-metrify@beta
npm install react-native-svg react-native-reanimated
```

## Examples

### Main Examples
- `AllWidgetsDashboard.tsx` - ⭐ ALL widgets using **Simple API** (Recharts-like)
- `AllWidgetsDashboard.Legacy.tsx` - Same widgets using **Legacy API** (for reference)
- `DashboardExample.tsx` - Real-world dashboard example
- `KPIExample.tsx` - KPI widgets with trends (7 variations)
- `GaugeExample.tsx` - Circular gauges (6 variations)

### Documentation
- `../API_REFERENCE.md` - Complete API reference for all widgets (both APIs)

## What's New

### v0.1.0-beta.2 - Animation System Overhaul
**All 24 widgets now have element-level animations!**
- 📊 Bar Growth (7 widgets) - Bars grow from baseline
- ✏️ Path Drawing (8 widgets) - Lines/arcs draw with stroke animation
- ⭕ Scale/Pop (3 widgets) - Elements scale from center
- 🎬 Element Stagger (8 widgets) - Items appear one by one

All animations run at 60 FPS on UI thread. Set `animated={false}` to disable.

### v0.1.0-beta.1 - Simple API

**Simple API** - Recharts-like, data-driven approach:

```tsx
// Just pass your raw data and specify keys!
<LineChart
  data={[
    { month: 'Jan', sales: 100, expenses: 60 },
    { month: 'Feb', sales: 120, expenses: 70 },
  ]}
  xKey="month"
  dataKeys={['sales', 'expenses']}
  colors={['#007AFF', '#FF3B30']}
  showGrid
  showLegend
/>
```

**Both APIs work** - Legacy API is still fully supported.

## Quick Start

1. **Start with AllWidgetsDashboard.tsx** to see Simple API examples
2. **Check AllWidgetsDashboard.Legacy.tsx** for Legacy API comparison
3. **Read API_REFERENCE.md** for complete documentation
4. **Copy and adapt** examples to your needs

All examples are fully typed and tested!
