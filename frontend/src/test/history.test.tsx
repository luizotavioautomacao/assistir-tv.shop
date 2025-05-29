import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import History from '../pages/history';
import { authService } from '../services/api';
import { useRouter } from 'next/router';

jest.mock('../services/api', () => ({
  authService: {
    getHistory: jest.fn(),
  },
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('History Page', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should render history data in a table', async () => {
    const mockData = [
      {
        email: 'test@example.com',
        createdAt: '2025-05-27T10:00:00Z',
        jwe: 'eyJhbGciOi...',
      },
    ];
    (authService.getHistory as jest.Mock).mockResolvedValue(mockData);

    render(<History />);

    await waitFor(() => {
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText(/Login History/i)).toBeInTheDocument();
      expect(screen.getByText(/Back to Login/i)).toBeInTheDocument();
    });
  });

  it('should show error if getHistory fails', async () => {
    (authService.getHistory as jest.Mock).mockRejectedValue(new Error('API Error'));

    render(<History />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load history. Please try again.')).toBeInTheDocument();
    });
  });

  it('should navigate back to login on button click', async () => {
    (authService.getHistory as jest.Mock).mockResolvedValue([]);

    render(<History />);

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /back to login/i });
      fireEvent.click(button);
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
