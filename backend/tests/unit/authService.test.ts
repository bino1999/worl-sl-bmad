/**
 * Unit Tests for Authentication Service
 */

import {
  hashPassword,
  comparePassword,
  generateVerificationToken,
} from '../../src/services/authService';

describe('Authentication Service', () => {
  describe('Password Hashing', () => {
    it('should hash password successfully', async () => {
      const password = 'SecurePass123';
      const hash = await hashPassword(password);

      // Hash should be different from password
      expect(hash).not.toBe(password);
      // Hash should be a string
      expect(typeof hash).toBe('string');
      // Hash should be reasonably long (bcrypt hashes are typically 60 chars)
      expect(hash.length).toBeGreaterThan(50);
    });

    it('should produce different hashes for same password', async () => {
      const password = 'SecurePass123';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      // Bcrypt produces different hashes due to salt
      expect(hash1).not.toBe(hash2);
    });

    it('should compare correct password', async () => {
      const password = 'SecurePass123';
      const hash = await hashPassword(password);
      const matches = await comparePassword(password, hash);

      expect(matches).toBe(true);
    });

    it('should not match incorrect password', async () => {
      const password = 'SecurePass123';
      const wrongPassword = 'WrongPass123';
      const hash = await hashPassword(password);
      const matches = await comparePassword(wrongPassword, hash);

      expect(matches).toBe(false);
    });
  });

  describe('Verification Token Generation', () => {
    it('should generate verification token', () => {
      const { token, expiresAt } = generateVerificationToken();

      // Token should be a hex string
      expect(typeof token).toBe('string');
      expect(token).toMatch(/^[a-f0-9]+$/);

      // Token should be 64 characters (32 bytes in hex)
      expect(token.length).toBe(64);

      // Expiry should be a Date
      expect(expiresAt instanceof Date).toBe(true);

      // Expiry should be in the future (approximately 24 hours)
      const now = Date.now();
      const expectedExpiry = now + 24 * 60 * 60 * 1000;
      const diff = Math.abs(expiresAt.getTime() - expectedExpiry);
      expect(diff).toBeLessThan(1000); // Within 1 second
    });

    it('should generate unique tokens', () => {
      const token1 = generateVerificationToken().token;
      const token2 = generateVerificationToken().token;

      expect(token1).not.toBe(token2);
    });

    it('expiry should be 24 hours from now', () => {
      const { expiresAt } = generateVerificationToken();
      const now = Date.now();
      const diff = expiresAt.getTime() - now;
      const hours = diff / (1000 * 60 * 60);

      // Should be approximately 24 hours
      expect(hours).toBeGreaterThan(23.99);
      expect(hours).toBeLessThan(24.01);
    });
  });
});
