const { Router } = require('express');

const router = Router();

// Cargamos los middlewares
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Cargamos las rutas por modulos
const usersRouter = require('./users');

router.get('/', (req, res) => res.send('Hello World!'));

router.use('/users', usersRouter);

module.exports = router;
