import OrderItem from '../../Type/OrderItem';
import Base from '../Base';

export interface Order extends OrderItem {
  account: string;
  fee: string;
  sequence: number;
}

export interface RawResponse {
  order: Order;
  hash: string;
  ledger: string;
  state: string;
  success: boolean;
}

export interface Transform {
  address: string;
}

export interface Body {
  secret: string;
  order: OrderItem;
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
