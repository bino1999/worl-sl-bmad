import axios from 'axios';
import type { RegistrationFormData, RegistrationResponse } from './types';

export const registerUser = async (data: RegistrationFormData): Promise<RegistrationResponse> => {
  const response = await axios.post<RegistrationResponse>('/api/auth/register', {
    fullName: data.fullName.trim(),
    mobileNumber: data.mobileNumber.trim(),
    email: data.email.trim().toLowerCase(),
    password: data.password,
    location: data.location,
    role: data.role,
  });
  return response.data;
};
