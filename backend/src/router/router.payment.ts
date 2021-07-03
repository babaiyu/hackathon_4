import {RouteOptions} from 'fastify';
import {routeType} from '../config';
import controllerPayment from '../controller/controller.payment';

const routePayment: RouteOptions[] = [
  {
    method: 'POST',
    url: `${routeType.v1}/payment`, // /api/v1/payment
    handler: controllerPayment.payment,
  },
];

export default routePayment;
