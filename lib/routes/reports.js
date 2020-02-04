'use strict';
const dataService = require('../../models/data-service');
const tableName = 'reports';
const debugDB = require('../../debuggers').server;
const util = require('util');

module.exports = (server) => {
  /**
   * Create a report
   */
  server.post('/reports', async(req, res, next) => {
    // get data from request body
    const data = req.body;

    debugDB(`Get request data: ${util.inspect(data)}`);

    try {
      const result = await dataService.write(data, tableName);

      res.json(result);
      next(false);
    } catch (err) {
      next(new Error(`request could not be processed:, ${err.message}`));
    }
  });

  /**
   * Find a report using the user email
   *
   * This endpoint will be used to retrieve a report via the user email
   * the downside to this is that if the user makes multiple different applications
   * then all applications will be returned.
   *
   * Once a future solution is implemented that can be used to retain the report id
   * we can retrieve a report by id
   *
   * @see '/reports/:id' endpoint
   */
  server.get('/reports/findByEmail', async(req, res, next) => {
    // get email from request body
    try {
      const { userEmail } = JSON.parse(req.body);

      debugDB(`Get request body: ${util.inspect(req.body)}`);

      try {
        const result = await dataService.read(userEmail, 'user_email', tableName);

        res.json(result);
        next(false);
      } catch (err) {
        next(new Error(`request could not be processed:, ${err.message}`));
      }
    } catch (err) {
      next(new Error(`please check the body of your request: ${err.message}`));
    }
  });


  /**
   * Find a report using the report id
   */
  server.get('/reports/:id', async(req, res, next) => {
    // get id from url params
    try {
      const { id } = req.params;

      try {
        const result = await dataService.read(id, 'id', tableName);

        res.json(result);
        next(false);
      } catch (err) {
        next(new Error(`request could not be processed:, ${err.message}`));
      }
    } catch (err) {
      next(new Error(`please check the body of your request: ${err.message}`));
    }
  });
};
