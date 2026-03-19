/**
 * Authentication Controller
 * Handles HTTP requests for registration and email verification
 */

import { Request, Response, NextFunction } from 'express';
import { validateRegistration } from '../utils/validation';
import {
  hashPassword,
  createUser,
  createEmailVerification,
  verifyEmailToken,
  resendVerificationEmail,
  emailExists,
} from '../services/authService';
import { sendVerificationEmail } from '../services/emailService';
import { ValidationError, ConflictError } from '../utils/errorHandler';
import { RegistrationResponse, VerificationResponse } from '../types/auth';

/**
 * Register new user
 * POST /api/auth/register
 */
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { fullName, mobileNumber, email, password, location, role = 'job_seeker' } = req.body;

    // Validate input
    const validation = validateRegistration({
      fullName,
      mobileNumber,
      email,
      password,
      location,
    });

    if (!validation.valid) {
      const response: RegistrationResponse = {
        success: false,
        message: 'Validation failed',
        errors: validation.errors,
      };
      res.status(400).json(response);
      return;
    }

    // Check if email already exists
    const emailAlreadyExists = await emailExists(email);
    if (emailAlreadyExists) {
      const response: RegistrationResponse = {
        success: false,
        message: 'This email is already registered. Please log in or use a different email.',
      };
      res.status(409).json(response);
      return;
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await createUser({
      fullName,
      mobileNumber,
      email,
      passwordHash,
      location,
      role,
    });


    // Create verification token
    const verification = await createEmailVerification(user.id);

    // Generate verification link
    const origin = process.env.API_BASE_URL || `${req.protocol}://${req.get('host')}`;
    const verificationLink = `${origin}/auth/verify-email?token=${verification.verificationToken}`;

    // Send verification email
    const emailSent = await sendVerificationEmail(email, fullName, verificationLink);

    if (!emailSent.success) {
      console.error('Failed to send verification email:', emailSent.error);
      // Still return success since user was created - email may be retried
    }

    const response: RegistrationResponse = {
      success: true,
      message: 'Registration successful. Please verify your email.',
      data: {
        userId: user.id,
        email: user.email,
        role: user.role || 'job_seeker',
        status: user.status,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Verify email token
 * POST /api/auth/verify-email
 */
export async function verifyEmail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { token } = req.body;

    if (!token || typeof token !== 'string') {
      const response: VerificationResponse = {
        success: false,
        message: 'Verification token is required',
        errors: { token: 'Token is required' },
      };
      res.status(400).json(response);
      return;
    }

    // Verify token and update user
    const user = await verifyEmailToken(token);

    const response: VerificationResponse = {
      success: true,
      message: 'Email verified successfully. You can now log in.',
      data: {
        userId: user.id,
        email: user.email,
        status: user.status,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Resend verification email
 * POST /api/auth/resend-verification
 */
export async function resendVerification(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      const response = {
        success: false,
        message: 'Email is required',
        errors: { email: 'Email is required' },
      };
      res.status(400).json(response);
      return;
    }

    // Resend verification email
    const verification = await resendVerificationEmail(email);

    // Generate verification link
    const origin = process.env.API_BASE_URL || `${req.protocol}://${req.get('host')}`;
    const verificationLink = `${origin}/auth/verify-email?token=${verification.verificationToken}`;

    // Send email
    const emailSent = await sendVerificationEmail(
      email,
      'User', // We don't have the name, just use generic
      verificationLink
    );

    if (!emailSent.success) {
      console.error('Failed to send verification email:', emailSent.error);
    }

    // Always return success (security: don't reveal if email exists)
    const response = {
      success: true,
      message: 'If an account exists with this email, you will receive a verification email shortly.',
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}
