import {config as conn} from 'dotenv';

conn();

// Config ENV
export const config = {
  port: process.env.PORT || 8000,
  node_env: process.env.NODE_ENV,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_pass: process.env.DB_PASS,
  db_name: process.env.DB_NAME,
  secret_key: process.env.SECRET_KEY,
};

// Route Type
export const routeType = {
  publicV1: '/api/v1/public',
  v1: '/api/v1',
};
