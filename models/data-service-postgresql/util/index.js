'use strict';

/**
 * Get a list of placeholder variables to be used in a PostgreSQL query
 *
 * @param {*} input - array of columns/values
 *
 * @returns {string} - string of placeholders
 */
function getPlaceholders(input) {
  const placeholderArray = input.map((val, index) => '$' + (index + 1));

  return placeholderArray.join(', ');
}

/**
 * is the value an Object
 *
 * @param {*} value - the input value to be checked
 *
 * @returns {bool} - whether the value is an object
 */
function isObject(value) {
  return value && (typeof value === 'object') && value.constructor === Object;
}

module.exports = {
  getPlaceholders,
  isObject,
};
