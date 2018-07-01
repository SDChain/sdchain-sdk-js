import TransactionItem from '../../Type/TransactionItem';
import Base from '../Base';

export interface Response {
  success: boolean;
  transaction: TransactionItem;
}

export interface Placeholder {
  address: string;
  hash: string;
}

export interface Options {
  placeholder: Placeholder;
}

class GetTransactionItem extends Base {
  protected readonly path: string = `/accounts/transactions/{address}/{hash}`;

  async fetch(options: Options): Promise<Response> {
    const service = this.service;
    await this.validatePlaceholder(options.placeholder);
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<Response>(url, {method: this.method.toUpperCase()});
  }

}

export default GetTransactionItem;
