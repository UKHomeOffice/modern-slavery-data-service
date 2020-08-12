'use strict';

const Reports = require('../models/reports');

const getReports = (req, res, next) => {
  const email = req.params.email;

  Reports.findByEmail(email)
    .then(user => res.json(user))
    .catch(next);
};

const getId = (req, res, next) => {
  const id = req.params.id;
  const email = req.params.email;

  Reports.findById(id, email)
    .then(session => res.json(session))
    .catch(next);
};

const create = (req, res, next) => {
  const session = req.body;

  Reports.create(session)
    .then(user => {
      res.json(user);
    })
    .catch(next);
};

const del = (req, res, next) => {
  const id = req.params.id;
  const email = req.params.email;

  Reports.del(id, email)
    .then(res.sendStatus(200))
    .catch(next);
};

module.exports = {
  getReports,
  getId,
  create,
  del
};
