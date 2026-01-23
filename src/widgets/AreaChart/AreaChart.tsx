/**
 * AreaChart Widget - Wrapper around LineChart with filled=true
 * @deprecated Use LineChart with filled={true} instead
 */
import React, { memo } from 'react';
import { LineChart } from '../LineChart';
import { AreaChartWidgetProps } from './types';

/**
 * AreaChart is now a simple wrapper around LineChart with filled={true}
 * This is maintained for backwards compatibility.
 * 
 * @example
 * // Old way (still works):
 * <AreaChart data={data} xKey="x" dataKeys={['y']} />
 * 
 * // New recommended way:
 * <LineChart data={data} xKey="x" dataKeys={['y']} filled={true} />
 */
export const AreaChart = memo<AreaChartWidgetProps>((props) => {
  // Simply pass all props to LineChart with filled={true}
  return <LineChart {...props} filled={true} />;
});

AreaChart.displayName = 'AreaChart';
