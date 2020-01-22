'use strict';
const reports = require('./reports');

function loadRoutes(server) {
  reports(server);
}

module.exports = (server) => {
  loadRoutes(server);
};
