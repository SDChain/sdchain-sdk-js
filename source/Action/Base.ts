import ServiceInterface from '../Type/ServiceInterface';

export interface Search {
  [index: string]: any;
}

abstract class Base {
  protected abstract path: string;
  protected service: ServiceInterface;

  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(service: ServiceInterface) {
    this.service = service;
  }

  abstract async fetch(options?: object): Promise<object>;

}

export default Base;
