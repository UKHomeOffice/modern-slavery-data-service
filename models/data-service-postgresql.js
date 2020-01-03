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
    client = new Client(config.postgresql);

    try {
      await client.connect();
      DebugDB('Connected to database');
      return client;
    } catch (err) {
      DebugDB(`CONNECT ERROR: ${err.stack}`);
      throw err;
    }
  }

  return client;
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
    const { tableName } = config.postgresql.additionalDatabaseConfig;

    const queryString = {
      text: `INSERT INTO ${tableName}(user_email, json_saved_data, visited_pages) VALUES ($1, $2, $3) RETURNING *`,
      values: [userEmail, jsonSavedData, visitedPages],
    };

    DebugDB(`Report WRITE query ${util.inspect(queryString)}`);

    const result = await clientConnection.query(queryString);

    DebugDB(`Report created ${util.inspect(result)}`);

    return result;
  } catch (err) {
      DebugDB(`WRITE ERROR ${err.stack}`);

      throw err;
  }
}

/**
 * Read data from Database
 *
 * @param {object} applicationId - id of the application to be sought
 *
 * @returns {object} read query result
 */
async function read(applicationId) {
  try {
    const clientConnection = await connect();

    // Postgre SQL table
    const { tableName } = config.postgresql.additionalDatabaseConfig;

    const queryString = {
      text: `SELECT * FROM ${tableName} WHERE id = $1`,
      values: [applicationId],
    };

    DebugDB(`Report READ query ${util.inspect(queryString)}`);

    const result = await clientConnection.query(queryString);

    DebugDB(`Report retrieved ${util.inspect(result)}`);

    return result;
  } catch (err) {
      DebugDB(`READ ERROR ${err.stack}`);
      throw err;
  }
}

module.exports = {
  write,
  read,
};
