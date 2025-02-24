import {
  parseTimeString,
  validateTimeValue,
  weeklyToDaily,
  hoursToMinutes,
  formatMinutes,
  convertToDailyTime,
} from './timeFormat';

describe('parseTimeString', () => {
  test('parses weekly hours format', () => {
    expect(parseTimeString('40 hours per week')).toEqual({
      value: 40,
      unit: 'hours',
      frame: 'weekly',
    });
    expect(parseTimeString('40hrs/w')).toEqual({
      value: 40,
      unit: 'hours',
      frame: 'weekly',
    });
    // Additional format variations
    expect(parseTimeString('40 hrs/week')).toEqual({
      value: 40,
      unit: 'hours',
      frame: 'weekly',
    });
    expect(parseTimeString('40h/wk')).toEqual({
      value: 40,
      unit: 'hours',
      frame: 'weekly',
    });
  });

  test('parses weekly minutes format', () => {
    expect(parseTimeString('2400 minutes per week')).toEqual({
      value: 2400,
      unit: 'minutes',
      frame: 'weekly',
    });
    expect(parseTimeString('2400mins/w')).toEqual({
      value: 2400,
      unit: 'minutes',
      frame: 'weekly',
    });
    // Additional format variations
    expect(parseTimeString('2400 mins/week')).toEqual({
      value: 2400,
      unit: 'minutes',
      frame: 'weekly',
    });
    expect(parseTimeString('2400m/wk')).toEqual({
      value: 2400,
      unit: 'minutes',
      frame: 'weekly',
    });
  });

  test('parses daily hours format', () => {
    expect(parseTimeString('8 hours per day')).toEqual({
      value: 8,
      unit: 'hours',
      frame: 'daily',
    });
    expect(parseTimeString('8h/d')).toEqual({
      value: 8,
      unit: 'hours',
      frame: 'daily',
    });
  });

  test('parses daily minutes format', () => {
    expect(parseTimeString('480 minutes per day')).toEqual({
      value: 480,
      unit: 'minutes',
      frame: 'daily',
    });
    expect(parseTimeString('480m/d')).toEqual({
      value: 480,
      unit: 'minutes',
      frame: 'daily',
    });
  });

  test('handles decimal values', () => {
    expect(parseTimeString('37.5 hours per week')).toEqual({
      value: 37.5,
      unit: 'hours',
      frame: 'weekly',
    });
  });

  test('handles extra whitespace', () => {
    expect(parseTimeString('  40   hours   per   week  ')).toEqual({
      value: 40,
      unit: 'hours',
      frame: 'weekly',
    });
  });

  test('is case insensitive', () => {
    expect(parseTimeString('40 HOURS PER WEEK')).toEqual({
      value: 40,
      unit: 'hours',
      frame: 'weekly',
    });
    expect(parseTimeString('40 HoUrS pEr WeEk')).toEqual({
      value: 40,
      unit: 'hours',
      frame: 'weekly',
    });
  });

  test('handles extremely small decimal values', () => {
    expect(parseTimeString('0.001 hours per week')).toEqual({
      value: 0.001,
      unit: 'hours',
      frame: 'weekly',
    });
    expect(parseTimeString('0.0001 minutes per day')).toEqual({
      value: 0.0001,
      unit: 'minutes',
      frame: 'daily',
    });
  });

  test('handles special characters in input', () => {
    expect(() => parseTimeString('40⌛hours per week')).toThrow('Invalid time format');
    expect(() => parseTimeString('40 hours/week!')).toThrow('Invalid time format');
    expect(() => parseTimeString('40 hours 📅 week')).toThrow('Invalid time format');
  });

  test('throws error for invalid formats', () => {
    expect(() => parseTimeString('')).toThrow('Input must be a non-empty string');
    expect(() => parseTimeString('invalid')).toThrow('Invalid time format');
    expect(() => parseTimeString('40')).toThrow('Invalid time format');
    expect(() => parseTimeString('hours per week')).toThrow('Invalid time format');
  });
});

describe('validateTimeValue', () => {
  test('accepts valid values', () => {
    expect(() => validateTimeValue(40)).not.toThrow();
    expect(() => validateTimeValue(0)).not.toThrow();
    expect(() => validateTimeValue(168)).not.toThrow();
  });

  test('accepts decimal values', () => {
    expect(() => validateTimeValue(37.5)).not.toThrow();
    expect(() => validateTimeValue(167.9)).not.toThrow();
    expect(() => validateTimeValue(0.1)).not.toThrow();
  });

  test('validates maximum allowed minutes', () => {
    expect(() => validateTimeValue(10080, 'minutes')).not.toThrow(); // 168 hours * 60
    expect(() => validateTimeValue(10081, 'minutes')).toThrow('Value exceeds maximum allowed time');
  });

  test('handles extremely small values', () => {
    expect(() => validateTimeValue(0.0001)).not.toThrow();
    expect(() => validateTimeValue(0.0001, 'minutes')).not.toThrow();
  });

  test('throws error for invalid values', () => {
    expect(() => validateTimeValue(-1)).toThrow('Value cannot be negative');
    expect(() => validateTimeValue(169)).toThrow('Value exceeds maximum allowed time');
    expect(() => validateTimeValue(NaN)).toThrow('Value must be a number');
    // @ts-ignore - Testing with invalid types
    expect(() => validateTimeValue(undefined)).toThrow('Value must be a number');
    // @ts-ignore - Testing with invalid types
    expect(() => validateTimeValue(null)).toThrow('Value must be a number');
    // @ts-ignore - Testing with invalid types
    expect(() => validateTimeValue('40')).toThrow('Value must be a number');
  });
});

describe('weeklyToDaily', () => {
  test('converts weekly values to daily', () => {
    expect(weeklyToDaily(40)).toBe(8);
    expect(weeklyToDaily(20)).toBe(4);
    expect(weeklyToDaily(37.5)).toBe(7.5);
  });

  test('handles extremely small values', () => {
    expect(weeklyToDaily(0.001)).toBe(0.0002);
    expect(weeklyToDaily(0.0001)).toBe(0.00002);
  });
});

describe('hoursToMinutes', () => {
  test('converts hours to minutes', () => {
    expect(hoursToMinutes(1)).toBe(60);
    expect(hoursToMinutes(2.5)).toBe(150);
    expect(hoursToMinutes(0)).toBe(0);
  });

  test('handles extremely small values', () => {
    expect(hoursToMinutes(0.0001)).toBe(0.006);
    expect(hoursToMinutes(0.001)).toBe(0.06);
  });
});

describe('formatMinutes', () => {
  test('formats minutes into HH:MM', () => {
    expect(formatMinutes(480)).toBe('08:00');
    expect(formatMinutes(90)).toBe('01:30');
    expect(formatMinutes(45)).toBe('00:45');
    expect(formatMinutes(0)).toBe('00:00');
  });

  test('handles large hour values', () => {
    expect(formatMinutes(1440)).toBe('24:00');
    expect(formatMinutes(1500)).toBe('25:00');
    expect(formatMinutes(1501)).toBe('25:01');
  });

  test('rounds minutes to nearest whole number', () => {
    expect(formatMinutes(90.4)).toBe('01:30');
    expect(formatMinutes(90.6)).toBe('01:31');
    expect(formatMinutes(90.5)).toBe('01:31'); // Test exact .5 case
    expect(formatMinutes(89.5)).toBe('01:30'); // Test exact .5 case
  });

  test('handles extremely small values', () => {
    expect(formatMinutes(0.4)).toBe('00:00');
    expect(formatMinutes(0.5)).toBe('00:01');
    expect(formatMinutes(0.1)).toBe('00:00');
    expect(formatMinutes(0.9)).toBe('00:01');
  });
});

describe('convertToDailyTime', () => {
  test('converts weekly hours to daily HH:MM', () => {
    expect(convertToDailyTime('40 hours per week')).toBe('08:00');
    expect(convertToDailyTime('37.5 hours per week')).toBe('07:30');
    expect(convertToDailyTime('20 hours per week')).toBe('04:00');
  });

  test('converts weekly minutes to daily HH:MM', () => {
    expect(convertToDailyTime('2400 minutes per week')).toBe('08:00');
    expect(convertToDailyTime('1200 minutes per week')).toBe('04:00');
  });

  test('converts daily hours to HH:MM', () => {
    expect(convertToDailyTime('8 hours per day')).toBe('08:00');
    expect(convertToDailyTime('4.5 hours per day')).toBe('04:30');
  });

  test('converts daily minutes to HH:MM', () => {
    expect(convertToDailyTime('480 minutes per day')).toBe('08:00');
    expect(convertToDailyTime('90 minutes per day')).toBe('01:30');
  });

  test('handles extremely small values', () => {
    expect(convertToDailyTime('0.001 hours per day')).toBe('00:00');
    expect(convertToDailyTime('0.5 minutes per day')).toBe('00:01');
  });

  test('handles edge cases', () => {
    expect(() => convertToDailyTime('')).toThrow('Input must be a non-empty string');
    expect(() => convertToDailyTime('invalid')).toThrow('Invalid time format');
    expect(() => convertToDailyTime('1000 hours per week')).toThrow('Value exceeds maximum allowed time');
  });
});