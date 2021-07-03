import {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import _ from 'lodash';
import connector from '../db/connector';
import errorHandler from '../helpers/errorHandler';
import response from '../helpers/response';

// Payment
const payment = async (req: Request<any>, reply: Reply) => {
  const {id_group, booking_date, status_payment} = req.body;

  const query = `INSERT INTO booking (id_group, booking_date, status_payment)
  VALUES (?, ?, ?)`;

  connector().then(async (conn) => {
    await conn
      .query(query, [id_group, booking_date, status_payment])
      .then(() => {
        reply.code(200).send(response(true, 'Success add booking'));
      })
      .catch((err) => errorHandler(400, reply))
      .finally(() => conn.end());
  });
};

export default {payment};
