import { useState } from 'react';
import type { Todo, TodoPriority } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onUpdate: (updates: Partial<Todo>) => void;
  onDelete: () => void;
}

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editCategory, setEditCategory] = useState(todo.category || '');
  const [editPriority, setEditPriority] = useState<TodoPriority>(todo.priority);
  const [editDueDate, setEditDueDate] = useState(todo.due_date || '');

  const handleSave = () => {
    onUpdate({
      title: editTitle,
      description: editDescription || undefined,
      category: editCategory || undefined,
      priority: editPriority,
      due_date: editDueDate || undefined,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditCategory(todo.category || '');
    setEditPriority(todo.priority);
    setEditDueDate(todo.due_date || '');
    setIsEditing(false);
  };

  const getPriorityColor = (priority: TodoPriority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Title"
          />
          
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Description"
            rows={2}
          />

          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Category"
            />
            
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as TodoPriority)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-md transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border rounded-lg p-4 shadow-sm transition hover:shadow-md ${
      todo.is_completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Checkbox */}
          <input
            type="checkbox"
            checked={todo.is_completed === 1}
            onChange={onToggle}
            className="mt-1 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-lg font-semibold text-gray-900 ${
              todo.is_completed ? 'line-through' : ''
            }`}>
              {todo.title}
            </h3>
            
            {todo.description && (
              <p className="mt-1 text-sm text-gray-600">{todo.description}</p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-2">
              {/* Priority Badge */}
              <span className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(todo.priority)}`}>
                {todo.priority.toUpperCase()}
              </span>

              {/* Category Badge */}
              {todo.category && (
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded border border-blue-200">
                  {todo.category}
                </span>
              )}

              {/* Due Date */}
              {todo.due_date && (
                <span className="text-xs text-gray-500 flex items-center">
                  📅 Due: {formatDate(todo.due_date)}
                </span>
              )}

              {/* Created Date */}
              <span className="text-xs text-gray-400">
                Created: {formatDate(todo.created_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition"
            title="Edit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition"
            title="Delete"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
