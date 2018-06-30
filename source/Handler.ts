import {Handler as Base} from 'swagger-object-validator';
import {Operation, Response, Schema, Spec} from 'swagger-schema-official';

export type Method = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch';

class Handler extends Base {
  protected specification?: Spec;

  async getSpecification(): Promise<Spec> {
    if (undefined === this.specification) {
      this.specification = await this.swaggerSpec;
    }

    return this.specification;
  }

  async getOperation(path: string, method: Method = 'get'): Promise<Operation | undefined> {
    const specification = await this.getSpecification();
    return specification.paths[path][method];
  }

  async getResponse(path: string, method: Method = 'get', status: string = '200'): Promise<Response | undefined> {
    const item = await this.getOperation(path, method);

    if (item) {
      return item.responses[status];
    }

  }

  async getResponseBody(path: string, method: Method = 'get', status: string = '200'): Promise<Schema | undefined> {
    const response = await this.getResponse(path, method, status);

    if (response) {
      return response.schema;
    }
  }

}

export default Handler;
