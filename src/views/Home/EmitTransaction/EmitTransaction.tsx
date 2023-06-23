import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FieldSet from "../../../components/FieldSet/FieldSet";
import InputField from "../../../components/InputField/InputField";
import InputNumber from "../../../components/InputNumber/InputNumber";
import SimplePortal, { SimplePortalProps } from "../../../components/SimplePortal/SimplePortal";
import { useAppDispatch } from "../../../config/redux/hooks";
import { emitTransaction } from "../../../resources/account/account.slice";
import './EmitTransaction.css';
import { EmitTransactionForm, EMIT_TRANSACTION_DEFAULT } from "./EmitTransaction.types";

const EmitTransaction = ({ open, setOpen }: SimplePortalProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { register, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: EMIT_TRANSACTION_DEFAULT });

  const onValid: SubmitHandler<EmitTransactionForm> = (formValues) => {
    dispatch(emitTransaction(formValues));
    reset(EMIT_TRANSACTION_DEFAULT);
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
              <input type="text" id="from" {...register('from', { required: 'This field is required' })} />
            </InputField>

            <InputField label="To:*" htmlFor="to" error={errors.to}>
              <input type="text" id="to" {...register('to', { required: 'This field is required' })} />
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