import {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import _ from 'lodash';
import connector from '../db/connector';
import errorHandler from '../helpers/errorHandler';
import response from '../helpers/response';
import {compareTokenUser} from '../middlewares/middleware';

// Create Group
const createGroup = async (req: Request<any>, reply: Reply) => {
  const {token} = req.headers;
  const {id_packet, name_group, capacity, gender, flags} = req.body;

  let userToken = await compareTokenUser(token);
  let userId = _.result(userToken, 'id', '');

  const query = `INSERT INTO group_booking
  (id_packet, name_group, capacity, gender, flags)
  VALUES (?, ?, ?, ?, ?)`;
  const queryCreator = `INSERT INTO member_group
  (id_group, id_user)
  VALUES (?, ?)`;

  if (userToken) {
    await connector()
      .then(async (conn) => {
        await conn
          .beginTransaction()
          .then(async () => {
            let id_group = '';

            // Create Group
            await conn
              .query(query, [id_packet, name_group, capacity, gender, flags])
              .then((res) => (id_group = res?.insertId));

            // Adding creator group
            await conn.query(queryCreator, [id_group, userId]);
          })
          .then(() => {
            conn.commit();
            reply.code(200).send(response(true, 'Success create group'));
          })
          .catch((err) => {
            conn.rollback();
            errorHandler(400, reply);
          })
          .finally(() => conn.end());
      })
      .catch((err) => errorHandler(500, reply));
  } else errorHandler(401, reply);
};

// Join Group
const joinGroup = async (req: Request<any>, reply: Reply) => {
  const {token} = req.headers;
  const {id_group} = req.body;

  let userToken = await compareTokenUser(token);
  let userId = _.result(userToken, 'id', '');

  const query = `INSERT INTO member_group
  (id_group, id_user) VALUES (?, ?)`;

  if (userToken) {
    await connector()
      .then(async (conn) => {
        await conn
          .query(query, [id_group, userId])
          .then((res) =>
            reply.code(200).send(response(true, 'Success Join Group')),
          )
          .catch((err) => errorHandler(400, reply))
          .finally(() => conn.end());
      })
      .catch((err) => errorHandler(500, reply));
  } else errorHandler(401, reply);
};

// View Group By Packet
const viewGroupByPacket = async (req: Request<any>, reply: Reply) => {
  const {id} = req.params;

  const queryView = `SELECT id, name_group, capacity, gender, flags
  FROM group_booking WHERE id_packet = ?`;
  const queryMember = `SELECT user.username, user.name FROM user
  INNER JOIN member_group ON member_group.id_user = user.id
  WHERE member_group.id_group = ?`;

  await connector()
    .then(async (conn) => {
      let payload: any = {};
      await conn
        .beginTransaction()
        .then(async () => {
          await conn.query(queryView, [id]).then((res) => {
            if (res.length > 0) payload = res[0];
          });

          await conn
            .query(queryMember, [payload?.id])
            .then((res) => (payload = {...payload, members: res}));
        })
        .then(() => {
          conn.commit();
          reply.code(200).send(response(true, '', payload));
        })
        .catch((err) => {
          conn.rollback();
          errorHandler(400, reply);
        })
        .finally(() => conn.end());
    })
    .catch((err) => errorHandler(500, reply));
};

export default {createGroup, joinGroup, viewGroupByPacket};
