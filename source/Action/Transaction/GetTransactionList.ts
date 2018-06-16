import TransactionItem from '../../Type/TransactionItem';
import Base from '../Base';

export interface Response {
  transactions: TransactionItem[];
  success: boolean;
}

export interface Transform {
  address: string;
}

export interface Query {
  type?: string;
  start_ledger?: number;
  end_ledger?: number;
  per_page?: number;
  page?: number;
}

export interface Options {
  query?: Query;
  transform: Transform;
}

class GetTransactionList extends Base {
  protected path: string = `accounts/transactions/{address}`;

  async fetch(options: Options): Promise<Response> {
    const service = this.service;
    const defaultOptions = {query: {}};
    const targetOptions: Options = Object.assign({}, defaultOptions, options);
    const url = service.getUrl(this.path, targetOptions.transform, targetOptions.query);
    return await service.fetch<Response>(url);
  }

}

export default GetTransactionList;
