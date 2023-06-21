import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../config/redux/store';
import { LoginUserForm } from '../../views/LogIn/LogIn.types';
import { SignInUserForm } from '../../views/SignIn/SignInForm/SignInForm.types';
import { User } from './types/user.types';

interface UserState {
  userInfo: User | undefined;
}

const initialState: UserState = {
  userInfo: undefined,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInUser: (state, { payload }: PayloadAction<LoginUserForm>) => {
      state.userInfo = { ...state.userInfo, email: payload.email, name: payload.email };
    },
    logOutUser: (state) => {
      state.userInfo = undefined;
    },
    signInUser: (state, { payload }: PayloadAction<SignInUserForm>) => {
      state.userInfo = { name: payload?.userName, email: payload.userEmail, description: payload.userDescription };
    },
  },
});

export const { logInUser, logOutUser, signInUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;