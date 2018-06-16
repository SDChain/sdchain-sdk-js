export interface Amount {
  currency: string;
  value: string;
  issuer: string;
}

export interface Effect {
  effect: string;
  type: string;
  seq: number;
  price: string;
  pair: string;
  amount: Amount;
}

interface TransactionItem {
  hash: string;
  ledger: string;
  state: string;
  date: string;
  type: string;
  fee: string;
  result: string;
  price: string;
  pair: string;
  amount: Amount;
  seq: number;
  offertype: string;
  effects: Effect[];
}

export default TransactionItem;
