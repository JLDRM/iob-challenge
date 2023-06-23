import { PropsWithChildren } from "react";
import './FieldSet.css';

export interface FieldSetProps extends PropsWithChildren {
}

const FieldSet = ({ children }: FieldSetProps): JSX.Element => {
  return (
    <fieldset className="FieldSet">
      {children}
    </fieldset>
  );
};

export default FieldSet;
