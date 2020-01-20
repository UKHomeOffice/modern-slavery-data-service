'use strict';

const restify = require('restify');
const Authentication = require('./Authentication');

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

