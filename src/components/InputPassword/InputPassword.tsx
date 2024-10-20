import React, { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

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
const InputPassword: React.FC<TextInputProps> = ({
  label = "Contraseña",
  name = "password",
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <label className="block text-gray-600 text-sm font-medium">
      {label}
      <div className="relative mt-1">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          autoComplete="off"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute top-[10px] right-0 pr-3 flex items-center gap-2 text-purple text-sm"
        >
          {showPassword ? (
            <HiEye className="h-5 w-5 text-neutral-75" />
          ) : (
            <HiEyeOff className="h-5 w-5 text-neutral-75" />
          )}
        </button>
      </div>
    </label>
  );
};

export default InputPassword;
