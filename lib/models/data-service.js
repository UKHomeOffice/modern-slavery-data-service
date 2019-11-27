'use strict';

const config = require('../../config');

let DataServiceModel;

/**
 * Get data service module
 * 
 * The type of module selected will be defined in the config
 * 
 * @returns {Promise} - the data service model to be used
 */
async function getDataServiceModel() {
    if (DataServiceModel) return DataServiceModel;
    DataServiceModel = await require(`../models/data-service-${config.dataService.model}`);
    return DataServiceModel;
}
