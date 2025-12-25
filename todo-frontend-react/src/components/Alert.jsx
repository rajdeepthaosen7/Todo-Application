import React from 'react';

export function Alert({ alert }) {
  if (!alert) return null;
  return (
    <div className={`alert ${alert.type === 'error' ? 'alert-error' : 'alert-success'}`}>
      {alert.message}
    </div>
  );
}
