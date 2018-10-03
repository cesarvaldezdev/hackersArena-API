// Colocar aqui todas las variables para conexion de DB para correr localmente
const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser');
const app = express();

app.enable('trust proxy');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
