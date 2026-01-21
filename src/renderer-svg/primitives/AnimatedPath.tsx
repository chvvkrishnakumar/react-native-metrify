/**
 * Animated SVG Path primitive
 */
import React, { memo } from 'react';
import Animated from 'react-native-reanimated';
import { Path } from 'react-native-svg';

const AnimatedSVGPath = Animated.createAnimatedComponent(Path);

export interface AnimatedPathProps {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  opacity?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  testID?: string;
}

/**
 * Memoized animated path component
 */
export const AnimatedPath = memo<AnimatedPathProps>(({
  d,
  stroke = 'transparent',
  strokeWidth = 1,
  fill = 'transparent',
  opacity = 1,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  testID,
}) => {
  return (
    <AnimatedSVGPath
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill={fill}
      opacity={opacity}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      testID={testID}
    />
  );
});

AnimatedPath.displayName = 'AnimatedPath';
