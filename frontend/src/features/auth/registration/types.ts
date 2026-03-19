export interface RegistrationFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  password: string;
  location: string;
  role: 'job_seeker' | 'employer';
}

export interface EmployerRegistrationFormData extends RegistrationFormData {
  role: 'employer';
  companyName: string;
  industryType?: string;
}

export interface RegistrationFormProps {
  onSuccess?: (userId: number) => void;
  initialRole?: 'job_seeker' | 'employer';
  redirectPath?: string;
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
