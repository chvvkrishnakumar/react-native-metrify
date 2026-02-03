/**
 * Safe SVG Line primitive with NaN protection
 * CRITICAL: Prevents native crashes from invalid coordinate values
 */
import React, { memo } from 'react';
import { Line } from 'react-native-svg';
import { safeNumber } from '../../core/math';

export interface SafeLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  strokeDasharray?: string | number[];
  testID?: string;
}

/**
 * Memoized SVG Line with automatic NaN protection
 * Use this instead of raw Line to prevent crashes
 */
export const SafeLine = memo<SafeLineProps>(({
  x1,
  y1,
  x2,
  y2,
  stroke = '#000',
  strokeWidth = 1,
  opacity,
  strokeDasharray,
  testID,
}) => {
  // CRITICAL: Prevent NaN values from causing native crashes
  const safeX1 = safeNumber(x1, 0);
  const safeY1 = safeNumber(y1, 0);
  const safeX2 = safeNumber(x2, 0);
  const safeY2 = safeNumber(y2, 0);
  const safeStrokeWidth = safeNumber(strokeWidth, 1);
  const safeOpacity = opacity !== undefined ? safeNumber(opacity, 1) : undefined;
  
  return (
    <Line
      x1={safeX1}
      y1={safeY1}
      x2={safeX2}
      y2={safeY2}
      stroke={stroke}
      strokeWidth={safeStrokeWidth}
      opacity={safeOpacity}
      strokeDasharray={strokeDasharray}
      testID={testID}
    />
  );
});

SafeLine.displayName = 'SafeLine';
