'use strict';

const restify = require('restify');
const Authentication = require('./Authentication');

var server = restify.createServer({
  name: process.env.npm_package_name,
  version: process.env.npm_package_version,
});

server.use(restify.plugins.authorizationParser());
server.use(Authentication.authenticateAPIKey);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
  mapParams: true
}));

