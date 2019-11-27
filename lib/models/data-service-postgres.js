'use strict'

const config = require('../../config');
const DebugDB = require('../debuggers').database;

const { Client } = require('pg');

let client; // client connection to database stored here

/**
 * Connect to Database
 *
 * @returns {void} - object containing the database connection
 */
async function connect() {
  if (!client) {
    const client = new Client({
      host: config.postgre.host,
      port: config.postgre.port,
      user: config.postgre.user,
      password: config.postgre.password,
    });
  }

  try {
    await client.connect();
    DebugDB('Connected to database');
    return client;
  } catch(err) {
    DebugDB(`CONNECT ERROR: ${err.stack}`);
    throw err;
  }
}

/**
 * Close connection to Database
 *
 * @returns {void}
 */
export async function close() {
  await client.end();
}
