import {GetStatusResponseBody} from '../../Model';
import Base from '../Base';

class Status extends Base {
  protected readonly path: string = '/server';

  async fetch(): Promise<GetStatusResponseBody> {
    const service = this.service;
    const url = service.getUrl(this.path);
    return await service.fetch<GetStatusResponseBody>(url, {method: this.method.toUpperCase()});
  }

}

export default Status;
