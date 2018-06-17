import OrderItem from '../../Type/OrderItem';
import Base from '../Base';

export interface Order extends OrderItem {
  account: string;
  fee: string;
  sequence: number;
}

export interface RawResponse {
  hash: string;
  ledger: string;
  order: Order;
  state: string;
  success: boolean;
}

export interface Transform {
  address: string;
}

export interface Body {
  order: OrderItem;
  secret: string;
}

export interface Options {
  body: Body;
  transform: Transform;
}

class PostOrderItem extends Base {
  protected path: string = `accounts/orders/{address}`;

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    const url = service.getUrl(this.path, options.transform);
    return await service.fetch<RawResponse>(url, {
      method: 'POST',
      body: JSON.stringify(options.body)
    });
  }

}

export default PostOrderItem;
