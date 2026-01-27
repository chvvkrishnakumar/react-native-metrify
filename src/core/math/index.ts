/**
 * Core math utilities for dashboard widgets
 * Pure functions only - no side effects, no dependencies
 */

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Normalizes a value from [min, max] to [0, 1]
 */
export function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return clamp((value - min) / (max - min), 0, 1);
}

/**
 * Interpolates a value from one range to another
 * @example interpolate(5, [0, 10], [0, 100]) // 50
 */
export function interpolate(
  value: number,
  inRange: [number, number],
  outRange: [number, number]
): number {
  const normalized = normalize(value, inRange[0], inRange[1]);
  return outRange[0] + normalized * (outRange[1] - outRange[0]);
}

/**
 * Converts polar coordinates to cartesian
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
  const angleInRadians = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
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
