import jwt from 'jsonwebtoken';
import _ from 'lodash';
import {config} from '../config';

const key = _.result(config, 'secret_key', '');

const sign = (payload: any) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      key,
      {
        expiresIn: '1d',
      },
      (err, token) => {
        if (err) return reject(undefined);
        return resolve(token);
      },
    );
  });
};

const verify = (token: any) =>
  new Promise((resolve, reject) => {
    try {
      let decoded = jwt.verify(token, key);
      resolve(decoded);
    } catch (error) {
      reject(false);
    }
  });

export default {sign, verify};
