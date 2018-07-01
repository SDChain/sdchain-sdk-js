import {Method} from '../../Handler';
import {DeleteOrderItemResponseBody} from '../../Model';
import Base from '../Base';

export interface Placeholder {
  address: string;
  hash: number;
}

export interface Body {
  secret: string;
}

export interface Options {
  body: Body;
  placeholder: Placeholder;
}

class DeleteOrderItem extends Base {
  protected readonly path: string = `/accounts/orders/{address}/{hash}`;
  protected readonly method: Method = 'delete';

  async fetch(options: Options): Promise<DeleteOrderItemResponseBody> {
    const service = this.service;
    await this.validatePlaceholder(options.placeholder);
    await this.validateRequestQuery(options.body);
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<DeleteOrderItemResponseBody>(url, {
      method: this.method.toUpperCase(),
      body: JSON.stringify(options.body)
    });
  }

}

export default DeleteOrderItem;
