import { Pool, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Database pool configuration
export const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'test_bmad',
});

// Test database connection
export async function testConnection(): Promise<void> {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    client.release();
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    throw error;
  }
}

// Query helper
export async function query(sql: string, params?: any[]): Promise<any> {
  try {
    const result = await pool.query(sql, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Close connection
export async function closeConnection(): Promise<void> {
  await pool.end();
  console.log('✅ Database connection closed');
}
