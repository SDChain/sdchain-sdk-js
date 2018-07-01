import GetPaymentItem from '../source/Action/Payment/GetPaymentItem';
import GetPaymentList from '../source/Action/Payment/GetPaymentList';
import PostPaymentItem from '../source/Action/Payment/PostPaymentItem';
import {PaymentState} from '../source/Model';
import Wallet from '../source/Wallet';
import {online} from './Setup/Service';
import {data_source, data_target} from './Setup/Setting';

describe('Payment API', () => {
  const wallet = new Wallet(online);

  it('Get Payment List', async () => {
    const options = {
      placeholder: {address: data_target.address},
      query: {per_page: 2}
    };

    const result = await new GetPaymentList(online).fetch(options);
    // console.dir(result, {depth: null});
    const {payments} = result;
    expect(payments.length).toBe(2);
  });

  it('Get Payment List', async () => {
    const payments = await wallet.getPaymentList(data_target.address, {per_page: 2});
    expect(payments.length).toBe(2);
  });

  it('Get Payment Item', async () => {
    const options = {
      placeholder: {
        address: data_source.address,
        hash: data_source.hash.payment
      }
    };

    const result = await new GetPaymentItem(online).fetch(options);
    expect(result.state).toBe(PaymentState.validated);
  });

  it('Get Payment Item', async () => {
    const result = await wallet.getPaymentInfo(data_source.address, data_source.hash.payment);
    expect(result.state).toBe(PaymentState.validated);
  });

  xit('Post Payment Item', async () => {
    const options = {
      placeholder: {address: data_source.address},
      query: {submit: false},
      body: {
        secret: data_source.secret,
        payment: {
          source_account: data_source.address,
          destination_account: data_target.address,
          amount: '0',
          memos: []
        }
      }
    };

    const result = await new PostPaymentItem(online).fetch(options);
    expect(result.hash).not.toBe('');

  });

  xit('Post Payment Item', async () => {
    const result = await wallet.submitPayment(data_source.secret, data_source.address, data_target.address, '0');
    expect(result.hash).not.toBe('');
  });
});


