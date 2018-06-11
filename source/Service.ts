import fetch, {RequestInit} from 'node-fetch';
import URI from 'urijs';
import ErrorResponse from './Type/ErrorResponse';
import ServiceInterface, {Mapper} from './Type/ServiceInterface';

// hook URI.expand
require('urijs/src/URITemplate');

class Service implements ServiceInterface {
  readonly url: string;
  readonly version: string;

  constructor(url: string, version: string) {
    this.url = url;
    this.version = version;
  }

  async fetch<T>(url: string, init?: RequestInit): Promise<T> {
    // noinspection FunctionWithMultipleReturnPointsJS
    return await fetch(url, init)
      .then(async response => {
        if (false === response.ok) {
          //  Todo: Request Error
          throw new Error(response.statusText);
        }

        const json = await response.json();

        if (json['success']) {
          return <T>json;
        }

        //  Todo: Response Error
        throw <ErrorResponse>json;
      });
  }

  getUrl(path: string = '', transform: Mapper = {}, query: Mapper = {}) {
    const template = `${this.url}/${this.version}/${path}`;
    return URI.expand(template, transform).setQuery(query).normalize().valueOf();
  }

  protected setMapper(items: Mapper, setter: (key: string, value: string) => void) {
    Object.keys(items).forEach(key => {
      const value = String(items[key]);
      setter(key, value);
    });
  }

}

export default Service;
