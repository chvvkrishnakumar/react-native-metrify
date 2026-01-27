/**
 * Chart animation hooks using react-native-reanimated
 */
import { useEffect } from 'react';
import { useSharedValue, withTiming, withSpring, Easing, WithTimingConfig } from 'react-native-reanimated';

export interface UseChartAnimationOptions {
  enabled?: boolean;
  duration?: number;
  delay?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'spring';
}

const DEFAULT_DURATION = 500;
const DEFAULT_DELAY = 0;

/**
 * Get easing function based on type
 * Using Recharts-style easing curves
 */
function getEasing(type: UseChartAnimationOptions['easing']) {
  switch (type) {
    case 'linear':
      return Easing.linear;
    case 'ease-in':
      return Easing.in(Easing.cubic);
    case 'ease-out':
      return Easing.out(Easing.cubic);
    case 'spring':
      return Easing.elastic(1.2); // Bouncy spring
    case 'ease-in-out':
    default:
      return Easing.bezier(0.4, 0, 0.2, 1); // Recharts default easing
  }
}

/**
 * Hook for entry animations (fade in, scale, etc.)
 */
export function useEntryAnimation(options: UseChartAnimationOptions = {}) {
  const {
    enabled = true,
    duration = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
    easing = 'ease-in-out',
  } = options;

  const progress = useSharedValue(enabled ? 0 : 1);

  useEffect(() => {
    if (enabled) {
      if (easing === 'spring') {
        progress.value = withSpring(1, {
          damping: 15,
          stiffness: 100,
        });
      } else {
        progress.value = withTiming(1, {
          duration,
          easing: getEasing(easing),
        } as WithTimingConfig);
      }
    }
  }, [enabled, duration, easing, progress]);

  return progress;
}

/**
 * Hook for value animations (numbers, progress bars, etc.)
 * Handles both initial animation AND data updates
 * When targetValue changes, it smoothly transitions to the new value
 */
export function useValueAnimation(
  targetValue: number,
  options: UseChartAnimationOptions = {}
) {
  const {
    enabled = true,
    duration = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
    easing = 'ease-in-out',
  } = options;

  const animatedValue = useSharedValue(enabled ? 0 : targetValue);
  const isFirstMount = useSharedValue(true);

  useEffect(() => {
    if (enabled) {
      // On first mount, animate from 0
      // On data change, animate from current value to new value
      const startValue = isFirstMount.value ? 0 : animatedValue.value;
      
      if (easing === 'spring') {
        animatedValue.value = withSpring(targetValue, {
          damping: 15,
          stiffness: 100,
        });
      } else {
        animatedValue.value = withTiming(targetValue, {
          duration: isFirstMount.value ? duration : duration * 0.6, // Faster for updates
          easing: getEasing(easing),
        } as WithTimingConfig);
      }
      
      isFirstMount.value = false;
    } else {
      animatedValue.value = targetValue;
    }
  }, [targetValue, enabled, duration, easing, animatedValue, isFirstMount]);

  return animatedValue;
}

/**
 * Hook for true path drawing animation (SVG paths)
 * Returns strokeDasharray and animated strokeDashoffset for Recharts-style line drawing
 * The line literally draws from start to finish
 * Handles both initial draw AND data changes (path morphs smoothly)
 */
export function usePathDrawAnimation(
  pathLength: number,
  options: UseChartAnimationOptions = {}
) {
  const {
    enabled = true,
    duration = 1000, // Longer for smooth drawing effect
    delay = DEFAULT_DELAY,
    easing = 'ease-in-out',
  } = options;

  // Start with line fully hidden (offset = pathLength)
  // Animate to fully visible (offset = 0)
  const dashOffset = useSharedValue(enabled ? pathLength : 0);
  const isFirstMount = useSharedValue(true);

  useEffect(() => {
    if (enabled && pathLength > 0) {
      if (isFirstMount.value) {
        // First mount: draw from start
        dashOffset.value = pathLength;
        dashOffset.value = withTiming(0, {
          duration,
          easing: getEasing(easing),
        } as WithTimingConfig);
        isFirstMount.value = false;
      } else {
        // Data change: quickly redraw (path morphs via SVG, we just flash the animation)
        // Brief redraw effect to show data changed
        dashOffset.value = pathLength * 0.3; // Start from 30% hidden
        dashOffset.value = withTiming(0, {
          duration: duration * 0.4, // Faster for updates
          easing: getEasing(easing),
        } as WithTimingConfig);
      }
    } else {
      dashOffset.value = 0;
    }
  }, [enabled, duration, easing, dashOffset, pathLength, isFirstMount]);

  return {
    dashArray: pathLength,
    dashOffset,
  };
}

/**
 * Hook for scale-in animation (circles, points, markers)
 * Recharts-style: starts small and scales to full size
 */
export function useScaleAnimation(options: UseChartAnimationOptions = {}) {
  const {
    enabled = true,
    duration = DEFAULT_DURATION,
    delay = DEFAULT_DELAY,
    easing = 'ease-out',
  } = options;

  const scale = useSharedValue(enabled ? 0 : 1);

  useEffect(() => {
    if (enabled) {
      scale.value = withTiming(1, {
        duration,
        easing: getEasing(easing),
      } as WithTimingConfig);
    }
  }, [enabled, duration, easing, scale]);

  return scale;
}

/**
 * Hook for staggered animations (multiple items with delay)
 */
export function useStaggeredAnimation(
  itemCount: number,
  options: UseChartAnimationOptions = {}
) {
  const {
    enabled = true,
    duration = DEFAULT_DURATION,
    easing = 'ease-in-out',
  } = options;

  const staggerDelay = duration / itemCount / 2; // Half duration spread across items

  const progresses = Array.from({ length: itemCount }, (_, index) => {
    const progress = useSharedValue(enabled ? 0 : 1);
    
    useEffect(() => {
      if (enabled) {
        progress.value = withTiming(1, {
          duration,
          easing: getEasing(easing),
        } as WithTimingConfig);
      }
    }, [enabled, duration, easing]);

    return progress;
  });

  return progresses;
}

/**
 * Hook for rotation animation (gauges, pie charts, etc.)
 */
export function useRotationAnimation(
  targetRotation: number,
  options: UseChartAnimationOptions = {}
) {
  const {
    enabled = true,
    duration = DEFAULT_DURATION,
    easing = 'spring',
  } = options;

  const rotation = useSharedValue(enabled ? 0 : targetRotation);

  useEffect(() => {
    if (enabled) {
      if (easing === 'spring') {
        rotation.value = withSpring(targetRotation, {
          damping: 12,
          stiffness: 80,
        });
      } else {
        rotation.value = withTiming(targetRotation, {
          duration,
          easing: getEasing(easing),
        } as WithTimingConfig);
      }
    } else {
      rotation.value = targetRotation;
    }
  }, [targetRotation, enabled, duration, easing, rotation]);

  return rotation;
}

/**
 * Estimate SVG path length
 * Since we can't measure paths in React Native, we estimate based on data points
 */
export function estimatePathLength(dataPoints: number, width: number, height: number): number {
  if (dataPoints < 2) return 0;
  
  // Estimate: sum of diagonal distances between points
  // Rough approximation: width + height gives us a reasonable path length estimate
  const avgSegmentLength = width / (dataPoints - 1);
  const avgHeight = height / 2; // Average vertical movement
  const estimatedSegmentLength = Math.sqrt(avgSegmentLength ** 2 + (avgHeight / dataPoints) ** 2);
  
  return dataPoints * estimatedSegmentLength;
}
