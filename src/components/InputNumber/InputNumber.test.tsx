import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import InputField from '../InputField/InputField';
import InputNumber from './InputNumber';


beforeEach(() => {
  jest.resetAllMocks();
});

function Form() {
  const { register, formState: { errors } } = useForm({ defaultValues: { testNumber: 0 } });

  return (
    <form data-testid='form'>
      <InputField label="Amount:*" htmlFor="amount" error={errors.testNumber}>
        <InputNumber
          inputId='testNumber'
          register={register}
        />
      </InputField>
    </form>
  );
}

function setUp() {
  render(<Form />);
  const form = screen.getByTestId<HTMLFormElement>('form');
  const inputNumber = screen.getByTestId<HTMLInputElement>('testNumber');

  return { form, inputNumber };
}

test('InputNumber renders correctly', () => {
  const { form, inputNumber } = setUp();
  expect(form).toBeInTheDocument();
  expect(inputNumber).toBeInTheDocument();
});

test('InputNumber form submits correctly', () => {
  const { form } = setUp();
  const mockSubmit = jest.fn();
  form.onsubmit = mockSubmit;
  fireEvent.submit(form);
  expect(mockSubmit).toBeCalledTimes(1);
});