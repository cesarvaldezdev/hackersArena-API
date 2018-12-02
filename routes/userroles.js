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
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'GA_UserRoles';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, UserRoleCtrl.getAll);


// Get a user by alias
router.get('/:aliasUser',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'G_UserRoles';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, UserRoleCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      aliasUser: 'alias,required',
      idRole: 'number,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_UserRoles';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, UserRoleCtrl.create);


/* DELETE */
router.post('/delete', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      aliasUser: 'alias,required',
      idRole: 'number,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'D_UserRoles';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, UserRoleCtrl.delete);


module.exports = router;
