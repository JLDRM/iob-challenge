import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../config/redux/store';
import { LoginUserForm } from '../../views/LogIn/LogIn.types';
import { SignInUserForm } from '../../views/SignIn/SignInForm/SignInForm.types';
import { User } from './types/users.types';

interface UsersState {
  loggedUser: User | undefined;
  users: User[];
}

const initialState: UsersState = {
  loggedUser: undefined,
  users: [] as User[],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logInUser: (state, { payload }: PayloadAction<LoginUserForm>) => {
      state.loggedUser = state.users.find((user: User) => user.email?.toLowerCase() === payload.email.toLowerCase());
    },
    logOutUser: (state) => {
      state.loggedUser = undefined;
    },
    signInUser: (state, { payload }: PayloadAction<SignInUserForm>) => {
      state.loggedUser = { name: payload.userName, email: payload.userEmail, description: payload.userDescription, password: payload.userPassword };
      state.users.push({ name: payload.userName, email: payload.userEmail, description: payload.userDescription, password: payload.userPassword });
    },
  },
});

export const { logInUser, logOutUser, signInUser } = userSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default userSlice.reducer;