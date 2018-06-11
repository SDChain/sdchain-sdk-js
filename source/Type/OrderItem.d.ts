import Taker from './Taker';

interface OrderItem {
  taker_gets: Taker;
  taker_pays: Taker;
  type: string;
}

export default OrderItem;
