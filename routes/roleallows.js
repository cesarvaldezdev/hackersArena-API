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
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'GA_RoleAllows';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, RoleAllowCtrl.getAll);


// Get a user by alias
router.get('/:idRole',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'G_RoleAllows';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, RoleAllowCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      idAllow: 'number,required',
      idRole: 'number,required',
      status: 'number',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_RoleAllows';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, RoleAllowCtrl.create);


/* DELETE */
router.post('/delete', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      idAllow: 'number,required',
      idRole: 'number,required',
      status: 'number',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'D_RoleAllows';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, RoleAllowCtrl.delete);


module.exports = router;
