/**
 * Main Server Setup
 * Initializes Express app with middleware, routes, and database
 */

import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { testConnection, query } from './db/connection';
import authRoutes from './routes/auth';
import { AppError } from './utils/errorHandler';

const app: Express = express();
const PORT = process.env.PORT || 5000;

// ============ Middleware Setup ============

// Security headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

/**
 * Request logging middleware
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// ============ Routes ============

/**
 * Health check
 */
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

/**
 * API Routes
 */
app.use('/api/auth', authRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

/**
 * Error handling middleware
 */
app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', error);

  // Handle AppError instances
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
  }

  // Handle duplicate key error (PostgreSQL)
  if (error.code === '23505') {
    return res.status(409).json({
      success: false,
      message: 'This email is already registered. Please log in or use a different email.',
    });
  }

  // Handle validation error (PostgreSQL)
  if (error.code === '23514') {
    return res.status(400).json({
      success: false,
      message: 'Invalid data provided',
      errors: { database: error.detail || 'Database constraint violation' },
    });
  }

  // Generic error handling
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: error.stack }),
  });
});

// ============ Database Initialization ============

/**
 * Run database migrations
 */
async function runMigrations(): Promise<void> {
  try {
    console.log('Running database migrations...');

    // Migration 1: Create users table
    const usersTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        mobile_number VARCHAR(20) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'job_seeker',
        location VARCHAR(100) NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'unverified',
        email_verified_at TIMESTAMP,
        profile_photo_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        deleted_at TIMESTAMP,
        CHECK (role IN ('job_seeker', 'employer')),
        CHECK (status IN ('unverified', 'active', 'suspended'))
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
    `;

    await query(usersTableSQL, []);
    console.log('✅ Users table created/verified');

    // Migration 2: Create email_verifications table
    const emailVerificationsSQL = `
      CREATE TABLE IF NOT EXISTS email_verifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        verification_token VARCHAR(255) UNIQUE NOT NULL,
        token_expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_email_verifications_user_id ON email_verifications(user_id);
      CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON email_verifications(verification_token);
      CREATE INDEX IF NOT EXISTS idx_email_verifications_expires_at ON email_verifications(token_expires_at);
    `;

    await query(emailVerificationsSQL, []);
    console.log('✅ Email verifications table created/verified');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// ============ Server Startup ============

/**
 * Start server
 */
async function startServer(): Promise<void> {
  try {
    // Test database connection
    await testConnection();

    // Run migrations
    await runMigrations();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`\n✅ Server is running on http://localhost:${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`\n📚 API Endpoints:`);
      console.log(`  - POST /api/auth/register - User registration`);
      console.log(`  - POST /api/auth/verify-email - Email verification`);
      console.log(`  - POST /api/auth/resend-verification - Resend verification email`);
      console.log(`  - GET /health - Health check\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n🛑 Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\n🛑 Shutting down server...');
  process.exit(0);
});

// Start the server
startServer().catch((error) => {
  console.error('Fatal error during startup:', error);
  process.exit(1);
});

export default app;
