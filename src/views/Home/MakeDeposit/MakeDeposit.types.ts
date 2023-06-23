export interface MakeDepositForm {
  to: string;
  amount: number;
}

export const MAKE_DEPOSIT_DEFAULT: MakeDepositForm = {
  to: '',
  amount: 0
};