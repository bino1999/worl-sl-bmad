-- Migration: 001-create-users-table
-- Description: Create users table for job seekers and employers
-- Date: 2026-03-18

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

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
