import { UseFormRegister } from "react-hook-form";

interface InputNumberProps {
  inputId: string;
  register: UseFormRegister<any>;
}

const InputNumber = ({ inputId, register }: InputNumberProps) => {

  const matchPositiveWith3Decimals = (input: string) => {
    var regex = /^\d+(\.\d{1,3})?$/;
    return regex.test(input);
  };

  return (
    <input type="number" id={inputId} data-testid={inputId} {...register(inputId, {
      required: 'This field is required', min: { value: 1, message: 'At least amount of 1' }, valueAsNumber: true, validate: (val: number) => {
        return matchPositiveWith3Decimals(val.toString()) || 'Only positive numbers with 3 decimals';
      }
    })} />
  );
};

export default InputNumber;