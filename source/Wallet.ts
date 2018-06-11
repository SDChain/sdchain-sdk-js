import GetPaymentItem from './Action/Payment/GetPaymentItem';
import GetPaymentList from './Action/Payment/GetPaymentList';
import PostPaymentItem from './Action/Payment/PostPaymentItem';
import MemoItem from './Type/MemoItem';
import ServiceInterface from './Type/ServiceInterface';

class Wallet {
  static readonly ORDER_TYPE_BUY = 'buy';
  static readonly ORDER_TYPE_SELL = 'sell';

  protected service: ServiceInterface;

  constructor(service: ServiceInterface) {
    this.service = service;
  }

  static deleteOrder(secret: string, address: string, sequence: string) {
  }

  static getBalance(address: string) {
  }

  static getOrderInfo(address: string, hash: string) {
  }

  static getOrderList(address: string) {
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

  static submitOrder(secret: string, address: string, baseAmount: string, counterAmount: string, isBuy: boolean) {
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
