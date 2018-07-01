import {Method} from '../../Handler';
import Base from '../Base';

export interface Order {
  account: string;
  fee: string;
  offer_sequence: string;
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
  hash: number;
}

export interface Body {
  secret: string;
}

export interface Options {
  body: Body;
  placeholder: Placeholder;
}

class DeleteOrderItem extends Base {
  protected readonly path: string = `/accounts/orders/{address}/{hash}`;
  protected readonly method: Method = 'delete';

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<RawResponse>(url, {
      method: this.method.toUpperCase(),
      body: JSON.stringify(options.body)
    });
  }

}

export default DeleteOrderItem;
