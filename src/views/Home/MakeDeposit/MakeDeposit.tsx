/* eslint-disable no-useless-escape */
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FieldSet from "../../../components/FieldSet/FieldSet";
import InputField from "../../../components/InputField/InputField";
import InputNumber from "../../../components/InputNumber/InputNumber";
import SimplePortal, { SimplePortalProps } from "../../../components/SimplePortal/SimplePortal";
import { useAppDispatch } from "../../../config/redux/hooks";
import { emitDeposit } from "../../../resources/account/account.slice";
import './MakeDeposit.css';
import { MakeDepositForm, MAKE_DEPOSIT_DEFAULT } from "./MakeDeposit.types";

const MakeDeposit = ({ open, setOpen }: SimplePortalProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { register, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: MAKE_DEPOSIT_DEFAULT });

  const onValid: SubmitHandler<MakeDepositForm> = (formValues) => {
    dispatch(emitDeposit(formValues));
    reset(MAKE_DEPOSIT_DEFAULT);
    setOpen(false);
  };

  const onInvalid: SubmitErrorHandler<MakeDepositForm> = (errors) => {
    console.log(errors);
  };

  return (
    <SimplePortal open={open} setOpen={setOpen}>
      <div className="MakeDepositForm">
        <h3>Make deposit:</h3>

        <form onSubmit={handleSubmit(onValid, onInvalid)} noValidate>
          <FieldSet>
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

export default MakeDeposit;