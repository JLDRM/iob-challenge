import { InputField } from "jldrmdev-design-system-seed";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FieldSet from "../../components/FieldSet/FieldSet";
import { useAppDispatch, useAppSelector } from "../../config/redux/hooks";
import { logInUser, logOutUser, selectUsers } from "../../resources/users/users.slice";
import './LogIn.css';
import { LoginUserForm, LOGIN_DEFAULT_FORM } from "./LogIn.types";

const LogIn = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { users } = useAppSelector(selectUsers);
  const { register, handleSubmit, formState: { errors }, watch } = useForm({ defaultValues: LOGIN_DEFAULT_FORM });

  const emailWatch = watch('email');

  const onValid: SubmitHandler<LoginUserForm> = (formValues) => {
    dispatch(logOutUser());
    dispatch(logInUser(formValues));
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
              <input type="text" id="email"  {...register('email', {
                required: 'This field is required', pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Must be a correct email' }, validate: (email) => {
                  const userExists = users.find(user => user.email.toLowerCase() === email.toLowerCase());
                  if (!userExists) return 'User not found';
                  return true;
                }
              })} />
            </InputField>

            <InputField label="Password:" htmlFor="password" error={errors?.password}>
              <input type="password" id="password"  {...register('password', {
                required: 'This field is required', validate: (pass) => {
                  const userExists = users.find(user => user.email.toLowerCase() === emailWatch.toLowerCase());
                  if (!userExists) return true;
                  if (userExists.password === pass) return true;
                  return 'Incorrect password';
                }
              })} />
            </InputField>
          </FieldSet>

          <button type="submit" className="Button--primary">Submit</button>
        </form>
      </section>

    </>
  );
};

export default LogIn;