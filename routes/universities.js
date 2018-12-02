/**
 * @see https://www.npmjs.com/package/router
 */
const router = require('express').Router();
const { UniversityCtrl } = require('../controllers');
const middlewares = require('../middlewares');


/* GET */
// Get all universities
router.get('/', UniversityCtrl.getAll);
// FIXME falta validar el parametro
// Get a university by id
router.get('/:universityId', UniversityCtrl.get);


/* POST */
router.post('/', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      idLogo: 'number,required',
      idCountry: 'number,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Universities';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, UniversityCtrl.create);


/* PUT */
// FIXME falta validar el parametro
// FIXME put es intencionado para ediciones y para para creaciones,
// por lo cual al parecer el metodo del controlador esta mal
router.put('/:universityId', [(req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      name: 'word,required',
      idLogo: 'number,required',
      idCountry: 'number,required',

      token: 'token,required',
    },
  });
  req.body.allowQuery = 'C_Universities';
}], (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, UniversityCtrl.create);


/* DELETE */
// FIXME falta validar el parametro
router.delete('/:universityId', (req, res, next) => {
  middlewares.validator.validate(req, res, next, {
    body: {
      token: 'token,required',
    },
  });
  req.body.allowQuery = 'D_Universities';
}, (req, res, next) => {
  middlewares.auth.session(req,res,next);
}, (req, res, next) => {
  middlewares.permission.check(req,res,next);
}, UniversityCtrl.delete);


module.exports = router;
