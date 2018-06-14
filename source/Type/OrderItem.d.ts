import Amount from './Amount';

interface OrderItem {
  taker_gets: Amount;
  taker_pays: Amount;
  type: string;
}

export default OrderItem;
