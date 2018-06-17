import Base from '../Base';

export interface Response {
  success: boolean;
  wallet: { address: string; secret: string; };
}

class GetNewWallet extends Base {
  protected path: string = `wallet/new`;

  async fetch(): Promise<Response> {
    const service = this.service;
    const url = service.getUrl(this.path);
    return await service.fetch<Response>(url);
  }

}

export default GetNewWallet;
