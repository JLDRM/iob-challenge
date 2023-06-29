import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { RootState } from '../../config/redux/store';
import { Account, Transaction } from './types/accounts.types';

interface AccountsState {
  accounts: Account[];
  transactions: Transaction[];
  emitingTransaction: boolean;
}

const initialState: AccountsState = {
  accounts: [],
  transactions: [],
  emitingTransaction: false,
};

export const emitDeposit = createAsyncThunk(
  'account/emitDeposit',
  async (args: { amount: number; to: string; }) => {
    const response: {
      amount: number;
      to: string;
    } = await new Promise((res) => {
      return setTimeout(() => {
        res(args);
      }, 500);
    });

    return response;
  }
);

export const emitTransaction = createAsyncThunk(
  'account/emitTransaction',
  async (args: { amount: number, from: string, to: string; }) => {
    const response: { amount: number, from: string, to: string; } = await new Promise((res) => {
      return setTimeout(() => {
        res(args);
      }, 500);
    });

    return response;
  }
);

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    createAccount: (state, { payload }: PayloadAction<{ email: string; }>) => {
      state.accounts.push({ userEmail: payload.email, balance: 0 });
    },
    resetAccountsState: () => {
      return { ...initialState };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(emitDeposit.pending, (state) => {
      state.emitingTransaction = true;
    });
    builder.addCase(emitDeposit.fulfilled, (state, { payload }) => {
      state.emitingTransaction = false;
      state.transactions.push({ ...payload, id: uuidv4(), operationDate: Date.now() });
      state.accounts.forEach((account: Account) => {
        if (account.userEmail.toLowerCase() === payload.to.toLowerCase())
          account.balance += payload.amount;
      });
    });
    builder.addCase(emitDeposit.rejected, (state) => {
      state.emitingTransaction = false;
    });
    builder.addCase(emitTransaction.pending, (state) => {
      state.emitingTransaction = true;
    });
    builder.addCase(emitTransaction.fulfilled, (state, { payload }) => {
      state.emitingTransaction = false;
      state.transactions.push({ ...payload, id: uuidv4(), operationDate: Date.now() });
      state.accounts.forEach((account: Account) => {
        if (account.userEmail.toLowerCase() === payload.from.toLowerCase())
          account.balance -= payload.amount;
        if (account.userEmail.toLowerCase() === payload.to.toLowerCase())
          account.balance += payload.amount;
      });
    });
    builder.addCase(emitTransaction.rejected, (state) => {
      state.emitingTransaction = false;
    });
  }
});


export const selectAccount = (state: RootState) => state.accounts;

export const { createAccount, resetAccountsState } = accountsSlice.actions;

export default accountsSlice.reducer;