/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { LanguageCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all languages
router.get('/', LanguageCtrl.getAll);
// FIXME falta validar el parametro
// Get a language by id
router.get('/:languageId', LanguageCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'language,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Languages';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, LanguageCtrl.create);


/* PUT */
// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones,
// por lo cual al parecer el metodo del controlador esta mal
router.put('/:languageId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'language,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Languages';
}], (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, LanguageCtrl.create);


/* DELETE */
// FIXME falta validar el parametro
router.delete('/:languageId',(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'D_Languages';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
},LanguageCtrl.delete);


module.exports = router;
