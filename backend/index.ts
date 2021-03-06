import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyHealth from 'fastify-healthcheck';
import fastifyStatic from 'fastify-static';
import multer from 'fastify-multer';
import path from 'path';
import {config} from './src/config';
import routes from './src/routes';

const {port, node_env} = config;

// Instance Fastify
const server = fastify({
  logger: node_env === 'development' ? true : false,
});

// Register CORS
server.register(fastifyCors);

// Register multer
server.register(multer.contentParser);

// Register Health Check
server.register(fastifyHealth);

// Register Route
routes.forEach((route) => {
  server.route(route);
});

server.get('/', async (req, reply) => {
  reply.send({message: 'Hello World'});
});

// Register Static Public directory
server.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
});

// Start Server
const start = async () => {
  try {
    await server.listen(port, '0.0.0.0');
    console.info(`Server is running at port ${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
