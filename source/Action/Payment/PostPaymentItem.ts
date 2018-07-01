import {Method} from '../../Handler';
import MemoItem from '../../Type/MemoItem';
import Base from '../Base';

export interface RawResponse {
  hash: string;
  status_url: string;
  success: boolean;
}

export interface Placeholder {
  address: string;
}

export interface Query {
  submit?: boolean;
}

export interface Body {
  payment: { source_account: string; destination_account: string; amount: string; memos: MemoItem[]; };
  secret: string;
}

export interface Options {
  body: Body;
  placeholder: Placeholder;
  query: Query;
}

class PostPaymentItem extends Base {
  protected readonly path: string = `/accounts/payments/{address}`;
  protected readonly method: Method = 'post';

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    await this.validatePlaceholder(options.placeholder);
    await this.validateRequestQuery(options.query);
    const url = service.getUrl(this.path, options.placeholder, options.query);
    return await service.fetch<RawResponse>(url, {
      method: this.method.toUpperCase(),
      body: JSON.stringify(options.body)
    });
  }

}

export default PostPaymentItem;
