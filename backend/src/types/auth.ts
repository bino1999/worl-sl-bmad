/**
 * TypeScript types and interfaces for authentication
 */

export interface RegistrationRequest {
  fullName: string;
  mobileNumber: string;
  email: string;
  password: string;
  location: string;
  role?: 'job_seeker' | 'employer';
}

export interface EmployerRegistrationRequest extends RegistrationRequest {
  role: 'employer';
  companyName: string;
  industryType?: string;
}

export interface RegistrationResponse {
  success: boolean;
  message: string;
  data?: {
    userId: number;
    email: string;
    role: string;
    status: string;
  };
  errors?: Record<string, string>;
}

export interface VerificationRequest {
  token: string;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
  data?: {
    userId: number;
    email: string;
    status: string;
  };
  errors?: Record<string, string>;
}

export interface User {
  id: number;
  email: string;
  mobileNumber: string;
  passwordHash: string;
  fullName: string;
  role: 'job_seeker' | 'employer';
  location: string;
  status: 'unverified' | 'active' | 'suspended';
  emailVerifiedAt: Date | null;
  profilePhotoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface Company {
  id: number;
  userId: number;
  companyName: string;
  industryType: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface EmailVerification {
  id: number;
  userId: number;
  verificationToken: string;
  tokenExpiresAt: Date;
  createdAt: Date;
}
