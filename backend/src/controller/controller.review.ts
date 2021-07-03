import {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import _ from 'lodash';
import connector from '../db/connector';
import errorHandler from '../helpers/errorHandler';
import response from '../helpers/response';
import {compareTokenUser} from '../middlewares/middleware';

// Add review
const addReview = async (req: Request<any>, reply: Reply) => {
  const {token} = req.headers;
  const {id_product, star, comment} = req.body;

  let userToken = await compareTokenUser(token);
  let userId = _.result(userToken, 'id', '');

  const query = `INSERT INTO review
  (id_user, id_product, star, comment) VALUES(?, ?, ?, ?)`;

  if (userToken) {
    await connector()
      .then(async (conn) => {
        await conn
          .query(query, [userId, id_product, star, comment])
          .then((res) =>
            reply.code(200).send(response(true, 'Success add review')),
          );
      })
      .catch((err) => errorHandler(500, reply));
  } else errorHandler(401, reply);
};

export default {addReview};
