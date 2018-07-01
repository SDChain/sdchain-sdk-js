import MemoItem from '../../Type/MemoItem';
import PaymentItem from '../../Type/PaymentItem';
import Base from '../Base';

export interface RawResponse extends PaymentItem {
  currency: string;
  issuer: string;
  memos: MemoItem[];
  state: string;
  success: boolean;
}

export interface Placeholder {
  address: string;
  hash: string;
}

export interface Options {
  placeholder: Placeholder;
}

class GetPaymentItem extends Base {
  protected readonly path: string = `/accounts/payments/{address}/{hash}`;

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    await this.validatePlaceholder(options.placeholder);
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<RawResponse>(url, {method: this.method.toUpperCase()});
  }

}

export default GetPaymentItem;
