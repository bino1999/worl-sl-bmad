import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Box, Typography, CircularProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SRI_LANKA_DISTRICTS, INDUSTRY_TYPES } from './constants';
import type { RegistrationFormData, EmployerRegistrationFormData } from './types';
import useRegistration from './useRegistration';

type FormData = RegistrationFormData | EmployerRegistrationFormData;

// Create schema that conditionally validates based on role
const createValidationSchema = () => {
  return yup.object().shape({
    fullName: yup.string().min(2, 'Full name must be at least 2 characters').required('Full name is required'),
    mobileNumber: yup
      .string()
      .matches(/^(\+94|0)\d{9}$/, 'Enter a valid Sri Lankan mobile number')
      .required('Mobile number is required'),
    email: yup.string().email('Enter a valid email').trim().required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Must include an uppercase letter')
      .matches(/[a-z]/, 'Must include a lowercase letter')
      .matches(/[0-9]/, 'Must include a number')
      .required('Password is required'),
    location: yup.string().required('Location is required'),
    role: yup.string().oneOf(['job_seeker', 'employer'], 'Invalid role').required('Role is required'),
    companyName: yup.string().when('role', {
      is: 'employer',
      then: (field) => field.min(2, 'Company name must be at least 2 characters').required('Company name is required'),
      otherwise: (field) => field.notRequired(),
    }),
    industryType: yup.string().when('role', {
      is: 'employer',
      then: (field) => field.optional(),
      otherwise: (field) => field.notRequired(),
    }),
  });
};

const schema = createValidationSchema();

const RegistrationForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors, isValid }, watch } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      email: '',
      password: '',
      location: '',
      role: 'job_seeker',
      companyName: '',
      industryType: undefined,
    } as FormData,
  });

  const selectedRole = watch('role');
  const isEmployer = selectedRole === 'employer';
  const { onSubmit, loading } = useRegistration();

  const formTitle = useMemo(() => {
    return isEmployer ? 'Register as Employer/Agency' : 'Register as Job Seeker';
  }, [isEmployer]);

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data as any);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={2}>{formTitle}</Typography>

      {/* Role Selection */}
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <TextField 
            {...field} 
            label="I am a" 
            select 
            fullWidth 
            margin="normal" 
            error={!!errors.role} 
            helperText={errors.role?.message}
          >
            <MenuItem value="job_seeker">Job Seeker</MenuItem>
            <MenuItem value="employer">Employer/Agency</MenuItem>
          </TextField>
        )}
      />

      {/* Common Fields */}
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <TextField 
            {...field} 
            label="Full Name" 
            fullWidth 
            margin="normal" 
            error={!!errors.fullName} 
            helperText={errors.fullName?.message} 
            inputProps={{ minLength: 2 }} 
          />
        )}
      />

      <Controller
        name="mobileNumber"
        control={control}
        render={({ field }) => (
          <TextField 
            {...field} 
            label="Mobile Number" 
            fullWidth 
            margin="normal" 
            error={!!errors.mobileNumber} 
            helperText={errors.mobileNumber?.message} 
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField 
            {...field} 
            label="Email" 
            fullWidth 
            margin="normal" 
            error={!!errors.email} 
            helperText={errors.email?.message} 
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField 
            {...field} 
            label="Password" 
            type="password" 
            fullWidth 
            margin="normal" 
            error={!!errors.password} 
            helperText={errors.password?.message} 
          />
        )}
      />

      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <TextField 
            {...field} 
            label="Location (District/City)" 
            select 
            fullWidth 
            margin="normal" 
            error={!!errors.location} 
            helperText={errors.location?.message}
          >
            {SRI_LANKA_DISTRICTS.map((district) => (
              <MenuItem key={district} value={district}>{district}</MenuItem>
            ))}
          </TextField>
        )}
      />

      {/* Employer-specific Fields */}
      {isEmployer && (
        <>
          <Controller
            name="companyName"
            control={control}
            render={({ field }) => {
              const fieldError = (errors as any).companyName;
              return (
                <TextField 
                  {...field} 
                  label="Company/Agency Name" 
                  fullWidth 
                  margin="normal" 
                  error={!!fieldError} 
                  helperText={fieldError?.message} 
                  inputProps={{ minLength: 2 }} 
                />
              );
            }}
          />

          <Controller
            name="industryType"
            control={control}
            render={({ field }) => {
              const fieldError = (errors as any).industryType;
              return (
                <TextField 
                  {...field} 
                  label="Industry Type (Optional)" 
                  select 
                  fullWidth 
                  margin="normal" 
                  error={!!fieldError} 
                  helperText={fieldError?.message}
                >
                  <MenuItem value="">-- Select Industry Type --</MenuItem>
                  {INDUSTRY_TYPES.map((industry) => (
                    <MenuItem key={industry} value={industry}>{industry}</MenuItem>
                  ))}
                </TextField>
              );
            }}
          />
        </>
      )}

      <Box mt={2} display="flex" flexDirection="column" alignItems="center">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={!isValid || loading}
          sx={{ minHeight: 44 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
