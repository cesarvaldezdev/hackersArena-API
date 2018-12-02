const router = require('express').Router();
const middlewares = require('../middlewares');

router.post('/register', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      alias: 'alias,required',
      name: 'word,required',
      lastName: 'word,required',
      email: 'email,required',
      password: 'password,required',
      idUniversity: 'number,required',
      idCountry: 'number,required',
      token: 'token',
    },
  });
}, middlewares.auth.registerUser);

router.get('/register/:token', middlewares.auth.confirmUser);

router.post('/login', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      alias: 'alias,required',
      password: 'password,required',
      token: 'token',
    },
  });
}, middlewares.auth.login);

router.post('/logout', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
}, middlewares.auth.logout);

router.post('/session', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
}, middlewares.auth.session);

module.exports = router;
