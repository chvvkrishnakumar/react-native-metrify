# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0-beta.5] - 2026-02-03

### 🚨 Critical Bug Fixes
- **CRITICAL**: Fixed React Hooks violations in 8 chart components that caused app crashes
  - Fixed BarChart - `useAnimatedProps` called inside `.map()` loop
  - Fixed GroupedBarChart - `useAnimatedProps` called inside nested `.map()` loops
  - Fixed HorizontalBarChart - `useAnimatedProps` called inside `.map()` loop
  - Fixed StackedBarChart - `useAnimatedProps` called inside nested `.map()` loops
  - Fixed FunnelChart - `useAnimatedProps` called inside `.map()` loop
  - Fixed CandlestickChart - 2 `useAnimatedProps` calls inside `.map()` loop
  - Fixed BoxPlot - 4 `useAnimatedProps` calls inside `.map()` loop (most complex!)
  - Fixed BubbleChart - `useAnimatedProps` called inside nested `.map()` loops
- **Solution**: Extracted animated rendering into separate memoized components (e.g., `AnimatedBar`, `AnimatedBox`, `AnimatedSegment`) so hooks are called at component top level

### 🎨 Layout & UX Improvements
- **PieChart**: Fixed chart size to be completely independent of legend
  - Chart size now controlled only by `size` prop (default: 200px)
  - Legend positioned on right side with vertical scrolling
  - Legend never affects pie dimensions regardless of item count
- **BarChart**: Added automatic horizontal scrolling for many data points
  - Smart scrolling activates when bars exceed container width
  - New configurable props: `minBarWidth` (default: 24px) and `maxBarWidth`
  - Intelligent value label hiding when bars are too narrow (< 32px)
  - X-axis labels now truncate with ellipsis instead of breaking layout

### 🔢 Data Formatting
- Standardized all numeric displays to **2 decimal places** across all charts:
  - BarChart, GroupedBarChart, HorizontalBarChart values
  - PieChart percentages and values
  - LineChart Y-axis labels
  - BoxPlot Y-axis labels  
  - BubbleChart Y-axis labels
  - FunnelChart percentages
  - KPI delta percentages

### 📝 What This Fixes
- App crashes with error: "React has detected a change in the order of Hooks called by BarChart"
- App crashes with error: "Should have a queue. You are likely calling Hooks conditionally"
- Long floating point numbers (e.g., 95.25848104896221) now display as clean values (e.g., 95.26)
- PieChart shrinking when legend has many items
- BarChart bars becoming unreadable when displaying many data points
- Value labels overlapping on narrow bars

### 🔧 API Additions
- **BarChart**: New `minBarWidth?: number` prop (default: 24px)
- **BarChart**: New `maxBarWidth?: number` prop for width constraints

### ✅ Stability Improvements
- **All 24 widgets** are now stable and production-ready after fixing hooks violations
- All bar-based charts (BarChart, GroupedBarChart, HorizontalBarChart, StackedBarChart) now render reliably with any data size
- Complex charts (BoxPlot, CandlestickChart, BubbleChart, FunnelChart) now handle animations properly

---

## [0.1.0-beta.4] - 2026-02-03

### 🚨 Critical Bug Fixes
- **CRITICAL**: Fixed native crashes caused by NaN (Not a Number) values in SVG rendering
- Added comprehensive `safeNumber` utility with NaN/Infinity protection across entire codebase
- Protected all SVG primitives (Circle, Path, Polygon, Text, Rect, Line) from invalid coordinate values
- Fixed path generators (rect, line, arc) to handle NaN values gracefully
- Added SafeRect and SafeLine wrapper components for additional protection

### 🔧 Technical Improvements
- All math utilities (clamp, normalize, interpolate, polarToCartesian) now have NaN protection
- All coordinate calculations validated before reaching native SVG layer
- Path string generators sanitize all numeric inputs
- Invalid dimensions (width/height <= 0) now skip rendering instead of crashing
- Zero-cost protection via worklet-compatible safeNumber function

### 📝 What This Fixes
- App crashes with error: "[CALayer setPosition:] attempted to set position to NaN"
- Crashes when rendering widgets with edge case data (empty, null, division by zero)
- Infinity values in calculations causing native layer failures
- All RNSVGRenderable crashes related to invalid frame/position values

---

## [0.1.0-beta.3] - 2026-02-03

### 🐛 Bug Fixes
- **Critical**: Fixed worklet error "[Worklets] Tried to synchronously call a non-worklet function 'formatNumber' on the UI thread"
- Made `formatNumber` function worklet-compatible by adding 'worklet' directive
- Replaced `Intl.NumberFormat` with worklet-compatible string manipulation (regex-based comma formatting)
- Made `getTrendColor` function worklet-compatible
- Fixed KPI and Gauge widgets crashing when using animations with React Native Reanimated

### 🔧 Technical Improvements
- All formatting functions now work on the UI thread in React Native Reanimated
- Simplified currency formatting to `$1,234,567` format (worklet-compatible)
- Number formatting now uses regex-based comma insertion for better performance

---

## [0.1.0-beta.2] - 2026-01-27

**🎨 Animation System Overhaul**

This release brings a complete animation upgrade to all 24 widgets, making them more dynamic and visually impressive.

### 🚀 New Features
- **All 24 widgets now have element-level animations** - No more basic fade in/out!
- **New AnimatedPolygon primitive** - Consistent with AnimatedPath and AnimatedCircle for stroke drawing effects
- **RadarChart drawing animation** - Polygon now draws like LineChart using strokeDasharray/strokeDashoffset
- **11 widgets upgraded** with dynamic animations:
  - **Histogram**: Bars grow from baseline with stagger
  - **StackedBarChart**: Stacked bars grow up with stagger
  - **WaterfallChart**: Bars grow up/down with stagger
  - **CandlestickChart**: Candles grow from center price
  - **FunnelChart**: Segments fade in with stagger
  - **Heatmap**: Cells appear one by one
  - **Treemap**: Rectangles fade in with stagger
  - **BoxPlot**: Boxes scale + whiskers extend
  - **SankeyDiagram**: Flow paths and nodes animate
  - **SunburstChart**: Arc segments sweep clockwise
  - **RadarChart**: Polygon draws with stroke animation

### 🎬 Animation Types by Widget
- **Bar Growth** (7 widgets): BarChart, GroupedBarChart, HorizontalBarChart, StackedBarChart, WaterfallChart, Histogram
- **Path/Stroke Drawing** (8 widgets): LineChart, AreaChart, Sparkline, MultiLineSparkline, Gauge, Progress, PieChart, RadarChart
- **Scale/Pop** (3 widgets): ScatterPlot, BubbleChart, RadarChart
- **Element Stagger** (8 widgets): FunnelChart, Heatmap, Treemap, CandlestickChart, BoxPlot, SankeyDiagram, SunburstChart, KPI

### 🐛 Bug Fixes
- Fixed animation count bugs in 9 widgets (was using hardcoded values like 10, 20, 50)
- Fixed RadarChart to use actual `dataPolygons.length` instead of hardcoded 10
- Fixed worklet closure issues in complex animations
- All widgets now properly calculate perimeter/length for stroke animations

### 🔧 Technical Improvements
- Moved `useStaggeredAnimation` calls to after data calculation
- All animations now use actual element counts dynamically
- Removed hardcoded animation counts that caused rendering issues
- Created reusable AnimatedPolygon primitive in renderer-svg
- Consistent animation architecture across all widget types

### ⚠️ Breaking Changes
- None! All changes are backwards compatible.

---

## [0.1.0-beta.1] - 2026-01-23

**🎉 Beta Release - Significant API Improvements**

This release includes major improvements and consolidations. Moving to beta indicates the API is stabilizing.

### 🚀 New Features
- **LineChart**: Added `filled` prop to create area charts (replaces AreaChart)
- **LineChart**: Added `showGradient` prop for beautiful gradient fills when `filled={true}`
- **ScatterPlot**: Added X-axis labels and grid lines for better data visualization
- **BubbleChart**: Added X-axis labels and grid lines for better data visualization

### 🐛 Bug Fixes
- **LineChart**: Fixed duplicate X-axis labels when using multiple `dataKeys`
- **ScatterPlot**: Now shows meaningful X-axis metrics instead of just dots
- **BubbleChart**: Better visual differentiation from ScatterPlot

### ⚠️ Deprecations
- **AreaChart**: Now deprecated in favor of `LineChart` with `filled={true}`
  - AreaChart still works (backward compatible) but is now just a wrapper around LineChart
  - Migration: Replace `<AreaChart ... />` with `<LineChart ... filled={true} />`

### 📚 Documentation
- Updated README.md with LineChart area chart examples
- Updated API_REFERENCE.md with new props and deprecation notices
- Updated SIMPLE_API_GUIDE.md with consolidated LineChart/AreaChart usage
- Added migration examples for AreaChart → LineChart

### 🔧 Technical Improvements
- Reduced code duplication (~200 lines) by consolidating AreaChart into LineChart
- Improved TypeScript types - AreaChart now uses LineChart types directly
- Better axis rendering with proper X-axis support across scatter-based charts

---

## [0.1.0-alpha.4] - 2026-01-22

### Fixed
- Corrected documentation examples to match actual API implementation
- Fixed KPI, Gauge, LineChart, BarChart, PieChart, AreaChart, Sparkline, and Progress widget examples
- All widget examples now correctly show `data={{}}` prop pattern instead of flat props
- Removed invalid `expo-template` reference from package.json scripts

## [0.1.0] - 2026-01-21

### Added
- Initial release
- 24+ chart types (KPI, Gauge, LineChart, BarChart, PieChart, etc.)
- SVG-based rendering with react-native-svg
- Theme support (light/dark themes)
- Smooth animations with react-native-reanimated
- TypeScript support with full type definitions
- Responsive font sizing
- Cross-platform support (iOS, Android, Web)
- Expo compatibility
