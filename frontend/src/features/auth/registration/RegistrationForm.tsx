import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, Box, Typography, CircularProgress } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SRI_LANKA_DISTRICTS } from './constants';
import type { RegistrationFormData } from './types';
import useRegistration from './useRegistration';

const schema = yup.object().shape({
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
  role: yup.string().oneOf(['job_seeker'], 'Role must be Job Seeker').required(),
});

const RegistrationForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<RegistrationFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      mobileNumber: '',
      email: '',
      password: '',
      location: '',
      role: 'job_seeker',
    },
  });
  const { onSubmit, loading } = useRegistration();

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={2}>Register as Job Seeker</Typography>
      <Controller
        name="fullName"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Full Name" fullWidth margin="normal" error={!!errors.fullName} helperText={errors.fullName?.message} inputProps={{ minLength: 2 }} />
        )}
      />
      <Controller
        name="mobileNumber"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Mobile Number" fullWidth margin="normal" error={!!errors.mobileNumber} helperText={errors.mobileNumber?.message} />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Email" fullWidth margin="normal" error={!!errors.email} helperText={errors.email?.message} />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Password" type="password" fullWidth margin="normal" error={!!errors.password} helperText={errors.password?.message} />
        )}
      />
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Location (District/City)" select fullWidth margin="normal" error={!!errors.location} helperText={errors.location?.message}>
            {SRI_LANKA_DISTRICTS.map((district) => (
              <MenuItem key={district} value={district}>{district}</MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Role" select fullWidth margin="normal" disabled>
            <MenuItem value="job_seeker">Job Seeker</MenuItem>
          </TextField>
        )}
      />
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
