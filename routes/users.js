// FIXME Corregir errores de linter
/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { UserCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all users
router.get('/', UserCtrl.getAll);

// Get a user by alias
router.get('/:userAlias',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      userAlias: 'alias',
    },
  });
}, UserCtrl.get);


/* POST */
// Create a new User
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      alias: 'alias,required',
      name: 'word,required',
      lastName: 'word,required',
      email: 'email,required',
      password: 'password,required',
      idUniversity: 'number,required',
      idCountry: 'number,required',
    },
  });
},middlewares.auth.registerUser);

// Confirm Account
router.get('/register/:token',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      token: 'token',
    },
  });
}, middlewares.auth.confirmUser);

// Login
router.post('/login', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      alias: 'alias,required',
      password: 'password,required',
    },
  });
}, middlewares.auth.login);

// Logout
router.post('/logout', middlewares.auth.logout);

// Check session status
router.post('/session', middlewares.auth.session, middlewares.auth.extraConfirm);


/* PUT */
// Edit user
router.put('/:userAlias', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      userAlias: 'alias',
    },
    body: {
      name: 'word,required',
      lastName: 'word,required',
      score: 'number',
      email: 'email,required',
      password: 'password,required',
      idUniversity: 'number,required',
      idCountry: 'number,required',
    },
  });
  req.body.allowQuery = 'C_Users';
}], middlewares.auth.session, middlewares.permission.check, UserCtrl.create);


/* DELETE */
router.delete('/:userAlias', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      userAlias: 'alias',
    },
  });
  req.body.allowQuery = 'D_Users';
}, middlewares.auth.session, middlewares.permission.check, UserCtrl.delete);


module.exports = router;
