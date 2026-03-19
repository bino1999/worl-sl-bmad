/**
 * Tests for registration form constants
 */

import { SRI_LANKA_DISTRICTS, INDUSTRY_TYPES } from './constants';

describe('Registration Constants', () => {
  describe('SRI_LANKA_DISTRICTS', () => {
    it('should be an array of district names', () => {
      expect(Array.isArray(SRI_LANKA_DISTRICTS)).toBe(true);
    });

    it('should contain at least 25 districts', () => {
      expect(SRI_LANKA_DISTRICTS.length).toBeGreaterThanOrEqual(25);
    });

    it('should include major cities', () => {
      expect(SRI_LANKA_DISTRICTS).toContain('Colombo');
      expect(SRI_LANKA_DISTRICTS).toContain('Kandy');
      expect(SRI_LANKA_DISTRICTS).toContain('Galle');
    });

    it('should have no duplicate entries', () => {
      const uniqueDistricts = new Set(SRI_LANKA_DISTRICTS);
      expect(uniqueDistricts.size).toBe(SRI_LANKA_DISTRICTS.length);
    });

    it('should contain only non-empty strings', () => {
      SRI_LANKA_DISTRICTS.forEach((district) => {
        expect(typeof district).toBe('string');
        expect(district.length).toBeGreaterThan(0);
      });
    });
  });

  describe('INDUSTRY_TYPES', () => {
    it('should be an array of industry names', () => {
      expect(Array.isArray(INDUSTRY_TYPES)).toBe(true);
    });

    it('should contain common industry categories', () => {
      expect(INDUSTRY_TYPES).toContain('Technology');
      expect(INDUSTRY_TYPES).toContain('Healthcare');
      expect(INDUSTRY_TYPES).toContain('Retail');
      expect(INDUSTRY_TYPES).toContain('Construction');
    });

    it('should have at least 10 industry types', () => {
      expect(INDUSTRY_TYPES.length).toBeGreaterThanOrEqual(10);
    });

    it('should have no duplicate entries', () => {
      const uniqueIndustries = new Set(INDUSTRY_TYPES);
      expect(uniqueIndustries.size).toBe(INDUSTRY_TYPES.length);
    });

    it('should contain only non-empty strings', () => {
      INDUSTRY_TYPES.forEach((industry) => {
        expect(typeof industry).toBe('string');
        expect(industry.length).toBeGreaterThan(0);
      });
    });

    it('should include a fallback "Other" option', () => {
      expect(INDUSTRY_TYPES).toContain('Other');
    });
  });
});
