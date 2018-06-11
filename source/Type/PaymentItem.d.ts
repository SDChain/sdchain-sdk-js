import {Decimal} from 'decimal.js';

export type direction = 'incoming' | 'outgoing';

interface PaymentItem {
  amount: { currency: string; value: string; issuer: string; };
  destination_account: string;
  direction: direction;
  fee: Decimal;
  hash: string;
  ledger: string;
  source_account: string;
  timestamp: number;
}

export default PaymentItem;
