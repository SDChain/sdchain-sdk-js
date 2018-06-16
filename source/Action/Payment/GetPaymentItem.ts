import MemoItem from '../../Type/MemoItem';
import PaymentItem from '../../Type/PaymentItem';
import Base from '../Base';

export interface RawResponse extends PaymentItem {
  issuer: string;
  memos: MemoItem[];
  state: string;
  success: boolean;
}

export interface Transform {
  address: string;
  hash: string;
}

export interface Options {
  transform: Transform;
}

class GetPaymentItem extends Base {
  protected path: string = `accounts/payments/{address}/{hash}`;

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    const url = service.getUrl(this.path, options.transform);
    return await service.fetch<RawResponse>(url);
  }

}

export default GetPaymentItem;
