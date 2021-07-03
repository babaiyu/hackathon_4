import {RouteOptions, FastifySchema} from 'fastify';
import {routeType} from '../config';
import controllerGroup from '../controller/controller.group';

const viewIDSchema: FastifySchema = {
  params: {
    type: 'object',
    properties: {
      id: {type: 'number'},
    },
  },
};

const routeGroup: RouteOptions[] = [
  {
    method: 'POST',
    url: `${routeType.userV1}/create-group`,
    handler: controllerGroup.createGroup,
  },
  {
    method: 'POST',
    url: `${routeType.userV1}/join-group`,
    handler: controllerGroup.joinGroup,
  },
  {
    method: 'GET',
    url: `${routeType.publicV1}/group-packet/:id`,
    schema: viewIDSchema,
    handler: controllerGroup.viewGroupByPacket,
  },
];

export default routeGroup;
