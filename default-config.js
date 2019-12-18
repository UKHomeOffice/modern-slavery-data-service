'use strict';

// This allows you to run the data-service module independently with environment variables set.
require('dotenv').config();

module.exports = {
  dataService: {
    model: process.env.DATASERVICEMODEL ? process.env.DATASERVICEMODEL : 'postgres',
  },
  postgres: {
    user: process.env.PGUSER ? process.env.PGUSER : 'test',
    host: process.env.PGHOST ? process.env.PGHOST : 'localhost',
    password: process.env.PGPASSWORD ? process.env.PGPASSWORD : 'test',
    database: {
      name: process.env.PGDATABASE ? process.env.PGDATABASE : 'test',
      tableName: process.env.PGDATABASETABLE ? process.env.PGDATABASETABLE : 'reports',
    },
    port: process.env.PGPORT ? process.env.PGPORT : 5432,
  },
};
