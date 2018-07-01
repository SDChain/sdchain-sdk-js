import {GetPaymentItemResponseBody} from '../../Model';
import Base from '../Base';

export interface Placeholder {
  address: string;
  hash: string;
}

export interface Options {
  placeholder: Placeholder;
}

class GetPaymentItem extends Base {
  protected readonly path: string = `/accounts/payments/{address}/{hash}`;

  async fetch(options: Options): Promise<GetPaymentItemResponseBody> {
    const service = this.service;
    await this.validatePlaceholder(options.placeholder);
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<GetPaymentItemResponseBody>(url, {method: this.method.toUpperCase()});
  }

}

export default GetPaymentItem;
