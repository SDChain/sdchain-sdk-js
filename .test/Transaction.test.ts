import GetTransactionItem from '../source/Action/Transaction/GetTransactionItem';
import GetTransactionList from '../source/Action/Transaction/GetTransactionList';
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
    const result = await item.fetch(options);
    // console.dir(result);
    expect(result.transactions.length).toBe(2);
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
    const result = await item.fetch(options);
    // console.dir(result);
    expect(result.transaction.state).toBe('validated');
  });

  it('Get Transaction Item', async () => {
    const result = await wallet.getTransactionInfo(data_source.address, data_source.hash.transaction);
    expect(result.state).toBe('validated');
  });

});




