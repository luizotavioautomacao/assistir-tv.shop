import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/index';
import { authService } from '../services/api';
import { useRouter } from 'next/router';

// Mock do serviço de autenticação
jest.mock('../services/api', () => ({
  authService: {
    login: jest.fn(),
  },
}));

// Mock do useRouter do Next.js
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Login Page', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should render login form', () => {
    render(<Login />);

    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should call authService.login and show JWE on success', async () => {
    (authService.login as jest.Mock).mockResolvedValue({ jwe: 'fake-jwe-token' });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'password123',
      });
      expect(screen.getByText('fake-jwe-token')).toBeInTheDocument();
    });
  });

  it('should show error message on login failure', async () => {
    (authService.login as jest.Mock).mockRejectedValue(new Error('Login failed'));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalled();
      expect(screen.getByText('Failed to login. Please try again.')).toBeInTheDocument();
    });
  });

  it('should navigate to /decrypt when button is clicked after success', async () => {
    (authService.login as jest.Mock).mockResolvedValue({ jwe: 'my-token' });

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'a@a.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('my-token')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /go to decrypt/i }));

    expect(mockPush).toHaveBeenCalledWith('/decrypt');
  });
});
