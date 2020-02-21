'use strict';

const util = require('util');
const debugDB = require('../../debuggers').database;
const PostgreSQLUtils = require('./util');
const client = require('../knex');

/**
 * Write data to Database
 *
 * If the data has column values which are objects they will be converted to a string for storage
 * e.g.
 * data = {columnName: {value: 10}} will become
 * data = {columnName: 'value: 10'}
 *
 * @param {object} data - data object to be written
 * @param {string} tableName - name of table to make query on
 *
 * @returns {object} write query result
 */
async function write(data, tableName) {
  const {isObject} = PostgreSQLUtils;

  try {
    // make sure all column values that are objects are converted to string format
    let newDataObject = Object.assign(
      {},
      ...Object.entries(data).map(([columnName, columnValue]) => {
        const formattedValue = isObject(columnValue) ? JSON.stringify(columnValue) : columnValue;
        return ({[columnName]: formattedValue});
      }),
    );

    debugDB(`Report WRITE query object ${util.inspect(newDataObject)}`);

    const result = await client(tableName).insert(newDataObject);

    debugDB(`Report created ${util.inspect(result)}`);

    return result;
  } catch (err) {
      debugDB(`WRITE ERROR ${err.stack}`);

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
    const queryObject = {
      [columnName]: identifierValue
    };

    debugDB(`Report READ query object ${util.inspect(queryObject)}`);

    const result = await client(tableName).where(queryObject);

    debugDB(`Report retrieved ${util.inspect(result)}`);

    return result;
  } catch (err) {
      debugDB(`READ ERROR ${err.stack}`);
      throw err;
  }
}

module.exports = {
  write,
  read,
};
