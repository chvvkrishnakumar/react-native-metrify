/**
 * Complete Dashboard Example
 * Showcases multiple widgets together
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
                },
              ],
            }}
            width={340}
            height={200}
          />
        </View>

        {/* Bar Chart Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Sales</Text>
          <BarChart
            data={{
              data: [
                { value: 65, label: "Jan" },
                { value: 78, label: "Feb" },
                { value: 85, label: "Mar" },
                { value: 92, label: "Apr" },
                { value: 88, label: "May" },
                { value: 95, label: "Jun" },
              ],
            }}
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
                data={{
                  data: [15, 25, 18, 32, 28, 35, 42, 38, 45, 52, 48, 55],
                }}
                width={150}
                height={40}
              />
            </View>
            <View style={styles.sparklineItem}>
              <Text style={styles.sparklineLabel}>Sales</Text>
              <Sparkline
                data={{
                  data: [20, 18, 25, 22, 30, 28, 35, 32, 38, 42, 40, 45],
                }}
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
