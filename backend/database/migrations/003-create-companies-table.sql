-- Migration: 003-create-companies-table
-- Description: Create companies table for employer/agency company data
-- Date: 2026-03-19

CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255) UNIQUE NOT NULL,
  industry_type VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Create index on user_id for lookups
CREATE INDEX IF NOT EXISTS idx_companies_user_id ON companies(user_id);

-- Create index on company_name for uniqueness checks
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(company_name);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_companies_created_at ON companies(created_at DESC);
