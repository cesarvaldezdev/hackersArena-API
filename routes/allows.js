/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { AllowCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all verdicts
router.get('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'GA_Allows';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, AllowCtrl.getAll);

// FIXME falta validar el parametro
// Get a verdict by id
router.get('/:allowId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'G_Allows';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, AllowCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Allows';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, AllowCtrl.create);


/* PUT */
// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones,
// por lo cual al parecer el metodo del controlador esta mal
router.put('/:allowId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Allows';
}], (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, AllowCtrl.create);

/* DELETE */
// FIXME falta validar el parametro
router.delete('/:allowId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'D_Allows';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, AllowCtrl.delete);


module.exports = router;
