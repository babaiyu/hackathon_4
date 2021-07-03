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
            if (res.length > 0) payload = res[0];
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

// Create Product (admin)
const createProduct = async (req: Request<any>, reply: Reply) => {
  const {name_product, description, place} = req.body;

  const query = `INSERT INTO product (name_product, description, place) VALUES(?, ?, ?)`;

  await connector()
    .then(async (conn) => {
      await conn
        .query(query, [name_product, description, place])
        .then((res) => {
          reply.code(200).send(response(true, 'Success create product'));
        })
        .catch((err) => errorHandler(400, reply))
        .finally(() => conn.end());
    })
    .catch((err) => errorHandler(500, reply));
};

// Create Packet By Product
const createPacketByProduct = async (req: Request<any>, reply: Reply) => {
  const {id_product, name_room, description, price, capacity} = req.body;

  const query = `INSERT INTO product_packet (id_product, name_room, description, price, capacity)
  VALUES (?, ?, ?, ?, ?)`;

  await connector()
    .then(async (conn) => {
      await conn
        .query(query, [id_product, name_room, description, price, capacity])
        .then((res) => {
          reply.code(200).send(response(true, 'Success create packet'));
        })
        .catch((err) => errorHandler(400, reply))
        .finally(() => conn.end());
    })
    .catch((err) => errorHandler(500, reply));
};

// Create Facility by Packet
const createFacilityByPacket = async (req: Request<any>, reply: Reply) => {
  const {id_packet, name_facility} = req.body;

  const query = `INSERT INTO packet_facility (id_packet, name_facility) VALUES(?, ?)`;

  await connector()
    .then(async (conn) => {
      await conn
        .query(query, [id_packet, name_facility])
        .then((res) => {
          reply.code(200).send(response(true, 'Success create Facility'));
        })
        .catch((err) => errorHandler(400, reply))
        .finally(() => conn.end());
    })
    .catch((err) => errorHandler(500, reply));
};

export default {
  viewProduct,
  viewProductByID,
  createProduct,
  createPacketByProduct,
  createFacilityByPacket,
};
