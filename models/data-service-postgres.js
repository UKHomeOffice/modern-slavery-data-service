'use strict';

const util = require('util');
const config = require('../config');
const DebugDB = require('../debuggers').database;

const { Client } = require('pg');

let client;

/**
 * Connect to Database
 *
 * @returns {void} object containing the database connection
 */
async function connect() {
  if (!client) {
    client = new Client({
      host: config.postgres.host,
      port: config.postgres.port,
      user: config.postgres.user,
      password: config.postgres.password,
    });
  }

  try {
    await client.connect();
    DebugDB('Connected to database');
    return client;
  } catch (err) {
    DebugDB(`CONNECT ERROR: ${err.stack}`);
    throw err;
  }
}

/**
 * Write data to Database
 *
 * @param {object} data - data object to be written
 *
 * @returns {object} write query result
 */
async function write(data) {
  try {
    const clientConnection = await connect();
    const { userEmail, jsonSavedData } = data;

    const queryString = {
      text: `INSERT INTO ${config.postgres.database.tableName}(useremail, jsonsaveddata) VALUES ($1, $2)`,
      values: [userEmail, jsonSavedData],
    };

    const result = await clientConnection.query(queryString);
    DebugDB(`Report created ${util.inspect(result)}`);

    return result;
  } catch (err) {
      DebugDB(`WRITE ERROR ${err.stack}`);
      throw err;
  }
}

module.exports = {
  write,
};
