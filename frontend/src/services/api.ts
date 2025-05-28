import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export interface LoginData {
  email: string;
  password: string;
}

export interface DecryptData {
  jwe: string;
}

export const authService = {
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  decrypt: async (data: DecryptData) => {
    const response = await api.post('/auth/decrypt', data);
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get('/auth/history');
    return response.data;
  },
}; 