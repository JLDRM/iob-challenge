export interface LoginUserForm {
  email: string;
  password: string;
}

export const LOGIN_DEFAULT_FORM: LoginUserForm = {
  email: "",
  password: ""
};