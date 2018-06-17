export interface Amount {
  currency: string;
  issuer: string;
  value: string;
}

export interface Effect {
  amount: Amount;
  effect: string;
  pair: string;
  price: string;
  seq: number;
  type: string;
}

interface TransactionItem {
  amount: Amount;
  date: string;
  effects: Effect[];
  fee: string;
  hash: string;
  ledger: string;
  offertype: string;
  pair: string;
  price: string;
  result: string;
  seq: number;
  state: string;
  type: string;
}

export default TransactionItem;
