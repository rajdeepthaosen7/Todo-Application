import { useEffect, useState } from 'react';
import { fetchTodos, createTodo, patchTodo, deleteTodoApi } from '../api/todoApi';

const PAGE_SIZE = 10;

export function useTodos(showAlert) {
  const [todosPage, setTodosPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    loadTodos(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadTodos(page = 0) {
    setLoading(true);
    try {
      const data = await fetchTodos({ page, size: PAGE_SIZE });
      setTodosPage(data);
      setCurrentPage(page);
    } catch (e) {
      showAlert?.('Failed to load todos: ' + e.message, 'error');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate({ title, description, dueDate, priority, status }) {
    try {
      const newTodo = await createTodo({ title, description, dueDate });
      // backend guide shows priority/status exist; set them via PATCH
      await patchTodo(newTodo.id, { priority, status });
      showAlert?.('Todo created successfully!', 'success');
      await loadTodos(0);
    } catch (e) {
      showAlert?.('Error creating todo: ' + e.message, 'error');
    }
  }

  async function toggleStatus(id, isCompleted) {
    const status = isCompleted ? 'COMPLETE' : 'PENDING';
    try {
      await patchTodo(id, { status });
      await loadTodos(currentPage);
    } catch (e) {
      showAlert?.('Error updating todo: ' + e.message, 'error');
    }
  }

  async function removeTodo(id) {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    try {
      await deleteTodoApi(id);
      showAlert?.('Todo deleted successfully!', 'success');
      await loadTodos(currentPage);
    } catch (e) {
      showAlert?.('Error deleting todo: ' + e.message, 'error');
    }
  }

  async function openEdit(id) {
    try {
      // backend has only paginated list in guide; fetch a bigger page and find
      const data = await fetchTodos({ page: 0, size: 1000, sort: 'createdAt,desc' });
      const todo = data?.content?.find((t) => t.id === id);
      if (!todo) return;
      setEditTodo({
        ...todo,
        description: todo.description || '',
        dueDate: todo.dueDate || '',
      });
    } catch (e) {
      showAlert?.('Error loading todo: ' + e.message, 'error');
    }
  }

  function closeEdit() {
    setEditTodo(null);
  }

  function updateEdit(partial) {
    setEditTodo((prev) => (prev ? { ...prev, ...partial } : prev));
  }

  async function saveEdit() {
    if (!editTodo) return;
    const payload = {
      title: editTodo.title?.trim(),
      description: editTodo.description?.trim() || null,
      dueDate: editTodo.dueDate || null,
      priority: editTodo.priority,
      status: editTodo.status,
    };

    if (!payload.title) {
      showAlert?.('Title is required', 'error');
      return;
    }

    try {
      await patchTodo(editTodo.id, payload);
      showAlert?.('Todo updated successfully!', 'success');
      closeEdit();
      await loadTodos(currentPage);
    } catch (e) {
      showAlert?.('Error updating todo: ' + e.message, 'error');
    }
  }

  return {
    todosPage,
    currentPage,
    loading,
    loadTodos,
    handleCreate,
    toggleStatus,
    removeTodo,
    editTodo,
    openEdit,
    closeEdit,
    updateEdit,
    saveEdit,
  };
}
