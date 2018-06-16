import Base from '../Base';

export interface RawResponse {
  fee: string;
  success: boolean;
}

class GetTransactionFee extends Base {
  protected path: string = 'transaction-fee';

  async fetch(): Promise<RawResponse> {
    const service = this.service;
    const url = service.getUrl(this.path);
    return await service.fetch<RawResponse>(url);
  }

}

export default GetTransactionFee;
