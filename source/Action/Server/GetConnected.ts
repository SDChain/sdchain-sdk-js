import Base from '../Base';

export interface Response {
  connected: boolean;
  success: boolean;
}

class GetConnected extends Base {
  protected path: string = 'server/connected';

  async fetch(): Promise<Response> {
    const service = this.service;
    const url = service.getUrl(this.path);
    return await service.fetch<Response>(url);
  }

}

export default GetConnected;
