import {RouteOptions} from 'fastify';
import routeHome from './router/route.home';
import routeAuth from './router/router.auth';
import routeProduct from './router/router.product';

const routes: RouteOptions[] = [...routeHome, ...routeAuth, ...routeProduct];

export default routes;
