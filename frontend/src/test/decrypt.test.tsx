import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Decrypt from '../pages/decrypt';
import { authService } from '../services/api';
import { useRouter } from 'next/router';

jest.mock('../services/api', () => ({
  authService: {
    decrypt: jest.fn(),
  },
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Decrypt Page', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should render the decrypt form', () => {
    render(<Decrypt />);

    expect(screen.getByPlaceholderText('Paste your JWE here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /decrypt/i })).toBeInTheDocument();
  });

  it('should call authService.decrypt and show result on success', async () => {
    const mockResponse = { email: 'test@example.com', name: 'Test User' };
    (authService.decrypt as jest.Mock).mockResolvedValue(mockResponse);

    render(<Decrypt />);

    fireEvent.change(screen.getByPlaceholderText('Paste your JWE here'), {
      target: { value: 'valid-jwe-token' },
    });

    fireEvent.click(screen.getByRole('button', { name: /decrypt/i }));

    await waitFor(() => {
      expect(authService.decrypt).toHaveBeenCalledWith({ jwe: 'valid-jwe-token' });
      expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /view history/i })).toBeInTheDocument();
    });
  });

  it('should show error message on decryption failure', async () => {
    (authService.decrypt as jest.Mock).mockRejectedValue(new Error('Invalid JWE'));

    render(<Decrypt />);

    fireEvent.change(screen.getByPlaceholderText('Paste your JWE here'), {
      target: { value: 'invalid-jwe' },
    });

    fireEvent.click(screen.getByRole('button', { name: /decrypt/i }));

    await waitFor(() => {
      expect(authService.decrypt).toHaveBeenCalled();
      expect(
        screen.getByText('Failed to decrypt JWE. Please check the input.')
      ).toBeInTheDocument();
    });
  });

  it('should navigate to /history when button is clicked after success', async () => {
    const mockResponse = { email: 'test@example.com' };
    (authService.decrypt as jest.Mock).mockResolvedValue(mockResponse);

    render(<Decrypt />);

    fireEvent.change(screen.getByPlaceholderText('Paste your JWE here'), {
      target: { value: 'valid-jwe-token' },
    });

    fireEvent.click(screen.getByRole('button', { name: /decrypt/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /view history/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /view history/i }));

    expect(mockPush).toHaveBeenCalledWith('/history');
  });
});
