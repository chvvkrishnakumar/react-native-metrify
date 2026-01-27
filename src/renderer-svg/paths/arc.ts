/**
 * SVG arc path generator
 * Translates geometry to SVG path strings
 */
import { polarToCartesian } from '../../core/math';

export interface ArcPathConfig {
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  endAngle: number;
}

/**
 * Creates an SVG arc path
 * @param config - Arc configuration
 * @returns SVG path string
 */
export function createArcPath(config: ArcPathConfig): string {
  'worklet';
  const { cx, cy, radius, startAngle, endAngle } = config;
  
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  
  return [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');
}

/**
 * Creates a filled arc (pie slice) path
 */
export function createFilledArcPath(config: ArcPathConfig): string {
  'worklet';
  const { cx, cy } = config;
  const arcPath = createArcPath(config);
  
  return `${arcPath} L ${cx} ${cy} Z`;
}

/**
 * Creates a donut arc path with inner and outer radius
 */
export function createDonutArcPath(
  config: ArcPathConfig & { innerRadius: number }
): string {
  'worklet';
  const { cx, cy, radius, innerRadius, startAngle, endAngle } = config;
  
  const outerStart = polarToCartesian(cx, cy, radius, endAngle);
  const outerEnd = polarToCartesian(cx, cy, radius, startAngle);
  const innerStart = polarToCartesian(cx, cy, innerRadius, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, startAngle);
  
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  
  return [
    'M',
    outerStart.x,
    outerStart.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    outerEnd.x,
    outerEnd.y,
    'L',
    innerEnd.x,
    innerEnd.y,
    'A',
    innerRadius,
    innerRadius,
    0,
    largeArcFlag,
    1,
    innerStart.x,
    innerStart.y,
    'Z',
  ].join(' ');
}
