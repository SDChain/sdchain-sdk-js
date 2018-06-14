import OrderItem from '../../Type/OrderItem';
import Base from '../Base';

export interface Order extends OrderItem {
  passive: boolean;
  sequence: number;
}

export interface Response {
  orders: Order[];
  success: boolean;
  validated: boolean;
}

export interface Transform {
  address: string;
}

export interface Query {
  ledger?: string;
  limit?: number;
  marker?: string;
}

export interface Options {
  query?: Query;
  transform: Transform;
}

class GetOrderList extends Base {
  protected path: string = `accounts/orders/{address}`;

  async fetch(options: Options): Promise<Response> {
    const service = this.service;
    const defaultOptions = {query: {}};
    const targetOptions: Options = Object.assign({}, defaultOptions, options);
    const url = service.getUrl(this.path, targetOptions.transform, targetOptions.query);
    return await service.fetch<Response>(url);
  }

}

export default GetOrderList;