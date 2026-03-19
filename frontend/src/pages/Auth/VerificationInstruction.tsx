import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const maskEmail = (email: string) => {
  const [user, domain] = email.split('@');
  if (!user || !domain) return email;
  return user[0] + '***' + user.slice(-1) + '@' + domain;
};

const VerificationInstruction: React.FC = () => {
  const location = useLocation();
  const email = (location.state as any)?.email || '';

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>
        Registration Successful!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Please check your email for a verification link to activate your account.
      </Typography>
      {email && (
        <Typography variant="body2" gutterBottom>
          Sent to: <b>{maskEmail(email)}</b>
        </Typography>
      )}
      <Typography variant="body2" color="textSecondary" gutterBottom>
        The email should arrive within 1 minute. If you don’t see it, check your spam folder.
      </Typography>
      <Button variant="outlined" sx={{ mt: 2 }}>
        Resend Verification Email
      </Button>
    </Box>
  );
};

export default VerificationInstruction;
