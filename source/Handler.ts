import {Handler as Base} from 'swagger-object-validator';
import {Operation, Parameter, Response, Schema, Spec} from 'swagger-schema-official';

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

  async getDefinition(name: string): Promise<Schema | undefined> {
    const specification = await this.getSpecification();
    const items = specification.definitions;

    if (items && items.hasOwnProperty(name)) {
      return items[name];
    }

  }

  async getPlaceholder(path: string): Promise<Schema | undefined> {
    const specification = await this.getSpecification();
    const {paths} = specification;

    if (false === paths.hasOwnProperty(path)) {
      return;
    }

    const {parameters} = paths[path];

    if (undefined === parameters) {
      return;
    }

    return this.getParameterSchema(parameters, 'path');
  }

  async validatePlaceholder(test: any, path: string) {
    const item = await this.getPlaceholder(path);
    const schema = item ? item : '';
    return await this.validateModel(test, schema);
  }

  getParameterSchema(parameters: Parameter[], filter: string): Schema {
    const required: string[] = [];
    const properties: { [index: string]: Schema } = {};

    parameters
      .filter(item => (filter === item.in))
      .forEach(item => {
        const {name} = item;

        if (item.required) {
          required.push(name);
        }

        properties[name] = <Schema>item;
      });

    return {
      required,
      properties
    };
  }

  async getRequestQuery(path: string, method: Method = 'get'): Promise<Schema | undefined> {
    const item = await this.getOperation(path, method);

    if (item) {
      return this.getParameterSchema(<Parameter[]>item.parameters, 'query');
    }
  }

  async validateRequestQuery(test: any, path: string, method: Method = 'get') {
    const item = await this.getRequestQuery(path, method);
    const schema = item ? item : '';
    return await this.validateModel(test, schema);
  }

  async getRequestBody(path: string, method: Method = 'get'): Promise<Schema | undefined> {
    const item = await this.getOperation(path, method);
    console.dir(item, {depth: null});

    if (item) {
      return this.getParameterSchema(<Parameter[]>item.parameters, 'body');
    }
  }

  async validateRequestBody(test: any, path: string, method: Method = 'get') {
    const item = await this.getRequestBody(path, method);
    const schema = item ? item : '';
    return await this.validateModel(test, schema);
  }

}

export default Handler;
