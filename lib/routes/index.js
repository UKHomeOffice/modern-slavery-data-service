'use strict';
const reports = require('./reports');
const cookies = require('./cookies');
const saveReportTokens = require('./save-report-tokens');

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
  saveReportTokens(server);
}

module.exports = (server) => {
  loadRoutes(server);
};
