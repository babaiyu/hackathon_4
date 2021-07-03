import CryptoJS from 'crypto-js';
import Aes from 'crypto-js/aes';
import _ from 'lodash';
import {config} from '../config';

const key = _.result(config, 'secret_key', '');

export const doEncrypt = (pass: string) => {
  let cyperText = Aes.encrypt(pass, key).toString();
  return cyperText;
};

export const doDecrypt = (pass: string) => {
  let cyperText = Aes.decrypt(pass, key);
  return cyperText.toString(CryptoJS.enc.Utf8);
};
