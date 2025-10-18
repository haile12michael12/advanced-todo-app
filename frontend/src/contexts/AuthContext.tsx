import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import type { User, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on mount
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error('Failed to get current user:', error);
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await authService.register({ name, email, password });
      if (response.success && response.data) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user state even if API call fails
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user || authService.isAuthenticated(),
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
