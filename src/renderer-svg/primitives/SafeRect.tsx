/**
 * Safe SVG Rect primitive with NaN protection
 * CRITICAL: Prevents native crashes from invalid coordinate values
 */
import React, { memo } from 'react';
import { Rect } from 'react-native-svg';
import { safeNumber } from '../../core/math';

export interface SafeRectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  rx?: number;
  ry?: number;
  testID?: string;
}

/**
 * Memoized SVG Rect with automatic NaN protection
 * Use this instead of raw Rect to prevent crashes
 */
export const SafeRect = memo<SafeRectProps>(({
  x,
  y,
  width,
  height,
  fill,
  stroke,
  strokeWidth,
  opacity,
  rx,
  ry,
  testID,
}) => {
  // CRITICAL: Prevent NaN values from causing native crashes
  const safeX = safeNumber(x, 0);
  const safeY = safeNumber(y, 0);
  const safeWidth = safeNumber(width, 0);
  const safeHeight = safeNumber(height, 0);
  const safeStrokeWidth = strokeWidth !== undefined ? safeNumber(strokeWidth, 1) : undefined;
  const safeOpacity = opacity !== undefined ? safeNumber(opacity, 1) : undefined;
  const safeRx = rx !== undefined ? safeNumber(rx, 0) : undefined;
  const safeRy = ry !== undefined ? safeNumber(ry, 0) : undefined;
  
  // Don't render if width or height is invalid
  if (safeWidth <= 0 || safeHeight <= 0) {
    return null;
  }
  
  return (
    <Rect
      x={safeX}
      y={safeY}
      width={safeWidth}
      height={safeHeight}
      fill={fill}
      stroke={stroke}
      strokeWidth={safeStrokeWidth}
      opacity={safeOpacity}
      rx={safeRx}
      ry={safeRy}
      testID={testID}
    />
  );
});

SafeRect.displayName = 'SafeRect';
