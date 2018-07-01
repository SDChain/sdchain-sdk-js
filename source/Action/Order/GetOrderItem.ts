import Amount from '../../Type/Amount';
import OrderItem from '../../Type/OrderItem';
import Base from '../Base';

export interface Order extends OrderItem {
  account: string;
  fill_or_kill: boolean;
  immediate_or_cancel: boolean;
  passive: boolean;
  sequence: number;
}

export interface OrderChange {
  sequence: number;
  status: string;
  taker_gets: Amount;
  taker_pays: Amount;
}

export interface RawResponse {
  action: string;
  balance_changes: Amount[];
  direction: string;
  fee: string;
  hash: string;
  ledger: string;
  order: Order;
  order_changes: OrderChange[];
  success: boolean;
  timestamp: string;
  type: string;
  validated: boolean;
}

export interface Placeholder {
  address: string;
  hash: string;
}

export interface Options {
  placeholder: Placeholder;
}

class GetOrderItem extends Base {
  protected readonly path: string = `/accounts/orders/{address}/{hash}`;

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    await this.validatePlaceholder(options.placeholder);
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<RawResponse>(url, {method: this.method.toUpperCase()});
  }

}

export default GetOrderItem;
