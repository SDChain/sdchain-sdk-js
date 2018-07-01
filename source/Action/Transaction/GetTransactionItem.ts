import {GetTransactionItemResponseBody} from '../../Model';
import Base from '../Base';

export interface Placeholder {
  address: string;
  hash: string;
}

export interface Options {
  placeholder: Placeholder;
}

class GetTransactionItem extends Base {
  protected readonly path: string = `/accounts/transactions/{address}/{hash}`;

  async fetch(options: Options): Promise<GetTransactionItemResponseBody> {
    const service = this.service;
    await this.validatePlaceholder(options.placeholder);
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<GetTransactionItemResponseBody>(url, {method: this.method.toUpperCase()});
  }

}

export default GetTransactionItem;
