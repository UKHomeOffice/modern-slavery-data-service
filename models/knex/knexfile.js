'use strict';

const config = require('../../config');

const { database } = config.postgresql;

let knexfileInit = require('./knexfile-init');

// Override default database with one specified in config
knexfileInit.development.connection.database = database;
knexfileInit.production.connection.database = database;

module.exports = knexfileInit;
