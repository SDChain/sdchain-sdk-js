import Service from '../../source/Service';

const online = new Service('https://cable.sdchain.io', 'v1');
const fake = new Service('https://fake-rest-beta.sdchain.io', 'v1');

export {online, fake};
