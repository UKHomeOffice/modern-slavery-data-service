'use strict';

const config = require('../../config');

const { postgresql, dataService } = config;

const { host, user, password, minPool, maxPool, database } = postgresql;
const { model } = dataService;

module.exports = {
  development: {
    client: model,
    connection: {
      user: 'test',
      password: 'test',
      database: database,
    },
    pool: {
      min: minPool,
      max: maxPool,
    },
    migrations: {
      tableName: 'data_service_migrations',
      path: './migrations',
    }
  },
  production: {
    client: model,
    connection: {
      host: host,
      user: user,
      password: password,
      database: database,
    },
    pool: {
      min: minPool,
      max: maxPool,
    },
    migrations: {
      tableName: 'data_service_migrations',
      path: './migrations',
    }
  }
};
