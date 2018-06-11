import {Decimal} from 'decimal.js';
import PaymentItem from '../../Type/PaymentItem';
import Base from '../Base';

export interface Response {
  payments: PaymentItem[];
  success: boolean;
}

export interface Transform {
  address: string;
}

export interface Query {
  destination_account?: string;
  direction?: string;
  end_ledger?: number;
  page?: number;
  per_page?: number;
  source_account?: string;
  start_ledger?: number;
}

export interface Options {
  query?: Query;
  transform: Transform;
}

class GetPaymentList extends Base {
  protected path: string = `accounts/payments/{address}`;

  async fetch(options: Options): Promise<Response> {
    const service = this.service;
    const defaultOptions = {query: {}};
    const targetOptions: Options = Object.assign({}, defaultOptions, options);
    const url = service.getUrl(this.path, targetOptions.transform, targetOptions.query);
    const data = await service.fetch<Response>(url);
    return this.convert(data);
  }

  protected convert(data: Response): Response {
    data.payments.forEach(item => {
      const timestamp: string = <any>item.timestamp;
      const fee: string = <any>item.fee;

      item.timestamp = new Date(timestamp).valueOf();
      item.fee = new Decimal(fee);
    });

    return data;
  }

}

export default GetPaymentList;
