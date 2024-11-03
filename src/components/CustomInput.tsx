// CustomField.tsx
import { Field, ErrorMessage } from 'formik';
import { FC } from 'react';

interface CustomInputProps {
    label: string;
    name: string;
    type?: string;
    className: string;
    [key: string]: any;
}

const CustomInput: FC<CustomInputProps> = ({ label, name, type = "text", className, ...rest }) => {
  return (
    <div className={className}>
      <label className='text-xs mb-1' htmlFor={name}>{label}</label>
      <Field className="border border-neutral-50 rounded-lg px-1 py-[7px] focus:outline-primary-color" id={name} name={name} type={type} {...rest} />
      <ErrorMessage className="text-red-600 text-xs" name={name} component="div" />
    </div>
  );
};

export default CustomInput;
