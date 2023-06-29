export interface Transaction {
  id: string;
  amount: number;
  from?: string;
  to: string;
  operationDate: number;
};

export interface Account {
  userEmail: string;
  balance: number;
}