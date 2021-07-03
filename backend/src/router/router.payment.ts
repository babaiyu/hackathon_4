import {RouteOptions, FastifySchema} from 'fastify';
import {routeType} from '../config';
import controllerPayment from '../controller/controller.payment';

const schema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: {type: 'number'},
    },
  },
};

const routePayment: RouteOptions[] = [
  {
    method: 'POST',
    url: `${routeType.v1}/payment`, // /api/v1/payment
    handler: controllerPayment.payment,
  },
  {
    method: 'GET',
    url: `${routeType.v1}/detail-payment/:id`,
    schema,
    handler: controllerPayment.detailPayment,
  },
  {
    method: 'GET',
    url: `${routeType.v1}/pay-payment/:id`,
    schema,
    handler: controllerPayment.payPayment,
  },
];

export default routePayment;
