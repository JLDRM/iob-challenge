import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../../resources/users/users.slice';
import accountsReducer from '../../resources/accounts/accounts.slice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    accounts: accountsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;