/**
 * All Widgets Dashboard - Simple API Examples
 * 
 * This demonstrates the NEW Simple API (v0.1.0-beta.1+)
 * - Recharts-like data-driven approach
 * - Just pass raw data arrays and specify keys
 * - No manual data transformation needed
 * 
 * For Legacy API examples, see AllWidgetsDashboard.Legacy.tsx
 */
import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import {
  // Core Widgets
  KPI,
  Gauge,
  Progress,
  Sparkline,

  // Line & Area Charts
  LineChart,
  MultiLineSparkline,

  // Bar Charts
  BarChart,
  HorizontalBarChart,
  StackedBarChart,
  GroupedBarChart,
  WaterfallChart,

  // Circular Charts
  PieChart,
  RadarChart,

  // Scatter & Bubble
  ScatterPlot,
  BubbleChart,

  // Distribution
  Histogram,
  BoxPlot,

  // Specialized
  Heatmap,
  FunnelChart,
  CandlestickChart,
  SankeyDiagram,
  Treemap,
  SunburstChart,
} from "react-native-metrify";

// Sample data
const salesData = [
  { month: "Jan", sales: 4000, expenses: 2400, profit: 1600 },
  { month: "Feb", sales: 3000, expenses: 1398, profit: 1602 },
  { month: "Mar", sales: 2000, expenses: 9800, profit: -7800 },
  { month: "Apr", sales: 2780, expenses: 3908, profit: -1128 },
  { month: "May", sales: 1890, expenses: 4800, profit: -2910 },
  { month: "Jun", sales: 2390, expenses: 3800, profit: -1410 },
];

const productData = [
  { product: "Product A", sales: 350 },
  { product: "Product B", sales: 250 },
  { product: "Product C", sales: 400 },
  { product: "Product D", sales: 200 },
];

export default function AllWidgetsDashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Widgets - Simple API</Text>
        <Text style={styles.subtitle}>25 Widgets | v0.1.0-beta.1 | Recharts-like API</Text>
      </View>

      {/* Core Widgets */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Widgets</Text>

        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>1. KPI</Text>
            <Text style={styles.note}>Note: Uses Legacy API</Text>
            <KPI
              data={{
                value: 1234,
                label: "Total Revenue",
                delta: 15.3,
                trend: "up",
                format: "currency",
              }}
              width={160}
              height={100}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>2. KPI (Percent)</Text>
            <Text style={styles.note}>Note: Uses Legacy API</Text>
            <KPI
              data={{
                value: 87.5,
                label: "Completion",
                delta: -2.1,
                trend: "down",
                format: "percent",
              }}
              width={160}
              height={100}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>3. Gauge</Text>
          <Text style={styles.note}>Note: Uses Legacy API</Text>
          <View style={styles.centered}>
            <Gauge
              data={{
                value: 75,
                max: 100,
                label: "Performance",
                unit: "%",
              }}
              width={200}
              height={180}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>4. Progress</Text>
          <Text style={styles.note}>Note: Uses Legacy API</Text>
          <Progress
            data={{
              value: 65,
              max: 100,
              label: "Task Completion",
              showPercentage: true,
            }}
            width={340}
            height={40}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>5. Sparkline</Text>
          <Sparkline
            data={[
              { time: 0, value: 20 },
              { time: 1, value: 35 },
              { time: 2, value: 28 },
              { time: 3, value: 42 },
              { time: 4, value: 38 },
              { time: 5, value: 45 },
            ]}
            valueKey="value"
            width={340}
            height={60}
          />
        </View>
      </View>

      {/* Line & Area Charts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Line & Area Charts</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>6. LineChart - Multiple Series</Text>
          <LineChart
            data={salesData}
            xKey="month"
            dataKeys={["sales", "expenses"]}
            colors={["#007AFF", "#FF3B30"]}
            labels={["Sales", "Expenses"]}
            width={340}
            height={200}
            showGrid
            showLegend
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>7. LineChart - Area Chart (filled)</Text>
          <Text style={styles.description}>Use filled={true} to create area charts</Text>
          <LineChart
            data={salesData}
            xKey="month"
            dataKeys={["profit"]}
            colors={["#34C759"]}
            labels={["Profit"]}
            width={340}
            height={200}
            filled={true}
            showGradient
            showGrid
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>8. MultiLineSparkline</Text>
          <MultiLineSparkline
            data={[
              { time: 0, cpu: 20, memory: 30, disk: 15 },
              { time: 1, cpu: 35, memory: 45, disk: 25 },
              { time: 2, cpu: 28, memory: 38, disk: 20 },
              { time: 3, cpu: 42, memory: 52, disk: 30 },
              { time: 4, cpu: 38, memory: 48, disk: 28 },
            ]}
            dataKeys={["cpu", "memory", "disk"]}
            colors={["#007AFF", "#FF3B30", "#34C759"]}
            labels={["CPU", "Memory", "Disk"]}
            width={340}
            height={100}
          />
        </View>
      </View>

      {/* Bar Charts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bar Charts</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>9. BarChart</Text>
          <BarChart
            data={productData}
            xKey="product"
            dataKey="sales"
            colors={["#007AFF"]}
            width={340}
            height={200}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>10. HorizontalBarChart</Text>
          <HorizontalBarChart
            data={productData}
            labelKey="product"
            dataKey="sales"
            colors={["#34C759"]}
            width={340}
            height={200}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>11. GroupedBarChart</Text>
          <GroupedBarChart
            data={salesData.slice(0, 4)}
            categoryKey="month"
            dataKeys={["sales", "expenses"]}
            colors={["#007AFF", "#FF3B30"]}
            labels={["Sales", "Expenses"]}
            width={340}
            height={220}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>12. StackedBarChart</Text>
          <StackedBarChart
            data={salesData.slice(0, 4)}
            categoryKey="month"
            dataKeys={["sales", "expenses"]}
            colors={["#007AFF", "#FF3B30"]}
            labels={["Sales", "Expenses"]}
            width={340}
            height={220}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>13. WaterfallChart</Text>
          <WaterfallChart
            data={[
              { category: "Starting", value: 100 },
              { category: "Sales", value: 50 },
              { category: "Expenses", value: -30 },
              { category: "Profit", value: 20 },
            ]}
            labelKey="category"
            valueKey="value"
            colors={["#34C759", "#FF3B30"]}
            width={340}
            height={220}
          />
        </View>
      </View>

      {/* Circular Charts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Circular Charts</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>14. PieChart</Text>
          <PieChart
            data={productData}
            labelKey="product"
            valueKey="sales"
            colors={["#007AFF", "#FF3B30", "#34C759", "#FF9500"]}
            width={340}
            height={280}
            showLabels
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>15. RadarChart</Text>
          <RadarChart
            data={[
              { skill: "Speed", player1: 85, player2: 70 },
              { skill: "Strength", player1: 75, player2: 90 },
              { skill: "Stamina", player1: 80, player2: 75 },
              { skill: "Skill", player1: 90, player2: 85 },
            ]}
            categoryKey="skill"
            dataKeys={["player1", "player2"]}
            colors={["#007AFF", "#FF3B30"]}
            labels={["Player 1", "Player 2"]}
            width={300}
            height={300}
          />
        </View>
      </View>

      {/* Scatter & Bubble */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Scatter & Bubble Charts</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>16. ScatterPlot</Text>
          <ScatterPlot
            data={[
              { hours: 2, score: 65 },
              { hours: 4, score: 75 },
              { hours: 6, score: 85 },
              { hours: 8, score: 90 },
            ]}
            xKey="hours"
            yKey="score"
            colors={["#007AFF"]}
            width={340}
            height={250}
            showGrid
            showXAxis
            showYAxis
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>17. BubbleChart</Text>
          <BubbleChart
            data={[
              { x: 20, y: 30, size: 50 },
              { x: 40, y: 50, size: 80 },
              { x: 60, y: 40, size: 60 },
            ]}
            xKey="x"
            yKey="y"
            sizeKey="size"
            colors={["#007AFF"]}
            width={340}
            height={250}
            showGrid
            showXAxis
            showYAxis
          />
        </View>
      </View>

      {/* Distribution Charts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Distribution Charts</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>18. Histogram</Text>
          <Histogram
            data={[
              { score: 45 },
              { score: 67 },
              { score: 72 },
              { score: 85 },
              { score: 90 },
              { score: 78 },
              { score: 82 },
            ]}
            valueKey="score"
            bins={5}
            width={340}
            height={200}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>19. BoxPlot</Text>
          <BoxPlot
            data={[
              { group: "Group A", min: 12, q1: 15, median: 20, q3: 25, max: 30 },
              { group: "Group B", min: 8, q1: 12, median: 20, q3: 24, max: 28 },
              { group: "Group C", min: 10, q1: 18, median: 25, q3: 30, max: 35 },
            ]}
            labelKey="group"
            minKey="min"
            q1Key="q1"
            medianKey="median"
            q3Key="q3"
            maxKey="max"
            width={340}
            height={220}
          />
        </View>
      </View>

      {/* Specialized Charts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specialized Charts</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>20. Heatmap</Text>
          <Heatmap
            data={[
              { day: "Mon", hour: "8AM", value: 20 },
              { day: "Mon", hour: "12PM", value: 45 },
              { day: "Tue", hour: "8AM", value: 30 },
              { day: "Tue", hour: "12PM", value: 55 },
              { day: "Wed", hour: "8AM", value: 25 },
              { day: "Wed", hour: "12PM", value: 50 },
            ]}
            xKey="day"
            yKey="hour"
            valueKey="value"
            width={340}
            height={200}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>21. FunnelChart</Text>
          <FunnelChart
            data={[
              { stage: "Visitors", count: 10000 },
              { stage: "Sign ups", count: 5000 },
              { stage: "Trials", count: 2000 },
              { stage: "Customers", count: 500 },
            ]}
            labelKey="stage"
            valueKey="count"
            colors={["#007AFF", "#34C759", "#FF9500", "#FF3B30"]}
            width={340}
            height={280}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>22. CandlestickChart</Text>
          <CandlestickChart
            data={[
              { date: "Jan 1", open: 100, high: 110, low: 95, close: 105 },
              { date: "Jan 2", open: 105, high: 115, low: 100, close: 110 },
              { date: "Jan 3", open: 110, high: 120, low: 108, close: 115 },
              { date: "Jan 4", open: 115, high: 118, low: 105, close: 108 },
              { date: "Jan 5", open: 108, high: 125, low: 106, close: 122 },
            ]}
            dateKey="date"
            openKey="open"
            highKey="high"
            lowKey="low"
            closeKey="close"
            width={340}
            height={250}
          />
        </View>
      </View>

      {/* Advanced Hierarchical Charts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Hierarchical Charts</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>23. SankeyDiagram</Text>
          <SankeyDiagram
            data={[
              { from: "Source", to: "Middle", amount: 100 },
              { from: "Middle", to: "Target A", amount: 60 },
              { from: "Middle", to: "Target B", amount: 40 },
            ]}
            sourceKey="from"
            targetKey="to"
            valueKey="amount"
            width={340}
            height={250}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>24. Treemap</Text>
          <Treemap
            data={[
              { category: "Category A", value: 100 },
              { category: "Category B", value: 80 },
              { category: "Category C", value: 60 },
              { category: "Category D", value: 40 },
            ]}
            labelKey="category"
            valueKey="value"
            colors={["#007AFF", "#34C759", "#FF3B30", "#FF9500"]}
            width={340}
            height={250}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>25. SunburstChart</Text>
          <SunburstChart
            data={[
              { category: "Category A", value: 100 },
              { category: "Category B", value: 80 },
              { category: "Category C", value: 60 },
              { category: "Category D", value: 40 },
            ]}
            labelKey="category"
            valueKey="value"
            colors={["#007AFF", "#34C759", "#FF3B30", "#FF9500"]}
            width={340}
            height={340}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ✨ Simple API - Recharts-like, data-driven approach
        </Text>
        <Text style={styles.footerText}>
          📚 Legacy API examples: AllWidgetsDashboard.Legacy.tsx
        </Text>
        <Text style={styles.footerText}>
          📖 Complete API docs: examples/API_REFERENCE.md
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#007AFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    padding: 15,
    backgroundColor: "white",
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    fontStyle: "italic",
  },
  note: {
    fontSize: 12,
    color: "#FF9500",
    marginBottom: 8,
    fontStyle: "italic",
  },
  centered: {
    alignItems: "center",
  },
  footer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
});
