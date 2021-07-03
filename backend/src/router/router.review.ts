import {RouteOptions} from 'fastify';
import {routeType} from '../config';
import controllerReview from '../controller/controller.review';

const routeReview: RouteOptions[] = [
  {
    method: 'POST',
    url: `${routeType.userV1}/add-review`,
    handler: controllerReview.addReview,
  },
];

export default routeReview;
