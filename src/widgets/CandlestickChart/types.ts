/**
 * CandlestickChart Widget types
 */
import { BaseWidgetProps, TimeInterval } from '../../core';

export interface CandlestickDataPoint {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CandlestickChartData {
  data: CandlestickDataPoint[];
  title?: string;
  timeInterval?: TimeInterval;
}

// Simple API
export interface CandlestickChartSimpleProps {
  /** Array of data objects */
  data: Record<string, any>[];
  /** Key for date values */
  dateKey: string;
  /** Key for open values */
  openKey: string;
  /** Key for high values */
  highKey: string;
  /** Key for low values */
  lowKey: string;
  /** Key for close values */
  closeKey: string;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  testID?: string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  candleWidth?: number;
  candleSpacing?: number;
  upColor?: string;
  downColor?: string;
  maxCandles?: number;
}

// Legacy API
export interface CandlestickChartLegacyProps {
  data: CandlestickChartData;
  dateKey?: never;
  openKey?: never;
  width?: number;
  height?: number;
  loading?: boolean;
  theme?: any;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  candleWidth?: number;
  candleSpacing?: number;
  upColor?: string;
  downColor?: string;
  maxCandles?: number;
  testID?: string;
}

export type CandlestickChartWidgetProps = CandlestickChartSimpleProps | CandlestickChartLegacyProps;
