'use strict';

const defaultConfig = require('../config');

let DataServiceModel;

/**
 * Get data service module
 *
 * @param {object} [config=defaultConfig] - configuration setting for the connection to a data store / database
 *
 * The type of data service module selected will be defined in the config
 *
 * @returns {Promise} - the data service model to be used
 */
async function getDataServiceModel(config = defaultConfig) {
  if (DataServiceModel) {
    return DataServiceModel;
  }

  const modelPath = `../models/data-service-${config.dataService.model}`;

  DataServiceModel = await require(modelPath);

  return DataServiceModel;
}

/**
 * Write data to database
 *
 * @param {object} data - data object to be written
 * @param {string} tableName - name of table to make query on
 * @param {object} config - configuration setting for the connection to a data store / database
 *
 * If no config is supplied, the default config will be used.
 * @see defaultConfig
 *
 * @returns {Promise} write query result
 */
async function write(data, tableName, config) {
  return (await getDataServiceModel(config)).write(data, tableName);
}

/**
 * Read data from database
 *
 * @param {number|string} identifierValue - identifier value to be used to get a record from the table such as an
 * id or user email
 * @param {string} columnName - the column name (i.e. 'user_email' or 'id');
 *
 * @param {string} tableName - name of table to make query on
 *
 * @param {object} config - configuration setting for the connection to a data store / database
 *
 * If no config is supplied, the default config will be used.
 * @see defaultConfig
 *
 * @returns {Promise} read query result
 */
async function read(identifierValue, columnName, tableName, config) {
  return (await getDataServiceModel(config)).read(identifierValue, columnName, tableName);
}

module.exports = {
  write,
  read,
};
