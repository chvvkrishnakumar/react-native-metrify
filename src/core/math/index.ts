/**
 * Core math utilities for dashboard widgets
 * Pure functions only - no side effects, no dependencies
 */

/**
 * Ensures a value is a valid number, returns default if NaN or Infinity
 * CRITICAL: Prevents crashes in SVG rendering when values are invalid
 */
export function safeNumber(value: number, defaultValue: number = 0): number {
  'worklet';
  if (!isFinite(value) || isNaN(value)) {
    return defaultValue;
  }
  return value;
}

/**
 * Clamps a value between min and max (with NaN protection)
 */
export function clamp(value: number, min: number, max: number): number {
  const safe = safeNumber(value, min);
  return Math.min(Math.max(safe, min), max);
}

/**
 * Normalizes a value from [min, max] to [0, 1] (with NaN protection)
 */
export function normalize(value: number, min: number, max: number): number {
  const safeValue = safeNumber(value, min);
  const safeMin = safeNumber(min, 0);
  const safeMax = safeNumber(max, 1);
  
  if (safeMax === safeMin) return 0;
  return clamp((safeValue - safeMin) / (safeMax - safeMin), 0, 1);
}

/**
 * Interpolates a value from one range to another (with NaN protection)
 * @example interpolate(5, [0, 10], [0, 100]) // 50
 */
export function interpolate(
  value: number,
  inRange: [number, number],
  outRange: [number, number]
): number {
  const normalized = normalize(value, inRange[0], inRange[1]);
  const result = outRange[0] + normalized * (outRange[1] - outRange[0]);
  return safeNumber(result, outRange[0]);
}

/**
 * Converts polar coordinates to cartesian (with NaN protection)
 * @param cx - Center X
 * @param cy - Center Y
 * @param r - Radius
 * @param angle - Angle in degrees
 */
export function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angle: number
): { x: number; y: number } {
  'worklet';
  const safeCx = safeNumber(cx, 0);
  const safeCy = safeNumber(cy, 0);
  const safeR = safeNumber(r, 0);
  const safeAngle = safeNumber(angle, 0);
  
  const angleInRadians = ((safeAngle - 90) * Math.PI) / 180;
  return {
    x: safeNumber(safeCx + safeR * Math.cos(angleInRadians), safeCx),
    y: safeNumber(safeCy + safeR * Math.sin(angleInRadians), safeCy),
  };
}

/**
 * Rounds a number to a specified number of decimal places
 */
export function roundTo(value: number, decimals: number = 2): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Calculates the distance between two points
 */
export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
