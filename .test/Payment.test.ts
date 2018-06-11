import GetPaymentItem from '../source/Action/Payment/GetPaymentItem';
import GetPaymentList from '../source/Action/Payment/GetPaymentList';
import PostPaymentItem from '../source/Action/Payment/PostPaymentItem';
import Wallet from '../source/Wallet';
import {online} from './Setup/Service';
import {data_a, data_b, data_c} from './Setup/Setting';

describe('Payment API', () => {
  const wallet = new Wallet(online);

  it('Get Payment List', async () => {
    const options = {
      transform: {address: data_a.address},
      query: {per_page: 2}
    };

    const result = await new GetPaymentList(online).fetch(options);
    const {payments} = result;
    expect(payments.length).toBe(2);

    payments.forEach(payment => {
      expect(typeof payment.timestamp).not.toBe('string');
    });
  });

  it('Get Payment List', async () => {
    const payments = await wallet.getPaymentList(data_a.address, {per_page: 2});
    expect(payments.length).toBe(2);

    payments.forEach(payment => {
      expect(typeof payment.timestamp).not.toBe('string');
    });
  });

  it('Get Payment Item', async () => {
    const options = {
      transform: {
        address: data_b.address,
        hash: data_b.payment_hash
      }
    };

    const result = await new GetPaymentItem(online).fetch(options);
    expect(result.state).toBe('validated');

  });

  it('Get Payment Item', async () => {
    const result = await wallet.getPaymentInfo(data_b.address, data_b.payment_hash);
    expect(result.state).toBe('validated');
  });

  xit('Post Payment Item', async () => {
    const options = {
      transform: {source_address: data_b.address},
      query: {submit: false},
      body: {
        secret: data_b.secret,
        payment: {
          source_account: data_b.address,
          destination_account: data_c.address,
          amount: '0',
          memos: []
        }
      }
    };

    const result = await new PostPaymentItem(online).fetch(options);
    expect(result.hash).not.toBe('');

  });

  xit('Post Payment Item', async () => {
    const result = await wallet.submitPayment(data_b.secret, data_b.address, data_c.address, '0');
    expect(result.hash).not.toBe('');
  });
});


