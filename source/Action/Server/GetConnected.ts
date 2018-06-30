import Base from '../Base';

export interface RawResponse {
  connected: boolean;
  success: boolean;
}

class GetConnected extends Base {
  protected readonly path: string = '/server/connected';

  async fetch(): Promise<RawResponse> {
    const service = this.service;
    const url = service.getUrl(this.path);
    return await service.fetch<RawResponse>(url, {method: this.method.toUpperCase()});
  }

}

export default GetConnected;
