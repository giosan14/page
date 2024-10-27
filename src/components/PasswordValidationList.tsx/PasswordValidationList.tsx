import React from "react";
import { PasswordValidationResult } from "../../helpers/passwordValidation";

interface PasswordValidationListProps {
  validation: PasswordValidationResult;
}

const PasswordValidationList: React.FC<PasswordValidationListProps> = ({ validation }) => {
  return (
    <ul className="list-none space-y-1">
        <p className="text-neutral-500">La contraseña debe contener:</p>
      <ValidationItem
        isValid={validation.minLength}
        text="Mínimo 8 caracteres"
      />
      <ValidationItem
        isValid={validation.maxLength}
        text="Máximo 16 caracteres"
      />
      <ValidationItem
        isValid={validation.hasLowerCase}
        text="Al menos 1 letra minúscula"
      />
      <ValidationItem
        isValid={validation.hasUpperCase}
        text="Al menos 1 letra mayúscula"
      />
      <ValidationItem isValid={validation.hasNumber} text="Al menos 1 número" />
      <ValidationItem isValid={validation.hasSymbol} text="Al menos 1 símbolo" />
    </ul>
  );
};

interface ValidationItemProps {
  isValid: boolean;
  text: string;
}

const ValidationItem: React.FC<ValidationItemProps> = ({ isValid, text }) => {
  return (
    <li className="flex items-center text-base gap-2">
      <span
        className={`w-3 h-3 rounded-full ${
          isValid ? "bg-primary-color" : "bg-gray-300"
        }`}
      ></span>
      {text}
    </li>
  );
};

export default PasswordValidationList;
