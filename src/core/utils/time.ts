/**
 * Time formatting utilities for chart labels
 */

export type TimeInterval = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

/**
 * Format date based on interval
 */
export function formatTimeLabel(date: Date, interval: TimeInterval): string {
  switch (interval) {
    case 'minute':
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    case 'hour':
      return date.toLocaleTimeString('en-US', { hour: '2-digit' });
    
    case 'day':
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    case 'week':
      return `Week ${getWeekNumber(date)}`;
    
    case 'month':
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    
    case 'year':
      return date.getFullYear().toString();
    
    default:
      return date.toLocaleDateString();
  }
}

/**
 * Get week number of year
 */
function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

/**
 * Generate array of dates for a time range
 */
export function generateTimeLabels(
  start: Date,
  count: number,
  interval: TimeInterval
): string[] {
  const labels: string[] = [];
  const current = new Date(start);
  
  for (let i = 0; i < count; i++) {
    labels.push(formatTimeLabel(current, interval));
    
    // Increment based on interval
    switch (interval) {
      case 'minute':
        current.setMinutes(current.getMinutes() + 1);
        break;
      case 'hour':
        current.setHours(current.getHours() + 1);
        break;
      case 'day':
        current.setDate(current.getDate() + 1);
        break;
      case 'week':
        current.setDate(current.getDate() + 7);
        break;
      case 'month':
        current.setMonth(current.getMonth() + 1);
        break;
      case 'year':
        current.setFullYear(current.getFullYear() + 1);
        break;
    }
  }
  
  return labels;
}

/**
 * Reduce labels to fit width (show every Nth label)
 */
export function reduceLabels(labels: string[], maxLabels: number): { label: string; index: number }[] {
  if (labels.length <= maxLabels) {
    return labels.map((label, index) => ({ label, index }));
  }
  
  const step = Math.ceil(labels.length / maxLabels);
  const reduced: { label: string; index: number }[] = [];
  
  for (let i = 0; i < labels.length; i += step) {
    reduced.push({ label: labels[i], index: i });
  }
  
  return reduced;
}
