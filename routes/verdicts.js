/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { VerdictCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all verdicts
router.get('/', VerdictCtrl.getAll);
// FIXME falta validar el parametro
// Get a verdict by id
router.get('/:verdictId', VerdictCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      type: 'word,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Verdicts';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, VerdictCtrl.create);


/* PUT */
// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones,
// por lo cual al parecer el metodo del controlador esta mal
router.put('/:verdictId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      type: 'word,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Verdicts';
}], (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, VerdictCtrl.create);

/* DELETE */
// FIXME falta validar el parametro
router.delete('/:verdictId', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'D_Verdicts';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
},VerdictCtrl.delete);


module.exports = router;
