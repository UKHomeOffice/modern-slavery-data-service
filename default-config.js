'use strict';

// This allows you to run the data-service module independently with environment variables set.
require('dotenv').config();

module.exports = {
  dataService: {
    model: process.env.DATASERVICEMODEL || 'postgresql',
  },
  postgresql: {
    user: process.env.PGUSER || 'test',
    host: process.env.PGHOST || 'localhost',
    password: process.env.PGPASSWORD || 'test',
    database: {
      name: process.env.PGDATABASE || 'test',
      tableName: process.env.PGDATABASETABLE || 'reports',
    },
    port: process.env.PGPORT || 5432,
  },
};
