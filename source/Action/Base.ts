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
  async validateResponseBody(test: any) {
    const handler = this.service.handler;
    const body = await handler.getResponseBody(this.path, this.method);
    const schema = body ? body : '';
    return await handler.validateModel(test, schema);
  }

  async validatePlaceholder(test: any) {
    const result = await this.service.handler.validatePlaceholder(test, this.path);

    if (0 < result.errors.length) {
      throw new Error(result.humanReadable().toString());
    }
  }

  async validateRequestQuery(test: any) {
    const result = await this.service.handler.validateRequestQuery(test, this.path, this.method);

    if (0 < result.errors.length) {
      throw new Error(result.humanReadable().toString());
    }
  }

  abstract async fetch(options?: object): Promise<object>;

}

export default Base;
