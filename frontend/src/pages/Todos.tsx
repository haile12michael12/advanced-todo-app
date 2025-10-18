import { useEffect, useState } from 'react';
import { todoService } from '../services/todoService';
import type { Todo, CreateTodoPayload } from '../types';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoService.getTodos();
      setTodos(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTodo = async (payload: CreateTodoPayload) => {
    try {
      await todoService.createTodo(payload);
      await fetchTodos();
      setShowForm(false);
    } catch (err: any) {
      console.error('Error creating todo:', err);
      throw err;
    }
  };

  const handleUpdateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      await todoService.updateTodo({ id, ...updates });
      await fetchTodos();
    } catch (err: any) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo');
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      await todoService.toggleTodo(todo.id, todo.is_completed);
      await fetchTodos();
    } catch (err: any) {
      console.error('Error toggling todo:', err);
      setError('Failed to toggle todo');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    try {
      await todoService.deleteTodo(id);
      await fetchTodos();
    } catch (err: any) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo');
    }
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return todo.is_completed === 0;
    if (filter === 'completed') return todo.is_completed === 1;
    return true;
  });

  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    // Sort by date (newest first)
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => t.is_completed === 0).length,
    completed: todos.filter((t) => t.is_completed === 1).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition flex items-center"
          >
            <span className="text-xl mr-2">+</span>
            New Todo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.active}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-4">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Todo Form */}
        {showForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <TodoForm
              onSubmit={handleCreateTodo}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {/* Filters and Sort */}
        <div className="flex justify-between items-center mb-4 pb-4 border-b">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                filter === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                filter === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Completed
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="date">Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {sortedTodos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {filter === 'all'
                  ? 'No todos yet. Create one to get started!'
                  : `No ${filter} todos`}
              </p>
            </div>
          ) : (
            sortedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => handleToggleTodo(todo)}
                onUpdate={(updates: Partial<Todo>) => handleUpdateTodo(todo.id, updates)}
                onDelete={() => handleDeleteTodo(todo.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Todos;
