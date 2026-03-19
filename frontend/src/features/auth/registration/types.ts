export interface RegistrationFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  password: string;
  location: string;
  role: 'job_seeker';
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
