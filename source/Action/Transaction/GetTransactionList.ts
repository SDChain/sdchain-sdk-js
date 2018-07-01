import {GetTransactionListResponseBody} from '../../Model';
import Base from '../Base';

export interface Placeholder {
  address: string;
}

export interface Query {
  end_ledger?: number;
  page?: number;
  per_page?: number;
  start_ledger?: number;
  type?: string;
}

export interface Options {
  placeholder: Placeholder;
  query?: Query;
}

class GetTransactionList extends Base {
  protected readonly path: string = `/accounts/transactions/{address}`;

  async fetch(options: Options): Promise<GetTransactionListResponseBody> {
    const service = this.service;
    const defaultOptions = {query: {}};
    const targetOptions: Options = Object.assign({}, defaultOptions, options);
    await this.validatePlaceholder(targetOptions.placeholder);
    await this.validateRequestQuery(targetOptions.query);
    const url = service.getUrl(this.path, targetOptions.placeholder, targetOptions.query);
    return await service.fetch<GetTransactionListResponseBody>(url, {method: this.method.toUpperCase()});
  }

}

export default GetTransactionList;
