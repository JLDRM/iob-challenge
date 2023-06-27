export interface EmitTransactionForm {
  to: string;
  from: string | undefined;
  amount: number;
}

export const EMIT_TRANSACTION_DEFAULT: EmitTransactionForm = {
  to: '',
  from: '',
  amount: 0
};