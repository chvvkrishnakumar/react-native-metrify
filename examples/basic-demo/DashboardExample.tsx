/**
 * Complete Dashboard Example - Simple API
 * 
 * Showcases multiple widgets together using the Simple API
 * (Recharts-like, data-driven approach)
 * 
 * For Legacy API examples, see AllWidgetsDashboard.Legacy.tsx
 */
import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import {
  KPI,
  Gauge,
  LineChart,
  BarChart,
  Progress,
  Sparkline,
  ThemeProvider,
} from "react-native-metrify";

export default function DashboardExample() {
  return (
    <ThemeProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Dashboard Overview</Text>

        {/* KPI Row */}
        <View style={styles.kpiRow}>
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
                value: 342,
                label: "Active Users",
                delta: 8.2,
                trend: "up",
                format: "number",
              }}
              width={160}
              height={100}
            />
          </View>
        </View>

        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <KPI
              data={{
                value: 87.5,
                label: "Success Rate",
                delta: 2.3,
                trend: "up",
                format: "percent",
              }}
              width={160}
              height={100}
            />
          </View>
          <View style={styles.kpiCard}>
            <KPI
              data={{
                value: 23,
                label: "Issues",
                delta: -5.1,
                trend: "down",
                format: "number",
              }}
              width={160}
              height={100}
            />
          </View>
        </View>

        {/* Gauge Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Performance</Text>
          <View style={styles.gaugeContainer}>
            <Gauge
              data={{
                value: 75,
                max: 100,
                label: "Overall Score",
                unit: "%",
              }}
              width={200}
              height={180}
              startAngle={-120}
              endAngle={120}
            />
          </View>
        </View>

        {/* Line Chart Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Activity</Text>
          <LineChart
            data={[
              { day: "Mon", activity: 45 },
              { day: "Tue", activity: 62 },
              { day: "Wed", activity: 58 },
              { day: "Thu", activity: 78 },
              { day: "Fri", activity: 72 },
              { day: "Sat", activity: 85 },
              { day: "Sun", activity: 92 },
            ]}
            xKey="day"
            dataKeys={["activity"]}
            colors={["#007AFF"]}
            width={340}
            height={200}
            showGrid
          />
        </View>

        {/* Bar Chart Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Sales</Text>
          <BarChart
            data={[
              { month: "Jan", sales: 65 },
              { month: "Feb", sales: 78 },
              { month: "Mar", sales: 85 },
              { month: "Apr", sales: 92 },
              { month: "May", sales: 88 },
              { month: "Jun", sales: 95 },
            ]}
            xKey="month"
            dataKey="sales"
            colors={["#007AFF"]}
            width={340}
            height={200}
          />
        </View>

        {/* Progress Bars */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Task Progress</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Design</Text>
              <Progress
                data={{
                  value: 85,
                  max: 100,
                }}
                width={280}
                height={12}
              />
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Development</Text>
              <Progress
                data={{
                  value: 65,
                  max: 100,
                }}
                width={280}
                height={12}
              />
            </View>
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>Testing</Text>
              <Progress
                data={{
                  value: 40,
                  max: 100,
                }}
                width={280}
                height={12}
              />
            </View>
          </View>
        </View>

        {/* Sparklines */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Trends</Text>
          <View style={styles.sparklineContainer}>
            <View style={styles.sparklineItem}>
              <Text style={styles.sparklineLabel}>Visitors</Text>
              <Sparkline
                data={[
                  { t: 0, value: 15 },
                  { t: 1, value: 25 },
                  { t: 2, value: 18 },
                  { t: 3, value: 32 },
                  { t: 4, value: 28 },
                  { t: 5, value: 35 },
                  { t: 6, value: 42 },
                  { t: 7, value: 38 },
                  { t: 8, value: 45 },
                  { t: 9, value: 52 },
                  { t: 10, value: 48 },
                  { t: 11, value: 55 },
                ]}
                valueKey="value"
                width={150}
                height={40}
              />
            </View>
            <View style={styles.sparklineItem}>
              <Text style={styles.sparklineLabel}>Sales</Text>
              <Sparkline
                data={[
                  { t: 0, value: 20 },
                  { t: 1, value: 18 },
                  { t: 2, value: 25 },
                  { t: 3, value: 22 },
                  { t: 4, value: 30 },
                  { t: 5, value: 28 },
                  { t: 6, value: 35 },
                  { t: 7, value: 32 },
                  { t: 8, value: 38 },
                  { t: 9, value: 42 },
                  { t: 10, value: 40 },
                  { t: 11, value: 45 },
                ]}
                valueKey="value"
                width={150}
                height={40}
              />
            </View>
          </View>
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
  header: {
    fontSize: 32,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 10,
    color: "#333",
  },
  kpiRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 10,
  },
  kpiCard: {
    flex: 1,
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
  gaugeContainer: {
    alignItems: "center",
  },
  progressContainer: {
    gap: 15,
  },
  progressItem: {
    gap: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  sparklineContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sparklineItem: {
    alignItems: "center",
    gap: 8,
  },
  sparklineLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});
