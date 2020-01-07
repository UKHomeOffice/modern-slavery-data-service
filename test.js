'use strict';

const dataService = require('./index');

const testData = {
  userEmail: 'test@example.com',
  jsonSavedData: {
    'user-email': 'test@example.com',
    'fr-location': 'england',
  },
  visitedPages: '/start, /fr-location',
};

/**
 * Write test data to data store
 *
 * @returns {Promise} - write response
 */
async function writeData() {
  try {
    const output = await dataService.write(testData);

    return output;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

/**
 * Get the latest inserted row from the data store
 *
 * @returns {number} - row id of the last inserted row
 */
async function getLatestRowId() {
  try {
    const response = await writeData();

    const { id } = response.rows[0];

    return id;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

/**
 * Read data from data store
 *
 * @param {number} id - row id of the record required
 *
 * @returns {Promise} - read response
 */
async function readData(id) {
  try {
    const output = await dataService.read(id);

    return output;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

/**
 * Write then read the data from the row that was last written into the table
 *
 * @returns {void}
 */
async function writeAndReadData() {
  const latestRowId = await getLatestRowId();

  await readData(latestRowId);
}

writeAndReadData();
