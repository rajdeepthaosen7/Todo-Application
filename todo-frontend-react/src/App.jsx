import React, { useState } from 'react';
import { useTodos } from './hooks/useTodos';
import { Alert } from './components/Alert';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Pagination } from './components/Pagination';
import { EditTodoModal } from './components/EditTodoModal';

export default function App() {
  const [alert, setAlert] = useState(null);

  function showAlert(message, type = 'success') {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  }

  const {
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
  } = useTodos(showAlert);

  return (
    <div className='container'>
      <header>
        <h1>📝 Todo Application</h1>
        <p className='header-subtitle'>Manage your tasks efficiently</p>
      </header>

      <Alert alert={alert} />

      <TodoForm onCreate={handleCreate} />

      <TodoList
        todosPage={todosPage}
        loading={loading}
        onToggleStatus={toggleStatus}
        onEdit={openEdit}
        onDelete={removeTodo}
      />

      <Pagination
        totalPages={todosPage?.totalPages}
        currentPage={currentPage}
        onChange={loadTodos}
      />

      <EditTodoModal
        todo={editTodo}
        onClose={closeEdit}
        onChange={updateEdit}
        onSave={saveEdit}
      />
    </div>
  );
}
