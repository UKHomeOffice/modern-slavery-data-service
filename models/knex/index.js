'use strict';

const knex = require('knex');

/**
 * Get Knex
 *
 * @param {bool} [init=false] - optional parameter to determine which knexfile should be used
 *
 * If set to true this will use the models/knex/knexfile-init.js file
 * This would mean we would connect using knex without a specified database.
 *
 * The reason for this is; so we can create the initial database if it does not already exist.
 *
 * @returns {object} - Knex object
 */
function getKnex(init = false) {
  const knexfile = init ? require('./knexfile-init') : require('./knexfile');

  const env = process.env.NODE_ENV || 'production';
  const options = knexfile[env];

  return knex(options);
}

module.exports = (init) => getKnex(init);
