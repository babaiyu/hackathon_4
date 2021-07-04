import {FastifyRequest as Request, FastifyReply as Reply} from 'fastify';
import _ from 'lodash';
import connector from '../db/connector';
import errorHandler from '../helpers/errorHandler';
import response from '../helpers/response';
import {doDecrypt, doEncrypt} from '../lib/aes';
import jwt from '../lib/jwt';

// Login
const userLogin = async (req: Request<any>, reply: Reply) => {
  const {username, password} = req.body;

  const query = `SELECT id, username, password, name, dob, no_hp FROM user WHERE username = ?`;

  await connector()
    .then(async (conn) => {
      await conn
        .query(query, [username])
        .then(async (res) => {
          if (res.length > 0) {
            const passDB = _.result(res[0], 'password', '');
            const thePassDB = doDecrypt(passDB);

            if (thePassDB === password) {
              const payload = {
                user: {
                  id: res[0]?.id,
                  username: res[0]?.username,
                  name: res[0]?.name,
                  dob: res[0]?.dob,
                  no_hp: res[0]?.no_hp,
                },
                token: await jwt.sign(res[0]),
              };

              reply.code(200).send(response(true, '', payload));
            } else
              reply
                .code(401)
                .send(response(false, 'Username / Password does not match!'));
          } else reply.code(401).send(response(false, 'Username not found!'));
        })
        .catch((err) => errorHandler(400, reply))
        .finally(() => conn.end());
    })
    .catch((err) => errorHandler(501, reply));
};

// Register
const userRegister = async (req: Request<any>, reply: Reply) => {
  const {username, password, name, dob, no_hp} = req.body;

  const query = `INSERT INTO user (username, password, name, dob, no_hp)
  VALUES (?, ?, ?, ?, ?)`;
  const queryIsVerified = `INSERT INTO verified (id_user, test_antigen, test_pcr, vaccine)
  VALUES(?, ?, ?, ?)`;

  await connector()
    .then(async (conn) => {
      await conn
        .beginTransaction()
        .then(async () => {
          let insertId = 0;
          // Register User
          await conn
            .query(query, [username, doEncrypt(password), name, dob, no_hp])
            .then((res) => (insertId = res?.insertId));

          // Register verivied user
          await conn.query(queryIsVerified, [insertId, false, false, false]);
        })
        .then(() => {
          conn.commit();
          reply.code(200).send(response(true, 'Success register account'));
        })
        .catch((err) => errorHandler(400, reply))
        .finally(() => conn.end());
    })
    .catch((err) => errorHandler(500, reply));
};

export default {userLogin, userRegister};
