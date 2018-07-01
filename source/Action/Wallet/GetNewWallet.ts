import {GetNewWalletResponseBody} from '../../Model';
import Base from '../Base';

class GetNewWallet extends Base {
  protected readonly path: string = `/wallet/new`;

  async fetch(): Promise<GetNewWalletResponseBody> {
    const service = this.service;
    const url = service.getUrl(this.path);
    return await service.fetch<GetNewWalletResponseBody>(url, {method: this.method.toUpperCase()});
  }

}

export default GetNewWallet;
