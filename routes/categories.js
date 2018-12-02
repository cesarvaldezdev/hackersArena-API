// FIXME Corregir errores de linter
/**
 * @see https://www.npmjs.com/package/router
 */


const router = require('express').Router();
const { CategoryCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all categories
router.get('/', CategoryCtrl.getAll);

// FIXME falta validar el parametro
// Get category by id
router.get('/:categoryId', CategoryCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Categories';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, CategoryCtrl.create);


// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones,
// por lo cual al parecer el metodo del controlador esta mal
router.put('/:categoryId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Categories';
}], (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, CategoryCtrl.create);

// FIXME falta validar el parametro

/* POST */
router.delete('/:categoryId', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'D_Categories';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
},CategoryCtrl.delete);


module.exports = router;
