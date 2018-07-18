import GetConnected from './Action/Server/GetConnected';
import Status from './Action/Server/GetStatus';
import GetTransactionFee from './Action/Server/GetTransactionFee';
import ServiceInterface from './Type/ServiceInterface';

class Server {
  protected service: ServiceInterface;

  constructor(service: ServiceInterface) {
    this.service = service;
  }

  async getInfo() {
    return await new Status(this.service).fetch();
  }

  async getTransactionFee() {
    const data = await new GetTransactionFee(this.service).fetch();
    return data.fee;
  }

  async isConnected() {
    const data = await new GetConnected(this.service).fetch();
    return data.connected;
  }
}

export default Server;
