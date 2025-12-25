import React from 'react';

export function TodoItem({ todo, onToggleStatus, onEdit, onDelete }) {
  const dueDate = todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No due date';

  const priorityClass =
    todo.priority === 'HIGH'
      ? 'badge-priority-high'
      : todo.priority === 'MEDIUM'
      ? 'badge-priority-medium'
      : 'badge-priority-low';

  const statusClass = todo.status === 'COMPLETE' ? 'badge-status-complete' : 'badge-status-pending';

  return (
    <div className={`todo-item ${todo.status === 'COMPLETE' ? 'completed' : ''}`}>
      <div className='todo-header'>
        <input
          type='checkbox'
          className='todo-checkbox'
          checked={todo.status === 'COMPLETE'}
          onChange={(e) => onToggleStatus(todo.id, e.target.checked)}
        />
        <div className='todo-content' style={{ flex: 1 }}>
          <h3 className='todo-title'>{todo.title}</h3>
          {todo.description ? <p className='todo-description'>{todo.description}</p> : null}
          <div className='todo-meta'>
            <span className={`badge ${priorityClass}`}>{todo.priority}</span>
            <span className={`badge ${statusClass}`}>{todo.status}</span>
            <span className='todo-date'>📅 {dueDate}</span>
          </div>
        </div>
      </div>

      <div className='todo-actions'>
        <button className='btn-secondary btn-sm' onClick={() => onEdit(todo.id)}>
          Edit
        </button>
        <button className='btn-danger btn-sm' onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
