
export interface SignInUserForm {
  userName: string;
  userEmail: string;
  userDescription: string;
  userPassword: string;
  userPasswordConfirm: string;
}

export const SIGNIN_FORM_DEFAULT: SignInUserForm = {
  userName: '',
  userEmail: '',
  userDescription: '',
  userPassword: '',
  userPasswordConfirm: ''
};