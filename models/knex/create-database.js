'use strict';

// setup knex to read knexfile in which no database is specified
const knex = require('./')(true);
const config = require('../../config');
const debugDB = require('../../debuggers').database;

// get the required database needed
const { database } = config.postgresql;

// Create Database if it does not already exist
async function createDatabase() {
  try {
    const query = `
    SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${database}');
    `;

    const result = await knex.raw(query);

    if (result.rows.length < 1) {
      const createQuery = `CREATE DATABASE ${database};`;
      await knex.raw(createQuery);
      await knex.destroy();
    }

    await knex.destroy();
    debugDB(`CREATE/SEARCH SUCCESS ${query}`);
  } catch (err) {
    debugDB(`SEARCH/CREATE ERROR ${err.stack}`);
    throw new Error(err);
  }
}

(async() => {
  await createDatabase();
})();

