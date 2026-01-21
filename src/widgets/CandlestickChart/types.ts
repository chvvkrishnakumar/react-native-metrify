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

export interface CandlestickChartWidgetProps extends BaseWidgetProps<CandlestickChartData> {
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  candleWidth?: number;
  candleSpacing?: number;
  upColor?: string;
  downColor?: string;
  maxCandles?: number;
}
