'use strict'

module.exports = {
  dataService: {
    model: process.env.DATA_SERVICE_MODEL || postgres, // select the database to be used
  },
  postgres: {
    user: process.env.PGUSER || 'test',
    host: process.env.PGHOST || 'localhost',
    password: process.env.PGPASSWORD || 'test',
    database:  process.env.PGDATABASE || 'reports',
    port: process.env.PGPORT || 5432,
  },
};
