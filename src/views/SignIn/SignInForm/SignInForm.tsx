import { InputField } from "jldrmdev-design-system-seed";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FieldSet from "../../../components/FieldSet/FieldSet";
import { useAppDispatch, useAppSelector } from "../../../config/redux/hooks";
import { createAccount } from "../../../resources/accounts/accounts.slice";
import { logOutUser, selectUsers, signInUser } from "../../../resources/users/users.slice";
import './SignInForm.css';
import { SignInUserForm, SIGNIN_FORM_DEFAULT } from "./SignInForm.types";

const SignInForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users } = useAppSelector(selectUsers);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ defaultValues: SIGNIN_FORM_DEFAULT });

  const watchPassword = watch('userPassword');

  const onValid: SubmitHandler<SignInUserForm> = (formValues) => {
    dispatch(logOutUser());
    dispatch(signInUser(formValues));
    dispatch(createAccount({ email: formValues.userEmail }));
    navigate('/', { replace: true });
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

      <FieldSet>
        <InputField label='Name:*' htmlFor='userName' error={errors?.userName}>
          <input type="text" id="userName" {...register('userName', { required: 'This field is required' })} />
        </InputField>

        <InputField label="Email:*" htmlFor="userEmail" error={errors?.userEmail}>
          <input type="text" id="userEmail"  {...register('userEmail', {
            required: 'This field is required', pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Must be a correct email' }, validate: (email) => {
              if (users.find(user => user.email.toLowerCase() === email.toLowerCase())) return 'Email already in use';
              return true;
            }
          })} />
        </InputField>

        <InputField label="Description:" htmlFor="userDescription" error={errors?.userDescription}>
          <input type="text" id="userDescription"  {...register('userDescription')} />
        </InputField>

        <InputField label="Password:*" htmlFor="userPassword" error={errors?.userPassword}>
          <input type="password" id="userPassword"  {...register('userPassword', { required: 'This field is required' })} />
        </InputField>

        <InputField label="Password confirm:*" htmlFor="userPasswordConfirm" error={errors?.userPasswordConfirm}>
          <input type="password" id="userPasswordConfirm"  {...register('userPasswordConfirm', { required: 'This field is required', validate: { 'nonEqualPass': (val) => checkPassEquality(val, watchPassword) } })} />
        </InputField>
      </FieldSet>

      <button type="submit" className="Button--primary">Register</button>
    </form >
  );
};

export default SignInForm;