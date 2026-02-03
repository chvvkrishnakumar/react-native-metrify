/**
 * Animated SVG Circle primitive
 */
import React, { memo } from 'react';
import Animated from 'react-native-reanimated';
import { Circle } from 'react-native-svg';
import { safeNumber } from '../../core/math';

const AnimatedSVGCircle = Animated.createAnimatedComponent(Circle);

export interface AnimatedCircleProps {
  cx: number;
  cy: number;
  r: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  testID?: string;
}

/**
 * Memoized animated circle component with NaN protection
 */
export const AnimatedCircle = memo<AnimatedCircleProps>(({
  cx,
  cy,
  r,
  fill = 'transparent',
  stroke = 'transparent',
  strokeWidth = 1,
  opacity = 1,
  testID,
}) => {
  // CRITICAL: Prevent NaN values from causing native crashes
  const safeCx = safeNumber(cx, 0);
  const safeCy = safeNumber(cy, 0);
  const safeR = safeNumber(r, 0);
  const safeStrokeWidth = safeNumber(strokeWidth, 1);
  const safeOpacity = safeNumber(opacity, 1);
  
  return (
    <AnimatedSVGCircle
      cx={safeCx}
      cy={safeCy}
      r={safeR}
      fill={fill}
      stroke={stroke}
      strokeWidth={safeStrokeWidth}
      opacity={safeOpacity}
      testID={testID}
    />
  );
});

AnimatedCircle.displayName = 'AnimatedCircle';
