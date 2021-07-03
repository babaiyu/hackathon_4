import {RouteOptions, FastifySchema} from 'fastify';
import {routeType} from '../config';
import controllerProduct from '../controller/controller.product';

const viewSchema: FastifySchema = {
  querystring: {
    type: 'object',
    properties: {
      page: {type: 'number'},
    },
  },
};

const viewIDSchema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: {type: 'number'},
    },
  },
};

const routeProduct: RouteOptions[] = [
  {
    method: 'GET',
    url: `${routeType.publicV1}/products`,
    schema: viewSchema,
    handler: controllerProduct.viewProduct,
  },
  {
    method: 'GET',
    url: `${routeType.publicV1}/product/:id`,
    schema: viewIDSchema,
    handler: controllerProduct.viewProductByID,
  },
];

export default routeProduct;
