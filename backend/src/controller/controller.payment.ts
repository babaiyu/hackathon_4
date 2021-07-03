import {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import _ from 'lodash';
import connector from '../db/connector';
import errorHandler from '../helpers/errorHandler';
import response from '../helpers/response';

// Payment
const payment = async (req: Request<any>, reply: Reply) => {
  const {id_group, status_payment, total_payment} = req.body;

  const query = `INSERT INTO booking (id_group, booking_date, status_payment, total_payment)
  VALUES (?, ?, ?, ?)`;

  connector().then(async (conn) => {
    await conn
      .query(query, [id_group, new Date(), status_payment, total_payment])
      .then(() => {
        reply.code(200).send(response(true, 'Success add booking'));
      })
      .catch((err) => errorHandler(400, reply))
      .finally(() => conn.end());
  });
};

// Detail Payment
const detailPayment = async (req: Request<any>, reply: Reply) => {
  const {id} = req.params;

  const query = `SELECT booking.id, booking.id_group, booking.booking_date, booking.status_payment, booking.total_payment FROM booking
  WHERE booking.id = ?`;
  const queryMember = `SELECT user.username FROM member_group
  INNER JOIN user ON user.id = member_group.id_user
  INNER JOIN group_booking ON group_booking.id = member_group.id_group
  WHERE member_group.id_group = ?`;

  await connector()
    .then(async (conn) => {
      let payload: any = {};

      await conn
        .beginTransaction()
        .then(async () => {
          // Detail Booking
          await conn.query(query, [id]).then((res) => {
            if (res.length > 0) payload = res[0];
          });

          // Get Member
          await conn.query(queryMember, [payload?.id_group]).then((res) => {
            let members: any = [];

            res.map((i: any) => {
              const tMembers = {
                username: i?.username,
                amount: Math.ceil(payload?.total_payment / res.length),
              };
              members.push(tMembers);
            });

            payload = {...payload, members};
          });
        })
        .then(() => {
          conn.commit();
          reply.code(200).send(response(true, '', payload));
        })
        .catch((err) => errorHandler(400, reply))
        .finally(() => conn.end());
    })
    .catch((err) => errorHandler(500, reply));
};

// Pay the payment
const payPayment = async (req: Request<any>, reply: Reply) => {
  const {id} = req.params;

  const query = `UPDATE booking SET status_payment = ? WHERE id = ?`;

  await connector()
    .then(async (conn) => {
      await conn
        .query(query, [true, id])
        .then((res) => {
          reply.code(200).send(response(true, 'Success payment'));
        })
        .catch((err) => errorHandler(400, reply))
        .finally(() => conn.end());
    })
    .catch((err) => errorHandler(500, reply));
};

export default {payment, detailPayment, payPayment};
