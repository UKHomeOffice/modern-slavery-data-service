'use strict';
require('dotenv').config();


module.exports = {
  dataService: {
    model: process.env.DATA_SERVICE_MODEL || 'postgres',
  },
  postgres: {
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
