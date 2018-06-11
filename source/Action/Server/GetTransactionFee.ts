import {Decimal} from 'decimal.js';
import Base from '../Base';

export interface Response {
  fee: Decimal;
  success: boolean;
}

class GetTransactionFee extends Base {
  protected path: string = 'transaction-fee';

  async fetch(): Promise<Response> {
    const service = this.service;
    const url = service.getUrl(this.path);
    const data = await service.fetch<Response>(url);
    return this.convert(data);
  }

  // noinspection JSMethodCanBeStatic
  protected convert(data: Response): Response {
    const fee: string = <any>data.fee;
    data.fee = new Decimal(fee);
    return data;
  }

}

export default GetTransactionFee;
