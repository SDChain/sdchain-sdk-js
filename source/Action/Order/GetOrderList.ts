import OrderItem from '../../Type/OrderItem';
import Base from '../Base';

export interface Order extends OrderItem {
  passive: boolean;
  sequence: number;
}

export interface RawResponse {
  orders: Order[];
  success: boolean;
  validated: boolean;
}

export interface Placeholder {
  address: string;
}

export interface Query {
  ledger?: string;
  limit?: number;
  marker?: string;
}

export interface Options {
  placeholder: Placeholder;
  query?: Query;
}

class GetOrderList extends Base {
  protected path: string = `accounts/orders/{address}`;

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    const defaultOptions = {query: {}};
    const targetOptions: Options = Object.assign({}, defaultOptions, options);
    const url = service.getUrl(this.path, targetOptions.placeholder, targetOptions.query);
    return await service.fetch<RawResponse>(url);
  }

}

export default GetOrderList;
