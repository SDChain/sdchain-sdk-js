import GetNewWallet from '../source/Action/Wallet/GetNewWallet';
import GetWalletBalance from '../source/Action/Wallet/GetWalletBalance';
import Wallet from '../source/Wallet';
import {online} from './Setup/Service';
import {data_source} from './Setup/Setting';

describe('Test Wallet API: ', () => {
  const wallet = new Wallet(online);

  xit('Get New Wallet', async () => {
    const item = new GetNewWallet(online);

    const response = await item.fetch();
    const test = await item.validateResponseBody(response);
    expect(test.errors.length).toBe(0);

    const {address, secret} = response.wallet;
    expect(address.substring(0, 1)).toBe('6');
    expect(secret.substring(0, 1)).toBe('s');
  });

  xit('Get New Wallet', async () => {
    const result = await wallet.newWallet();
    const {address, secret} = result.wallet;
    expect(address.substring(0, 1)).toBe('6');
    expect(secret.substring(0, 1)).toBe('s');
  });

  it('Get Wallet Balance', async () => {
    const options = {placeholder: {address: data_source.address}};
    const item = new GetWalletBalance(online);

    const response = await item.fetch(options);
    const test = await item.validateResponseBody(response);
    expect(test.errors.length).toBe(0);

    expect(response.balances.length).not.toBe(0);
  });

  it('Get Wallet Balance', async () => {
    const result = await wallet.getBalance(data_source.address);
    expect(result.length).not.toBe(0);
  });
});
