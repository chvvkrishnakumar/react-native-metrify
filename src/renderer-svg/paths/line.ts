/**
 * SVG line path generators
 */
import { Point } from '../../core/layout';

/**
 * Creates a simple line path from points
 */
export function createLinePath(points: Point[]): string {
  if (points.length === 0) return '';
  
  const pathParts = points.map((point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${command} ${point.x} ${point.y}`;
  });
  
  return pathParts.join(' ');
}

/**
 * Creates a smooth curve path using quadratic bezier curves
 */
export function createSmoothLinePath(points: Point[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  
  const pathParts: string[] = [`M ${points[0].x} ${points[0].y}`];
  
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    
    // Calculate control point (midpoint)
    const controlX = (current.x + next.x) / 2;
    const controlY = (current.y + next.y) / 2;
    
    if (i === 0) {
      // First segment: use simple control point
      pathParts.push(`Q ${current.x} ${current.y} ${controlX} ${controlY}`);
    } else {
      // Subsequent segments: smooth curve
      pathParts.push(`T ${controlX} ${controlY}`);
    }
  }
  
  // Final point
  const lastPoint = points[points.length - 1];
  pathParts.push(`T ${lastPoint.x} ${lastPoint.y}`);
  
  return pathParts.join(' ');
}

/**
 * Creates an area path (filled under line)
 */
export function createAreaPath(
  points: Point[],
  baselineY: number
): string {
  if (points.length === 0) return '';
  
  const linePath = createLinePath(points);
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  
  return `${linePath} L ${lastPoint.x} ${baselineY} L ${firstPoint.x} ${baselineY} Z`;
}

/**
 * Creates a smooth area path
 */
export function createSmoothAreaPath(
  points: Point[],
  baselineY: number
): string {
  if (points.length === 0) return '';
  
  const linePath = createSmoothLinePath(points);
  const lastPoint = points[points.length - 1];
  const firstPoint = points[0];
  
  return `${linePath} L ${lastPoint.x} ${baselineY} L ${firstPoint.x} ${baselineY} Z`;
}
