import axios from 'axios';
import type { RegistrationFormData, EmployerRegistrationFormData, RegistrationResponse } from './types';

export const registerUser = async (data: RegistrationFormData | EmployerRegistrationFormData): Promise<RegistrationResponse> => {
  const payload = {
    fullName: data.fullName.trim(),
    mobileNumber: data.mobileNumber.trim(),
    email: data.email.trim().toLowerCase(),
    password: data.password,
    location: data.location,
    role: data.role,
    ...(data.role === 'employer' && {
      companyName: (data as EmployerRegistrationFormData).companyName?.trim(),
      industryType: (data as EmployerRegistrationFormData).industryType || undefined,
    }),
  };

  const response = await axios.post<RegistrationResponse>('/api/auth/register', payload);
  return response.data;
};
