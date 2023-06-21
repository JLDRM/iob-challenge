
export interface SignInUserForm {
  userName: string | undefined;
  userEmail: string | undefined;
  userDescription: string | undefined;
  userPassword: string | undefined;
  userPasswordConfirm: string | undefined;
}

export const SIGNIN_FORM_DEFAULT: SignInUserForm = {
  userName: undefined,
  userEmail: undefined,
  userDescription: undefined,
  userPassword: undefined,
  userPasswordConfirm: undefined
};