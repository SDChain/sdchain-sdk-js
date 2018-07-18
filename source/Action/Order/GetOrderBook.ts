import {GetOrderBookResponseBody} from '../../Model';
import Base from '../Base';

export interface Placeholder {
  base: string;
  counter: string;
}

export interface Query {
  limit?: number;
}

export interface Options {
  placeholder: Placeholder;
  query?: Query;
}

class GetOrderBook extends Base {
  protected readonly path: string = `/order_book/{base}/{counter}`;

  async fetch(options: Options): Promise<GetOrderBookResponseBody> {
    const service = this.service;
    const defaultOptions = {query: {}};
    const targetOptions: Options = Object.assign({}, defaultOptions, options);
    await this.validatePlaceholder(targetOptions.placeholder);
    await this.validateRequestQuery(targetOptions.query);
    const url = service.getUrl(this.path, targetOptions.placeholder);
    return await service.fetch<GetOrderBookResponseBody>(url, {method: this.method.toUpperCase()});
  }

}

export default GetOrderBook;
