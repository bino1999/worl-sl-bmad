/**
 * Input validation utilities for authentication
 */

import { ValidationError } from '../utils/errorHandler';

// Sri Lankan phone number validation
const SL_PHONE_REGEX = /^(\+94|0)?[1-9]\d{8}$/;

// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const trimmedEmail = email.trim();
  
  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (trimmedEmail !== email) {
    return { valid: false, error: 'Email contains leading/trailing spaces' };
  }

  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }

  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain uppercase letter' };
  }

  if (!/[a-z]/.test(password)) {
    return { valid: false, error: 'Password must contain lowercase letter' };
  }

  if (!/\d/.test(password)) {
    return { valid: false, error: 'Password must contain number' };
  }

  return { valid: true };
}

export function validateMobileNumber(mobileNumber: string): { valid: boolean; error?: string } {
  if (!mobileNumber || typeof mobileNumber !== 'string') {
    return { valid: false, error: 'Mobile number is required' };
  }

  // Normalize format
  let normalized = mobileNumber.replace(/\s/g, '');
  
  if (!SL_PHONE_REGEX.test(normalized)) {
    return { valid: false, error: 'Invalid Sri Lankan phone format' };
  }

  return { valid: true };
}

export function validateFullName(fullName: string): { valid: boolean; error?: string } {
  if (!fullName || typeof fullName !== 'string') {
    return { valid: false, error: 'Full name is required' };
  }

  if (fullName.trim().length < 2) {
    return { valid: false, error: 'Full name must be at least 2 characters' };
  }

  return { valid: true };
}

export function validateLocation(location: string): { valid: boolean; error?: string } {
  if (!location || typeof location !== 'string') {
    return { valid: false, error: 'Location is required' };
  }

  if (location.trim().length === 0) {
    return { valid: false, error: 'Location cannot be empty' };
  }

  return { valid: true };
}

export function validateRegistration(data: any): { valid: boolean; errors?: Record<string, string> } {
  const errors: Record<string, string> = {};

  const fullNameValidation = validateFullName(data.fullName);
  if (!fullNameValidation.valid) {
    errors.fullName = fullNameValidation.error || 'Invalid full name';
  }

  const mobileValidation = validateMobileNumber(data.mobileNumber);
  if (!mobileValidation.valid) {
    errors.mobileNumber = mobileValidation.error || 'Invalid mobile number';
  }

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.valid) {
    errors.email = emailValidation.error || 'Invalid email';
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.error || 'Invalid password';
  }

  const locationValidation = validateLocation(data.location);
  if (!locationValidation.valid) {
    errors.location = locationValidation.error || 'Invalid location';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}
