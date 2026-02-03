/**
 * Animated SVG Path primitive
 * Supports true path drawing with strokeDasharray/strokeDashoffset
 */
import React, { memo } from 'react';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import { Path, PathProps } from 'react-native-svg';
import { safeNumber } from '../../core/math';

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
 * Memoized animated path component with NaN protection
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
  // CRITICAL: Prevent NaN values from causing native crashes
  const safeStrokeWidth = safeNumber(strokeWidth, 1);
  const safeOpacity = safeNumber(opacity, 1);
  const safeStrokeDashoffset = strokeDashoffset !== undefined ? safeNumber(strokeDashoffset, 0) : undefined;
  
  return (
    <AnimatedSVGPath
      d={d}
      stroke={stroke}
      strokeWidth={safeStrokeWidth}
      fill={fill}
      opacity={safeOpacity}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={safeStrokeDashoffset}
      testID={testID}
      animatedProps={animatedProps}
    />
  );
});

AnimatedPath.displayName = 'AnimatedPath';
