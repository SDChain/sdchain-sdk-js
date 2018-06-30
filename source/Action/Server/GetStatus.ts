import Base from '../Base';

export type getStatus = 'syncing' | 'proposing';

export interface RawResponse {
  sdchaind_server_status: { complete_ledgers: string; server_state: getStatus; reserve_base_sda: number; };
  success: boolean;
}

class Status extends Base {
  protected readonly path: string = '/server';

  async fetch(): Promise<RawResponse> {
    const service = this.service;
    const url = service.getUrl(this.path);
    return await service.fetch<RawResponse>(url, {method: this.method.toUpperCase()});
  }

}

export default Status;
