import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import axios from 'axios';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'expired'>('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Invalid verification link.');
      return;
    }
    axios.post('/api/auth/verify-email', { token })
      .then(res => {
        if (res.data.success) {
          setStatus('success');
          setMessage('Email verified successfully. You can now log in.');
        } else {
          setStatus('error');
          setMessage(res.data.message || 'Verification failed.');
        }
      })
      .catch(err => {
        if (err.response?.data?.message?.toLowerCase().includes('expired')) {
          setStatus('expired');
          setMessage('Verification link expired. You can request a new one.');
        } else {
          setStatus('error');
          setMessage('Verification failed.');
        }
      });
  }, [searchParams]);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, textAlign: 'center' }}>
      {status === 'verifying' && <CircularProgress />}
      {status === 'success' && (
        <>
          <Typography variant="h6" gutterBottom>{message}</Typography>
          <Button variant="contained" onClick={() => navigate('/auth/login')}>Go to Login</Button>
        </>
      )}
      {status === 'error' && (
        <>
          <Typography variant="h6" color="error" gutterBottom>{message}</Typography>
          <Button variant="outlined" onClick={() => navigate('/auth/register')}>Back to Register</Button>
        </>
      )}
      {status === 'expired' && (
        <>
          <Typography variant="h6" color="error" gutterBottom>{message}</Typography>
          <Button variant="outlined" onClick={() => navigate('/auth/verify-instructions')}>Resend Verification Email</Button>
        </>
      )}
    </Box>
  );
};

export default VerifyEmail;
