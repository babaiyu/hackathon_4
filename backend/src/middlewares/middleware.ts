import _ from 'lodash';
import connector from '../db/connector';
import jwt from '../lib/jwt';

// Comparing Token and return user
const compareTokenUser = async (token: any) => {
  let result = await jwt.verify(token);

  // await connector().then(async (conn) => {
  //   await conn
  //     .query('SELECT id, username FROM user WHERE token = ?', [token])
  //     .then(async (res) => {
  //       if (res.length > 0) result = await jwt.verify(token);
  //     })
  //     .finally(() => conn.end());
  // });

  return result;
};

export {compareTokenUser};
