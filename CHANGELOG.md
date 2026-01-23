# Changelog

All notable changes to this project will be documented in this file.

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
