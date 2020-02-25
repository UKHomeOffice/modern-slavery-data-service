'use strict';

// This allows you to run the data-service module independently with environment variables set.
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dataService: {
    model: process.env.DATA_SERVICE_MODEL || 'postgresql',
    port: process.env.DATA_SERVICE_PORT || 8080,
  },
  postgresql: {
    user: process.env.PG_USER || 'test',
    host: process.env.PG_HOST || 'localhost',
    password: process.env.PG_PASSWORD || 'test',
    defaultDatabase: process.env.DB_NAME || 'postgres',
    database: process.env.PG_DATABASE || 'test',
    port: process.env.PG_PORT || 5432,
    minPool: process.env.PG_MIN_POOL || 2,
    maxPool: process.env.PG_MAX_POOL || 10,
  },
  apiKeys: [
    {
      user: process.env.APP_ID,
      key: process.env.APP_API_KEY,
    },
  ]
};
