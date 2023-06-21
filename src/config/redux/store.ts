import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../resources/user/user.slice';
import accountReducer from '../../resources/account/account.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    account: accountReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;