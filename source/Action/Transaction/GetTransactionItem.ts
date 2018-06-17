import TransactionItem from '../../Type/TransactionItem';
import Base from '../Base';

export interface Response {
  success: boolean;
  transaction: TransactionItem;
}

export interface Transform {
  address: string;
  hash: string;
}

export interface Options {
  transform: Transform;
}

class GetTransactionItem extends Base {
  protected path: string = `accounts/transactions/{address}/{hash}`;

  async fetch(options: Options): Promise<Response> {
    const service = this.service;
    const url = service.getUrl(this.path, options.transform);
    return await service.fetch<Response>(url);
  }

}

export default GetTransactionItem;
