import React from 'react';
import { ButtonProps } from '../../interfaces/components.interface';
import classNames from 'classnames';

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  children,
  color = 'default', // Color por defecto
}) => {
  const buttonClasses = classNames(
    'px-7 font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
    {
      'text-white bg-main-blue-100 hover:bg-main-blue-200': !disabled && color === 'default',
      'text-main-black-100 bg-white hover:bg-neutral-50 border-main-white-100 font-bold': !disabled && color === 'white',
      'text-main-blue-100 px-2 shadow-none bg-white hover:!bg-neutral-50 border-main-white-100 font-bold': !disabled && color === 'blue',
      'text-red-500 bg-white hover:bg-gray-300': !disabled && color === 'red',
      'text-white bg-red-500 hover:bg-red-600': !disabled && color === 'red-delete',
      'text-textGray bg-gray-200 hover:bg-gray-300': !disabled && color === 'cancel',
      'text-main-black-100 shadow-none bg-transparent hover:!bg-neutral-25 px-2': !disabled && color === 'gray',
      'text-neutral-100 shadow-none px-0 bg-transparent hover:bg-transparent': disabled && color === 'gray',

      'text-gray-700 bg-gray-300': disabled,
    },
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;