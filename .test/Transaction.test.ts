import GetTransactionItem from '../source/Action/Transaction/GetTransactionItem';
import GetTransactionList from '../source/Action/Transaction/GetTransactionList';
import {OrderState} from '../source/Model';
import Wallet from '../source/Wallet';
import {online} from './Setup/Service';
import {data_source} from './Setup/Setting';

describe('Test Transaction API:', () => {
  const wallet = new Wallet(online);

  it('Get Transaction List', async () => {
    const options = {
      placeholder: {address: data_source.address},
      query: {per_page: 2}
    };

    const item = new GetTransactionList(online);
    const response = await item.fetch(options);
    const test = await item.validateResponseBody(response);
    expect(test.errors.length).toBe(0);

    expect(response.transactions.length).toBe(2);
  });

  it('Get Transaction List', async () => {
    const orders = await wallet.getTransactionList(data_source.address, {per_page: 2});
    expect(orders.length).toBe(2);
  });

  it('Get Transaction Item', async () => {
    const options = {
      placeholder: {
        address: data_source.address,
        hash: data_source.hash.transaction
      }
    };

    const item = new GetTransactionItem(online);
    const response = await item.fetch(options);
    const test = await item.validateResponseBody(response);
    expect(test.errors.length).toBe(0);

    expect(response.transaction.state).toBe(OrderState.validated);
  });

  it('Get Transaction Item', async () => {
    const result = await wallet.getTransactionInfo(data_source.address, data_source.hash.transaction);
    expect(result.state).toBe(OrderState.validated);
  });

});




