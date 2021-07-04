import {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import _ from 'lodash';
import connector from '../db/connector';
import errorHandler from '../helpers/errorHandler';
import response from '../helpers/response';
import {compareTokenUser} from '../middlewares/middleware';

// Update Verify
const updateVerify = async (req: Request<any>, reply: Reply) => {
  const {test_antigen, test_pcr, vaccine, user_id} = req.body;

  const query = `UPDATE verified SET test_antigen = ?, test_pcr = ?, vaccine = ? WHERE id_user = ?`;

  await connector()
    .then(async (conn) => {
      await conn
        .query(query, [test_antigen, test_pcr, vaccine, user_id])
        .then((res) =>
          reply.code(200).send(response(true, 'Success verify user')),
        )
        .catch((err) => errorHandler(400, reply))
        .finally(() => conn.end());
    })
    .catch((err) => errorHandler(500, reply));
};

// View Verify by User
const viewVerifyByUser = async (req: Request<any>, reply: Reply) => {
  const {token} = req.headers;

  let userToken = await compareTokenUser(token);
  let userId = _.result(userToken, 'id', '');

  const query = `SELECT user.username, verified.test_antigen, verified.test_pcr, verified.vaccine FROM verified
  INNER JOIN user ON user.id = verified.id_user
  WHERE verified.id_user = ?`;

  if (userToken) {
    await connector()
      .then(async (conn) => {
        await conn
          .query(query, [userId])
          .then((res) => {
            reply
              .code(200)
              .send(response(true, '', res.length > 0 ? res[0] : null));
          })
          .catch((err) => errorHandler(400, reply))
          .finally(() => conn.end());
      })
      .catch((err) => errorHandler(500, reply));
  } else errorHandler(401, reply);
};

// View all Verify User
const viewAllVerify = async (req: Request<any>, reply: Reply) => {
  const query = `SELECT user.username, verified.test_antigen, verified.test_pcr, verified.vaccine FROM verified
  INNER JOIN user ON user.id = verified.id_user`;

  await connector()
    .then(async (conn) => {
      await conn
        .query(query)
        .then((res) => {
          reply.code(200).send(response(true, '', res));
        })
        .catch((err) => errorHandler(400, reply))
        .finally(() => conn.end());
    })
    .catch((err) => errorHandler(500, reply));
};

export default {updateVerify, viewVerifyByUser, viewAllVerify};
