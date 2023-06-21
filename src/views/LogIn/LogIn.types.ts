export interface LoginUserForm {
  email: string | undefined;
  password: string | undefined;
}

export const LOGIN_DEFAULT_FORM: LoginUserForm = {
  email: undefined,
  password: undefined
};