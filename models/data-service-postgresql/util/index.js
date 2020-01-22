'use strict';

/**
 * Get a list of placeholder variables to be used in a PostgreSQL query
 * @param {*} input - array of columns/values
 *
 * @returns {string} - string of placeholders
 */
function getPlaceholders(input) {
  const placeholders = input.reduce((accumalator, currentValue, index) => {
    const placeholderString = `$${index + 1}`;
    if (placeholderString === accumalator) {
      return accumalator;
    }

    if (accumalator) {
      accumalator += ', ';
    }

    const newPlaceholderString = (accumalator += `$${index + 1}`);

    return newPlaceholderString;
  }, '$1');
  return placeholders;
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
