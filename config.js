'use strict';

// This allows you to run the data-service module independently with environment variables set.
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  dataService: {
    model: process.env.DATA_SERVICE_MODEL || 'postgresql',
  },
  postgresql: {
    user: process.env.PG_USER || 'test',
    host: process.env.PG_HOST || 'localhost',
    password: process.env.PG_PASSWORD || 'test',
    database: process.env.PG_DATABASE || 'test',
    additionalDatabaseConfig: {
      tableName: process.env.PG_DATABASE_TABLE || 'reports',
    },
    port: process.env.PG_PORT || 5432,
  },
  apiKeys: [
    {
      user: process.env.APP_NAME || 'modern-slavery-app',
      key: process.env.APP_API_KEY || 'D4ED43C0-8BD6-4FE2-B358-7C0E230D11EF',
    },
  ]
};
