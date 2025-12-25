import React from 'react';
import { TodoItem } from './TodoItem';

export function TodoList({ todosPage, loading, onToggleStatus, onEdit, onDelete }) {
  if (loading) {
    return (
      <div className='loading'>
        <div className='spinner'></div>
        <p>Loading todos...</p>
      </div>
    );
  }

  if (!todosPage?.content?.length) {
    return (
      <div className='todo-list'>
        <div className='empty-state'>
          <div className='empty-state-icon'>📭</div>
          <h3>No todos yet</h3>
          <p>Create your first todo to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className='todo-list'>
      {todosPage.content.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
