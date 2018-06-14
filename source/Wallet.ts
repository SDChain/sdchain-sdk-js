import DeleteOrderItem from './Action/Order/DeleteOrderItem';
import GetOrderItem from './Action/Order/GetOrderItem';
import GetOrderList from './Action/Order/GetOrderList';
import PostOrderItem from './Action/Order/PostOrderItem';
import GetPaymentItem from './Action/Payment/GetPaymentItem';
import GetPaymentList from './Action/Payment/GetPaymentList';
import PostPaymentItem from './Action/Payment/PostPaymentItem';
import Amount from './Type/Amount';
import MemoItem from './Type/MemoItem';
import ServiceInterface from './Type/ServiceInterface';

class Wallet {
  static readonly ORDER_TYPE_BUY = 'buy';
  static readonly ORDER_TYPE_SELL = 'sell';

  protected service: ServiceInterface;

  constructor(service: ServiceInterface) {
    this.service = service;
  }

  async deleteOrder(secret: string, address: string, sequence: number) {
    const options = {
      transform: {
        address,
        sequence
      },
      body: {secret}
    };

    return await new DeleteOrderItem(this.service).fetch(options);
  }

  static getBalance(address: string) {
  }

  async getOrderInfo(address: string, hash: string) {
    const options = {
      transform: {
        address,
        hash
      }
    };

    return await new GetOrderItem(this.service).fetch(options);
  }

  async getOrderList(address: string) {
    const options = {
      transform: {address}
    };

    const result = await new GetOrderList(this.service).fetch(options);
    return result.orders;
  }

  async getPaymentInfo(address: string, hash: string) {
    const options = {
      transform: {
        address,
        hash
      }
    };

    return await new GetPaymentItem(this.service).fetch(options);
  }

  async getPaymentList(address: string, query: object) {
    const options = {
      transform: {address},
      query
    };

    const data = await new GetPaymentList(this.service).fetch(options);
    return data.payments;
  }

  static getTransactionInfo(address: string, hash: string) {
  }

  static getTransactionList(address: string, opts: object) {
  }

  static newWallet() {
  }

  async submitOrder(secret: string, address: string, baseAmount: Amount, counterAmount: Amount, isBuy: boolean) {
    const amount: Amount = {
      currency: '',
      counterparty: '',
      value: ''
    };

    const options = {
      transform: {address},
      body: {
        secret,
        order: {
          type: '',
          taker_pays: amount,
          taker_gets: amount
        }
      }
    };

    const order = options.body.order;

    if (isBuy) {
      order.type = 'buy';
      order.taker_pays = baseAmount;
      order.taker_gets = counterAmount;
    } else {
      order.type = 'sell';
      order.taker_pays = counterAmount;
      order.taker_gets = baseAmount;
    }

    return await new PostOrderItem(this.service).fetch(options);
  }

  async submitPayment(secret: string, sourceAddress: string, destAddress: string, amount: string, memo?: MemoItem) {
    const memos = (memo) ? [memo] : [];
    const options = {
      transform: {source_address: sourceAddress},
      query: {submit: true},
      body: {
        secret,
        payment: {
          source_account: sourceAddress,
          destination_account: destAddress,
          amount,
          memos
        }
      }
    };

    return await new PostPaymentItem(this.service).fetch(options);
  }
}

export default Wallet;
