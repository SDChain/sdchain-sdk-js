import GetNewWallet from '../source/Action/Wallet/GetNewWallet';
import GetWalletBalance from '../source/Action/Wallet/GetWalletBalance';
import Wallet from '../source/Wallet';
import {online} from './Setup/Service';
import {data_source} from './Setup/Setting';

describe('Test Wallet API', () => {
  const wallet = new Wallet(online);

  xit('Get New Wallet', async () => {
    const result = await new GetNewWallet(online).fetch();
    const {address, secret} = result.wallet;
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
    const options = {transform: {address: data_source.address}};
    const result = await new GetWalletBalance(online).fetch(options);
    expect(result.balances.length).not.toBe(0);
  });

  it('Get Wallet Balance', async () => {
    const result = await wallet.getBalance(data_source.address);
    expect(result.length).not.toBe(0);
  });
});
