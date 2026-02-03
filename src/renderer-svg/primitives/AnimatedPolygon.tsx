/**
 * Animated SVG Polygon primitive
 */
import React, { memo } from 'react';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import { Polygon, PolygonProps } from 'react-native-svg';
import { safeNumber } from '../../core/math';

const AnimatedSVGPolygon = Animated.createAnimatedComponent(Polygon);

export interface AnimatedPolygonProps {
  points?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  opacity?: number;
  fillOpacity?: number;
  strokeDasharray?: string | number[];
  strokeDashoffset?: number;
  testID?: string;
  animatedProps?: Partial<AnimatedProps<PolygonProps>>;
}

export const AnimatedPolygon = memo<AnimatedPolygonProps>(({
  points,
  fill,
  stroke,
  strokeWidth,
  opacity,
  fillOpacity,
  strokeDasharray,
  strokeDashoffset,
  testID,
  animatedProps,
}) => {
  // CRITICAL: Prevent NaN values from causing native crashes
  const safeStrokeWidth = strokeWidth !== undefined ? safeNumber(strokeWidth, 1) : undefined;
  const safeOpacity = opacity !== undefined ? safeNumber(opacity, 1) : undefined;
  const safeFillOpacity = fillOpacity !== undefined ? safeNumber(fillOpacity, 1) : undefined;
  const safeStrokeDashoffset = strokeDashoffset !== undefined ? safeNumber(strokeDashoffset, 0) : undefined;
  
  return (
    <AnimatedSVGPolygon
      points={points}
      fill={fill}
      stroke={stroke}
      strokeWidth={safeStrokeWidth}
      opacity={safeOpacity}
      fillOpacity={safeFillOpacity}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={safeStrokeDashoffset}
      testID={testID}
      animatedProps={animatedProps}
    />
  );
});

AnimatedPolygon.displayName = 'AnimatedPolygon';
