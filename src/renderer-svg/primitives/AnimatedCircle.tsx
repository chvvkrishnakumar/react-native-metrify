/**
 * Animated SVG Circle primitive
 */
import React, { memo } from 'react';
import Animated from 'react-native-reanimated';
import { Circle } from 'react-native-svg';

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
 * Memoized animated circle component
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
  return (
    <AnimatedSVGCircle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
      testID={testID}
    />
  );
});

AnimatedCircle.displayName = 'AnimatedCircle';
