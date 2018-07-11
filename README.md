# sdchain-sdk-js
The javascript version of SDChain SDK

## Function Description
1. Contains interfaces provided by [REST-API](https://rest-beta.sdchain.io/).
2. Including usage examples, in .test/*.ts .
3. Explicitly explain the dependent version,and the dependent third-party libraries and their versions.
4. Includes instructions on how to run the examples.

## Dependent packages:
- @agrozyme/scripts-helper: install global modules (TypeScript / Jasmine / Typedoc)
- fs-extra: create / empty Model directory
- node-fetch: request / call API
- swagger-object-validator: request / response data validator
- urijs: parse URI pattern
- swagger-ts-generator: build Model interfaces

## SDK developer:
*The section not for using SDK*

Update Model:
1. use API design tool to update `swagger20-with-extensions.json` file.
2. run `npm run model`

Update Document: run `npm run document`

## Using SDK:
Simple object document: use browser open `document/index.html`

functions:

create Service Object: `new Service(serverUrl, version)`

example:
```typescript
import Service from 'sdchain-sdk-js/source/Service';

const service = new Service('https://rest-beta.sdchain.io', 'v1');
```


create Server Object: `new Server(service);`

example:
```typescript
import Service from 'sdchain-sdk-js/source/Service';
import Service from 'sdchain-sdk-js/source/Server';

const service = new Service('https://rest-beta.sdchain.io', 'v1');
const server = new Server(service);
```

create Wallet Object: `new Wallet(service);`

example:
```typescript
import Service from 'sdchain-sdk-js/source/Service';
import Service from 'sdchain-sdk-js/source/Wallet';

const service = new Service('https://rest-beta.sdchain.io', 'v1');
const wallet = new Wallet(service);
```


SDK-APIS:

| seq |               api               |                             url                              | new |
|-----|---------------------------------|--------------------------------------------------------------|-----|
|   1 | Wallet.newWallet();             | GET    : /v1/wallet/new                                      | Y   |
|   2 | Wallet.getBalance(...);         | GET    : /v1/accounts/balances/{:address}                    | Y   |
|   3 | Wallet.submitPayment(...);      | POST   : /v1/accounts/payments/{:source_address}?submit=true | Y   |
|   4 | Wallet.getPaymentList(...);     | GET    : /v1/accounts/payments/{:address}                    | Y   |
|   5 | Wallet.getPaymentInfo(...);     | GET    : /v1/accounts/payments/{:address}/{:hash}            | Y   |
|   6 | Wallet.getTransactionList(...); | GET    : /v1/accounts/transactions/{:address}                | Y   |
|   7 | Wallet.getTransactionInfo(...); | GET    : /v1/accounts/transactions/{:address}/{:hash}        | Y   |
|   8 | Wallet.getOrderList(...);       | GET    : /v1/accounts/orders/{:address}                      | Y   |
|   9 | Wallet.submitOrder(...);        | POST   : /v1/accounts/orders/{:address}                      | Y   |
|  10 | Wallet.deleteOrder(...);        | DELETE : /v1/accounts/orders/{:address}/{:sequence}          | Y   |
|  11 | Wallet.getOrderInfo(...);       | GET    : /v1/accounts/orders/{:address}/{:hash}              | Y   |
|  12 | Server.getTransactionFee();     | GET    : /v1/transaction-fee                                 | Y   |
|  13 | Server.getInfo();               | GET    : /v1/server                                          | Y   |
|  14 | Server.isConnected();           | GET    : /v1/server/connected                                | Y   |
|     |                                 |                                                              |     |

