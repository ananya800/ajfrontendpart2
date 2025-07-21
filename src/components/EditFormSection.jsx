import React, { useState } from 'react';

const EditFormSection = ({ fields, initialValues, onSubmit, onCancel }) => {
  const [form, setForm] = useState(initialValues || {});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      if (field.required && !form[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === 'email' && form[field.name]) {
        const emailRegex = /.+@.+\..+/;
        if (!emailRegex.test(form[field.name])) {
          newErrors[field.name] = 'Invalid email address';
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 w-full max-w-lg mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
              {field.label}
            </label>
            {field.type === 'select' ? (
              <select
                name={field.name}
                value={form[field.name] || ''}
                onChange={handleChange}
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                required={field.required}
              >
                <option value="" disabled>{field.placeholder || `Select ${field.label}`}</option>
                {field.options && field.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={form[field.name] || ''}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                required={field.required}
                min={field.min}
                max={field.max}
                step={field.step}
              />
            )}
            {errors[field.name] && (
              <span className="text-xs text-red-600 mt-1">{errors[field.name]}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-2 mt-6">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold shadow"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditFormSection; 