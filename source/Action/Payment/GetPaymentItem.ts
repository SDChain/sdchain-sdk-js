import {Decimal} from 'decimal.js';
import MemoItem from '../../Type/MemoItem';
import PaymentItem from '../../Type/PaymentItem';
import Base from '../Base';

export interface Response extends PaymentItem {
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

  async fetch(options: Options): Promise<Response> {
    const service = this.service;
    const url = service.getUrl(this.path, options.transform);
    const data = await service.fetch<Response>(url);
    return this.convert(data);
  }

  // noinspection JSMethodCanBeStatic
  protected convert(data: Response): Response {
    const timestamp: string = <any>data.timestamp;
    const fee: string = <any>data.fee;

    data.timestamp = new Date(timestamp).valueOf();
    data.fee = new Decimal(fee);
    return data;
  }

}

export default GetPaymentItem;
