/**
 * Complete Dashboard - All 24 Widgets
 * All widgets with correct TypeScript types
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
  Histogram,
  WaterfallChart,

  // Distribution
  PieChart,
  FunnelChart,
  BoxPlot,

  // Scientific
  ScatterPlot,
  BubbleChart,
  Heatmap,
  RadarChart,
  CandlestickChart,

  // Hierarchical
  Treemap,
  SunburstChart,
  SankeyDiagram,
  ThemeProvider,
} from "react-native-metrify";

export default function AllWidgetsDashboard() {
  return (
    <ThemeProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.mainHeader}>All 24 Widgets Showcase</Text>

        {/* ========== CORE WIDGETS (4) ========== */}
        <Text style={styles.sectionHeader}>Core Widgets</Text>

        {/* 1-2. KPI */}
        <View style={styles.kpiGrid}>
          <View style={styles.kpiCard}>
            <KPI
              data={{
                value: 12450,
                label: "Revenue",
                delta: 15.3,
                trend: "up",
                format: "currency",
              }}
              width={160}
              height={100}
            />
          </View>
          <View style={styles.kpiCard}>
            <KPI
              data={{
                value: 87.5,
                label: "Success",
                delta: 2.3,
                trend: "up",
                format: "percent",
              }}
              width={160}
              height={100}
            />
          </View>
        </View>

        {/* 3. Gauge */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>3. Gauge</Text>
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
              startAngle={-120}
              endAngle={120}
            />
          </View>
        </View>

        {/* 4. Progress */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>4. Progress</Text>
          <Progress
            data={{
              value: 65,
              max: 100,
              label: "Tasks Complete",
            }}
            width={320}
            height={30}
          />
        </View>

        {/* 5. Sparkline */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>5. Sparkline</Text>
          <View style={styles.centered}>
            <Sparkline
              data={{
                data: [15, 25, 18, 32, 28, 35, 42, 38, 45, 52, 48, 55],
                label: "Trend",
              }}
              width={300}
              height={60}
            />
          </View>
        </View>

        {/* ========== LINE & AREA CHARTS (3) ========== */}
        <Text style={styles.sectionHeader}>Line & Area Charts</Text>

        {/* 6. LineChart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>6. LineChart</Text>
          <LineChart
            data={{
              series: [
                {
                  data: [
                    { x: 0, y: 45 },
                    { x: 1, y: 62 },
                    { x: 2, y: 58 },
                    { x: 3, y: 78 },
                    { x: 4, y: 72 },
                    { x: 5, y: 85 },
                    { x: 6, y: 92 },
                  ],
                  color: "#007AFF",
                  label: "Sales",
                },
              ],
            }}
            width={340}
            height={200}
          />
        </View>

        {/* 7. LineChart - Area Chart (filled) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>7. LineChart - Area Chart</Text>
          <Text style={styles.description}>Use filled={true} to create area charts</Text>
          <LineChart
            data={{
              series: [
                {
                  data: [
                    { x: 0, y: 30 },
                    { x: 1, y: 45 },
                    { x: 2, y: 42 },
                    { x: 3, y: 58 },
                    { x: 4, y: 65 },
                    { x: 5, y: 72 },
                  ],
                  color: "#34C759",
                  label: "Revenue",
                },
              ],
            }}
            width={340}
            height={200}
            filled={true}
            showGradient
          />
        </View>

        {/* 8. MultiLineSparkline */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>8. MultiLineSparkline</Text>
          <MultiLineSparkline
            data={{
              series: [
                {
                  data: [10, 15, 12, 18, 16, 20, 22],
                  color: "#007AFF",
                  label: "Series 1",
                },
                {
                  data: [8, 12, 10, 15, 13, 17, 19],
                  color: "#34C759",
                  label: "Series 2",
                },
              ],
            }}
            width={340}
            height={100}
          />
        </View>

        {/* ========== BAR CHARTS (6) ========== */}
        <Text style={styles.sectionHeader}>Bar Charts</Text>

        {/* 9. BarChart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>9. BarChart</Text>
          <BarChart
            data={{
              data: [
                { value: 65, label: "Jan" },
                { value: 78, label: "Feb" },
                { value: 85, label: "Mar" },
                { value: 92, label: "Apr" },
                { value: 88, label: "May" },
              ],
            }}
            width={340}
            height={200}
          />
        </View>

        {/* 10. HorizontalBarChart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>10. HorizontalBarChart</Text>
          <HorizontalBarChart
            data={{
              data: [
                { value: 85, label: "Product A" },
                { value: 72, label: "Product B" },
                { value: 68, label: "Product C" },
                { value: 55, label: "Product D" },
              ],
            }}
            width={340}
            height={200}
          />
        </View>

        {/* 11. StackedBarChart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>11. StackedBarChart</Text>
          <StackedBarChart
            data={{
              data: [
                {
                  label: "Q1",
                  segments: [
                    { value: 30, color: "#007AFF", label: "A" },
                    { value: 25, color: "#34C759", label: "B" },
                    { value: 20, color: "#FF9500", label: "C" },
                  ],
                },
                {
                  label: "Q2",
                  segments: [
                    { value: 35, color: "#007AFF", label: "A" },
                    { value: 28, color: "#34C759", label: "B" },
                    { value: 22, color: "#FF9500", label: "C" },
                  ],
                },
              ],
            }}
            width={340}
            height={200}
          />
        </View>

        {/* 12. GroupedBarChart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>12. GroupedBarChart</Text>
          <GroupedBarChart
            data={{
              data: [
                {
                  groupLabel: "Q1",
                  values: [
                    { value: 65, color: "#007AFF", label: "Team A" },
                    { value: 58, color: "#34C759", label: "Team B" },
                  ],
                },
                {
                  groupLabel: "Q2",
                  values: [
                    { value: 72, color: "#007AFF", label: "Team A" },
                    { value: 65, color: "#34C759", label: "Team B" },
                  ],
                },
              ],
            }}
            width={340}
            height={200}
          />
        </View>

        {/* 13. Histogram */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>13. Histogram</Text>
          <Histogram
            data={{
              data: [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 6, 7],
              binCount: 7,
            }}
            width={340}
            height={200}
          />
        </View>

        {/* 14. WaterfallChart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>14. WaterfallChart</Text>
          <WaterfallChart
            data={{
              data: [
                { value: 100, label: "Start", isTotal: true },
                { value: 20, label: "Revenue" },
                { value: -15, label: "Costs" },
                { value: 10, label: "Profit" },
                { value: 115, label: "End", isTotal: true },
              ],
            }}
            width={340}
            height={200}
          />
        </View>

        {/* ========== DISTRIBUTION (3) ========== */}
        <Text style={styles.sectionHeader}>Distribution Charts</Text>

        {/* 15. PieChart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>15. PieChart</Text>
          <View style={styles.centered}>
            <PieChart
              data={{
                segments: [
                  { value: 35, label: "Product A", color: "#007AFF" },
                  { value: 25, label: "Product B", color: "#34C759" },
                  { value: 20, label: "Product C", color: "#FF9500" },
                  { value: 20, label: "Product D", color: "#FF3B30" },
                ],
              }}
              width={300}
              height={300}
            />
          </View>
        </View>

        {/* 16. FunnelChart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>16. FunnelChart</Text>
          <FunnelChart
            data={{
              stages: [
                { value: 1000, label: "Visitors" },
                { value: 500, label: "Leads" },
                { value: 200, label: "Prospects" },
                { value: 100, label: "Customers" },
              ],
            }}
            width={340}
            height={300}
          />
        </View>

        {/* 17. BoxPlot */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>17. BoxPlot</Text>
          <BoxPlot
            data={{
              data: [
                {
                  label: "Team A",
                  min: 45,
                  q1: 60,
                  median: 75,
                  q3: 85,
                  max: 95,
                },
                {
                  label: "Team B",
                  min: 50,
                  q1: 65,
                  median: 72,
                  q3: 80,
                  max: 90,
                },
              ],
            }}
            width={340}
            height={200}
          />
        </View>

        {/* ========== SCIENTIFIC (5) ========== */}
        <Text style={styles.sectionHeader}>Scientific Charts</Text>

        {/* 18. ScatterPlot */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>18. ScatterPlot</Text>
          <ScatterPlot
            data={{
              series: [
                {
                  data: [
                    { x: 10, y: 20, label: "A" },
                    { x: 25, y: 35, label: "B" },
                    { x: 40, y: 30, label: "C" },
                    { x: 55, y: 45, label: "D" },
                    { x: 70, y: 60, label: "E" },
                  ],
                  color: "#007AFF",
                  label: "Series 1",
                },
              ],
            }}
            width={340}
            height={200}
          />
        </View>

        {/* 19. BubbleChart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>19. BubbleChart</Text>
          <BubbleChart
            data={{
              series: [
                {
                  data: [
                    { x: 30, y: 40, size: 20, label: "A" },
                    { x: 50, y: 60, size: 35, label: "B" },
                    { x: 70, y: 50, size: 25, label: "C" },
                    { x: 40, y: 70, size: 30, label: "D" },
                  ],
                  color: "#007AFF",
                  label: "Series 1",
                },
              ],
            }}
            width={340}
            height={200}
          />
        </View>

        {/* 20. Heatmap */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>20. Heatmap</Text>
          <Heatmap
            data={{
              data: [
                { x: 0, y: 0, value: 10 },
                { x: 1, y: 0, value: 20 },
                { x: 2, y: 0, value: 15 },
                { x: 0, y: 1, value: 25 },
                { x: 1, y: 1, value: 30 },
                { x: 2, y: 1, value: 22 },
                { x: 0, y: 2, value: 18 },
                { x: 1, y: 2, value: 28 },
                { x: 2, y: 2, value: 35 },
              ],
              xLabels: ["Mon", "Tue", "Wed"],
              yLabels: ["AM", "Noon", "PM"],
            }}
            width={340}
            height={200}
          />
        </View>

        {/* 21. RadarChart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>21. RadarChart</Text>
          <View style={styles.centered}>
            <RadarChart
              data={{
                series: [
                  {
                    data: [
                      { axis: "Speed", value: 80 },
                      { axis: "Power", value: 70 },
                      { axis: "Agility", value: 90 },
                      { axis: "Defense", value: 65 },
                      { axis: "Stamina", value: 75 },
                    ],
                    color: "#007AFF",
                    label: "Stats",
                  },
                ],
              }}
              width={300}
              height={300}
            />
          </View>
        </View>

        {/* 22. CandlestickChart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>22. CandlestickChart</Text>
          <CandlestickChart
            data={{
              data: [
                {
                  date: new Date("2024-01-01"),
                  open: 100,
                  high: 110,
                  low: 95,
                  close: 105,
                },
                {
                  date: new Date("2024-01-02"),
                  open: 105,
                  high: 115,
                  low: 100,
                  close: 108,
                },
                {
                  date: new Date("2024-01-03"),
                  open: 108,
                  high: 120,
                  low: 105,
                  close: 115,
                },
                {
                  date: new Date("2024-01-04"),
                  open: 115,
                  high: 118,
                  low: 110,
                  close: 112,
                },
                {
                  date: new Date("2024-01-05"),
                  open: 112,
                  high: 125,
                  low: 110,
                  close: 120,
                },
              ],
            }}
            width={340}
            height={200}
          />
        </View>

        {/* ========== HIERARCHICAL (3) ========== */}
        <Text style={styles.sectionHeader}>Hierarchical Charts</Text>

        {/* 23. Treemap */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>23. Treemap</Text>
          <Treemap
            data={{
              data: [
                { label: "Category A", value: 40, color: "#007AFF" },
                { label: "Category B", value: 30, color: "#34C759" },
                { label: "Category C", value: 20, color: "#FF9500" },
                { label: "Category D", value: 10, color: "#FF3B30" },
              ],
            }}
            width={340}
            height={250}
          />
        </View>

        {/* 24. SunburstChart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>24. SunburstChart</Text>
          <View style={styles.centered}>
            <SunburstChart
              data={{
                data: [
                  { label: "A", value: 40 },
                  { label: "B", value: 30 },
                  { label: "C", value: 30 },
                ],
              }}
              width={300}
              height={300}
            />
          </View>
        </View>

        {/* 25. SankeyDiagram */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>25. SankeyDiagram</Text>
          <SankeyDiagram
            data={{
              nodes: [
                { id: "A", label: "Source A" },
                { id: "B", label: "Source B" },
                { id: "C", label: "Target C" },
                { id: "D", label: "Target D" },
              ],
              links: [
                { source: "A", target: "C", value: 60 },
                { source: "A", target: "D", value: 40 },
                { source: "B", target: "C", value: 30 },
                { source: "B", target: "D", value: 70 },
              ],
            }}
            width={340}
            height={300}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ✨ All 24 widgets from react-native-metrify
          </Text>
        </View>
      </ScrollView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  mainHeader: {
    fontSize: 32,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 10,
    color: "#333",
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "600",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    color: "#007AFF",
  },
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 10,
  },
  kpiCard: {
    flex: 1,
    minWidth: 160,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    fontStyle: "italic",
  },
  centered: {
    alignItems: "center",
  },
  footer: {
    padding: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
});
