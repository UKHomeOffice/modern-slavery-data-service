'use strict';

const util = require('util');
const config = require('../../config');
const DebugDB = require('../../debuggers').database;
const PostgreSQLUtils = require('./util');

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
 * @param {string} tableName - name of table to make query on
 *
 * @returns {object} write query result
 */
async function write(data, tableName) {
  const {isObject, getPlaceholders} = PostgreSQLUtils;

  try {
    const clientConnection = await connect();
    const columns = Object.keys(data);
    const values = Object.values(data).map((element) => {
      // make sure all objects are in string format
      if (isObject(element)) {
        return JSON.stringify(element);
      }
      return element;
    });

    const queryString = {
      text: `INSERT INTO ${tableName}(${columns}) VALUES (${getPlaceholders(columns)}) RETURNING *`,
      values,
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
 * @param {number|string} identifierValue - identifier value to be used to get a record from the table such as an id or
 * user email
 * @param {string} columnName - the column name (i.e. 'user_email' or 'id');
 * @param {string} tableName - name of table to make query on
 *
 * @returns {object} read query result
 */
async function read(identifierValue, columnName, tableName) {
  try {
    const clientConnection = await connect();

    const queryString = {
      text: `SELECT * FROM ${tableName} WHERE ${columnName} = $1`,
      values: [identifierValue],
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
