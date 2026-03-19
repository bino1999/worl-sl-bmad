import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RegistrationForm from '../../src/features/auth/registration/RegistrationForm';

describe('RegistrationForm', () => {
  it('renders all required fields', () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mobile Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
  });

  it('shows validation errors for invalid input', async () => {
    render(
      <BrowserRouter>
        <RegistrationForm />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'A' } });
    fireEvent.blur(screen.getByLabelText(/Full Name/i));
    expect(await screen.findByText(/at least 2 characters/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'bademail' } });
    fireEvent.blur(screen.getByLabelText(/Email/i));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });
});
