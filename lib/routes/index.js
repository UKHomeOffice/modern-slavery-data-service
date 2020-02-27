'use strict';
const reports = require('./reports');
const cookies = require('./cookies');

/**
 * Load routes served by service
 *
 * @param {*} server - server object
 *
 * @returns {void}
 */
function loadRoutes(server) {
  // Load report routes
  reports(server);
  cookies(server);
}

module.exports = (server) => {
  loadRoutes(server);
};
