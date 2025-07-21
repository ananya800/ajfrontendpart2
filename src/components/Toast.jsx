import React from 'react';
const Toast = ({ toast }) => {
  if (!toast) return null;
  return (
    <div className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 text-white ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>{toast.message}</div>
  );
};
export default Toast; 