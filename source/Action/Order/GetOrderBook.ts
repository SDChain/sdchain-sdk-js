import Amount from '../../Type/Amount';
import Base from '../Base';

export interface Book {
  order_maker: string;
  passive: false;
  price: Amount;
  sell: boolean;
  sequence: number;
  taker_gets_funded: Amount;
  taker_gets_total: Amount;
  taker_pays_funded: Amount;
  taker_pays_total: Amount;
}

export interface RawResponse {
  asks: Book[];
  bids: Book[];
  ledger: string;
  order_book: string;
  success: boolean;
  validated: boolean;
}

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

  async fetch(options: Options): Promise<RawResponse> {
    const service = this.service;
    const defaultOptions = {query: {}};
    const targetOptions: Options = Object.assign({}, defaultOptions, options);
    const url = service.getUrl(this.path, targetOptions.placeholder);
    return await service.fetch<RawResponse>(url, {method: this.method.toUpperCase()});
  }

}

export default GetOrderBook;
