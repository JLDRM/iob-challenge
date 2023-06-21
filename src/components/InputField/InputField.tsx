import { clsx } from "clsx";
import './InputField.css';
import { PropsWithChildren } from "react";

export interface InputFieldProps extends PropsWithChildren {
  label: string;
  htmlFor: string;
  error: any;
}

const InputField = ({ label, children, htmlFor, error }: InputFieldProps): JSX.Element => {
  return (
    <div className={clsx('InputField-container', error && 'InputField-container--error')} >
      {label && <label htmlFor={htmlFor}><p>{label}</p></label>}
      {children}
      {error && <div className="InputField-errorMessage">{error?.message}</div>}
    </div >
  );
};

export default InputField;