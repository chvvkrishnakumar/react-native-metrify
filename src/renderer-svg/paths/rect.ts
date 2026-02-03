/**
 * SVG rectangle path generators
 */
import { safeNumber } from '../../core/math';

export interface RectConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
}

/**
 * Creates a rounded rectangle path with NaN protection
 */
export function createRoundedRectPath(config: RectConfig): string {
  const { x, y, width, height, radius = 0 } = config;
  
  // CRITICAL: Prevent NaN from causing crashes
  const safeX = safeNumber(x, 0);
  const safeY = safeNumber(y, 0);
  const safeWidth = safeNumber(width, 0);
  const safeHeight = safeNumber(height, 0);
  const safeRadius = safeNumber(radius, 0);
  
  if (safeRadius === 0 || safeWidth <= 0 || safeHeight <= 0) {
    return `M ${safeX} ${safeY} L ${safeX + safeWidth} ${safeY} L ${safeX + safeWidth} ${safeY + safeHeight} L ${safeX} ${safeY + safeHeight} Z`;
  }
  
  const r = Math.min(safeRadius, safeWidth / 2, safeHeight / 2);
  
  return [
    `M ${safeX + r} ${safeY}`,
    `L ${safeX + safeWidth - r} ${safeY}`,
    `Q ${safeX + safeWidth} ${safeY} ${safeX + safeWidth} ${safeY + r}`,
    `L ${safeX + safeWidth} ${safeY + safeHeight - r}`,
    `Q ${safeX + safeWidth} ${safeY + safeHeight} ${safeX + safeWidth - r} ${safeY + safeHeight}`,
    `L ${safeX + r} ${safeY + safeHeight}`,
    `Q ${safeX} ${safeY + safeHeight} ${safeX} ${safeY + safeHeight - r}`,
    `L ${safeX} ${safeY + r}`,
    `Q ${safeX} ${safeY} ${safeX + r} ${safeY}`,
    'Z',
  ].join(' ');
}

/**
 * Creates a rectangle with only specific corners rounded (with NaN protection)
 */
export function createPartiallyRoundedRectPath(
  config: RectConfig & {
    radiusTopLeft?: number;
    radiusTopRight?: number;
    radiusBottomRight?: number;
    radiusBottomLeft?: number;
  }
): string {
  const {
    x,
    y,
    width,
    height,
    radiusTopLeft = 0,
    radiusTopRight = 0,
    radiusBottomRight = 0,
    radiusBottomLeft = 0,
  } = config;
  
  // CRITICAL: Prevent NaN from causing crashes
  const safeX = safeNumber(x, 0);
  const safeY = safeNumber(y, 0);
  const safeWidth = safeNumber(width, 0);
  const safeHeight = safeNumber(height, 0);
  
  const rtl = Math.min(safeNumber(radiusTopLeft, 0), safeWidth / 2, safeHeight / 2);
  const rtr = Math.min(safeNumber(radiusTopRight, 0), safeWidth / 2, safeHeight / 2);
  const rbr = Math.min(safeNumber(radiusBottomRight, 0), safeWidth / 2, safeHeight / 2);
  const rbl = Math.min(safeNumber(radiusBottomLeft, 0), safeWidth / 2, safeHeight / 2);
  
  return [
    `M ${safeX + rtl} ${safeY}`,
    `L ${safeX + safeWidth - rtr} ${safeY}`,
    rtr > 0 ? `Q ${safeX + safeWidth} ${safeY} ${safeX + safeWidth} ${safeY + rtr}` : '',
    `L ${safeX + safeWidth} ${safeY + safeHeight - rbr}`,
    rbr > 0 ? `Q ${safeX + safeWidth} ${safeY + safeHeight} ${safeX + safeWidth - rbr} ${safeY + safeHeight}` : '',
    `L ${safeX + rbl} ${safeY + safeHeight}`,
    rbl > 0 ? `Q ${safeX} ${safeY + safeHeight} ${safeX} ${safeY + safeHeight - rbl}` : '',
    `L ${safeX} ${safeY + rtl}`,
    rtl > 0 ? `Q ${safeX} ${safeY} ${safeX + rtl} ${safeY}` : '',
    'Z',
  ]
    .filter(Boolean)
    .join(' ');
}
