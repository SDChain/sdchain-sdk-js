import DeleteOrderItem from '../source/Action/Order/DeleteOrderItem';
import GetOrderItem from '../source/Action/Order/GetOrderItem';
import GetOrderList from '../source/Action/Order/GetOrderList';
import PostOrderItem from '../source/Action/Order/PostOrderItem';
import Wallet from '../source/Wallet';
import {online} from './Setup/Service';
import {data_source, data_target} from './Setup/Setting';

describe('Test Order API: ', () => {
  const wallet = new Wallet(online);

  it('Get Order List', async () => {
    const options = {
      transform: {address: data_source.address},
      query: {limit: 2}
    };

    const item = new GetOrderList(online);
    const result = await item.fetch(options);
    expect(result.validated).toBe(true);
    expect(result.orders.length).toBe(2);
  });

  it('Get Order List', async () => {
    const orders = await wallet.getOrderList(data_source.address);
    expect(orders.length).not.toBe(0);
  });

  it('Get Order Item', async () => {
    const options = {
      transform: {
        address: data_source.address,
        hash: data_source.hash.order
      }
    };

    const item = new GetOrderItem(online);
    const result = await item.fetch(options);
    expect(result.validated).toBe(true);
    expect(result.hash).not.toBe('');
  });

  it('Get Order Item', async () => {
    const result = await wallet.getOrderInfo(data_source.address, data_source.hash.order);
    expect(result.validated).toBe(true);
    expect(result.hash).not.toBe('');
  });

  xit('Post Order Item', async () => {
    const options = {
      transform: {address: data_source.address},
      body: {
        secret: data_source.secret,
        order: {
          type: 'buy',
          taker_pays: {
            currency: 'SDA',
            counterparty: '',
            value: '0'
          },
          taker_gets: {
            currency: 'CNY',
            counterparty: '6UPd52jHtu1d88nc3S3WeroACFQpKfybhU',
            value: '0'
          }
        }
      }
    };

    const item = new PostOrderItem(online);
    const result = await item.fetch(options);
    expect(result.hash).not.toBe('');
  });

  xit('Post Order Item', async () => {
    const baseAmount = {
      currency: 'SDA',
      counterparty: '',
      value: '0'
    };

    const counterAmount = {
      currency: 'CNY',
      counterparty: '6UPd52jHtu1d88nc3S3WeroACFQpKfybhU',
      value: '0'
    };

    const result = await wallet.submitOrder(data_source.secret, data_source.address, baseAmount, counterAmount, true);
    expect(result.hash).not.toBe('');
  });

  xit('Delete Order Item', async () => {
    const options = {
      transform: {
        address: data_target.address,
        sequence: 5
      },
      body: {
        secret: data_target.secret
      }
    };

    const item = new DeleteOrderItem(online);
    const result = await item.fetch(options);
    expect(result.hash).not.toBe('');
  });

  xit('Delete Order Item', async () => {
    const result = await wallet.deleteOrder(data_target.secret, data_target.address, 5);
    expect(result.hash).not.toBe('');
  });

});




