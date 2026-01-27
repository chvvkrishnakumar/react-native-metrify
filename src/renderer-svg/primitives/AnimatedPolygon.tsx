/**
 * Animated SVG Polygon primitive
 */
import React, { memo } from 'react';
import Animated, { AnimatedProps } from 'react-native-reanimated';
import { Polygon, PolygonProps } from 'react-native-svg';

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
  return (
    <AnimatedSVGPolygon
      points={points}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
      fillOpacity={fillOpacity}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={strokeDashoffset}
      testID={testID}
      animatedProps={animatedProps}
    />
  );
});

AnimatedPolygon.displayName = 'AnimatedPolygon';
