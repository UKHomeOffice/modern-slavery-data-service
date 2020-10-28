'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const json = require('morgan-json');
const format = json({
  short: ':method :url :status',
  length: ':res[content-length]',
  'response-time': ':response-time ms',
  timestamp: ':date[iso]'
});
const app = express();
const { getReports, getId, create, del } = require('./controllers/reports');

app.use(bodyParser.json());
app.use(morgan(format));

app.get('/reports/:email', getReports);
app.get('/reports/:email/:id', getId);
app.post('/reports', create);
app.delete('/reports/:email/:id', del);

app.listen(PORT);
