// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    access_token: string;
    refresh_token: string;
  };
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

// Todo Types
export type TodoPriority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  category?: string;
  priority: TodoPriority;
  due_date?: string;
  is_completed: number;
  created_at: string;
  updated_at?: string;
}

export interface CreateTodoPayload {
  title: string;
  description?: string;
  category?: string;
  priority?: TodoPriority;
  due_date?: string;
}

export interface UpdateTodoPayload {
  id: number;
  title?: string;
  description?: string;
  category?: string;
  priority?: TodoPriority;
  due_date?: string;
  is_completed?: number;
}

export interface TodosResponse {
  success: boolean;
  data: Todo[];
}

export interface TodoResponse {
  success: boolean;
  data: Todo;
}

// API Types
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
