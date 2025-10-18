import api from './api';
import type {
  Todo,
  CreateTodoPayload,
  UpdateTodoPayload,
  TodosResponse,
  TodoResponse,
} from '../types';

export const todoService = {
  /**
   * Get all todos for the authenticated user
   */
  async getTodos(): Promise<Todo[]> {
    const { data } = await api.get<TodosResponse>('/todos');
    return data.data;
  },

  /**
   * Create a new todo
   */
  async createTodo(payload: CreateTodoPayload): Promise<Todo> {
    const { data } = await api.post<TodoResponse>('/todos', payload);
    return data.data;
  },

  /**
   * Update an existing todo
   */
  async updateTodo(payload: UpdateTodoPayload): Promise<Todo> {
    const { id, ...updateData } = payload;
    const { data } = await api.put<TodoResponse>('/todos', {
      id,
      ...updateData,
    });
    return data.data;
  },

  /**
   * Delete a todo
   */
  async deleteTodo(id: number): Promise<void> {
    await api.delete('/todos', {
      data: { id },
    });
  },

  /**
   * Toggle todo completion status
   */
  async toggleTodo(id: number, currentStatus: number): Promise<Todo> {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const { data } = await api.put<TodoResponse>('/todos', {
      id,
      is_completed: newStatus,
    });
    return data.data;
  },
};
