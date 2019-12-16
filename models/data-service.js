'use strict';

const config = require('../config');

let DataServiceModel;

/**
 * Get data service module
 *
 * The type of module selected will be defined in the config
 *
 * @returns {Promise} - the data service model to be used
 */
async function getDataServiceModel() {
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
 *
 * @returns {object} write query result
 */
async function write(data) {
  return (await getDataServiceModel()).write(data);
}

module.exports = {
  write,
};
