// FIXME Corregir errores de linter
/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { UserRoleCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all users
router.get('/',(req, res, next) => {
  req.body.allowQuery = 'GA_UserRoles';
  next();
}, middlewares.auth.session, middlewares.permission.check, UserRoleCtrl.getAll);


// Get a user by alias
router.get('/:aliasUser',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      aliasUser: 'alias',
    },
  });
  req.body.allowQuery = 'G_UserRoles';
}, middlewares.auth.session, middlewares.permission.check, UserRoleCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      aliasUser: 'alias,required',
      idRole: 'number,required',
    },
  });
  req.body.allowQuery = 'C_UserRoles';
}, middlewares.auth.session, middlewares.permission.check, UserRoleCtrl.create);


/* DELETE */
router.post('/delete', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      aliasUser: 'alias,required',
      idRole: 'number,required',
    },
  });
  req.body.allowQuery = 'D_UserRoles';
}, middlewares.auth.session, middlewares.permission.check, UserRoleCtrl.delete);


module.exports = router;
