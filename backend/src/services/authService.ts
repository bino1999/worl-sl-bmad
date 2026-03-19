/**
 * Authentication Service
 * Handles user registration, email verification, and related operations
 */

import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { query } from '../db/connection';
import { User, EmailVerification } from '../types/auth';
import { ConflictError, NotFoundError, ValidationError } from '../utils/errorHandler';

const BCRYPT_SALT_ROUNDS = 10;
const EMAIL_VERIFICATION_EXPIRY_HOURS = 24;
const VERIFICATION_TOKEN_LENGTH = 32; // bytes

/**
 * Hash password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, BCRYPT_SALT_ROUNDS);
}

/**
 * Compare password with hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

/**
 * Generate verification token
 */
export function generateVerificationToken(): { token: string; expiresAt: Date } {
  const token = crypto.randomBytes(VERIFICATION_TOKEN_LENGTH).toString('hex');
  const expiresAt = new Date(Date.now() + EMAIL_VERIFICATION_EXPIRY_HOURS * 60 * 60 * 1000);
  return { token, expiresAt };
}

/**
 * Create new user account
 */
export async function createUser(data: {
  fullName: string;
  mobileNumber: string;
  email: string;
  passwordHash: string;
  location: string;
  role?: string;
}): Promise<User> {
  try {
    // Check if email already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = LOWER($1)',
      [data.email.toLowerCase()]
    );

    if (existingUser.rows.length > 0) {
      throw new ConflictError('This email is already registered. Please log in or use a different email.');
    }

    // Insert new user
    const result = await query(
      `INSERT INTO users (
        email, mobile_number, password_hash, full_name, role, location, status, created_at, updated_at
      ) VALUES (
        LOWER($1), $2, $3, $4, $5, $6, 'unverified', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ) RETURNING id, email, role, status`,
      [
        data.email,
        data.mobileNumber,
        data.passwordHash,
        data.fullName,
        data.role || 'job_seeker',
        data.location,
      ]
    );

    return result.rows[0];
  } catch (error) {
    if (error instanceof ConflictError) {
      throw error;
    }
    throw new Error(`Failed to create user: ${error}`);
  }
}

/**
 * Create email verification record
 */
export async function createEmailVerification(userId: number): Promise<EmailVerification> {
  try {
    const { token, expiresAt } = generateVerificationToken();

    // Delete any existing verification tokens for this user
    await query(
      'DELETE FROM email_verifications WHERE user_id = $1',
      [userId]
    );

    // Insert new verification token
    const result = await query(
      `INSERT INTO email_verifications (
        user_id, verification_token, token_expires_at, created_at
      ) VALUES (
        $1, $2, $3, CURRENT_TIMESTAMP
      ) RETURNING id, user_id, verification_token, token_expires_at, created_at`,
      [userId, token, expiresAt]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error(`Failed to create email verification: ${error}`);
  }
}

/**
 * Verify email token and update user status
 */
export async function verifyEmailToken(token: string): Promise<User> {
  try {
    // Find verification record
    const verificationResult = await query(
      `SELECT user_id, token_expires_at FROM email_verifications 
       WHERE verification_token = $1`,
      [token]
    );

    if (verificationResult.rows.length === 0) {
      throw new NotFoundError('Invalid verification token');
    }

    const verification = verificationResult.rows[0];

    // Check token expiry
    if (new Date(verification.token_expires_at) < new Date()) {
      throw new ValidationError('Verification token has expired. Please request a new one.');
    }

    // Update user status to active
    const updateResult = await query(
      `UPDATE users 
       SET status = 'active', email_verified_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING id, email, role, status`,
      [verification.user_id]
    );

    if (updateResult.rows.length === 0) {
      throw new NotFoundError('User not found');
    }

    // Delete the verification token
    await query(
      'DELETE FROM email_verifications WHERE user_id = $1',
      [verification.user_id]
    );

    return updateResult.rows[0];
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      throw error;
    }
    throw new Error(`Failed to verify email: ${error}`);
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await query(
      'SELECT * FROM users WHERE email = LOWER($1)',
      [email.toLowerCase()]
    );

    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    throw new Error(`Failed to get user: ${error}`);
  }
}

/**
 * Check if email exists
 */
export async function emailExists(email: string): Promise<boolean> {
  try {
    const result = await query(
      'SELECT id FROM users WHERE email = LOWER($1)',
      [email.toLowerCase()]
    );
    return result.rows.length > 0;
  } catch (error) {
    throw new Error(`Failed to check email: ${error}`);
  }
}

/**
 * Resend verification email
 */
export async function resendVerificationEmail(email: string): Promise<EmailVerification> {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      // Don't reveal if email exists (security)
      throw new NotFoundError('If an account exists with this email, you will receive a verification email shortly.');
    }

    if (user.status === 'active') {
      throw new ValidationError('This email is already verified');
    }

    // Create new verification token
    return createEmailVerification(user.id);
  } catch (error) {
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      throw error;
    }
    throw new Error(`Failed to resend verification email: ${error}`);
  }
}

/**
 * Check if company name exists
 */
export async function companyNameExists(companyName: string): Promise<boolean> {
  try {
    const result = await query(
      'SELECT id FROM companies WHERE company_name = $1',
      [companyName]
    );
    return result.rows.length > 0;
  } catch (error) {
    throw new Error(`Failed to check company name: ${error}`);
  }
}

/**
 * Create new company record
 */
export async function createCompany(data: {
  userId: number;
  companyName: string;
  industryType?: string;
}): Promise<any> {
  try {
    // Check if company name already exists
    const existingCompany = await companyNameExists(data.companyName);
    if (existingCompany) {
      throw new ConflictError('This company name is already registered.');
    }

    // Insert new company
    const result = await query(
      `INSERT INTO companies (
        user_id, company_name, industry_type, created_at, updated_at
      ) VALUES (
        $1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ) RETURNING id, user_id, company_name, industry_type, created_at, updated_at`,
      [
        data.userId,
        data.companyName,
        data.industryType || null,
      ]
    );

    return result.rows[0];
  } catch (error) {
    if (error instanceof ConflictError) {
      throw error;
    }
    throw new Error(`Failed to create company: ${error}`);
  }
}
