import React from 'react';
import { ButtonProps } from '../../interfaces/components.interface';

const TextButton: React.FC<ButtonProps> = ({ onClick, children, className  }) => {
  return (
    <div className={`text-main-blue-100 border-b border-main-blue-100 ${className}`}>
      <button className="flex items-center gap-2" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default TextButton;
