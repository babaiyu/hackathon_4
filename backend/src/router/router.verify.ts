import {RouteOptions} from 'fastify';
import {routeType} from '../config';
import controllerVerify from '../controller/controller.verify';

const routeVerify: RouteOptions[] = [
  {
    method: 'PUT',
    url: `${routeType.restrictedV1}/update-verify`,
    handler: controllerVerify.updateVerify,
  },
  {
    method: 'GET',
    url: `${routeType.userV1}/view-verify`,
    handler: controllerVerify.viewVerifyByUser,
  },
  {
    method: 'GET',
    url: `${routeType.restrictedV1}/verify`,
    handler: controllerVerify.viewAllVerify,
  },
];

export default routeVerify;
