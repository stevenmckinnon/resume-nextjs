import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cn, formatDate, calculateYearsOfExperience, BLUR_FADE_DELAY } from '../utils';

describe('Utility Functions', () => {
  describe('cn function', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
      expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2');
      expect(cn('class1', ['class2', 'class3'])).toBe('class1 class2 class3');
    });
  });

  describe('BLUR_FADE_DELAY constant', () => {
    it('has the correct value', () => {
      expect(BLUR_FADE_DELAY).toBe(0.04);
      expect(typeof BLUR_FADE_DELAY).toBe('number');
    });
  });

  describe('formatDate function', () => {
    let originalDate: DateConstructor;
    
    beforeEach(() => {
      originalDate = global.Date;
      
      // Create a fixed date for testing (March 1, 2024)
      const fixedDate = new Date(2024, 2, 1).getTime();
      
      // Mock Date constructor and methods
      global.Date = class extends originalDate {
        constructor(value?: number | string | Date) {
          if (arguments.length === 0) {
            super(fixedDate);
          } else {
            super(value as any);
          }
        }
        
        static now() {
          return fixedDate;
        }
      } as any;
    });

    afterEach(() => {
      global.Date = originalDate;
    });

    it('returns "Today" for today\'s date', () => {
      expect(formatDate('2024-03-01')).toBe('Today');
    });

    it('shows days for dates less than a week ago', () => {
      expect(formatDate('2024-02-25')).toMatch(/February 25, 2024 \(\d+d ago\)/);
    });

    it('shows weeks for dates less than a month ago', () => {
      expect(formatDate('2024-02-10')).toMatch(/February 10, 2024 \(\d+w ago\)/);
    });

    it('shows months for dates less than a year ago', () => {
      expect(formatDate('2023-10-01')).toMatch(/October 1, 2023 \(\d+mo ago\)/);
    });

    it('shows years for dates more than a year ago', () => {
      expect(formatDate('2022-01-01')).toMatch(/January 1, 2022 \(\d+y ago\)/);
    });
  });

  describe('calculateYearsOfExperience function', () => {
    let originalDate: DateConstructor;
    
    beforeEach(() => {
      originalDate = global.Date;
    });

    afterEach(() => {
      global.Date = originalDate;
    });

    it('calculates years of experience correctly', () => {
      // Create a fixed date for testing (March 1, 2024)
      const fixedDate = new Date(2024, 2, 1);
      
      // Mock Date constructor and methods
      global.Date = class extends originalDate {
        constructor(value?: number | string | Date) {
          if (arguments.length === 0) {
            super(fixedDate);
          } else {
            super(value as any);
          }
        }
        
        static now() {
          return fixedDate.getTime();
        }
      } as any;
      
      // Start date is 2014-06-01, so on 2024-03-01 it should be about 9.75 years
      // which rounds down to 9 years
      expect(calculateYearsOfExperience()).toBe(9);
    });
  });
}); 