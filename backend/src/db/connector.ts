import mariadb from 'mariadb';
import {config} from '../config';

const {db_host, db_user, db_pass, db_name} = config;

const db = mariadb.createPool({
  host: db_host,
  user: db_user,
  password: db_pass,
  database: db_name,
});

const connector = async () => {
  return await db.getConnection();
};

export default connector;
