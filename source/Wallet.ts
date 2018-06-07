class Wallet {
  static readonly ORDER_TYPE_BUY = 'buy';
  static readonly ORDER_TYPE_SELL = 'sell';

  static deleteOrder(secret: string, address: string, sequence: string) {}

  static getBalance(address: string) {}

  static getOrderInfo(address: string, hash: string) {}

  static getOrderList(address: string) {}

  static getPaymentInfo(address: string, hash: string) {}

  static getPaymentList(address: string, opts: object) {}

  static getTransactionInfo(address: string, hash: string) {}

  static getTransactionList(address: string, opts: object) {}

  static newWallet() {}

  static submitOrder(secret: string, address: string, baseAmount: string, counterAmount: string, isBuy: boolean) {}

  static submitPayment(secret: string, sourceAddress: string, destAddress: string, amount: string, memo: string) {}
}
