import {RouteOptions} from 'fastify';
import routeHome from './router/route.home';
import routeAuth from './router/router.auth';
import routeProduct from './router/router.product';
import routePayment from './router/router.payment';
import routeGroup from './router/router.group';
import routeUpload from './router/router.upload';
import routeReview from './router/router.review';
import routeVerify from './router/router.verify';

const routes: RouteOptions[] = [
  ...routeHome,
  ...routeAuth,
  ...routeProduct,
  ...routePayment,
  ...routeGroup,
  ...routeUpload,
  ...routeReview,
  ...routeVerify,
];

export default routes;
