import PaymentItem from '../../Type/PaymentItem';
import Base from '../Base';

export interface RawResponse {
  payments: PaymentItem[];
  success: boolean;
}

export interface Placeholder {
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
  placeholder: Placeholder;
  query?: Query;
}

class GetPaymentList extends Base {
  protected readonly path: string = `/accounts/payments/{address}`;

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    const defaultOptions = {query: {}};
    const targetOptions: Options = Object.assign({}, defaultOptions, options);
    await this.validatePlaceholder(targetOptions.placeholder);
    await this.validateRequestQuery(targetOptions.query);
    const url = service.getUrl(this.path, targetOptions.placeholder, targetOptions.query);
    return await service.fetch<RawResponse>(url, {method: this.method.toUpperCase()});
  }

}

export default GetPaymentList;
