import React from 'react';

export function EditTodoModal({ todo, onClose, onChange, onSave }) {
  if (!todo) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    onChange({ [name]: value });
  }

  return (
    <div
      className='modal active'
      onClick={(e) => {
        if (e.target.classList.contains('modal')) onClose();
      }}
    >
      <div className='modal-content'>
        <div className='modal-header'>
          <h2 className='modal-title'>Edit Todo</h2>
        </div>
        <div className='modal-body'>
          <form>
            <div className='form-group' style={{ marginBottom: 16 }}>
              <label htmlFor='editTitle'>Title *</label>
              <input
                type='text'
                id='editTitle'
                name='title'
                required
                value={todo.title}
                onChange={handleChange}
              />
            </div>
            <div className='form-group' style={{ marginBottom: 16 }}>
              <label htmlFor='editDescription'>Description</label>
              <textarea
                id='editDescription'
                name='description'
                style={{ minHeight: 60 }}
                value={todo.description}
                onChange={handleChange}
              />
            </div>
            <div className='form-group' style={{ marginBottom: 16 }}>
              <label htmlFor='editDueDate'>Due Date</label>
              <input
                type='date'
                id='editDueDate'
                name='dueDate'
                value={todo.dueDate || ''}
                onChange={handleChange}
              />
            </div>
            <div className='form-group' style={{ marginBottom: 16 }}>
              <label htmlFor='editPriority'>Priority</label>
              <select id='editPriority' name='priority' value={todo.priority} onChange={handleChange}>
                <option value='LOW'>Low</option>
                <option value='MEDIUM'>Medium</option>
                <option value='HIGH'>High</option>
              </select>
            </div>
            <div className='form-group' style={{ marginBottom: 16 }}>
              <label htmlFor='editStatus'>Status</label>
              <select id='editStatus' name='status' value={todo.status} onChange={handleChange}>
                <option value='PENDING'>Pending</option>
                <option value='COMPLETE'>Complete</option>
              </select>
            </div>
          </form>
        </div>
        <div className='modal-footer'>
          <button type='button' className='btn-secondary' onClick={onClose}>
            Cancel
          </button>
          <button type='button' className='btn-primary' onClick={onSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
