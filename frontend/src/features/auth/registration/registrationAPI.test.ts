/**
 * Tests for registrationAPI
 */

import axios from 'axios';
import { registerUser } from './registrationAPI';
import type { RegistrationFormData, EmployerRegistrationFormData, RegistrationResponse } from './types';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('registrationAPI', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser - Job Seeker', () => {
    it('should send job seeker registration data to the API', async () => {
      const jobSeekerData: RegistrationFormData = {
        fullName: 'John Doe',
        mobileNumber: '0712345678',
        email: 'john@example.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'job_seeker',
      };

      const mockResponse: RegistrationResponse = {
        success: true,
        message: 'Registration successful. Please verify your email.',
        data: {
          userId: 1,
          email: 'john@example.com',
          role: 'job_seeker',
          status: 'unverified',
        },
      };

      mockedAxios.post.mockResolvedValue({ data: mockResponse });

      const result = await registerUser(jobSeekerData);

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/auth/register', expect.objectContaining({
        fullName: 'John Doe',
        mobileNumber: '0712345678',
        email: 'john@example.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'job_seeker',
      }));
      expect(result.success).toBe(true);
    });

    it('should not include employer fields for job seeker registration', async () => {
      const jobSeekerData: RegistrationFormData = {
        fullName: 'John Doe',
        mobileNumber: '0712345678',
        email: 'john@example.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'job_seeker',
      };

      mockedAxios.post.mockResolvedValue({
        data: { success: true, message: 'OK' },
      });

      await registerUser(jobSeekerData);

      const callArgs = mockedAxios.post.mock.calls[0][1] as Record<string, any>;
      expect(callArgs).not.toHaveProperty('companyName');
      expect(callArgs).not.toHaveProperty('industryType');
    });

    it('should trim whitespace from fields', async () => {
      const jobSeekerData: RegistrationFormData = {
        fullName: '  John Doe  ',
        mobileNumber: ' 0712345678 ',
        email: ' JOHN@EXAMPLE.COM ',
        password: 'Test1234',
        location: 'Colombo',
        role: 'job_seeker',
      };

      mockedAxios.post.mockResolvedValue({
        data: { success: true, message: 'OK' },
      });

      await registerUser(jobSeekerData);

      const callArgs = mockedAxios.post.mock.calls[0][1] as Record<string, any>;
      expect(callArgs.fullName).toBe('John Doe');
      expect(callArgs.mobileNumber).toBe('0712345678');
      expect(callArgs.email).toBe('john@example.com');
    });
  });

  describe('registerUser - Employer', () => {
    it('should send employer registration data with company information', async () => {
      const employerData: EmployerRegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@company.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: 'Tech Corp',
        industryType: 'Technology',
      };

      const mockResponse: RegistrationResponse = {
        success: true,
        message: 'Registration successful. Please verify your email.',
        data: {
          userId: 2,
          email: 'jane@company.com',
          role: 'employer',
          status: 'unverified',
        },
      };

      mockedAxios.post.mockResolvedValue({ data: mockResponse });

      const result = await registerUser(employerData);

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/auth/register', expect.objectContaining({
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@company.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: 'Tech Corp',
        industryType: 'Technology',
      }));
      expect(result.success).toBe(true);
    });

    it('should include optional industry type when provided', async () => {
      const employerData: EmployerRegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@company.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: 'Tech Corp',
        industryType: 'Healthcare',
      };

      mockedAxios.post.mockResolvedValue({
        data: { success: true, message: 'OK' },
      });

      await registerUser(employerData);

      const callArgs = mockedAxios.post.mock.calls[0][1] as Record<string, any>;
      expect(callArgs.industryType).toBe('Healthcare');
    });

    it('should handle missing industry type (undefined)', async () => {
      const employerData: EmployerRegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@company.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: 'Tech Corp',
      };

      mockedAxios.post.mockResolvedValue({
        data: { success: true, message: 'OK' },
      });

      await registerUser(employerData);

      const callArgs = mockedAxios.post.mock.calls[0][1] as Record<string, any>;
      expect(callArgs.industryType).toBeUndefined();
    });

    it('should trim whitespace from company name', async () => {
      const employerData: EmployerRegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@company.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: '  Tech Corp  ',
        industryType: 'Technology',
      };

      mockedAxios.post.mockResolvedValue({
        data: { success: true, message: 'OK' },
      });

      await registerUser(employerData);

      const callArgs = mockedAxios.post.mock.calls[0][1] as Record<string, any>;
      expect(callArgs.companyName).toBe('Tech Corp');
    });
  });

  describe('Error Handling', () => {
    it('should handle duplicate email error', async () => {
      const employerData: EmployerRegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'existing@company.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: 'Tech Corp',
      };

      const errorResponse: RegistrationResponse = {
        success: false,
        message: 'Email already exists',
        errors: {
          email: 'This email is already registered',
        },
      };

      mockedAxios.post.mockResolvedValue({ data: errorResponse });

      const result = await registerUser(employerData);

      expect(result.success).toBe(false);
      expect(result.errors?.email).toBeDefined();
    });

    it('should handle duplicate company name error', async () => {
      const employerData: EmployerRegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@company.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: 'Existing Corp',
      };

      const errorResponse: RegistrationResponse = {
        success: false,
        message: 'Company name already exists',
        errors: {
          companyName: 'This company name is already registered',
        },
      };

      mockedAxios.post.mockResolvedValue({ data: errorResponse });

      const result = await registerUser(employerData);

      expect(result.success).toBe(false);
      expect(result.errors?.companyName).toBeDefined();
    });

    it('should handle network errors', async () => {
      const employerData: EmployerRegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@company.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: 'Tech Corp',
      };

      mockedAxios.post.mockRejectedValue(new Error('Network error'));

      await expect(registerUser(employerData)).rejects.toThrow('Network error');
    });

    it('should handle validation errors', async () => {
      const employerData: EmployerRegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@company.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: 'Tech Corp',
      };

      const errorResponse: RegistrationResponse = {
        success: false,
        message: 'Validation failed',
        errors: {
          fullName: 'Full name must be at least 2 characters',
          mobileNumber: 'Invalid mobile number format',
        },
      };

      mockedAxios.post.mockResolvedValue({ data: errorResponse });

      const result = await registerUser(employerData);

      expect(result.success).toBe(false);
      expect(Object.keys(result.errors || {}).length).toBeGreaterThan(0);
    });
  });

  describe('API Endpoint', () => {
    it('should call the correct API endpoint', async () => {
      const employerData: EmployerRegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@company.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: 'Tech Corp',
      };

      mockedAxios.post.mockResolvedValue({
        data: { success: true, message: 'OK' },
      });

      await registerUser(employerData);

      expect(mockedAxios.post).toHaveBeenCalledWith('/api/auth/register', expect.any(Object));
    });

    it('should use POST method', async () => {
      const employerData: EmployerRegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@company.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: 'Tech Corp',
      };

      mockedAxios.post.mockResolvedValue({
        data: { success: true, message: 'OK' },
      });

      await registerUser(employerData);

      // POST method is verified by calling mockedAxios.post
      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });
});
