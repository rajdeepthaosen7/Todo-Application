import React, { useState } from 'react';

const initialState = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'MEDIUM',
  status: 'PENDING',
};

export function TodoForm({ onCreate }) {
  const [form, setForm] = useState(initialState);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const trimmedTitle = form.title.trim();
    if (!trimmedTitle) {
      alert('Title is required');
      return;
    }
    try {
      await onCreate({
        ...form,
        title: trimmedTitle,
        description: form.description.trim(),
      });
      setForm(initialState);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  }

  return (
    <div className='form-section'>
      <h2 className='form-title'>Create New Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-grid'>
          <div className='form-group'>
            <label htmlFor='title'>Title *</label>
            <input
              type='text'
              id='title'
              name='title'
              required
              placeholder='Enter todo title'
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='priority'>Priority</label>
            <select id='priority' name='priority' value={form.priority} onChange={handleChange}>
              <option value='LOW'>Low</option>
              <option value='MEDIUM'>Medium</option>
              <option value='HIGH'>High</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='dueDate'>Due Date</label>
            <input
              type='date'
              id='dueDate'
              name='dueDate'
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select id='status' name='status' value={form.status} onChange={handleChange}>
              <option value='PENDING'>Pending</option>
              <option value='COMPLETE'>Complete</option>
            </select>
          </div>

          <div className='form-group full-width'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              placeholder='Enter todo description (optional)'
              value={form.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='button-group'>
          <button type='submit' className='btn-primary'>
            Add Todo
          </button>
          <button type='button' className='btn-secondary' onClick={() => setForm(initialState)}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
