import {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import _ from 'lodash';
import connector from '../db/connector';
import errorHandler from '../helpers/errorHandler';
import response from '../helpers/response';

// View Product
const viewProduct = async (req: Request<any>, reply: Reply) => {
  const {page} = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  const query = `SELECT id, name_product, place FROM product
  ORDER BY product.id DESC LIMIT ? OFFSET ?`;
  const queryCount = 'SELECT COUNT(id) FROM product';

  await connector()
    .then(async (conn) => {
      let payload = {
        page,
        totalPage: 0,
        total: 0,
        data: [],
      };

      await conn
        .beginTransaction()
        .then(async () => {
          await conn.query(queryCount).then((res) => {
            payload.total = _.result(res[0], 'COUNT(id)', 0);
            payload.totalPage = Math.ceil(payload.total / limit);
          });

          await conn
            .query(query, [limit, offset])
            .then((res) => (payload.data = res));
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

// View Product by ID (Include Packet)
const viewProductByID = async (req: Request<any>, reply: Reply) => {
  const {id} = req.params;

  const queryProduct = `SELECT id, name_product, place FROM product WHERE id = ?`;
  const queryPacket = `SELECT product_packet.id, product_packet.name_room, product_packet.facility, product_packet.price FROM product_packet
  INNER JOIN product ON product.id = product_packet.id_product
  WHERE product_packet.id_product = ?`;

  await connector()
    .then(async (conn) => {
      let payload: any = {};
      await conn
        .beginTransaction()
        .then(async () => {
          await conn.query(queryProduct, [id]).then((res) => {
            if (res.length > 0) payload = res;
          });

          await conn
            .query(queryPacket, [id])
            .then((res) => (payload = {...payload, packet: res}));
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

export default {viewProduct, viewProductByID};
