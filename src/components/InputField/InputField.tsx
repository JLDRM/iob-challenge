import { clsx } from "clsx";
import { PropsWithChildren } from "react";
import './InputField.css';

export interface InputFieldProps extends PropsWithChildren {
  label: string;
  htmlFor: string;
  error: any;
}

const InputField = ({ label, children, htmlFor, error }: InputFieldProps) => {
  return (
    <div className={clsx('InputField-container', error && 'InputField-container--error')} >
      {label && <label htmlFor={htmlFor}><p>{label}</p></label>}
      {children}
      {error && <div className="InputField-errorMessage" data-testid={`${htmlFor}-error`}>{error?.message}</div>}
    </div >
  );
};

export default InputField;