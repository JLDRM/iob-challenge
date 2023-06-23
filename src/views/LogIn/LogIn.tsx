import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FieldSet from "../../components/FieldSet/FieldSet";
import InputField from "../../components/InputField/InputField";
import { useAppDispatch } from "../../config/redux/hooks";
import { resetAccountState } from "../../resources/account/account.slice";
import { logInUser } from "../../resources/user/user.slice";
import './LogIn.css';
import { LoginUserForm, LOGIN_DEFAULT_FORM } from "./LogIn.types";

const LogIn = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: LOGIN_DEFAULT_FORM });


  const onValid: SubmitHandler<LoginUserForm> = (formValues) => {
    dispatch(logInUser(formValues));
    dispatch(resetAccountState());
    navigate('/', { replace: true });
  };

  const onInvalid: SubmitErrorHandler<LoginUserForm> = (errors) => {
    console.log(errors);
  };

  return (
    <>
      <h2>Log in form:</h2>

      <section>
        <form className="LogInForm" onSubmit={handleSubmit(onValid, onInvalid)}>

          <FieldSet>
            <InputField label="Email:" htmlFor="email" error={errors?.email}>
              <input type="text" id="email"  {...register('email', { required: 'This field is required', pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Must be a correct email' } })} />
            </InputField>

            <InputField label="Password:" htmlFor="password" error={errors?.password}>
              <input type="password" id="password"  {...register('password', { required: 'This field is required' })} />
            </InputField>
          </FieldSet>

          <button type="submit" className="Button--primary">Submit</button>
        </form>
      </section>

    </>
  );
};

export default LogIn;