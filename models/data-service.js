'use strict';

const defaultConfig = require('../default-config');

let DataServiceModel;

/**
 * Get data service module
 *
 * @param {object} [config=defaultConfig] - configuartion setting for the connection to a data store / database
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
 * @param {object} config - configuartion setting for the connection to a data store / database
 *
 * If no config is supplied, the default config will be used.
 * @see defaultConfig
 *
 * @returns {Promise} write query result
 */
async function write(data, config) {
  return (await getDataServiceModel(config)).write(data);
}

module.exports = {
  write,
};
