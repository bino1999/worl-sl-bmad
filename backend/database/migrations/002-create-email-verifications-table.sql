-- Migration: 002-create-email-verifications-table
-- Description: Create email_verifications table for managing verification tokens
-- Date: 2026-03-18

CREATE TABLE IF NOT EXISTS email_verifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  verification_token VARCHAR(255) UNIQUE NOT NULL,
  token_expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for lookups
CREATE INDEX IF NOT EXISTS idx_email_verifications_user_id ON email_verifications(user_id);

-- Create index on token for lookups
CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON email_verifications(verification_token);

-- Create index on token expiry for cleanup queries
CREATE INDEX IF NOT EXISTS idx_email_verifications_expires_at ON email_verifications(token_expires_at);
