'use strict';
const dataService = require('../../models/data-service');
const tableName = 'reports';
const DebugDB = require('../../debuggers').server;
const util = require('util');

module.exports = (server) => {
  server.post('/reports', async(req, res, next) => {
    // get data from request body
    const data = req.body;

    DebugDB(`Get request data: ${util.inspect(data)}`);

    try {
        var result = await dataService.write(data);
        res.contentType = 'json';
        res.send(result);
        next(false);
    } catch (err) {
        res.send(500, err);
        next(false);
    }
  });

  server.get('/reports/findByEmail', async(req, res, next) => {
    // get email from request body
    const {userEmail} = JSON.parse(req.body);

    DebugDB(`Get request body: ${util.inspect(req.body)}`);
    try {
      const result = await dataService.read(userEmail, 'user_email', tableName);
      res.contentType = 'json';
      res.send(result);
      next(false);
    } catch (err) {
        res.send(500, err);
        next(false);
    }
  });

  server.get('/reports/:id', async(req, res, next) => {
    // get id from url params
    const {id} = req.params;

    try {
      const result = await dataService.read(id, 'id', tableName);
      res.contentType = 'json';
      res.send(result);
      next(false);
    } catch (err) {
        res.send(500, err);
        next(false);
    }
  });
};
