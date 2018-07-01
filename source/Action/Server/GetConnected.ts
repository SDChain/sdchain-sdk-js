import {GetConnectedResponseBody} from '../../Model';
import Base from '../Base';

class GetConnected extends Base {
  protected readonly path: string = '/server/connected';

  async fetch(): Promise<GetConnectedResponseBody> {
    const service = this.service;
    const url = service.getUrl(this.path);
    return await service.fetch<GetConnectedResponseBody>(url, {method: this.method.toUpperCase()});
  }

}

export default GetConnected;
