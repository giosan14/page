import React from 'react';
import classNames from 'classnames';

interface SelectProps {
  label: string;
  name: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: {id: number; value?: string; nombre?: string; name?:string; label?: string; nombreEquipo?: string}[];
  className?: string;
  multiple?: boolean;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  className = '',
  disabled= false
}) => {
  console.log(value)
  return (
    <div className={`mb-4 w-full ${className}`}>
    <label className="text-gray-600 text-xs font-semibold">{label}</label>
    <select
      disabled={disabled}
      name={name}
      value={value || ""}  
      onChange={onChange}
      className={classNames("mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",{
        "bg-neutral-50": disabled
      })}
    >
      <option value="">Selecciona una opción</option> {/* Opción vacía por defecto */}
      {options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nombre ?? option.name ?? option.label}
        </option>
      ))}
    </select>
  </div>
  
  );
};

export default Select;
