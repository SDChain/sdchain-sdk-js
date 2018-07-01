import {Method} from '../../Handler';
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

export interface Placeholder {
  address: string;
}

export interface Body {
  order: OrderItem;
  secret: string;
}

export interface Options {
  body: Body;
  placeholder: Placeholder;
}

class PostOrderItem extends Base {
  protected readonly path: string = `/accounts/orders/{address}`;
  protected readonly method: Method = 'post';

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    await this.validatePlaceholder(options.placeholder);
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<RawResponse>(url, {
      method: this.method.toUpperCase(),
      body: JSON.stringify(options.body)
    });
  }

}

export default PostOrderItem;
