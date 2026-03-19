import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from './registrationAPI';
import type { RegistrationFormData } from './types';

const useRegistration = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: RegistrationFormData) => {
    setLoading(true);
    try {
      const result = await registerUser(data);
      if (result.success) {
        navigate('/auth/verify-instructions', { state: { email: data.email } });
      } else {
        // Handle error messages (show via toast/snackbar or set form errors)
        alert(result.message || 'Registration failed');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { onSubmit, loading };
};

export default useRegistration;
