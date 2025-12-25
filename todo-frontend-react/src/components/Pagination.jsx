import React from 'react';

export function Pagination({ totalPages, currentPage, onChange }) {
  if (!totalPages || totalPages <= 1) return null;
  const buttons = [];
  for (let i = 0; i < totalPages; i++) {
    buttons.push(
      <button
        key={i}
        type='button'
        className={`btn-secondary btn-sm ${i === currentPage ? 'active' : ''}`}
        onClick={() => onChange(i)}
      >
        {i + 1}
      </button>
    );
  }
  return <div className='pagination'>{buttons}</div>;
}
