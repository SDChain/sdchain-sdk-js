import Base from '../Base';

export interface Order {
  account: string;
  fee: string;
  offer_sequence: string;
  sequence: number;
}

export interface Response {
  order: Order;
  hash: string;
  ledger: string;
  state: string;
  success: boolean;
}

export interface Transform {
  address: string;
  sequence: number;
}

export interface Body {
  secret: string;
}

export interface Options {
  body: Body;
  transform: Transform;
}

class DeleteOrderItem extends Base {
  protected path: string = `accounts/orders/{address}/{sequence}`;

  async fetch(options: Options): Promise<Response> {
    const service = this.service;
    const url = service.getUrl(this.path, options.transform);
    return await service.fetch<Response>(url, {
      method: 'DELETE',
      body: JSON.stringify(options.body)
    });
  }

}

export default DeleteOrderItem;
