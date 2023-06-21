import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../../../components/InputField/InputField";
import { useAppDispatch } from "../../../config/redux/hooks";
import { signInUser } from "../../../resources/user/user.slice";
import './SignInForm.css';
import { SignInUserForm, SIGNIN_FORM_DEFAULT } from "./SignInForm.types";

const SignInForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: SIGNIN_FORM_DEFAULT });

  const watchPassword = watch('userPassword');

  const onValid: SubmitHandler<SignInUserForm> = (formValues) => {
    dispatch(signInUser(formValues));
  };

  const onInvalid: SubmitErrorHandler<SignInUserForm> = (errors) => {
    console.log(errors);
  };

  const checkPassEquality = (value: string | undefined, passValue: string | undefined) => {
    if (value !== passValue) return 'This must be equal than the password';
    return true;
  };

  return (
    <form className="SignInForm" onSubmit={handleSubmit(onValid, onInvalid)}>

      <div className="SignInForm-fieldSet">
        <InputField label='Name:' htmlFor='userName' error={errors?.userName}>
          <input type="text" id="userName" {...register('userName', { required: 'This field is required' })} />
        </InputField>

        <InputField label="Email:" htmlFor="userEmail" error={errors?.userEmail}>
          <input type="text" id="userEmail"  {...register('userEmail', { required: 'This field is required', pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Must be a correct email' } })} />
        </InputField>

        <InputField label="Description:" htmlFor="userDescription" error={errors?.userDescription}>
          <input type="text" id="userDescription"  {...register('userDescription')} />
        </InputField>

        <InputField label="Password:" htmlFor="userPassword" error={errors?.userPassword}>
          <input type="password" id="userPassword"  {...register('userPassword', { required: 'This field is required' })} />
        </InputField>

        <InputField label="Password confirm:" htmlFor="userPasswordConfirm" error={errors?.userPasswordConfirm}>
          <input type="password" id="userPasswordConfirm"  {...register('userPasswordConfirm', { required: 'This field is required', validate: { 'nonEqualPass': (val) => checkPassEquality(val, watchPassword) } })} />
        </InputField>
      </div>

      <button type="submit">Register</button>
    </form>
  );
};

export default SignInForm;