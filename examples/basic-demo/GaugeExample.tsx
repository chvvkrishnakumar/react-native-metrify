/**
 * Gauge Widget Examples
 * Copy this into your React Native app
 */
import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Gauge, ThemeProvider } from 'react-native-metrify';

export default function GaugeExample() {
  return (
    <ThemeProvider>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Gauge Widget Examples</Text>

        {/* Semi-Circle Gauge */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Semi-Circle Gauge</Text>
          <Gauge
            data={{
              value: 75,
              max: 100,
              label: 'Progress',
              unit: '%',
            }}
            width={250}
            height={200}
            startAngle={-120}
            endAngle={120}
          />
        </View>

        {/* Full Circle Gauge */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Full Circle Gauge</Text>
          <Gauge
            data={{
              value: 68,
              max: 100,
              label: 'Performance Score',
              unit: '%',
            }}
            width={250}
            height={250}
            startAngle={0}
            endAngle={360}
          />
        </View>

        {/* Small Gauge */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Small Gauge (Responsive)</Text>
          <Gauge
            data={{
              value: 85,
              max: 100,
              label: 'CPU',
              unit: '%',
            }}
            width={150}
            height={150}
            startAngle={-120}
            endAngle={120}
          />
        </View>

        {/* Large Gauge */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Large Gauge (Responsive)</Text>
          <Gauge
            data={{
              value: 92,
              max: 100,
              label: 'Customer Satisfaction',
              unit: '%',
            }}
            width={350}
            height={300}
            startAngle={-120}
            endAngle={120}
          />
        </View>

        {/* Custom Range Gauge */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Custom Range (0-200)</Text>
          <Gauge
            data={{
              value: 142,
              min: 0,
              max: 200,
              label: 'Speed',
              unit: 'km/h',
            }}
            width={250}
            height={200}
            startAngle={-120}
            endAngle={120}
          />
        </View>

        {/* Gauge with Custom Fonts */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>Custom Font Sizes</Text>
          <Gauge
            data={{
              value: 63,
              max: 100,
              label: 'Battery',
              unit: '%',
            }}
            width={250}
            height={200}
            startAngle={-120}
            endAngle={120}
            fontSize={{
              valueSize: 36,
              labelSize: 16,
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
    alignItems: 'center',
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
    alignSelf: 'flex-start',
  },
});
