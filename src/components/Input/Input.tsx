import React from 'react';

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

// Componente TextInput
const Input: React.FC<TextInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  autoComplete = 'on',
  placeholder = '',
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label className="block text-gray-600 text-xs font-semibold">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
