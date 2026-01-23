/**
 * KPI Widget Examples
 * Copy this into your React Native app
 */
import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { KPI, ThemeProvider } from 'react-native-metrify';

export default function KPIExample() {
  return (
    <ThemeProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>KPI Widget Examples</Text>

        {/* Basic KPI */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Basic KPI</Text>
          <KPI
            data={{
              value: 1234,
              label: 'Total Sales',
            }}
            width={300}
            height={100}
          />
        </View>

        {/* KPI with Trend */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>KPI with Positive Trend</Text>
          <KPI
            data={{
              value: 12450,
              label: 'Revenue',
              delta: 15.3,
              trend: 'up',
              format: 'currency',
            }}
            width={300}
            height={120}
          />
        </View>

        {/* KPI with Negative Trend */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>KPI with Negative Trend</Text>
          <KPI
            data={{
              value: 342,
              label: 'Active Issues',
              delta: -8.2,
              trend: 'down',
              format: 'number',
            }}
            width={300}
            height={120}
          />
        </View>

        {/* Percentage KPI */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Percentage KPI</Text>
          <KPI
            data={{
              value: 87.5,
              label: 'Success Rate',
              delta: 2.3,
              trend: 'up',
              format: 'percentage',
            }}
            width={300}
            height={120}
          />
        </View>

        {/* Small KPI (Responsive Fonts) */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Small KPI (Auto Font Scaling)</Text>
          <KPI
            data={{
              value: 456,
              label: 'Tasks',
              delta: 5.1,
              trend: 'up',
            }}
            width={150}
            height={80}
          />
        </View>

        {/* Large KPI (Responsive Fonts) */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Large KPI (Auto Font Scaling)</Text>
          <KPI
            data={{
              value: 98765,
              label: 'Total Users',
              delta: 23.4,
              trend: 'up',
              format: 'number',
            }}
            width={350}
            height={150}
          />
        </View>

        {/* Custom Font Sizes */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>KPI with Custom Fonts</Text>
          <KPI
            data={{
              value: 5432,
              label: 'Downloads',
              delta: 12.8,
              trend: 'up',
            }}
            width={300}
            height={120}
            fontSize={{
              labelSize: 16,
              valueSize: 42,
              secondarySize: 14,
              responsive: false,
            }}
          />
        </View>
      </ScrollView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#666',
  },
});
