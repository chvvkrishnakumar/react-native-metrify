/**
 * Animation helpers for widgets (Web version - no reanimated)
 * Uses basic React state for web compatibility
 */
import { useEffect } from 'react';
import { AnimationConfig } from '../types';

// Type for shared value (web compatible)
export type SharedValue<T> = { value: T };

// Web-compatible stubs for reanimated functions
export const useSharedValue = <T,>(initialValue: T): SharedValue<T> => {
  return { value: initialValue };
};

export const withTiming = (value: number, config?: any) => {
  return value;
};

export const withSpring = (value: number, config?: any) => {
  return value;
};

export const withDelay = (delay: number, animation: any) => {
  return animation;
};

export const withSequence = (...animations: any[]) => {
  return animations[animations.length - 1];
};

export const withRepeat = (animation: any, numberOfReps?: number, reverse?: boolean) => {
  return animation;
};

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
  easing: Easing.linear,
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
 * Hook to animate value changes (web version)
 */
export function useAnimatedValue(
  target: number,
  config: AnimationConfig = {}
): SharedValue<number> {
  // On web, just return the value directly
  // Full animation support requires additional setup
  return useSharedValue(target);
}

/**
 * Hook that creates an animated progress value (0 to normalized)
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
 */
export function useSpringValue(target: number): SharedValue<number> {
  return useSharedValue(target);
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

