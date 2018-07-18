import GetConnected from '../source/Action/Server/GetConnected';
import GetStatus from '../source/Action/Server/GetStatus';
import GetTransactionFee from '../source/Action/Server/GetTransactionFee';
import Server from '../source/Server';
import {online} from './Setup/Service';

describe('Test Server API: ', () => {
  const server = new Server(online);

  it('Server is connected', async () => {
    const item = new GetConnected(online);
    const response = await item.fetch();
    const test = await item.validateResponseBody(response);
    expect(test.errors.length).toBe(0);

    expect(response.success).toBe(true);
    expect(response.connected).toBe(true);
  });

  it('Server is connected', async () => {
    const result = await server.isConnected();
    expect(result).toBe(true);
  });

  it('Server Status is syncing', async () => {
    const item = new GetStatus(online);
    const response = await item.fetch();
    const test = await item.validateResponseBody(response);
    expect(test.errors.length).toBe(0);

    expect(response.success).toBe(true);
    // expect(result.sdchaind_server_status.server_state).toBe('syncing');
  });

  it('Server Status is syncing', async () => {
    const result = await server.getInfo();
    expect(result.success).toBe(true);
    // expect(result.sdchaind_server_status.server_state).toBe('syncing');
  });

  it('Transcation Fee is not zero', async () => {
    const item = new GetTransactionFee(online);
    const response = await item.fetch();
    const test = await item.validateResponseBody(response);
    expect(test.errors.length).toBe(0);

    expect(response.success).toBe(true);
    expect(response.fee).not.toBeLessThanOrEqual(0);
  });

  it('Transcation Fee is not zero', async () => {
    const result = await server.getTransactionFee();
    expect(result).not.toBeLessThanOrEqual(0);
  });

});


