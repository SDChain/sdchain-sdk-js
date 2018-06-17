import MemoItem from '../../Type/MemoItem';
import Base from '../Base';

export interface RawResponse {
  hash: string;
  status_url: string;
  success: boolean;
}

export interface Placeholder {
  source_address: string;
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
  protected path: string = `accounts/payments/{source_address}`;

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    const url = service.getUrl(this.path, options.placeholder, options.query);
    return await service.fetch<RawResponse>(url, {
      method: 'POST',
      body: JSON.stringify(options.body)
    });
  }

}

export default PostPaymentItem;
