import Base from '../Base';

export interface RawResponse {
  connected: boolean;
  success: boolean;
}

class GetConnected extends Base {
  protected path: string = 'server/connected';

  async fetch(): Promise<RawResponse> {
    const service = this.service;
    const url = service.getUrl(this.path);
    return await service.fetch<RawResponse>(url);
  }

}

export default GetConnected;
