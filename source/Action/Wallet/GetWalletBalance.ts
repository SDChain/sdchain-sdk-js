import Amount from '../../Type/Amount';
import Base from '../Base';

export interface Response {
  balances: Amount[];
  ledger: number;
  success: boolean;
}

export interface Placeholder {
  address: string;
}

export interface Options {
  placeholder: Placeholder;
}

class GetWalletBalance extends Base {
  protected path: string = `accounts/balances/{address}`;

  async fetch(options: Options): Promise<Response> {
    const service = this.service;
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<Response>(url);
  }

}

export default GetWalletBalance;
