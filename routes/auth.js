const router = require('express').Router();
const middlewares = require('../middlewares');

router.post('/register', middlewares.auth.register);
router.post('/login', middlewares.auth.login);
router.post('/logout', middlewares.auth.logout);
