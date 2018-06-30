import {RequestInit} from 'node-fetch';
import Handler from '../Handler';

export interface Mapper {
  [index: string]: any;
}

interface ServiceInterface {
  readonly url: string;
  readonly version: string;
  readonly handler: Handler;

  fetch<T>(url: string, init?: RequestInit): Promise<T>;

  getUrl(path?: string, transform?: Mapper, query?: Mapper): string;
}

export default ServiceInterface;
