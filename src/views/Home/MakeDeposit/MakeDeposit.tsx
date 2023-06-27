import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FieldSet from "../../../components/FieldSet/FieldSet";
import InputField from "../../../components/InputField/InputField";
import InputNumber from "../../../components/InputNumber/InputNumber";
import SimplePortal, { SimplePortalProps } from "../../../components/SimplePortal/SimplePortal";
import { useAppDispatch, useAppSelector } from "../../../config/redux/hooks";
import { emitDeposit } from "../../../resources/accounts/accounts.slice";
import { selectUsers } from "../../../resources/users/users.slice";
import './MakeDeposit.css';
import { MakeDepositForm, MAKE_DEPOSIT_DEFAULT } from "./MakeDeposit.types";

const MakeDeposit = ({ open, setOpen }: SimplePortalProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { loggedUser } = useAppSelector(selectUsers);
  const { register, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: { ...MAKE_DEPOSIT_DEFAULT, to: loggedUser?.email } });

  const onValid: SubmitHandler<MakeDepositForm> = (formValues) => {
    if (!loggedUser) return;
    const emitDipositPayload = { to: loggedUser?.email, amount: formValues.amount };
    dispatch(emitDeposit(emitDipositPayload));
    reset({ ...MAKE_DEPOSIT_DEFAULT, to: loggedUser?.email });
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
              <input type="text" id="to" {...register('to', { required: 'This field is required', disabled: true },)} />
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