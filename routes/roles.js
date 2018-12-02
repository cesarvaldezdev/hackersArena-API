/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { RoleCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all verdicts
router.get('/',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'GA_Roles';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, RoleCtrl.getAll);
// FIXME falta validar el parametro
// Get a verdict by id
router.get('/:roleId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'G_Roles';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, RoleCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Roles';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, RoleCtrl.create);


/* PUT */
// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones,
// por lo cual al parecer el metodo del controlador esta mal
router.put('/:roleId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Roles';
}], (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, RoleCtrl.create);

/* DELETE */
// FIXME falta validar el parametro
router.delete('/:roleId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'D_Roles';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, RoleCtrl.delete);


module.exports = router;
