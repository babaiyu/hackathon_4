import {RouteOptions} from 'fastify';
import {routeType} from '../config';
import controllerAuth from '../controller/controller.auth';

const routeAuth: RouteOptions[] = [
  {
    method: 'POST',
    url: `${routeType.v1}/login`,
    handler: controllerAuth.userLogin,
  },
  {
    method: 'POST',
    url: `${routeType.v1}/register`,
    handler: controllerAuth.userRegister,
  },
];

export default routeAuth;
