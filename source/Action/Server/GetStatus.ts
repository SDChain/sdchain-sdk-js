import Base from '../Base';

export type getStatus = 'syncing' | 'proposing';

export interface Response {
  sdchaind_server_status: { complete_ledgers: string; server_state: getStatus; reserve_base_sda: number; };
  success: boolean;
}

class Status extends Base {
  protected path: string = 'server';

  async fetch(): Promise<Response> {
    const service = this.service;
    const url = service.getUrl(this.path);
    return await service.fetch<Response>(url);
  }

}

export default Status;
