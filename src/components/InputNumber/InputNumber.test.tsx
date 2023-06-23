import { act, fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import InputField from '../InputField/InputField';
import InputNumber from './InputNumber';

let mockOnValid: jest.Mock, mockOnInValid: jest.Mock;

beforeEach(() => {
  mockOnValid = jest.fn();
  mockOnInValid = jest.fn();
});

const Form = ({ inputDefaultValue = 0 }) => {

  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm({ defaultValues: { testNumber: inputDefaultValue } });

  return (
    <form data-testid='form' onSubmit={handleSubmit(mockOnValid, mockOnInValid)}>
      <InputField label="Amount:*" htmlFor="amount" error={errors.testNumber}>
        <InputNumber
          inputId='testNumber'
          register={register}
        />
      </InputField>
      <button type="submit">submit</button>
      {isSubmitted && (<div data-testid='valid'></div>)}
    </form>
  );
};

async function setUp(setUpDefaultValue: any) {
  render(<Form inputDefaultValue={setUpDefaultValue} />);

  await screen.findByTestId<HTMLFormElement>('form');
  await screen.findByTestId<HTMLInputElement>('testNumber');
  await screen.findByRole<HTMLButtonElement>('button');

  const form = screen.getByTestId<HTMLFormElement>('form');
  const inputNumber = screen.getByTestId<HTMLInputElement>('testNumber');
  const buttonSubmit = screen.getByRole<HTMLButtonElement>('button');

  return { form, inputNumber, buttonSubmit };
}

test('InputNumber renders correctly', async () => {
  const { form, inputNumber, buttonSubmit } = await setUp(undefined);
  expect(form).toBeInTheDocument();
  expect(inputNumber).toBeInTheDocument();
  expect(buttonSubmit).toBeInTheDocument();
});

test('InputNumber dont accept letters', async () => {
  const { inputNumber } = await setUp(undefined);

  fireEvent.input(inputNumber, { target: { value: 'e' } });
  expect(inputNumber).toHaveDisplayValue('');
});

test('InputNumber form submits min error', async () => {
  const { buttonSubmit } = await setUp(undefined);
  fireEvent.submit(buttonSubmit);

  await screen.findAllByTestId(/-error/);

  act(() => {
    expect(mockOnInValid).toBeCalledTimes(1);
    expect(mockOnValid).not.toBeCalled();
    expect(screen.getByTestId(/-error/)).toBeInTheDocument();
    expect(screen.getByTestId(/-error/)).toHaveTextContent('At least amount of 1');
  });
});

test('InputNumber form submits required error', async () => {
  const { buttonSubmit } = await setUp('');
  fireEvent.submit(buttonSubmit);

  await screen.findAllByTestId(/-error/);

  act(() => {
    expect(mockOnInValid).toBeCalledTimes(1);
    expect(mockOnValid).not.toBeCalled();
    expect(screen.getByTestId(/-error/)).toBeInTheDocument();
    expect(screen.getByTestId(/-error/)).toHaveTextContent('This field is required');
  });
});

test('InputNumber form submits bad format error', async () => {
  const { buttonSubmit } = await setUp('1999.9999');
  fireEvent.submit(buttonSubmit);

  await screen.findAllByTestId(/-error/);

  act(() => {
    expect(mockOnInValid).toBeCalledTimes(1);
    expect(mockOnValid).not.toBeCalled();
    expect(screen.getByTestId(/-error/)).toBeInTheDocument();
    expect(screen.getByTestId(/-error/)).toHaveTextContent('Only positive numbers with 3 decimals');
  });
});

test('InputNumber form submits correct number', async () => {
  const { buttonSubmit } = await setUp(1);
  fireEvent.submit(buttonSubmit);

  await screen.findAllByTestId(/valid/);

  act(() => {
    expect(mockOnValid).toBeCalledTimes(1);
    expect(mockOnInValid).not.toBeCalled();
  });
});

