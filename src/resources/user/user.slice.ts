import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../config/redux/store';
import { User } from './types/user.types';

interface UserState {
  user: User | undefined;
}

const initialState: UserState = {
  user: undefined,
};

const fakeUser: User = {
  name: 'test',
  email: 'test@test.com',
  description: 'test',
  profileImageKey: 'test'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logInUser: (state) => {
      state.user = fakeUser;
    },
    logOutUser: (state) => {
      state.user = undefined;
    },
    signInUser: (state) => {
      state.user = fakeUser;
    },
  },
});

export const { logInUser, logOutUser, signInUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;