// Types for input formats
type TimeUnit = 'hours' | 'minutes';
type TimeFrame = 'weekly' | 'daily';

interface ParsedTime {
  value: number;
  unit: TimeUnit;
  frame: TimeFrame;
}

// Regular expressions for parsing
const WEEKLY_HOURS_REGEX = /^(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h)(?:\s*(?:\/|\s+per\s+))(?:week|wk|w)$/i;
const WEEKLY_MINUTES_REGEX = /^(\d+(?:\.\d+)?)\s*(?:minutes?|mins?|m)(?:\s*(?:\/|\s+per\s+))(?:week|wk|w)$/i;
const DAILY_HOURS_REGEX = /^(\d+(?:\.\d+)?)\s*(?:hours?|hrs?|h)(?:\s*(?:\/|\s+per\s+))(?:day|d)$/i;
const DAILY_MINUTES_REGEX = /^(\d+(?:\.\d+)?)\s*(?:minutes?|mins?|m)(?:\s*(?:\/|\s+per\s+))(?:day|d)$/i;

/**
 * Parse input string to determine format and extract numeric value
 */
export function parseTimeString(input: string): ParsedTime {
  if (!input || typeof input !== 'string') {
    throw new Error('Input must be a non-empty string');
  }

  const trimmedInput = input.trim();
  let match: RegExpMatchArray | null;

  // Try matching against each format
  if ((match = trimmedInput.match(WEEKLY_HOURS_REGEX))) {
    return { value: parseFloat(match[1]), unit: 'hours', frame: 'weekly' };
  }
  if ((match = trimmedInput.match(WEEKLY_MINUTES_REGEX))) {
    return { value: parseFloat(match[1]), unit: 'minutes', frame: 'weekly' };
  }
  if ((match = trimmedInput.match(DAILY_HOURS_REGEX))) {
    return { value: parseFloat(match[1]), unit: 'hours', frame: 'daily' };
  }
  if ((match = trimmedInput.match(DAILY_MINUTES_REGEX))) {
    return { value: parseFloat(match[1]), unit: 'minutes', frame: 'daily' };
  }

  throw new Error('Invalid time format');
}

/**
 * Convert hours to minutes
 */
export function hoursToMinutes(hours: number): number {
  return hours * 60;
}

/**
 * Convert minutes to hours
 */
function minutesToHours(minutes: number): number {
  return minutes / 60;
}

/**
 * Validate numeric value
 */
export function validateTimeValue(value: number, unit: TimeUnit = 'hours'): void {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('Value must be a number');
  }
  if (value < 0) {
    throw new Error('Value cannot be negative');
  }

  // Convert minutes to hours for validation if needed
  const hours = unit === 'minutes' ? minutesToHours(value) : value;
  
  if (hours > 168) { // Maximum hours in a week
    throw new Error('Value exceeds maximum allowed time');
  }
}

/**
 * Convert weekly value to daily (divide by 5)
 */
export function weeklyToDaily(value: number): number {
  return value / 5;
}

/**
 * Format minutes into HH:MM format
 */
export function formatMinutes(minutes: number): string {
  const roundedMinutes = Math.round(minutes);
  const hours = Math.floor(roundedMinutes / 60);
  const mins = roundedMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Main function to process time string and return daily HH:MM format
 */
export function convertToDailyTime(input: string): string {
  const parsed = parseTimeString(input);
  validateTimeValue(parsed.value, parsed.unit);

  let minutes: number;

  // Convert to minutes if needed
  if (parsed.unit === 'hours') {
    minutes = hoursToMinutes(parsed.value);
  } else {
    minutes = parsed.value;
  }

  // Convert to daily if needed
  if (parsed.frame === 'weekly') {
    minutes = weeklyToDaily(minutes);
  }

  return formatMinutes(minutes);
}