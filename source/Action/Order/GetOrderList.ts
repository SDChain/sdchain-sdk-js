import {GetOrderListResponseBody} from '../../Model';
import Base from '../Base';

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
  protected readonly path: string = `/accounts/orders/{address}`;

  async fetch(options: Options): Promise<GetOrderListResponseBody> {
    const service = this.service;
    const defaultOptions = {query: {}};
    const targetOptions: Options = Object.assign({}, defaultOptions, options);

    await this.validatePlaceholder(targetOptions.placeholder);
    await this.validateRequestQuery(targetOptions.query);
    const url = service.getUrl(this.path, targetOptions.placeholder, targetOptions.query);
    return await service.fetch<GetOrderListResponseBody>(url, {method: this.method.toUpperCase()});
  }

}

export default GetOrderList;
