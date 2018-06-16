export type direction = 'incoming' | 'outgoing';

interface PaymentItem {
  amount: { currency: string; value: string; issuer: string; };
  destination_account: string;
  direction: direction;
  fee: string;
  hash: string;
  ledger: string;
  source_account: string;
  timestamp: string;
}

export default PaymentItem;
