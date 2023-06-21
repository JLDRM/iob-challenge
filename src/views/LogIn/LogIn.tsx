import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import FieldSet from "../../components/FieldSet/FieldSet";
import InputField from "../../components/InputField/InputField";
import { useAppDispatch } from "../../config/redux/hooks";
import { logInUser } from "../../resources/user/user.slice";
import { LoginUserForm, LOGIN_DEFAULT_FORM } from "./LogIn.types";
import './LogIn.css';

const LogIn = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: LOGIN_DEFAULT_FORM });


  const onValid: SubmitHandler<LoginUserForm> = (formValues) => {
    dispatch(logInUser(formValues));
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
              <input type="text" id="email"  {...register('email', { required: 'This field is required' })} />
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