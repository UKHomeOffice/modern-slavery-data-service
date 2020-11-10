'use strict';
const e = require('express');
const request = require('request');
const config = require('../../../../knexfile')[process.env.NODE_ENV || 'development'];
const tableName = 'reports';
const knex = require('knex')(config);
// const moment = require('moment');
// const baseUrl = config.saveService.host + ':' + config.saveService.port + '/reports/';
// const _ = require('lodash');

const selectableProps = [
  'id',
  'session',
  'created_at',
  'updated_at'
];

module.exports = superclass => class extends superclass {

  getValues(req, res, next) {
    if (req.sessionModel.get('session')) {
      knex.select(selectableProps)
        .from(tableName)
        .whereRaw(`LOWER(session::TEXT) LIKE LOWER('%${req.sessionModel.get('session')}%')`)
        .then((reports) => {
          let reportsList = [];
          reports.forEach(report => {
            delete report.session['csrf-secret'];
            delete report.session.steps;
            if (Object.values(report.session).find(element => {
              if (typeof element === 'string') {
                return element.includes(req.sessionModel.get('session'));
              }
              return false;
            })) {
              reportsList.push({
                session: report.session,
                createdAt: report.created_at,
                updatedAt: report.updated_at
              });
            }
          });
          req.sessionModel.set('result', reportsList);
          req.sessionModel.set('resultLength', reportsList.length);
          req.sessionModel.set('querytext', req.sessionModel.get('session'));
          super.getValues(req, res, next);
        });
    } else {
      knex.select(selectableProps)
        .from(tableName)
        .whereRaw(`LOWER(email) LIKE LOWER('%${req.sessionModel.get('email')}%')`)
        .then((reports) => {
          let reportsList = [];
          reports.forEach(report => {
            reportsList.push(report.session);
          });
          req.sessionModel.set('result', reportsList);
          req.sessionModel.set('resultLength', reportsList.length);
          req.sessionModel.set('querytext', req.sessionModel.get('email'));
          super.getValues(req, res, next);
        });
    }
  }
};

