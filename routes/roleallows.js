// FIXME Corregir errores de linter
/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { RoleAllowCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all users
router.get('/',(req, res, next) => {
  req.body.allowQuery = 'GA_RoleAllows';
  next();
}, middlewares.auth.session, middlewares.permission.check, RoleAllowCtrl.getAll);


// Get a user by alias
router.get('/:idRole',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    params: {
      idRole: 'number',
    },
  });
  req.body.allowQuery = 'G_RoleAllows';
}, middlewares.auth.session, middlewares.permission.check, RoleAllowCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      idAllow: 'number,required',
      idRole: 'number,required',
      status: 'number',
    },
  });
  req.body.allowQuery = 'C_RoleAllows';
}, middlewares.auth.session, middlewares.permission.check, RoleAllowCtrl.create);


/* DELETE */
router.post('/delete', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      idAllow: 'number,required',
      idRole: 'number,required',
      status: 'number',
    },
  });
  req.body.allowQuery = 'D_RoleAllows';
}, middlewares.auth.session, middlewares.permission.check, RoleAllowCtrl.delete);


module.exports = router;
