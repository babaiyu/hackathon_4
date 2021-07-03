import {RouteOptions} from 'fastify';
import {routeType} from '../config';
import controllerUpload from '../controller/controller.upload';

const routeUpload: RouteOptions[] = [
  {
    method: 'POST',
    url: `${routeType.restrictedV1}/upload-images`,
    handler: controllerUpload.uploadImage,
  },
];

export default routeUpload;
