/**
 * Unit Tests for Validation Utilities
 */

import {
  validateEmail,
  validatePassword,
  validateMobileNumber,
  validateFullName,
  validateLocation,
  validateRegistration,
} from '../../src/utils/validation';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should validate correct email format', () => {
      const result = validateEmail('user@example.com');
      expect(result.valid).toBe(true);
    });

    it('should reject email without @', () => {
      const result = validateEmail('userexample.com');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid email format');
    });

    it('should reject email with leading spaces', () => {
      const result = validateEmail(' user@example.com');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('leading/trailing spaces');
    });

    it('should reject empty email', () => {
      const result = validateEmail('');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('required');
    });
  });

  describe('validatePassword', () => {
    it('should validate strong password', () => {
      const result = validatePassword('SecurePass123');
      expect(result.valid).toBe(true);
    });

    it('should reject password shorter than 8 characters', () => {
      const result = validatePassword('Pass12');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('8 characters');
    });

    it('should reject password without uppercase', () => {
      const result = validatePassword('securepass123');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('uppercase');
    });

    it('should reject password without lowercase', () => {
      const result = validatePassword('SECUREPASS123');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('lowercase');
    });

    it('should reject password without number', () => {
      const result = validatePassword('SecurePass');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('number');
    });
  });

  describe('validateMobileNumber', () => {
    it('should validate Sri Lankan mobile with +94', () => {
      const result = validateMobileNumber('+94771234567');
      expect(result.valid).toBe(true);
    });

    it('should validate Sri Lankan mobile with 0', () => {
      const result = validateMobileNumber('0771234567');
      expect(result.valid).toBe(true);
    });

    it('should reject invalid mobile format', () => {
      const result = validateMobileNumber('1234567890');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid');
    });

    it('should reject empty mobile', () => {
      const result = validateMobileNumber('');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('required');
    });
  });

  describe('validateFullName', () => {
    it('should validate valid full name', () => {
      const result = validateFullName('John Doe');
      expect(result.valid).toBe(true);
    });

    it('should reject full name shorter than 2 characters', () => {
      const result = validateFullName('J');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('2 characters');
    });

    it('should reject empty full name', () => {
      const result = validateFullName('');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('required');
    });
  });

  describe('validateLocation', () => {
    it('should validate valid location', () => {
      const result = validateLocation('Colombo');
      expect(result.valid).toBe(true);
    });

    it('should reject empty location', () => {
      const result = validateLocation('');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('required');
    });

    it('should reject whitespace-only location', () => {
      const result = validateLocation('   ');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('cannot be empty');
    });
  });

  describe('validateRegistration', () => {
    it('should validate correct registration data', () => {
      const data = {
        fullName: 'John Doe',
        mobileNumber: '+94771234567',
        email: 'john@example.com',
        password: 'SecurePass123',
        location: 'Colombo',
      };
      const result = validateRegistration(data);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should collect all validation errors', () => {
      const data = {
        fullName: 'J',
        mobileNumber: 'invalid',
        email: 'invalid-email',
        password: 'weak',
        location: '',
      };
      const result = validateRegistration(data);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(Object.keys(result.errors!).length).toBeGreaterThan(0);
    });
  });
});
