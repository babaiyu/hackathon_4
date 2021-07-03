/*
For more info about error code, follow this link
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses
*/

import {FastifyReply as Reply} from 'fastify';
import response from './response';

const errorHandler = (code: number, reply: Reply) => {
  let payload = {
    code: 500,
    message: 'Internal Server Error',
  };

  switch (code) {
    // ========================= General Error =========================
    case 400: // Bad Request
      payload.code = code;
      payload.message = 'Bad Request';
      break;

    case 401: // Unauthorized
      payload.code = code;
      payload.message = 'Gagal verifikasi token!';
      break;

    case 403: // Forbidden
      payload.code = code;
      payload.message = 'Forbidden';
      break;

    case 404: // Not Found
      payload.code = code;
      payload.message = 'Not Found';
      break;

    case 415: // Unsupported Media Type
      payload.code = code;
      payload.message = 'Unsupported Media';
      break;

    default:
      break;
  }

  return reply.code(payload.code).send(response(false, payload.message));
};

export default errorHandler;
