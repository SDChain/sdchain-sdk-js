import {Handler as Base} from 'swagger-object-validator';
import {Schema, Spec} from 'swagger-schema-official';

export type Method = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch';

class Handler extends Base {
  protected specification?: Spec;

  async getSpecification(): Promise<Spec> {
    if (undefined === this.specification) {
      this.specification = await this.swaggerSpec;
    }

    return this.specification;
  }

  async getResponseSchema(path: string, method: Method = 'get', status: string = '200'): Promise<Schema | string> {
    const specification = await this.getSpecification();
    const item = specification.paths[path][method];

    if (undefined === item) {
      return '';
    }

    const schema = item.responses[status].schema;
    return schema ? schema : '';
  }

}

export default Handler;
