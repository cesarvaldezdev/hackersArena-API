const express = require('express');
const process = require('process');
const crypto = require('crypto');
const Knex = require('knex');

const app = express();
app.enable('trust proxy');

process.env.SQL_DATABASE = "hackersarenadb";
process.env.INSTANCE_CONNECTION_NAME = "hackersarena00:us-central1:hackersarenadb";

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

const router = require('./routes');
app.use(router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
