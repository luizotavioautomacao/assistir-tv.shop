import axios from 'axios';

// mock antes de importar authService!
jest.mock('axios');
const post = jest.fn();
const get = jest.fn();

(axios.create as jest.Mock).mockReturnValue({
  post,
  get,
});

import { authService } from '../services/api';

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login()', () => {
    it('should call POST /auth/login and return data', async () => {
      const mockData = { jwe: 'fake-token' };
      post.mockResolvedValueOnce({ data: mockData });

      const result = await authService.login({
        email: 'test@example.com',
        password: '123456',
      });

      expect(post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: '123456',
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('decrypt()', () => {
    it('should call POST /auth/decrypt and return data', async () => {
      const mockData = { email: 'test@example.com' };
      post.mockResolvedValueOnce({ data: mockData });

      const result = await authService.decrypt({ jwe: 'encrypted-data' });

      expect(post).toHaveBeenCalledWith('/auth/decrypt', {
        jwe: 'encrypted-data',
      });
      expect(result).toEqual(mockData);
    });
  });

  describe('getHistory()', () => {
    it('should call GET /auth/history and return data', async () => {
      const mockData = [{ email: 'a@a.com' }];
      get.mockResolvedValueOnce({ data: mockData });

      const result = await authService.getHistory();

      expect(get).toHaveBeenCalledWith('/auth/history');
      expect(result).toEqual(mockData);
    });
  });
});
