'use strict';
const reports = require('./reports');

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
}

module.exports = (server) => {
  loadRoutes(server);
};
