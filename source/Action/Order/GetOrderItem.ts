import {GetOrderItemResponseBody} from '../../Model';
import Base from '../Base';

export interface Placeholder {
  address: string;
  hash: string;
}

export interface Options {
  placeholder: Placeholder;
}

class GetOrderItem extends Base {
  protected readonly path: string = `/accounts/orders/{address}/{hash}`;

  async fetch(options: Options): Promise<GetOrderItemResponseBody> {
    const service = this.service;
    await this.validatePlaceholder(options.placeholder);
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<GetOrderItemResponseBody>(url, {method: this.method.toUpperCase()});
  }

}

export default GetOrderItem;
