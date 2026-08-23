import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  rightElement,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor={inputId} className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
        {rightElement && <div>{rightElement}</div>}
      </div>
      <input
        id={inputId}
        className={`w-full px-4 py-3.5 bg-gray-100 border-none rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-shadow ${
          error ? 'ring-2 ring-red-500' : ''
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
