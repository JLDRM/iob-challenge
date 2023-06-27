import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FieldSet from "../../../components/FieldSet/FieldSet";
import InputField from "../../../components/InputField/InputField";
import InputNumber from "../../../components/InputNumber/InputNumber";
import SimplePortal, { SimplePortalProps } from "../../../components/SimplePortal/SimplePortal";
import { useAppDispatch, useAppSelector } from "../../../config/redux/hooks";
import { emitTransaction } from "../../../resources/accounts/accounts.slice";
import { selectUsers } from "../../../resources/users/users.slice";
import './EmitTransaction.css';
import { EmitTransactionForm, EMIT_TRANSACTION_DEFAULT } from "./EmitTransaction.types";

const EmitTransaction = ({ open, setOpen }: SimplePortalProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { loggedUser, users } = useAppSelector(selectUsers);
  const { register, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: { ...EMIT_TRANSACTION_DEFAULT, from: loggedUser?.email } });

  const onValid: SubmitHandler<EmitTransactionForm> = (formValues) => {
    if (!loggedUser) return;
    const emitTransactionPayload = { ...formValues, from: loggedUser?.email };
    dispatch(emitTransaction(emitTransactionPayload));
    reset({ ...EMIT_TRANSACTION_DEFAULT, from: loggedUser?.email });
    setOpen(false);
  };

  const onInvalid: SubmitErrorHandler<EmitTransactionForm> = (errors) => {
    console.log(errors);
  };

  return (
    <SimplePortal open={open} setOpen={setOpen}>
      <div className="EmitTransactionForm">
        <h3>Emit transaction:</h3>

        <form noValidate onSubmit={handleSubmit(onValid, onInvalid)}>
          <FieldSet>
            <InputField label="From:*" htmlFor="from" error={errors.from}>
              <input type="text" id="from" {...register('from', { required: 'This field is required', disabled: true })} />
            </InputField>

            <InputField label="To:*" htmlFor="to" error={errors.to}>
              <input type="text" id="to" {...register('to', {
                required: 'This field is required', pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Must be a correct email' }, validate: (email) => {
                  const userExists = users.find(user => user.email.toLowerCase() === email.toLowerCase());
                  if (!userExists) return 'User not found';
                  if (userExists.email.toLowerCase() === loggedUser?.email.toLowerCase()) return 'Better use the deposit option';
                  return true;
                }
              })} />
            </InputField>

            <InputField label="Amount:*" htmlFor="amount" error={errors.amount}>
              <InputNumber inputId="amount" register={register} />
            </InputField>

            <button type="submit" className="Button--primary">Emit</button>
          </FieldSet>
        </form>
      </div>
    </SimplePortal>
  );
};

export default EmitTransaction;