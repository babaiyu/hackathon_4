import {RouteOptions} from 'fastify';
import routeHome from './router/route.home';
import routeAuth from './router/router.auth';

const routes: RouteOptions[] = [...routeHome, ...routeAuth];

export default routes;
