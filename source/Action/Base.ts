import {Method} from '../Handler';
import ServiceInterface from '../Type/ServiceInterface';

export interface Search {
  [index: string]: any;
}

abstract class Base {
  protected abstract path: string;
  protected readonly method: Method = 'get';
  protected service: ServiceInterface;

  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(service: ServiceInterface) {
    this.service = service;
  }

  // noinspection JSMethodCanBeStatic
  async validateResponse(body: any) {
    const handler = this.service.handler;
    const schema = await handler.getResponseSchema(this.path, this.method);
    return await handler.validateModel(body, schema);
  }

  abstract async fetch(options?: object): Promise<object>;

}

export default Base;
