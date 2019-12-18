'use strict';

const util = require('util');
const config = require('../default-config');
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
    // Postgre SQL table columns
    const { userEmail, jsonSavedData, visitedPages } = data;
    // Postgre SQL table
    const { tableName } = config.postgres.database;

    const queryString = {
      text: `INSERT INTO ${tableName}(useremail, jsonsaveddata, visitedpages) VALUES ($1, $2, $3) RETURNING *`,
      values: [userEmail, jsonSavedData, visitedPages],
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
