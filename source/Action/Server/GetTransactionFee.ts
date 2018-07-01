import {GetTransactionFeeResponseBody} from '../../Model';
import Base from '../Base';

class GetTransactionFee extends Base {
  protected readonly path: string = '/transaction-fee';

  async fetch(): Promise<GetTransactionFeeResponseBody> {
    const service = this.service;
    const url = service.getUrl(this.path);
    return await service.fetch<GetTransactionFeeResponseBody>(url, {method: this.method.toUpperCase()});
  }

}

export default GetTransactionFee;
