/**
 * Rate Limiting Middleware
 * Implements token bucket (sliding window) rate limiting
 */

import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    requests: number[];
  };
}

const store: RateLimitStore = {};

export interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  max: number; // Max requests per window
  keyGenerator?: (req: Request) => string; // Custom key generator
  skip?: (req: Request) => boolean; // Skip rate limiting for certain requests
  handler?: (req: Request, res: Response) => void; // Custom handler for rate limit exceeded
}

/**
 * Create rate limiting middleware
 */
export function rateLimit(options: RateLimitOptions) {
  const {
    windowMs = 60000, // 1 minute
    max = 5,
    keyGenerator = (req) => req.ip || 'unknown',
    skip = () => false,
    handler,
  } = options;

  // Cleanup expired entries every minute
  setInterval(() => {
    const now = Date.now();
    Object.keys(store).forEach((key) => {
      store[key].requests = store[key].requests.filter((time) => now - time < windowMs);
      if (store[key].requests.length === 0) {
        delete store[key];
      }
    });
  }, 60000);

  return (req: Request, res: Response, next: NextFunction) => {
    if (skip(req)) {
      return next();
    }

    const key = keyGenerator(req);
    const now = Date.now();

    // Initialize store for this key
    if (!store[key]) {
      store[key] = { requests: [] };
    }

    // Remove requests outside the window
    store[key].requests = store[key].requests.filter((time) => now - time < windowMs);

    // Check if limit exceeded
    if (store[key].requests.length >= max) {
      if (handler) {
        return handler(req, res);
      }

      return res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later',
        retryAfter: Math.ceil(windowMs / 1000),
      });
    }

    // Record this request
    store[key].requests.push(now);

    // Add rate limit info to response headers
    res.setHeader('X-RateLimit-Limit', max);
    res.setHeader('X-RateLimit-Remaining', max - store[key].requests.length);
    res.setHeader('X-RateLimit-Reset', new Date(now + windowMs).toISOString());

    next();
  };
}

/**
 * Per-email rate limiting for email verification resend
 */
export function emailRateLimit(options: RateLimitOptions & { emailField?: string }) {
  const {
    windowMs = 3600000, // 1 hour
    max = 3,
    emailField = 'email',
    skip = () => false,
  } = options;

  return rateLimit({
    windowMs,
    max,
    keyGenerator: (req) => `email:${req.body?.[emailField] || 'unknown'}`,
    skip,
  });
}
