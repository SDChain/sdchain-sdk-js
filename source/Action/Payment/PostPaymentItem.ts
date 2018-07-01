import {Method} from '../../Handler';
import {PostPaymentItemRequestBody, PostPaymentItemResponseBody} from '../../Model';
import Base from '../Base';

export interface Placeholder {
  address: string;
}

export interface Query {
  submit?: boolean;
}

export interface Options {
  body: PostPaymentItemRequestBody;
  placeholder: Placeholder;
  query: Query;
}

class PostPaymentItem extends Base {
  protected readonly path: string = `/accounts/payments/{address}`;
  protected readonly method: Method = 'post';

  async fetch(options: Options): Promise<PostPaymentItemResponseBody> {
    const service = this.service;
    await this.validatePlaceholder(options.placeholder);
    await this.validateRequestQuery(options.query);
    await this.validateRequestBody(options.body);
    const url = service.getUrl(this.path, options.placeholder, options.query);
    return await service.fetch<PostPaymentItemResponseBody>(url, {
      method: this.method.toUpperCase(),
      body: JSON.stringify(options.body)
    });
  }

}

export default PostPaymentItem;
