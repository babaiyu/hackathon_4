import {RouteOptions} from 'fastify';
import routeHome from './router/route.home';
import routeAuth from './router/router.auth';
import routeProduct from './router/router.product';
import routePayment from './router/router.payment';

const routes: RouteOptions[] = [
  ...routeHome,
  ...routeAuth,
  ...routeProduct,
  ...routePayment,
];

export default routes;
