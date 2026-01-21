/**
 * Layout utilities for widget positioning and sizing
 */

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Point {
  x: number;
  y: number;
}

/**
 * Calculate center point of a box
 */
export function getCenter(box: Box): Point {
  return {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  };
}

/**
 * Calculate bounding box for a set of points
 */
export function getBoundingBox(points: Point[]): Box {
  if (points.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
}

/**
 * Apply padding to a box
 */
export function applyPadding(
  box: Box,
  padding: { top: number; right: number; bottom: number; left: number }
): Box {
  return {
    x: box.x + padding.left,
    y: box.y + padding.top,
    width: Math.max(0, box.width - padding.left - padding.right),
    height: Math.max(0, box.height - padding.top - padding.bottom),
  };
}

/**
 * Calculate aspect ratio
 */
export function getAspectRatio(width: number, height: number): number {
  return height > 0 ? width / height : 1;
}

/**
 * Scale box to fit within constraints while maintaining aspect ratio
 */
export function fitBox(
  box: Box,
  maxWidth: number,
  maxHeight: number
): Box {
  const aspectRatio = getAspectRatio(box.width, box.height);
  const maxAspectRatio = getAspectRatio(maxWidth, maxHeight);

  let width = maxWidth;
  let height = maxHeight;

  if (aspectRatio > maxAspectRatio) {
    // Box is wider than container
    height = width / aspectRatio;
  } else {
    // Box is taller than container
    width = height * aspectRatio;
  }

  return {
    x: box.x,
    y: box.y,
    width,
    height,
  };
}
