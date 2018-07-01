import {Method} from '../../Handler';
import {PostOrderItemRequestBody, PostOrderItemResponseBody} from '../../Model';
import Base from '../Base';

export interface Placeholder {
  address: string;
}

export interface Options {
  body: PostOrderItemRequestBody;
  placeholder: Placeholder;
}

class PostOrderItem extends Base {
  protected readonly path: string = `/accounts/orders/{address}`;
  protected readonly method: Method = 'post';

  async fetch(options: Options): Promise<PostOrderItemResponseBody> {
    const service = this.service;
    await this.validatePlaceholder(options.placeholder);
    await this.validateRequestBody(options.body);
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<PostOrderItemResponseBody>(url, {
      method: this.method.toUpperCase(),
      body: JSON.stringify(options.body)
    });
  }

}

export default PostOrderItem;
