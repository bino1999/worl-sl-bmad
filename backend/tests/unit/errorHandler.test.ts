/**
 * Unit Tests for Error Handler
 */

import {
  AppError,
  ValidationError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  InternalServerError,
} from '../../src/utils/errorHandler';

describe('Error Classes', () => {
  describe('AppError', () => {
    it('should create error with status code and message', () => {
      const error = new AppError(400, 'Bad Request');

      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Bad Request');
      expect(error instanceof Error).toBe(true);
    });

    it('should create error with additional errors object', () => {
      const errors = { field: 'error message' };
      const error = new AppError(400, 'Validation failed', errors);

      expect(error.errors).toEqual(errors);
    });
  });

  describe('ValidationError', () => {
    it('should create validation error with status 400', () => {
      const error = new ValidationError('Invalid input');

      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid input');
    });

    it('should include errors object', () => {
      const errors = { email: 'Invalid email' };
      const error = new ValidationError('Validation failed', errors);

      expect(error.errors).toEqual(errors);
    });
  });

  describe('ConflictError', () => {
    it('should create conflict error with status 409', () => {
      const error = new ConflictError('Email already exists');

      expect(error.statusCode).toBe(409);
      expect(error.message).toBe('Email already exists');
    });
  });

  describe('NotFoundError', () => {
    it('should create not found error with status 404', () => {
      const error = new NotFoundError('User not found');

      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('User not found');
    });
  });

  describe('UnauthorizedError', () => {
    it('should create unauthorized error with status 401', () => {
      const error = new UnauthorizedError('Invalid credentials');

      expect(error.statusCode).toBe(401);
      expect(error.message).toBe('Invalid credentials');
    });
  });

  describe('InternalServerError', () => {
    it('should create internal server error with status 500', () => {
      const error = new InternalServerError('Database connection failed');

      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Database connection failed');
    });

    it('should use default message if not provided', () => {
      const error = new InternalServerError();

      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Internal Server Error');
    });
  });
});
