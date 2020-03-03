'use strict';
const dataService = require('../../models/data-service');
const tableName = 'save_report_tokens';
const debugDB = require('../../debuggers').server;
const util = require('util');

module.exports = (server) => {
 /**
  * Create a save report token for email links
  */
 server.post('/save-report-tokens', async(req, res, next) => {
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
  * Find a save report token using the uuid
  */
 server.get('/save-report-tokens/:uuid', async(req, res, next) => {
   // get id from url params
   try {
     const { uuid } = req.params;

     try {
       const result = await dataService.read(uuid, 'uuid', tableName);

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
