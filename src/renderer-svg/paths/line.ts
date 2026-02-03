/**
 * SVG line path generators
 */
import { Point } from '../../core/layout';
import { safeNumber } from '../../core/math';

/**
 * Creates a simple line path from points with NaN protection
 */
export function createLinePath(points: Point[]): string {
  if (points.length === 0) return '';
  
  const pathParts = points.map((point, index) => {
    const command = index === 0 ? 'M' : 'L';
    // CRITICAL: Prevent NaN from causing crashes
    const safeX = safeNumber(point.x, 0);
    const safeY = safeNumber(point.y, 0);
    return `${command} ${safeX} ${safeY}`;
  });
  
  return pathParts.join(' ');
}

/**
 * Creates a smooth curve path using quadratic bezier curves with NaN protection
 */
export function createSmoothLinePath(points: Point[]): string {
  if (points.length === 0) return '';
  
  // CRITICAL: Prevent NaN from causing crashes
  const safePoints = points.map(p => ({
    x: safeNumber(p.x, 0),
    y: safeNumber(p.y, 0),
  }));
  
  if (safePoints.length === 1) return `M ${safePoints[0].x} ${safePoints[0].y}`;
  
  const pathParts: string[] = [`M ${safePoints[0].x} ${safePoints[0].y}`];
  
  for (let i = 0; i < safePoints.length - 1; i++) {
    const current = safePoints[i];
    const next = safePoints[i + 1];
    
    // Calculate control point (midpoint)
    const controlX = safeNumber((current.x + next.x) / 2, 0);
    const controlY = safeNumber((current.y + next.y) / 2, 0);
    
    if (i === 0) {
      // First segment: use simple control point
      pathParts.push(`Q ${current.x} ${current.y} ${controlX} ${controlY}`);
    } else {
      // Subsequent segments: smooth curve
      pathParts.push(`T ${controlX} ${controlY}`);
    }
  }
  
  // Final point
  const lastPoint = safePoints[safePoints.length - 1];
  pathParts.push(`T ${lastPoint.x} ${lastPoint.y}`);
  
  return pathParts.join(' ');
}

/**
 * Creates an area path (filled under line) with NaN protection
 */
export function createAreaPath(
  points: Point[],
  baselineY: number
): string {
  if (points.length === 0) return '';
  
  const safeBaseline = safeNumber(baselineY, 0);
  const linePath = createLinePath(points);
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  
  const safeLastX = safeNumber(lastPoint.x, 0);
  const safeFirstX = safeNumber(firstPoint.x, 0);
  
  return `${linePath} L ${safeLastX} ${safeBaseline} L ${safeFirstX} ${safeBaseline} Z`;
}

/**
 * Creates a smooth area path with NaN protection
 */
export function createSmoothAreaPath(
  points: Point[],
  baselineY: number
): string {
  if (points.length === 0) return '';
  
  const safeBaseline = safeNumber(baselineY, 0);
  const linePath = createSmoothLinePath(points);
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  
  const safeLastX = safeNumber(lastPoint.x, 0);
  const safeFirstX = safeNumber(firstPoint.x, 0);
  
  return `${linePath} L ${safeLastX} ${safeBaseline} L ${safeFirstX} ${safeBaseline} Z`;
}
