/**
 * Animated SVG Path primitive
 * Supports true path drawing with strokeDasharray/strokeDashoffset
 */
import React, { memo } from 'react';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import { Path, PathProps } from 'react-native-svg';

const AnimatedSVGPath = Animated.createAnimatedComponent(Path);

export interface AnimatedPathProps {
  d?: string;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  opacity?: number;
  strokeLinecap?: 'butt' | 'round' | 'square';
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  strokeDasharray?: string | number[];
  strokeDashoffset?: number;
  testID?: string;
  animatedProps?: Partial<AnimatedProps<PathProps>>;
}

/**
 * Memoized animated path component
 * Supports both static props and animated props via reanimated
 * Now with strokeDasharray/strokeDashoffset for true path drawing
 */
export const AnimatedPath = memo<AnimatedPathProps>(({
  d,
  stroke = 'transparent',
  strokeWidth = 1,
  fill = 'transparent',
  opacity = 1,
  strokeLinecap = 'round',
  strokeLinejoin = 'round',
  strokeDasharray,
  strokeDashoffset,
  testID,
  animatedProps,
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
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
      testID={testID}
      animatedProps={animatedProps}
    />
  );
});

AnimatedPath.displayName = 'AnimatedPath';
