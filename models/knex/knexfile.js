'use strict';

const config = require('../../config');

const { postgresql, dataService } = config;

const { host, user, password, database } = postgresql;
const { model } = dataService;

module.exports = {
  development: {
    client: `${model}`,
    connection: {
      database: 'test',
      user: 'test',
      password: 'test',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'data_service_migrations',
      path: './migrations',
    }
  },
  production: {
    client: `${model}`,
    connection: {
      host: `${host}`,
      user: `${user}`,
      password: `${password}`,
      database: `${database}`,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'data_service_migrations',
      path: './migrations',
    }
  }
};
