import api, { setAccessToken } from './api';
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from '../types';

export const authService = {
  /**
   * Register a new user
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/register', credentials);
    
    // Store tokens
    if (data.success && data.data) {
      localStorage.setItem('access_token', data.data.access_token);
      localStorage.setItem('refresh_token', data.data.refresh_token);
      setAccessToken(data.data.access_token);
    }
    
    return data;
  },

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/login', credentials);
    
    // Store tokens
    if (data.success && data.data) {
      localStorage.setItem('access_token', data.data.access_token);
      localStorage.setItem('refresh_token', data.data.refresh_token);
      setAccessToken(data.data.access_token);
    }
    
    return data;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setAccessToken(null);
    }
  },

  /**
   * Get current user info (if needed in the future)
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) return null;
      
      // If your backend has a /me endpoint, use it
      // const { data } = await api.get<{ data: User }>('/me');
      // return data.data;
      
      return null;
    } catch (error) {
      return null;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  },
};
