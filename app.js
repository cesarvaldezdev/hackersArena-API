// Put all DB connection variables for local build run
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');

const app = express();

app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
// app.use(auth);

// FIXME deben incluir el manejo de env
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
