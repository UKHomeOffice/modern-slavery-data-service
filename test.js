'use strict';

const dataService = require('./index');

const testData = {
  userEmail: 'test@example.com',
  jsonSavedData: {
    'user-email': 'test@example.com',
    'fr-location': 'england',
  },
};

async function writeData() {
  try {
    const output = await dataService.write(testData);
    return output;
  } catch (err) {
    throw new Error(`${err}`);
  }
}

writeData();
