import GetList from '../source/Action/Order/GetList';
import {online} from './Setup/Service';
import {data_a} from './Setup/Setting';

describe('Test Order API', () => {
  const item = new GetList(online);

  it('Test Order List', async () => {
    const options = {
      transform: {address: data_a.address},
      query: {limit: 2}
    };

    const result = await item.fetch(options);
    expect(result.validated).toBe(true);
  });

});


