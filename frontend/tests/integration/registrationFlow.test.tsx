import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistrationForm from '../../src/features/auth/registration/RegistrationForm';

// Mock API
jest.mock('../../src/features/auth/registration/registrationAPI', () => ({
  registerUser: jest.fn(async (data) => ({
    success: true,
    message: 'Registration successful. Please verify your email.',
    data: { userId: 1, email: data.email, role: 'job_seeker', status: 'unverified' },
  })),
}));

describe('Registration Integration Flow', () => {
  it('registers a user and redirects to verification instructions', async () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Kasun Perera' } });
    fireEvent.change(screen.getByLabelText(/Mobile Number/i), { target: { value: '+94771234567' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'kasun@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: 'Colombo' } });
    fireEvent.click(screen.getByRole('button', { name: /register/i }));
    await waitFor(() => {
      expect(screen.queryByText(/Please check your email/i)).toBeInTheDocument();
    });
  });
});
