import Amount from '../../Type/Amount';
import Base from '../Base';

export interface Response {
  ledger: number;
  balances: Amount[];
  success: boolean;
}

export interface Transform {
  address: string;
}

export interface Options {
  transform: Transform;
}

class GetWalletBalance extends Base {
  protected path: string = `accounts/balances/{address}`;

  async fetch(options: Options): Promise<Response> {
    const service = this.service;
    const url = service.getUrl(this.path, options.transform);
    return await service.fetch<Response>(url);
  }

}

export default GetWalletBalance;
