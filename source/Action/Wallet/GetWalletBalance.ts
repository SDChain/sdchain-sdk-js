import {GetWalletBalanceReponseBody} from '../../Model';
import Base from '../Base';

export interface Placeholder {
  address: string;
}

export interface Options {
  placeholder: Placeholder;
}

class GetWalletBalance extends Base {
  protected readonly path: string = `/accounts/balances/{address}`;

  async fetch(options: Options): Promise<GetWalletBalanceReponseBody> {
    const service = this.service;
    await this.validatePlaceholder(options.placeholder);
    const url = service.getUrl(this.path, options.placeholder);
    return await service.fetch<GetWalletBalanceReponseBody>(url, {method: this.method.toUpperCase()});
  }

}

export default GetWalletBalance;
