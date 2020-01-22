'use strict';

const restify = require('restify');
const Authentication = require('./Authentication');
const DebugDB = require('../debuggers').server;
const loadRoutes = require('./Routes');
const config = require('../config');

var server = restify.createServer({
  name: 'modern-slavery-data-service',
  version: '0.0.1',
});

server.use(restify.plugins.authorizationParser());
server.use(Authentication.authenticateAPIKey);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
  mapParams: true
}));

loadRoutes(server);

server.listen(config.dataService.port, () => {
  DebugDB(`${server.name} listening at ${server.url}`);
});
