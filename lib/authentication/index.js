'use strict';

const util = require('util');
const debugDB = require('../../debuggers').server;
const config = require('../../config');

/**
 * Check if supplied authorisation key in the request object is valid against the list of valid authorisation keys
 *
 * @returns {void}
 */
function isAuthorised(req, res, next) {
  const valid = config.apiKeys.some(({key, user})=> {
    return (
      key === req.authorization.basic.password &&
      user === req.authorization.basic.username
    );
  });

  if (valid) {
    next();
  } else {
    debugDB(`Invalid credentials:  ${util.inspect(req.authorization)}`);
    next(new Error('Supplied access credentials are invalid'));
  }
}

/**
 * Authenticate API Key used to connect to service
 *
 * @param {object} req - request object
 * @param {object} res - response object
 * @param {function} next - next function to be called
 *
 * @returns {void}
 */
function authenticateAPIKey(req, res, next) {
  // Check if a key is available
  if (req.authorization && req.authorization.basic) {
    // Check if key is valid
    isAuthorised(req, res, next);
  } else {
    debugDB(`NO AUTHORISATION: ${util.inspect(req.authorization)}`);
    next(new Error('You are NOT authorised to access this service'));
  }
}

module.exports = {
  authenticateAPIKey,
};
