import TransactionItem from '../../Type/TransactionItem';
import Base from '../Base';

export interface Response {
  success: boolean;
  transactions: TransactionItem[];
}

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
  protected path: string = `accounts/transactions/{address}`;

  async fetch(options: Options): Promise<Response> {
    const service = this.service;
    const defaultOptions = {query: {}};
    const targetOptions: Options = Object.assign({}, defaultOptions, options);
    const url = service.getUrl(this.path, targetOptions.placeholder, targetOptions.query);
    return await service.fetch<Response>(url);
  }

}

export default GetTransactionList;
