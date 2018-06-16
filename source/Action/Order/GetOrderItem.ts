import Amount from '../../Type/Amount';
import OrderItem from '../../Type/OrderItem';
import Base from '../Base';

export interface Order extends OrderItem {
  account: string;
  passive: boolean;
  immediate_or_cancel: boolean;
  fill_or_kill: boolean;
  sequence: number;
}

export interface OrderChange {
  taker_pays: Amount;
  taker_gets: Amount;
  sequence: number;
  status: string;
}

export interface RawResponse {
  hash: string;
  ledger: string;
  validated: boolean;
  timestamp: string;
  fee: string;
  action: string;
  type: string;
  direction: string;
  order: Order;
  balance_changes: Amount[];
  order_changes: OrderChange[];
  success: boolean;
}

export interface Transform {
  address: string;
  hash: string;
}

export interface Options {
  transform: Transform;
}

class GetOrderItem extends Base {
  protected path: string = `accounts/orders/{address}/{hash}`;

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    const url = service.getUrl(this.path, options.transform);
    return await service.fetch<RawResponse>(url);
  }

}

export default GetOrderItem;
