'use strict';

const restify = require('restify');
const Authentication = require('./Authentication');
const DebugDB = require('../debuggers').server;
const loadRoutes = require('./Routes');
const config = require('../config');

// Check if API user & key has been defined
if (process.env.APP_ID && process.env.APP_API_KEY) {
  throw new Error('You need to provide an APP_ID && APP_API_KEY');
}

var server = restify.createServer({
  name: process.env.npm_package_name,
  version: process.env.npm_package_version,
});

server.use(restify.plugins.authorizationParser());
server.use(Authentication.authenticateAPIKey);
server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
  mapParams: true
}));

loadRoutes(server);

server.listen(config.dataService.port, () => {
  DebugDB(`${server.name} listening at ${server.url}`);
});

module.exports = server;
