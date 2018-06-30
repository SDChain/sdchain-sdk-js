import {online} from './Setup/Service';

describe('Test Service object', () => {

  it('Property', () => {
    expect(online.url).toBe('https://rest-beta.sdchain.io');
    expect(online.version).toBe('v1');
  });

  it('getUrl', () => {
    const items: { [index: string]: any[] } = {
      'https://rest-beta.sdchain.io/v1/server/connected': ['/server/connected'],
      'https://rest-beta.sdchain.io/v1/accounts/orders/6Pv1Bn67K6v3Sitn1aor59ZUXkUtrpooxB?limit=2': [`/accounts/orders/{address}`, {address: '6Pv1Bn67K6v3Sitn1aor59ZUXkUtrpooxB'}, {limit: 2}]
    };

    Object.keys(items).forEach(index => {
      const item = online.getUrl(...items[index]);
      expect(item).toBe(index);
    });

  });

});


