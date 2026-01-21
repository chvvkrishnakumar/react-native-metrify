/**
 * Animation helpers - Simple version without reanimated
 * For full animation support, use react-native-reanimated separately
 */
import { useEffect } from 'react';
import { AnimationConfig } from '../types';

// Type for shared value (compatible with reanimated)
export type SharedValue<T = number> = { value: T };

// Simple implementations (no animations, just values)
export const useSharedValue = <T = number>(initialValue: T): SharedValue<T> => {
  return { value: initialValue };
};

export const withTiming = (value: any, config?: any) => value;
export const withSpring = (value: any, config?: any) => value;

export const Easing = {
  linear: (t: number) => t,
  ease: (t: number) => t,
  quad: (t: number) => t * t,
  cubic: (t: number) => t * t * t,
  bezier: (x1: number, y1: number, x2: number, y2: number) => (t: number) => t,
  in: (easing: (t: number) => number) => easing,
  out: (easing: (t: number) => number) => (t: number) => 1 - easing(1 - t),
  inOut: (easing: (t: number) => number) => (t: number) =>
    t < 0.5 ? easing(t * 2) / 2 : 1 - easing((1 - t) * 2) / 2,
};

/**
 * Default timing configuration
 */
export const DEFAULT_TIMING_CONFIG = {
  duration: 300,
  easing: Easing.out(Easing.cubic),
};

/**
 * Default spring configuration
 */
export const DEFAULT_SPRING_CONFIG = {
  damping: 15,
  stiffness: 150,
  mass: 1,
};

/**
 * Hook that creates an animated value that transitions to a target
 * @param target - Target value to animate to
 * @param config - Animation configuration
 */
export function useAnimatedValue(
  target: number,
  config: AnimationConfig = {}
): SharedValue<number> {
  const animatedValue = useSharedValue(target);
  
  useEffect(() => {
    animatedValue.value = withTiming(target, {
      duration: config.duration ?? DEFAULT_TIMING_CONFIG.duration,
      easing: DEFAULT_TIMING_CONFIG.easing,
    });
  }, [target, config.duration, animatedValue]);
  
  return animatedValue;
}

/**
 * Hook that creates an animated progress value (0 to normalized)
 * @param value - Current value
 * @param max - Maximum value
 * @param config - Animation configuration
 */
export function useAnimatedProgress(
  value: number,
  max: number,
  config: AnimationConfig = {}
): SharedValue<number> {
  const normalized = max > 0 ? Math.min(value / max, 1) : 0;
  return useAnimatedValue(normalized, config);
}

/**
 * Hook that creates a spring-animated value
 * @param target - Target value to animate to
 */
export function useSpringValue(target: number): SharedValue<number> {
  const animatedValue = useSharedValue(target);
  
  useEffect(() => {
    animatedValue.value = withSpring(target, DEFAULT_SPRING_CONFIG);
  }, [target, animatedValue]);
  
  return animatedValue;
}

/**
 * Creates timing config for manual animations
 */
export function useTimingConfig(config: AnimationConfig = {}) {
  return {
    duration: config.duration ?? DEFAULT_TIMING_CONFIG.duration,
    easing: DEFAULT_TIMING_CONFIG.easing,
  };
}

/**
 * Creates spring config for manual animations
 */
export function useSpringConfig() {
  return DEFAULT_SPRING_CONFIG;
}
