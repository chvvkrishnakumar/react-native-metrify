/**
 * SVG rectangle path generators
 */

export interface RectConfig {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
}

/**
 * Creates a rounded rectangle path
 */
export function createRoundedRectPath(config: RectConfig): string {
  const { x, y, width, height, radius = 0 } = config;
  
  if (radius === 0) {
    return `M ${x} ${y} L ${x + width} ${y} L ${x + width} ${y + height} L ${x} ${y + height} Z`;
  }
  
  const r = Math.min(radius, width / 2, height / 2);
  
  return [
    `M ${x + r} ${y}`,
    `L ${x + width - r} ${y}`,
    `Q ${x + width} ${y} ${x + width} ${y + r}`,
    `L ${x + width} ${y + height - r}`,
    `Q ${x + width} ${y + height} ${x + width - r} ${y + height}`,
    `L ${x + r} ${y + height}`,
    `Q ${x} ${y + height} ${x} ${y + height - r}`,
    `L ${x} ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    'Z',
  ].join(' ');
}

/**
 * Creates a rectangle with only specific corners rounded
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
  
  const rtl = Math.min(radiusTopLeft, width / 2, height / 2);
  const rtr = Math.min(radiusTopRight, width / 2, height / 2);
  const rbr = Math.min(radiusBottomRight, width / 2, height / 2);
  const rbl = Math.min(radiusBottomLeft, width / 2, height / 2);
  
  return [
    `M ${x + rtl} ${y}`,
    `L ${x + width - rtr} ${y}`,
    rtr > 0 ? `Q ${x + width} ${y} ${x + width} ${y + rtr}` : '',
    `L ${x + width} ${y + height - rbr}`,
    rbr > 0 ? `Q ${x + width} ${y + height} ${x + width - rbr} ${y + height}` : '',
    `L ${x + rbl} ${y + height}`,
    rbl > 0 ? `Q ${x} ${y + height} ${x} ${y + height - rbl}` : '',
    `L ${x} ${y + rtl}`,
    rtl > 0 ? `Q ${x} ${y} ${x + rtl} ${y}` : '',
    'Z',
  ]
    .filter(Boolean)
    .join(' ');
}
