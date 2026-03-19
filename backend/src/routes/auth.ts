/**
 * Authentication Routes
 */

import { Router } from 'express';
import {
  register,
  verifyEmail,
  resendVerification,
} from '../controllers/authController';
import { rateLimit, emailRateLimit } from '../middleware/rateLimiter';

const router = Router();

/**
 * POST /api/auth/register
 * Register new user
 * Rate limit: 5 requests per IP per minute
 */
router.post(
  '/register',
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5,
    keyGenerator: (req) => req.ip || 'unknown',
  }),
  register
);

/**
 * POST /api/auth/verify-email
 * Verify user email with token
 */
router.post('/verify-email', verifyEmail);

/**
 * POST /api/auth/resend-verification
 * Resend verification email
 * Rate limit: 3 requests per email per hour
 */
router.post(
  '/resend-verification',
  emailRateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3,
    emailField: 'email',
  }),
  resendVerification
);

export default router;
