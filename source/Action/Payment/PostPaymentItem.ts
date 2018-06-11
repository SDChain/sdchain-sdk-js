import MemoItem from '../../Type/MemoItem';
import Base from '../Base';

export interface Response {
  hash: string;
  status_url: string;
  success: boolean;
}

export interface Transform {
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
  query: Query;
  transform: Transform;
}

class PostPaymentItem extends Base {
  protected path: string = `accounts/payments/{source_address}`;

  async fetch(options: Options): Promise<Response> {
    const service = this.service;
    const url = service.getUrl(this.path, options.transform, options.query);
    return await service.fetch<Response>(url, {
      method: 'POST',
      body: JSON.stringify(options.body)
    });
  }

}

export default PostPaymentItem;
