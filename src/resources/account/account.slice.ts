import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import type { RootState } from '../../config/redux/store';
import { Transaction } from './types/account.types';

interface AccountState {
  balance: number;
  loadingBalance: boolean;
  transactions: Transaction[];
  emitingTransaction: boolean;
}

const initialState: AccountState = {
  balance: 0,
  loadingBalance: false,
  transactions: [],
  emitingTransaction: false,
};

export const getUserBalance = createAsyncThunk(
  'account/getBalance',
  async (userEmail: string) => {
    const response: { balance: number; userEmail: string; } = await new Promise((res) => {
      return setTimeout(() => {
        res({ balance: 2000, userEmail });
      }, 200);
    });

    return response;
  }
);

export const emitDeposit = createAsyncThunk(
  'account/emitDeposit',
  async (args: { amount: number; to: string; }) => {
    const response: {
      amount: number;
      to: string;
    } = await new Promise((res) => {
      return setTimeout(() => {
        res(args);
      }, 200);
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
      }, 200);
    });

    return response;
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserBalance.pending, (state) => {
      state.loadingBalance = true;
    });
    builder.addCase(getUserBalance.fulfilled, (state, { payload }) => {
      state.loadingBalance = false;
      state.balance = payload.balance;
    });
    builder.addCase(getUserBalance.rejected, (state) => {
      state.loadingBalance = false;
    });
    builder.addCase(emitTransaction.pending, (state) => {
      state.emitingTransaction = true;
    });
    builder.addCase(emitDeposit.fulfilled, (state, { payload }) => {
      state.emitingTransaction = false;
      state.transactions.push({ ...payload, id: uuidv4(), operationDate: new Date() });
    });
    builder.addCase(emitDeposit.rejected, (state) => {
      state.emitingTransaction = false;
    });
    builder.addCase(emitDeposit.pending, (state) => {
      state.emitingTransaction = true;
    });
    builder.addCase(emitTransaction.fulfilled, (state, { payload }) => {
      state.emitingTransaction = false;
      state.transactions.push({ ...payload, id: uuidv4(), operationDate: new Date() });
    });
    builder.addCase(emitTransaction.rejected, (state) => {
      state.emitingTransaction = false;
    });
  }
});

export const selectAccount = (state: RootState) => state.account;

export default accountSlice.reducer;