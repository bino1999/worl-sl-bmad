/**
 * Tests for registration types
 */

import type {
  RegistrationFormData,
  EmployerRegistrationFormData,
  RegistrationFormProps,
  RegistrationResponse,
} from './types';

describe('Registration Types', () => {
  describe('RegistrationFormData', () => {
    it('should support job seeker role', () => {
      const data: RegistrationFormData = {
        fullName: 'John Doe',
        mobileNumber: '0712345678',
        email: 'john@example.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'job_seeker',
      };
      expect(data.role).toBe('job_seeker');
    });

    it('should support employer role', () => {
      const data: RegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@example.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
      };
      expect(data.role).toBe('employer');
    });
  });

  describe('EmployerRegistrationFormData', () => {
    it('should include company name', () => {
      const data: EmployerRegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@example.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: 'ACME Corp',
        industryType: 'Technology',
      };
      expect(data.companyName).toBe('ACME Corp');
    });

    it('should allow optional industry type', () => {
      const data: EmployerRegistrationFormData = {
        fullName: 'Jane Doe',
        mobileNumber: '0712345678',
        email: 'jane@example.com',
        password: 'Test1234',
        location: 'Colombo',
        role: 'employer',
        companyName: 'ACME Corp',
      };
      expect(data.industryType).toBeUndefined();
    });
  });

  describe('RegistrationFormProps', () => {
    it('should support optional onSuccess callback', () => {
      const props: RegistrationFormProps = {
        onSuccess: (userId: number) => {
          console.log(`Registered user ${userId}`);
        },
      };
      expect(props.onSuccess).toBeDefined();
    });

    it('should support optional initialRole', () => {
      const props: RegistrationFormProps = {
        initialRole: 'employer',
      };
      expect(props.initialRole).toBe('employer');
    });

    it('should support optional redirectPath', () => {
      const props: RegistrationFormProps = {
        redirectPath: '/profile/setup',
      };
      expect(props.redirectPath).toBe('/profile/setup');
    });

    it('should allow all properties to be optional', () => {
      const props: RegistrationFormProps = {};
      expect(props).toEqual({});
    });
  });

  describe('RegistrationResponse', () => {
    it('should support error responses with company field', () => {
      const response: RegistrationResponse = {
        success: false,
        message: 'Company name already exists',
        errors: {
          companyName: 'This company name is already registered',
        },
      };
      expect(response.errors?.companyName).toBeDefined();
    });

    it('should support success responses', () => {
      const response: RegistrationResponse = {
        success: true,
        message: 'Registration successful',
        data: {
          userId: 1,
          email: 'jane@example.com',
          role: 'employer',
          status: 'unverified',
        },
      };
      expect(response.success).toBe(true);
      expect(response.data?.role).toBe('employer');
    });
  });
});

